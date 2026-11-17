import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AiService } from '../services/ai/ai.service.js';
import { aiRateLimiter } from '../services/ai/ai.rate-limit.js';
import { sendSuccess, sendError } from '../utils/response.util.js';

const hintSchema = z.object({
  questionId: z.string().min(1),
  level: z.number().int().min(1).max(4),
  mentorMode: z.enum(['STRICT', 'COLLABORATIVE']).optional(),
});

const mistakeAnalysisSchema = z.object({
  questionId: z.string().min(1),
  submittedAnswer: z.any(),
  timeSpentSeconds: z.number().int().min(1),
  mentorMode: z.enum(['STRICT', 'COLLABORATIVE']).optional(),
});

const chatSchema = z.object({
  questionId: z.string().min(1),
  studentMessage: z.string().min(2).max(1000),
  mentorMode: z.enum(['STRICT', 'COLLABORATIVE']).optional(),
});

export class AiController {
  static getHint(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = hintSchema.parse(req.body);
      const hint = AiService.getProgressiveHint(
        validated.questionId,
        validated.level,
        validated.mentorMode || 'COLLABORATIVE'
      );
      return sendSuccess(res, hint);
    } catch (error) {
      next(error);
    }
  }

  static async analyzeMistake(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId || req.ip || 'anonymous';
      const rateCheck = aiRateLimiter.checkLimit(userId);
      if (!rateCheck.allowed) {
        return sendError(
          res,
          `AI rate limit reached. Please wait ${rateCheck.resetInSec}s.`,
          429,
          'RATE_LIMIT_EXCEEDED'
        );
      }

      const validated = mistakeAnalysisSchema.parse(req.body);
      const result = await AiService.analyzeMistake({
        questionId: validated.questionId,
        submittedAnswer: validated.submittedAnswer,
        timeSpentSeconds: validated.timeSpentSeconds,
        mentorMode: validated.mentorMode || 'COLLABORATIVE',
      });

      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  }

  static async chat(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId || req.ip || 'anonymous';
      const rateCheck = aiRateLimiter.checkLimit(userId);
      if (!rateCheck.allowed) {
        return sendError(
          res,
          `AI rate limit reached. Please wait ${rateCheck.resetInSec}s.`,
          429,
          'RATE_LIMIT_EXCEEDED'
        );
      }

      const validated = chatSchema.parse(req.body);
      const response = await AiService.chat({
        questionId: validated.questionId,
        studentMessage: validated.studentMessage,
        mentorMode: validated.mentorMode || 'COLLABORATIVE',
      });

      return sendSuccess(res, response);
    } catch (error) {
      next(error);
    }
  }
}
