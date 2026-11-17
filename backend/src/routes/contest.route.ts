import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ContestController } from '../controllers/contest.controller.js';
import { authenticateJwt } from '../middlewares/auth.middleware.js';
import { ENV } from '../config/env.config.js';

const router = Router();

const optionalJwt = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, ENV.JWT_SECRET) as any;
      req.user = decoded;
    } catch (e) {
      // Ignore
    }
  }
  next();
};

router.get('/', ContestController.getContests);
router.get('/:id', ContestController.getContestById);
router.get('/:id/paper', optionalJwt, ContestController.getContestPaper);
router.post('/:id/submit', authenticateJwt, ContestController.submitContest);
router.get('/:id/leaderboard', optionalJwt, ContestController.getLeaderboard);

export default router;
