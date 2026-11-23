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
    fullName: 'Student Aspirant',
    targetExam: 'JEE_ADVANCED',
    targetYear: 2026,
    academicLevel: 'Class 12 / Dropper Advanced',
    currentStreak: 1,
    longestStreak: 1,
    problemSolvingIndex: 0.0,
  },
  performance: {
    totalAttempted: 0,
    totalCorrect: 0,
    accuracyPercentage: 0.0,
    averageTimeSeconds: 0,
  },
  subjectProgress: [
    { chapterName: 'Rotational Motion', slug: 'rotational-motion', masteryScore: 0, solvedCount: 0, totalQuestions: 12 },
    { chapterName: 'Kinematics', slug: 'kinematics', masteryScore: 0, solvedCount: 0, totalQuestions: 8 },
    { chapterName: 'Laws of Motion', slug: 'laws-of-motion', masteryScore: 0, solvedCount: 0, totalQuestions: 7 },
    { chapterName: 'Work, Power & Energy', slug: 'work-power-energy', masteryScore: 0, solvedCount: 0, totalQuestions: 6 },
    { chapterName: 'Thermodynamics', slug: 'thermodynamics', masteryScore: 0, solvedCount: 0, totalQuestions: 5 },
    { chapterName: 'Electrostatics', slug: 'electrostatics', masteryScore: 0, solvedCount: 0, totalQuestions: 6 },
  ],
  weakConcepts: [],
  recentActivity: [],
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
    { rank: 4, studentName: 'You (Aspirant)', instituteName: 'Independent Aspirant', timeSpentSeconds: 3120, score: 56 },
    { rank: 5, studentName: 'Kavya Nair', instituteName: 'Narayana Hyderabad', timeSpentSeconds: 3200, score: 52 },
  ],
};

export const FALLBACK_ANALYTICS_OVERVIEW = {
  psi: {
    overallPsi: 78.4,
    accuracyComponent: 75.7,
    speedComponent: 80.2,
    consistencyComponent: 85.0,
    difficultyCalibration: 72.5,
  },
  summary: {
    totalAttempted: 37,
    totalCorrect: 28,
    overallAccuracy: 75.7,
    totalTimeSpentMinutes: 103,
    averagePacingSeconds: 168,
    estimatedJeeRank: 'Top 1,500',
  },
  weeklyActivity: [
    { dayName: 'Mon', solved: 4, accuracy: 75 },
    { dayName: 'Tue', solved: 6, accuracy: 83 },
    { dayName: 'Wed', solved: 5, accuracy: 60 },
    { dayName: 'Thu', solved: 8, accuracy: 88 },
    { dayName: 'Fri', solved: 7, accuracy: 71 },
    { dayName: 'Sat', solved: 10, accuracy: 80 },
    { dayName: 'Sun', solved: 6, accuracy: 83 },
  ],
  difficultyBreakdown: [
    { difficulty: 'MEDIUM', attempted: 14, correct: 12, accuracy: 85.7 },
    { difficulty: 'HARD', attempted: 16, correct: 12, accuracy: 75.0 },
    { difficulty: 'ADVANCED', attempted: 7, correct: 4, accuracy: 57.1 },
  ],
  chapterPerformance: [
    { chapterName: 'Kinematics', accuracy: 88, solvedCount: 7, masteryLevel: 'Mastered' },
    { chapterName: 'Rotational Motion', accuracy: 82, solvedCount: 10, masteryLevel: 'Proficient' },
    { chapterName: 'Electrostatics', accuracy: 80, solvedCount: 5, masteryLevel: 'Proficient' },
    { chapterName: 'Laws of Motion', accuracy: 74, solvedCount: 5, masteryLevel: 'Developing' },
    { chapterName: 'Work, Power & Energy', accuracy: 70, solvedCount: 4, masteryLevel: 'Developing' },
    { chapterName: 'Thermodynamics', accuracy: 65, solvedCount: 3, masteryLevel: 'Needs Review' },
  ],
};

export const FALLBACK_KNOWLEDGE_GAPS = [
  {
    topic: 'Non-Inertial Frame Pseudo Force Equilibrium',
    chapter: 'Laws of Motion',
    accuracy: 40,
    attemptsCount: 5,
    misconception: 'Neglecting centrifugal pseudo-force components along normal axes in rotating reference frames.',
    recommendedAction: 'Review Free-Body Diagram formulation in accelerated frames with constraint equations.',
  },
  {
    topic: 'Variable Mass Rocket Thrust Integration',
    chapter: 'Kinematics',
    accuracy: 50,
    attemptsCount: 4,
    misconception: 'Applying constant-mass impulse equations instead of differential momentum balance dp = m dv + v_rel dm.',
    recommendedAction: 'Practice differential rocket equations with variable ejection velocity.',
  },
];

