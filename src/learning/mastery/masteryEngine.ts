import type {
  ActiveAssessmentState,
  MasteryQuestion,
  TopicMasteryRecord,
  UserProgressDataV3,
} from '../types';
import { selectAssessmentQuestions } from './questionSelector';
import { getQuestionById } from './questionBank';

/**
 * Creates a fresh assessment attempt for a given algorithm.
 * Selects 3 distinct questions: 1 Easy, 1 Medium, and 1 Hard.
 */
export function createAssessmentAttempt(
  algoId: string,
  randomFn: () => number = Math.random
): { attempt: ActiveAssessmentState; questions: [MasteryQuestion, MasteryQuestion, MasteryQuestion] } {
  const questions = selectAssessmentQuestions(algoId, randomFn);
  const attemptId = `attempt-${algoId}-${Date.now()}-${Math.floor(randomFn() * 100000)}`;

  const attempt: ActiveAssessmentState = {
    algoId,
    attemptId,
    questionIds: [questions[0].id, questions[1].id, questions[2].id],
    answers: {},
    status: 'in-progress',
    startedAt: Date.now(),
  };

  return { attempt, questions };
}

/**
 * Records a user's selected answer for a specific question within an active attempt.
 */
export function recordAssessmentAnswer(
  attempt: ActiveAssessmentState,
  questionId: string,
  selectedOptionId: string
): ActiveAssessmentState {
  if (!attempt.questionIds.includes(questionId)) {
    throw new Error(
      `Question "${questionId}" does not belong to active assessment "${attempt.attemptId}".`
    );
  }

  return {
    ...attempt,
    answers: {
      ...attempt.answers,
      [questionId]: selectedOptionId,
    },
  };
}

/**
 * Evaluates an assessment attempt against the question bank.
 * All 3 questions must be answered and correct to pass.
 */
export function evaluateAssessmentAttempt(
  attempt: ActiveAssessmentState,
  questions: MasteryQuestion[]
): {
  isComplete: boolean;
  passed: boolean;
  score: number;
  results: Record<string, { isCorrect: boolean; correctOptionId: string; selectedOptionId?: string }>;
} {
  const results: Record<
    string,
    { isCorrect: boolean; correctOptionId: string; selectedOptionId?: string }
  > = {};

  let score = 0;
  let allAnswered = true;

  for (const q of questions) {
    const selected = attempt.answers[q.id];
    if (!selected) {
      allAnswered = false;
    }
    const isCorrect = Boolean(selected && selected === q.correctOptionId);
    if (isCorrect) {
      score++;
    }
    results[q.id] = {
      isCorrect,
      correctOptionId: q.correctOptionId,
      selectedOptionId: selected,
    };
  }

  // Passing strictly requires all 3 tiers to be answered correctly (3 / 3)
  const passed = allAnswered && score === 3;

  return {
    isComplete: allAnswered,
    passed,
    score,
    results,
  };
}

/**
 * Applies the evaluated assessment result to the user's progress records.
 * Updates mastery state, attempt counts, and best score.
 */
export function applyAssessmentResult(
  prev: UserProgressDataV3,
  attempt: ActiveAssessmentState,
  passed: boolean,
  score: number
): UserProgressDataV3 {
  const currentRecord: TopicMasteryRecord = prev.masteryRecords[attempt.algoId] || {
    algoId: attempt.algoId,
    status: 'unattempted',
    attemptsCount: 0,
    lastAttemptTimestamp: 0,
  };

  const newAttemptsCount = currentRecord.attemptsCount + 1;
  const newBestScore = Math.max(currentRecord.bestScore ?? 0, score);

  // Once mastered, a topic retains mastered status (no accidental demotion on practice)
  const newStatus: TopicMasteryRecord['status'] =
    currentRecord.status === 'mastered'
      ? 'mastered'
      : passed
      ? 'mastered'
      : 'failed';

  const updatedRecord: TopicMasteryRecord = {
    ...currentRecord,
    status: newStatus,
    attemptsCount: newAttemptsCount,
    lastAttemptTimestamp: Date.now(),
    bestScore: newBestScore,
    completedTimestamp:
      passed && !currentRecord.completedTimestamp
        ? Date.now()
        : currentRecord.completedTimestamp,
  };

  const updatedAttempt: ActiveAssessmentState = {
    ...attempt,
    status: passed ? 'passed' : 'failed',
  };

  return {
    ...prev,
    masteryRecords: {
      ...prev.masteryRecords,
      [attempt.algoId]: updatedRecord,
    },
    activeAssessment: updatedAttempt,
  };
}

/**
 * Helper to hydrate full MasteryQuestion objects from an attempt's stored questionIds.
 */
export function getQuestionsForAttempt(
  attempt: ActiveAssessmentState
): [MasteryQuestion, MasteryQuestion, MasteryQuestion] | null {
  const q0 = getQuestionById(attempt.questionIds[0]);
  const q1 = getQuestionById(attempt.questionIds[1]);
  const q2 = getQuestionById(attempt.questionIds[2]);

  if (!q0 || !q1 || !q2) {
    return null;
  }

  return [q0, q1, q2];
}

/**
 * Checks whether a topic is verified mastered.
 */
export function isTopicMastered(
  progress: UserProgressDataV3,
  algoId: string
): boolean {
  return progress.masteryRecords[algoId]?.status === 'mastered';
}

/**
 * Calculates total number of mastered topics across the curriculum.
 */
export function getMasteredCount(progress: UserProgressDataV3): number {
  return Object.values(progress.masteryRecords).filter(
    (record) => record.status === 'mastered'
  ).length;
}

/**
 * Checks whether an entire chapter/category is completely mastered.
 */
export function isChapterMastered(
  progress: UserProgressDataV3,
  chapterAlgoIds: string[]
): boolean {
  if (chapterAlgoIds.length === 0) return false;
  return chapterAlgoIds.every((id) => isTopicMastered(progress, id));
}
