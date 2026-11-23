import { NextResponse } from 'next/server';

export async function GET() {
  const user = {
    id: 'u-1',
    fullName: 'Yash Sharma',
    email: 'yash@solvesense.dev',
    role: 'STUDENT',
  };

  const profile = {
    id: 'prof-1',
    userId: 'u-1',
    fullName: 'Yash Sharma',
    targetExam: 'JEE_ADVANCED',
    targetYear: 2026,
    academicLevel: 'Class 12',
    preferredSubjects: ['Physics'],
    dailyGoalQuestions: 10,
    currentStreak: 7,
    longestStreak: 14,
    problemSolvingIndex: 78.4,
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