export const FALLBACK_RECOMMENDATIONS = {
  recommendedQuestions: [
    {
      id: 'PHY-ADV-24-ROT-01',
      code: 'PHY-ADV-24-ROT-01',
      title: 'Pure Rolling Dynamics & Friction',
      difficulty: 'HARD',
      reason: 'Strengthens torque about instantaneous center of zero velocity.',
    },
    {
      id: 'PHY-ADV-24-ROT-02',
      code: 'PHY-ADV-24-ROT-02',
      title: 'Hinged Rod Angular Momentum & Reactions',
      difficulty: 'ADVANCED',
      reason: 'Reinforces pivot force calculation in non-equilibrium rotation.',
    },
  ],
  focusTopics: [
    { topicName: 'Torque about Instantaneous Axis', chapterName: 'Rotational Motion', priority: 'HIGH' },
    { topicName: 'Hinged Constraint Reactions', chapterName: 'Rotational Motion', priority: 'HIGH' },
    { topicName: 'Work-Energy in Rolling', chapterName: 'Work, Power & Energy', priority: 'MEDIUM' },
  ],
};

export const FALLBACK_INSTITUTE_DASHBOARD = {
  institute: {
    id: 'inst-apex-01',
    name: 'Apex Kota - Super 30 Centre',
    isVerified: true,
    city: 'Kota',
    state: 'Rajasthan',
  },
  metrics: {
    totalStudents: 30,
    activeThisWeek: 29,
    avgPsi: 82.6,
    topStreak: 45,
    scholarshipRecipients: 12,
  },
  batches: ['Super-30 Batch A', 'Super-30 Batch B'],
  studentsRequiringAttention: [
    { name: 'Kavya Nair', maskedEmail: 'kavya***@gmail.com', issue: 'Rotational torque misconception detected in last 3 attempts', psi: 71.2 },
    { name: 'Rohan Sen', maskedEmail: 'rohan***@fiitjee.edu', issue: 'Pacing timeout on multi-correct physics problems', psi: 74.8 },
  ],
  studentRoster: [
    { id: 'st-01', name: 'Aditya Verma', maskedEmail: 'adi***@apex.edu', batchName: 'Super-30 Batch A', psi: 88.5, questionsSolved: 142, streak: 28 },
    { id: 'st-02', name: 'Ananya Deshmukh', maskedEmail: 'ana***@allen.edu', batchName: 'Super-30 Batch A', psi: 86.2, questionsSolved: 135, streak: 24 },
    { id: 'st-03', name: 'Aarav Patel', maskedEmail: 'aarav***@solvesense.dev', batchName: 'Super-30 Batch A', psi: 84.1, questionsSolved: 120, streak: 18 },
    { id: 'st-04', name: 'Rohan Sen', maskedEmail: 'rohan***@fiitjee.edu', batchName: 'Super-30 Batch B', psi: 79.4, questionsSolved: 98, streak: 14 },
    { id: 'st-05', name: 'Kavya Nair', maskedEmail: 'kavya***@gmail.com', batchName: 'Super-30 Batch B', psi: 74.8, questionsSolved: 85, streak: 11 },
  ],
};

export const FALLBACK_SCHOLARSHIPS = [
  {
    id: 'sch-apex-100',
    title: 'Kota Apex Super-30 100% Tuition Waiver',
    instituteName: 'Apex Kota Institute',
    minPsiRequired: 80,
    discountPercentage: 100,
    seatsAvailable: 5,
    deadline: '2026-12-31',
    description: 'Full residential coaching sponsorship for students demonstrating PSI >= 80 in Advanced Physics.',
  },
  {
    id: 'sch-allen-star-50',
    title: 'Allen Star Batch 50% Excellence Scholarship',
    instituteName: 'Allen Career Institute',
    minPsiRequired: 75,
    discountPercentage: 50,
    seatsAvailable: 20,
    deadline: '2026-12-15',
    description: 'Academic grant covering classroom coaching and test series for meritorious JEE Advanced candidates.',
  },
  {
    id: 'sch-fiitjee-pinnacle',
    title: 'FIITJEE Pinnacle Merit Fellowship',
    instituteName: 'FIITJEE Centre',
    minPsiRequired: 70,
    discountPercentage: 35,
    seatsAvailable: 15,
    deadline: '2026-12-20',
    description: 'Special fee concession for top problem solvers on Solve Sense platform.',
  },
];
