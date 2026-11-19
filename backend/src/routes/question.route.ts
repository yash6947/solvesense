import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { QuestionController } from '../controllers/question.controller.js';
import { authenticateJwt } from '../middlewares/auth.middleware.js';
import { ENV } from '../config/env.config.js';

const router = Router();

// Optional JWT extractor for reading question bank with student status
const optionalJwt = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, ENV.JWT_SECRET) as any;
      req.user = decoded;
    } catch (e) {
      // Ignore token failure for public endpoints
    }
  }
  next();
};

router.get('/', optionalJwt, QuestionController.getQuestions);
router.get('/:id', optionalJwt, QuestionController.getQuestionById);
router.get('/:id/hints', QuestionController.getHint);
router.post('/:id/attempts', optionalJwt, QuestionController.submitAttempt);
router.post('/:id/submit', optionalJwt, QuestionController.submitAttempt);

export default router;
