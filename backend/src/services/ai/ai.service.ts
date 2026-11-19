import { GoogleGenerativeAI } from '@google/generative-ai';
import { ENV } from '../../config/env.config.js';
import { JEE_PHYSICS_QUESTIONS, SeedQuestion } from '../../data/questionsData.js';
import {
  MentorMode,
  MistakeAnalysisResponse,
  HintResponse,
  ChatResponse,
} from './ai.types.js';
import {
  buildMistakeAnalysisPrompt,
  buildChatPrompt,
} from './ai.prompt.js';

export class AiService {
  private static genAiClient: GoogleGenerativeAI | null = null;

  private static getClient(): GoogleGenerativeAI | null {
    if (!this.genAiClient && ENV.GEMINI_API_KEY) {
      this.genAiClient = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);
    }
    return this.genAiClient;
  }

  /**
   * Progressive hint retrieval calibrated to mentor mode
   */
  static getProgressiveHint(
    questionId: string,
    level: number,
    mode: MentorMode = 'COLLABORATIVE'
  ): HintResponse {
    const q = JEE_PHYSICS_QUESTIONS.find(
      (item) => item.id === questionId || item.code === questionId
    );
    if (!q) {
      const err: any = new Error('Question not found');
      err.statusCode = 404;
      throw err;
    }

    const clampedLevel = Math.max(1, Math.min(level, q.hints.length));
    const baseHint = q.hints.find((h) => h.level === clampedLevel) || q.hints[0];

    let guidanceNote = '';
    if (mode === 'STRICT') {
      guidanceNote =
        'Strict Mentor: Write down your governing equations explicitly before computing numbers. Do not jump to conclusions without a complete Free Body Diagram.';
    } else {
      guidanceNote =
        'Collaborative Mentor: Break the configuration down into simple parts. Focus on the physical constraints first.';
    }

    return {
      level: clampedLevel,
      mentorMode: mode,
      hintTextLatex: baseHint.hintTextLatex,
      guidanceNote,
      engineUsed: 'RULE_BASED_SME_ENGINE',
    };
  }

  /**
   * Diagnostic Mistake Analysis using Google Gemini with SME Fallback
   */
  static async analyzeMistake(params: {
    questionId: string;
    submittedAnswer: any;
    timeSpentSeconds: number;
    mentorMode: MentorMode;
  }): Promise<MistakeAnalysisResponse> {
    const q = JEE_PHYSICS_QUESTIONS.find(
      (item) => item.id === params.questionId || item.code === params.questionId
    );
    if (!q) {
      const err: any = new Error('Question not found');
      err.statusCode = 404;
      throw err;
    }

    const client = this.getClient();
    let geminiSucceeded = false;
    let resultPayload: MistakeAnalysisResponse | null = null;

    if (client) {
      try {
        const model = client.getGenerativeModel({
          model: 'gemini-1.5-flash',
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });

        const prompt = buildMistakeAnalysisPrompt({
          questionStatement: q.contentLatex,
          verifiedSolution: q.solution.solutionTextLatex,
          keyFormulas: q.solution.keyFormulas,
          submittedAnswer: params.submittedAnswer,
          correctAnswer: q.options?.filter((o) => o.isCorrect).map((o) => o.optionKey) || q.numericalAnswer,
          timeSpentSeconds: params.timeSpentSeconds,
          mentorMode: params.mentorMode,
        });

        const res = await model.generateContent(prompt);
        const text = res.response.text();
        const parsed = JSON.parse(text);

        resultPayload = {
          mistakeType: parsed.mistakeType || 'CONCEPTUAL',
          divergencePoint: parsed.divergencePoint || 'Reasoning diverged at coordinate resolution.',
          analysisTextLatex: parsed.analysisTextLatex || q.solution.commonPitfalls,
          prerequisiteWarning: parsed.prerequisiteWarning || null,
          suggestedReview: parsed.suggestedReview || 'Review core chapter principles.',
          mentorMode: params.mentorMode,
          engineUsed: 'GEMINI_API',
        };
        geminiSucceeded = true;
      } catch (geminiError) {
        console.warn('Gemini API call returned an error, falling back to SME engine:', geminiError);
      }
    }

    if (!geminiSucceeded || !resultPayload) {
      // High-precision SME rule-based fallback
      let mistakeType: any = 'CONCEPTUAL';
      let divergence = 'Coordinate or constraint resolution deviated from equilibrium equations.';
      let review = 'Review Free Body Diagrams and boundary conditions.';

      if (q.questionType === 'NUMERICAL') {
        mistakeType = 'CALCULATION';
        divergence = `Calculated value of ${params.submittedAnswer} did not match target ${q.numericalAnswer} within allowable tolerance.`;
        review = 'Review intermediate algebra and integration boundary limits.';
      } else if (q.questionType === 'MULTIPLE_CORRECT') {
        mistakeType = 'INCOMPLETE_SOLUTION';
        divergence = 'Did not select the complete set of valid physical statements.';
        review = 'Test each individual option independently from first principles.';
      }

      resultPayload = {
        mistakeType,
        mistakeCategory: mistakeType.replace(/_/g, ' '),
        divergencePoint: divergence,
        analysisTextLatex:
          params.mentorMode === 'STRICT'
            ? `Strict Analysis: Your submission was incorrect. ${q.solution.commonPitfalls}\n\nRe-verify: Is your coordinate system inertial? Are you assuming an unverified conservation law?`
            : `Collaborative Analysis: Let's trace where things went off track. ${q.solution.commonPitfalls}\n\nNotice that ${q.solution.keyFormulas.join(', ')} dictates the system's acceleration.`,
        feedback:
          params.mentorMode === 'STRICT'
            ? `Your submission was incorrect. ${q.solution.commonPitfalls}`
            : `Let's trace where things went off track. ${q.solution.commonPitfalls}`,
        prerequisiteWarning: q.chapterSlug.includes('rot') ? 'Torque vector cross product' : 'Friction limits',
        suggestedReview: review,
        remedialAction: review,
        mentorMode: params.mentorMode,
        engineUsed: 'RULE_BASED_SME_ENGINE',
      };
    }

    return resultPayload;
  }

  /**
   * Interactive Conceptual Chat with Gemini AI
   */
  static async chat(params: {
    questionId: string;
    studentMessage: string;
    mentorMode: MentorMode;
  }): Promise<ChatResponse> {
    const q = JEE_PHYSICS_QUESTIONS.find(
      (item) => item.id === params.questionId || item.code === params.questionId
    );
    if (!q) {
      const err: any = new Error('Question not found');
      err.statusCode = 404;
      throw err;
    }

    const client = this.getClient();
    let geminiSucceeded = false;
    let chatResponse: ChatResponse | null = null;

    if (client) {
      try {
        const model = client.getGenerativeModel({
          model: 'gemini-1.5-flash',
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.3,
          },
        });

        const prompt = buildChatPrompt({
          questionStatement: q.contentLatex,
          verifiedSolution: q.solution.solutionTextLatex,
          studentMessage: params.studentMessage,
          mentorMode: params.mentorMode,
        });

        const res = await model.generateContent(prompt);
        const text = res.response.text();
        const parsed = JSON.parse(text);

        chatResponse = {
          mentorMode: params.mentorMode,
          replyLatex: parsed.replyLatex,
          relatedConcepts: parsed.relatedConcepts || [],
          engineUsed: 'GEMINI_API',
        };
        geminiSucceeded = true;
      } catch (geminiError) {
        console.warn('Gemini Chat API fallback active:', geminiError);
      }
    }

    if (!geminiSucceeded || !chatResponse) {
      chatResponse = {
        mentorMode: params.mentorMode,
        replyLatex:
          params.mentorMode === 'STRICT'
            ? `Strict Mentor: Consider the physical constraints of ${q.code}. Look at the governing equation:\n$$${q.solution.keyFormulas[0] || 'F = ma'}$$\nWhy would this be altered under your assumption? Identify which force provides the net torque or acceleration before substituting numbers.`
            : `Collaborative Mentor: Great conceptual question! In this configuration, the key is understanding that:\n$$${q.solution.keyFormulas[0] || 'F = ma'}$$\n${q.solution.commonPitfalls}`,
        relatedConcepts: [q.chapterSlug, q.topicSlug],
        engineUsed: 'RULE_BASED_SME_ENGINE',
      };
    }

    return chatResponse;
  }
}
