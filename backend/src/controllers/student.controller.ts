import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { StudentService } from '../services/student.service.js';
import { sendSuccess, sendError } from '../utils/response.util.js';

const updateProfileSchema = z.object({
  targetExam: z.enum(['JEE_MAIN', 'JEE_ADVANCED', 'NEET', 'BOTH_JEE']).optional(),
  targetYear: z.number().int().min(2024).max(2030).optional(),
  dailyGoalQuestions: z.number().int().min(1).max(100).optional(),
  academicLevel: z.string().optional(),
  preferredSubjects: z.array(z.string()).optional(),
});

export class StudentController {
  static getDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return sendError(res, 'Authentication required', 401);
      }
      const data = StudentService.getDashboard(userId);
      return sendSuccess(res, data, 200);
    } catch (error) {
      next(error);
    }
  }

  static updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return sendError(res, 'Authentication required', 401);
      }
      const validated = updateProfileSchema.parse(req.body);
      const updated = StudentService.updateProfile(userId, validated);
      return sendSuccess(res, updated, 200);
    } catch (error) {
      next(error);
    }
  }
}
