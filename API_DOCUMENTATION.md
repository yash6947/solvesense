# REST API Documentation
## AI-Powered Competitive Exam Problem-Solving Platform

**Base URL:** `/api/v1`  
**Protocol:** HTTPS  
**Content-Type:** `application/json`  
**Authentication Scheme:** Bearer JWT Token in `Authorization: Bearer <token>` header  
**Standard Response Envelope:**
```json
{
  "success": true,
  "data": {},
  "error": null,
  "timestamp": "2026-11-18T00:00:00.000Z"
}
```

---

## 1. Authentication & Profile (`/api/v1/auth`, `/api/v1/students`)

### 1.1 Register Student
- **Endpoint:** `POST /api/v1/auth/register`
- **Access:** Public
- **Request Body:**
```json
{
  "email": "student@example.com",
  "password": "SecurePassword123!",
  "fullName": "Arjun Sharma",
  "targetExam": "JEE_MAIN",
  "targetYear": 2026,
  "academicLevel": "Class 12",
  "preferredSubjects": ["Physics", "Mathematics"]
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "c1f7b0a8-...",
      "email": "student@example.com",
      "fullName": "Arjun Sharma",
      "role": "STUDENT"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 1.2 User Login
- **Endpoint:** `POST /api/v1/auth/login`
- **Access:** Public
- **Request Body:**
```json
{
  "email": "student@example.com",
  "password": "SecurePassword123!"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "c1f7b0a8-...",
      "email": "student@example.com",
      "fullName": "Arjun Sharma",
      "role": "STUDENT"
    },
    "profile": {
      "targetExam": "JEE_MAIN",
      "targetYear": 2026,
      "academicLevel": "Class 12",
      "currentStreak": 7,
      "problemSolvingIndex": 68.40
    },
    "token": "eyJhbGci..."
  }
}
```

### 1.3 Current User Profile
- **Endpoint:** `GET /api/v1/students/me`
- **Access:** Authenticated (Student)
- **Response (200 OK):** Returns student profile, active streaks, goals, and target metrics.

---

## 2. Examinations & Syllabus (`/api/v1/exams`, `/api/v1/syllabus`)

### 2.1 List Examinations
- **Endpoint:** `GET /api/v1/exams`
- **Access:** Public / Authenticated
- **Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "e1-...",
      "code": "JEE_MAIN",
      "name": "JEE Main",
      "description": "National Testing Agency Joint Entrance Examination Main"
    },
    {
      "id": "e2-...",
      "code": "JEE_ADVANCED",
      "name": "JEE Advanced",
      "description": "IIT Joint Entrance Examination Advanced"
    }
  ]
}
```

### 2.2 Get Subject Chapters & Topics
- **Endpoint:** `GET /api/v1/syllabus/subjects/:subjectSlug/chapters`
- **Access:** Public / Authenticated
- **Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "chap-1",
      "name": "Kinematics",
      "slug": "kinematics",
      "topicsCount": 6,
      "questionCount": 85,
      "topics": [
        {
          "id": "top-1",
          "name": "Rectilinear Motion with Variable Acceleration",
          "slug": "rectilinear-variable-accel"
        },
        {
          "id": "top-2",
          "name": "Projectile Motion on Inclined Plane",
          "slug": "projectile-inclined-plane"
        }
      ]
    }
  ]
}
```

---

## 3. Question Bank & Question Workspace (`/api/v1/questions`)

### 3.1 Browse & Filter Questions
- **Endpoint:** `GET /api/v1/questions`
- **Access:** Authenticated
- **Query Parameters:**
  - `subject`: `physics`
  - `chapterId`: UUID (optional)
  - `topicId`: UUID (optional)
  - `difficulty`: `EASY` | `MEDIUM` | `HARD` | `ADVANCED` (optional)
  - `questionType`: `SINGLE_CORRECT` | `MULTIPLE_CORRECT` | `NUMERICAL` (optional)
  - `isPYQ`: `true` | `false` (optional)
  - `status`: `unattempted` | `incorrect` | `solved` (optional)
  - `page`: integer (default `1`)
  - `limit`: integer (default `20`)
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "id": "q-101",
        "code": "PHY-ADV-24-01",
        "examType": "JEE_ADVANCED",
        "difficulty": "HARD",
        "questionType": "NUMERICAL",
        "marks": 4.0,
        "negativeMarks": 0.0,
        "timeRecommendationSec": 240,
        "contentLatex": "A particle of mass $m$ moves along the $x$-axis under a conservative force...",
        "imageUrl": null,
        "topic": {
          "name": "Work Energy Theorem",
          "chapter": { "name": "Work, Energy and Power" }
        },
        "isAttempted": false
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalRecords": 94
    }
  }
}
```

