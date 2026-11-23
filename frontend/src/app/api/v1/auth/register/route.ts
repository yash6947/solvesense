import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const fullName = body.fullName || 'Student Aspirant';
    const email = body.email || 'student@solvesense.dev';

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
      targetExam: body.targetExam || 'JEE_ADVANCED',
      targetYear: body.targetYear ? Number(body.targetYear) : 2026,
      academicLevel: body.academicLevel || 'Class 12',
      preferredSubjects: body.preferredSubjects || ['Physics'],
      dailyGoalQuestions: 10,
      currentStreak: 1,
      longestStreak: 1,
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
        error: { message: err?.message || 'Registration failed' },
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    );
  }
}
