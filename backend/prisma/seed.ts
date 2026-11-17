import { PrismaClient, Role, ExamType, QuestionType, Difficulty, QuestionStatus, MistakeType, MasteryLevel, InstituteRole, ContestStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { JEE_PHYSICS_SYLLABUS } from '../src/data/seedData.js';
import { JEE_PHYSICS_QUESTIONS } from '../src/data/questionsData.js';
import { INITIAL_CONTESTS } from '../src/data/contestsData.js';
import { INITIAL_SCHOLARSHIPS } from '../src/data/institutesData.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting ZenithPhysics Master Database Seed...');

  const passwordHash = await bcrypt.hash('Student@123', 10);
  const teacherPasswordHash = await bcrypt.hash('Teacher@123', 10);
  const adminPasswordHash = await bcrypt.hash('Admin@123', 10);

  // 1. Seed Users & Profiles
  console.log('👤 Seeding core platform users...');
  
  // Student Arjun
  const studentUser = await prisma.user.upsert({
    where: { email: 'arjun@jee.zenith.edu' },
    update: {},
    create: {
      email: 'arjun@jee.zenith.edu',
      passwordHash,
      fullName: 'Arjun Sharma',
      role: Role.STUDENT,
      isEmailVerified: true,
      studentProfile: {
        create: {
          targetExam: ExamType.JEE_ADVANCED,
          targetYear: 2026,
          academicLevel: 'Class 12',
          preferredSubjects: ['Physics'],
          dailyGoalQuestions: 15,
          currentStreak: 12,
          longestStreak: 18,
          problemSolvingIndex: 742.0,
        },
      },
    },
  });

  // Teacher Dr. Vikram Malhotra
  const teacherUser = await prisma.user.upsert({
    where: { email: 'teacher@apex.jee.zenith.edu' },
    update: {},
    create: {
      email: 'teacher@apex.jee.zenith.edu',
      passwordHash: teacherPasswordHash,
      fullName: 'Dr. Vikram Malhotra',
      role: Role.TEACHER,
      isEmailVerified: true,
      teacherProfile: {
        create: {
          specialization: 'Rotational Dynamics & Mechanics',
          qualifications: 'Ph.D. IIT Delhi, Ex-HOD Apex Kota (15+ Years Experience)',
          bio: 'Specialist in mentoring Top 100 JEE Advanced aspirants with focus on conceptual rigor and visualization.',
        },
      },
    },
  });

  // Institute Admin Director Ramesh Sharma
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@apex.jee.zenith.edu' },
    update: {},
    create: {
      email: 'admin@apex.jee.zenith.edu',
      passwordHash: adminPasswordHash,
      fullName: 'Director Ramesh Sharma',
      role: Role.INSTITUTE_ADMIN,
      isEmailVerified: true,
    },
  });

  // 2. Seed Coaching Institute
  console.log('🏫 Seeding Apex Institute Kota & memberships...');
  const institute = await prisma.institute.upsert({
    where: { slug: 'apex-kota' },
    update: {},
    create: {
      name: 'Apex Institute of Technology, Kota',
      slug: 'apex-kota',
      code: 'APEX-KOTA-2026',
      logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=128&q=80',
      website: 'https://apex.kota.zenith.edu',
      isVerified: true,
    },
  });

  // Connect Memberships
  await prisma.instituteMembership.upsert({
    where: {
      userId_instituteId: {
        userId: studentUser.id,
        instituteId: institute.id,
      },
    },
    update: {},
    create: {
      userId: studentUser.id,
      instituteId: institute.id,
      roleInInstitute: InstituteRole.STUDENT,
      batchName: 'Rankers Super 30 - 2026',
    },
  });

  await prisma.instituteMembership.upsert({
    where: {
      userId_instituteId: {
        userId: teacherUser.id,
        instituteId: institute.id,
      },
    },
    update: {},
    create: {
      userId: teacherUser.id,
      instituteId: institute.id,
      roleInInstitute: InstituteRole.TEACHER,
      batchName: 'Rankers Super 30 - 2026',
    },
  });

  await prisma.instituteMembership.upsert({
    where: {
      userId_instituteId: {
        userId: adminUser.id,
        instituteId: institute.id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      instituteId: institute.id,
      roleInInstitute: InstituteRole.ADMIN,
    },
  });

  // 3. Seed Examinations and Subject
  console.log('📚 Seeding Examinations & Physics Syllabus...');
  const jeeMain = await prisma.examination.upsert({
    where: { code: 'JEE_MAIN' },
    update: {},
    create: {
      code: 'JEE_MAIN',
      name: 'Joint Entrance Examination - Main',
      description: 'National Testing Agency (NTA) standard entrance examination for NITs, IIITs, and CFTIs.',
    },
  });

  const jeeAdvanced = await prisma.examination.upsert({
    where: { code: 'JEE_ADVANCED' },
    update: {},
    create: {
      code: 'JEE_ADVANCED',
      name: 'Joint Entrance Examination - Advanced',
      description: 'Premier competitive entrance exam conducted by Indian Institutes of Technology (IITs).',
    },
  });

  const physicsSubject = await prisma.subject.upsert({
    where: { slug: 'physics' },
    update: {},
    create: {
      name: 'Physics',
      slug: 'physics',
      displayOrder: 1,
    },
  });

  // Link Examination Syllabus
  await prisma.examinationSyllabus.upsert({
    where: {
      examinationId_subjectId: {
        examinationId: jeeMain.id,
        subjectId: physicsSubject.id,
      },
    },
    update: {},
    create: {
      examinationId: jeeMain.id,
      subjectId: physicsSubject.id,
    },
  });

  await prisma.examinationSyllabus.upsert({
    where: {
      examinationId_subjectId: {
        examinationId: jeeAdvanced.id,
        subjectId: physicsSubject.id,
      },
    },
    update: {},
    create: {
      examinationId: jeeAdvanced.id,
      subjectId: physicsSubject.id,
    },
  });

  // 4. Seed Chapters, Topics, and Concepts
  const topicIdMap: Record<string, string> = {};
  const conceptIdMap: Record<string, string> = {};

  for (const chap of JEE_PHYSICS_SYLLABUS) {
    const chapterRecord = await prisma.chapter.upsert({
      where: {
        subjectId_slug: {
          subjectId: physicsSubject.id,
          slug: chap.slug,
        },
      },
      update: {
        name: chap.name,
        description: chap.description,
        displayOrder: chap.displayOrder,
      },
      create: {
        subjectId: physicsSubject.id,
        name: chap.name,
        slug: chap.slug,
        description: chap.description,
        displayOrder: chap.displayOrder,
      },
    });

    let topOrder = 0;
    for (const top of chap.topics) {
      topOrder++;
      // find or create topic
      let topicRecord = await prisma.topic.findFirst({
        where: {
          chapterId: chapterRecord.id,
          slug: top.slug,
        },
      });

      if (!topicRecord) {
        topicRecord = await prisma.topic.create({
          data: {
            chapterId: chapterRecord.id,
            name: top.name,
            slug: top.slug,
            displayOrder: topOrder,
          },
        });
      }
      topicIdMap[top.slug] = topicRecord.id;

      for (const conc of top.concepts) {
        const conceptRecord = await prisma.concept.upsert({
          where: { code: conc.code },
          update: {
            name: conc.name,
            summary: conc.summary,
            topicId: topicRecord.id,
          },
          create: {
            topicId: topicRecord.id,
            code: conc.code,
            name: conc.name,
            summary: conc.summary,
            importanceWeight: 1.2,
          },
        });
        conceptIdMap[conc.code] = conceptRecord.id;
      }
    }
  }

  // 5. Connect Concept Prerequisites
  console.log('🔗 Connecting concept prerequisite DAG relationships...');
  for (const chap of JEE_PHYSICS_SYLLABUS) {
    for (const top of chap.topics) {
      for (const conc of top.concepts) {
        if (conc.prerequisites && conc.prerequisites.length > 0) {
          const targetConceptId = conceptIdMap[conc.code];
          for (const prereqCode of conc.prerequisites) {
            const prereqConceptId = conceptIdMap[prereqCode];
            if (targetConceptId && prereqConceptId) {
              await prisma.conceptPrerequisite.upsert({
                where: {
                  conceptId_prerequisiteId: {
                    conceptId: targetConceptId,
                    prerequisiteId: prereqConceptId,
                  },
                },
                update: {},
                create: {
                  conceptId: targetConceptId,
                  prerequisiteId: prereqConceptId,
                },
              });
            }
          }
        }
      }
    }
  }

  // 6. Seed All 37 Questions, Options, Solutions, and Hints
  console.log(`📝 Seeding ${JEE_PHYSICS_QUESTIONS.length} Questions with verified solutions & 4-tier hints...`);
  const questionIdMap: Record<string, string> = {};

  for (const q of JEE_PHYSICS_QUESTIONS) {
    const topicId = topicIdMap[q.topicSlug];
    const primaryConceptId = conceptIdMap[q.primaryConceptCode];

    if (!topicId) {
      console.warn(`Warning: Topic ${q.topicSlug} not found for question ${q.code}`);
      continue;
    }

    const questionRecord = await prisma.question.upsert({
      where: { code: q.code },
      update: {
        contentLatex: q.contentLatex,
        difficulty: q.difficulty as Difficulty,
        marks: q.marks,
        negativeMarks: q.negativeMarks,
        timeRecommendationSec: q.timeRecommendationSec,
        isPYQ: q.isPYQ,
        pyqYear: q.pyqYear,
        numericalAnswer: q.numericalAnswer,
        numericalTolerance: q.numericalTolerance,
        unit: q.unit,
        status: QuestionStatus.PUBLISHED,
        primaryConceptId: primaryConceptId || null,
      },
      create: {
        code: q.code,
        topicId,
        primaryConceptId: primaryConceptId || null,
        examType: q.examType as ExamType,
        questionType: q.questionType as QuestionType,
        difficulty: q.difficulty as Difficulty,
        contentLatex: q.contentLatex,
        imageUrl: q.imageUrl,
        marks: q.marks,
        negativeMarks: q.negativeMarks,
        timeRecommendationSec: q.timeRecommendationSec,
        isPYQ: q.isPYQ,
        pyqYear: q.pyqYear,
        numericalAnswer: q.numericalAnswer,
        numericalTolerance: q.numericalTolerance,
        unit: q.unit,
        status: QuestionStatus.PUBLISHED,
        createdById: teacherUser.id,
      },
    });

    questionIdMap[q.id] = questionRecord.id;
    questionIdMap[q.code] = questionRecord.id;

    // Seed Options if present
    if (q.options && q.options.length > 0) {
      for (const opt of q.options) {
        await prisma.questionOption.upsert({
          where: {
            questionId_optionKey: {
              questionId: questionRecord.id,
              optionKey: opt.optionKey,
            },
          },
          update: {
            contentLatex: opt.contentLatex,
            isCorrect: opt.isCorrect,
          },
          create: {
            questionId: questionRecord.id,
            optionKey: opt.optionKey,
            contentLatex: opt.contentLatex,
            isCorrect: opt.isCorrect,
          },
        });
      }
    }

    // Seed Solution
    if (q.solution) {
      await prisma.questionSolution.upsert({
        where: { questionId: questionRecord.id },
        update: {
          solutionTextLatex: q.solution.solutionTextLatex,
          keyFormulas: q.solution.keyFormulas || [],
          commonPitfalls: q.solution.commonPitfalls || null,
          verifiedById: teacherUser.id,
        },
        create: {
          questionId: questionRecord.id,
          solutionTextLatex: q.solution.solutionTextLatex,
          keyFormulas: q.solution.keyFormulas || [],
          commonPitfalls: q.solution.commonPitfalls || null,
          verifiedById: teacherUser.id,
        },
      });
    }

    // Seed Hints
    if (q.hints && q.hints.length > 0) {
      for (const hint of q.hints) {
        await prisma.questionHint.upsert({
          where: {
            questionId_level: {
              questionId: questionRecord.id,
              level: hint.level,
            },
          },
          update: {
            hintTextLatex: hint.hintTextLatex,
          },
          create: {
            questionId: questionRecord.id,
            level: hint.level,
            hintTextLatex: hint.hintTextLatex,
            penaltyFraction: hint.level * 0.1,
          },
        });
      }
    }
  }

  // 7. Seed Contests and Contest Questions
  console.log('🏆 Seeding competitive contests...');
  for (const c of INITIAL_CONTESTS) {
    const contestRecord = await prisma.contest.upsert({
      where: { slug: c.slug },
      update: {
        title: c.title,
        description: c.description,
        totalMarks: c.totalMarks,
        durationMinutes: c.durationMinutes,
        status: (c.status || 'PUBLISHED') as ContestStatus,
        instituteId: institute.id,
      },
      create: {
        title: c.title,
        slug: c.slug,
        description: c.description,
        examType: c.examType as ExamType,
        startTime: new Date(c.startTime),
        endTime: new Date(c.endTime),
        durationMinutes: c.durationMinutes,
        totalMarks: c.totalMarks,
        status: (c.status || 'PUBLISHED') as ContestStatus,
        instituteId: institute.id,
      },
    });

    // Link contest questions
    let orderIndex = 0;
    for (const qid of c.questionIds) {
      orderIndex++;
      const dbQuestionId = questionIdMap[qid];
      if (dbQuestionId) {
        await prisma.contestQuestion.upsert({
          where: {
            contestId_questionId: {
              contestId: contestRecord.id,
              questionId: dbQuestionId,
            },
          },
          update: {
            orderIndex,
          },
          create: {
            contestId: contestRecord.id,
            questionId: dbQuestionId,
            sectionName: 'Physics',
            orderIndex,
          },
        });
      }
    }
  }

  // 8. Seed Scholarships
  console.log('🎓 Seeding talent discovery scholarships...');
  for (const s of INITIAL_SCHOLARSHIPS) {
    await prisma.scholarship.upsert({
      where: { id: s.id },
      update: {
        title: s.title,
        description: s.description,
        amountValue: s.amountValue,
        minPsiRequired: s.minPsiRequired,
        deadline: new Date(s.deadline),
      },
      create: {
        id: s.id,
        instituteId: institute.id,
        title: s.title,
        description: s.description,
        amountValue: s.amountValue,
        minPsiRequired: s.minPsiRequired,
        deadline: new Date(s.deadline),
        eligibilityRules: {
          minAccuracy: 75.0,
          preferredExam: 'JEE_ADVANCED',
        },
      },
    });
  }

  // 9. Seed Student Attempts for Arjun
  console.log('📊 Seeding initial historical telemetry and attempts for Arjun...');
  const firstQ = JEE_PHYSICS_QUESTIONS[0];
  const secondQ = JEE_PHYSICS_QUESTIONS[1];
  const thirdQ = JEE_PHYSICS_QUESTIONS[2];

  if (firstQ && questionIdMap[firstQ.id]) {
    await prisma.questionAttempt.create({
      data: {
        userId: studentUser.id,
        questionId: questionIdMap[firstQ.id],
        isCorrect: true,
        marksEarned: 4.0,
        timeSpentSeconds: 165,
        submittedAnswer: { selectedOption: 'B' },
        hintsRequested: 1,
        diagnosedMistake: MistakeType.NONE,
        aiMentorFeedback: 'Masterful torque analysis about the instantaneous contact point! Clean execution.',
      },
    });

    // Bookmark first question
    await prisma.bookmark.upsert({
      where: {
        userId_questionId: {
          userId: studentUser.id,
          questionId: questionIdMap[firstQ.id],
        },
      },
      update: {},
      create: {
        userId: studentUser.id,
        questionId: questionIdMap[firstQ.id],
        notes: 'Review torque about instantaneous center vs center of mass.',
      },
    });
  }

  if (secondQ && questionIdMap[secondQ.id]) {
    await prisma.questionAttempt.create({
      data: {
        userId: studentUser.id,
        questionId: questionIdMap[secondQ.id],
        isCorrect: false,
        marksEarned: -1.0,
        timeSpentSeconds: 210,
        submittedAnswer: { selectedOption: 'B' },
        hintsRequested: 2,
        diagnosedMistake: MistakeType.PREREQUISITE_GAP,
        aiMentorFeedback: 'You attempted to conserve linear momentum, but the hinge applies an external impulsive reaction force during impact.',
      },
    });
  }

  console.log('✅ ZenithPhysics Master Database Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
