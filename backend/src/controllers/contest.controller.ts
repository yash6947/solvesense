import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ContestService } from '../services/contest.service.js';
import { sendSuccess, sendError } from '../utils/response.util.js';

const submitContestSchema = z.object({
  answers: z.record(z.any()),
  timeSpentSeconds: z.number().int().min(1),
});

export class ContestController {
  static getContests(_req: Request, res: Response, next: NextFunction) {
    try {
      const contests = ContestService.getContests();
      return sendSuccess(res, contests);
    } catch (error) {
      next(error);
    }
  }

  static getContestById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const contest = ContestService.getContestById(id);
      return sendSuccess(res, contest);
    } catch (error) {
      next(error);
    }
  }

  static getContestPaper(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const paper = ContestService.getContestPaper(id);
      return sendSuccess(res, paper);
    } catch (error) {
      next(error);
    }
  }

  static submitContest(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user?.userId || 'user-arjun-01';

      const validated = submitContestSchema.parse(req.body);
      const result = ContestService.submitContest(id, userId, validated);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  }

  static getLeaderboard(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;
      const leaderboardData = ContestService.getLeaderboard(id, userId);
      return sendSuccess(res, leaderboardData);
    } catch (error) {
      next(error);
    }
  }
}
