import { Router } from 'express';
import healthRouter from './health.route.js';
import authRouter from './auth.route.js';
import studentRouter from './student.route.js';
import syllabusRouter from './syllabus.route.js';

const apiRouter = Router();

apiRouter.use('/', healthRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/students', studentRouter);
apiRouter.use('/syllabus', syllabusRouter);
apiRouter.use('/exams', syllabusRouter);

export default apiRouter;
