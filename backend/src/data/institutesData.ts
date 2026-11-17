export interface SeedInstitute {
  id: string;
  name: string;
  slug: string;
  code: string;
  city: string;
  website: string;
  isVerified: boolean;
  totalStudents: number;
  totalTeachers: number;
  batches: {
    id: string;
    name: string;
    targetYear: number;
    studentCount: number;
    avgAccuracy: number;
    topWeakChapter: string;
  }[];
}

export interface InstituteStudent {
  id: string;
  name: string;
  maskedEmail: string;
  batchName: string;
  targetExam: string;
  problemSolvingIndex: number;
  accuracy: number;
  attemptedCount: number;
  needsAttention: boolean;
  weakConcept: string;
}

export interface SeedScholarship {
  id: string;
  instituteId: string;
  instituteName: string;
  title: string;
  description: string;
  awardDetails: string;
  minPsiScore: number;
  minContestScore: number;
  deadline: string;
  status: 'OPEN' | 'UNDER_REVIEW' | 'AWARDED';
  applicantsCount: number;
}

export const SEED_INSTITUTES: SeedInstitute[] = [
  {
    id: 'inst-apex-01',
    name: 'Apex IIT-JEE National Academy',
    slug: 'apex-academy',
    code: 'APEX-KOTA',
    city: 'Kota, Rajasthan',
    website: 'https://apex.jee.zenith.edu',
    isVerified: true,
    totalStudents: 340,
    totalTeachers: 18,
    batches: [
      {
        id: 'batch-super-30',
        name: 'Apex Super-30 Advanced (2026)',
        targetYear: 2026,
        studentCount: 30,
        avgAccuracy: 78.5,
        topWeakChapter: 'Rotational Motion',
      },
      {
        id: 'batch-champions',
        name: 'Champions Batch (Class 12)',
        targetYear: 2026,
        studentCount: 160,
        avgAccuracy: 64.2,
        topWeakChapter: 'Laws of Motion',
      },
      {
        id: 'batch-droppers',
        name: 'Droppers Intensive (Target 2025)',
        targetYear: 2025,
        studentCount: 150,
        avgAccuracy: 59.8,
        topWeakChapter: 'Thermodynamics',
      },
    ],
  },
  {
    id: 'inst-zenith-02',
    name: 'Zenith Scholars Foundation',
    slug: 'zenith-scholars',
    code: 'ZEN-DELHI',
    city: 'New Delhi',
    website: 'https://scholars.zenith.edu',
    isVerified: true,
    totalStudents: 185,
    totalTeachers: 12,
    batches: [
      {
        id: 'batch-zen-alpha',
        name: 'Alpha IIT Scholars (2026)',
        targetYear: 2026,
        studentCount: 85,
        avgAccuracy: 72.0,
        topWeakChapter: 'Electrostatics',
      },
    ],
  },
];

export const SEED_INSTITUTE_STUDENTS: { [instituteId: string]: InstituteStudent[] } = {
  'inst-apex-01': [
    {
      id: 'st-01',
      name: 'Rohan Deshmukh',
      maskedEmail: 'ro***@jee.zenith.edu',
      batchName: 'Apex Super-30 Advanced (2026)',
      targetExam: 'JEE Advanced',
      problemSolvingIndex: 88.4,
      accuracy: 89.2,
      attemptedCount: 184,
      needsAttention: false,
      weakConcept: 'None (Proficient)',
    },
    {
      id: 'st-02',
      name: 'Arjun Sharma',
      maskedEmail: 'ar***@jee.zenith.edu',
      batchName: 'Apex Super-30 Advanced (2026)',
      targetExam: 'JEE Advanced',
      problemSolvingIndex: 74.5,
      accuracy: 66.7,
      attemptedCount: 142,
      needsAttention: false,
      weakConcept: 'Rotational Torque Resolution',
    },
    {
      id: 'st-03',
      name: 'Aditya Gupta',
      maskedEmail: 'ad***@jee.zenith.edu',
      batchName: 'Champions Batch (Class 12)',
      targetExam: 'JEE Main + Adv',
      problemSolvingIndex: 44.0,
      accuracy: 42.1,
      attemptedCount: 86,
      needsAttention: true,
      weakConcept: 'Friction Equilibrium on Inclines',
    },
    {
      id: 'st-04',
      name: 'Meera Nair',
      maskedEmail: 'me***@jee.zenith.edu',
      batchName: 'Droppers Intensive (Target 2025)',
      targetExam: 'JEE Main',
      problemSolvingIndex: 41.5,
      accuracy: 38.5,
      attemptedCount: 65,
      needsAttention: true,
      weakConcept: 'Adiabatic Gas Processes',
    },
    {
      id: 'st-05',
      name: 'Kavya Sengupta',
      maskedEmail: 'ka***@jee.zenith.edu',
      batchName: 'Champions Batch (Class 12)',
      targetExam: 'JEE Advanced',
      problemSolvingIndex: 79.1,
      accuracy: 74.3,
      attemptedCount: 112,
      needsAttention: false,
      weakConcept: 'Work-Energy Integration',
    },
  ],
};

export const SEED_SCHOLARSHIPS: SeedScholarship[] = [
  {
    id: 'sch-apex-merit-01',
    instituteId: 'inst-apex-01',
    instituteName: 'Apex IIT-JEE National Academy',
    title: 'Apex Kota Super-30 Full Tuition Scholarship',
    description:
      'Awarded to the top competitive physics solvers demonstrating high PSI (> 70.0) or top 10% ranking in the All-India Invitational Mock Test.',
    awardDetails: '100% Tuition Waiver + Free Kota Hostel Residence (Value: ₹2,50,000)',
    minPsiScore: 70.0,
    minContestScore: 16.0,
    deadline: '2026-12-15T00:00:00Z',
    status: 'OPEN',
    applicantsCount: 78,
  },
  {
    id: 'sch-zenith-innovator-02',
    instituteId: 'inst-zenith-02',
    instituteName: 'Zenith Scholars Foundation',
    title: 'National Physics Young Innovator Fellowship',
    description:
      'Prestigious research and academic mentorship fellowship for students demonstrating exceptional conceptual intuition in Classical Mechanics & Electromagnetism.',
    awardDetails: '₹50,000 Direct Academic Stipend + 1-on-1 IIT Professor Mentorship',
    minPsiScore: 65.0,
    minContestScore: 12.0,
    deadline: '2026-12-30T00:00:00Z',
    status: 'OPEN',
    applicantsCount: 42,
  },
];
