import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AiController } from '../controllers/ai.controller.js';
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
      // Ignore invalid token
    }
  }
  next();
};

router.use(optionalJwt);

router.post('/hint', AiController.getHint);
router.post('/analyze-mistake', AiController.analyzeMistake);
router.post('/chat', AiController.chat);

export default router;
