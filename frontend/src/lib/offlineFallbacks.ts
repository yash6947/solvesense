// Offline & Vercel Standalone Fallbacks for Solve Sense
// Ensures 100% operational UI and AI Copilot when running on Vercel without a separate live backend

export const FALLBACK_QUESTIONS = [
  {
    id: 'PHY-ADV-24-ROT-01',
    code: 'PHY-ADV-24-ROT-01',
    chapterSlug: 'rotational-motion',
    topicSlug: 'rolling-motion',
    topic: { name: 'Pure Rolling Dynamics & Friction', chapter: { name: 'Rotational Motion' } },
    primaryConceptCode: 'PHY-ROT-ROLLING',
    examType: 'JEE_ADVANCED',
    questionType: 'SINGLE_CORRECT',
    difficulty: 'HARD',
    marks: 4,
    negativeMarks: 1,
    timeRecommendationSec: 240,
    isPYQ: true,
    pyqYear: 2024,
    contentLatex: 'A uniform solid cylinder of mass $M$ and radius $R$ is placed on a rough horizontal surface with coefficient of friction $\\mu$. A horizontal force $F$ is applied at a height $h = \\frac{3R}{2}$ above the central horizontal axis. What is the linear acceleration $a_{cm}$ of the center of mass if the cylinder rolls without slipping?',
    options: [
      { optionKey: 'A', contentLatex: '$\\frac{F}{M}$' },
      { optionKey: 'B', contentLatex: '$\\frac{5F}{3M}$' },
      { optionKey: 'C', contentLatex: '$\\frac{4F}{3M}$' },
      { optionKey: 'D', contentLatex: '$\\frac{2F}{3M}$' },
    ],
    correctAnswer: ['B'],
    solutionLatex: '$$\\text{Taking torque about contact point } P:$$\n$$\\tau_P = I_P \\alpha \\implies F\\left(R + \\frac{3R}{2}\\right) = \\left(\\frac{1}{2}MR^2 + MR^2\\right) \\alpha$$\n$$F\\left(\\frac{5R}{2}\\right) = \\frac{3}{2}MR^2 \\alpha \\implies \\alpha = \\frac{5F}{3MR}$$\n$$\\text{For pure rolling: } a_{cm} = \\alpha R = \\frac{5F}{3M}.$$',
    conceptTags: ['Moment of Inertia', 'Torque about Instantaneous Center', 'Friction Constraint'],
    nextQuestionId: 'PHY-ADV-24-ROT-02',
    prevQuestionId: null,
  },
  {
    id: 'PHY-ADV-24-ROT-02',
    code: 'PHY-ADV-24-ROT-02',
    chapterSlug: 'rotational-motion',
    topicSlug: 'angular-momentum',
    topic: { name: 'Conservation of Angular Momentum', chapter: { name: 'Rotational Motion' } },
    primaryConceptCode: 'PHY-ROT-ANG-MOM',
    examType: 'JEE_ADVANCED',
    questionType: 'MULTIPLE_CORRECT',
    difficulty: 'ADVANCED',
    marks: 4,
    negativeMarks: 2,
    timeRecommendationSec: 300,
    isPYQ: true,
    pyqYear: 2023,
    contentLatex: 'A thin uniform rod of length $L$ and mass $M$ pivots smoothly about a horizontal axis through one end. It is released from rest horizontally. Which of the following statements are correct as it passes the vertical position?',
    options: [
      { optionKey: 'A', contentLatex: 'Angular velocity $\\omega = \\sqrt{\\frac{3g}{L}}$' },
      { optionKey: 'B', contentLatex: 'Angular momentum about pivot is $M L \\sqrt{\\frac{gL}{3}}$' },
      { optionKey: 'C', contentLatex: 'Force on pivot at vertical position is $\\frac{5}{2}Mg$' },
      { optionKey: 'D', contentLatex: 'Tangential acceleration at vertical position is $g$' },
    ],
    correctAnswer: ['A', 'C'],
    solutionLatex: '$$\\text{Loss in PE = Gain in KE: } Mg\\frac{L}{2} = \\frac{1}{2} I \\omega^2 = \\frac{1}{2} \\left(\\frac{ML^2}{3}\\right)\\omega^2 \\implies \\omega = \\sqrt{\\frac{3g}{L}}.$$\n$$\\text{Radial acceleration of CM: } a_r = \\omega^2 \\frac{L}{2} = \\frac{3g}{2}.$$\n$$\\text{Vertical force equation: } N - Mg = M a_r \\implies N = Mg + M\\left(\\frac{3g}{2}\\right) = \\frac{5}{2}Mg.$$',
    conceptTags: ['Work-Energy Theorem', 'Rotational Dynamics', 'Hinged Pivot Forces'],
    nextQuestionId: 'PHY-ADV-24-KIN-01',
    prevQuestionId: 'PHY-ADV-24-ROT-01',
  },
  {
    id: 'PHY-ADV-24-KIN-01',
    code: 'PHY-ADV-24-KIN-01',
    chapterSlug: 'kinematics',
    topicSlug: 'rectilinear-motion',
    topic: { name: 'Non-Uniform Acceleration & Calculus', chapter: { name: 'Kinematics' } },
    primaryConceptCode: 'PHY-KIN-DIFF-CALC',
    examType: 'JEE_MAIN',
    questionType: 'NUMERICAL',
    difficulty: 'MEDIUM',
    marks: 4,
    negativeMarks: 0,
    timeRecommendationSec: 150,
    isPYQ: false,
    contentLatex: 'A particle moves along the $x$-axis with acceleration $a(t) = 6t - 4\\text{ m/s}^2$. At $t = 0$, its velocity is $v_0 = -2\\text{ m/s}$ and position $x_0 = 0$. Calculate the velocity (in m/s) at $t = 2\\text{ s}$.',
    numericalAnswer: 2,
    numericalTolerance: 0.05,
    solutionLatex: '$$v(t) = v_0 + \\int_0^t (6t - 4) dt = -2 + 3t^2 - 4t$$\n$$\\text{At } t = 2\\text{ s}: v(2) = -2 + 3(4) - 4(2) = -2 + 12 - 8 = +2\\text{ m/s}.$$',
    conceptTags: ['Differential Calculus in Kinematics', 'Definite Integration of Acceleration'],
    nextQuestionId: null,
    prevQuestionId: 'PHY-ADV-24-ROT-02',
  },
];