### 3.2 Get Question Details (Solving Mode)
- **Endpoint:** `GET /api/v1/questions/:id`
- **Access:** Authenticated
- **Security Rule:** Correct answer, SME verified solutions, and hint contents are NOT returned in this call to prevent cheating.
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "q-101",
    "code": "PHY-ADV-24-01",
    "difficulty": "HARD",
    "questionType": "SINGLE_CORRECT",
    "contentLatex": "Consider a block on a rough incline...",
    "imageUrl": null,
    "marks": 4.0,
    "negativeMarks": 1.0,
    "timeRecommendationSec": 180,
    "options": [
      { "id": "opt-1", "optionKey": "A", "contentLatex": "$\\frac{g}{2}(\\sin\\theta - \\mu\\cos\\theta)$" },
      { "id": "opt-2", "optionKey": "B", "contentLatex": "$g(\\sin\\theta - \\mu\\cos\\theta)$" },
      { "id": "opt-3", "optionKey": "C", "contentLatex": "$2g(\\sin\\theta + \\mu\\cos\\theta)$" },
      { "id": "opt-4", "optionKey": "D", "contentLatex": "Zero" }
    ],
    "availableHintsCount": 4,
    "unlockedHintsCount": 0
  }
}
```

---

## 4. Evaluation Engine (`/api/v1/questions/:id/attempts`)

### 4.1 Submit Question Answer
- **Endpoint:** `POST /api/v1/questions/:id/attempts`
- **Access:** Authenticated (Student)
- **Request Body (MCQ):**
```json
{
  "submittedAnswer": ["B"],
  "timeSpentSeconds": 142,
  "hintsRequested": 1
}
```
- **Request Body (Numerical):**
```json
{
  "submittedAnswer": 14.52,
  "timeSpentSeconds": 210,
  "hintsRequested": 0
}
```
- **Backend Evaluation Process:**
  1. Validates numerical tolerance $\Delta = |v_{\text{submitted}} - v_{\text{actual}}| \le \text{tolerance}$.
  2. For MCQ / Multi-correct, compares sorted key arrays deterministically.
  3. Calculates marks awarded / deducted based on exam rules.
  4. Records `QuestionAttempt` in DB.
  5. Updates `StudentConceptMastery` for the tested concept and its parent chapter.
  6. Returns evaluation result, verified solution, and triggers AI mistake diagnosis if incorrect.
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "attemptId": "att-901",
    "isCorrect": true,
    "marksEarned": 4.0,
    "timeSpentSeconds": 142,
    "correctAnswer": ["B"],
    "verifiedSolution": {
      "solutionTextLatex": "Resolving forces parallel to the inclined plane: $mg\\sin\\theta - f_k = ma$...",
      "keyFormulas": ["f_k = \\mu N", "\\Sigma F = ma"]
    },
    "conceptMasteryDelta": {
      "conceptCode": "PHY-NLM-INCLINE-FRIC",
      "previousAccuracy": 60.0,
      "newAccuracy": 66.7,
      "masteryLevel": "COMPETENT"
    }
  }
}
```

---

## 5. AI Mentor System (`/api/v1/ai`)

### 5.1 Request Progressive Hint
- **Endpoint:** `POST /api/v1/ai/hint`
- **Access:** Authenticated (Student)
- **Request Body:**
```json
{
  "questionId": "q-101",
  "requestedLevel": 1,
  "mentorMode": "COLLABORATIVE"
}
```
- **Levels:**
  - `Level 1`: Conceptual direction (identifies principle without formulas).
  - `Level 2`: Relevant formula or governing law.
  - `Level 3`: Application strategy to the specific configuration.
  - `Level 4`: Step-by-step guidance without exposing the final number.
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "level": 1,
    "mentorMode": "COLLABORATIVE",
    "hintTextLatex": "First draw the Free Body Diagram (FBD) of the block. Notice that the normal contact force depends directly on the component of gravity perpendicular to the incline: $N = mg\\cos\\theta$."
  }
}
```

### 5.2 Analyze Student Mistake
- **Endpoint:** `POST /api/v1/ai/analyze-mistake`
- **Access:** Authenticated (Student)
- **Request Body:**
```json
{
  "attemptId": "att-902",
  "questionId": "q-101",
  "submittedAnswer": ["A"],
  "mentorMode": "STRICT"
}
```
- **Gemini AI Context Provided:**
  - Question statement & options.
  - Correct answer & SME solution.
  - Student submitted answer & time spent.
  - Student historical concept mastery record.
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "mistakeType": "SIGN_CONVENTION",
    "analysis": "You selected Option A, which has a factor of $\\frac{1}{2}$ in front of $g$. It appears you divided the total accelerating force by $2m$ instead of $m$, or mistakenly assumed kinetic energy conservation rather than applying Newton's second law directly.",
    "prerequisiteWarning": null,
    "suggestedReview": "Review: Applying Newton's Second Law along an inclined coordinate system."
  }
}
```

