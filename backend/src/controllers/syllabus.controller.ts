import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response.util.js';
import { 
  JEE_PHYSICS_SYLLABUS, 
  JEE_MATHEMATICS_SYLLABUS, 
  JEE_CHEMISTRY_SYLLABUS, 
  CS_DSA_SYLLABUS 
} from '../data/seedData.js';

export class SyllabusController {
  static getExaminations(_req: Request, res: Response) {
    const exams = [
      {
        id: 'exam-jee-adv',
        code: 'JEE_ADVANCED',
        name: 'JEE Advanced (IIT Joint Entrance Examination)',
        description: 'Elite examination conducted by IITs testing deep multi-concept problem solving.',
        isActive: true,
      },
      {
        id: 'exam-jee-main',
        code: 'JEE_MAIN',
        name: 'JEE Main (Joint Entrance Examination)',
        description: 'Conducted by NTA for admission to NITs, IIITs, and CFTIs.',
        isActive: true,
      },
      {
        id: 'exam-cs-dsa',
        code: 'CS_DSA',
        name: 'Algorithmic DSA & Software Engineering',
        description: 'LeetCode & GFG-grade interview algorithms, data structures, and problem-solving.',
        isActive: true,
      },
      {
        id: 'exam-neet',
        code: 'NEET',
        name: 'NEET (National Eligibility cum Entrance Test)',
        description: 'Medical entrance exam curriculum covering Physics, Chemistry, and Biology.',
        isActive: true,
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
        icon: '⚛️',
        description: 'Mechanics, Waves, Thermodynamics, Electromagnetism, Optics, Modern Physics.',
        isPrimary: true,
        chapterCount: JEE_PHYSICS_SYLLABUS.length,
      },
      {
        id: 'sub-mathematics',
        name: 'Mathematics',
        slug: 'mathematics',
        icon: '📐',
        description: 'Calculus, Vectors & 3D Geometry, Conics, Complex Numbers, Probability & Combinatorics.',
        isPrimary: true,
        chapterCount: JEE_MATHEMATICS_SYLLABUS.length,
      },
      {
        id: 'sub-chemistry',
        name: 'Chemistry',
        slug: 'chemistry',
        icon: '🧪',
        description: 'Physical Thermodynamics, Molecular Orbital Theory, Organic Mechanisms, Coordination Chemistry.',
        isPrimary: true,
        chapterCount: JEE_CHEMISTRY_SYLLABUS.length,
      },
      {
        id: 'sub-computer-science',
        name: 'Computer Science & DSA',
        slug: 'computer-science',
        icon: '💻',
        description: 'Arrays, Two Pointers, Dynamic Programming, Binary Search Trees, Graph BFS/DFS.',
        isPrimary: true,
        chapterCount: CS_DSA_SYLLABUS.length,
      },
    ];
    return sendSuccess(res, subjects);
  }

  static getSubjectChapters(req: Request, res: Response) {
    const { slug } = req.params;
    const normalized = slug.toLowerCase();

    if (normalized === 'physics') {
      return sendSuccess(res, JEE_PHYSICS_SYLLABUS);
    }
    if (normalized === 'mathematics' || normalized === 'maths') {
      return sendSuccess(res, JEE_MATHEMATICS_SYLLABUS);
    }
    if (normalized === 'chemistry') {
      return sendSuccess(res, JEE_CHEMISTRY_SYLLABUS);
    }
    if (normalized === 'computer-science' || normalized === 'dsa' || normalized === 'cs') {
      return sendSuccess(res, CS_DSA_SYLLABUS);
    }

    return sendError(res, `Subject '${slug}' not recognized.`, 404);
  }

  static getCourses(_req: Request, res: Response) {
    const courses = [
      {
        id: 'course-jee-adv-physics',
        code: 'CRSE-JEE-PHY',
        title: 'JEE Advanced Physics Mastery',
        subject: 'Physics',
        subjectSlug: 'physics',
        level: 'Advanced',
        badge: 'Top Ranker Track',
        enrolledCount: 1840,
        rating: 4.9,
        problemCount: 37,
        chaptersCount: JEE_PHYSICS_SYLLABUS.length,
        summary: 'Deep mathematical derivations, non-inertial frames, pure rolling constraints, and Gauss law fluxes.',
        color: '#00e1ab',
      },
      {
        id: 'course-jee-adv-math',
        code: 'CRSE-JEE-MATH',
        title: 'JEE Advanced Mathematics Rigor',
        subject: 'Mathematics',
        subjectSlug: 'mathematics',
        level: 'Hard',
        badge: 'IIT Calcutta / Bombay Prep',
        enrolledCount: 1620,
        rating: 4.95,
        problemCount: 25,
        chaptersCount: JEE_MATHEMATICS_SYLLABUS.length,
        summary: 'Advanced differential & integral calculus, vector triple products, conic tangencies, and Bayes probability.',
        color: '#2E5BFF',
      },
      {
        id: 'course-jee-adv-chem',
        code: 'CRSE-JEE-CHEM',
        title: 'JEE Advanced Chemistry Comprehensive',
        subject: 'Chemistry',
        subjectSlug: 'chemistry',
        level: 'Comprehensive',
        badge: 'High Scoring Anchor',
        enrolledCount: 1450,
        rating: 4.88,
        problemCount: 22,
        chaptersCount: JEE_CHEMISTRY_SYLLABUS.length,
        summary: 'Molecular orbital theory, crystal field splitting CFSE, Gibbs free energy spontaneity, and SN1/SN2 pathways.',
        color: '#ffa116',
      },
      {
        id: 'course-cs-dsa-leetcode',
        code: 'CRSE-CS-DSA',
        title: 'Algorithmic DSA & Interview Foundations',
        subject: 'Computer Science & DSA',
        subjectSlug: 'computer-science',
        level: 'LeetCode 75 Equivalent',
        badge: 'FAANG & Engineering',
        enrolledCount: 2190,
        rating: 4.98,
        problemCount: 30,
        chaptersCount: CS_DSA_SYLLABUS.length,
        summary: 'Two-pointer convergence, 0/1 knapsack dynamic programming, tree traversals, and BFS/DFS graph networks.',
        color: '#a855f7',
      },
    ];

    return sendSuccess(res, courses);
  }
}
