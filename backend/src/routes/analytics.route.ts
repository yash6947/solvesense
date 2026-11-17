import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller.js';
import { authenticateJwt } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateJwt);

router.get('/overview', AnalyticsController.getOverview);
router.get('/knowledge-gaps', AnalyticsController.getKnowledgeGaps);

export default router;
