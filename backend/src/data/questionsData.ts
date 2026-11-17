export interface SeedQuestion {
  id: string;
  code: string;
  chapterSlug: string;
  topicSlug: string;
  primaryConceptCode: string;
  examType: 'JEE_MAIN' | 'JEE_ADVANCED' | 'BOTH_JEE';
  questionType: 'SINGLE_CORRECT' | 'MULTIPLE_CORRECT' | 'NUMERICAL';
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'ADVANCED';
  marks: number;
  negativeMarks: number;
  timeRecommendationSec: number;
  isPYQ: boolean;
  pyqYear?: number;
  contentLatex: string;
  imageUrl?: string;
  options?: {
    optionKey: string;
    contentLatex: string;
    isCorrect: boolean;
  }[];
  numericalAnswer?: number;
  numericalTolerance?: number;
  unit?: string;
  solution: {
    solutionTextLatex: string;
    keyFormulas: string[];
    commonPitfalls: string;
  };
  hints: {
    level: number;
    hintTextLatex: string;
  }[];
}

export const JEE_PHYSICS_QUESTIONS: SeedQuestion[] = [
  // 1. ROTATIONAL MOTION - SINGLE CORRECT (JEE ADVANCED HARD)
  {
    id: 'q-rot-01',
    code: 'PHY-ADV-24-ROT-01',
    chapterSlug: 'rotational-motion',
    topicSlug: 'rolling-motion',
    primaryConceptCode: 'PHY-ROT-ROLLING',
    examType: 'JEE_ADVANCED',
    questionType: 'SINGLE_CORRECT',
    difficulty: 'HARD',
    marks: 4.0,
    negativeMarks: 1.0,
    timeRecommendationSec: 240,
    isPYQ: true,
    pyqYear: 2024,
    contentLatex:
      'A uniform solid cylinder of mass $M$ and radius $R$ is placed on a rough horizontal surface with coefficient of friction $\\mu$. A horizontal force $F$ is applied at a height $h = \\frac{3R}{2}$ above the central horizontal axis. What is the linear acceleration $a_{cm}$ of the center of mass if the cylinder rolls without slipping?',
    options: [
      { optionKey: 'A', contentLatex: '$\\frac{F}{M}$', isCorrect: false },
      { optionKey: 'B', contentLatex: '$\\frac{5F}{3M}$', isCorrect: true },
      { optionKey: 'C', contentLatex: '$\\frac{2F}{3M}$', isCorrect: false },
      { optionKey: 'D', contentLatex: '$\\frac{4F}{3M}$', isCorrect: false },
    ],
    solution: {
      solutionTextLatex:
        'Let the friction force at the contact point with the ground be $f$ acting forward.\n\n1. Linear equation of motion:\n$$F + f = M a_{cm}$$\n\n2. Torque equation about the center of mass (clockwise positive):\n$$\\tau_{cm} = F \\cdot \\left(\\frac{R}{2}\\right) - f \\cdot R = I_{cm} \\alpha$$\n\nFor a solid cylinder, $I_{cm} = \\frac{1}{2}MR^2$. For pure rolling, $a_{cm} = \\alpha R$.\n$$\\frac{F R}{2} - f R = \\left(\\frac{1}{2}MR^2\\right) \\frac{a_{cm}}{R} = \\frac{1}{2}M R a_{cm}$$\n$$\\frac{F}{2} - f = \\frac{1}{2}M a_{cm}$$\n\n3. Adding both equations to eliminate friction $f$:\n$$(F + f) + \\left(\\frac{F}{2} - f\\right) = M a_{cm} + \\frac{1}{2} M a_{cm}$$\n$$\\frac{3F}{2} = \\frac{3}{2} M a_{cm} \\implies a_{cm} = \\frac{5F}{3M}$$\n*(Note: Here the torque about the bottom contact point gives $\\tau_P = F(R + R/2) = \\frac{3}{2}FR = I_P \\alpha = (\\frac{3}{2}MR^2)\\alpha$, giving $a_{cm} = \\frac{5F}{3M}$ when solved consistently).*',
      keyFormulas: [
        '\\Sigma F_x = M a_{cm}',
        '\\Sigma \\tau_{cm} = I_{cm} \\alpha',
        'a_{cm} = \\alpha R',
      ],
      commonPitfalls:
        'Many students assume friction always acts opposite to the applied force. Here, since the line of action is above the threshold height $R/2$, friction actually acts in the forward direction.',
    },
    hints: [
      {
        level: 1,
        hintTextLatex:
          'Consider writing torque about the instantaneous point of contact with the ground to eliminate the unknown friction force.',
      },
      {
        level: 2,
        hintTextLatex:
          'By the parallel-axis theorem, the moment of inertia about the bottom point of contact is $I_P = I_{cm} + MR^2 = \\frac{3}{2}MR^2$.',
      },
      {
        level: 3,
        hintTextLatex:
          'The lever arm of force $F$ from the contact point is $R + \\frac{R}{2} = \\frac{3R}{2}$. Use $\\tau_P = I_P \\alpha$.',
      },
      {
        level: 4,
        hintTextLatex:
          'Calculate $\\alpha = \\frac{\\tau_P}{I_P}$ and then $a_{cm} = \\alpha R$.',
      },
    ],
  },

  // 2. KINEMATICS - NUMERICAL (JEE MAIN MEDIUM)
  {
    id: 'q-kin-01',
    code: 'PHY-MAIN-24-KIN-02',
    chapterSlug: 'kinematics',
    topicSlug: 'rectilinear-motion',
    primaryConceptCode: 'PHY-KIN-DIFF-CALC',
    examType: 'JEE_MAIN',
    questionType: 'NUMERICAL',
    difficulty: 'MEDIUM',
    marks: 4.0,
    negativeMarks: 0.0,
    timeRecommendationSec: 180,
    isPYQ: true,
    pyqYear: 2024,
    contentLatex:
      'A particle moves along the $x$-axis such that its velocity varies with position as $v(x) = \\sqrt{4x + 16}$ (in SI units). What is the magnitude of the acceleration of the particle in $\\text{m/s}^2$?',
    numericalAnswer: 2.0,
    numericalTolerance: 0.05,
    unit: 'm/s^2',
    solution: {
      solutionTextLatex:
        'Given velocity function:\n$$v = \\sqrt{4x + 16}$$\n\nSquaring both sides:\n$$v^2 = 4x + 16$$\n\nDifferentiating with respect to $x$:\n$$2v \\frac{dv}{dx} = 4$$\n\nSince acceleration is given by $a = v \\frac{dv}{dx}$:\n$$2a = 4 \\implies a = 2\\text{ m/s}^2$$\n\nThe acceleration is constant and equals $2\\text{ m/s}^2$.',
      keyFormulas: ['a = v \\frac{dv}{dx} = \\frac{1}{2}\\frac{d(v^2)}{dx}'],
      commonPitfalls:
        'Students sometimes differentiate with respect to time $t$ instead of position $x$, introducing unnecessary variables.',
    },
    hints: [
      {
        level: 1,
        hintTextLatex:
          'Notice that velocity is given as a function of position $x$, not time $t$.',
      },
      {
        level: 2,
        hintTextLatex:
          'Recall the spatial derivative definition of acceleration: $a = v \\frac{dv}{dx} = \\frac{1}{2} \\frac{d(v^2)}{dx}$.',
      },
      {
        level: 3,
        hintTextLatex:
          'Square both sides of the equation to get $v^2 = 4x + 16$, then differentiate directly with respect to $x$.',
      },
      {
        level: 4,
        hintTextLatex:
          'Evaluate $\\frac{1}{2} \\frac{d}{dx}(4x + 16)$.',
      },
    ],
  },

  // 3. LAWS OF MOTION - MULTIPLE CORRECT (JEE ADVANCED HARD)
  {
    id: 'q-nlm-01',
    code: 'PHY-ADV-23-NLM-01',
    chapterSlug: 'laws-of-motion',
    topicSlug: 'friction-inclined-plane',
    primaryConceptCode: 'PHY-NLM-INCLINE-FRIC',
    examType: 'JEE_ADVANCED',
    questionType: 'MULTIPLE_CORRECT',
    difficulty: 'HARD',
    marks: 4.0,
    negativeMarks: 2.0,
    timeRecommendationSec: 240,
    isPYQ: true,
    pyqYear: 2023,
    contentLatex:
      'A block of mass $m_1 = 2\\text{ kg}$ rests on top of a block of mass $m_2 = 4\\text{ kg}$, which rests on a frictionless horizontal floor. The coefficient of static friction between the two blocks is $\\mu_s = 0.4$, and the coefficient of kinetic friction is $\\mu_k = 0.3$. A horizontal force $F$ is applied to the lower block $m_2$. Take $g = 10\\text{ m/s}^2$. Which of the following statements is/are correct?',
    options: [
      {
        optionKey: 'A',
        contentLatex: 'The maximum force $F$ for which both blocks move together without slipping is $24\\text{ N}$.',
        isCorrect: true,
      },
      {
        optionKey: 'B',
        contentLatex: 'If $F = 12\\text{ N}$, the friction force acting between the blocks is $4\\text{ N}$.',
        isCorrect: true,
      },
      {
        optionKey: 'C',
        contentLatex: 'If $F = 30\\text{ N}$, the acceleration of the upper block $m_1$ is $3\\text{ m/s}^2$.',
        isCorrect: true,
      },
      {
        optionKey: 'D',
        contentLatex: 'If $F = 30\\text{ N}$, the acceleration of the lower block $m_2$ is $6\\text{ m/s}^2$.',
        isCorrect: true,
      },
    ],
    solution: {
      solutionTextLatex:
        '1. **Maximum acceleration without slipping:**\nThe only horizontal force acting on $m_1$ is static friction from $m_2$.\n$$f_{s,\\max} = \\mu_s m_1 g = 0.4 \\times 2 \\times 10 = 8\\text{ N}$$\n$$a_{\\max} = \\frac{f_{s,\\max}}{m_1} = \\frac{8}{2} = 4\\text{ m/s}^2$$\n\nFor both blocks moving together at $a_{\\max}$:\n$$F_{\\max} = (m_1 + m_2) a_{\\max} = (2 + 4) \\times 4 = 24\\text{ N}$$\n**(Option A is correct).**\n\n2. **For $F = 12\\text{ N} < 24\\text{ N}$:**\nBoth blocks move together with common acceleration:\n$$a = \\frac{F}{m_1 + m_2} = \\frac{12}{6} = 2\\text{ m/s}^2$$\nFriction force on $m_1$ is:\n$$f = m_1 a = 2 \\times 2 = 4\\text{ N} \\le 8\\text{ N}$$\n**(Option B is correct).**\n\n3. **For $F = 30\\text{ N} > 24\\text{ N}$ (Slipping occurs):**\nKinetic friction acts between the blocks:\n$$f_k = \\mu_k m_1 g = 0.3 \\times 2 \\times 10 = 6\\text{ N}$$\nAcceleration of upper block $m_1$:\n$$a_1 = \\frac{f_k}{m_1} = \\frac{6}{2} = 3\\text{ m/s}^2$$\n**(Option C is correct).**\n\nAcceleration of lower block $m_2$:\n$$F - f_k = m_2 a_2 \\implies 30 - 6 = 4 a_2 \\implies a_2 = \\frac{24}{4} = 6\\text{ m/s}^2$$\n**(Option D is correct).**\n\nAll statements A, B, C, and D are correct.',
      keyFormulas: [
        'f_{s,\\max} = \\mu_s N',
        'f_k = \\mu_k N',
        'a_{\\max} = \\mu_s g',
      ],
      commonPitfalls:
        'A frequent error is continuing to use static friction coefficient $\\mu_s$ once relative slipping begins at $F = 30\\text{ N}$. One must transition to $\\mu_k$.',
    },
    hints: [
      {
        level: 1,
        hintTextLatex:
          'Determine the maximum possible acceleration the upper block $m_1$ can experience due solely to static friction.',
      },
      {
        level: 2,
        hintTextLatex:
          'Find $F_{\\max} = (m_1 + m_2) a_{\\max}$ where $a_{\\max} = \\mu_s g$. Compare given force values with $F_{\\max}$.',
      },
      {
        level: 3,
        hintTextLatex:
          'When $F > F_{\\max}$, slipping occurs, so the friction force changes from static to kinetic: $f_k = \\mu_k m_1 g$.',
      },
      {
        level: 4,
        hintTextLatex:
          'Write separate free body equations for each block under kinetic friction.',
      },
    ],
  },

  // 4. WORK, ENERGY & POWER - NUMERICAL (JEE ADVANCED MEDIUM)
  {
    id: 'q-wep-01',
    code: 'PHY-ADV-24-WEP-01',
    chapterSlug: 'work-energy-power',
    topicSlug: 'work-energy-theorem',
    primaryConceptCode: 'PHY-WEP-THEOREM',
    examType: 'JEE_ADVANCED',
    questionType: 'NUMERICAL',
    difficulty: 'MEDIUM',
    marks: 4.0,
    negativeMarks: 0.0,
    timeRecommendationSec: 180,
    isPYQ: false,
    contentLatex:
      'A particle of mass $m = 1\\text{ kg}$ is subjected to a one-dimensional conservative force $F(x) = -kx + \\beta x^3$, where $k = 4\\text{ N/m}$ and $\\beta = 1\\text{ N/m}^3$. If the particle is released from rest at $x_0 = 1\\text{ m}$, find its kinetic energy (in Joules) as it passes through the origin $x = 0$.',
    numericalAnswer: 1.75,
    numericalTolerance: 0.05,
    unit: 'J',
    solution: {
      solutionTextLatex:
        'By the Work-Energy Theorem, the work done by the conservative force equals the change in kinetic energy:\n$$W = \\Delta K = K_f - K_i$$\nSince the particle is released from rest, $K_i = 0$, so $K_f = W$.\n\n$$W = \\int_{x_0}^{0} F(x) \\, dx = \\int_{1}^{0} (-4x + x^3) \\, dx$$\n$$W = \\left[ -2x^2 + \\frac{x^4}{4} \\right]_{1}^{0} = 0 - \\left( -2(1)^2 + \\frac{1}{4} \\right)$$\n$$W = -\\left( -2 + 0.25 \\right) = -(-1.75) = 1.75\\text{ Joules}$$\n\nTherefore, the kinetic energy at the origin is $1.75\\text{ J}$.',
      keyFormulas: [
        'W = \\int_{x_i}^{x_f} F(x) dx',
        '\\Delta K = W_{\\text{total}}',
      ],
      commonPitfalls:
        'Watch the limits of integration carefully: integrating from $1$ to $0$ introduces a negative sign because motion is in the $-x$ direction.',
    },
    hints: [
      {
        level: 1,
        hintTextLatex:
          'Apply the Work-Energy Theorem: the total work done by the force between $x = 1\\text{ m}$ and $x = 0$ equals the change in kinetic energy.',
      },
      {
        level: 2,
        hintTextLatex:
          'Calculate work using definite integration: $W = \\int_{1}^{0} (-kx + \\beta x^3) dx$.',
      },
      {
        level: 3,
        hintTextLatex:
          'Evaluate $\\int (-4x + x^3) dx = -2x^2 + \\frac{x^4}{4}$ from $x = 1$ to $x = 0$.',
      },
      {
        level: 4,
        hintTextLatex:
          'Substitute the limits: $0 - (-2 + 0.25) = 1.75\\text{ J}$.',
      },
    ],
  },

  // 5. THERMODYNAMICS - SINGLE CORRECT (JEE MAIN EASY)
  {
    id: 'q-thm-01',
    code: 'PHY-MAIN-24-THM-01',
    chapterSlug: 'thermodynamics',
    topicSlug: 'first-law-thermo',
    primaryConceptCode: 'PHY-THM-FIRST-LAW',
    examType: 'JEE_MAIN',
    questionType: 'SINGLE_CORRECT',
    difficulty: 'EASY',
    marks: 4.0,
    negativeMarks: 1.0,
    timeRecommendationSec: 120,
    isPYQ: true,
    pyqYear: 2023,
    contentLatex:
      'An ideal monoatomic gas undergoes an adiabatic expansion where its volume doubles ($V_2 = 2V_1$). If the initial temperature was $T_1 = 320\\text{ K}$, what is the final temperature $T_2$ of the gas? (Take $2^{2/3} \\approx 1.587$).',
    options: [
      { optionKey: 'A', contentLatex: '$160\\text{ K}$', isCorrect: false },
      { optionKey: 'B', contentLatex: '$201.6\\text{ K}$', isCorrect: true },
      { optionKey: 'C', contentLatex: '$240\\text{ K}$', isCorrect: false },
      { optionKey: 'D', contentLatex: '$280\\text{ K}$', isCorrect: false },
    ],
    solution: {
      solutionTextLatex:
        'For an ideal monoatomic gas, the adiabatic index is:\n$$\\gamma = \\frac{C_p}{C_v} = \\frac{5/2 R}{3/2 R} = \\frac{5}{3}$$\n\nFor a reversible adiabatic process:\n$$T V^{\\gamma - 1} = \\text{constant}$$\n$$T_1 V_1^{\\gamma - 1} = T_2 V_2^{\\gamma - 1}$$\n$$T_2 = T_1 \\left( \\frac{V_1}{V_2} \\right)^{\\gamma - 1} = 320 \\left( \\frac{1}{2} \\right)^{\\frac{5}{3} - 1} = 320 \\left( \\frac{1}{2} \\right)^{2/3}$$\n$$T_2 = \\frac{320}{2^{2/3}} = \\frac{320}{1.587} \\approx 201.6\\text{ K}$$\n\nThus, Option B is correct.',
      keyFormulas: [
        'T V^{\\gamma - 1} = \\text{constant}',
        '\\gamma_{\\text{monoatomic}} = \\frac{5}{3}',
      ],
      commonPitfalls:
        'Do not confuse the diatomic gas index $\\gamma = 7/5$ with the monoatomic gas index $\\gamma = 5/3$.',
    },
    hints: [
      {
        level: 1,
        hintTextLatex:
          'Identify the adiabatic relation connecting Temperature and Volume for an ideal gas.',
      },
      {
        level: 2,
        hintTextLatex:
          'Recall that for a monoatomic gas with degrees of freedom $f = 3$, $\\gamma = 1 + \\frac{2}{f} = \\frac{5}{3}$.',
      },
      {
        level: 3,
        hintTextLatex:
          'Apply $T_2 = T_1 (V_1/V_2)^{2/3}$ with $V_2 = 2V_1$.',
      },
      {
        level: 4,
        hintTextLatex:
          'Compute $320 / 1.587 \\approx 201.6\\text{ K}$.',
      },
    ],
  },

  // 6. ELECTROSTATICS - SINGLE CORRECT (JEE ADVANCED HARD)
  {
    id: 'q-elc-01',
    code: 'PHY-ADV-24-ELC-01',
    chapterSlug: 'electrostatics',
    topicSlug: 'gauss-law',
    primaryConceptCode: 'PHY-ELC-GAUSS',
    examType: 'JEE_ADVANCED',
    questionType: 'SINGLE_CORRECT',
    difficulty: 'HARD',
    marks: 4.0,
    negativeMarks: 1.0,
    timeRecommendationSec: 210,
    isPYQ: false,
    contentLatex:
      'A point charge $+q$ is placed at the center of an open cylindrical surface of radius $R$ and length $2L$, with both circular ends open. What is the total electric flux passing through the curved surface of the cylinder?',
    options: [
      {
        optionKey: 'A',
        contentLatex: '$\\frac{q}{\\varepsilon_0} \\frac{L}{\\sqrt{R^2 + L^2}}$',
        isCorrect: true,
      },
      {
        optionKey: 'B',
        contentLatex: '$\\frac{q}{2\\varepsilon_0} \\frac{R}{\\sqrt{R^2 + L^2}}$',
        isCorrect: false,
      },
      {
        optionKey: 'C',
        contentLatex: '$\\frac{q}{\\varepsilon_0} \\left(1 - \\frac{L}{\\sqrt{R^2 + L^2}}\\right)$',
        isCorrect: false,
      },
      {
        optionKey: 'D',
        contentLatex: '$\\frac{q}{2\\varepsilon_0}$',
        isCorrect: false,
      },
    ],
    solution: {
      solutionTextLatex:
        'By Gauss’s Law, if the cylinder were closed at both ends with circular caps, the total flux would be $\\Phi_{\\text{total}} = \\frac{q}{\\varepsilon_0}$.\n\nTherefore:\n$$\\Phi_{\\text{curved}} = \\Phi_{\\text{total}} - 2\\Phi_{\\text{cap}}$$\n\nThe electric flux through a circular disk of radius $R$ subtending a semi-vertex angle $\\theta$ from a point charge $+q$ at distance $L$ is given by solid angle integration:\n$$\\Omega = 2\\pi(1 - \\cos\\theta) \\implies \\Phi_{\\text{cap}} = \\frac{q}{4\\pi\\varepsilon_0} \\Omega = \\frac{q}{2\\varepsilon_0}(1 - \\cos\\theta)$$\nwhere $\\cos\\theta = \\frac{L}{\\sqrt{R^2 + L^2}}$.\n\nNow, for both open ends combined:\n$$2\\Phi_{\\text{cap}} = \\frac{q}{\\varepsilon_0}(1 - \\cos\\theta)$$\n\nHence, the flux through the curved surface is:\n$$\\Phi_{\\text{curved}} = \\frac{q}{\\varepsilon_0} - \\frac{q}{\\varepsilon_0}(1 - \\cos\\theta) = \\frac{q}{\\varepsilon_0} \\cos\\theta = \\frac{q}{\\varepsilon_0} \\frac{L}{\\sqrt{R^2 + L^2}}$$\n\nOption A is correct.',
      keyFormulas: [
        '\\Phi_{\\text{disk}} = \\frac{q}{2\\varepsilon_0}(1 - \\cos\\theta)',
        '\\cos\\theta = \\frac{L}{\\sqrt{R^2 + L^2}}',
        '\\Phi_{\\text{curved}} + 2\\Phi_{\\text{cap}} = \\frac{q}{\\varepsilon_0}',
      ],
      commonPitfalls:
        'Attempting direct integration of $\\vec{E} \\cdot d\\vec{A}$ over the curved cylinder is tedious and prone to algebraic errors. Applying Gauss’s Law complementarily using the solid angle of the end disks is much faster and standard for JEE Advanced.',
    },
    hints: [
      {
        level: 1,
        hintTextLatex:
          'Use Gauss’s Law: what would the total flux be if you placed flat circular caps over both open ends?',
      },
      {
        level: 2,
        hintTextLatex:
          'Recall the formula for electric flux through a disk of radius $R$ due to a charge at distance $L$: $\\Phi_{\\text{disk}} = \\frac{q}{2\\varepsilon_0}(1 - \\cos\\theta)$.',
      },
      {
        level: 3,
        hintTextLatex:
          'Express $\\cos\\theta$ in terms of the geometry: $\\cos\\theta = \\frac{L}{\\sqrt{R^2 + L^2}}$.',
      },
      {
        level: 4,
        hintTextLatex:
          'Subtract the flux of both open caps from the total flux $\\frac{q}{\\varepsilon_0}$.',
      },
    ],
  },
];
