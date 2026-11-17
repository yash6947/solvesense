import { SEED_CONTESTS, SEED_LEADERBOARDS, SeedContest, ContestLeaderboardUser } from '../data/contestsData.js';
import { JEE_PHYSICS_QUESTIONS, SeedQuestion } from '../data/questionsData.js';
import { memoryStore } from './store.service.js';

export interface SubmitContestDTO {
  answers: { [questionId: string]: string[] | number | string };
  timeSpentSeconds: number;
}

export class ContestService {
  static getContests(): SeedContest[] {
    return SEED_CONTESTS;
  }

  static getContestById(contestId: string) {
    const contest = SEED_CONTESTS.find((c) => c.id === contestId || c.slug === contestId);
    if (!contest) {
      const err: any = new Error('Contest not found');
      err.statusCode = 404;
      throw err;
    }
    return contest;
  }

  /**
   * Fetch complete sanitized question paper for contest takers
   */
  static getContestPaper(contestId: string) {
    const contest = this.getContestById(contestId);

    const questions = contest.questionIds
      .map((qid, idx) => {
        const q = JEE_PHYSICS_QUESTIONS.find((item) => item.id === qid || item.code === qid);
        if (!q) return null;

        return {
          id: q.id,
          code: q.code,
          index: idx + 1,
          questionType: q.questionType,
          marks: q.marks,
          negativeMarks: q.negativeMarks,
          contentLatex: q.contentLatex,
          imageUrl: q.imageUrl,
          unit: q.unit,
          options: q.options?.map((opt) => ({
            optionKey: opt.optionKey,
            contentLatex: opt.contentLatex,
          })),
        };
      })
      .filter(Boolean);

    return {
      contest: {
        id: contest.id,
        title: contest.title,
        examType: contest.examType,
        durationMinutes: contest.durationMinutes,
        totalMarks: contest.totalMarks,
        questionsCount: questions.length,
      },
      questions,
    };
  }

  /**
   * Deterministic Evaluation and Server-Enforced Rank Assignment
   */
  static submitContest(contestId: string, userId: string, dto: SubmitContestDTO) {
    const contest = this.getContestById(contestId);
    const user = memoryStore.findUserById(userId);
    const profile = memoryStore.findProfileByUserId(userId);

    let totalScore = 0.0;
    let correctCount = 0;
    let attemptedCount = 0;
    const itemizedResults: any[] = [];

    for (const qid of contest.questionIds) {
      const q = JEE_PHYSICS_QUESTIONS.find((item) => item.id === qid || item.code === qid);
      if (!q) continue;

      const studentAns = dto.answers[q.id] || dto.answers[q.code];
      const isAttempted = studentAns !== undefined && studentAns !== null && studentAns !== '';

      let questionMarks = 0.0;
      let isCorrect = false;

      if (isAttempted) {
        attemptedCount += 1;

        if (q.questionType === 'SINGLE_CORRECT') {
          const correctKey = q.options?.find((o) => o.isCorrect)?.optionKey;
          const submitted = Array.isArray(studentAns) ? studentAns[0] : String(studentAns);
          if (correctKey && submitted === correctKey) {
            isCorrect = true;
            questionMarks = q.marks;
            correctCount += 1;
          } else {
            questionMarks = -q.negativeMarks;
          }
        } else if (q.questionType === 'MULTIPLE_CORRECT') {
          const correctKeys = (q.options?.filter((o) => o.isCorrect) || []).map((o) => o.optionKey).sort();
          const submittedKeys = (Array.isArray(studentAns) ? studentAns : [String(studentAns)]).sort();
          const hasWrongOption = submittedKeys.some((k) => !correctKeys.includes(k));

          if (hasWrongOption) {
            questionMarks = -q.negativeMarks;
          } else if (submittedKeys.length === correctKeys.length) {
            isCorrect = true;
            questionMarks = q.marks;
            correctCount += 1;
          } else {
            // Partial mark
            questionMarks = submittedKeys.length * 1.0;
          }
        } else if (q.questionType === 'NUMERICAL') {
          const num = typeof studentAns === 'number' ? studentAns : parseFloat(String(studentAns));
          const tolerance = q.numericalTolerance || 0.05;
          const target = q.numericalAnswer || 0;

          if (!isNaN(num) && Math.abs(num - target) <= tolerance) {
            isCorrect = true;
            questionMarks = q.marks;
            correctCount += 1;
          } else {
            questionMarks = -q.negativeMarks;
          }
        }
      }

      totalScore += questionMarks;

      itemizedResults.push({
        questionId: q.id,
        code: q.code,
        isAttempted,
        isCorrect,
        marksAwarded: questionMarks,
        maxMarks: q.marks,
      });
    }

    // Clamp score to >= 0 if required or allow raw marks
    totalScore = parseFloat(totalScore.toFixed(2));

    // Update or insert into Leaderboard
    const studentName = user?.fullName || 'Anonymous Aspirant';
    const email = user?.email || 'student@jee.zenith.edu';
    const maskedEmail = email.substring(0, 2) + '***@' + email.split('@')[1];

    if (!SEED_LEADERBOARDS[contest.id]) {
      SEED_LEADERBOARDS[contest.id] = [];
    }

    const leaderboard = SEED_LEADERBOARDS[contest.id];
    const existingIndex = leaderboard.findIndex((entry) => entry.maskedEmail === maskedEmail);

    const newEntry: ContestLeaderboardUser = {
      rank: 0,
      studentName,
      maskedEmail,
      targetExam: profile?.targetExam ? profile.targetExam.replace('_', ' ') : 'JEE Advanced',
      score: totalScore,
      totalTimeSeconds: dto.timeSpentSeconds || 1200,
      solvedCount: correctCount,
      submittedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      leaderboard[existingIndex] = newEntry;
    } else {
      leaderboard.push(newEntry);
    }

    // Re-rank by score DESC, then totalTimeSeconds ASC
    leaderboard.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.totalTimeSeconds - b.totalTimeSeconds;
    });

    leaderboard.forEach((entry, i) => {
      entry.rank = i + 1;
    });

    const userEntry = leaderboard.find((e) => e.maskedEmail === maskedEmail);

    return {
      contestId: contest.id,
      totalScore,
      maxPossibleMarks: contest.totalMarks,
      attemptedCount,
      correctCount,
      totalQuestions: contest.questionIds.length,
      timeSpentSeconds: dto.timeSpentSeconds,
      rank: userEntry?.rank || 1,
      totalParticipants: leaderboard.length,
      itemizedResults,
    };
  }

  static getLeaderboard(contestId: string, userId?: string) {
    const contest = this.getContestById(contestId);
    const leaderboard = SEED_LEADERBOARDS[contest.id] || [];

    const user = userId ? memoryStore.findUserById(userId) : null;
    let userRank: any = null;

    if (user) {
      const email = user.email;
      const masked = email.substring(0, 2) + '***@' + email.split('@')[1];
      userRank = leaderboard.find((e) => e.maskedEmail === masked) || null;
    }

    return {
      contest: {
        id: contest.id,
        title: contest.title,
        examType: contest.examType,
        totalMarks: contest.totalMarks,
      },
      leaderboard,
      userRank,
    };
  }
}
