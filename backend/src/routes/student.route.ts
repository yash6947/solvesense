import { Router } from 'express';
import { StudentController } from '../controllers/student.controller.js';
import { authenticateJwt, optionalJwt } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/dashboard', optionalJwt, StudentController.getDashboard);
router.patch('/profile', authenticateJwt, StudentController.updateProfile);

export default router;
