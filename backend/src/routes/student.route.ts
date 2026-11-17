import { Router } from 'express';
import { StudentController } from '../controllers/student.controller.js';
import { authenticateJwt } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateJwt);

router.get('/dashboard', StudentController.getDashboard);
router.patch('/profile', StudentController.updateProfile);

export default router;
