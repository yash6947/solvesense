import { JEE_PHYSICS_QUESTIONS, SeedQuestion } from '../data/questionsData.js';
import { memoryStore, QuestionAttemptEntity } from './store.service.js';

export interface QuestionFilterParams {
  chapterSlug?: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | 'ADVANCED';
  questionType?: 'SINGLE_CORRECT' | 'MULTIPLE_CORRECT' | 'NUMERICAL';
  isPYQ?: boolean;
  status?: 'all' | 'unattempted' | 'solved' | 'incorrect';
  search?: string;
}

export interface AttemptSubmissionDTO {
  submittedAnswer: string[] | number | string;
  timeSpentSeconds: number;
  hintsRequested?: number;
}

export class QuestionService {
  /**
   * Filter and list questions with student attempt telemetry attached
   */
  static getQuestions(filters: QuestionFilterParams, userId?: string) {
    const userAttempts = userId ? memoryStore.getAttemptsByUserId(userId) : [];

    return JEE_PHYSICS_QUESTIONS.filter((q) => {
      if (filters.chapterSlug && q.chapterSlug !== filters.chapterSlug) {
        return false;
      }
      if (filters.difficulty && q.difficulty !== filters.difficulty) {
        return false;
      }
      if (filters.questionType && q.questionType !== filters.questionType) {
        return false;
      }
      if (filters.isPYQ !== undefined && q.isPYQ !== filters.isPYQ) {
        return false;
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesCode = q.code.toLowerCase().includes(query);
        const matchesContent = q.contentLatex.toLowerCase().includes(query);
        if (!matchesCode && !matchesContent) return false;
      }

      // Check student attempt status
      if (filters.status && filters.status !== 'all' && userId) {
        const attemptsForQ = userAttempts.filter((a) => a.questionId === q.code || a.questionId === q.id);
        const isAttempted = attemptsForQ.length > 0;
        const isSolved = attemptsForQ.some((a) => a.isCorrect);

        if (filters.status === 'unattempted' && isAttempted) return false;
        if (filters.status === 'solved' && !isSolved) return false;
        if (filters.status === 'incorrect' && (!isAttempted || isSolved)) return false;
      }

      return true;
    }).map((q) => {
      const attemptsForQ = userAttempts.filter((a) => a.questionId === q.code || a.questionId === q.id);
      const isAttempted = attemptsForQ.length > 0;
      const isSolved = attemptsForQ.some((a) => a.isCorrect);

      return {
        id: q.id,
        code: q.code,
        chapterSlug: q.chapterSlug,
        topicSlug: q.topicSlug,
        examType: q.examType,
        questionType: q.questionType,
        difficulty: q.difficulty,
        marks: q.marks,
        negativeMarks: q.negativeMarks,
        timeRecommendationSec: q.timeRecommendationSec,
        isPYQ: q.isPYQ,
        pyqYear: q.pyqYear,
        contentLatex: q.contentLatex,
        isAttempted,
        isSolved,
        attemptsCount: attemptsForQ.length,
      };
    });
  }

