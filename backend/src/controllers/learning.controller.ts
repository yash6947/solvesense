import { Request, Response, NextFunction } from 'express';
import { AdaptiveRecommenderService } from '../services/adaptiveRecommender.service.js';
import { sendSuccess, sendError } from '../utils/response.util.js';

export class LearningController {
  static getRecommendations(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return sendError(res, 'Authentication required for recommendations', 401);
      }
      const data = AdaptiveRecommenderService.getRecommendations(userId);
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }

  static getRoadmap(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return sendError(res, 'Authentication required for roadmap', 401);
      }
      const roadmap = AdaptiveRecommenderService.getLearningRoadmap(userId);
      return sendSuccess(res, roadmap);
    } catch (error) {
      next(error);
    }
  }
}
