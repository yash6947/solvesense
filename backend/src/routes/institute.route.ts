import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { InstituteController } from '../controllers/institute.controller.js';
import { authenticateJwt } from '../middlewares/auth.middleware.js';
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
      // Ignore
    }
  }
  next();
};

router.get('/', InstituteController.getInstitutes);
router.get('/scholarships', InstituteController.getScholarships);
router.post('/scholarships/:id/apply', optionalJwt, InstituteController.applyForScholarship);
router.get('/:id/dashboard', optionalJwt, InstituteController.getInstituteDashboard);

export default router;
