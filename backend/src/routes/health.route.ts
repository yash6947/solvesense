import { Router, Request, Response } from 'express';
import { sendSuccess } from '../utils/response.util.js';

const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  return sendSuccess(res, {
    status: 'ONLINE',
    service: 'ZenithPhysics Backend API',
    version: '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default router;
