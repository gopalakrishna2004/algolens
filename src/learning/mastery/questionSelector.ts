import type { MasteryQuestion } from '../types';
import { getQuestionsForTopicAndTier } from './questionBank';

/**
 * Fast 32-bit Mulberry32 seedable PRNG.
 * Used for deterministic, reproducible unit testing without flakiness.
 */
export function createMulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Selects exactly one question from a pool using an optional random function.
 */
export function sampleQuestion(
  pool: MasteryQuestion[],
  randomFn: () => number = Math.random
): MasteryQuestion {
  if (pool.length === 0) {
    throw new Error('Cannot sample from an empty question pool.');
  }
  const index = Math.floor(randomFn() * pool.length);
  return pool[index];
}

/**
 * Selects exactly 3 questions for an assessment attempt:
 * - One Easy question
 * - One Medium question
 * - One Hard question
 *
 * Guarantees distinct question IDs, matching topic, and difficulty separation.
 * Supports injectable randomness for deterministic testing.
 */
export function selectAssessmentQuestions(
  algoId: string,
  randomFn: () => number = Math.random
): [MasteryQuestion, MasteryQuestion, MasteryQuestion] {
  const easyPool = getQuestionsForTopicAndTier(algoId, 'easy');
  const mediumPool = getQuestionsForTopicAndTier(algoId, 'medium');
  const hardPool = getQuestionsForTopicAndTier(algoId, 'hard');

  if (easyPool.length === 0 || mediumPool.length === 0 || hardPool.length === 0) {
    throw new Error(
      `Insufficient questions for topic "${algoId}". Requires at least 1 Easy, 1 Medium, and 1 Hard question.`
    );
  }

  const easyQ = sampleQuestion(easyPool, randomFn);
  const mediumQ = sampleQuestion(mediumPool, randomFn);
  const hardQ = sampleQuestion(hardPool, randomFn);

  // Safety invariant check: all 3 IDs must be distinct
  const ids = new Set([easyQ.id, mediumQ.id, hardQ.id]);
  if (ids.size !== 3) {
    throw new Error(
      `Question selector invariant violation: duplicate question IDs found in assessment: [${easyQ.id}, ${mediumQ.id}, ${hardQ.id}]`
    );
  }

  return [easyQ, mediumQ, hardQ];
}
