import { JEE_PHYSICS_SYLLABUS } from '../data/seedData.js';
import { memoryStore } from './store.service.js';

export interface ConceptNode {
  code: string;
  name: string;
  summary: string;
  chapterSlug: string;
  prerequisites: string[];
}

export interface DiagnosedGap {
  conceptCode: string;
  conceptName: string;
  chapterName: string;
  studentAccuracy: number;
  totalAttempts: number;
  isPrerequisiteGap: boolean;
  rootCausePrerequisite?: {
    code: string;
    name: string;
    reason: string;
  };
  recommendedAction: string;
}

export class ConceptGraphService {
  private static conceptMap: Map<string, ConceptNode> = new Map();

  static {
    // Build the Directed Acyclic Graph of Concepts
    for (const chap of JEE_PHYSICS_SYLLABUS) {
      for (const top of chap.topics) {
        for (const c of top.concepts) {
          this.conceptMap.set(c.code, {
            code: c.code,
            name: c.name,
            summary: c.summary,
            chapterSlug: chap.slug,
            prerequisites: c.prerequisites || [],
          });
        }
      }
    }
  }

  static getConcept(code: string): ConceptNode | undefined {
    return this.conceptMap.get(code);
  }

  static getAllConcepts(): ConceptNode[] {
    return Array.from(this.conceptMap.values());
  }

  /**
   * Traverses the concept dependency graph to diagnose root learning gaps
   */
  static diagnoseLearningGaps(userId: string): DiagnosedGap[] {
    const attempts = memoryStore.getAttemptsByUserId(userId);
    const gaps: DiagnosedGap[] = [];

    // Concept to attempts map
    const conceptAttempts = new Map<string, { total: number; correct: number }>();

    for (const att of attempts) {
      // Map question code to tested concept
      let conceptCode = 'PHY-KIN-DIFF-CALC';
      if (att.questionId.includes('ROT')) {
        conceptCode = 'PHY-ROT-ROLLING';
      } else if (att.questionId.includes('NLM')) {
        conceptCode = 'PHY-NLM-INCLINE-FRIC';
      } else if (att.questionId.includes('WEP')) {
        conceptCode = 'PHY-WEP-THEOREM';
      } else if (att.questionId.includes('THM')) {
        conceptCode = 'PHY-THM-FIRST-LAW';
      } else if (att.questionId.includes('ELC')) {
        conceptCode = 'PHY-ELC-GAUSS';
      }

      const existing = conceptAttempts.get(conceptCode) || { total: 0, correct: 0 };
      existing.total += 1;
      if (att.isCorrect) existing.correct += 1;
      conceptAttempts.set(conceptCode, existing);
    }

    // Evaluate concepts where performance is weak (< 60% accuracy or consecutive wrong)
    for (const [code, stats] of conceptAttempts.entries()) {
      const accuracy = (stats.correct / stats.total) * 100;
      if (accuracy < 60 && stats.total >= 1) {
        const concept = this.conceptMap.get(code);
        if (!concept) continue;

        // Check if prerequisite concepts are the root cause
        let rootCausePrereq: any = null;
        if (concept.prerequisites && concept.prerequisites.length > 0) {
          for (const prereqCode of concept.prerequisites) {
            const prereqNode = this.conceptMap.get(prereqCode);
            if (prereqNode) {
              rootCausePrereq = {
                code: prereqNode.code,
                name: prereqNode.name,
                reason: `Prerequisite dependency "${prereqNode.name}" is foundational before mastering ${concept.name}.`,
              };
              break;
            }
          }
        }

        gaps.push({
          conceptCode: concept.code,
          conceptName: concept.name,
          chapterName: concept.chapterSlug.replace('-', ' ').toUpperCase(),
          studentAccuracy: parseFloat(accuracy.toFixed(1)),
          totalAttempts: stats.total,
          isPrerequisiteGap: !!rootCausePrereq,
          rootCausePrerequisite: rootCausePrereq,
          recommendedAction: rootCausePrereq
            ? `Revise prerequisite ${rootCausePrereq.name} before attempting advanced ${concept.name} problems.`
            : `Solve 3 foundational problems on ${concept.name} to reinforce coordinate resolution.`,
        });
      }
    }

    return gaps;
  }
}