export const FALLBACK_CHAPTERS = [
  { id: 'chap-1', name: 'Rotational Motion', slug: 'rotational-motion', questionCount: 12 },
  { id: 'chap-2', name: 'Kinematics', slug: 'kinematics', questionCount: 8 },
  { id: 'chap-3', name: 'Laws of Motion', slug: 'laws-of-motion', questionCount: 7 },
  { id: 'chap-4', name: 'Work, Power & Energy', slug: 'work-power-energy', questionCount: 6 },
  { id: 'chap-5', name: 'Thermodynamics', slug: 'thermodynamics', questionCount: 5 },
  { id: 'chap-6', name: 'Electrostatics', slug: 'electrostatics', questionCount: 6 },
];

export const FALLBACK_DASHBOARD = {
  profile: {
    fullName: 'Yash Sharma',
    targetExam: 'JEE_ADVANCED',
    targetYear: 2026,
    academicLevel: 'Class 12 / Dropper Advanced',
    currentStreak: 7,
    longestStreak: 14,
    problemSolvingIndex: 78.4,
  },
  performance: {
    totalAttempted: 37,
    totalCorrect: 28,
    accuracyPercentage: 75.7,
    averageTimeSeconds: 168,
  },
  subjectProgress: [
    { chapterName: 'Rotational Motion', slug: 'rotational-motion', masteryScore: 82, solvedCount: 10, totalQuestions: 12 },
    { chapterName: 'Kinematics', slug: 'kinematics', masteryScore: 88, solvedCount: 7, totalQuestions: 8 },
    { chapterName: 'Laws of Motion', slug: 'laws-of-motion', masteryScore: 74, solvedCount: 5, totalQuestions: 7 },
    { chapterName: 'Work, Power & Energy', slug: 'work-power-energy', masteryScore: 70, solvedCount: 4, totalQuestions: 6 },
    { chapterName: 'Thermodynamics', slug: 'thermodynamics', masteryScore: 65, solvedCount: 3, totalQuestions: 5 },
    { chapterName: 'Electrostatics', slug: 'electrostatics', masteryScore: 80, solvedCount: 5, totalQuestions: 6 },
  ],
  weakConcepts: [
    { topic: 'Non-Inertial Frame Pseudo Force Equilibrium', chapter: 'Laws of Motion', accuracy: 40 },
    { topic: 'Variable Mass Rocket Thrust Integration', chapter: 'Kinematics', accuracy: 50 },
  ],
  recentActivity: [
    { questionId: 'PHY-ADV-24-ROT-01', questionTitle: 'PHY-ADV-24-ROT-01: Pure Rolling Dynamics', isCorrect: true, marksAwarded: 4, timeSpentSeconds: 142 },
    { questionId: 'PHY-ADV-24-ROT-02', questionTitle: 'PHY-ADV-24-ROT-02: Angular Momentum of Rod', isCorrect: true, marksAwarded: 4, timeSpentSeconds: 198 },
    { questionId: 'PHY-ADV-24-KIN-01', questionTitle: 'PHY-ADV-24-KIN-01: Non-Uniform Acceleration', isCorrect: true, marksAwarded: 4, timeSpentSeconds: 85 },
  ],
};

