import { Request, Response, NextFunction } from 'express';
import { AnalyticsService } from '../services/analytics.service.js';
import { ConceptGraphService } from '../services/conceptGraph.service.js';
import { sendSuccess, sendError } from '../utils/response.util.js';

export class AnalyticsController {
  static getOverview(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return sendError(res, 'Authentication required for analytics', 401);
      }
      const data = AnalyticsService.getStudentOverview(userId);
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }

  static getKnowledgeGaps(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return sendError(res, 'Authentication required for knowledge gap analysis', 401);
      }
      const gaps = ConceptGraphService.diagnoseLearningGaps(userId);
      return sendSuccess(res, gaps);
    } catch (error) {
      next(error);
    }
  }
}