  /**
   * Get secure question details for problem solving (strips correct answer!)
   */
  static getQuestionById(id: string, userId?: string) {
    const q = JEE_PHYSICS_QUESTIONS.find((item) => item.id === id || item.code === id);
    if (!q) {
      const err: any = new Error('Question not found');
      err.statusCode = 404;
      throw err;
    }

    const userAttempts = userId
      ? memoryStore.getAttemptsByUserId(userId).filter((a) => a.questionId === q.code || a.questionId === q.id)
      : [];

    const isSolved = userAttempts.some((a) => a.isCorrect);

    // Sanitize options: never reveal isCorrect to student before submission
    const safeOptions = q.options?.map((opt) => ({
      optionKey: opt.optionKey,
      contentLatex: opt.contentLatex,
    }));

    const currentIndex = JEE_PHYSICS_QUESTIONS.findIndex((item) => item.id === id || item.code === id);
    const prevQuestion = currentIndex > 0 ? JEE_PHYSICS_QUESTIONS[currentIndex - 1] : null;
    const nextQuestion = currentIndex >= 0 && currentIndex < JEE_PHYSICS_QUESTIONS.length - 1 ? JEE_PHYSICS_QUESTIONS[currentIndex + 1] : null;

    return {
      id: q.id,
      code: q.code,
      chapterSlug: q.chapterSlug,
      topicSlug: q.topicSlug,
      topic: { id: q.topicSlug, name: q.topicSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) },
      examType: q.examType,
      questionType: q.questionType,
      difficulty: q.difficulty,
      marks: q.marks,
      negativeMarks: q.negativeMarks,
      timeRecommendationSec: q.timeRecommendationSec,
      isPYQ: q.isPYQ,
      pyqYear: q.pyqYear,
      contentLatex: q.contentLatex,
      imageUrl: q.imageUrl,
      options: safeOptions,
      unit: q.unit,
      availableHintsCount: q.hints.length,
      solutionLatex: q.solution.solutionTextLatex,
      prevQuestionId: prevQuestion?.id || null,
      nextQuestionId: nextQuestion?.id || null,
      previousAttempts: userAttempts.map((a) => ({
        id: a.id,
        isCorrect: a.isCorrect,
        marksEarned: a.marksEarned,
        timeSpentSeconds: a.timeSpentSeconds,
        submittedAnswer: a.submittedAnswer,
        createdAt: a.createdAt,
      })),
      isSolved,
    };
  }

  /**
   * Deterministic answer evaluation engine
   */
  static evaluateSubmission(
    questionId: string,
    userId: string,
    dto: AttemptSubmissionDTO
  ) {
    const q = JEE_PHYSICS_QUESTIONS.find((item) => item.id === questionId || item.code === questionId);
    if (!q) {
      const err: any = new Error('Question not found');
      err.statusCode = 404;
      throw err;
    }

    let isCorrect = false;
    let marksEarned = 0.0;
    let diagnosedMistake = 'NONE';
    let correctAnswer: any = null;

    if (q.questionType === 'SINGLE_CORRECT') {
      const correctOption = q.options?.find((o) => o.isCorrect);
      correctAnswer = correctOption ? [correctOption.optionKey] : [];
      const submitted = Array.isArray(dto.submittedAnswer)
        ? dto.submittedAnswer[0]
        : String(dto.submittedAnswer);

      if (correctOption && submitted === correctOption.optionKey) {
        isCorrect = true;
        marksEarned = q.marks;
      } else {
        isCorrect = false;
        marksEarned = -q.negativeMarks;
        diagnosedMistake = 'CONCEPTUAL';
      }
    } else if (q.questionType === 'MULTIPLE_CORRECT') {
      const correctKeys = (q.options?.filter((o) => o.isCorrect) || []).map((o) => o.optionKey).sort();
      correctAnswer = correctKeys;
      const submittedKeys = (Array.isArray(dto.submittedAnswer) ? dto.submittedAnswer : [String(dto.submittedAnswer)]).sort();

      // Check if any wrong key selected
      const hasWrongOption = submittedKeys.some((key) => !correctKeys.includes(key));

      if (hasWrongOption) {
        isCorrect = false;
        marksEarned = -q.negativeMarks; // -2 for JEE Advanced
        diagnosedMistake = 'CONCEPTUAL';
      } else {
        // All selected are correct
        if (submittedKeys.length === correctKeys.length) {
          isCorrect = true;
          marksEarned = q.marks; // Full +4 marks
        } else {
          // Partial marking (JEE Advanced rules)
          isCorrect = false;
          marksEarned = submittedKeys.length >= 1 ? submittedKeys.length * 1.0 : 0.0;
          diagnosedMistake = 'INCOMPLETE_SOLUTION';
        }
      }
    } else if (q.questionType === 'NUMERICAL') {
      correctAnswer = q.numericalAnswer;
      const submittedNum = typeof dto.submittedAnswer === 'number'
        ? dto.submittedAnswer
        : parseFloat(String(dto.submittedAnswer));

      const tolerance = q.numericalTolerance || 0.05;
      const target = q.numericalAnswer || 0;

      if (!isNaN(submittedNum) && Math.abs(submittedNum - target) <= tolerance) {
        isCorrect = true;
        marksEarned = q.marks;
      } else {
        isCorrect = false;
        marksEarned = -q.negativeMarks;
        // Check if sign error
        if (!isNaN(submittedNum) && Math.abs(submittedNum + target) <= tolerance) {
          diagnosedMistake = 'SIGN_CONVENTION';
        } else {
          diagnosedMistake = 'CALCULATION';
        }
      }
    }

    // Record Attempt in Memory Store
    const attemptId = `att-${Date.now()}`;
    const newAttempt: QuestionAttemptEntity = {
      id: attemptId,
      userId,
      questionId: q.code,
      isCorrect,
      marksEarned,
      timeSpentSeconds: dto.timeSpentSeconds || 60,
      submittedAnswer: dto.submittedAnswer,
      hintsRequested: dto.hintsRequested || 0,
      diagnosedMistake,
      createdAt: new Date(),
    };

    memoryStore.attempts.set(attemptId, newAttempt);

    // Update Student Streak and Goals
    const profile = memoryStore.findProfileByUserId(userId);
    if (profile) {
      if (isCorrect) {
        profile.currentStreak = Math.max(profile.currentStreak, 1);
      }
      profile.updatedAt = new Date();
    }

    return {
      attemptId,
      isCorrect,
      marksEarned,
      marksAwarded: marksEarned,
      timeSpentSeconds: dto.timeSpentSeconds,
      correctAnswer,
      diagnosedMistake,
      verifiedSolution: q.solution.solutionTextLatex || q.solution,
      solutionLatex: q.solution.solutionTextLatex || q.solution,
      explanation: q.solution.solutionTextLatex || q.solution,
    };
  }

  /**
   * Progressive hint retrieval
   */
  static getHint(questionId: string, level: number) {
    const q = JEE_PHYSICS_QUESTIONS.find((item) => item.id === questionId || item.code === questionId);
    if (!q) {
      const err: any = new Error('Question not found');
      err.statusCode = 404;
      throw err;
    }

    const hint = q.hints.find((h) => h.level === level);
    if (!hint) {
      const err: any = new Error(`Hint level ${level} not available for this question`);
      err.statusCode = 404;
      throw err;
    }

    return {
      level: hint.level,
      totalHints: q.hints.length,
      hintTextLatex: hint.hintTextLatex,
    };
  }
}
