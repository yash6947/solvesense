export interface SeedChapter {
  id: string;
  name: string;
  slug: string;
  description: string;
  displayOrder: number;
  topics: {
    id: string;
    name: string;
    slug: string;
    concepts: {
      code: string;
      name: string;
      summary: string;
      prerequisites?: string[];
    }[];
  }[];
}

export const JEE_PHYSICS_SYLLABUS: SeedChapter[] = [
  {
    id: 'chap-kinematics',
    name: 'Kinematics',
    slug: 'kinematics',
    description: 'Motion in 1D and 2D, projectile motion, and relative velocity.',
    displayOrder: 1,
    topics: [
      {
        id: 'top-1d-motion',
        name: 'Rectilinear Motion with Variable Acceleration',
        slug: 'rectilinear-motion',
        concepts: [
          {
            code: 'PHY-KIN-DIFF-CALC',
            name: 'Differential Calculus in Kinematics',
            summary: '$v = \\frac{dx}{dt}$ and $a = \\frac{dv}{dt} = v\\frac{dv}{dx}$. Essential for non-uniform acceleration.',
          },
          {
            code: 'PHY-KIN-GRAPH-ANALYSIS',
            name: 'Velocity-Time & Acceleration-Displacement Graphs',
            summary: 'Area under $v$-$t$ graph represents displacement; slope represents instantaneous acceleration.',
          },
        ],
      },
      {
        id: 'top-projectile',
        name: 'Projectile Motion on Flat & Inclined Planes',
        slug: 'projectile-motion',
        concepts: [
          {
            code: 'PHY-KIN-PROJ-INCL',
            name: 'Projectile on an Inclined Plane',
            summary: 'Resolving gravitational acceleration into $g\\sin\\beta$ and $g\\cos\\beta$ along and perpendicular to the incline.',
            prerequisites: ['PHY-KIN-DIFF-CALC'],
          },
        ],
      },
      {
        id: 'top-relative-motion',
        name: 'Relative Velocity & River-Swimmer Problems',
        slug: 'relative-velocity',
        concepts: [
          {
            code: 'PHY-KIN-REL-VEC',
            name: 'Relative Motion Vector Subtraction',
            summary: '$\\vec{v}_{A/B} = \\vec{v}_A - \\vec{v}_B$. Applied to shortest path vs. shortest time navigation.',
          },
        ],
      },
    ],
  },
  {
    id: 'chap-laws-of-motion',
    name: 'Laws of Motion',
    slug: 'laws-of-motion',
    description: "Newton's laws, Free Body Diagrams, friction, and constrained motion.",
    displayOrder: 2,
    topics: [
      {
        id: 'top-fbd-constraints',
        name: 'Free Body Diagrams & String-Pulley Constraints',
        slug: 'fbd-constraints',
        concepts: [
          {
            code: 'PHY-NLM-FBD',
            name: 'Free Body Diagram & Pseudo Force in Non-Inertial Frames',
            summary: 'In an accelerating frame $\\vec{a}_0$, apply pseudo force $\\vec{F}_p = -m\\vec{a}_0$.',
          },
          {
            code: 'PHY-NLM-PULLEY-WORK',
            name: 'Virtual Work Method for Pulleys',
            summary: '$\\sum \\vec{T} \\cdot \\vec{x} = 0 \\implies \\sum \\vec{T} \\cdot \\vec{a} = 0$ for massless inextensible strings.',
          },
        ],
      },
      {
        id: 'top-friction',
        name: 'Static & Kinetic Friction on Inclined Planes',
        slug: 'friction-inclined-plane',
        concepts: [
          {
            code: 'PHY-NLM-INCLINE-FRIC',
            name: 'Two-Block Friction Systems',
            summary: 'Determining the threshold acceleration before relative slipping occurs between stacked blocks.',
            prerequisites: ['PHY-NLM-FBD'],
          },
        ],
      },
    ],
  },
  {
    id: 'chap-work-energy-power',
    name: 'Work, Energy and Power',
    slug: 'work-energy-power',
    description: 'Work-energy theorem, conservative forces, and non-linear springs.',
    displayOrder: 3,
    topics: [
      {
        id: 'top-work-energy-thm',
        name: 'Work-Energy Theorem & Variable Force Fields',
        slug: 'work-energy-theorem',
        concepts: [
          {
            code: 'PHY-WEP-THEOREM',
            name: 'Generalized Work-Energy Theorem',
            summary: '$W_{\\text{all}} = \\Delta K$. Total work by conservative, non-conservative, and external forces equals change in kinetic energy.',
          },
          {
            code: 'PHY-WEP-POTENTIAL-WELL',
            name: 'Potential Energy Curves & Stability',
            summary: '$F = -\\frac{dU}{dx}$. Stable equilibrium occurs where $\\frac{d^2U}{dx^2} > 0$.',
            prerequisites: ['PHY-WEP-THEOREM'],
          },
        ],
      },
    ],
  },
  {
    id: 'chap-rotational-motion',
    name: 'Rotational Motion & Rigid Body Dynamics',
    slug: 'rotational-motion',
    description: 'Torque, moment of inertia, rolling without slipping, and angular momentum.',
    displayOrder: 4,
    topics: [
      {
        id: 'top-moment-of-inertia',
        name: 'Moment of Inertia & Parallel/Perpendicular Axes Theorems',
        slug: 'moment-of-inertia',
        concepts: [
          {
            code: 'PHY-ROT-MOI-CALC',
            name: 'Integration Method for Moment of Inertia',
            summary: '$I = \\int r^2 dm$. Application of parallel axis theorem $I = I_{cm} + Md^2$.',
          },
        ],
      },
      {
        id: 'top-rolling-without-slipping',
        name: 'Rolling Without Slipping & Instantaneous Center',
        slug: 'rolling-motion',
        concepts: [
          {
            code: 'PHY-ROT-ROLLING',
            name: 'Pure Rolling Dynamics on Rough Inclines',
            summary: 'Condition $v_{cm} = \\omega R$ and $a_{cm} = \\alpha R$. Friction provides torque without dissipating energy.',
            prerequisites: ['PHY-ROT-MOI-CALC', 'PHY-NLM-INCLINE-FRIC'],
          },
        ],
      },
      {
        id: 'top-angular-momentum',
        name: 'Conservation of Angular Momentum',
        slug: 'angular-momentum-conservation',
        concepts: [
          {
            code: 'PHY-ROT-ANG-MOM',
            name: 'Angular Momentum Conservation about Instantaneous Axis',
            summary: 'If $\\sum \\vec{\\tau}_{ext} = 0$, then $\\vec{L} = I\\vec{\\omega} + \\vec{r}_{cm} \\times m\\vec{v}_{cm} = \\text{constant}$.',
            prerequisites: ['PHY-ROT-MOI-CALC'],
          },
        ],
      },
    ],
  },
  {
    id: 'chap-thermodynamics',
    name: 'Thermodynamics & Kinetic Theory',
    slug: 'thermodynamics',
    description: 'First & Second Laws, Carnot cycle, and polytropic processes.',
    displayOrder: 5,
    topics: [
      {
        id: 'top-first-law',
        name: 'First Law of Thermodynamics & Indicator Diagrams',
        slug: 'first-law-thermo',
        concepts: [
          {
            code: 'PHY-THM-FIRST-LAW',
            name: 'First Law: Heat, Work, and Internal Energy',
            summary: '$dQ = dU + dW$, where $dU = nC_v dT$ and $dW = P dV$.',
          },
          {
            code: 'PHY-THM-POLYTROPIC',
            name: 'Polytropic Processes $PV^x = \\text{constant}$',
            summary: 'Molar heat capacity $C = C_v + \\frac{R}{1 - x}$.',
            prerequisites: ['PHY-THM-FIRST-LAW'],
          },
          {
            code: 'PHY-THM-CARNOT',
            name: 'Second Law & Carnot Heat Engine Cycles',
            summary: 'Efficiency $\\eta = 1 - \\frac{T_C}{T_H} = \\frac{W}{Q_{in}}$ for reversible cycles.',
            prerequisites: ['PHY-THM-FIRST-LAW'],
          },
        ],
      },
    ],
  },
  {
    id: 'chap-electrostatics',
    name: 'Electrostatics',
    slug: 'electrostatics',
    description: "Gauss's Law, electric potential, conductors, and dielectrics.",
    displayOrder: 6,
    topics: [
      {
        id: 'top-gauss-law',
        name: "Gauss's Law & Symmetric Charge Distributions",
        slug: 'gauss-law',
        concepts: [
          {
            code: 'PHY-ELC-GAUSS',
            name: "Gauss's Law Flux Integration",
            summary: '$\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{\\text{enclosed}}}{\\varepsilon_0}$.',
          },
          {
            code: 'PHY-ELC-POTENTIAL',
            name: 'Electrostatic Potential & Energy of Charge Configurations',
            summary: '$V(r) = -\\int \\vec{E} \\cdot d\\vec{r}$ and $U = \\frac{1}{2}\\sum q_i V_i$.',
            prerequisites: ['PHY-ELC-GAUSS'],
          },
          {
            code: 'PHY-ELC-CAPACITANCE',
            name: 'Capacitance & Dielectric Polarisation',
            summary: '$C = \\frac{Q}{V} = \\frac{K\\varepsilon_0 A}{d}$ and electrostatic energy density $u = \\frac{1}{2}\\varepsilon_0 E^2$.',
            prerequisites: ['PHY-ELC-POTENTIAL'],
          },
        ],
      },
    ],
  },
];
