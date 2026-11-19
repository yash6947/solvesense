import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { QuestionService } from '../services/question.service.js';
import { sendSuccess, sendError } from '../utils/response.util.js';

const submitAttemptSchema = z.object({
  submittedAnswer: z.union([
    z.array(z.string()),
    z.number(),
    z.string(),
  ]),
  timeSpentSeconds: z.number().int().min(1),
  hintsRequested: z.number().int().min(0).max(4).optional(),
});

export class QuestionController {
  static getQuestions(req: Request, res: Response, next: NextFunction) {
    try {
      const { chapterSlug, difficulty, questionType, isPYQ, status, search } = req.query;

      const filters: any = {
        chapterSlug: chapterSlug as string,
        difficulty: difficulty as any,
        questionType: questionType as any,
        isPYQ: isPYQ !== undefined ? isPYQ === 'true' : undefined,
        status: status as any,
        search: search as string,
      };

      const userId = req.user?.userId;
      const questions = QuestionService.getQuestions(filters, userId);
      return sendSuccess(res, questions);
    } catch (error) {
      next(error);
    }
  }

  static getQuestionById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;
      const question = QuestionService.getQuestionById(id, userId);
      return sendSuccess(res, question);
    } catch (error) {
      next(error);
    }
  }

  static submitAttempt(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user?.userId || 'demo-student-uuid-001';

      const validated = submitAttemptSchema.parse(req.body);
      const result = QuestionService.evaluateSubmission(id, userId, validated);
      return sendSuccess(res, result, 200);
    } catch (error) {
      next(error);
    }
  }

  static getHint(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const level = parseInt(req.query.level as string, 10) || 1;
      const hint = QuestionService.getHint(id, level);
      return sendSuccess(res, hint);
    } catch (error) {
      next(error);
    }
  }
}
