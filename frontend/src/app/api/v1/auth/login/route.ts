import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = body.email || 'student@solvesense.dev';
    const fullName = email.split('@')[0] || 'Student Aspirant';

    const user = {
      id: 'usr_' + Date.now(),
      fullName,
      email,
      role: 'STUDENT',
    };

    const profile = {
      id: 'prof_' + Date.now(),
      userId: user.id,
      fullName,
      targetExam: 'JEE_ADVANCED',
      targetYear: 2026,
      academicLevel: 'Class 12',
      preferredSubjects: ['Physics'],
      dailyGoalQuestions: 10,
      currentStreak: 7,
      longestStreak: 14,
      problemSolvingIndex: 78.4,
    };

    const token = 'ss_jwt_' + Buffer.from(JSON.stringify(user)).toString('base64');

    return NextResponse.json({
      success: true,
      data: {
        user,
        profile,
        token,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: { message: err?.message || 'Login failed' },
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    );
  }
}
