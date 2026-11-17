// Comprehensive End-to-End Verification Test Suite
import { QuestionService } from './dist/services/question.service.js';
import { ConceptGraphService } from './dist/services/conceptGraph.service.js';
import { AnalyticsService } from './dist/services/analytics.service.js';
import { AdaptiveRecommenderService } from './dist/services/adaptiveRecommender.service.js';
import { ContestService } from './dist/services/contest.service.js';
import { InstituteService } from './dist/services/institute.service.js';
import { AiService } from './dist/services/ai/ai.service.js';
import { memoryStore } from './dist/services/store.service.js';
import { JEE_PHYSICS_QUESTIONS } from './dist/data/questionsData.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

async function runE2ETests() {
  console.log('🧪 Starting ZenithPhysics Master End-to-End Integration Tests...\n');

  const testUserId = 'user-student-arjun';

  // 1. Question Bank Integrity
  console.log('1. Question Bank & Curriculum Verification:');
  assert(JEE_PHYSICS_QUESTIONS.length >= 30, `Questions bank size >= 30 (Found: ${JEE_PHYSICS_QUESTIONS.length})`);
  
  const chapters = new Set(JEE_PHYSICS_QUESTIONS.map(q => q.chapterSlug));
  assert(chapters.size >= 6, `Spans across at least 6 core Physics chapters (Found: ${chapters.size} chapters: ${Array.from(chapters).join(', ')})`);
  
  const types = new Set(JEE_PHYSICS_QUESTIONS.map(q => q.questionType));
  assert(types.has('SINGLE_CORRECT') && types.has('MULTIPLE_CORRECT') && types.has('NUMERICAL'), 'Covers SINGLE_CORRECT, MULTIPLE_CORRECT, and NUMERICAL questions');

  // 2. Evaluation Engine: Single Correct
  console.log('\n2. Deterministic Evaluation Engine:');
  const rot1 = 'q-rot-01'; // answer: B, marks: 4, neg: 1
  const correctEval = QuestionService.evaluateSubmission(rot1, testUserId, {
    submittedAnswer: 'B',
    timeSpentSeconds: 120,
  });
  assert(correctEval.isCorrect === true && correctEval.marksEarned === 4, 'Single-correct exact match earns +4 marks');

  const wrongEval = QuestionService.evaluateSubmission(rot1, testUserId, {
    submittedAnswer: 'A',
    timeSpentSeconds: 150,
  });
  assert(wrongEval.isCorrect === false && wrongEval.marksEarned === -1, 'Single-correct wrong answer earns -1 negative mark');

  // 3. Evaluation Engine: Numerical Tolerance
  const kin1 = 'q-kin-01'; // answer: 2.0, tolerance: 0.05
  const numExact = QuestionService.evaluateSubmission(kin1, testUserId, {
    submittedAnswer: 2.0,
    timeSpentSeconds: 100,
  });
  assert(numExact.isCorrect === true, 'Numerical exact answer evaluated correctly');

  const numWithinTol = QuestionService.evaluateSubmission(kin1, testUserId, {
    submittedAnswer: 2.03,
    timeSpentSeconds: 110,
  });
  assert(numWithinTol.isCorrect === true, 'Numerical answer within ±0.05 tolerance evaluated correctly');

  const numOutsideTol = QuestionService.evaluateSubmission(kin1, testUserId, {
    submittedAnswer: 2.2,
    timeSpentSeconds: 115,
  });
  assert(numOutsideTol.isCorrect === false, 'Numerical answer outside tolerance flagged incorrect');

  // 4. Evaluation Engine: JEE Advanced Multiple Correct Partial Marking
  const rot6 = 'q-rot-06'; // correct: A, B, C, D
  const multiFull = QuestionService.evaluateSubmission(rot6, testUserId, {
    submittedAnswer: ['A', 'B', 'C', 'D'],
    timeSpentSeconds: 220,
  });
  assert(multiFull.isCorrect === true && multiFull.marksEarned === 4, 'Multiple-correct all 4 correct options earn full +4 marks');

  const multiPartial = QuestionService.evaluateSubmission(rot6, testUserId, {
    submittedAnswer: ['A', 'B'],
    timeSpentSeconds: 180,
  });
  assert(multiPartial.marksEarned === 2 && multiPartial.diagnosedMistake === 'INCOMPLETE_SOLUTION', 'Multiple-correct partial selection (2 of 4) correctly earns +2 marks under JEE Advanced rules');

  const multiWrong = QuestionService.evaluateSubmission(rot6, testUserId, {
    submittedAnswer: ['A', 'B', 'E'],
    timeSpentSeconds: 160,
  });
  assert(multiWrong.isCorrect === false && multiWrong.marksEarned === -2, 'Multiple-correct with incorrect option earns -2 penalty');

  // 5. Anti-Cheating Sanitization
  console.log('\n3. Question Sanitization (Anti-Cheating):');
  const sanitized = QuestionService.getQuestionById('q-rot-01');
  assert(sanitized.solution === undefined, 'Verified solution stripped from student question view');
  if (sanitized.options) {
    const hasIsCorrect = sanitized.options.some(o => 'isCorrect' in o);
    assert(!hasIsCorrect, 'isCorrect field stripped from all options');
  }

  // 6. AI Mentor Progressive Hints & Fallback
  console.log('\n4. AI Mentor System:');
  const hint1 = AiService.getProgressiveHint('q-rot-01', 1, 'COLLABORATIVE');
  assert(hint1.level === 1 && hint1.hintTextLatex.length > 10, 'Level 1 Intuitive hint delivered with LaTeX equations');
  
  const hint4 = AiService.getProgressiveHint('q-rot-01', 4, 'COLLABORATIVE');
  assert(hint4.level === 4 && hint4.hintTextLatex.length > 20, 'Level 4 Full method hint delivered');

  const doubtResp = await AiService.chat({
    questionId: 'q-rot-01',
    studentMessage: 'Why does friction not produce torque about the contact point?',
    mentorMode: 'COLLABORATIVE',
  });
  assert(doubtResp.replyLatex && doubtResp.replyLatex.length > 15, 'AI Mentor doubt response generated successfully');

  // 7. Concept Graph & Prerequisite Gap Diagnosis
  console.log('\n5. Concept Dependency Graph & Analytics:');
  const student = Array.from(memoryStore.users.values()).find(u => u.email === 'arjun@jee.zenith.edu');
  assert(student !== undefined, 'Demonstration student Arjun loaded in memory store');

  const gaps = ConceptGraphService.diagnoseLearningGaps(student.id);
  assert(Array.isArray(gaps), 'Concept graph gap diagnostics returned array');
  const prereqGap = gaps.find(g => g.isPrerequisiteGap);
  assert(prereqGap !== undefined, `Identified root-cause prerequisite learning gap: ${prereqGap?.conceptName} -> ${prereqGap?.rootCausePrerequisite?.name}`);

  // 8. Problem-Solving Index (PSI) Calculation
  const overview = AnalyticsService.getStudentOverview(student.id);
  assert(overview.psi.overallPsi >= 0 && overview.psi.overallPsi <= 100, `Problem-Solving Index calculated: ${overview.psi.overallPsi}/100`);
  assert(overview.difficultyBreakdown.length > 0, 'Difficulty breakdown calculated');

  // 9. Adaptive Recommendations
  console.log('\n6. Adaptive Recommendations Engine:');
  const recResult = AdaptiveRecommenderService.getRecommendations(student.id, 3);
  assert(recResult.recommendations.length > 0, `Generated ${recResult.recommendations.length} personalized adaptive recommendations`);
  assert(recResult.recommendations[0].reason.length > 0, 'Recommendation contains personalized diagnostic rationale');

  // 10. Contests & Leaderboards
  console.log('\n7. Competitive Contests & Leaderboards:');
  const contests = ContestService.getContests();
  assert(contests.length >= 2, `Active contests found: ${contests.length}`);
  
  const leaderboard = ContestService.getLeaderboard(contests[0].id);
  assert(leaderboard !== null && leaderboard.leaderboard.length > 0, `Real-time leaderboard populated with ${leaderboard.leaderboard.length} participants`);

  // 11. Institute Portal & Scholarships
  console.log('\n8. Institute Ecosystem & Scholarships:');
  const instData = InstituteService.getInstituteDashboard('inst-apex-01');
  assert(instData !== null && instData.studentRoster.length > 0, `Institute roster loaded with ${instData.studentRoster.length} students`);
  assert(instData.studentsRequiringAttention.length > 0, `Teacher intervention alert identified at-risk students: ${instData.studentsRequiringAttention.map(s => s.name).join(', ')}`);

  const scholarships = InstituteService.getScholarships();
  assert(scholarships.length >= 2, `Found ${scholarships.length} active scholarship talent discovery programs`);

  // Summary
  console.log('\n==================================================');
  console.log(`🏁 All tests completed: ${passed} PASSED, ${failed} FAILED`);
  console.log('==================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runE2ETests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
