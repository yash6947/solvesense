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
    const existing = memoryStore.findUserByEmail(data.email);
    if (existing) {
      const error: any = new Error('An account with this email address already exists');
      error.statusCode = 409;
      error.code = 'EMAIL_ALREADY_EXISTS';
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);
    const userId = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const newUser: UserEntity = {
      id: userId,
      email: data.email.toLowerCase(),
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
      currentStreak: 1, // First day practice streak initialized
      longestStreak: 1,
      problemSolvingIndex: 0.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to memory store
    memoryStore.users.set(newUser.id, newUser);
    memoryStore.profiles.set(newProfile.userId, newProfile);

    // Also attempt PostgreSQL save if connected
    try {
      await prisma.user.create({
        data: {
          id: newUser.id,
          email: newUser.email,
          passwordHash: newUser.passwordHash,
          fullName: newUser.fullName,
          role: 'STUDENT',
          studentProfile: {
            create: {
              targetExam: newProfile.targetExam,
              targetYear: newProfile.targetYear,
              academicLevel: newProfile.academicLevel,
              preferredSubjects: newProfile.preferredSubjects,
            },
          },
        },
      });
    } catch (e) {
      // Prisma offline, memory fallback active
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
    const user = memoryStore.findUserByEmail(email);
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
