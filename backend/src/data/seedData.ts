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


export const JEE_MATHEMATICS_SYLLABUS: SeedChapter[] = [
  {
    id: 'chap-calculus',
    name: 'Differential & Integral Calculus',
    slug: 'calculus',
    description: 'Limits, continuity, derivatives, definite integrals, and differential equations.',
    displayOrder: 1,
    topics: [
      {
        id: 'top-diff-calc',
        name: 'Applications of Derivatives (Maxima & Minima)',
        slug: 'maxima-minima',
        concepts: [
          {
            code: 'MATH-CALC-MAX-MIN',
            name: 'First and Second Derivative Tests for Extreme Values',
            summary: '$f\'(x) = 0$ identifies critical points; $f\'\'(x) < 0$ implies local maximum.',
          },
        ],
      },
      {
        id: 'top-definite-int',
        name: 'Definite Integrals & Area under Curves',
        slug: 'definite-integrals',
        concepts: [
          {
            code: 'MATH-CALC-INT-PROP',
            name: "King's Rule & Symmetry in Definite Integrals",
            summary: '$\\int_a^b f(x) dx = \\int_a^b f(a + b - x) dx$.',
          },
        ],
      },
    ],
  },
  {
    id: 'chap-vectors-3d',
    name: 'Vectors & 3D Geometry',
    slug: 'vectors-3d',
    description: 'Scalar and vector triple products, equations of lines, planes, and skew line distances.',
    displayOrder: 2,
    topics: [
      {
        id: 'top-vec-products',
        name: 'Vector Triple Product & Coplanarity',
        slug: 'vector-triple-product',
        concepts: [
          {
            code: 'MATH-VEC-TRIPLE',
            name: 'Vector Triple Product Expansion',
            summary: '$\\vec{a} \\times (\\vec{b} \\times \\vec{c}) = (\\vec{a} \\cdot \\vec{c})\\vec{b} - (\\vec{a} \\cdot \\vec{b})\\vec{c}$.',
          },
        ],
      },
    ],
  },
  {
    id: 'chap-coordinate-geometry',
    name: 'Coordinate Geometry (Conics)',
    slug: 'coordinate-geometry',
    description: 'Parabola, Ellipse, Hyperbola focal properties, tangents, and normal equations.',
    displayOrder: 3,
    topics: [
      {
        id: 'top-conics-tangents',
        name: 'Tangents & Normals to Conic Sections',
        slug: 'conic-tangents',
        concepts: [
          {
            code: 'MATH-CONIC-TANGENT',
            name: 'Condition of Tangency for Ellipse & Parabola',
            summary: '$y = mx \\pm \\sqrt{a^2 m^2 + b^2}$ for $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$.',
          },
        ],
      },
    ],
  },
  {
    id: 'chap-probability',
    name: 'Probability & Combinatorics',
    slug: 'probability',
    description: "Bayes' Theorem, conditional probability, binomial distribution, and permutations.",
    displayOrder: 4,
    topics: [
      {
        id: 'top-bayes-theorem',
        name: "Bayes' Theorem & Total Probability",
        slug: 'bayes-theorem',
        concepts: [
          {
            code: 'MATH-PROB-BAYES',
            name: 'Posterior Probability using Bayes Rule',
            summary: '$P(A_i | B) = \\frac{P(B | A_i) P(A_i)}{\\sum P(B | A_k) P(A_k)}$.',
          },
        ],
      },
    ],
  },
];

