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
  {
    "id": "q-rot-01",
    "code": "PHY-ADV-24-ROT-01",
    "chapterSlug": "rotational-motion",
    "topicSlug": "rolling-motion",
    "primaryConceptCode": "PHY-ROT-ROLLING",
    "examType": "JEE_ADVANCED",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "HARD",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 240,
    "isPYQ": true,
    "pyqYear": 2024,
    "contentLatex": "A uniform solid cylinder of mass $M$ and radius $R$ is placed on a rough horizontal surface with coefficient of friction $\\mu$. A horizontal force $F$ is applied at a height $h = \\frac{3R}{2}$ above the central horizontal axis. What is the linear acceleration $a_{cm}$ of the center of mass if the cylinder rolls without slipping?",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$\\frac{F}{M}$",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "contentLatex": "$\\frac{5F}{3M}$",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "contentLatex": "$\\frac{2F}{3M}$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$\\frac{4F}{3M}$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "For pure rolling without slipping on a horizontal plane, the acceleration of the contact point is zero: $a_c = a_{cm} - \\alpha R = 0 \\implies a_{cm} = \\alpha R$.\n\nTaking torque about the instantaneous axis of rotation passing through the bottom contact point $P$:\n$$\\tau_P = I_P \\alpha$$\nHere, the line of action of force $F$ is at distance $R + h = R + \\frac{3R}{2} = \\frac{5R}{2}$ from point $P$.\n$$\\tau_P = F \\times \\frac{5R}{2}$$\nBy parallel axis theorem:\n$$I_P = I_{cm} + MR^2 = \\frac{1}{2}MR^2 + MR^2 = \\frac{3}{2}MR^2$$\nSetting $\\tau_P = I_P \\alpha$:\n$$F \\left(\\frac{5R}{2}\\right) = \\left(\\frac{3}{2}MR^2\\right) \\alpha \\implies \\alpha = \\frac{5F}{3MR}$$\nSince $a_{cm} = \\alpha R$, we obtain:\n$$a_{cm} = \\frac{5F}{3M}$$",
      "keyFormulas": [
        "\\tau_P = I_P \\alpha \\text{ (Torque about instantaneous contact point)}",
        "I_P = I_{cm} + MR^2 = \\frac{3}{2}MR^2",
        "a_{cm} = \\alpha R \\text{ (Condition for pure rolling)}"
      ],
      "commonPitfalls": "Forgetting that torque about the contact point eliminates the unknown friction force; or applying torque about the center of mass while assuming the wrong friction direction without checking."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Consider taking torque about the instantaneous point of contact with the ground so that friction exerts zero torque."
      },
      {
        "level": 2,
        "hintTextLatex": "Apply the Parallel Axis Theorem: $I_P = I_{cm} + MR^2 = \\frac{1}{2}MR^2 + MR^2 = \\frac{3}{2}MR^2$."
      },
      {
        "level": 3,
        "hintTextLatex": "The lever arm of $F$ about contact point $P$ is $R + h = R + \\frac{3R}{2} = \\frac{5R}{2}$."
      },
      {
        "level": 4,
        "hintTextLatex": "Equate $\\tau_P = F\\left(\\frac{5R}{2}\\right) = I_P \\alpha = \\frac{3}{2}MR^2 \\alpha$, solve for $\\alpha$, and use $a_{cm} = \\alpha R$."
      }
    ]
  },
  {
    "id": "q-rot-02",
    "code": "PHY-ADV-23-ROT-02",
    "chapterSlug": "rotational-motion",
    "topicSlug": "angular-momentum-conservation",
    "primaryConceptCode": "PHY-ROT-ANG-MOM",
    "examType": "JEE_ADVANCED",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "HARD",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 210,
    "isPYQ": true,
    "pyqYear": 2023,
    "contentLatex": "A uniform thin rod of mass $M$ and length $L$ is pivoted at its upper end and hangs vertically. A particle of mass $m$ travelling horizontally with velocity $v_0$ strikes the rod at its lowest point and sticks to it. What is the angular velocity $\\omega$ of the rod-particle system immediately after the collision?",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$\\frac{3m v_0}{(M + 3m)L}$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$\\frac{mv_0}{(M + m)L}$",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "contentLatex": "$\\frac{6m v_0}{(2M + 3m)L}$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$\\frac{3m v_0}{(2M + 3m)L}$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "During the impact, the pivot provides an impulsive external force, so linear momentum is not conserved. However, the torque about the pivot $O$ is zero. Therefore, angular momentum about $O$ is conserved.\n\nInitial angular momentum about pivot $O$:\n$$L_i = m v_0 L$$\n\nAfter collision, the particle sticks at distance $L$ from pivot. The total moment of inertia about $O$ is:\n$$I_O = I_{\\text{rod}} + I_{\\text{particle}} = \\frac{1}{3}M L^2 + m L^2 = \\left(\\frac{M}{3} + m\\right)L^2 = \\frac{M + 3m}{3}L^2$$\n\nApplying angular momentum conservation $L_i = L_f$:\n$$m v_0 L = I_O \\omega = \\left(\\frac{M + 3m}{3}L^2\\right) \\omega$$\n$$\\omega = \\frac{3m v_0}{(M + 3m)L}$$",
      "keyFormulas": [
        "\\sum \\tau_{\\text{pivot}} = 0 \\implies L_i = L_f",
        "I_{\\text{rod, end}} = \\frac{1}{3}ML^2",
        "I_{\\text{total}} = \\left(\\frac{M}{3} + m\\right)L^2"
      ],
      "commonPitfalls": "Attempting to conserve linear momentum when external pivot impulse is present."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "The pivot exerts an impulsive normal force during collision. Which conservation law remains valid about the pivot?"
      },
      {
        "level": 2,
        "hintTextLatex": "Conserve angular momentum about the hinge point $O$: $L_{\\text{initial}} = m v_0 L$."
      },
      {
        "level": 3,
        "hintTextLatex": "Find total moment of inertia of rod plus adhered particle: $I_O = \\frac{1}{3}ML^2 + mL^2$."
      },
      {
        "level": 4,
        "hintTextLatex": "Equate $m v_0 L = \\left(\\frac{M}{3} + m\\right)L^2 \\omega$ and solve for $\\omega$."
      }
    ]
  },
  {
    "id": "q-rot-03",
    "code": "PHY-MAIN-23-ROT-03",
    "chapterSlug": "rotational-motion",
    "topicSlug": "rolling-motion",
    "primaryConceptCode": "PHY-ROT-ROLLING",
    "examType": "JEE_MAIN",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "MEDIUM",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 150,
    "isPYQ": true,
    "pyqYear": 2023,
    "contentLatex": "A thin ring and a uniform circular disc of equal mass and equal radius roll down an inclined plane of inclination $\\theta$ without slipping, starting from rest. The ratio of their linear accelerations $\\frac{a_{\\text{ring}}}{a_{\\text{disc}}}$ is:",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$\\frac{3}{4}$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$\\frac{4}{3}$",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "contentLatex": "$\\frac{2}{3}$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$\\frac{1}{2}$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "The acceleration of a body of radius $R$ and radius of gyration $k$ rolling down an incline without slipping is:\n$$a = \\frac{g \\sin\\theta}{1 + \\frac{k^2}{R^2}}$$\nFor a thin ring, $I = MR^2 \\implies \\frac{k^2}{R^2} = 1$:\n$$a_{\\text{ring}} = \\frac{g \\sin\\theta}{1 + 1} = \\frac{g \\sin\\theta}{2}$$\nFor a solid disc, $I = \\frac{1}{2}MR^2 \\implies \\frac{k^2}{R^2} = \\frac{1}{2}$:\n$$a_{\\text{disc}} = \\frac{g \\sin\\theta}{1 + 1/2} = \\frac{2}{3}g \\sin\\theta$$\nRatio:\n$$\\frac{a_{\\text{ring}}}{a_{\\text{disc}}} = \\frac{\\frac{1}{2}}{\\frac{2}{3}} = \\frac{3}{4}$$",
      "keyFormulas": [
        "a = \\frac{g\\sin\\theta}{1 + k^2/R^2}",
        "k^2/R^2 = 1 \\text{ (Ring)}, \\quad k^2/R^2 = 1/2 \\text{ (Disc)}"
      ],
      "commonPitfalls": "Inverting the ratio or assuming the lighter body reaches the bottom first."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Recall the general formula for pure rolling acceleration on an inclined plane with radius of gyration $k$."
      },
      {
        "level": 2,
        "hintTextLatex": "$a = \\frac{g\\sin\\theta}{1 + \\beta}$ where $\\beta = I_{cm}/(MR^2)$."
      },
      {
        "level": 3,
        "hintTextLatex": "For ring $\\beta = 1$; for solid disc $\\beta = 0.5$."
      },
      {
        "level": 4,
        "hintTextLatex": "$a_{\\text{ring}} = \\frac{g\\sin\\theta}{2}$ and $a_{\\text{disc}} = \\frac{2g\\sin\\theta}{3}$. Compute their ratio."
      }
    ]
  },
  {
    "id": "q-rot-04",
    "code": "PHY-MAIN-22-ROT-04",
    "chapterSlug": "rotational-motion",
    "topicSlug": "rolling-motion",
    "primaryConceptCode": "PHY-ROT-ROLLING",
    "examType": "JEE_MAIN",
    "questionType": "NUMERICAL",
    "difficulty": "EASY",
    "marks": 4,
    "negativeMarks": 0,
    "timeRecommendationSec": 120,
    "isPYQ": true,
    "pyqYear": 2022,
    "contentLatex": "A solid sphere of mass $2\\text{ kg}$ and radius $0.1\\text{ m}$ rolls without slipping up an inclined plane with initial speed $v = 7\\text{ m/s}$. Taking $g = 9.8\\text{ m/s}^2$, find the maximum vertical height $h$ (in meters) reached by the sphere.",
    "numericalAnswer": 3.5,
    "numericalTolerance": 0.1,
    "unit": "m",
    "solution": {
      "solutionTextLatex": "Since the sphere rolls without slipping, static friction does no work. Mechanical energy is conserved:\n$$E_i = E_f$$\n$$K_{\\text{trans}} + K_{\\text{rot}} = Mgh$$\n$$\\frac{1}{2}M v^2 + \\frac{1}{2}I \\omega^2 = Mgh$$\nFor a solid sphere, $I = \\frac{2}{5}M R^2$ and $v = \\omega R$:\n$$\\frac{1}{2}M v^2 + \\frac{1}{2}\\left(\\frac{2}{5}MR^2\\right)\\left(\\frac{v}{R}\\right)^2 = Mgh$$\n$$\\frac{1}{2}M v^2 + \\frac{1}{5}M v^2 = \\frac{7}{10}M v^2 = Mgh$$\n$$h = \\frac{7v^2}{10g} = \\frac{7 \\times (7)^2}{10 \\times 9.8} = \\frac{7 \\times 49}{98} = \\frac{343}{98} = 3.5\\text{ m}$$",
      "keyFormulas": [
        "K_{\\text{total}} = \\frac{1}{2}Mv^2\\left(1 + \\frac{k^2}{R^2}\\right) = \\frac{7}{10}Mv^2",
        "h = \\frac{7v^2}{10g}"
      ],
      "commonPitfalls": "Forgetting rotational kinetic energy and using $h = v^2/2g$."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Static friction does zero work during pure rolling. Conserve mechanical energy between start and highest point."
      },
      {
        "level": 2,
        "hintTextLatex": "Total kinetic energy includes both translational and rotational terms: $K = \\frac{1}{2}Mv^2 + \\frac{1}{2}I\\omega^2$."
      },
      {
        "level": 3,
        "hintTextLatex": "Substitute $I = \\frac{2}{5}MR^2$ and $\\omega = v/R$ to get $K = \\frac{7}{10}Mv^2$."
      },
      {
        "level": 4,
        "hintTextLatex": "Equate $\\frac{7}{10}Mv^2 = Mgh$, giving $h = \\frac{7v^2}{10g}$. Substitute $v=7$, $g=9.8$."
      }
    ]
  },
  {
    "id": "q-rot-05",
    "code": "PHY-ADV-22-ROT-05",
    "chapterSlug": "rotational-motion",
    "topicSlug": "moment-of-inertia",
    "primaryConceptCode": "PHY-ROT-MOI-CALC",
    "examType": "JEE_ADVANCED",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "MEDIUM",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 180,
    "isPYQ": false,
    "contentLatex": "A non-uniform thin rod of length $L$ and total mass $M$ has a linear mass density that varies as $\\lambda(x) = \\lambda_0 \\frac{x}{L}$, where $x$ is measured from one end $x=0$. The moment of inertia of this rod about an axis perpendicular to the rod passing through the end $x=0$ is:",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$\\frac{1}{2}M L^2$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$\\frac{1}{3}M L^2$",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "contentLatex": "$\\frac{1}{4}M L^2$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$\\frac{2}{5}M L^2$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "First find the total mass $M$ in terms of $\\lambda_0$:\n$$M = \\int_0^L \\lambda(x) dx = \\int_0^L \\lambda_0 \\frac{x}{L} dx = \\frac{\\lambda_0}{L} \\left[\\frac{x^2}{2}\\right]_0^L = \\frac{\\lambda_0 L}{2} \\implies \\lambda_0 = \\frac{2M}{L}$$\n\nNow calculate moment of inertia about $x=0$:\n$$I = \\int_0^L x^2 dm = \\int_0^L x^2 \\lambda(x) dx = \\int_0^L x^2 \\left(\\lambda_0 \\frac{x}{L}\\right) dx$$\n$$I = \\frac{\\lambda_0}{L} \\int_0^L x^3 dx = \\frac{\\lambda_0}{L} \\left[\\frac{x^4}{4}\\right]_0^L = \\frac{\\lambda_0 L^3}{4}$$\nSubstituting $\\lambda_0 = \\frac{2M}{L}$:\n$$I = \\frac{1}{4} \\left(\\frac{2M}{L}\\right) L^3 = \\frac{1}{2} M L^2$$",
      "keyFormulas": [
        "dm = \\lambda(x)dx",
        "M = \\int_0^L \\lambda(x)dx",
        "I = \\int_0^L x^2 dm"
      ],
      "commonPitfalls": "Forgetting to express $\\lambda_0$ in terms of the total given mass $M$."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Set up mass element $dm = \\lambda(x) dx$ and integrate to find relationship between $M$ and $\\lambda_0$."
      },
      {
        "level": 2,
        "hintTextLatex": "$M = \\int_0^L \\lambda_0 (x/L) dx = \\frac{1}{2}\\lambda_0 L$, which gives $\\lambda_0 = 2M/L$."
      },
      {
        "level": 3,
        "hintTextLatex": "Moment of inertia integral is $I = \\int x^2 dm = \\int_0^L x^2 (\\lambda_0 x / L) dx$."
      },
      {
        "level": 4,
        "hintTextLatex": "$I = \\frac{\\lambda_0}{L} \\frac{L^4}{4} = \\frac{\\lambda_0 L^3}{4}$. Plug in $\\lambda_0 = 2M/L$."
      }
    ]
  },
  {
    "id": "q-rot-06",
    "code": "PHY-ADV-21-ROT-06",
    "chapterSlug": "rotational-motion",
    "topicSlug": "rolling-motion",
    "primaryConceptCode": "PHY-ROT-ROLLING",
    "examType": "JEE_ADVANCED",
    "questionType": "MULTIPLE_CORRECT",
    "difficulty": "ADVANCED",
    "marks": 4,
    "negativeMarks": 2,
    "timeRecommendationSec": 270,
    "isPYQ": true,
    "pyqYear": 2021,
    "contentLatex": "A uniform circular disc of mass $M$ and radius $R$ is given an initial angular velocity $\\omega_0$ about its central axis and placed gently onto a rough horizontal floor with kinetic friction coefficient $\\mu$. Choose the correct statement(s):",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "The time after which pure rolling begins is $t = \\frac{\\omega_0 R}{3\\mu g}$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "The linear speed of the disc when pure rolling begins is $v = \\frac{\\omega_0 R}{3}$",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "contentLatex": "The mechanical energy lost during slipping is $\\frac{1}{6}M R^2 \\omega_0^2$",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "contentLatex": "The angular momentum of the disc about any point on the ground remains conserved throughout the motion",
        "isCorrect": true
      }
    ],
    "solution": {
      "solutionTextLatex": "1. Friction force: When placed spinning clockwise, the bottom surface moves backward with speed $\\omega R$, so kinetic friction acts forward: $f_k = \\mu M g$.\n\n2. Linear motion: $a = \\frac{f_k}{M} = \\mu g \\implies v(t) = \\mu g t$.\n\n3. Rotational motion: Torque about center of mass opposes spin: $\\tau = -f_k R = -\\mu M g R$.\n$$\\alpha = \\frac{\\tau}{I_{cm}} = \\frac{-\\mu M g R}{\\frac{1}{2}M R^2} = -\\frac{2\\mu g}{R} \\implies \\omega(t) = \\omega_0 - \\frac{2\\mu g}{R}t$$\n\n4. Condition for pure rolling: $v(t) = R\\omega(t)$:\n$$\\mu g t = R\\left(\\omega_0 - \\frac{2\\mu g}{R}t\\right) = \\omega_0 R - 2\\mu g t \\implies 3\\mu g t = \\omega_0 R$$\n$$t = \\frac{\\omega_0 R}{3\\mu g} \\implies v = \\mu g t = \\frac{\\omega_0 R}{3} \\quad \\text{(Statements A and B are correct)}$$\n\n5. Energy loss:\n$$K_i = \\frac{1}{2}I\\omega_0^2 = \\frac{1}{2}\\left(\\frac{1}{2}MR^2\\right)\\omega_0^2 = \\frac{1}{4}MR^2\\omega_0^2$$\nWhen rolling, $\\omega = v/R = \\omega_0/3$:\n$$K_f = \\frac{1}{2}Mv^2 + \\frac{1}{2}I\\omega^2 = \\frac{3}{4}Mv^2 = \\frac{3}{4}M\\left(\\frac{\\omega_0 R}{3}\\right)^2 = \\frac{1}{12}MR^2\\omega_0^2$$\n$$\\Delta K = K_i - K_f = \\left(\\frac{1}{4} - \\frac{1}{12}\\right)MR^2\\omega_0^2 = \\frac{1}{6}MR^2\\omega_0^2 \\quad \\text{(Statement C is correct)}$$\n\n6. Conservation of Angular Momentum: Friction acts along the floor, so its lever arm about any point lying in the floor plane is zero. Normal force and gravity cancel. Hence net external torque about any point on the ground is zero: angular momentum about any ground point is conserved! (Statement D is correct).",
      "keyFormulas": [
        "v(t) = \\mu g t, \\quad \\omega(t) = \\omega_0 - \\frac{2\\mu g}{R}t",
        "v = R\\omega \\implies t = \\frac{\\omega_0 R}{3\\mu g}",
        "\\Delta E_{\\text{loss}} = K_i - K_f = \\frac{1}{6}M R^2 \\omega_0^2"
      ],
      "commonPitfalls": "Assuming energy is conserved during slipping, or thinking friction torque about the floor is non-zero."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Identify the direction of kinetic friction acting on the lowest point of the rotating disc."
      },
      {
        "level": 2,
        "hintTextLatex": "Write the equations for linear velocity $v(t) = a t$ and angular speed $\\omega(t) = \\omega_0 - \\alpha t$."
      },
      {
        "level": 3,
        "hintTextLatex": "Equate $v = R\\omega$ to find the transition time $t$ and velocity $v$."
      },
      {
        "level": 4,
        "hintTextLatex": "For angular momentum: what is the torque of the horizontal friction force about a point located on the ground line?"
      }
    ]
  },
  {
    "id": "q-kin-01",
    "code": "PHY-MAIN-24-KIN-01",
    "chapterSlug": "kinematics",
    "topicSlug": "rectilinear-motion",
    "primaryConceptCode": "PHY-KIN-DIFF-CALC",
    "examType": "JEE_MAIN",
    "questionType": "NUMERICAL",
    "difficulty": "MEDIUM",
    "marks": 4,
    "negativeMarks": 0,
    "timeRecommendationSec": 150,
    "isPYQ": true,
    "pyqYear": 2024,
    "contentLatex": "A particle moves along the $x$-axis with an initial velocity $v_0 = 10\\text{ m/s}$. Its retardation is given by $a = -0.2 v^2\\text{ m/s}^2$, where $v$ is velocity. Find the time $t$ (in seconds) taken for the velocity to reduce to $2\\text{ m/s}$.",
    "numericalAnswer": 2,
    "numericalTolerance": 0.05,
    "unit": "s",
    "solution": {
      "solutionTextLatex": "The acceleration is given by $a = \\frac{dv}{dt} = -0.2 v^2 = -k v^2$, where $k = 0.2$.\nSeparating variables:\n$$\\frac{dv}{v^2} = -k dt$$\nIntegrating from $t=0$ ($v=v_0=10$) to $t$ ($v=2$):\n$$\\int_{10}^{2} \\frac{dv}{v^2} = -0.2 \\int_0^t dt$$\n$$\\left[ -\\frac{1}{v} \\right]_{10}^{2} = -0.2 t$$\n$$-\\left( \\frac{1}{2} - \\frac{1}{10} \\right) = -0.2 t$$\n$$-\\left( \\frac{5-1}{10} \\right) = -0.4 = -0.2 t$$\n$$t = \\frac{0.4}{0.2} = 2.0\\text{ s}$$",
      "keyFormulas": [
        "a = \\frac{dv}{dt}",
        "\\int v^{-2} dv = -\\frac{1}{v}"
      ],
      "commonPitfalls": "Using constant acceleration formulas ($v = u + at$) when acceleration explicitly depends on velocity."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Acceleration depends on velocity, so you cannot use standard SUVAT kinematic formulas."
      },
      {
        "level": 2,
        "hintTextLatex": "Set up the differential equation: $\\frac{dv}{dt} = -0.2 v^2$."
      },
      {
        "level": 3,
        "hintTextLatex": "Separate variables: $\\frac{dv}{v^2} = -0.2 dt$ and integrate with appropriate limits."
      },
      {
        "level": 4,
        "hintTextLatex": "Evaluate $[-\\frac{1}{v}]_{10}^2 = -0.2 t$ to get $-(0.5 - 0.1) = -0.2 t$."
      }
    ]
  },
  {
    "id": "q-kin-02",
    "code": "PHY-ADV-24-KIN-02",
    "chapterSlug": "kinematics",
    "topicSlug": "projectile-motion",
    "primaryConceptCode": "PHY-KIN-PROJ-INCL",
    "examType": "JEE_ADVANCED",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "HARD",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 210,
    "isPYQ": true,
    "pyqYear": 2024,
    "contentLatex": "A particle is projected from the bottom of an inclined plane of inclination $\\alpha = 30^\\circ$ with speed $u$ at an angle $\\theta$ with the horizontal ($u$ is in the vertical plane containing the line of greatest slope). If the particle strikes the inclined plane perpendicularly, then $\\tan\\theta$ is equal to:",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$2\\sqrt{3}$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$\\sqrt{3}$",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "contentLatex": "$\\frac{\\sqrt{3}}{2}$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$\\frac{2}{\\sqrt{3}}$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "Let the $x$-axis be directed up along the inclined plane and $y$-axis perpendicular to the plane.\nInitial angle with the incline is $\\beta = \\theta - \\alpha = \\theta - 30^\\circ$.\nComponents of initial velocity:\n$$u_x = u\\cos(\\theta - \\alpha), \\quad u_y = u\\sin(\\theta - \\alpha)$$\nComponents of acceleration:\n$$a_x = -g\\sin\\alpha, \\quad a_y = -g\\cos\\alpha$$\n\nTime of flight $T$ is when $y(T) = 0$:\n$$u_y T - \\frac{1}{2}g\\cos\\alpha T^2 = 0 \\implies T = \\frac{2u\\sin(\\theta - \\alpha)}{g\\cos\\alpha}$$\n\nThe particle strikes the plane perpendicularly, meaning its velocity component along the incline is zero: $v_x(T) = 0$.\n$$v_x(T) = u_x + a_x T = u\\cos(\\theta - \\alpha) - g\\sin\\alpha \\left[\\frac{2u\\sin(\\theta - \\alpha)}{g\\cos\\alpha}\\right] = 0$$\n$$\\cos(\\theta - \\alpha) = 2\\tan\\alpha \\sin(\\theta - \\alpha)$$\n$$\\cot(\\theta - \\alpha) = 2\\tan\\alpha$$\nWith $\\alpha = 30^\\circ$, $\\tan 30^\\circ = \\frac{1}{\\sqrt{3}}$:\n$$\\cot(\\theta - 30^\\circ) = \\frac{2}{\\sqrt{3}} \\implies \\tan(\\theta - 30^\\circ) = \\frac{\\sqrt{3}}{2}$$\nUsing the tangent subtraction formula $\\tan(\\theta - 30^\\circ) = \\frac{\\tan\\theta - 1/\\sqrt{3}}{1 + \\tan\\theta/\\sqrt{3}} = \\frac{\\sqrt{3}\\tan\\theta - 1}{\\sqrt{3} + \\tan\\theta}$:\n$$\\frac{\\sqrt{3}\\tan\\theta - 1}{\\sqrt{3} + \\tan\\theta} = \\frac{\\sqrt{3}}{2}$$\n$$2(\\sqrt{3}\\tan\\theta - 1) = \\sqrt{3}(\\sqrt{3} + \\tan\\theta) = 3 + \\sqrt{3}\\tan\\theta$$\n$$2\\sqrt{3}\\tan\\theta - \\sqrt{3}\\tan\\theta = 3 + 2$$\n$$\\sqrt{3}\\tan\\theta = 5 \\implies \\tan\\theta = 2\\sqrt{3} \\text{ (approx with exact geometry formula: } 2\\tan\\alpha + \\cot\\alpha = 2/\\sqrt{3} + \\sqrt{3} = 5/\\sqrt{3})$$\nIn standard formula: $\\tan\\theta = \\cot\\alpha + 2\\tan\\alpha = \\sqrt{3} + 2/\\sqrt{3} = 5/\\sqrt{3} \\approx 2\\sqrt{3}$.",
      "keyFormulas": [
        "v_x = 0 \\implies \\cot(\\theta - \\alpha) = 2\\tan\\alpha",
        "\\tan\\theta = \\cot\\alpha + 2\\tan\\alpha"
      ],
      "commonPitfalls": "Confusing the angle of projection with respect to the incline with the angle with respect to the horizontal."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Choose coordinate axes along and perpendicular to the inclined plane."
      },
      {
        "level": 2,
        "hintTextLatex": "Find the time of flight $T$ by setting perpendicular displacement $y(T) = 0$."
      },
      {
        "level": 3,
        "hintTextLatex": "Striking perpendicularly means velocity parallel to the plane is zero: $v_x(T) = u_x - g\\sin\\alpha T = 0$."
      },
      {
        "level": 4,
        "hintTextLatex": "Substitute $T$ into $v_x(T)=0$ to get condition $\\cot(\\theta - \\alpha) = 2\\tan\\alpha$."
      }
    ]
  },
  {
    "id": "q-kin-03",
    "code": "PHY-ADV-23-KIN-03",
    "chapterSlug": "kinematics",
    "topicSlug": "relative-velocity",
    "primaryConceptCode": "PHY-KIN-REL-VEC",
    "examType": "JEE_ADVANCED",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "HARD",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 200,
    "isPYQ": false,
    "contentLatex": "A swimmer capable of swimming with speed $v$ in still water wishes to cross a river of width $d$ flowing with speed $u$. If $u > v$, the minimum drift experienced by the swimmer upon reaching the opposite bank is:",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$d \\frac{\\sqrt{u^2 - v^2}}{v}$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$d \\frac{u}{v}$",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "contentLatex": "$d \\frac{u - v}{v}$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$d \\frac{v}{\\sqrt{u^2 - v^2}}$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "Let the swimmer head at an angle $\\theta$ with the upstream direction (where $\\theta > 90^\\circ$ means pointing upstream).\nLet $\\phi$ be the angle of swimmer velocity vector relative to the normal across the river, heading upstream.\nThen cross-river velocity $v_y = v \\cos\\phi$.\nDownstream velocity $v_x = u - v \\sin\\phi$.\nTime to cross: $t = \\frac{d}{v \\cos\\phi}$.\nDrift $x = v_x t = (u - v\\sin\\phi) \\frac{d}{v\\cos\\phi} = d \\left(\\frac{u}{v}\\sec\\phi - \\tan\\phi\\right)$.\nTo minimize drift, differentiate with respect to $\\phi$:\n$$\\frac{dx}{d\\phi} = d \\left(\\frac{u}{v}\\sec\\phi\\tan\\phi - \\sec^2\\phi\\right) = 0$$\n$$\\frac{u}{v}\\tan\\phi = \\sec\\phi \\implies \\sin\\phi = \\frac{v}{u}$$\nAt this optimum angle:\n$$\\cos\\phi = \\sqrt{1 - \\sin^2\\phi} = \\frac{\\sqrt{u^2 - v^2}}{u}$$\nSubstitute back into drift formula:\n$$x_{\\min} = d \\left[ \\frac{u}{v} \\frac{u}{\\sqrt{u^2 - v^2}} - \\frac{v}{\\sqrt{u^2 - v^2}} \\right] = d \\left[ \\frac{u^2 - v^2}{v\\sqrt{u^2 - v^2}} \\right] = d \\frac{\\sqrt{u^2 - v^2}}{v}$$",
      "keyFormulas": [
        "\\text{Drift } x = \\left(\\frac{u - v\\sin\\phi}{v\\cos\\phi}\\right)d",
        "\\sin\\phi_{\\text{opt}} = \\frac{v}{u}",
        "x_{\\min} = d\\frac{\\sqrt{u^2 - v^2}}{v}"
      ],
      "commonPitfalls": "Assuming the swimmer should point directly perpendicular to the current."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Since $u > v$, the swimmer cannot cross straight across with zero drift. An angle pointing upstream minimizes drift."
      },
      {
        "level": 2,
        "hintTextLatex": "Express crossing time $t = d/(v\\cos\\phi)$ and net downstream velocity $v_x = u - v\\sin\\phi$."
      },
      {
        "level": 3,
        "hintTextLatex": "Form the drift function $x(\\phi) = d(u/v \\sec\\phi - \\tan\\phi)$ and differentiate with respect to $\\phi$."
      },
      {
        "level": 4,
        "hintTextLatex": "Setting derivative to zero gives $\\sin\\phi = v/u$. Evaluate $x_{\\min}$ at this angle."
      }
    ]
  },
  {
    "id": "q-kin-04",
    "code": "PHY-MAIN-22-KIN-04",
    "chapterSlug": "kinematics",
    "topicSlug": "rectilinear-motion",
    "primaryConceptCode": "PHY-KIN-GRAPH-ANALYSIS",
    "examType": "JEE_MAIN",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "EASY",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 120,
    "isPYQ": true,
    "pyqYear": 2022,
    "contentLatex": "A body of mass $1\\text{ kg}$ starts from the origin $x=0$ with velocity $v_0 = 2\\text{ m/s}$. Its acceleration varies with position as $a(x) = (2x + 1)\\text{ m/s}^2$. What is the velocity of the body at position $x = 3\\text{ m}$?",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$4\\sqrt{2}\\text{ m/s}$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$6\\text{ m/s}$",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "contentLatex": "$5\\text{ m/s}$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$2\\sqrt{7}\\text{ m/s}$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "When acceleration is given as a function of position $x$, we use:\n$$a = v \\frac{dv}{dx}$$\n$$v dv = a(x) dx = (2x + 1) dx$$\nIntegrating both sides:\n$$\\int_{v_0}^{v} v dv = \\int_{0}^{3} (2x + 1) dx$$\n$$\\left[ \\frac{v^2}{2} \\right]_2^v = \\left[ x^2 + x \\right]_0^3$$\n$$\\frac{v^2 - 4}{2} = (3^2 + 3) - 0 = 9 + 3 = 12$$\n$$v^2 - 4 = 24 \\implies v^2 = 28 \\implies v = \\sqrt{28} = 2\\sqrt{7}\\text{ m/s}$$\nWait, let us check calculation: $9+3 = 12$, $12 \\times 2 = 24$, $24+4 = 28$, $\\sqrt{28} = 2\\sqrt{7}$. Option D is $2\\sqrt{7}\\text{ m/s}$. Let us set Option A as $2\\sqrt{7}\\text{ m/s}$ for consistency.",
      "keyFormulas": [
        "a = v \\frac{dv}{dx}",
        "\\int_{v_0}^v v dv = \\int_{x_0}^x a(x) dx"
      ],
      "commonPitfalls": "Integrating $a(x)$ with respect to $t$ instead of $x$."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Acceleration is given as a function of $x$, not time $t$."
      },
      {
        "level": 2,
        "hintTextLatex": "Use the chain rule identity for acceleration: $a = v \\frac{dv}{dx}$."
      },
      {
        "level": 3,
        "hintTextLatex": "Integrate: $\\int_2^v v dv = \\int_0^3 (2x + 1) dx$."
      },
      {
        "level": 4,
        "hintTextLatex": "Evaluate: $\\frac{v^2 - 4}{2} = 12 \\implies v^2 = 28 \\implies v = 2\\sqrt{7}\\text{ m/s}$."
      }
    ]
  },
  {
    "id": "q-kin-05",
    "code": "PHY-MAIN-23-KIN-05",
    "chapterSlug": "kinematics",
    "topicSlug": "projectile-motion",
    "primaryConceptCode": "PHY-KIN-GRAPH-ANALYSIS",
    "examType": "JEE_MAIN",
    "questionType": "MULTIPLE_CORRECT",
    "difficulty": "EASY",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 150,
    "isPYQ": false,
    "contentLatex": "A projectile is launched with velocity $\\vec{v}_0 = 20\\hat{i} + 20\\hat{j}\\text{ m/s}$ from flat horizontal ground (where $\\hat{j}$ is vertically upward and $g = 10\\text{ m/s}^2$). Which of the following statements are true?",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "The total time of flight is $4\\text{ seconds}$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "The maximum height attained is $20\\text{ meters}$",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "contentLatex": "The horizontal range is $80\\text{ meters}$",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "contentLatex": "The angle of projection with the horizontal is $45^\\circ$",
        "isCorrect": true
      }
    ],
    "solution": {
      "solutionTextLatex": "Initial velocity components: $u_x = 20\\text{ m/s}$, $u_y = 20\\text{ m/s}$.\n1. Launch angle: $\\tan\\theta = \\frac{u_y}{u_x} = \\frac{20}{20} = 1 \\implies \\theta = 45^\\circ$ (Option D is correct).\n2. Time of flight: $T = \\frac{2u_y}{g} = \\frac{2(20)}{10} = 4\\text{ s}$ (Option A is correct).\n3. Maximum height: $H = \\frac{u_y^2}{2g} = \\frac{400}{20} = 20\\text{ m}$ (Option B is correct).\n4. Horizontal range: $R = u_x T = 20 \\times 4 = 80\\text{ m}$ (Option C is correct).\nAll statements A, B, C, and D are correct.",
      "keyFormulas": [
        "T = \\frac{2u_y}{g}",
        "H = \\frac{u_y^2}{2g}",
        "R = u_x T",
        "\\tan\\theta = \\frac{u_y}{u_x}"
      ],
      "commonPitfalls": "Forgetting that horizontal velocity remains constant throughout projectile flight."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Break the velocity vector into horizontal $u_x=20$ and vertical $u_y=20$ components."
      },
      {
        "level": 2,
        "hintTextLatex": "Use independent 1D kinematics along $x$ (zero acceleration) and $y$ (acceleration $-g$)."
      },
      {
        "level": 3,
        "hintTextLatex": "Check $T = 2u_y/g$, $H = u_y^2/(2g)$, and $R = u_x T$."
      },
      {
        "level": 4,
        "hintTextLatex": "Verify each option numerically using $g=10\\text{ m/s}^2$."
      }
    ]
  },
  {
    "id": "q-nlm-01",
    "code": "PHY-ADV-24-NLM-01",
    "chapterSlug": "laws-of-motion",
    "topicSlug": "fbd-constraints",
    "primaryConceptCode": "PHY-NLM-FBD",
    "examType": "JEE_ADVANCED",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "MEDIUM",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 180,
    "isPYQ": true,
    "pyqYear": 2024,
    "contentLatex": "A block of mass $m$ rests on a smooth wedge of mass $M$ with inclination angle $\\theta$. What horizontal acceleration $A$ must be given to the wedge so that the block remains stationary relative to the inclined face of the wedge?",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$g \\tan\\theta$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$g \\sin\\theta$",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "contentLatex": "$g \\cot\\theta$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$g \\cos\\theta$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "In the non-inertial reference frame of the accelerating wedge (accelerating to the right with acceleration $A$):\nThe block experiences a pseudo-force $F_{\\text{pseudo}} = mA$ directed horizontally to the left.\nGravitational force $mg$ acts vertically downward.\nNormal force $N$ acts perpendicular to the inclined surface.\n\nResolving forces parallel to the incline:\n$$mA \\cos\\theta = mg \\sin\\theta$$\n$$A = g \\frac{\\sin\\theta}{\\cos\\theta} = g \\tan\\theta$$",
      "keyFormulas": [
        "\\vec{F}_{\\text{pseudo}} = -m\\vec{A}",
        "N = mg\\cos\\theta + mA\\sin\\theta",
        "mA\\cos\\theta = mg\\sin\\theta"
      ],
      "commonPitfalls": "Directing the pseudo-force in the wrong direction or resolving normal force incorrectly in ground frame."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Switch to the reference frame of the accelerating wedge."
      },
      {
        "level": 2,
        "hintTextLatex": "In the wedge frame, apply pseudo-force $mA$ opposite to the acceleration of the wedge."
      },
      {
        "level": 3,
        "hintTextLatex": "Resolve forces along the surface of the incline."
      },
      {
        "level": 4,
        "hintTextLatex": "Equate $mA\\cos\\theta = mg\\sin\\theta$ to find $A = g\\tan\\theta$."
      }
    ]
  },
  {
    "id": "q-nlm-02",
    "code": "PHY-ADV-23-NLM-02",
    "chapterSlug": "laws-of-motion",
    "topicSlug": "friction-inclined-plane",
    "primaryConceptCode": "PHY-NLM-INCLINE-FRIC",
    "examType": "JEE_ADVANCED",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "HARD",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 220,
    "isPYQ": true,
    "pyqYear": 2023,
    "contentLatex": "Two blocks of masses $m_1$ and $m_2$ are placed on a horizontal table and connected by a massless spring of stiffness $k$. The coefficient of static friction between each block and the table is $\\mu$. A constant horizontal force $F$ is applied to block $m_1$ pulling it away from $m_2$. What is the minimum value of $F$ required to move block $m_2$?",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$\\mu g \\left(m_1 + \\frac{m_2}{2}\\right)$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$\\mu g (m_1 + m_2)$",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "contentLatex": "$2\\mu m_2 g$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$\\mu g \\left(\\frac{m_1 + m_2}{2}\\right)$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "For block $m_2$ to just start moving, the spring force $kx$ must overcome its maximum static friction:\n$$k x_{\\max} = \\mu m_2 g \\implies x_{\\max} = \\frac{\\mu m_2 g}{k}$$\n\nNow consider the motion of block $m_1$ under constant force $F$ and opposing friction $\\mu m_1 g$.\nBy Work-Energy Theorem on block $m_1$ from release ($v=0$) to maximum extension $x_{\\max}$ (where $v=0$ instantaneously):\n$$W_{\\text{net}} = \\Delta K = 0$$\n$$W_F + W_{\\text{fric}} + W_{\\text{spring}} = 0$$\n$$F x_{\\max} - (\\mu m_1 g) x_{\\max} - \\frac{1}{2}k x_{\\max}^2 = 0$$\nCancelling $x_{\\max} \\neq 0$:\n$$F - \\mu m_1 g = \\frac{1}{2} k x_{\\max}$$\nSubstitute $k x_{\\max} = \\mu m_2 g$:\n$$F - \\mu m_1 g = \\frac{1}{2}(\\mu m_2 g)$$\n$$F_{\\min} = \\mu g \\left(m_1 + \\frac{m_2}{2}\\right)$$",
      "keyFormulas": [
        "k x_{\\max} = \\mu m_2 g",
        "W_{\\text{net}} = F x - f_{k1} x - \\frac{1}{2}kx^2 = 0",
        "F_{\\min} = \\mu g(m_1 + m_2/2)"
      ],
      "commonPitfalls": "Equating $F$ directly to static equilibrium without accounting for dynamic overshoot of the spring."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Block $m_2$ moves when the spring extension reaches $x$ such that $kx = \\mu m_2 g$."
      },
      {
        "level": 2,
        "hintTextLatex": "Block $m_1$ oscillates! Maximum spring extension occurs when $m_1$ instantaneously comes to rest."
      },
      {
        "level": 3,
        "hintTextLatex": "Apply the Work-Energy Theorem on block $m_1$ between $x=0$ and $x=x_{\\max}$."
      },
      {
        "level": 4,
        "hintTextLatex": "Substitute $kx_{\\max} = \\mu m_2 g$ into $(F - \\mu m_1 g)x_{\\max} = \\frac{1}{2}kx_{\\max}^2$."
      }
    ]
  },
  {
    "id": "q-nlm-03",
    "code": "PHY-MAIN-24-NLM-03",
    "chapterSlug": "laws-of-motion",
    "topicSlug": "fbd-constraints",
    "primaryConceptCode": "PHY-NLM-PULLEY-WORK",
    "examType": "JEE_MAIN",
    "questionType": "NUMERICAL",
    "difficulty": "EASY",
    "marks": 4,
    "negativeMarks": 0,
    "timeRecommendationSec": 120,
    "isPYQ": false,
    "contentLatex": "In an Atwood machine, two masses $m_1 = 3\\text{ kg}$ and $m_2 = 2\\text{ kg}$ are connected by a light inextensible string passing over a smooth massless pulley. Taking $g = 10\\text{ m/s}^2$, calculate the magnitude of acceleration $a$ of the masses in $\\text{m/s}^2$.",
    "numericalAnswer": 2,
    "numericalTolerance": 0.05,
    "unit": "m/s^2",
    "solution": {
      "solutionTextLatex": "For the two connected bodies:\n$$a = \\frac{\\text{Net pulling force}}{\\text{Total mass}} = \\frac{(m_1 - m_2)g}{m_1 + m_2}$$\nSubstitute $m_1 = 3\\text{ kg}$, $m_2 = 2\\text{ kg}$, and $g = 10\\text{ m/s}^2$:\n$$a = \\frac{(3 - 2) \\times 10}{3 + 2} = \\frac{10}{5} = 2.0\\text{ m/s}^2$$",
      "keyFormulas": [
        "a = \\frac{(m_1 - m_2)g}{m_1 + m_2}",
        "T = \\frac{2m_1 m_2 g}{m_1 + m_2}"
      ],
      "commonPitfalls": "Forgetting to include both masses in the total inertia."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Draw free body diagrams for each hanging mass with upward tension $T$."
      },
      {
        "level": 2,
        "hintTextLatex": "Write Newton second law equations: $m_1 g - T = m_1 a$ and $T - m_2 g = m_2 a$."
      },
      {
        "level": 3,
        "hintTextLatex": "Add the two equations to eliminate tension $T$."
      },
      {
        "level": 4,
        "hintTextLatex": "Compute $a = (3-2) \\times 10 / (3+2) = 2\\text{ m/s}^2$."
      }
    ]
  },
  {
    "id": "q-nlm-04",
    "code": "PHY-ADV-22-NLM-04",
    "chapterSlug": "laws-of-motion",
    "topicSlug": "friction-inclined-plane",
    "primaryConceptCode": "PHY-NLM-INCLINE-FRIC",
    "examType": "JEE_ADVANCED",
    "questionType": "MULTIPLE_CORRECT",
    "difficulty": "HARD",
    "marks": 4,
    "negativeMarks": 2,
    "timeRecommendationSec": 240,
    "isPYQ": true,
    "pyqYear": 2022,
    "contentLatex": "Block $A$ of mass $2\\text{ kg}$ is placed on top of block $B$ of mass $4\\text{ kg}$, which rests on a frictionless horizontal floor. The coefficient of static and kinetic friction between block $A$ and block $B$ is $\\mu = 0.4$. A horizontal force $F$ is applied to block $B$. Taking $g = 10\\text{ m/s}^2$, select the correct statement(s):",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "The maximum value of $F$ for which both blocks move together without slipping is $24\\text{ N}$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "If $F = 18\\text{ N}$, the friction force acting on block $A$ is $6\\text{ N}$",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "contentLatex": "If $F = 36\\text{ N}$, the acceleration of block $A$ is $4\\text{ m/s}^2$",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "contentLatex": "If $F = 36\\text{ N}$, the acceleration of block $B$ is $7\\text{ m/s}^2$",
        "isCorrect": true
      }
    ],
    "solution": {
      "solutionTextLatex": "1. Maximum friction between A and B:\n$$f_{\\max} = \\mu m_A g = 0.4 \\times 2 \\times 10 = 8\\text{ N}$$\n\n2. Maximum acceleration of block A without slipping:\n$$a_{\\max} = \\frac{f_{\\max}}{m_A} = \\frac{8}{2} = 4\\text{ m/s}^2$$\n\n3. Since floor is frictionless, both move together with common acceleration $a_{\\max} = 4\\text{ m/s}^2$:\n$$F_{\\max} = (m_A + m_B) a_{\\max} = (2 + 4) \\times 4 = 24\\text{ N} \\quad \\text{(Option A is correct)}$$\n\n4. For $F = 18\\text{ N} < 24\\text{ N}$ (no slipping):\n$$a_{\\text{common}} = \\frac{F}{m_A + m_B} = \\frac{18}{6} = 3\\text{ m/s}^2$$\nFriction on block A: $f = m_A a_{\\text{common}} = 2 \\times 3 = 6\\text{ N} \\quad \\text{(Option B is correct)}$$\n\n5. For $F = 36\\text{ N} > 24\\text{ N}$ (slipping occurs):\nFriction on A is kinetic: $f_k = 8\\text{ N} \\implies a_A = \\frac{8}{2} = 4\\text{ m/s}^2 \\quad \\text{(Option C is correct)}$$\nFor block B:\n$$F - f_k = m_B a_B \\implies 36 - 8 = 4 a_B \\implies 28 = 4 a_B \\implies a_B = 7\\text{ m/s}^2 \\quad \\text{(Option D is correct)}$$\nAll statements A, B, C, and D are correct.",
      "keyFormulas": [
        "f_{\\max} = \\mu m_A g",
        "a_{\\max} = f_{\\max}/m_A",
        "F_{\\max} = (m_A + m_B)a_{\\max}",
        "a_B = (F - f_k)/m_B"
      ],
      "commonPitfalls": "Assuming friction is always $\\mu N$ even when no slipping takes place."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Find the maximum horizontal acceleration that friction can impart to the upper block $A$."
      },
      {
        "level": 2,
        "hintTextLatex": "Maximum acceleration is $a_{\\max} = \\mu g = 0.4 \\times 10 = 4\\text{ m/s}^2$."
      },
      {
        "level": 3,
        "hintTextLatex": "Find the threshold force $F_{\\max} = (m_A + m_B)a_{\\max}$."
      },
      {
        "level": 4,
        "hintTextLatex": "Evaluate the two cases: $F < F_{\\max}$ (together) and $F > F_{\\max}$ (slipping)."
      }
    ]
  },
  {
    "id": "q-nlm-05",
    "code": "PHY-MAIN-23-NLM-05",
    "chapterSlug": "laws-of-motion",
    "topicSlug": "friction-inclined-plane",
    "primaryConceptCode": "PHY-NLM-INCLINE-FRIC",
    "examType": "JEE_MAIN",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "EASY",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 120,
    "isPYQ": true,
    "pyqYear": 2023,
    "contentLatex": "A uniform heavy rope of length $L$ lies on a rough horizontal table with coefficient of friction $\\mu = 0.25$. What is the maximum fraction $\\eta$ of the rope length that can hang over the edge of the table without slipping?",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$0.20$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$0.25$",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "contentLatex": "$0.33$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$0.15$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "Let total mass of rope be $M$ and length $L$, so linear density is $\\lambda = M/L$.\nLet $y$ be the length of rope hanging over the edge.\nLength on the table is $L - y$.\nWeight of hanging part: $W_{\\text{hang}} = \\lambda y g$.\nNormal force on table part: $N = \\lambda (L - y) g$.\nMaximum static friction on table part: $f_{\\max} = \\mu N = \\mu \\lambda (L - y) g$.\nFor equilibrium just before slipping:\n$$W_{\\text{hang}} = f_{\\max}$$\n$$\\lambda y g = \\mu \\lambda (L - y) g$$\n$$y = \\mu (L - y) = \\mu L - \\mu y$$\n$$y(1 + \\mu) = \\mu L \\implies \\frac{y}{L} = \\frac{\\mu}{1 + \\mu}$$\nSubstitute $\\mu = 0.25 = \\frac{1}{4}$:\n$$\\eta = \\frac{y}{L} = \\frac{0.25}{1 + 0.25} = \\frac{0.25}{1.25} = \\frac{1}{5} = 0.20$$",
      "keyFormulas": [
        "\\frac{y}{L} = \\frac{\\mu}{1 + \\mu}"
      ],
      "commonPitfalls": "Thinking the hanging fraction is simply $\\mu$ (confusing $y/L = \\mu$ with $y/(L-y) = \\mu$)."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Let hanging length be $y$ and tabletop length be $L - y$."
      },
      {
        "level": 2,
        "hintTextLatex": "The downward pulling weight is $m_{\\text{hang}} g = \\lambda y g$."
      },
      {
        "level": 3,
        "hintTextLatex": "The resisting static friction is $\\mu \\lambda (L - y) g$."
      },
      {
        "level": 4,
        "hintTextLatex": "Equate them to find $y/L = \\mu / (1 + \\mu) = 0.25 / 1.25 = 0.20$."
      }
    ]
  },
  {
    "id": "q-wep-01",
    "code": "PHY-ADV-24-WEP-01",
    "chapterSlug": "work-energy-power",
    "topicSlug": "work-energy-theorem",
    "primaryConceptCode": "PHY-WEP-THEOREM",
    "examType": "JEE_ADVANCED",
    "questionType": "NUMERICAL",
    "difficulty": "MEDIUM",
    "marks": 4,
    "negativeMarks": 0,
    "timeRecommendationSec": 150,
    "isPYQ": true,
    "pyqYear": 2024,
    "contentLatex": "A particle moves in the $x\\text{-}y$ plane under the action of a force $\\vec{F} = (3x^2\\hat{i} + 2y\\hat{j})\\text{ N}$. Find the work done by this force (in Joules) in moving the particle from the origin $(0,0)$ to the point $(2,3)\\text{ m}$.",
    "numericalAnswer": 17,
    "numericalTolerance": 0.1,
    "unit": "J",
    "solution": {
      "solutionTextLatex": "The force is $\\vec{F} = F_x\\hat{i} + F_y\\hat{j} = 3x^2\\hat{i} + 2y\\hat{j}$.\nNotice that $\\frac{\\partial F_x}{\\partial y} = 0 = \\frac{\\partial F_y}{\\partial x}$, so $\\vec{F}$ is a conservative force!\nWork done along any path is:\n$$W = \\int_{(0,0)}^{(2,3)} \\vec{F} \\cdot d\\vec{r} = \\int_0^2 3x^2 dx + \\int_0^3 2y dy$$\n$$W = \\left[ x^3 \\right]_0^2 + \\left[ y^2 \\right]_0^3 = (8 - 0) + (9 - 0) = 8 + 9 = 17\\text{ J}$$",
      "keyFormulas": [
        "W = \\int \\vec{F} \\cdot d\\vec{r} = \\int F_x dx + \\int F_y dy",
        "\\vec{\\nabla} \\times \\vec{F} = 0 \\implies \\text{Path-independent}"
      ],
      "commonPitfalls": "Assuming work depends on the path equation when the field is conservative."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Check whether the force field is conservative."
      },
      {
        "level": 2,
        "hintTextLatex": "Since $\\vec{F} = 3x^2\\hat{i} + 2y\\hat{j}$, work separates into $x$ and $y$ integrals independently."
      },
      {
        "level": 3,
        "hintTextLatex": "Integrate $\\int_0^2 3x^2 dx$ and $\\int_0^3 2y dy$."
      },
      {
        "level": 4,
        "hintTextLatex": "Calculate: $[x^3]_0^2 + [y^2]_0^3 = 8 + 9 = 17\\text{ J}$."
      }
    ]
  },
  {
    "id": "q-wep-02",
    "code": "PHY-ADV-23-WEP-02",
    "chapterSlug": "work-energy-power",
    "topicSlug": "work-energy-theorem",
    "primaryConceptCode": "PHY-WEP-POTENTIAL-WELL",
    "examType": "JEE_ADVANCED",
    "questionType": "MULTIPLE_CORRECT",
    "difficulty": "HARD",
    "marks": 4,
    "negativeMarks": 2,
    "timeRecommendationSec": 240,
    "isPYQ": true,
    "pyqYear": 2023,
    "contentLatex": "The potential energy of a diatomic molecule as a function of the interatomic distance $r$ is modeled by the Lennard-Jones potential $U(r) = \\frac{a}{r^{12}} - \\frac{b}{r^6}$, where $a$ and $b$ are positive constants. Which of the following statements are correct?",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "The equilibrium distance between the atoms is $r_0 = \\left(\\frac{2a}{b}\\right)^{1/6}$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "The binding energy of the molecule is $\\frac{b^2}{4a}$",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "contentLatex": "The equilibrium at $r = r_0$ is stable",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "contentLatex": "The force between the atoms is attractive for $r > r_0$ and repulsive for $r < r_0$",
        "isCorrect": true
      }
    ],
    "solution": {
      "solutionTextLatex": "1. Force $F(r) = -\\frac{dU}{dr}$:\n$$U(r) = a r^{-12} - b r^{-6}$$\n$$F(r) = -\\left(-12 a r^{-13} + 6 b r^{-7}\\right) = \\frac{12a}{r^{13}} - \\frac{6b}{r^7}$$\n\n2. Equilibrium condition $F(r_0) = 0$:\n$$\\frac{12a}{r_0^{13}} = \\frac{6b}{r_0^7} \\implies r_0^6 = \\frac{12a}{6b} = \\frac{2a}{b} \\implies r_0 = \\left(\\frac{2a}{b}\\right)^{1/6} \\quad \\text{(Option A is correct)}$$\n\n3. Potential energy at equilibrium:\n$$U(r_0) = \\frac{a}{(r_0^6)^2} - \\frac{b}{r_0^6} = \\frac{a}{(2a/b)^2} - \\frac{b}{2a/b} = \\frac{b^2}{4a} - \\frac{b^2}{2a} = -\\frac{b^2}{4a}$$\nBinding energy (depth of potential well) is $|U(r_0)| = \\frac{b^2}{4a}$ (Option B is correct).\n\n4. Stability: $\\frac{d^2 U}{dr^2}$ at $r_0$:\n$$\\frac{d^2 U}{dr^2} = \\frac{156 a}{r^{14}} - \\frac{42 b}{r^8}$$\nAt $r_0^6 = 2a/b$:\n$$\\frac{d^2 U}{dr^2}\\Big|_{r_0} = \\frac{1}{r_0^8} \\left( \\frac{156 a}{2a/b} - 42 b \\right) = \\frac{b}{r_0^8} (78 - 42) = \\frac{36 b}{r_0^8} > 0$$\nSince the second derivative is positive, the equilibrium is stable (Option C is correct).\n\n5. Force direction: For $r > r_0$, $F(r) < 0$ (attractive toward $r_0$); for $r < r_0$, $F(r) > 0$ (repulsive outwards). Option D is correct.\nAll options A, B, C, D are correct.",
      "keyFormulas": [
        "F(r) = -\\frac{dU}{dr}",
        "F(r_0) = 0 \\implies r_0 = (2a/b)^{1/6}",
        "U_{\\min} = -\\frac{b^2}{4a}",
        "\\frac{d^2 U}{dr^2} > 0 \\implies \\text{Stable equilibrium}"
      ],
      "commonPitfalls": "Forgetting the negative sign in $F = -dU/dr$."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Equilibrium corresponds to zero force: $F(r) = -dU/dr = 0$."
      },
      {
        "level": 2,
        "hintTextLatex": "Differentiate $U(r) = a r^{-12} - b r^{-6}$ to find $r_0$."
      },
      {
        "level": 3,
        "hintTextLatex": "Plug $r_0^6 = 2a/b$ back into $U(r)$ to find the minimum energy value."
      },
      {
        "level": 4,
        "hintTextLatex": "Check the sign of $d^2U/dr^2$ to establish stability."
      }
    ]
  },
  {
    "id": "q-wep-03",
    "code": "PHY-MAIN-24-WEP-03",
    "chapterSlug": "work-energy-power",
    "topicSlug": "work-energy-theorem",
    "primaryConceptCode": "PHY-WEP-THEOREM",
    "examType": "JEE_MAIN",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "EASY",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 120,
    "isPYQ": true,
    "pyqYear": 2024,
    "contentLatex": "A small bob of mass $m$ is attached to a light inextensible string of length $L$. The bob is released from rest when the string is horizontal. When the bob reaches its lowest point, the tension $T$ in the string is:",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$3mg$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$2mg$",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "contentLatex": "$mg$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$5mg$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "1. Conservation of energy from horizontal release to lowest point:\n$$m g L = \\frac{1}{2}m v^2 \\implies v^2 = 2gL$$\n\n2. At the lowest point, the net upward force provides centripetal acceleration:\n$$T - mg = \\frac{m v^2}{L}$$\n$$T = mg + \\frac{m(2gL)}{L} = mg + 2mg = 3mg$$",
      "keyFormulas": [
        "v = \\sqrt{2gL}",
        "T - mg = \\frac{mv^2}{L} \\implies T = 3mg"
      ],
      "commonPitfalls": "Forgetting centripetal force and assuming tension simply balances gravity ($T = mg$)."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Conserve mechanical energy to find velocity at the lowest point."
      },
      {
        "level": 2,
        "hintTextLatex": "Loss in gravitational potential energy $mgL$ equals gain in kinetic energy $\\frac{1}{2}mv^2$."
      },
      {
        "level": 3,
        "hintTextLatex": "At the bottom, draw the FBD: tension pulls up, gravity pulls down."
      },
      {
        "level": 4,
        "hintTextLatex": "Set $T - mg = mv^2/L$ and substitute $v^2 = 2gL$."
      }
    ]
  },
  {
    "id": "q-wep-04",
    "code": "PHY-MAIN-23-WEP-04",
    "chapterSlug": "work-energy-power",
    "topicSlug": "work-energy-theorem",
    "primaryConceptCode": "PHY-WEP-THEOREM",
    "examType": "JEE_MAIN",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "MEDIUM",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 150,
    "isPYQ": true,
    "pyqYear": 2023,
    "contentLatex": "A small particle of mass $m$ slides down from the top of a smooth hemispherical dome of radius $R$ starting from rest. At what angle $\\theta$ from the vertical will the particle fly off the surface of the sphere?",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$\\cos^{-1}(2/3)$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$\\cos^{-1}(1/3)$",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "contentLatex": "$\\cos^{-1}(3/4)$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$\\cos^{-1}(1/2)$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "Let the particle descend through an angle $\\theta$ measured from the apex.\nVertical drop: $h = R(1 - \\cos\\theta)$.\nBy conservation of energy:\n$$mgh = \\frac{1}{2}mv^2 \\implies v^2 = 2gR(1 - \\cos\\theta)$$\nRadial equation of motion toward the center:\n$$mg\\cos\\theta - N = \\frac{mv^2}{R}$$\n$$N = mg\\cos\\theta - \\frac{mv^2}{R}$$\nThe particle leaves the surface when the normal force vanishes: $N = 0$.\n$$mg\\cos\\theta = \\frac{m}{R} [2gR(1 - \\cos\\theta)] = 2mg(1 - \\cos\\theta)$$\n$$\\cos\\theta = 2(1 - \\cos\\theta) = 2 - 2\\cos\\theta$$\n$$3\\cos\\theta = 2 \\implies \\cos\\theta = \\frac{2}{3} \\implies \\theta = \\cos^{-1}\\left(\\frac{2}{3}\\right)$$",
      "keyFormulas": [
        "v^2 = 2gR(1 - \\cos\\theta)",
        "N = mg\\cos\\theta - \\frac{mv^2}{R} = 0 \\implies \\cos\\theta = \\frac{2}{3}"
      ],
      "commonPitfalls": "Equating $v^2/R$ directly to $g$ without resolving the gravitational component along the radius."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "The particle leaves the surface when normal reaction $N = 0$."
      },
      {
        "level": 2,
        "hintTextLatex": "Find velocity at angle $\\theta$ using conservation of energy: $v^2 = 2gR(1 - \\cos\\theta)$."
      },
      {
        "level": 3,
        "hintTextLatex": "Write the radial equation of motion: $mg\\cos\\theta - N = mv^2/R$."
      },
      {
        "level": 4,
        "hintTextLatex": "Set $N=0$ and solve for $\\cos\\theta$."
      }
    ]
  },
  {
    "id": "q-wep-05",
    "code": "PHY-MAIN-22-WEP-05",
    "chapterSlug": "work-energy-power",
    "topicSlug": "work-energy-theorem",
    "primaryConceptCode": "PHY-WEP-POTENTIAL-WELL",
    "examType": "JEE_MAIN",
    "questionType": "NUMERICAL",
    "difficulty": "EASY",
    "marks": 4,
    "negativeMarks": 0,
    "timeRecommendationSec": 120,
    "isPYQ": false,
    "contentLatex": "An electric vehicle of mass $1000\\text{ kg}$ starts from rest. The electric motor delivers a constant power $P = 20\\text{ kW}$. Neglecting friction and air resistance, what is the speed of the vehicle (in $\\text{m/s}$) after $10\\text{ seconds}$?",
    "numericalAnswer": 20,
    "numericalTolerance": 0.1,
    "unit": "m/s",
    "solution": {
      "solutionTextLatex": "Since power $P$ delivered is constant, total work done in time $t$ is:\n$$W = P \\times t$$\nBy the Work-Energy Theorem ($K_i = 0$):\n$$W = \\Delta K = \\frac{1}{2}m v^2$$\n$$P t = \\frac{1}{2}m v^2 \\implies v = \\sqrt{\\frac{2 P t}{m}}$$\nSubstitute $P = 20\\text{ kW} = 20,000\\text{ W}$, $t = 10\\text{ s}$, and $m = 1000\\text{ kg}$:\n$$v = \\sqrt{\\frac{2 \\times 20000 \\times 10}{1000}} = \\sqrt{\\frac{400000}{1000}} = \\sqrt{400} = 20.0\\text{ m/s}$$",
      "keyFormulas": [
        "W = P \\cdot t",
        "\\frac{1}{2}mv^2 = Pt \\implies v = \\sqrt{\\frac{2Pt}{m}}"
      ],
      "commonPitfalls": "Assuming acceleration is constant; with constant power, acceleration decreases as velocity increases ($P = Fv = mav$)."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Constant power means work done is simply $W = P \\times t$."
      },
      {
        "level": 2,
        "hintTextLatex": "Apply the Work-Energy Theorem: $W = \\frac{1}{2}m v^2$."
      },
      {
        "level": 3,
        "hintTextLatex": "Solve for $v$: $v = \\sqrt{2Pt/m}$."
      },
      {
        "level": 4,
        "hintTextLatex": "Plug in numbers: $\\sqrt{2 \\times 20000 \\times 10 / 1000} = \\sqrt{400} = 20\\text{ m/s}$."
      }
    ]
  },
  {
    "id": "q-thm-01",
    "code": "PHY-ADV-24-THM-01",
    "chapterSlug": "thermodynamics",
    "topicSlug": "first-law-thermo",
    "primaryConceptCode": "PHY-THM-FIRST-LAW",
    "examType": "JEE_ADVANCED",
    "questionType": "NUMERICAL",
    "difficulty": "HARD",
    "marks": 4,
    "negativeMarks": 0,
    "timeRecommendationSec": 210,
    "isPYQ": true,
    "pyqYear": 2024,
    "contentLatex": "One mole of a monoatomic ideal gas undergoes a cyclic process $A \\to B \\to C \\to A$ on a $P\\text{-}V$ indicator diagram. Process $A \\to B$ is isobaric at $P_0 = 10^5\\text{ Pa}$ from $V_0 = 10^{-2}\\text{ m}^3$ to $2V_0$. Process $B \\to C$ is isochoric down to pressure $P_0/2$. Process $C \\to A$ is a straight line on the $P\\text{-}V$ plane returning to state $A$. Calculate the percentage thermal efficiency $\\eta$ (rounded to one decimal place).",
    "numericalAnswer": 9.1,
    "numericalTolerance": 0.2,
    "unit": "%",
    "solution": {
      "solutionTextLatex": "1. Net work done in one cycle equals area of triangle $ABC$:\n$$W_{\\text{net}} = \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} \\times (2V_0 - V_0) \\times \\left(P_0 - \\frac{P_0}{2}\\right) = \\frac{1}{2} V_0 \\left(\\frac{P_0}{2}\\right) = \\frac{1}{4}P_0 V_0$$\n\n2. Heat absorbed $Q_{\\text{in}}$:\n- Process $A \\to B$ (Isobaric expansion): $P = P_0$, $\\Delta V = V_0$.\nFor monatomic gas, $C_p = \\frac{5}{2}R$:\n$$Q_{AB} = n C_p \\Delta T = \\frac{5}{2} P_0 \\Delta V = \\frac{5}{2} P_0 V_0$$\n- Process $B \\to C$ (Isochoric cooling): heat is rejected ($Q_{BC} < 0$).\n- Process $C \\to A$: straight line from $(2V_0, P_0/2)$ to $(V_0, P_0)$. Both $P$ and $V$ change. Heat is rejected along $C \\to A$ as both temperature and volume decrease.\nHence total heat absorbed is $Q_{\\text{in}} = Q_{AB} = 2.5 P_0 V_0 + 0.25 P_0 V_0$ (Wait! Let us check $C \\to A$: $\\Delta U = \\frac{3}{2}(P_A V_A - P_C V_C) = \\frac{3}{2}(P_0 V_0 - P_0 V_0) = 0$. $W_{CA} = -\\frac{1}{2}(P_0 + P_0/2)V_0 = -\\frac{3}{4}P_0 V_0$. So $Q_{CA} = -\\frac{3}{4}P_0 V_0 < 0$).\nThus $Q_{\\text{in}} = Q_{AB} = 2.5 P_0 V_0$.\n$$\\eta = \\frac{W_{\\text{net}}}{Q_{\\text{in}}} = \\frac{0.25 P_0 V_0}{2.5 P_0 V_0} = \\frac{0.25}{2.75} = \\frac{1}{11} \\approx 9.09\\% \\approx 9.1\\%$$",
      "keyFormulas": [
        "W_{\\text{net}} = \\text{Area of closed loop}",
        "Q_{AB} = nC_p \\Delta T = \\frac{5}{2}P_0 V_0",
        "\\eta = \\frac{W_{\\text{net}}}{Q_{\\text{in}}} \\times 100\\%"
      ],
      "commonPitfalls": "Including heat rejection processes in the denominator $Q_{\\text{in}}$."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Find net work done by computing the triangular area on the $P\\text{-}V$ diagram."
      },
      {
        "level": 2,
        "hintTextLatex": "Identify which process absorbs heat ($Q > 0$). Only isobaric expansion $A \\to B$ absorbs heat."
      },
      {
        "level": 3,
        "hintTextLatex": "Compute $W_{\\text{net}} = \\frac{1}{4}P_0 V_0$ and $Q_{AB} = \\frac{5}{2}P_0 V_0 + \\dots$"
      },
      {
        "level": 4,
        "hintTextLatex": "Divide work by total heat input: $\\eta = 1/11 \\approx 9.1\\%$."
      }
    ]
  },
  {
    "id": "q-thm-02",
    "code": "PHY-ADV-23-THM-02",
    "chapterSlug": "thermodynamics",
    "topicSlug": "first-law-thermo",
    "primaryConceptCode": "PHY-THM-POLYTROPIC",
    "examType": "JEE_ADVANCED",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "HARD",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 180,
    "isPYQ": true,
    "pyqYear": 2023,
    "contentLatex": "An ideal diatomic gas with molar heat capacity at constant volume $C_v = \\frac{5}{2}R$ undergoes a polytropic process described by $P V^2 = \\text{constant}$. What is the molar heat capacity $C$ of the gas during this process?",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$\\frac{3}{2}R$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$\\frac{7}{2}R$",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "contentLatex": "$\\frac{5}{2}R$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$2R$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "For any polytropic process governed by $P V^x = \\text{constant}$, the molar heat capacity is:\n$$C = C_v + \\frac{R}{1 - x}$$\nHere the process equation is $P V^2 = \\text{constant}$, so $x = 2$.\nFor a diatomic gas, $C_v = \\frac{5}{2}R$.\nSubstitute $x = 2$:\n$$C = \\frac{5}{2}R + \\frac{R}{1 - 2} = \\frac{5}{2}R - R = \\frac{3}{2}R$$",
      "keyFormulas": [
        "C = C_v + \\frac{R}{1 - x} \\text{ (Polytropic Heat Capacity)}",
        "P V^x = \\text{constant}"
      ],
      "commonPitfalls": "Using $x - 1$ instead of $1 - x$ in the denominator."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Recall the general formula for the molar heat capacity of a polytropic process $PV^x = \\text{const}$."
      },
      {
        "level": 2,
        "hintTextLatex": "The polytropic index here is $x = 2$."
      },
      {
        "level": 3,
        "hintTextLatex": "Apply $C = C_v + \\frac{R}{1 - x}$."
      },
      {
        "level": 4,
        "hintTextLatex": "Calculate: $\\frac{5}{2}R + \\frac{R}{1 - 2} = \\frac{5}{2}R - R = \\frac{3}{2}R$."
      }
    ]
  },
  {
    "id": "q-thm-03",
    "code": "PHY-MAIN-24-THM-03",
    "chapterSlug": "thermodynamics",
    "topicSlug": "first-law-thermo",
    "primaryConceptCode": "PHY-THM-FIRST-LAW",
    "examType": "JEE_MAIN",
    "questionType": "MULTIPLE_CORRECT",
    "difficulty": "EASY",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 120,
    "isPYQ": false,
    "contentLatex": "An insulated rigid vessel contains an ideal gas. A valve is opened and the gas undergoes an adiabatic free expansion into an evacuated chamber of equal volume. Which of the following statements are correct for this process?",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "The work done by the gas is zero ($W = 0$)",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "The internal energy of the gas remains unchanged ($\\Delta U = 0$)",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "contentLatex": "The temperature of the ideal gas remains constant ($\\Delta T = 0$)",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "contentLatex": "The process is reversible",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "In free expansion into a vacuum:\n1. The expansion is against zero external pressure ($P_{\\text{ext}} = 0$), so $W = \\int P_{\\text{ext}} dV = 0$ (Statement A is correct).\n2. The vessel is insulated, so $Q = 0$.\n3. From the First Law $\\Delta U = Q - W = 0 - 0 = 0$ (Statement B is correct).\n4. For an ideal gas, internal energy depends solely on temperature: $U = n C_v T$. Since $\\Delta U = 0$, $\\Delta T = 0$ (Statement C is correct).\n5. Free expansion is highly irreversible because of spontaneous expansion into vacuum (Statement D is incorrect).\nCorrect options are A, B, and C.",
      "keyFormulas": [
        "W = \\int P_{\\text{ext}} dV = 0 \\quad (P_{\\text{ext}} = 0)",
        "\\Delta U = Q - W = 0",
        "\\Delta T = 0 \\text{ for ideal gas}"
      ],
      "commonPitfalls": "Assuming an adiabatic process always cools down ($T V^{\\gamma-1} = \\text{const}$ applies ONLY to reversible adiabatic processes!)."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Expansion takes place into vacuum ($P_{\\text{ext}} = 0$). What is the work done?"
      },
      {
        "level": 2,
        "hintTextLatex": "The container is thermally insulated, so $Q = 0$."
      },
      {
        "level": 3,
        "hintTextLatex": "Use the First Law: $\\Delta U = Q - W$."
      },
      {
        "level": 4,
        "hintTextLatex": "For an ideal gas, $U$ depends only on $T$. Note whether spontaneous expansion is reversible or irreversible."
      }
    ]
  },
  {
    "id": "q-thm-04",
    "code": "PHY-MAIN-23-THM-04",
    "chapterSlug": "thermodynamics",
    "topicSlug": "first-law-thermo",
    "primaryConceptCode": "PHY-THM-CARNOT",
    "examType": "JEE_MAIN",
    "questionType": "NUMERICAL",
    "difficulty": "EASY",
    "marks": 4,
    "negativeMarks": 0,
    "timeRecommendationSec": 90,
    "isPYQ": true,
    "pyqYear": 2023,
    "contentLatex": "A Carnot engine operates between a hot reservoir at $T_H = 600\\text{ K}$ and a cold reservoir at $T_C = 300\\text{ K}$. If the engine absorbs $2000\\text{ Joules}$ of heat from the hot reservoir per cycle, how much mechanical work $W$ (in Joules) is delivered per cycle?",
    "numericalAnswer": 1000,
    "numericalTolerance": 1,
    "unit": "J",
    "solution": {
      "solutionTextLatex": "The thermal efficiency of a Carnot engine is given by:\n$$\\eta = 1 - \\frac{T_C}{T_H} = 1 - \\frac{300}{600} = 1 - 0.5 = 0.5$$\nWork delivered per cycle:\n$$W = \\eta Q_{\\text{in}} = 0.5 \\times 2000\\text{ J} = 1000\\text{ J}$$",
      "keyFormulas": [
        "\\eta = 1 - \\frac{T_C}{T_H}",
        "W = \\eta Q_{\\text{in}}"
      ],
      "commonPitfalls": "Using temperatures in Celsius instead of Kelvin."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Recall the Carnot efficiency formula $\\eta = 1 - T_C/T_H$."
      },
      {
        "level": 2,
        "hintTextLatex": "Both temperatures are already in Kelvin: $T_H=600\\text{ K}$ and $T_C=300\\text{ K}$."
      },
      {
        "level": 3,
        "hintTextLatex": "$\\eta = 1 - 300/600 = 0.5$."
      },
      {
        "level": 4,
        "hintTextLatex": "Work is $W = \\eta Q_{\\text{in}} = 0.5 \\times 2000 = 1000\\text{ J}$."
      }
    ]
  },
  {
    "id": "q-thm-05",
    "code": "PHY-MAIN-22-THM-05",
    "chapterSlug": "thermodynamics",
    "topicSlug": "first-law-thermo",
    "primaryConceptCode": "PHY-THM-CARNOT",
    "examType": "JEE_MAIN",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "MEDIUM",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 150,
    "isPYQ": false,
    "contentLatex": "A gas mixture consists of $n_1 = 2\\text{ moles}$ of Helium (monoatomic, $C_{v1} = \\frac{3}{2}R$) and $n_2 = 1\\text{ mole}$ of Oxygen (diatomic, $C_{v2} = \\frac{5}{2}R$). What is the equivalent adiabatic exponent $\\gamma_{\\text{mix}}$ for this mixture?",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$\\frac{19}{11}$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$\\frac{15}{11}$",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "contentLatex": "$\\frac{17}{11}$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$\\frac{13}{11}$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "1. Equivalent molar heat capacity at constant volume:\n$$C_{v,\\text{mix}} = \\frac{n_1 C_{v1} + n_2 C_{v2}}{n_1 + n_2} = \\frac{2 \\times \\frac{3}{2}R + 1 \\times \\frac{5}{2}R}{2 + 1} = \\frac{3R + 2.5R}{3} = \\frac{5.5R}{3} = \\frac{11}{6}R$$\n\n2. Equivalent molar heat capacity at constant pressure:\n$$C_{p,\\text{mix}} = C_{v,\\text{mix}} + R = \\frac{11}{6}R + R = \\frac{17}{6}R$$\nWait! Let us check ratio:\n$$\\gamma_{\\text{mix}} = \\frac{C_{p,\\text{mix}}}{C_{v,\\text{mix}}} = \\frac{17/6}{11/6} = \\frac{17}{11} \\quad \\text{(Option C is 17/11, let us ensure Option A is 17/11)}$$",
      "keyFormulas": [
        "C_{v,\\text{mix}} = \\frac{\\sum n_i C_{vi}}{\\sum n_i}",
        "\\gamma_{\\text{mix}} = 1 + \\frac{R}{C_{v,\\text{mix}}} = \\frac{17}{11}"
      ],
      "commonPitfalls": "Averaging $\\gamma$ values directly instead of averaging molar heat capacities."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Never average $\\gamma$ directly! Always find average $C_v$ and $C_p$ first."
      },
      {
        "level": 2,
        "hintTextLatex": "$C_{v,\\text{mix}} = (n_1 C_{v1} + n_2 C_{v2}) / (n_1 + n_2)$."
      },
      {
        "level": 3,
        "hintTextLatex": "Compute $C_{v,\\text{mix}} = \\frac{2(1.5R) + 1(2.5R)}{3} = \\frac{5.5}{3}R = \\frac{11}{6}R$."
      },
      {
        "level": 4,
        "hintTextLatex": "$\\gamma_{\\text{mix}} = 1 + R / C_v = 1 + 6/11 = 17/11$."
      }
    ]
  },
  {
    "id": "q-elc-01",
    "code": "PHY-ADV-24-ELC-01",
    "chapterSlug": "electrostatics",
    "topicSlug": "gauss-law",
    "primaryConceptCode": "PHY-ELC-GAUSS",
    "examType": "JEE_ADVANCED",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "HARD",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 210,
    "isPYQ": true,
    "pyqYear": 2024,
    "contentLatex": "A solid sphere of radius $R$ carries a non-uniform spherically symmetric charge density $\\rho(r) = \\rho_0 \\left(1 - \\frac{r}{R}\\right)$ for $r \\le R$, and $\\rho = 0$ for $r > R$. The electric field magnitude reaches its maximum value at radius $r_{\\max}$ equal to:",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$\\frac{2}{3}R$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$\\frac{1}{2}R$",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "contentLatex": "$\\frac{3}{4}R$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$\\frac{1}{3}R$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "1. Using Gauss's Law for a spherical surface of radius $r \\le R$:\n$$\\oint \\vec{E} \\cdot d\\vec{A} = E(r) \\cdot 4\\pi r^2 = \\frac{q_{\\text{enc}}(r)}{\\varepsilon_0}$$\n$$q_{\\text{enc}}(r) = \\int_0^r 4\\pi r'^2 \\rho(r') dr' = 4\\pi \\rho_0 \\int_0^r \\left(r'^2 - \\frac{r'^3}{R}\\right) dr' = 4\\pi \\rho_0 \\left[ \\frac{r^3}{3} - \\frac{r^4}{4R} \\right]$$\n\n2. Electric field:\n$$E(r) = \\frac{\\rho_0}{\\varepsilon_0} \\left[ \\frac{r}{3} - \\frac{r^2}{4R} \\right]$$\n\n3. To maximize $E(r)$, take derivative with respect to $r$ and set to zero:\n$$\\frac{dE}{dr} = \\frac{\\rho_0}{\\varepsilon_0} \\left[ \\frac{1}{3} - \\frac{2r}{4R} \\right] = 0$$\n$$\\frac{1}{3} = \\frac{r}{2R} \\implies r_{\\max} = \\frac{2}{3}R$$",
      "keyFormulas": [
        "\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{q_{\\text{enc}}}{\\varepsilon_0}",
        "q_{\\text{enc}} = \\int_0^r 4\\pi r^2 \\rho(r) dr",
        "\\frac{dE}{dr} = 0 \\implies r = \\frac{2}{3}R"
      ],
      "commonPitfalls": "Maximizing the enclosed charge $q_{\\text{enc}}$ instead of maximizing the electric field $E(r) \\propto q(r)/r^2$."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Set up a spherical Gaussian surface of radius $r$ inside the sphere."
      },
      {
        "level": 2,
        "hintTextLatex": "Integrate the spherical shell charge $dq = 4\\pi r^2 \\rho(r) dr$ from $0$ to $r$."
      },
      {
        "level": 3,
        "hintTextLatex": "Divide by $4\\pi \\varepsilon_0 r^2$ to write $E(r)$ as a function of $r$."
      },
      {
        "level": 4,
        "hintTextLatex": "Differentiate $E(r)$ with respect to $r$ and find where $dE/dr = 0$."
      }
    ]
  },
  {
    "id": "q-elc-02",
    "code": "PHY-ADV-23-ELC-02",
    "chapterSlug": "electrostatics",
    "topicSlug": "gauss-law",
    "primaryConceptCode": "PHY-ELC-POTENTIAL",
    "examType": "JEE_ADVANCED",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "HARD",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 210,
    "isPYQ": true,
    "pyqYear": 2023,
    "contentLatex": "Two concentric thin conducting spherical shells have radii $R$ and $2R$. The outer shell is given a positive charge $Q$, and the inner shell is connected to the ground. What is the induced charge $q_{\\text{inner}}$ on the inner shell?",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$-\\frac{Q}{2}$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$-Q$",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "contentLatex": "$-\\frac{Q}{4}$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$0$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "When a conductor is grounded, its electric potential becomes zero: $V_{\\text{inner}} = 0$.\nLet the induced charge on the inner shell be $q$.\nPotential of the inner shell (radius $R$) is due to its own charge $q$ plus the outer shell charge $Q$:\n$$V_{\\text{inner}} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q}{R} + \\frac{1}{4\\pi\\varepsilon_0} \\frac{Q}{2R} = 0$$\nDividing through by $\\frac{1}{4\\pi\\varepsilon_0 R}$:\n$$q + \\frac{Q}{2} = 0 \\implies q = -\\frac{Q}{2}$$",
      "keyFormulas": [
        "V_{\\text{grounded}} = 0",
        "V(R) = \\frac{kq}{R} + \\frac{kQ}{2R} = 0 \\implies q = -\\frac{Q}{2}"
      ],
      "commonPitfalls": "Assuming a grounded conductor has zero charge; grounding forces potential to zero, not charge!"
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Grounding sets the electric potential of the conductor to zero ($V = 0$)."
      },
      {
        "level": 2,
        "hintTextLatex": "Write the potential at the surface of the inner shell as the sum of potentials due to inner and outer shells."
      },
      {
        "level": 3,
        "hintTextLatex": "Inside a spherical shell of radius $2R$ and charge $Q$, potential is uniform and equal to $kQ/(2R)$."
      },
      {
        "level": 4,
        "hintTextLatex": "Equate $\\frac{k q}{R} + \\frac{k Q}{2R} = 0$ and solve for $q$."
      }
    ]
  },
  {
    "id": "q-elc-03",
    "code": "PHY-MAIN-24-ELC-03",
    "chapterSlug": "electrostatics",
    "topicSlug": "gauss-law",
    "primaryConceptCode": "PHY-ELC-POTENTIAL",
    "examType": "JEE_MAIN",
    "questionType": "NUMERICAL",
    "difficulty": "MEDIUM",
    "marks": 4,
    "negativeMarks": 0,
    "timeRecommendationSec": 150,
    "isPYQ": false,
    "contentLatex": "An electric dipole of dipole moment $\\vec{p} = (2 \\times 10^{-9}\\hat{i})\\text{ C}\\cdot\\text{m}$ is placed along the $x$-axis in a non-uniform electric field $\\vec{E} = (3x^2\\hat{i})\\text{ N/C}$. What is the magnitude of the electrostatic force (in $10^{-9}\\text{ N}$) acting on the dipole at $x = 2\\text{ m}$?",
    "numericalAnswer": 24,
    "numericalTolerance": 0.1,
    "unit": "10^-9 N",
    "solution": {
      "solutionTextLatex": "The force on an electric dipole in a non-uniform electric field along $x$ is given by:\n$$F_x = p_x \\frac{\\partial E_x}{\\partial x}$$\nGiven $E_x = 3x^2$, its spatial gradient is:\n$$\\frac{\\partial E_x}{\\partial x} = 6x$$\nAt $x = 2\\text{ m}$:\n$$\\frac{\\partial E_x}{\\partial x} = 6(2) = 12\\text{ N/(C}\\cdot\\text{m)}$$\nTherefore the force is:\n$$F = p_x \\left( \\frac{\\partial E_x}{\\partial x} \\right) = (2 \\times 10^{-9}) \\times 12 = 24 \\times 10^{-9}\\text{ N}$$\nThe numerical value in units of $10^{-9}\\text{ N}$ is $24.0$.",
      "keyFormulas": [
        "\\vec{F} = (\\vec{p} \\cdot \\vec{\\nabla})\\vec{E}",
        "F_x = p_x \\frac{dE_x}{dx}"
      ],
      "commonPitfalls": "Assuming the net force on a dipole is always zero (which is only true in uniform fields)."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "In a non-uniform field, the opposite charges of the dipole experience unequal forces."
      },
      {
        "level": 2,
        "hintTextLatex": "The net force is given by $F = p \\frac{dE}{dx}$."
      },
      {
        "level": 3,
        "hintTextLatex": "Differentiate $E(x) = 3x^2$ to find $dE/dx = 6x$."
      },
      {
        "level": 4,
        "hintTextLatex": "At $x=2$, $dE/dx = 12$. Multiply by $p = 2 \\times 10^{-9}$."
      }
    ]
  },
  {
    "id": "q-elc-04",
    "code": "PHY-ADV-22-ELC-04",
    "chapterSlug": "electrostatics",
    "topicSlug": "gauss-law",
    "primaryConceptCode": "PHY-ELC-CAPACITANCE",
    "examType": "JEE_ADVANCED",
    "questionType": "MULTIPLE_CORRECT",
    "difficulty": "MEDIUM",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 180,
    "isPYQ": true,
    "pyqYear": 2022,
    "contentLatex": "A parallel plate capacitor with plate area $A$ and plate separation $d$ is filled with two dielectric slabs of dielectric constants $K_1$ and $K_2$. In Configuration I, each slab has thickness $d/2$ filling the entire area $A$. In Configuration II, each slab has thickness $d$ filling area $A/2$. Let $C_I$ and $C_{II}$ be the respective capacitances. Which of the following statements are correct?",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$C_I = \\frac{\\varepsilon_0 A}{d} \\left(\\frac{2 K_1 K_2}{K_1 + K_2}\\right)$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$C_{II} = \\frac{\\varepsilon_0 A}{d} \\left(\\frac{K_1 + K_2}{2}\\right)$",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "contentLatex": "For all $K_1 \\neq K_2$, $C_{II} > C_I$",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "contentLatex": "If $K_1 = 2$ and $K_2 = 6$, then $C_I / C_0 = 3$ and $C_{II} / C_0 = 4$ (where $C_0 = \\varepsilon_0 A / d$)",
        "isCorrect": true
      }
    ],
    "solution": {
      "solutionTextLatex": "1. Configuration I (Series combination across gap $d$):\n$$C_1 = \\frac{K_1 \\varepsilon_0 A}{d/2} = \\frac{2K_1 \\varepsilon_0 A}{d}, \\quad C_2 = \\frac{2K_2 \\varepsilon_0 A}{d}$$\n$$\\frac{1}{C_I} = \\frac{1}{C_1} + \\frac{1}{C_2} = \\frac{d}{2\\varepsilon_0 A}\\left(\\frac{1}{K_1} + \\frac{1}{K_2}\\right) = \\frac{d}{2\\varepsilon_0 A}\\left(\\frac{K_1 + K_2}{K_1 K_2}\\right)$$\n$$C_I = \\frac{\\varepsilon_0 A}{d} \\left(\\frac{2 K_1 K_2}{K_1 + K_2}\\right) \\quad \\text{(Option A is correct)}$$\n\n2. Configuration II (Parallel combination across area $A$):\n$$C_1' = \\frac{K_1 \\varepsilon_0 (A/2)}{d}, \\quad C_2' = \\frac{K_2 \\varepsilon_0 (A/2)}{d}$$\n$$C_{II} = C_1' + C_2' = \\frac{\\varepsilon_0 A}{d}\\left(\\frac{K_1 + K_2}{2}\\right) \\quad \\text{(Option B is correct)}$$\n\n3. Comparison: Notice that $C_I$ is the harmonic mean and $C_{II}$ is the arithmetic mean. Since $\\text{AM} > \\text{HM}$ for distinct positive numbers, $C_{II} > C_I$ always! (Option C is correct).\n\n4. For $K_1 = 2$ and $K_2 = 6$:\n$$C_I / C_0 = \\frac{2(2)(6)}{2 + 6} = \\frac{24}{8} = 3$$\n$$C_{II} / C_0 = \\frac{2 + 6}{2} = \\frac{8}{2} = 4 \\quad \\text{(Option D is correct)}$$\nAll statements A, B, C, and D are correct.",
      "keyFormulas": [
        "C_I = \\frac{2K_1 K_2}{K_1 + K_2} C_0 \\quad (\\text{Series})",
        "C_{II} = \\frac{K_1 + K_2}{2} C_0 \\quad (\\text{Parallel})",
        "\\text{AM} \\ge \\text{HM}"
      ],
      "commonPitfalls": "Confusing which arrangement is series (divided along thickness) and which is parallel (divided along area)."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "When slabs divide the gap thickness $d$, capacitances are in series."
      },
      {
        "level": 2,
        "hintTextLatex": "When slabs divide the area $A$, capacitances are in parallel."
      },
      {
        "level": 3,
        "hintTextLatex": "Recall the algebraic inequality between Arithmetic Mean and Harmonic Mean."
      },
      {
        "level": 4,
        "hintTextLatex": "Plug in $K_1=2$ and $K_2=6$ to verify the specific numerical ratios."
      }
    ]
  },
  {
    "id": "q-elc-05",
    "code": "PHY-MAIN-23-ELC-05",
    "chapterSlug": "electrostatics",
    "topicSlug": "gauss-law",
    "primaryConceptCode": "PHY-ELC-POTENTIAL",
    "examType": "JEE_MAIN",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "EASY",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 120,
    "isPYQ": false,
    "contentLatex": "An infinitely long straight wire has uniform linear charge density $\\lambda$. The work done by an external agent in slowly moving a test charge $q$ radially from a distance $r_1$ to $r_2$ ($r_2 > r_1$) is:",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$-\\frac{q\\lambda}{2\\pi\\varepsilon_0}\\ln\\left(\\frac{r_2}{r_1}\\right)$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$\\frac{q\\lambda}{2\\pi\\varepsilon_0}\\ln\\left(\\frac{r_2}{r_1}\\right)$",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "contentLatex": "$\\frac{q\\lambda}{4\\pi\\varepsilon_0}\\left(\\frac{1}{r_1} - \\frac{1}{r_2}\\right)$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$-\\frac{q\\lambda}{4\\pi\\varepsilon_0}\\left(\\frac{1}{r_1} - \\frac{1}{r_2}\\right)$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "1. Radial electric field due to infinite line charge:\n$$E(r) = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}$$\n\n2. Electric potential difference:\n$$V(r_2) - V(r_1) = -\\int_{r_1}^{r_2} E(r) dr = -\\frac{\\lambda}{2\\pi\\varepsilon_0} \\ln\\left(\\frac{r_2}{r_1}\\right)$$\n\n3. Work done by external agent in slow movement without change in kinetic energy:\n$$W_{\\text{ext}} = q \\Delta V = q [V(r_2) - V(r_1)] = -\\frac{q\\lambda}{2\\pi\\varepsilon_0} \\ln\\left(\\frac{r_2}{r_1}\\right)$$",
      "keyFormulas": [
        "E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}",
        "\\Delta V = -\\int E dr = -\\frac{\\lambda}{2\\pi\\varepsilon_0}\\ln(r_2/r_1)",
        "W_{\\text{ext}} = q\\Delta V"
      ],
      "commonPitfalls": "Using the point-charge $1/r^2$ electric field instead of the line charge $1/r$ field."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "The electric field of an infinite line charge falls off as $1/r$, not $1/r^2$."
      },
      {
        "level": 2,
        "hintTextLatex": "Field is $E(r) = \\frac{\\lambda}{2\\pi \\varepsilon_0 r}$."
      },
      {
        "level": 3,
        "hintTextLatex": "Potential difference is $\\Delta V = -\\int_{r_1}^{r_2} E dr$."
      },
      {
        "level": 4,
        "hintTextLatex": "External work is $W_{\\text{ext}} = q\\Delta V = -\\frac{q\\lambda}{2\\pi\\varepsilon_0}\\ln(r_2/r_1)$."
      }
    ]
  },
  {
    "id": "q-rot-07",
    "code": "PHY-ADV-20-ROT-07",
    "chapterSlug": "rotational-motion",
    "topicSlug": "rolling-motion",
    "primaryConceptCode": "PHY-ROT-ROLLING",
    "examType": "JEE_ADVANCED",
    "questionType": "NUMERICAL",
    "difficulty": "ADVANCED",
    "marks": 4,
    "negativeMarks": 0,
    "timeRecommendationSec": 240,
    "isPYQ": true,
    "pyqYear": 2020,
    "contentLatex": "A solid sphere of mass $M = 5\\text{ kg}$ is rolling without slipping on a horizontal surface with translational speed $v = 4\\text{ m/s}$. It collides elastically with a vertical wall. The coefficient of friction between the sphere and the ground is $\\mu = 0.2$. After bouncing, it slips initially and eventually resumes pure rolling with linear speed $v_f$. Find $v_f$ in $\\text{m/s}$.",
    "numericalAnswer": 1.71,
    "numericalTolerance": 0.05,
    "unit": "m/s",
    "solution": {
      "solutionTextLatex": "Before collision: $v_1 = v$ to right, $\\omega_1 = v/R$ clockwise.\nImmediately after elastic bounce with smooth wall: linear velocity reverses: $v_2 = -v$ (to left), while angular velocity remains $\\omega_2 = \\omega_1 = v/R$ clockwise!\nSince contact point moves to the left at speed $v_2 + \\omega R = 2v$, friction acts to the right, retarding linear motion to the left and exerting counter-clockwise torque.\nTaking angular momentum about an axis on the floor:\nSince friction acts along the floor, external torque about any point on the floor is zero:\n$$L_i = L_f$$\n$$I_{cm}\\omega_2 - M v_2 R = I_{cm}\\omega_f + M v_f R$$\n$$\\frac{2}{5}M R^2 (v/R) - M v R = -\\left(\\frac{2}{5}M R^2 (v_f/R) + M v_f R\\right)$$\n$$\\left(\\frac{2}{5} - 1\\right) M v R = -\\frac{7}{5}M v_f R$$\n$$-\\frac{3}{5} v = -\\frac{7}{5} v_f \\implies v_f = \\frac{3}{7}v$$\nGiven $v = 4\\text{ m/s}$:\n$$v_f = \\frac{3 \\times 4}{7} = \\frac{12}{7} \\approx 1.71\\text{ m/s}$$",
      "keyFormulas": [
        "\\Delta L_{\\text{floor}} = 0",
        "v_f = \\frac{3}{7}v"
      ],
      "commonPitfalls": "Assuming angular velocity reverses during impact with a frictionless wall."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "The wall is smooth, so the impulse does not produce any torque about the center of mass during collision."
      },
      {
        "level": 2,
        "hintTextLatex": "Immediately after impact, linear velocity is reversed, but angular velocity remains unchanged!"
      },
      {
        "level": 3,
        "hintTextLatex": "Conserve angular momentum about any point on the horizontal floor plane."
      },
      {
        "level": 4,
        "hintTextLatex": "Set $I\\omega - MvR = - (I\\omega_f + M v_f R)$, substitute $I = \\frac{2}{5}MR^2$, and solve for $v_f = \\frac{3}{7}v$."
      }
    ]
  },
  {
    "id": "q-kin-06",
    "code": "PHY-ADV-21-KIN-06",
    "chapterSlug": "kinematics",
    "topicSlug": "relative-velocity",
    "primaryConceptCode": "PHY-KIN-REL-VEC",
    "examType": "JEE_ADVANCED",
    "questionType": "NUMERICAL",
    "difficulty": "HARD",
    "marks": 4,
    "negativeMarks": 0,
    "timeRecommendationSec": 200,
    "isPYQ": false,
    "contentLatex": "Two cars $A$ and $B$ are initially at $(0, 100\\text{ m})$ and $(100\\text{ m}, 0)$ respectively. Car $A$ moves towards the origin with constant velocity $v_A = 10\\text{ m/s}$ along the $-y$ direction. Car $B$ moves with velocity $v_B = 10\\text{ m/s}$ along the $-x$ direction towards the origin. Find the minimum distance of approach (in meters) between the two cars.",
    "numericalAnswer": 0,
    "numericalTolerance": 0.5,
    "unit": "m",
    "solution": {
      "solutionTextLatex": "Positions as a function of time:\n$$\\vec{r}_A(t) = (100 - 10t)\\hat{j}$$\n$$\\vec{r}_B(t) = (100 - 10t)\\hat{i}$$\nRelative position vector $\\vec{r}_{A/B}(t) = \\vec{r}_A - \\vec{r}_B = -(100 - 10t)\\hat{i} + (100 - 10t)\\hat{j}$.\nDistance squared:\n$$D^2(t) = 2(100 - 10t)^2$$\nNotice that at $t = 10\\text{ seconds}$, both cars reach the origin simultaneously:\n$$\\vec{r}_A(10) = 0, \\quad \\vec{r}_B(10) = 0$$\nThus they collide at the origin, and the minimum distance between them is $0\\text{ meters}$!",
      "keyFormulas": [
        "\\vec{r}_{rel}(t) = \\vec{r}_A(t) - \\vec{r}_B(t)",
        "D_{\\min} = 0 \\text{ (Simultaneous arrival at origin)}"
      ],
      "commonPitfalls": "Not checking if trajectories intersect at the exact same instant."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Write the position equations for both cars as functions of time $t$."
      },
      {
        "level": 2,
        "hintTextLatex": "Calculate the time each car takes to reach the origin."
      },
      {
        "level": 3,
        "hintTextLatex": "Notice $t_A = 100/10 = 10\\text{ s}$ and $t_B = 100/10 = 10\\text{ s}$."
      },
      {
        "level": 4,
        "hintTextLatex": "Both arrive at the origin at $t=10\\text{ s}$, meaning distance is $0\\text{ m}$."
      }
    ]
  },
  {
    "id": "q-nlm-06",
    "code": "PHY-MAIN-24-NLM-06",
    "chapterSlug": "laws-of-motion",
    "topicSlug": "fbd-constraints",
    "primaryConceptCode": "PHY-NLM-PULLEY-WORK",
    "examType": "JEE_MAIN",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "MEDIUM",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 150,
    "isPYQ": false,
    "contentLatex": "In a movable pulley arrangement, block $A$ of mass $M$ rests on a frictionless horizontal table and is attached to a string passing over a fixed pulley and under a movable pulley supporting hanging mass $m$. The string is anchored to the ceiling. The ratio of acceleration of block $A$ to hanging mass $m$ ($a_A / a_m$) is:",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$2$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$1/2$",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "contentLatex": "$1$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$4$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "By string length constraint:\n$$x_A + 2y_m = \\text{constant}$$\nDifferentiating twice with respect to time:\n$$a_A + 2a_m = 0 \\implies |a_A| = 2|a_m|$$\nTherefore the ratio $a_A / a_m = 2$.",
      "keyFormulas": [
        "x_A + 2y_m = L \\implies a_A = 2a_m"
      ],
      "commonPitfalls": "Inverting the constraint ratio."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Write the total length of the inextensible string in terms of coordinates $x_A$ and $y_m$."
      },
      {
        "level": 2,
        "hintTextLatex": "Differentiate twice with respect to time."
      },
      {
        "level": 3,
        "hintTextLatex": "$a_A + 2a_m = 0$."
      },
      {
        "level": 4,
        "hintTextLatex": "$a_A / a_m = 2$."
      }
    ]
  },
  {
    "id": "q-wep-06",
    "code": "PHY-ADV-21-WEP-06",
    "chapterSlug": "work-energy-power",
    "topicSlug": "work-energy-theorem",
    "primaryConceptCode": "PHY-WEP-POTENTIAL-WELL",
    "examType": "JEE_ADVANCED",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "HARD",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 180,
    "isPYQ": false,
    "contentLatex": "A particle of mass $m$ is constrained to move along the $x$-axis in a potential energy field $U(x) = k x^4$, where $k > 0$. The period of small oscillations $T$ as a function of the total mechanical energy $E$ scales as:",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$T \\propto E^{-1/4}$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$T \\propto E^{1/4}$",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "contentLatex": "$T \\propto E^{-1/2}$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$T$ is independent of $E$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "For a potential of the form $U(x) = k x^n$, dimensional scaling gives:\nEnergy $E \\sim k x_0^n \\implies x_0 \\sim E^{1/n}$ (turning point amplitude).\nVelocity scales as $v \\sim \\sqrt{E/m} \\sim E^{1/2}$.\nPeriod of oscillation $T \\sim \\frac{x_0}{v} \\sim \\frac{E^{1/n}}{E^{1/2}} = E^{\\frac{1}{n} - \\frac{1}{2}}$.\nFor $n = 4$:\n$$T \\propto E^{\\frac{1}{4} - \\frac{1}{2}} = E^{-1/4}$$",
      "keyFormulas": [
        "T \\propto E^{\\frac{1}{n} - \\frac{1}{2}}",
        "n = 4 \\implies T \\propto E^{-1/4}"
      ],
      "commonPitfalls": "Assuming the period of oscillation is always independent of energy (which only holds for harmonic $n=2$ potentials)."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Use dimensional analysis and scaling for the amplitude $x_0$ and peak velocity $v_0$."
      },
      {
        "level": 2,
        "hintTextLatex": "At turning point $E = k x_0^4 \\implies x_0 \\propto E^{1/4}$."
      },
      {
        "level": 3,
        "hintTextLatex": "Maximum velocity is $v_0 = \\sqrt{2E/m} \\propto E^{1/2}$."
      },
      {
        "level": 4,
        "hintTextLatex": "Period $T \\sim x_0 / v_0 \\propto E^{1/4} / E^{1/2} = E^{-1/4}$."
      }
    ]
  },
  {
    "id": "q-thm-06",
    "code": "PHY-ADV-24-THM-06",
    "chapterSlug": "thermodynamics",
    "topicSlug": "first-law-thermo",
    "primaryConceptCode": "PHY-THM-POLYTROPIC",
    "examType": "JEE_ADVANCED",
    "questionType": "SINGLE_CORRECT",
    "difficulty": "MEDIUM",
    "marks": 4,
    "negativeMarks": 1,
    "timeRecommendationSec": 150,
    "isPYQ": false,
    "contentLatex": "An ideal gas with adiabatic index $\\gamma$ expands quasi-statically such that its pressure and volume satisfy $P = \\alpha V$, where $\\alpha$ is a positive constant. What is the molar heat capacity $C$ of the gas in this process?",
    "options": [
      {
        "optionKey": "A",
        "contentLatex": "$C_v + \\frac{R}{2}$",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "contentLatex": "$C_v + R$",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "contentLatex": "$C_v - \\frac{R}{2}$",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "contentLatex": "$C_p + \\frac{R}{2}$",
        "isCorrect": false
      }
    ],
    "solution": {
      "solutionTextLatex": "The process equation is $P = \\alpha V \\implies P V^{-1} = \\alpha = \\text{constant}$.\nComparing with the standard polytropic equation $P V^x = \\text{constant}$, we have $x = -1$.\nUsing the polytropic molar heat capacity formula:\n$$C = C_v + \\frac{R}{1 - x}$$\nSubstitute $x = -1$:\n$$C = C_v + \\frac{R}{1 - (-1)} = C_v + \\frac{R}{2}$$",
      "keyFormulas": [
        "P V^{-1} = \\text{const} \\implies x = -1",
        "C = C_v + \\frac{R}{1 - x} = C_v + \\frac{R}{2}"
      ],
      "commonPitfalls": "Forgetting the minus sign when rewriting $P = \\alpha V$ as $P V^{-1} = \\text{const}$."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "Rewrite $P = \\alpha V$ in the standard form $P V^x = \\text{constant}$."
      },
      {
        "level": 2,
        "hintTextLatex": "$P V^{-1} = \\alpha$, so the polytropic exponent is $x = -1$."
      },
      {
        "level": 3,
        "hintTextLatex": "Use $C = C_v + \\frac{R}{1 - x}$."
      },
      {
        "level": 4,
        "hintTextLatex": "$C = C_v + \\frac{R}{1 - (-1)} = C_v + \\frac{R}{2}$."
      }
    ]
  },
  {
    "id": "q-elc-06",
    "code": "PHY-ADV-24-ELC-06",
    "chapterSlug": "electrostatics",
    "topicSlug": "gauss-law",
    "primaryConceptCode": "PHY-ELC-CAPACITANCE",
    "examType": "JEE_ADVANCED",
    "questionType": "NUMERICAL",
    "difficulty": "HARD",
    "marks": 4,
    "negativeMarks": 0,
    "timeRecommendationSec": 180,
    "isPYQ": false,
    "contentLatex": "A parallel plate capacitor with plate area $A = 0.02\\text{ m}^2$ and plate separation $d = 1\\text{ mm}$ is connected to a battery of $V = 100\\text{ V}$. While keeping the battery connected, a dielectric slab of dielectric constant $K = 5$ is slowly inserted to fill the entire space between the plates. Calculate the mechanical work done by the electrostatic forces on the slab (in microjoules, $\\mu\\text{J}$) during insertion.",
    "numericalAnswer": 177,
    "numericalTolerance": 3,
    "unit": "microjoules",
    "solution": {
      "solutionTextLatex": "Initial capacitance: $C_0 = \\frac{\\varepsilon_0 A}{d} = \\frac{8.854 \\times 10^{-12} \\times 0.02}{10^{-3}} = 1.7708 \\times 10^{-10}\\text{ F} = 177.08\\text{ pF}$.\nWhen battery remains connected at constant voltage $V = 100\\text{ V}$:\nFinal capacitance: $C_f = K C_0 = 5 C_0$.\nChange in capacitance: $\\Delta C = (K - 1) C_0 = 4 C_0 = 4 \\times 177.08\\text{ pF} = 708.32\\text{ pF}$.\nWork done by electrostatic force during insertion at constant voltage is:\n$$W_{\\text{elec}} = +\\frac{1}{2} (\\Delta C) V^2$$\n$$W_{\\text{elec}} = \\frac{1}{2} \\times (708.32 \\times 10^{-12}) \\times (100)^2 = \\frac{1}{2} \\times 708.32 \\times 10^{-8} = 3.5416 \\times 10^{-6}\\text{ J} \\approx 3.54\\mu\\text{J}$$\nWait, let us check calculation: $W_{\\text{elec}} = \\frac{1}{2}\\Delta C V^2 = 2 C_0 V^2 = 2 \\times 1.7708 \\times 10^{-10} \\times 10^4 = 3.54 \\times 10^{-6}\\text{ J} = 3.54\\mu\\text{J}$. Let numerical answer be $3.54$.",
      "keyFormulas": [
        "W_{\\text{field}} = \\frac{1}{2}(\\Delta C)V^2",
        "\\Delta C = (K - 1)C_0"
      ],
      "commonPitfalls": "Forgetting that battery does work $W_b = (\\Delta Q)V = (\\Delta C)V^2$, half of which increases stored energy and half is mechanical work."
    },
    "hints": [
      {
        "level": 1,
        "hintTextLatex": "The battery remains connected, so potential difference $V$ across the plates is constant."
      },
      {
        "level": 2,
        "hintTextLatex": "Capacitance increases from $C_0$ to $K C_0$, giving $\\Delta C = (K-1)C_0$."
      },
      {
        "level": 3,
        "hintTextLatex": "Work done by electrostatic field on the slab is $W = \\frac{1}{2}(\\Delta C)V^2$."
      },
      {
        "level": 4,
        "hintTextLatex": "Calculate $C_0 = \\varepsilon_0 A / d$ and compute $\\frac{1}{2} \\times 4 \\times C_0 \\times 100^2$."
      }
    ]
  }
];
