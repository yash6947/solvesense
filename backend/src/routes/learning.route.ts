import { Router } from 'express';
import { LearningController } from '../controllers/learning.controller.js';
import { authenticateJwt } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateJwt);

router.get('/recommendations', LearningController.getRecommendations);
router.get('/roadmap', LearningController.getRoadmap);

export default router;
