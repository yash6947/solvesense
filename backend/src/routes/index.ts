import { Router } from 'express';
import healthRouter from './health.route.js';
import authRouter from './auth.route.js';
import studentRouter from './student.route.js';
import syllabusRouter from './syllabus.route.js';
import questionRouter from './question.route.js';
import aiRouter from './ai.route.js';
import analyticsRouter from './analytics.route.js';
import learningRouter from './learning.route.js';
import contestRouter from './contest.route.js';
import instituteRouter from './institute.route.js';

const apiRouter = Router();

apiRouter.use('/', healthRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/students', studentRouter);
apiRouter.use('/syllabus', syllabusRouter);
apiRouter.use('/exams', syllabusRouter);
apiRouter.use('/questions', questionRouter);
apiRouter.use('/ai', aiRouter);
apiRouter.use('/analytics', analyticsRouter);
apiRouter.use('/learning', learningRouter);
apiRouter.use('/contests', contestRouter);
apiRouter.use('/institutes', instituteRouter);

export default apiRouter;
