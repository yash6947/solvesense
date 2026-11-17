import { Request, Response, NextFunction } from 'express';
import { InstituteService } from '../services/institute.service.js';
import { sendSuccess, sendError } from '../utils/response.util.js';

export class InstituteController {
  static getInstitutes(_req: Request, res: Response, next: NextFunction) {
    try {
      const institutes = InstituteService.getInstitutes();
      return sendSuccess(res, institutes);
    } catch (error) {
      next(error);
    }
  }

  static getInstituteDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = InstituteService.getInstituteDashboard(id);
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }

  static getScholarships(_req: Request, res: Response, next: NextFunction) {
    try {
      const scholarships = InstituteService.getScholarships();
      return sendSuccess(res, scholarships);
    } catch (error) {
      next(error);
    }
  }

  static applyForScholarship(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;
      if (!userId) {
        return sendError(res, 'Authentication required to apply for scholarships', 401);
      }

      const result = InstituteService.applyForScholarship(id, userId);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  }
}