export const FALLBACK_CONTESTS = [
  {
    id: 'contest-adv-01',
    title: 'JEE Advanced Physics Simulation Sprint #14',
    status: 'ACTIVE',
    examType: 'JEE_ADVANCED',
    durationMinutes: 60,
    totalMarks: 72,
    participantsCount: 48,
    description: 'Timed full-syllabus physics mock test with official negative and partial scoring criteria.',
  },
  {
    id: 'contest-adv-02',
    title: 'Rotational & Mechanics All-India Talent Grand Prix',
    status: 'UPCOMING',
    examType: 'JEE_ADVANCED',
    durationMinutes: 90,
    totalMarks: 100,
    participantsCount: 112,
    description: 'Deep multi-concept questions qualifying for Kota Super-30 scholarships.',
  },
];

export const FALLBACK_CONTEST_PAPER = {
  contest: {
    id: 'contest-adv-01',
    title: 'JEE Advanced Physics Simulation Sprint #14',
    durationMinutes: 60,
    totalMarks: 72,
  },
  questions: FALLBACK_QUESTIONS,
};

export const FALLBACK_LEADERBOARD = {
  contest: {
    id: 'contest-adv-01',
    title: 'JEE Advanced Physics Simulation Sprint #14',
    totalMarks: 72,
  },
  leaderboard: [
    { rank: 1, studentName: 'Aditya Verma', instituteName: 'Apex Kota - Super 30', timeSpentSeconds: 2450, score: 68 },
    { rank: 2, studentName: 'Ananya Deshmukh', instituteName: 'Allen Mumbai Star Batch', timeSpentSeconds: 2680, score: 64 },
    { rank: 3, studentName: 'Rohan Sen', instituteName: 'FIITJEE Delhi Pinnacle', timeSpentSeconds: 2890, score: 60 },
    { rank: 4, studentName: 'Yash Sharma (You)', instituteName: 'Independent Aspirant', timeSpentSeconds: 3120, score: 56 },
    { rank: 5, studentName: 'Kavya Nair', instituteName: 'Narayana Hyderabad', timeSpentSeconds: 3200, score: 52 },
  ],
};
