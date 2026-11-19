export type MentorMode = 'STRICT' | 'COLLABORATIVE';

export type MistakeClass =
  | 'CONCEPTUAL'
  | 'FORMULA_SELECTION'
  | 'CALCULATION'
  | 'SIGN_CONVENTION'
  | 'UNIT_CONVERSION'
  | 'QUESTION_INTERPRETATION'
  | 'PREREQUISITE_GAP'
  | 'INCOMPLETE_SOLUTION'
  | 'TIME_MANAGEMENT'
  | 'NONE';

export interface MistakeAnalysisResponse {
  mistakeType: MistakeClass;
  mistakeCategory?: string;
  feedback?: string;
  remedialAction?: string;
  analysisTextLatex: string;
  divergencePoint: string;
  prerequisiteWarning?: string | null;
  suggestedReview: string;
  mentorMode: MentorMode;
  engineUsed: 'GEMINI_API' | 'RULE_BASED_SME_ENGINE';
}

export interface HintResponse {
  level: number;
  mentorMode: MentorMode;
  hintTextLatex: string;
  guidanceNote: string;
  engineUsed: 'GEMINI_API' | 'RULE_BASED_SME_ENGINE';
}

export interface ChatResponse {
  mentorMode: MentorMode;
  replyLatex: string;
  relatedConcepts: string[];
  engineUsed: 'GEMINI_API' | 'RULE_BASED_SME_ENGINE';
}
