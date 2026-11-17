import {
  SEED_INSTITUTES,
  SEED_INSTITUTE_STUDENTS,
  SEED_SCHOLARSHIPS,
  SeedInstitute,
  SeedScholarship,
  InstituteStudent,
} from '../data/institutesData.js';
import { memoryStore } from './store.service.js';

export class InstituteService {
  static getInstitutes(): SeedInstitute[] {
    return SEED_INSTITUTES;
  }

  static getInstituteById(instituteId: string): SeedInstitute {
    const inst = SEED_INSTITUTES.find(
      (i) => i.id === instituteId || i.slug === instituteId || i.code === instituteId
    );
    if (!inst) {
      const err: any = new Error('Coaching Institute not found');
      err.statusCode = 404;
      throw err;
    }
    return inst;
  }

  /**
   * Complete Tenant-Isolated Institute Dashboard
   */
  static getInstituteDashboard(instituteId: string) {
    const institute = this.getInstituteById(instituteId);
    const students = SEED_INSTITUTE_STUDENTS[institute.id] || [];

    const totalStudents = institute.totalStudents;
    const totalTeachers = institute.totalTeachers;

    // Calculate aggregated metrics from students roster
    const averageAccuracy =
      students.length > 0
        ? parseFloat(
            (students.reduce((acc, curr) => acc + curr.accuracy, 0) / students.length).toFixed(1)
          )
        : 68.0;

    const averagePsi =
      students.length > 0
        ? parseFloat(
            (students.reduce((acc, curr) => acc + curr.problemSolvingIndex, 0) / students.length).toFixed(1)
          )
        : 65.0;

    // Identify students requiring urgent academic support
    const studentsRequiringAttention = students.filter(
      (s) => s.needsAttention || s.accuracy < 50
    );

    // Top performers
    const topPerformers = [...students].sort(
      (a, b) => b.problemSolvingIndex - a.problemSolvingIndex
    ).slice(0, 3);

    return {
      institute: {
        id: institute.id,
        name: institute.name,
        code: institute.code,
        city: institute.city,
        website: institute.website,
        isVerified: institute.isVerified,
      },
      metrics: {
        totalStudents,
        totalTeachers,
        averageAccuracy,
        averagePsi,
        activeBatchesCount: institute.batches.length,
        attentionNeededCount: studentsRequiringAttention.length,
      },
      batches: institute.batches,
      studentsRequiringAttention,
      topPerformers,
      studentRoster: students,
    };
  }

  static getScholarships(): SeedScholarship[] {
    return SEED_SCHOLARSHIPS;
  }

  static applyForScholarship(scholarshipId: string, userId: string) {
    const scholarship = SEED_SCHOLARSHIPS.find((s) => s.id === scholarshipId);
    if (!scholarship) {
      const err: any = new Error('Scholarship opportunity not found');
      err.statusCode = 404;
      throw err;
    }

    const profile = memoryStore.findProfileByUserId(userId);
    const currentPsi = profile?.problemSolvingIndex || 0;

    // Check eligibility
    const isEligible = currentPsi >= scholarship.minPsiScore;

    return {
      scholarshipId: scholarship.id,
      title: scholarship.title,
      instituteName: scholarship.instituteName,
      studentPsi: currentPsi,
      minRequiredPsi: scholarship.minPsiScore,
      isEligible,
      applicationStatus: isEligible ? 'APPLICATION_SUBMITTED' : 'INELIGIBLE_PSI_THRESHOLD',
      message: isEligible
        ? 'Congratulations! Your academic application and verified PSI have been transmitted to the institute review committee.'
        : `Your current PSI score of ${currentPsi} does not meet the minimum eligibility threshold (${scholarship.minPsiScore}). Please solve additional recommended problems to elevate your score.`,
    };
  }
}
