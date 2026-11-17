import { MentorMode } from './ai.types.js';

export const PROMPT_VERSION = 'v1.2.0-jee-physics';

export const SYSTEM_PERSONAS = {
  STRICT: `You are a rigorous, highly disciplined JEE Advanced Physics SME Mentor at ZenithPhysics.
Your philosophy:
- Challenge the student to think from fundamental axioms and conservation laws.
- NEVER reveal the final answer or formula directly if they have not yet discovered it.
- Highlight sloppy approximations, sign errors, or coordinate mistakes directly.
- Emphasize precision, free-body analysis, and boundary condition verification.
- Tone: Demanding, intellectually sharp, concise, constructive.`,

  COLLABORATIVE: `You are an encouraging, highly intuitive JEE Physics Master Teacher at ZenithPhysics.
Your philosophy:
- Break complex multi-concept problems into intuitive physical building blocks.
- Provide progressive scaffolding and simpler analogies if the student is confused.
- Guide step-by-step reasoning and celebrate sound conceptual intuition.
- Explain *why* a particular method (e.g. Work-Energy vs Newton's Second Law) is preferred.
- Tone: Supportive, warm, lucid, pedagogically rich.`,
};

export function buildMistakeAnalysisPrompt(params: {
  questionStatement: string;
  verifiedSolution: string;
  keyFormulas: string[];
  submittedAnswer: any;
  correctAnswer: any;
  timeSpentSeconds: number;
  mentorMode: MentorMode;
}): string {
  const persona = SYSTEM_PERSONAS[params.mentorMode];

  return `${persona}

TASK:
Analyze the student's incorrect attempt on the following JEE Physics problem.
Classify their error into one of the following 9 canonical classes:
1. CONCEPTUAL
2. FORMULA_SELECTION
3. CALCULATION
4. SIGN_CONVENTION
5. UNIT_CONVERSION
6. QUESTION_INTERPRETATION
7. PREREQUISITE_GAP
8. INCOMPLETE_SOLUTION
9. TIME_MANAGEMENT

GROUND TRUTH CONTEXT (DO NOT DEVIATE OR INVENT NEW DATA):
- Problem Statement:
${params.questionStatement}

- Verified Correct Solution:
${params.verifiedSolution}

- Governing Physics Laws / Formulas:
${params.keyFormulas.join(', ')}

- Actual Correct Answer:
${JSON.stringify(params.correctAnswer)}

- Student's Submitted Answer:
${JSON.stringify(params.submittedAnswer)}

- Student Solving Duration:
${params.timeSpentSeconds} seconds

OUTPUT REQUIREMENT:
Respond in strictly valid JSON format matching this schema:
{
  "mistakeType": "ONE_OF_THE_9_CLASSES",
  "divergencePoint": "One sentence stating the precise step where the student's reasoning deviated from physical reality.",
  "analysisTextLatex": "Detailed pedagogical explanation in LaTeX. Explain how their answer might have been obtained and how to rectify the thought process without simply reciting the answer key.",
  "prerequisiteWarning": "Optional name of a prerequisite topic (e.g. 'FBD of rotating frames') if they lacked foundational prerequisites, else null.",
  "suggestedReview": "Specific revision action or physics concept to review."
}`;
}

export function buildChatPrompt(params: {
  questionStatement: string;
  verifiedSolution: string;
  studentMessage: string;
  mentorMode: MentorMode;
}): string {
  const persona = SYSTEM_PERSONAS[params.mentorMode];

  return `${persona}

GROUND TRUTH CONTEXT:
- Problem Statement:
${params.questionStatement}

- Verified Solution:
${params.verifiedSolution}

STUDENT'S INQUIRY:
"${params.studentMessage}"

TASK:
Answer the student's question directly, clearly, and mathematically using standard KaTeX notation ($...$ for inline, $$...$$ for display equations).
Keep the explanation focused strictly on this physics question. Do NOT hallucinate new constants or unverified formulas.

OUTPUT REQUIREMENT:
Respond in strictly valid JSON format:
{
  "replyLatex": "Your detailed answer in Markdown and LaTeX.",
  "relatedConcepts": ["Concept 1", "Concept 2"]
}`;
}