### 5.3 Interactive Conceptual Discussion
- **Endpoint:** `POST /api/v1/ai/chat`
- **Access:** Authenticated (Student)
- **Request Body:**
```json
{
  "questionId": "q-101",
  "mentorMode": "COLLABORATIVE",
  "message": "Why does friction act up the plane if the block was initially moving downwards?"
}
```
- **Response (200 OK):** Context-bound educational explanation grounded in physics axioms.

---

## 6. Student Analytics & Problem-Solving Index (`/api/v1/analytics`)

### 6.1 Dashboard Overview Summary
- **Endpoint:** `GET /api/v1/analytics/overview`
- **Access:** Authenticated (Student)
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalAttempted": 142,
    "totalCorrect": 108,
    "accuracyPercentage": 76.06,
    "currentStreak": 5,
    "averageTimeSeconds": 165,
    "problemSolvingIndex": 72.8,
    "weeklyProgress": [
      { "date": "2026-11-12", "attempted": 15, "accuracy": 73.3 },
      { "date": "2026-11-13", "attempted": 20, "accuracy": 80.0 }
    ],
    "weakTopics": [
      { "topicName": "Rotational Dynamics", "accuracy": 42.1, "attemptCount": 19 },
      { "topicName": "Doppler Effect in Sound", "accuracy": 50.0, "attemptCount": 12 }
    ]
  }
}
```

### 6.2 Chapter & Topic Breakdown
- **Endpoint:** `GET /api/v1/analytics/chapters`
- **Access:** Authenticated (Student)
- **Response (200 OK):** Detailed chapter-level accuracy, time per difficulty level, and mastery classification.

---

## 7. Adaptive Learning & Recommendations (`/api/v1/learning`)

### 7.1 Adaptive Question Recommendation
- **Endpoint:** `GET /api/v1/learning/recommendations`
- **Access:** Authenticated (Student)
- **Engine Logic:**
  1. Identifies student concepts where mastery score $< 60\%$.
  2. Traverses `ConceptPrerequisite` graph: checks if prerequisite concepts are solid.
  3. Recommends target questions matched to the diagnosed knowledge gap:
     - If prerequisite is weak: recommends prerequisite foundation questions (EASY/MEDIUM).
     - If prerequisite is mastered: recommends calibrated practice (MEDIUM/HARD) to rebuild confidence.
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "recommendedQuestions": [
      {
        "questionId": "q-402",
        "title": "Torque balance on horizontal rod",
        "difficulty": "EASY",
        "reason": "Recommended because Rotational Equilibrium requires stronger torque vector resolution."
      }
    ],
    "learningGapDiagnosis": "Rotational Motion struggles stem from torque sign conventions in static equilibrium."
  }
}
```

---

## 8. Contests & Leaderboards (`/api/v1/contests`)

### 8.1 List Contests
- **Endpoint:** `GET /api/v1/contests`
- **Access:** Authenticated
- **Response (200 OK):** List of upcoming, active, and past contests.

### 8.2 Contest Paper & Submission
- **Endpoint:** `POST /api/v1/contests/:id/submit`
- **Access:** Authenticated (Contest Participant)
- **Request Body:** Complete answer sheet with section timestamps.
- **Response (200 OK):** Instantaneous score calculation and rank assignment.

### 8.3 Contest Leaderboard
- **Endpoint:** `GET /api/v1/contests/:id/leaderboard`
- **Access:** Authenticated
- **Response (200 OK):** Ranked standings with score and completion time.

---

## 9. Coaching Institute Dashboard (`/api/v1/institutes`)

- `GET /api/v1/institutes/:id/dashboard`: Aggregated student performance metrics.
- `GET /api/v1/institutes/:id/students`: Student roster with batch filters and weak-concept alerts.
- `POST /api/v1/institutes/:id/contests`: Create private batch-level test.

---

## 10. Platform Administration (`/api/v1/admin`)

- `POST /api/v1/admin/questions`: Create question with options, hints, and verified solutions.
- `PATCH /api/v1/admin/questions/:id`: Update question details (creates immutable version).
- `GET /api/v1/admin/audit-logs`: Query administrative and SME audit trail.
- `GET /api/v1/admin/analytics`: Platform-wide questions solved, active students, and AI token telemetry.
