import bcrypt from 'bcryptjs';
import { JEE_PHYSICS_SYLLABUS } from '../data/seedData.js';

export interface UserEntity {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  role: 'STUDENT' | 'TEACHER' | 'INSTITUTE_ADMIN' | 'PLATFORM_ADMIN';
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentProfileEntity {
  id: string;
  userId: string;
  targetExam: 'JEE_MAIN' | 'JEE_ADVANCED' | 'NEET' | 'BOTH_JEE';
  targetYear: number;
  academicLevel: string;
  preferredSubjects: string[];
  dailyGoalQuestions: number;
  currentStreak: number;
  longestStreak: number;
  problemSolvingIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionAttemptEntity {
  id: string;
  userId: string;
  questionId: string;
  isCorrect: boolean;
  marksEarned: number;
  timeSpentSeconds: number;
  submittedAnswer: any;
  hintsRequested: number;
  diagnosedMistake: string;
  aiMentorFeedback?: string;
  createdAt: Date;
}

class MemoryStore {
  public users: Map<string, UserEntity> = new Map();
  public profiles: Map<string, StudentProfileEntity> = new Map();
  public attempts: Map<string, QuestionAttemptEntity> = new Map();

  constructor() {
    this.seedInitialUser();
  }

  private seedInitialUser() {
    const demoStudentId = 'demo-student-uuid-001';
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync('Student@123', salt);

    const demoUser: UserEntity = {
      id: demoStudentId,
      email: 'arjun@jee.zenith.edu',
      passwordHash,
      fullName: 'Arjun Sharma',
      role: 'STUDENT',
      isEmailVerified: true,
      isActive: true,
      createdAt: new Date('2026-11-01T00:00:00Z'),
      updatedAt: new Date(),
    };

    const demoProfile: StudentProfileEntity = {
      id: 'demo-profile-uuid-001',
      userId: demoStudentId,
      targetExam: 'JEE_ADVANCED',
      targetYear: 2026,
      academicLevel: 'Class 12',
      preferredSubjects: ['Physics', 'Mathematics'],
      dailyGoalQuestions: 15,
      currentStreak: 5,
      longestStreak: 12,
      problemSolvingIndex: 74.5,
      createdAt: new Date('2026-11-01T00:00:00Z'),
      updatedAt: new Date(),
    };

    this.users.set(demoUser.id, demoUser);
    this.profiles.set(demoProfile.userId, demoProfile);

    // Seed realistic sample student attempts for dashboard analytics
    const sampleAttempts: QuestionAttemptEntity[] = [
      {
        id: 'att-1',
        userId: demoStudentId,
        questionId: 'PHY-ADV-24-ROT-01',
        isCorrect: true,
        marksEarned: 4.0,
        timeSpentSeconds: 165,
        submittedAnswer: ['B'],
        hintsRequested: 1,
        diagnosedMistake: 'NONE',
        createdAt: new Date(Date.now() - 3600 * 1000 * 2), // 2 hours ago
      },
      {
        id: 'att-2',
        userId: demoStudentId,
        questionId: 'PHY-ADV-24-KIN-02',
        isCorrect: true,
        marksEarned: 4.0,
        timeSpentSeconds: 140,
        submittedAnswer: 12.5,
        hintsRequested: 0,
        diagnosedMistake: 'NONE',
        createdAt: new Date(Date.now() - 3600 * 1000 * 5), // 5 hours ago
      },
      {
        id: 'att-3',
        userId: demoStudentId,
        questionId: 'PHY-ADV-24-ROT-03',
        isCorrect: false,
        marksEarned: -1.0,
        timeSpentSeconds: 220,
        submittedAnswer: ['A'],
        hintsRequested: 2,
        diagnosedMistake: 'SIGN_CONVENTION',
        aiMentorFeedback: 'Mistake in torque cross product sign convention during angular acceleration integration.',
        createdAt: new Date(Date.now() - 3600 * 1000 * 24), // 1 day ago
      },
      {
        id: 'att-4',
        userId: demoStudentId,
        questionId: 'PHY-ADV-24-NLM-01',
        isCorrect: true,
        marksEarned: 4.0,
        timeSpentSeconds: 180,
        submittedAnswer: ['C'],
        hintsRequested: 0,
        diagnosedMistake: 'NONE',
        createdAt: new Date(Date.now() - 3600 * 1000 * 48), // 2 days ago
      },
      {
        id: 'att-5',
        userId: demoStudentId,
        questionId: 'PHY-ADV-24-NLM-02',
        isCorrect: false,
        marksEarned: -1.0,
        timeSpentSeconds: 260,
        submittedAnswer: 3.5,
        hintsRequested: 3,
        diagnosedMistake: 'CONCEPTUAL',
        aiMentorFeedback: 'Assumed static friction reached maximum threshold when block was still stationary.',
        createdAt: new Date(Date.now() - 3600 * 1000 * 72), // 3 days ago
      },
    ];

    for (const att of sampleAttempts) {
      this.attempts.set(att.id, att);
    }
  }

  public findUserByEmail(email: string): UserEntity | undefined {
    return Array.from(this.users.values()).find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
  }

  public findUserById(id: string): UserEntity | undefined {
    return this.users.get(id);
  }

  public findProfileByUserId(userId: string): StudentProfileEntity | undefined {
    return this.profiles.get(userId);
  }

  public getAttemptsByUserId(userId: string): QuestionAttemptEntity[] {
    return Array.from(this.attempts.values())
      .filter((a) => a.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export const memoryStore = new MemoryStore();
