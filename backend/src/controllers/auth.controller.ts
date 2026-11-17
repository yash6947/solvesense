import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AuthService } from '../services/auth.service.js';
import { sendSuccess, sendError } from '../utils/response.util.js';

const registerSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  targetExam: z.enum(['JEE_MAIN', 'JEE_ADVANCED', 'NEET', 'BOTH_JEE']).optional(),
  targetYear: z.number().int().min(2024).max(2030).optional(),
  academicLevel: z.string().optional(),
  preferredSubjects: z.array(z.string()).optional(),
});

const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = registerSchema.parse(req.body);
      const result = await AuthService.registerStudent(validatedData);
      return sendSuccess(res, result, 201);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const result = await AuthService.login(email, password);
      return sendSuccess(res, result, 200);
    } catch (error) {
      next(error);
    }
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.userId) {
        return sendError(res, 'Unauthorized', 401);
      }
      const data = await AuthService.getMe(req.user.userId);
      return sendSuccess(res, data, 200);
    } catch (error) {
      next(error);
    }
  }

  static async logout(_req: Request, res: Response) {
    return sendSuccess(res, { message: 'Logged out successfully' }, 200);
  }
}
