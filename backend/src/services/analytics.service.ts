import { memoryStore } from './store.service.js';
import { JEE_PHYSICS_SYLLABUS } from '../data/seedData.js';
import { JEE_PHYSICS_QUESTIONS } from '../data/questionsData.js';

export interface PsiBreakdown {
  overallPsi: number;
  factors: {
    accuracyFactor: { score: number; weight: number; contribution: number; description: string };
    difficultyCalibration: { score: number; weight: number; contribution: number; description: string };
    streakConsistency: { score: number; weight: number; contribution: number; description: string };
    speedEfficiency: { score: number; weight: number; contribution: number; description: string };
  };
}

export interface AnalyticsOverview {
  psi: PsiBreakdown;
  summary: {
    totalAttempted: number;
    totalCorrect: number;
    overallAccuracy: number;
    averageTimeSeconds: number;
    currentStreak: number;
    longestStreak: number;
  };
  weeklyActivity: {
    date: string;
    dayName: string;
    attempted: number;
    correct: number;
    accuracy: number;
  }[];
  difficultyBreakdown: {
    difficulty: string;
    attempted: number;
    correct: number;
    accuracy: number;
  }[];
  chapterPerformance: {
    chapterId: string;
    chapterName: string;
    slug: string;
    attempted: number;
    correct: number;
    accuracy: number;
    averageTimeSeconds: number;
  }[];
}

export class AnalyticsService {
  static getStudentOverview(userId: string): AnalyticsOverview {
    const user = memoryStore.findUserById(userId);
    const profile = memoryStore.findProfileByUserId(userId);
    const attempts = memoryStore.getAttemptsByUserId(userId);

    const totalAttempted = attempts.length;
    const totalCorrect = attempts.filter((a) => a.isCorrect).length;
    const overallAccuracy =
      totalAttempted > 0 ? parseFloat(((totalCorrect / totalAttempted) * 100).toFixed(1)) : 0;

    const totalTimeSpent = attempts.reduce((acc, curr) => acc + curr.timeSpentSeconds, 0);
    const averageTimeSeconds =
      totalAttempted > 0 ? Math.round(totalTimeSpent / totalAttempted) : 0;

    // 1. Calculate Problem-Solving Index (PSI) Breakdown
    // Accuracy Factor (0 - 100)
    const accuracyScore = overallAccuracy;

    // Difficulty Calibration: weight Hard & Advanced higher
    let difficultyScore = 70.0;
    if (totalAttempted > 0) {
      let weightedPoints = 0;
      let maxPossible = 0;
      for (const a of attempts) {
        const q = JEE_PHYSICS_QUESTIONS.find((item) => item.code === a.questionId || item.id === a.questionId);
        const weight = q?.difficulty === 'ADVANCED' ? 2.0 : q?.difficulty === 'HARD' ? 1.5 : q?.difficulty === 'MEDIUM' ? 1.0 : 0.8;
        maxPossible += weight;
        if (a.isCorrect) weightedPoints += weight;
      }
      difficultyScore = maxPossible > 0 ? parseFloat(((weightedPoints / maxPossible) * 100).toFixed(1)) : 70.0;
    }

    // Consistency: based on current streak
    const streakScore = Math.min(100, Math.max(30, (profile?.currentStreak || 1) * 15));

    // Speed Efficiency: based on solving time relative to standard 180s
    let speedScore = 75.0;
    if (averageTimeSeconds > 0) {
      if (averageTimeSeconds <= 150) speedScore = 95.0;
      else if (averageTimeSeconds <= 210) speedScore = 80.0;
      else speedScore = 65.0;
    }

    const accuracyContrib = parseFloat((0.4 * accuracyScore).toFixed(2));
    const difficultyContrib = parseFloat((0.3 * difficultyScore).toFixed(2));
    const streakContrib = parseFloat((0.15 * streakScore).toFixed(2));
    const speedContrib = parseFloat((0.15 * speedScore).toFixed(2));
    const overallPsi = totalAttempted > 0
      ? parseFloat((accuracyContrib + difficultyContrib + streakContrib + speedContrib).toFixed(1))
      : 0.0;

    const psiBreakdown: PsiBreakdown = {
      overallPsi,
      factors: {
        accuracyFactor: {
          score: accuracyScore,
          weight: 0.4,
          contribution: accuracyContrib,
          description: 'Reflects deterministic accuracy across Single, Multi-Correct & Numerical problems.',
        },
        difficultyCalibration: {
          score: difficultyScore,
          weight: 0.3,
          contribution: difficultyContrib,
          description: 'Weighted reward for solving Hard and Advanced JEE questions.',
        },
        streakConsistency: {
          score: streakScore,
          weight: 0.15,
          contribution: streakContrib,
          description: 'Measures continuous daily problem-solving dedication.',
        },
        speedEfficiency: {
          score: speedScore,
          weight: 0.15,
          contribution: speedContrib,
          description: 'Pacing efficiency measured against 3-minute JEE time targets.',
        },
      },
    };

    // 2. Weekly 7-Day Activity Trend
    const weeklyActivity = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = days[d.getDay()];

      const dayAttempts = attempts.filter((a) => {
        const attDate = new Date(a.createdAt).toISOString().split('T')[0];
        return attDate === dateStr;
      });

      const dayAttempted = dayAttempts.length;
      const dayCorrect = dayAttempts.filter((a) => a.isCorrect).length;
      const dayAccuracy =
        dayAttempted > 0 ? parseFloat(((dayCorrect / dayAttempted) * 100).toFixed(1)) : 0;

      weeklyActivity.push({
        date: dateStr,
        dayName,
        attempted: dayAttempted,
        correct: dayCorrect,
        accuracy: dayAccuracy,
      });
    }

