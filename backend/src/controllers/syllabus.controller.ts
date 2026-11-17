import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response.util.js';
import { JEE_PHYSICS_SYLLABUS } from '../data/seedData.js';

export class SyllabusController {
  static getExaminations(_req: Request, res: Response) {
    const exams = [
      {
        id: 'exam-jee-main',
        code: 'JEE_MAIN',
        name: 'JEE Main (Joint Entrance Examination)',
        description: 'Conducted by the National Testing Agency for NITs, IIITs, and CFTIs.',
        isActive: true,
      },
      {
        id: 'exam-jee-adv',
        code: 'JEE_ADVANCED',
        name: 'JEE Advanced (IIT Joint Entrance Examination)',
        description: 'Elite examination conducted by the IITs testing deep conceptual and multi-concept problem solving.',
        isActive: true,
      },
      {
        id: 'exam-neet',
        code: 'NEET',
        name: 'NEET (National Eligibility cum Entrance Test)',
        description: 'National single medical entrance test (Physics, Chemistry, Biology). Future expansion module.',
        isActive: false,
      },
    ];
    return sendSuccess(res, exams);
  }

  static getSubjects(_req: Request, res: Response) {
    const subjects = [
      {
        id: 'sub-physics',
        name: 'Physics',
        slug: 'physics',
        description: 'Primary launch subject: Mechanics, Waves, Thermodynamics, Electromagnetism, Optics, Modern Physics.',
        isPrimary: true,
        chapterCount: JEE_PHYSICS_SYLLABUS.length,
      },
      {
        id: 'sub-chemistry',
        name: 'Chemistry',
        slug: 'chemistry',
        description: 'Physical, Organic, and Inorganic Chemistry. (Roadmap Phase 2)',
        isPrimary: false,
        chapterCount: 0,
      },
      {
        id: 'sub-mathematics',
        name: 'Mathematics',
        slug: 'mathematics',
        description: 'Algebra, Calculus, Vectors 3D, Coordinate Geometry. (Roadmap Phase 2)',
        isPrimary: false,
        chapterCount: 0,
      },
    ];
    return sendSuccess(res, subjects);
  }

  static getSubjectChapters(req: Request, res: Response) {
    const { slug } = req.params;
    if (slug.toLowerCase() !== 'physics') {
      return sendError(
        res,
        `Subject '${slug}' is planned for Phase 2. Physics is currently active.`,
        404
      );
    }
    return sendSuccess(res, JEE_PHYSICS_SYLLABUS);
  }
}
