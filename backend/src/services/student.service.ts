import { memoryStore } from './store.service.js';
import { JEE_PHYSICS_SYLLABUS } from '../data/seedData.js';
import { JEE_PHYSICS_QUESTIONS } from '../data/questionsData.js';

export interface DashboardMetrics {
  profile: {
    fullName: string;
    email: string;
    targetExam: string;
    targetYear: number;
    academicLevel: string;
    dailyGoalQuestions: number;
    currentStreak: number;
    longestStreak: number;
    problemSolvingIndex: number;
  };
  performance: {
    totalAttempted: number;
    totalCorrect: number;
    accuracyPercentage: number;
    averageTimeSeconds: number;
    dailyGoalProgress: {
      completedToday: number;
      target: number;
      percentage: number;
    };
  };
  subjectProgress: {
    subjectName: string;
    chapters: {
      chapterId: string;
      chapterName: string;
      slug: string;
      topicsCount: number;
      attemptedCount: number;
      accuracyPercentage: number;
    }[];
  };
  weakConcepts: {
    code: string;
    name: string;
    chapterName: string;
    accuracy: number;
    diagnosedMistake: string;
    recommendation: string;
  }[];
  recentActivity: {
    attemptId: string;
    questionId: string;
    isCorrect: boolean;
    marksEarned: number;
    timeSpentSeconds: number;
    diagnosedMistake: string;
    aiMentorFeedback?: string;
    createdAt: string;
  }[];
  learningRoadmap: {
    stepNumber: number;
    conceptCode: string;
    title: string;
    status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING';
    reason: string;
  }[];
}

