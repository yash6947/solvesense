import { JEE_PHYSICS_QUESTIONS, SeedQuestion } from '../data/questionsData.js';
import { ConceptGraphService } from './conceptGraph.service.js';
import { memoryStore } from './store.service.js';

export interface RecommendedQuestion {
  questionId: string;
  code: string;
  chapterSlug: string;
  difficulty: string;
  questionType: string;
  contentLatexPreview: string;
  reason: string;
  priorityScore: number;
}

export interface LearningTask {
  id: string;
  title: string;
  conceptCode: string;
  taskType: 'REVISE_PREREQUISITE' | 'FOUNDATION_PRACTICE' | 'CHALLENGE_ADVANCED' | 'SPACED_REVISION';
  urgency: 'HIGH' | 'MEDIUM' | 'LOW';
  dueDate: string;
  isCompleted: boolean;
  explanation: string;
}

export class AdaptiveRecommenderService {
  static getRecommendations(userId: string): {
    recommendations: RecommendedQuestion[];
    diagnosedGapsCount: number;
    primaryRecommendationMessage: string;
  } {
    const attempts = memoryStore.getAttemptsByUserId(userId);
    const gaps = ConceptGraphService.diagnoseLearningGaps(userId);

    const recommendations: RecommendedQuestion[] = [];

    // 1. If gaps detected, recommend prerequisite foundation problems
    if (gaps.length > 0) {
      for (const gap of gaps) {
        if (gap.isPrerequisiteGap && gap.rootCausePrerequisite) {
          // Find questions related to the prerequisite
          const candidate = JEE_PHYSICS_QUESTIONS.find(
            (q) =>
              q.chapterSlug.includes('laws') ||
              q.chapterSlug.includes('kin')
          );
          if (candidate && !recommendations.some((r) => r.questionId === candidate.id)) {
            recommendations.push({
              questionId: candidate.id,
              code: candidate.code,
              chapterSlug: candidate.chapterSlug,
              difficulty: candidate.difficulty,
              questionType: candidate.questionType,
              contentLatexPreview: candidate.contentLatex.substring(0, 140) + '...',
              reason: `Prerequisite Gap Detected: Master "${gap.rootCausePrerequisite.name}" before retrying ${gap.conceptName}.`,
              priorityScore: 95,
            });
          }
        }
      }
    }

    // 2. Recommend Next Difficulty Tier or Unattempted PYQ
    const attemptedIds = new Set(attempts.map((a) => a.questionId));
    const unattempted = JEE_PHYSICS_QUESTIONS.filter(
      (q) => !attemptedIds.has(q.code) && !attemptedIds.has(q.id)
    );

    for (const q of unattempted) {
      if (recommendations.length >= 4) break;
      if (!recommendations.some((r) => r.questionId === q.id)) {
        recommendations.push({
          questionId: q.id,
          code: q.code,
          chapterSlug: q.chapterSlug,
          difficulty: q.difficulty,
          questionType: q.questionType,
          contentLatexPreview: q.contentLatex.substring(0, 140) + '...',
          reason: q.isPYQ
            ? `High Exam Yield: Previous Year Question from JEE ${q.pyqYear}.`
            : `Calibrated practice to reinforce ${q.chapterSlug.replace('-', ' ')} problem solving.`,
          priorityScore: q.difficulty === 'HARD' ? 85 : 75,
        });
      }
    }

    // Default recommendation if all attempted
    if (recommendations.length === 0) {
      const first = JEE_PHYSICS_QUESTIONS[0];
      recommendations.push({
        questionId: first.id,
        code: first.code,
        chapterSlug: first.chapterSlug,
        difficulty: first.difficulty,
        questionType: first.questionType,
        contentLatexPreview: first.contentLatex.substring(0, 140) + '...',
        reason: 'Mastery revision session on coupled rotational dynamics.',
        priorityScore: 70,
      });
    }

    return {
      recommendations,
      diagnosedGapsCount: gaps.length,
      primaryRecommendationMessage:
        gaps.length > 0
          ? `Detected ${gaps.length} conceptual gap(s). Prioritize prerequisite practice below to eliminate learning debt.`
          : 'Great consistency! Here are high-yield questions calibrated to your current preparation level.',
    };
  }

  static getLearningRoadmap(userId: string): LearningTask[] {
    const gaps = ConceptGraphService.diagnoseLearningGaps(userId);

    const tasks: LearningTask[] = [
      {
        id: 'task-1',
        title: 'Free Body Diagrams on Inclined Planes',
        conceptCode: 'PHY-NLM-FBD',
        taskType: 'REVISE_PREREQUISITE',
        urgency: gaps.some((g) => g.conceptCode.includes('NLM') || g.conceptCode.includes('ROT'))
          ? 'HIGH'
          : 'MEDIUM',
        dueDate: 'Today',
        isCompleted: false,
        explanation: 'Resolve normal contact and gravitational force components along inclined coordinate axes.',
      },
      {
        id: 'task-2',
        title: 'Work-Energy Integration in Variable Force Fields',
        conceptCode: 'PHY-WEP-THEOREM',
        taskType: 'FOUNDATION_PRACTICE',
        urgency: 'MEDIUM',
        dueDate: 'Tomorrow',
        isCompleted: false,
        explanation: 'Practice potential energy curves $U(x)$ and stable equilibrium conditions.',
      },
      {
        id: 'task-3',
        title: 'Rigid Body Rolling Without Slipping',
        conceptCode: 'PHY-ROT-ROLLING',
        taskType: 'CHALLENGE_ADVANCED',
        urgency: 'HIGH',
        dueDate: 'In 2 days',
        isCompleted: false,
        explanation: 'Solve coupled rotational and translational equations about the instantaneous center of rotation.',
      },
      {
        id: 'task-4',
        title: 'Solid Angle Gauss’s Law Integration',
        conceptCode: 'PHY-ELC-GAUSS',
        taskType: 'SPACED_REVISION',
        urgency: 'LOW',
        dueDate: 'In 4 days',
        isCompleted: false,
        explanation: 'Spaced repetition revision of electric flux through open caps and symmetric conductors.',
      },
    ];

    return tasks;
  }
}
