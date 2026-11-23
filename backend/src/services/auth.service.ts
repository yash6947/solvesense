import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.config.js';
import { memoryStore, UserEntity, StudentProfileEntity } from './store.service.js';
import prisma from '../config/db.js';

export interface RegisterDTO {
  email: string;
  password: string;
  fullName: string;
  targetExam?: 'JEE_MAIN' | 'JEE_ADVANCED' | 'NEET' | 'BOTH_JEE';
  targetYear?: number;
  academicLevel?: string;
  preferredSubjects?: string[];
}

export interface AuthResult {
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
  };
  profile: StudentProfileEntity | null;
  token: string;
}

export class AuthService {
  /**
   * Register a new student
   */
  static async registerStudent(data: RegisterDTO): Promise<AuthResult> {
    const email = data.email.toLowerCase();

    // 1. Check database first if connected
    let prismaAvailable = false;
    try {
      const existingDb = await prisma.user.findUnique({ where: { email } });
      if (existingDb) {
        const error: any = new Error('An account with this email address already exists');
        error.statusCode = 409;
        error.code = 'EMAIL_ALREADY_EXISTS';
        throw error;
      }
      prismaAvailable = true;
    } catch (dbErr: any) {
      if (dbErr.statusCode === 409) throw dbErr;
      prismaAvailable = false;
    }

    // 2. Check memory store if database is offline
    if (!prismaAvailable) {
      const existingMem = memoryStore.findUserByEmail(email);
      if (existingMem) {
        const error: any = new Error('An account with this email address already exists');
        error.statusCode = 409;
        error.code = 'EMAIL_ALREADY_EXISTS';
        throw error;
      }
      console.warn(`[AUTH] Database disconnected. Registering '${email}' in memory store.`);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);
    const userId = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const newUser: UserEntity = {
      id: userId,
      email,
      passwordHash,
      fullName: data.fullName,
      role: 'STUDENT',
      isEmailVerified: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newProfile: StudentProfileEntity = {
      id: `prf-${Date.now()}`,
      userId,
      targetExam: data.targetExam || 'JEE_MAIN',
      targetYear: data.targetYear || 2026,
      academicLevel: data.academicLevel || 'Class 12',
      preferredSubjects: data.preferredSubjects || ['Physics'],
      dailyGoalQuestions: 15,
      currentStreak: 1,
      longestStreak: 1,
      problemSolvingIndex: 0.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Attempt persistent database write
    if (prismaAvailable) {
      try {
        const createdUser = await prisma.user.create({
          data: {
            id: newUser.id,
            email: newUser.email,
            passwordHash: newUser.passwordHash,
            fullName: newUser.fullName,
            role: 'STUDENT',
            studentProfile: {
              create: {
                targetExam: newProfile.targetExam as any,
                targetYear: newProfile.targetYear,
                academicLevel: newProfile.academicLevel,
                preferredSubjects: newProfile.preferredSubjects,
                dailyGoalQuestions: newProfile.dailyGoalQuestions,
                currentStreak: newProfile.currentStreak,
                longestStreak: newProfile.longestStreak,
                problemSolvingIndex: newProfile.problemSolvingIndex,
              },
            },
          },
          include: { studentProfile: true },
        });

        // Cache in memory store
        memoryStore.users.set(createdUser.id, newUser);
        if (createdUser.studentProfile) {
          memoryStore.profiles.set(createdUser.id, newProfile);
        }
      } catch (err) {
        console.error('[AUTH ERROR] Failed to write user to PostgreSQL, falling back to memory store:', err);
        memoryStore.users.set(newUser.id, newUser);
        memoryStore.profiles.set(newProfile.userId, newProfile);
      }
    } else {
      memoryStore.users.set(newUser.id, newUser);
      memoryStore.profiles.set(newProfile.userId, newProfile);
    }

    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
      ENV.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
      },
      profile: newProfile,
      token,
    };
  }

  /**
   * Log in an existing user
   */
  static async login(email: string, password: string): Promise<AuthResult> {
    const cleanEmail = email.toLowerCase();

    // 1. Try finding user in database first
    try {
      const dbUser = await prisma.user.findUnique({
        where: { email: cleanEmail },
        include: { studentProfile: true },
      });

      if (dbUser) {
        const isMatch = await bcrypt.compare(password, dbUser.passwordHash);
        if (!isMatch) {
          const error: any = new Error('Invalid email or password credentials');
          error.statusCode = 401;
          error.code = 'INVALID_CREDENTIALS';
          throw error;
        }

        const token = jwt.sign(
          {
            userId: dbUser.id,
            email: dbUser.email,
            role: dbUser.role,
          },
          ENV.JWT_SECRET,
          { expiresIn: '7d' }
        );

        return {
          user: {
            id: dbUser.id,
            email: dbUser.email,
            fullName: dbUser.fullName,
            role: dbUser.role,
          },
          profile: dbUser.studentProfile as any,
          token,
        };
      }
    } catch (err: any) {
      if (err.statusCode === 401) throw err;
      // Database offline, proceed to memory store check
    }

    // 2. Fallback to memory store
    const user = memoryStore.findUserByEmail(cleanEmail);
    if (!user) {
      const error: any = new Error('Invalid email or password credentials');
      error.statusCode = 401;
      error.code = 'INVALID_CREDENTIALS';
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      const error: any = new Error('Invalid email or password credentials');
      error.statusCode = 401;
      error.code = 'INVALID_CREDENTIALS';
      throw error;
    }

    const profile = memoryStore.findProfileByUserId(user.id) || null;

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      ENV.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      profile,
      token,
    };
  }

  /**
   * Get current authenticated user details
   */
  static async getMe(userId: string) {
    // 1. Try database first
    try {
      const dbUser = await prisma.user.findUnique({
        where: { id: userId },
        include: { studentProfile: true },
      });

      if (dbUser) {
        return {
          user: {
            id: dbUser.id,
            email: dbUser.email,
            fullName: dbUser.fullName,
            role: dbUser.role,
            createdAt: dbUser.createdAt,
          },
          profile: dbUser.studentProfile as any,
        };
      }
    } catch (_) {
      // Database offline, check memory store
    }

    // 2. Fallback to memory store
    const user = memoryStore.findUserById(userId);
    if (!user) {
      const error: any = new Error('User not found');
      error.statusCode = 404;
      error.code = 'USER_NOT_FOUND';
      throw error;
    }

    const profile = memoryStore.findProfileByUserId(userId) || null;

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        createdAt: user.createdAt,
      },
      profile,
    };
  }
}
