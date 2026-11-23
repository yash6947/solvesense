import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  let user = {
    id: 'u-1',
    fullName: 'Student Aspirant',
    email: 'student@solvesense.dev',
    role: 'STUDENT',
  };

  try {
    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const rawToken = authHeader.substring(7);
      if (rawToken.startsWith('ss_jwt_')) {
        const payloadStr = Buffer.from(rawToken.replace('ss_jwt_', ''), 'base64').toString('utf-8');
        const parsed = JSON.parse(payloadStr);
        if (parsed?.fullName) {
          user = {
            id: parsed.id || 'u-1',
            fullName: parsed.fullName,
            email: parsed.email || 'student@solvesense.dev',
            role: parsed.role || 'STUDENT',
          };
        }
      } else if (rawToken.startsWith('mock_jwt_token_')) {
        const payloadStr = decodeURIComponent(Buffer.from(rawToken.replace('mock_jwt_token_', ''), 'base64').toString('utf-8'));
        const parsed = JSON.parse(payloadStr);
        if (parsed?.fullName) {
          user = {
            id: parsed.id || 'u-1',
            fullName: parsed.fullName,
            email: parsed.email || 'student@solvesense.dev',
            role: parsed.role || 'STUDENT',
          };
        }
      }
    }
  } catch (_) {}

  const profile = {
    id: 'prof-1',
    userId: user.id,
    fullName: user.fullName,
    targetExam: 'JEE_ADVANCED',
    targetYear: 2026,
    academicLevel: 'Class 12',
    preferredSubjects: ['Physics'],
    dailyGoalQuestions: 10,
    currentStreak: 1,
    longestStreak: 1,
    problemSolvingIndex: 0.0,
  };

  return NextResponse.json({
    success: true,
    data: {
      user,
      profile,
    },
    timestamp: new Date().toISOString(),
  });
}