    // 3. Difficulty Breakdown
    const difficultyMap: { [key: string]: { attempted: number; correct: number } } = {
      EASY: { attempted: 0, correct: 0 },
      MEDIUM: { attempted: 0, correct: 0 },
      HARD: { attempted: 0, correct: 0 },
      ADVANCED: { attempted: 0, correct: 0 },
    };

    for (const a of attempts) {
      const q = JEE_PHYSICS_QUESTIONS.find((item) => item.code === a.questionId || item.id === a.questionId);
      const diff = q?.difficulty || 'MEDIUM';
      if (difficultyMap[diff]) {
        difficultyMap[diff].attempted += 1;
        if (a.isCorrect) difficultyMap[diff].correct += 1;
      }
    }

    const difficultyBreakdown = Object.entries(difficultyMap).map(([difficulty, stats]) => ({
      difficulty,
      attempted: stats.attempted,
      correct: stats.correct,
      accuracy:
        stats.attempted > 0 ? parseFloat(((stats.correct / stats.attempted) * 100).toFixed(1)) : 0,
    }));

    // 4. Chapter Performance
    const chapterPerformance = JEE_PHYSICS_SYLLABUS.map((chap) => {
      const chapKey = chap.slug.toUpperCase().substring(0, 3);
      const chapAttempts = attempts.filter((a) => a.questionId.includes(chapKey));
      const chapCorrect = chapAttempts.filter((a) => a.isCorrect).length;
      const chapAccuracy =
        chapAttempts.length > 0
          ? parseFloat(((chapCorrect / chapAttempts.length) * 100).toFixed(1))
          : 0;

      const chapTime = chapAttempts.reduce((acc, curr) => acc + curr.timeSpentSeconds, 0);
      const chapAvgTime =
        chapAttempts.length > 0 ? Math.round(chapTime / chapAttempts.length) : 0;

      return {
        chapterId: chap.id,
        chapterName: chap.name,
        slug: chap.slug,
        attempted: chapAttempts.length,
        correct: chapCorrect,
        accuracy: chapAccuracy,
        averageTimeSeconds: chapAvgTime,
      };
    });

    return {
      psi: psiBreakdown,
      summary: {
        totalAttempted,
        totalCorrect,
        overallAccuracy,
        averageTimeSeconds,
        currentStreak: profile?.currentStreak || 0,
        longestStreak: profile?.longestStreak || 0,
      },
      weeklyActivity,
      difficultyBreakdown,
      chapterPerformance,
    };
  }
}
