import { Router } from 'express';
import { SyllabusController } from '../controllers/syllabus.controller.js';

const router = Router();

router.get('/exams', SyllabusController.getExaminations);
router.get('/subjects', SyllabusController.getSubjects);
router.get('/subjects/:slug/chapters', SyllabusController.getSubjectChapters);

export default router;