export class StudentService {
  static getDashboard(userId: string): DashboardMetrics {
    const user = memoryStore.findUserById(userId);
    const profile = memoryStore.findProfileByUserId(userId);

    if (!user || !profile) {
      const error: any = new Error('Student profile not found');
      error.statusCode = 404;
      throw error;
    }

    const attempts = memoryStore.getAttemptsByUserId(userId);
    const totalAttempted = attempts.length;
    const totalCorrect = attempts.filter((a) => a.isCorrect).length;
    const accuracyPercentage =
      totalAttempted > 0 ? parseFloat(((totalCorrect / totalAttempted) * 100).toFixed(1)) : 0.0;

    const totalTimeSpent = attempts.reduce((acc, curr) => acc + curr.timeSpentSeconds, 0);
    const averageTimeSeconds =
      totalAttempted > 0 ? Math.round(totalTimeSpent / totalAttempted) : 0;

    // Check attempts completed today (UTC)
    const today = new Date().toDateString();
    const attemptsToday = attempts.filter(
      (a) => new Date(a.createdAt).toDateString() === today
    ).length;

    // Compute dynamic Problem Solving Index (PSI)
    // Formula: PSI = (0.4 * accuracy) + (0.3 * consistency) + (0.3 * difficulty/time efficiency)
    let computedPsi = 0.0;
    if (totalAttempted > 0) {
      const accuracyFactor = accuracyPercentage; // 0 - 100
      const streakFactor = Math.min(profile.currentStreak * 10, 100);
      const speedFactor = averageTimeSeconds > 0 && averageTimeSeconds < 180 ? 90 : 70;
      computedPsi = parseFloat(
        (0.4 * accuracyFactor + 0.3 * streakFactor + 0.3 * speedFactor).toFixed(1)
      );
    }

    // Weak concepts diagnosed from mistakes
    const weakAttempts = attempts.filter((a) => !a.isCorrect);
    const weakConcepts = weakAttempts.map((wa) => ({
      code: wa.questionId.includes('ROT') ? 'PHY-ROT-ANG-MOM' : 'PHY-NLM-INCLINE-FRIC',
      name: wa.questionId.includes('ROT')
        ? 'Rotational Torque & Angular Acceleration'
        : 'Static vs Kinetic Friction on Inclined Planes',
      chapterName: wa.questionId.includes('ROT') ? 'Rotational Motion' : 'Laws of Motion',
      accuracy: 40.0,
      diagnosedMistake: wa.diagnosedMistake,
      recommendation: 'Revise torque coordinate resolution before attempting coupled rigid body problems.',
    }));

    // Chapter-wise progress calculated from syllabus
    const chaptersProgress = JEE_PHYSICS_SYLLABUS.map((chap) => {
      // Find attempts matching this chapter
      const chapKey = chap.slug.toUpperCase().substring(0, 3);
      const chapAttempts = attempts.filter((a) => a.questionId.includes(chapKey));
      const chapCorrect = chapAttempts.filter((a) => a.isCorrect).length;
      const chapAccuracy =
        chapAttempts.length > 0
          ? parseFloat(((chapCorrect / chapAttempts.length) * 100).toFixed(1))
          : 0.0;

      return {
        chapterId: chap.id,
        chapterName: chap.name,
        name: chap.name,
        slug: chap.slug,
        chapterSlug: chap.slug,
        topicsCount: chap.topics.length,
        attemptedCount: chapAttempts.length,
        solvedCount: chapCorrect,
        totalQuestions: Math.max(chapAttempts.length, chap.topics.length * 2),
        masteryScore: chapAccuracy,
        accuracyPercentage: chapAccuracy,
      };
    });

    const roadmap = [
      {
        stepNumber: 1,
        conceptCode: 'PHY-KIN-DIFF-CALC',
        title: 'Differential Calculus in Non-Uniform Kinematics',
        status: totalAttempted > 0 ? ('COMPLETED' as const) : ('IN_PROGRESS' as const),
        reason: 'Master foundation of variable acceleration before moving to Newton’s second law.',
      },
      {
        stepNumber: 2,
        conceptCode: 'PHY-NLM-INCLINE-FRIC',
        title: 'Friction Equilibrium on Rough Inclined Planes',
        status: weakConcepts.some((w) => w.code === 'PHY-NLM-INCLINE-FRIC')
          ? ('IN_PROGRESS' as const)
          : ('UPCOMING' as const),
        reason: 'Reinforce normal force vectors and static friction limits.',
      },
      {
        stepNumber: 3,
        conceptCode: 'PHY-ROT-ANG-MOM',
        title: 'Rigid Body Angular Momentum Conservation',
        status: 'UPCOMING' as const,
        reason: 'Recommended practice following Rotational Dynamics review.',
      },
    ];

    return {
      profile: {
        fullName: user.fullName,
        email: user.email,
        targetExam: profile.targetExam,
        targetYear: profile.targetYear,
        academicLevel: profile.academicLevel,
        dailyGoalQuestions: profile.dailyGoalQuestions,
        currentStreak: profile.currentStreak,
        longestStreak: profile.longestStreak,
        problemSolvingIndex: computedPsi,
      },
      performance: {
        totalAttempted,
        totalCorrect,
        accuracyPercentage,
        averageTimeSeconds,
        dailyGoalProgress: {
          completedToday: attemptsToday,
          target: profile.dailyGoalQuestions,
          percentage: Math.min(
            100,
            Math.round((attemptsToday / Math.max(profile.dailyGoalQuestions, 1)) * 100)
          ),
        },
      },
      subjectProgress: {
        subjectName: 'Physics',
        chapters: chaptersProgress,
      },
      weakConcepts: weakConcepts.map(wc => ({
        ...wc,
        topic: wc.name,
      })),
      recentActivity: attempts.slice(0, 10).map((a) => {
        const matchedQ = JEE_PHYSICS_QUESTIONS.find(
          (q) => q.id === a.questionId || q.code === a.questionId
        );
        const resolvedId = matchedQ ? matchedQ.id : a.questionId;
        const resolvedTitle = matchedQ
          ? `${matchedQ.code} (${matchedQ.topicSlug.replace(/-/g, ' ')})`
          : `Problem ${a.questionId}`;

        return {
          attemptId: a.id,
          questionId: resolvedId,
          questionTitle: resolvedTitle,
          isCorrect: a.isCorrect,
          marksEarned: a.marksEarned,
          marksAwarded: a.marksEarned,
          timeSpentSeconds: a.timeSpentSeconds,
          diagnosedMistake: a.diagnosedMistake,
          aiMentorFeedback: a.aiMentorFeedback,
          createdAt: a.createdAt.toISOString(),
        };
      }),
      learningRoadmap: roadmap,
    };
  }

  static updateProfile(
    userId: string,
    updates: {
      targetExam?: 'JEE_MAIN' | 'JEE_ADVANCED' | 'NEET' | 'BOTH_JEE';
      targetYear?: number;
      dailyGoalQuestions?: number;
      academicLevel?: string;
      preferredSubjects?: string[];
    }
  ) {
    const profile = memoryStore.findProfileByUserId(userId);
    if (!profile) {
      const error: any = new Error('Student profile not found');
      error.statusCode = 404;
      throw error;
    }

    if (updates.targetExam) profile.targetExam = updates.targetExam;
    if (updates.targetYear) profile.targetYear = updates.targetYear;
    if (updates.dailyGoalQuestions) profile.dailyGoalQuestions = updates.dailyGoalQuestions;
    if (updates.academicLevel) profile.academicLevel = updates.academicLevel;
    if (updates.preferredSubjects) profile.preferredSubjects = updates.preferredSubjects;
    profile.updatedAt = new Date();

    return profile;
  }
}
