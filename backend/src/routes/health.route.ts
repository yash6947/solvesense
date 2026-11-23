import { Router, Request, Response } from 'express';
import { sendSuccess } from '../utils/response.util.js';
import prisma from '../config/db.js';

const router = Router();

router.get('/health', async (_req: Request, res: Response) => {
  let dbStatus = 'DISCONNECTED';
  let dbLatencyMs: number | null = null;
  let dbError: string | null = null;

  try {
    const start = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    dbLatencyMs = Date.now() - start;
    dbStatus = 'CONNECTED';
  } catch (err: any) {
    dbStatus = 'DISCONNECTED';
    dbError = err?.message || 'Database unreachable';
  }

  return sendSuccess(res, {
    status: 'ONLINE',
    service: 'Solve Sense Backend API',
    version: '1.0.0',
    uptime: process.uptime(),
    database: {
      status: dbStatus,
      latencyMs: dbLatencyMs,
      error: dbStatus === 'DISCONNECTED' ? 'Can not reach PostgreSQL at DATABASE_URL' : null,
      configuredUrl: process.env.DATABASE_URL ? (process.env.DATABASE_URL.includes('@') ? 'Configured (masked)' : 'Default localhost') : 'None',
    },
    timestamp: new Date().toISOString(),
  });
});

export default router;