export const JEE_CHEMISTRY_SYLLABUS: SeedChapter[] = [
  {
    id: 'chap-chemical-bonding',
    name: 'Chemical Bonding & Molecular Structure',
    slug: 'chemical-bonding',
    description: 'VSEPR theory, Hybridization, Molecular Orbital Theory (MOT), and dipole moments.',
    displayOrder: 1,
    topics: [
      {
        id: 'top-mot',
        name: 'Molecular Orbital Theory & Bond Order',
        slug: 'molecular-orbital-theory',
        concepts: [
          {
            code: 'CHEM-BOND-MOT',
            name: 'Bond Order and Paramagnetic/Diamagnetic Behavior',
            summary: 'Bond Order = $\\frac{N_b - N_a}{2}$. Paramagnetism arises from unpaired electrons in degenerate orbitals.',
          },
        ],
      },
    ],
  },
  {
    id: 'chap-thermo-chem',
    name: 'Chemical Thermodynamics & Energetics',
    slug: 'thermodynamics-chemistry',
    description: "Enthalpy, entropy, Gibbs Free Energy (ΔG), and spontaneous equilibrium criteria.",
    displayOrder: 2,
    topics: [
      {
        id: 'top-gibbs-energy',
        name: 'Gibbs Free Energy & Chemical Spontaneity',
        slug: 'gibbs-free-energy',
        concepts: [
          {
            code: 'CHEM-THM-GIBBS',
            name: 'Van t Hoff Equation & Reaction Spontaneity',
            summary: '$\\Delta G^\\circ = -RT \\ln K_{eq} = \\Delta H^\\circ - T\\Delta S^\\circ$.',
          },
        ],
      },
    ],
  },
  {
    id: 'chap-organic-mechanisms',
    name: 'Organic Reaction Mechanisms',
    slug: 'organic-mechanisms',
    description: 'Electrophilic addition, nucleophilic substitution (SN1/SN2), elimination (E1/E2), and aromaticity.',
    displayOrder: 3,
    topics: [
      {
        id: 'top-sn1-sn2',
        name: 'Nucleophilic Substitution Kinetics & Stereochemistry',
        slug: 'substitution-reactions',
        concepts: [
          {
            code: 'CHEM-ORG-SN2',
            name: 'Walden Inversion in SN2 Reactions',
            summary: 'Bi-molecular concerted backside attack with complete stereochemical inversion.',
          },
        ],
      },
    ],
  },
  {
    id: 'chap-coordination-compounds',
    name: 'Coordination Compounds',
    slug: 'coordination-compounds',
    description: 'Crystal Field Theory (CFT), Werner theory, isomerism, and magnetic moments.',
    displayOrder: 4,
    topics: [
      {
        id: 'top-cft',
        name: 'Crystal Field Splitting in Octahedral & Tetrahedral Complexes',
        slug: 'crystal-field-theory',
        concepts: [
          {
            code: 'CHEM-COORD-CFT',
            name: 'CFSE and High-Spin vs Low-Spin Configurations',
            summary: '$\\Delta_o$ splitting into $t_{2g}$ and $e_g$ orbitals with pairing energy comparison.',
          },
        ],
      },
    ],
  },
];

export const CS_DSA_SYLLABUS: SeedChapter[] = [
  {
    id: 'chap-arrays-hashing',
    name: 'Arrays, Hashing & Two Pointers',
    slug: 'arrays-hashing',
    description: 'Prefix sums, sliding window, two pointer techniques, and constant-time hash maps.',
    displayOrder: 1,
    topics: [
      {
        id: 'top-two-pointers',
        name: 'Two Pointer Invariant & Sliding Window',
        slug: 'two-pointers',
        concepts: [
          {
            code: 'CS-ARR-TWO-POINTER',
            name: 'Opposite-End Two Pointer Convergence',
            summary: 'Optimal $O(N)$ monotonic search for pair target sums on sorted arrays.',
          },
        ],
      },
    ],
  },
  {
    id: 'chap-dynamic-programming',
    name: 'Dynamic Programming',
    slug: 'dynamic-programming',
    description: 'Overlapping subproblems, optimal substructure, memoization, and bottom-up tabulation.',
    displayOrder: 2,
    topics: [
      {
        id: 'top-dp-subsequence',
        name: 'Longest Common Subsequence & Knapsack',
        slug: 'dp-subsequences',
        concepts: [
          {
            code: 'CS-DP-01-KNAPSACK',
            name: '0/1 Knapsack State Recurrence',
            summary: '$dp[i][w] = \\max(dp[i-1][w], \\text{val}[i] + dp[i-1][w - \\text{wt}[i]])$.',
          },
        ],
      },
    ],
  },
  {
    id: 'chap-trees-graphs',
    name: 'Trees & Graph Traversal',
    slug: 'trees-graphs',
    description: 'Binary Search Trees, LCA, BFS, DFS, Dijkstra shortest path, and topological sort.',
    displayOrder: 3,
    topics: [
      {
        id: 'top-bfs-dfs',
        name: 'Graph Breadth-First & Depth-First Search',
        slug: 'graph-traversal',
        concepts: [
          {
            code: 'CS-GRAPH-BFS',
            name: 'Shortest Path in Unweighted Graph via BFS Queue',
            summary: 'Level-order queue traversal ensuring minimal edge distance in $O(V + E)$ time.',
          },
        ],
      },
    ],
  },
];
