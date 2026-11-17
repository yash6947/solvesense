import { JEE_PHYSICS_QUESTIONS } from './questionsData.js';

export interface SeedContest {
  id: string;
  slug: string;
  title: string;
  description: string;
  examType: 'JEE_MAIN' | 'JEE_ADVANCED';
  durationMinutes: number;
  totalMarks: number;
  questionIds: string[];
  status: 'ACTIVE' | 'UPCOMING' | 'COMPLETED';
  startTime: string;
  endTime: string;
  participantsCount: number;
}

export interface ContestLeaderboardUser {
  rank: number;
  studentName: string;
  maskedEmail: string;
  targetExam: string;
  score: number;
  totalTimeSeconds: number;
  solvedCount: number;
  submittedAt: string;
}

export const SEED_CONTESTS: SeedContest[] = [
  {
    id: 'cnt-adv-mock-01',
    slug: 'jee-adv-physics-invitational',
    title: 'All-India JEE Advanced Physics Invitational Mock',
    description:
      'National proctored mock test covering advanced Rotational Dynamics, Non-Inertial Mechanics, and Variable Field Thermodynamics. Calibrated to JEE Advanced marking rules (+4 / -1 / -2).',
    examType: 'JEE_ADVANCED',
    durationMinutes: 60,
    totalMarks: 24,
    questionIds: ['q-rot-01', 'q-kin-01', 'q-nlm-01', 'q-wep-01', 'q-thm-01', 'q-elc-01'],
    status: 'ACTIVE',
    startTime: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
    endTime: new Date(Date.now() + 3600 * 1000 * 36).toISOString(),
    participantsCount: 418,
  },
  {
    id: 'cnt-daily-rot-02',
    slug: 'daily-physics-sprint-rotational',
    title: 'Daily Physics Sprint: Coupled Rotational Mechanics',
    description:
      'Timed 30-minute challenge testing rolling without slipping, angular momentum conservation, and instantaneous center of rotation.',
    examType: 'JEE_ADVANCED',
    durationMinutes: 30,
    totalMarks: 12,
    questionIds: ['q-rot-01', 'q-nlm-01', 'q-wep-01'],
    status: 'ACTIVE',
    startTime: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    endTime: new Date(Date.now() + 3600 * 1000 * 20).toISOString(),
    participantsCount: 235,
  },
  {
    id: 'cnt-weekly-mech-03',
    slug: 'national-open-classical-mechanics',
    title: 'National Open Cup: Classical Mechanics & Work-Energy',
    description:
      'Comprehensive championship contest organized across all coaching partner institutes. Top 10 performers receive scholarship commendations.',
    examType: 'JEE_MAIN',
    durationMinutes: 90,
    totalMarks: 36,
    questionIds: ['q-kin-01', 'q-nlm-01', 'q-wep-01', 'q-thm-01'],
    status: 'UPCOMING',
    startTime: new Date(Date.now() + 3600 * 1000 * 24).toISOString(),
    endTime: new Date(Date.now() + 3600 * 1000 * 72).toISOString(),
    participantsCount: 890,
  },
];

export const SEED_LEADERBOARDS: { [contestId: string]: ContestLeaderboardUser[] } = {
  'cnt-adv-mock-01': [
    {
      rank: 1,
      studentName: 'Rohan Deshmukh',
      maskedEmail: 'ro***@jee.zenith.edu',
      targetExam: 'JEE Advanced',
      score: 24,
      totalTimeSeconds: 1420, // 23m 40s
      solvedCount: 6,
      submittedAt: new Date(Date.now() - 3600 * 1000 * 8).toISOString(),
    },
    {
      rank: 2,
      studentName: 'Ananya Singhal',
      maskedEmail: 'an***@jee.zenith.edu',
      targetExam: 'JEE Advanced',
      score: 20,
      totalTimeSeconds: 1650, // 27m 30s
      solvedCount: 5,
      submittedAt: new Date(Date.now() - 3600 * 1000 * 6).toISOString(),
    },
    {
      rank: 3,
      studentName: 'Arjun Sharma',
      maskedEmail: 'ar***@jee.zenith.edu',
      targetExam: 'JEE Advanced',
      score: 19,
      totalTimeSeconds: 1810, // 30m 10s
      solvedCount: 5,
      submittedAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
    },
    {
      rank: 4,
      studentName: 'Tanvi Iyer',
      maskedEmail: 'ta***@jee.zenith.edu',
      targetExam: 'JEE Advanced',
      score: 16,
      totalTimeSeconds: 1980,
      solvedCount: 4,
      submittedAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    },
    {
      rank: 5,
      studentName: 'Devansh Kulkarni',
      maskedEmail: 'de***@jee.zenith.edu',
      targetExam: 'JEE Main',
      score: 12,
      totalTimeSeconds: 2150,
      solvedCount: 3,
      submittedAt: new Date(Date.now() - 3600 * 1000 * 3).toISOString(),
    },
    {
      rank: 6,
      studentName: 'Siddharth Nair',
      maskedEmail: 'si***@jee.zenith.edu',
      targetExam: 'JEE Advanced',
      score: 8,
      totalTimeSeconds: 2300,
      solvedCount: 2,
      submittedAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    },
  ],
};
