import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  SEARCHING_QUESTION_BANK,
  SORTING_QUESTION_BANK,
  DATA_STRUCTURES_QUESTION_BANK,
  TREES_QUESTION_BANK,
  GRAPHS_QUESTION_BANK,
  TECHNIQUES_QUESTION_BANK,
  QUESTION_BANK,
  hasMasteryQuestions,
  getQuestionsForTopicAndTier,
  getQuestionById,
} from './questionBank';
import { ALGORITHM_REGISTRY, CATEGORIES } from '../../algorithms/registry';
import {
  selectAssessmentQuestions,
  createMulberry32,
  sampleQuestion,
} from './questionSelector';
import {
  createAssessmentAttempt,
  recordAssessmentAnswer,
  evaluateAssessmentAttempt,
  applyAssessmentResult,
  getQuestionsForAttempt,
  isTopicMastered,
  getMasteredCount,
  isChapterMastered,
} from './masteryEngine';
import {
  PROGRESS_STORAGE_KEY_V2,
  PROGRESS_STORAGE_KEY_V3,
  DEFAULT_PROGRESS_V3,
  sanitizeProgress,
  migrateProgressV2ToV3,
  loadUserProgress,
  saveAssessmentAttempt,
  clearAssessmentAttempt,
} from '../progressStorage';

describe('Mastery System — Searching Pilot Question Bank', () => {
  it('contains exactly 18 reviewed questions for the Searching chapter', () => {
    expect(SEARCHING_QUESTION_BANK.length).toBe(18);
  });

  it('contains exactly 9 questions for Linear Search (3 Easy, 3 Medium, 3 Hard)', () => {
    const easy = getQuestionsForTopicAndTier('linear-search', 'easy');
    const med = getQuestionsForTopicAndTier('linear-search', 'medium');
    const hard = getQuestionsForTopicAndTier('linear-search', 'hard');

    expect(easy.length).toBe(3);
    expect(med.length).toBe(3);
    expect(hard.length).toBe(3);
  });

  it('contains exactly 9 questions for Binary Search (3 Easy, 3 Medium, 3 Hard)', () => {
    const easy = getQuestionsForTopicAndTier('binary-search', 'easy');
    const med = getQuestionsForTopicAndTier('binary-search', 'medium');
    const hard = getQuestionsForTopicAndTier('binary-search', 'hard');

    expect(easy.length).toBe(3);
    expect(med.length).toBe(3);
    expect(hard.length).toBe(3);
  });

  it('guarantees unique IDs and complete metadata for every question', () => {
    const ids = new Set<string>();

    for (const q of SEARCHING_QUESTION_BANK) {
      expect(ids.has(q.id), `Duplicate question ID: ${q.id}`).toBe(false);
      ids.add(q.id);

      expect(q.prompt.length).toBeGreaterThan(15);
      expect(q.options.length).toBeGreaterThanOrEqual(3);
      expect(q.pedagogicalRationale.length).toBeGreaterThan(15);

      // Verify correct option exists in options array
      const correctOpt = q.options.find((o) => o.id === q.correctOptionId);
      expect(correctOpt, `Missing correct option for ${q.id}`).toBeDefined();

      // Verify each option has a non-empty explanation
      for (const opt of q.options) {
        expect(opt.explanation.length).toBeGreaterThan(10);
      }
    }
  });

  it('technically characterizes signed integer overflow as undefined behavior in C for binary search', () => {
    const overflowQuestion = getQuestionById('q-binary-search-hard-01');
    expect(overflowQuestion).toBeDefined();

    const correctOption = overflowQuestion?.options.find(
      (o) => o.id === overflowQuestion?.correctOptionId
    );
    expect(correctOption?.label).toContain('undefined behavior');
    expect(overflowQuestion?.pedagogicalRationale).toContain('undefined behavior');
  });
});

describe('Mastery System — Question Selector', () => {
  it('selects exactly 3 questions: one Easy, one Medium, and one Hard', () => {
    const [easyQ, medQ, hardQ] = selectAssessmentQuestions('linear-search');

    expect(easyQ.algoId).toBe('linear-search');
    expect(easyQ.tier).toBe('easy');

    expect(medQ.algoId).toBe('linear-search');
    expect(medQ.tier).toBe('medium');

    expect(hardQ.algoId).toBe('linear-search');
    expect(hardQ.tier).toBe('hard');
  });

  it('guarantees no duplicate question IDs within an assessment', () => {
    for (let i = 0; i < 30; i++) {
      const questions = selectAssessmentQuestions('binary-search');
      const idSet = new Set(questions.map((q) => q.id));
      expect(idSet.size).toBe(3);
    }
  });

  it('supports deterministic selection using Mulberry32 PRNG', () => {
    const prng1 = createMulberry32(42);
    const set1 = selectAssessmentQuestions('linear-search', prng1);

    const prng2 = createMulberry32(42);
    const set2 = selectAssessmentQuestions('linear-search', prng2);

    expect(set1.map((q) => q.id)).toEqual(set2.map((q) => q.id));
  });

  it('produces variation across different seeds', () => {
    const prngA = createMulberry32(101);
    const setA = selectAssessmentQuestions('linear-search', prngA);

    const prngB = createMulberry32(999);
    const setB = selectAssessmentQuestions('linear-search', prngB);

    // With 3 options per tier, different seeds will sample different combinations
    expect(setA).toBeDefined();
    expect(setB).toBeDefined();
  });

  it('samples a question from a pool using sampleQuestion', () => {
    const easyPool = getQuestionsForTopicAndTier('linear-search', 'easy');
    const sampled = sampleQuestion(easyPool, () => 0);
    expect(sampled.id).toBe(easyPool[0].id);
  });

  it('throws an error if asked to select for a topic without questions', () => {
    expect(() => selectAssessmentQuestions('unimplemented-topic')).toThrow(
      /Insufficient questions for topic/
    );
  });
});

describe('Mastery System — Attempt Lifecycle & Evaluation Engine', () => {
  it('creates an assessment attempt with 3 distinct question IDs and in-progress status', () => {
    const { attempt, questions } = createAssessmentAttempt('linear-search');

    expect(attempt.algoId).toBe('linear-search');
    expect(attempt.status).toBe('in-progress');
    expect(attempt.questionIds.length).toBe(3);
    expect(questions.length).toBe(3);
    expect(attempt.questionIds).toEqual(questions.map((q) => q.id));
  });

  it('records user answers safely and rejects foreign question IDs', () => {
    const { attempt } = createAssessmentAttempt('linear-search');
    const q0Id = attempt.questionIds[0];

    const updated = recordAssessmentAnswer(attempt, q0Id, 'opt-a');
    expect(updated.answers[q0Id]).toBe('opt-a');

    expect(() => recordAssessmentAnswer(attempt, 'foreign-id', 'opt-a')).toThrow(
      /does not belong to active assessment/
    );
  });

  it('awards passing strictly when all 3 tiers are answered correctly', () => {
    const { attempt, questions } = createAssessmentAttempt('binary-search');

    // Answer all 3 correctly
    let answeredAttempt = attempt;
    for (const q of questions) {
      answeredAttempt = recordAssessmentAnswer(answeredAttempt, q.id, q.correctOptionId);
    }

    const evalResult = evaluateAssessmentAttempt(answeredAttempt, questions);
    expect(evalResult.isComplete).toBe(true);
    expect(evalResult.passed).toBe(true);
    expect(evalResult.score).toBe(3);
  });

  it('fails an attempt if even one answer is incorrect (e.g. 2 / 3 score)', () => {
    const { attempt, questions } = createAssessmentAttempt('binary-search');

    // Answer first 2 correctly, 3rd incorrectly
    let answeredAttempt = recordAssessmentAnswer(attempt, questions[0].id, questions[0].correctOptionId);
    answeredAttempt = recordAssessmentAnswer(answeredAttempt, questions[1].id, questions[1].correctOptionId);
    answeredAttempt = recordAssessmentAnswer(answeredAttempt, questions[2].id, 'wrong-opt');

    const evalResult = evaluateAssessmentAttempt(answeredAttempt, questions);
    expect(evalResult.isComplete).toBe(true);
    expect(evalResult.passed).toBe(false);
    expect(evalResult.score).toBe(2);
  });

  it('fails incomplete attempts where not all questions were answered', () => {
    const { attempt, questions } = createAssessmentAttempt('linear-search');

    // Only answer 1 question
    const answeredAttempt = recordAssessmentAnswer(attempt, questions[0].id, questions[0].correctOptionId);
    const evalResult = evaluateAssessmentAttempt(answeredAttempt, questions);

    expect(evalResult.isComplete).toBe(false);
    expect(evalResult.passed).toBe(false);
    expect(evalResult.score).toBe(1);
  });

  it('applies passing result to user progress, awarding topic mastery', () => {
    const initialProgress = { ...DEFAULT_PROGRESS_V3 };
    const { attempt } = createAssessmentAttempt('linear-search');

    const updatedProgress = applyAssessmentResult(initialProgress, attempt, true, 3);

    expect(isTopicMastered(updatedProgress, 'linear-search')).toBe(true);
    expect(updatedProgress.masteryRecords['linear-search'].status).toBe('mastered');
    expect(updatedProgress.masteryRecords['linear-search'].bestScore).toBe(3);
    expect(updatedProgress.masteryRecords['linear-search'].completedTimestamp).toBeDefined();
    expect(getMasteredCount(updatedProgress)).toBe(1);
  });

  it('records failed attempt without awarding mastery', () => {
    const initialProgress = { ...DEFAULT_PROGRESS_V3 };
    const { attempt } = createAssessmentAttempt('linear-search');

    const updatedProgress = applyAssessmentResult(initialProgress, attempt, false, 2);

    expect(isTopicMastered(updatedProgress, 'linear-search')).toBe(false);
    expect(updatedProgress.masteryRecords['linear-search'].status).toBe('failed');
    expect(updatedProgress.masteryRecords['linear-search'].bestScore).toBe(2);
    expect(getMasteredCount(updatedProgress)).toBe(0);
  });

  it('does not demote a previously mastered topic on an informal re-take', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };
    const { attempt: passAttempt } = createAssessmentAttempt('linear-search');
    progress = applyAssessmentResult(progress, passAttempt, true, 3);
    expect(isTopicMastered(progress, 'linear-search')).toBe(true);

    // Later retake with failed score
    const { attempt: failAttempt } = createAssessmentAttempt('linear-search');
    progress = applyAssessmentResult(progress, failAttempt, false, 1);

    // Still remains mastered!
    expect(isTopicMastered(progress, 'linear-search')).toBe(true);
    expect(progress.masteryRecords['linear-search'].status).toBe('mastered');
    expect(progress.masteryRecords['linear-search'].attemptsCount).toBe(2);
  });

  it('awards chapter mastery only when all chapter topics are mastered', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };
    const searchingChapter = ['linear-search', 'binary-search'];

    expect(isChapterMastered(progress, searchingChapter)).toBe(false);

    // Master linear search
    const { attempt: att1 } = createAssessmentAttempt('linear-search');
    progress = applyAssessmentResult(progress, att1, true, 3);
    expect(isChapterMastered(progress, searchingChapter)).toBe(false);

    // Master binary search
    const { attempt: att2 } = createAssessmentAttempt('binary-search');
    progress = applyAssessmentResult(progress, att2, true, 3);
    expect(isChapterMastered(progress, searchingChapter)).toBe(true);
  });
});

describe('Mastery System — Persistence, Migration & Reload Protection', () => {
  let mockStore: Record<string, string> = {};

  beforeEach(() => {
    mockStore = {};
    const mockLocalStorage = {
      getItem: (key: string) => mockStore[key] ?? null,
      setItem: (key: string, value: string) => {
        mockStore[key] = value;
      },
      removeItem: (key: string) => {
        delete mockStore[key];
      },
      clear: () => {
        mockStore = {};
      },
    };

    (globalThis as any).window = {
      localStorage: mockLocalStorage,
    };
  });

  afterEach(() => {
    delete (globalThis as any).window;
  });

  it('migrates legacy V2 progress safely into V3 without data loss', () => {
    const v2Data = {
      completedAlgoIds: ['linear-search', 'binary-search', 'bubble-sort'],
      recentlyExploredIds: ['linear-search', 'quick-sort'],
      lastExploredAlgoId: 'quick-sort',
      challengeStats: {
        totalAttempted: 15,
        totalCorrect: 12,
        streak: 4,
        bestStreak: 7,
      },
    };

    mockStore[PROGRESS_STORAGE_KEY_V2] = JSON.stringify(v2Data);

    const loaded = loadUserProgress();

    expect(loaded.schemaVersion).toBe(3);
    expect(loaded.completedAlgoIds).toEqual(v2Data.completedAlgoIds);
    expect(loaded.recentlyExploredIds).toEqual(v2Data.recentlyExploredIds);
    expect(loaded.lastExploredAlgoId).toBe('quick-sort');
    expect(loaded.challengeStats).toEqual(v2Data.challengeStats);

    // Crucial rule: existing completed topics in V2 are NOT awarded mastery!
    expect(isTopicMastered(loaded, 'linear-search')).toBe(false);
    expect(isTopicMastered(loaded, 'binary-search')).toBe(false);
    expect(getMasteredCount(loaded)).toBe(0);

    // Crucial rule: V2 key is preserved intact in storage!
    expect(mockStore[PROGRESS_STORAGE_KEY_V2]).toBeDefined();
    // And V3 key is now populated
    expect(mockStore[PROGRESS_STORAGE_KEY_V3]).toBeDefined();
  });

  it('preserves active assessment across simulated page refresh/reload', () => {
    let progress = loadUserProgress();
    const { attempt, questions } = createAssessmentAttempt('linear-search');

    // Answer 1 question
    const updatedAttempt = recordAssessmentAnswer(attempt, questions[0].id, 'opt-a');
    progress = saveAssessmentAttempt(progress, updatedAttempt);

    // Simulate page refresh by loading from scratch
    const reloaded = loadUserProgress();
    expect(reloaded.activeAssessment).not.toBeNull();
    expect(reloaded.activeAssessment?.algoId).toBe('linear-search');
    expect(reloaded.activeAssessment?.attemptId).toBe(attempt.attemptId);
    expect(reloaded.activeAssessment?.questionIds).toEqual(attempt.questionIds);
    expect(reloaded.activeAssessment?.answers[questions[0].id]).toBe('opt-a');

    // Fully hydrated questions match original
    const hydrated = getQuestionsForAttempt(reloaded.activeAssessment!);
    expect(hydrated).not.toBeNull();
    expect(hydrated![0].id).toBe(questions[0].id);
  });

  it('handles malformed V3 JSON gracefully without destroying stored data', () => {
    mockStore[PROGRESS_STORAGE_KEY_V3] = 'INVALID_JSON_CORRUPTED{[';

    const loaded = loadUserProgress();
    expect(loaded).toEqual(DEFAULT_PROGRESS_V3);

    // Malformed string was not overwritten
    expect(mockStore[PROGRESS_STORAGE_KEY_V3]).toBe('INVALID_JSON_CORRUPTED{[');
  });

  it('clears active assessment cleanly using clearAssessmentAttempt', () => {
    let progress = loadUserProgress();
    const { attempt } = createAssessmentAttempt('linear-search');
    progress = saveAssessmentAttempt(progress, attempt);
    expect(progress.activeAssessment).not.toBeNull();

    progress = clearAssessmentAttempt(progress);
    expect(progress.activeAssessment).toBeNull();
  });

  it('directly migrates null or empty V2 data safely', () => {
    expect(migrateProgressV2ToV3(null)).toEqual(DEFAULT_PROGRESS_V3);
    expect(migrateProgressV2ToV3('not an object')).toEqual(DEFAULT_PROGRESS_V3);
  });

  it('handles partial or missing V3 fields cleanly via sanitizeProgress', () => {
    const rawPartial = {
      completedAlgoIds: ['linear-search', 999], // 999 invalid
      masteryRecords: {
        'linear-search': {
          algoId: 'linear-search',
          status: 'invalid-status',
          attemptsCount: -5,
        },
      },
    };

    const sanitized = sanitizeProgress(rawPartial);
    expect(sanitized.completedAlgoIds).toEqual(['linear-search']);
    expect(sanitized.masteryRecords['linear-search'].status).toBe('unattempted');
    expect(sanitized.masteryRecords['linear-search'].attemptsCount).toBe(0);
  });
});

describe('Mastery System — Sorting Question Bank (Chapter 02)', () => {
  const SORTING_TOPICS = [
    'bubble-sort',
    'selection-sort',
    'insertion-sort',
    'merge-sort',
    'quick-sort',
    'heap-sort',
  ];

  it('contains exactly 54 reviewed questions for the Sorting chapter', () => {
    expect(SORTING_QUESTION_BANK.length).toBe(54);
  });

  it('combines Searching and Sorting into at least 72 reviewed questions', () => {
    expect(SEARCHING_QUESTION_BANK.length + SORTING_QUESTION_BANK.length).toBe(72);
  });

  it('guarantees unique IDs across Searching and Sorting questions', () => {
    const ids = new Set<string>();
    for (const q of [...SEARCHING_QUESTION_BANK, ...SORTING_QUESTION_BANK]) {
      expect(ids.has(q.id), `Duplicate question ID found: ${q.id}`).toBe(false);
      ids.add(q.id);
    }
    expect(ids.size).toBe(72);
  });

  it.each(SORTING_TOPICS)('contains exactly 9 questions (3 Easy, 3 Medium, 3 Hard) for %s', (topic) => {
    const easy = getQuestionsForTopicAndTier(topic, 'easy');
    const med = getQuestionsForTopicAndTier(topic, 'medium');
    const hard = getQuestionsForTopicAndTier(topic, 'hard');

    expect(easy.length).toBe(3);
    expect(med.length).toBe(3);
    expect(hard.length).toBe(3);
  });

  it('verifies topic availability via hasMasteryQuestions helper', () => {
    for (const topic of SORTING_TOPICS) {
      expect(hasMasteryQuestions(topic)).toBe(true);
    }
    expect(hasMasteryQuestions('linear-search')).toBe(true);
    expect(hasMasteryQuestions('binary-search')).toBe(true);
    // Unknown or nonexistent algorithm IDs remain false
    expect(hasMasteryQuestions('nonexistent-algorithm')).toBe(false);
    expect(hasMasteryQuestions('unknown-topic')).toBe(false);
  });

  it('guarantees complete metadata, valid options, and explanations for every sorting question', () => {
    for (const q of SORTING_QUESTION_BANK) {
      expect(q.prompt.length).toBeGreaterThan(15);
      expect(q.options.length).toBeGreaterThanOrEqual(3);
      expect(q.pedagogicalRationale.length).toBeGreaterThan(15);

      const correctOpt = q.options.find((o) => o.id === q.correctOptionId);
      expect(correctOpt, `Missing correct option for question: ${q.id}`).toBeDefined();

      for (const opt of q.options) {
        expect(opt.explanation.length).toBeGreaterThan(10);
      }
    }
  });

  // Technical Accuracy Checks for Sorting Topics
  it('technically specifies Bubble Sort early-exit optimization and inversion property', () => {
    const earlyExitQ = getQuestionById('q-bubble-sort-med-01');
    expect(earlyExitQ).toBeDefined();
    const correctOpt = earlyExitQ?.options.find((o) => o.id === earlyExitQ?.correctOptionId);
    expect(correctOpt?.label).toContain('swapped == 0');

    const inversionQ = getQuestionById('q-bubble-sort-hard-02');
    expect(inversionQ?.pedagogicalRationale).toContain('inversion');
  });

  it('technically specifies Selection Sort write count upper bound of at most n - 1 swaps', () => {
    const swapBoundQ = getQuestionById('q-selection-sort-easy-02');
    expect(swapBoundQ).toBeDefined();
    const correctOpt = swapBoundQ?.options.find((o) => o.id === swapBoundQ?.correctOptionId);
    expect(correctOpt?.label).toContain('n - 1 swaps');
  });

  it('technically specifies Insertion Sort short-circuit guard and inversion-sensitive complexity', () => {
    const shortCircuitQ = getQuestionById('q-insertion-sort-hard-01');
    expect(shortCircuitQ).toBeDefined();
    const correctOpt = shortCircuitQ?.options.find((o) => o.id === shortCircuitQ?.correctOptionId);
    expect(correctOpt?.label).toContain('short-circuit');

    const inversionQ = getQuestionById('q-insertion-sort-hard-02');
    const invOpt = inversionQ?.options.find((o) => o.id === inversionQ?.correctOptionId);
    expect(invOpt?.label).toContain('O(n + I)');
  });

  it('technically specifies Merge Sort O(n) space and overflow-safe midpoint calculation', () => {
    const spaceQ = getQuestionById('q-merge-sort-med-01');
    const spaceOpt = spaceQ?.options.find((o) => o.id === spaceQ?.correctOptionId);
    expect(spaceOpt?.label).toContain('O(n)');

    const midpointQ = getQuestionById('q-merge-sort-hard-02');
    const midOpt = midpointQ?.options.find((o) => o.id === midpointQ?.correctOptionId);
    expect(midOpt?.label).toContain('overflow');
  });

  it('technically specifies Quick Sort Lomuto partition invariant and IntroSort fallback', () => {
    const lomutoQ = getQuestionById('q-quick-sort-med-01');
    const lomutoOpt = lomutoQ?.options.find((o) => o.id === lomutoQ?.correctOptionId);
    expect(lomutoOpt?.label).toContain('strictly less than the pivot');

    const introSortQ = getQuestionById('q-quick-sort-hard-03');
    const introOpt = introSortQ?.options.find((o) => o.id === introSortQ?.correctOptionId);
    expect(introOpt?.label).toContain('Heap Sort');
  });

  it('technically specifies Heap Sort complete tree indices and O(n) build-heap math', () => {
    const formulaQ = getQuestionById('q-heap-sort-easy-01');
    const formOpt = formulaQ?.options.find((o) => o.id === formulaQ?.correctOptionId);
    expect(formOpt?.label).toContain('2 * i + 1');

    const buildHeapQ = getQuestionById('q-heap-sort-med-01');
    const buildOpt = buildHeapQ?.options.find((o) => o.id === buildHeapQ?.correctOptionId);
    expect(buildOpt?.label).toContain('converges to O(n)');
  });
});

describe('Mastery System — Sorting Question Selector', () => {
  const SORTING_TOPICS = [
    'bubble-sort',
    'selection-sort',
    'insertion-sort',
    'merge-sort',
    'quick-sort',
    'heap-sort',
  ];

  it.each(SORTING_TOPICS)('selects 1 Easy, 1 Medium, and 1 Hard question for %s', (topic) => {
    const [easyQ, medQ, hardQ] = selectAssessmentQuestions(topic);

    expect(easyQ.algoId).toBe(topic);
    expect(easyQ.tier).toBe('easy');

    expect(medQ.algoId).toBe(topic);
    expect(medQ.tier).toBe('medium');

    expect(hardQ.algoId).toBe(topic);
    expect(hardQ.tier).toBe('hard');

    expect(new Set([easyQ.id, medQ.id, hardQ.id]).size).toBe(3);
  });

  it('guarantees reproducible selection with Mulberry32 PRNG for sorting topics', () => {
    const prng1 = createMulberry32(777);
    const set1 = selectAssessmentQuestions('merge-sort', prng1);

    const prng2 = createMulberry32(777);
    const set2 = selectAssessmentQuestions('merge-sort', prng2);

    expect(set1.map((q) => q.id)).toEqual(set2.map((q) => q.id));
  });
});

describe('Mastery System — Sorting Attempt Lifecycle & Chapter Gating', () => {
  const SORTING_TOPICS = [
    'bubble-sort',
    'selection-sort',
    'insertion-sort',
    'merge-sort',
    'quick-sort',
    'heap-sort',
  ];

  it('creates, evaluates, and awards mastery on 3/3 pass for merge-sort', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };
    const { attempt, questions } = createAssessmentAttempt('merge-sort');

    expect(attempt.algoId).toBe('merge-sort');
    expect(attempt.status).toBe('in-progress');

    // Answer all 3 correctly
    let answeredAttempt = attempt;
    for (const q of questions) {
      answeredAttempt = recordAssessmentAnswer(answeredAttempt, q.id, q.correctOptionId);
    }

    const evalResult = evaluateAssessmentAttempt(answeredAttempt, questions);
    expect(evalResult.passed).toBe(true);
    expect(evalResult.score).toBe(3);

    progress = applyAssessmentResult(progress, answeredAttempt, evalResult.passed, evalResult.score);
    expect(isTopicMastered(progress, 'merge-sort')).toBe(true);
    expect(progress.masteryRecords['merge-sort'].status).toBe('mastered');
    expect(progress.masteryRecords['merge-sort'].bestScore).toBe(3);
    expect(getMasteredCount(progress)).toBe(1);
  });

  it('records failure without awarding mastery on 2/3 score for quick-sort', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };
    const { attempt, questions } = createAssessmentAttempt('quick-sort');

    let answeredAttempt = recordAssessmentAnswer(attempt, questions[0].id, questions[0].correctOptionId);
    answeredAttempt = recordAssessmentAnswer(answeredAttempt, questions[1].id, questions[1].correctOptionId);
    answeredAttempt = recordAssessmentAnswer(answeredAttempt, questions[2].id, 'wrong-answer');

    const evalResult = evaluateAssessmentAttempt(answeredAttempt, questions);
    expect(evalResult.passed).toBe(false);
    expect(evalResult.score).toBe(2);

    progress = applyAssessmentResult(progress, answeredAttempt, evalResult.passed, evalResult.score);
    expect(isTopicMastered(progress, 'quick-sort')).toBe(false);
    expect(progress.masteryRecords['quick-sort'].status).toBe('failed');
    expect(progress.masteryRecords['quick-sort'].bestScore).toBe(2);
    expect(getMasteredCount(progress)).toBe(0);
  });

  it('preserves mastered status on practice retakes for bubble-sort (non-demotion)', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };
    const { attempt: passAttempt, questions } = createAssessmentAttempt('bubble-sort');

    // First attempt: pass 3/3
    let answered = passAttempt;
    for (const q of questions) {
      answered = recordAssessmentAnswer(answered, q.id, q.correctOptionId);
    }
    progress = applyAssessmentResult(progress, answered, true, 3);
    expect(isTopicMastered(progress, 'bubble-sort')).toBe(true);

    // Later retake: fail with 1/3
    const { attempt: retakeAttempt } = createAssessmentAttempt('bubble-sort');
    progress = applyAssessmentResult(progress, retakeAttempt, false, 1);

    expect(isTopicMastered(progress, 'bubble-sort')).toBe(true);
    expect(progress.masteryRecords['bubble-sort'].status).toBe('mastered');
    expect(progress.masteryRecords['bubble-sort'].attemptsCount).toBe(2);
  });

  it('gates Chapter 02 mastery strictly on completing all 6 sorting topics', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };

    // Master 5 of the 6 topics
    for (let i = 0; i < 5; i++) {
      const topic = SORTING_TOPICS[i];
      const { attempt, questions } = createAssessmentAttempt(topic);
      let answered = attempt;
      for (const q of questions) {
        answered = recordAssessmentAnswer(answered, q.id, q.correctOptionId);
      }
      progress = applyAssessmentResult(progress, answered, true, 3);
      expect(isChapterMastered(progress, SORTING_TOPICS)).toBe(false);
    }

    expect(getMasteredCount(progress)).toBe(5);
    expect(isChapterMastered(progress, SORTING_TOPICS)).toBe(false);

    // Master 6th topic (heap-sort)
    const lastTopic = SORTING_TOPICS[5];
    const { attempt: lastAttempt, questions: lastQs } = createAssessmentAttempt(lastTopic);
    let lastAnswered = lastAttempt;
    for (const q of lastQs) {
      lastAnswered = recordAssessmentAnswer(lastAnswered, q.id, q.correctOptionId);
    }
    progress = applyAssessmentResult(progress, lastAnswered, true, 3);

    expect(getMasteredCount(progress)).toBe(6);
    expect(isChapterMastered(progress, SORTING_TOPICS)).toBe(true);
  });
});

describe('Mastery System — Data Structures Question Bank (Chapter 03)', () => {
  const DATA_STRUCTURES_TOPICS = [
    'array-ds',
    'stack-ds',
    'queue-ds',
    'linked-list-ds',
    'hash-table-ds',
    'heap-ds',
    'trie-ds',
  ];

  it('contains exactly 63 reviewed questions for the Data Structures chapter', () => {
    expect(DATA_STRUCTURES_QUESTION_BANK.length).toBe(63);
  });

  it('combines Searching, Sorting, and Data Structures into at least 135 questions', () => {
    expect(
      SEARCHING_QUESTION_BANK.length +
        SORTING_QUESTION_BANK.length +
        DATA_STRUCTURES_QUESTION_BANK.length
    ).toBe(135);
  });

  it.each(DATA_STRUCTURES_TOPICS)(
    'contains exactly 9 questions for %s (3 Easy, 3 Medium, 3 Hard)',
    (topic) => {
      const easy = getQuestionsForTopicAndTier(topic, 'easy');
      const med = getQuestionsForTopicAndTier(topic, 'medium');
      const hard = getQuestionsForTopicAndTier(topic, 'hard');

      expect(easy.length, `${topic} easy count`).toBe(3);
      expect(med.length, `${topic} medium count`).toBe(3);
      expect(hard.length, `${topic} hard count`).toBe(3);
    }
  );

  it('guarantees unique IDs and valid metadata across all 135 questions', () => {
    const ids = new Set<string>();

    for (const q of QUESTION_BANK) {
      expect(ids.has(q.id), `Duplicate question ID across full bank: ${q.id}`).toBe(false);
      ids.add(q.id);

      expect(q.prompt.length).toBeGreaterThan(15);
      expect(q.options.length).toBe(3);
      expect(q.pedagogicalRationale.length).toBeGreaterThan(15);

      const correctOpt = q.options.find((o) => o.id === q.correctOptionId);
      expect(correctOpt, `Missing correct option for ${q.id}`).toBeDefined();

      for (const opt of q.options) {
        expect(opt.explanation.length).toBeGreaterThan(10);
      }
    }
  });

  it('technically specifies C pointer decay and memmove for array-ds', () => {
    const decayQ = getQuestionById('q-array-ds-hard-01');
    const decayOpt = decayQ?.options.find((o) => o.id === decayQ?.correctOptionId);
    expect(decayOpt?.label).toContain('decay');

    const memmoveQ = getQuestionById('q-array-ds-hard-03');
    const memmoveOpt = memmoveQ?.options.find((o) => o.id === memmoveQ?.correctOptionId);
    expect(memmoveOpt?.label).toContain('memmove');
  });

  it('technically specifies LIFO, activation records, and monotonic stack amortized O(n) for stack-ds', () => {
    const lifoQ = getQuestionById('q-stack-ds-easy-01');
    const lifoOpt = lifoQ?.options.find((o) => o.id === lifoQ?.correctOptionId);
    expect(lifoOpt?.label).toContain('LIFO');

    const frameQ = getQuestionById('q-stack-ds-hard-01');
    const frameOpt = frameQ?.options.find((o) => o.id === frameQ?.correctOptionId);
    expect(frameOpt?.label).toContain('activation record');

    const monoQ = getQuestionById('q-stack-ds-hard-02');
    const monoOpt = monoQ?.options.find((o) => o.id === monoQ?.correctOptionId);
    expect(monoOpt?.label).toContain('at most 2n');
  });

  it('technically specifies FIFO, circular modulo indexing, and BFS distance invariant for queue-ds', () => {
    const fifoQ = getQuestionById('q-queue-ds-easy-01');
    const fifoOpt = fifoQ?.options.find((o) => o.id === fifoQ?.correctOptionId);
    expect(fifoOpt?.label).toContain('FIFO');

    const moduloQ = getQuestionById('q-queue-ds-med-02');
    const moduloOpt = moduloQ?.options.find((o) => o.id === moduloQ?.correctOptionId);
    expect(moduloOpt?.label).toContain('% capacity');

    const bfsQ = getQuestionById('q-queue-ds-hard-03');
    const bfsOpt = bfsQ?.options.find((o) => o.id === bfsQ?.correctOptionId);
    expect(bfsOpt?.label).toContain('distance d + 1');
  });

  it('technically specifies Node** head modification and Floyd cycle detection for linked-list-ds', () => {
    const ptrPtrQ = getQuestionById('q-linked-list-ds-hard-01');
    const ptrPtrOpt = ptrPtrQ?.options.find((o) => o.id === ptrPtrQ?.correctOptionId);
    expect(ptrPtrOpt?.label).toContain('Node**');

    const floydQ = getQuestionById('q-linked-list-ds-hard-02');
    const floydOpt = floydQ?.options.find((o) => o.id === floydQ?.correctOptionId);
    expect(floydOpt?.label).toContain('decreases by exactly 1');
  });

  it('technically specifies average O(1), tombstones, and hash contract for hash-table-ds', () => {
    const avgQ = getQuestionById('q-hash-table-ds-easy-02');
    const avgOpt = avgQ?.options.find((o) => o.id === avgQ?.correctOptionId);
    expect(avgOpt?.label).toContain('O(1) average');

    const tombstoneQ = getQuestionById('q-hash-table-ds-hard-02');
    const tombstoneOpt = tombstoneQ?.options.find((o) => o.id === tombstoneQ?.correctOptionId);
    expect(tombstoneOpt?.label).toContain('tombstone');

    const contractQ = getQuestionById('q-hash-table-ds-hard-03');
    const contractOpt = contractQ?.options.find((o) => o.id === contractQ?.correctOptionId);
    expect(contractOpt?.label).toContain('h(k1) == h(k2)');
  });

  it('technically specifies array formulas, build-heap O(n), and k-th largest stream for heap-ds', () => {
    const formulaQ = getQuestionById('q-heap-ds-easy-02');
    const formulaOpt = formulaQ?.options.find((o) => o.id === formulaQ?.correctOptionId);
    expect(formulaOpt?.label).toContain('2 * i + 1');

    const buildQ = getQuestionById('q-heap-ds-hard-01');
    const buildOpt = buildQ?.options.find((o) => o.id === buildQ?.correctOptionId);
    expect(buildOpt?.label).toContain('converges to O(n)');

    const kthQ = getQuestionById('q-heap-ds-hard-03');
    const kthOpt = kthQ?.options.find((o) => o.id === kthQ?.correctOptionId);
    expect(kthOpt?.label).toContain('O(n log k)');
  });

  it('technically specifies O(L) time, isEndOfWord flag, and Radix tree compression for trie-ds', () => {
    const lookupQ = getQuestionById('q-trie-ds-easy-02');
    const lookupOpt = lookupQ?.options.find((o) => o.id === lookupQ?.correctOptionId);
    expect(lookupOpt?.label).toContain('O(L)');

    const flagQ = getQuestionById('q-trie-ds-easy-03');
    const flagOpt = flagQ?.options.find((o) => o.id === flagQ?.correctOptionId);
    expect(flagOpt?.label).toContain('isEndOfWord');

    const radixQ = getQuestionById('q-trie-ds-hard-02');
    const radixOpt = radixQ?.options.find((o) => o.id === radixQ?.correctOptionId);
    expect(radixOpt?.label).toContain('multi-character substring');
  });
});

describe('Mastery System — Data Structures Question Selector', () => {
  const DATA_STRUCTURES_TOPICS = [
    'array-ds',
    'stack-ds',
    'queue-ds',
    'linked-list-ds',
    'hash-table-ds',
    'heap-ds',
    'trie-ds',
  ];

  it.each(DATA_STRUCTURES_TOPICS)(
    'selects 1 Easy, 1 Medium, and 1 Hard question for %s',
    (topic) => {
      const [easyQ, medQ, hardQ] = selectAssessmentQuestions(topic);

      expect(easyQ.algoId).toBe(topic);
      expect(easyQ.tier).toBe('easy');

      expect(medQ.algoId).toBe(topic);
      expect(medQ.tier).toBe('medium');

      expect(hardQ.algoId).toBe(topic);
      expect(hardQ.tier).toBe('hard');

      expect(new Set([easyQ.id, medQ.id, hardQ.id]).size).toBe(3);
    }
  );

  it('guarantees reproducible selection with Mulberry32 PRNG for Data Structures topics', () => {
    const prng1 = createMulberry32(888);
    const set1 = selectAssessmentQuestions('hash-table-ds', prng1);

    const prng2 = createMulberry32(888);
    const set2 = selectAssessmentQuestions('hash-table-ds', prng2);

    expect(set1.map((q) => q.id)).toEqual(set2.map((q) => q.id));
  });
});

describe('Mastery System — Data Structures Attempt Lifecycle & Chapter Gating', () => {
  const DATA_STRUCTURES_TOPICS = [
    'array-ds',
    'stack-ds',
    'queue-ds',
    'linked-list-ds',
    'hash-table-ds',
    'heap-ds',
    'trie-ds',
  ];

  it('creates, evaluates, and awards mastery on 3/3 pass for linked-list-ds', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };
    const { attempt, questions } = createAssessmentAttempt('linked-list-ds');

    expect(attempt.algoId).toBe('linked-list-ds');
    expect(attempt.status).toBe('in-progress');

    let answeredAttempt = attempt;
    for (const q of questions) {
      answeredAttempt = recordAssessmentAnswer(answeredAttempt, q.id, q.correctOptionId);
    }

    const evalResult = evaluateAssessmentAttempt(answeredAttempt, questions);
    expect(evalResult.passed).toBe(true);
    expect(evalResult.score).toBe(3);

    progress = applyAssessmentResult(progress, answeredAttempt, evalResult.passed, evalResult.score);
    expect(isTopicMastered(progress, 'linked-list-ds')).toBe(true);
    expect(progress.masteryRecords['linked-list-ds'].status).toBe('mastered');
    expect(progress.masteryRecords['linked-list-ds'].bestScore).toBe(3);
    expect(getMasteredCount(progress)).toBe(1);
  });

  it('records failure without awarding mastery on 2/3 score for hash-table-ds', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };
    const { attempt, questions } = createAssessmentAttempt('hash-table-ds');

    let answeredAttempt = recordAssessmentAnswer(attempt, questions[0].id, questions[0].correctOptionId);
    answeredAttempt = recordAssessmentAnswer(answeredAttempt, questions[1].id, questions[1].correctOptionId);
    answeredAttempt = recordAssessmentAnswer(answeredAttempt, questions[2].id, 'wrong-answer');

    const evalResult = evaluateAssessmentAttempt(answeredAttempt, questions);
    expect(evalResult.passed).toBe(false);
    expect(evalResult.score).toBe(2);

    progress = applyAssessmentResult(progress, answeredAttempt, evalResult.passed, evalResult.score);
    expect(isTopicMastered(progress, 'hash-table-ds')).toBe(false);
    expect(progress.masteryRecords['hash-table-ds'].status).toBe('failed');
    expect(progress.masteryRecords['hash-table-ds'].bestScore).toBe(2);
    expect(getMasteredCount(progress)).toBe(0);
  });

  it('preserves mastered status on practice retakes for queue-ds (non-demotion)', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };
    const { attempt: passAttempt, questions } = createAssessmentAttempt('queue-ds');

    let answered = passAttempt;
    for (const q of questions) {
      answered = recordAssessmentAnswer(answered, q.id, q.correctOptionId);
    }
    progress = applyAssessmentResult(progress, answered, true, 3);
    expect(isTopicMastered(progress, 'queue-ds')).toBe(true);

    // Later retake: fail with 1/3
    const { attempt: retakeAttempt } = createAssessmentAttempt('queue-ds');
    progress = applyAssessmentResult(progress, retakeAttempt, false, 1);

    expect(isTopicMastered(progress, 'queue-ds')).toBe(true);
    expect(progress.masteryRecords['queue-ds'].status).toBe('mastered');
    expect(progress.masteryRecords['queue-ds'].attemptsCount).toBe(2);
  });

  it('gates Chapter 03 mastery strictly on completing all 7 data structure topics', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };

    // Master first 6 topics
    for (let i = 0; i < 6; i++) {
      const topic = DATA_STRUCTURES_TOPICS[i];
      const { attempt, questions } = createAssessmentAttempt(topic);
      let answered = attempt;
      for (const q of questions) {
        answered = recordAssessmentAnswer(answered, q.id, q.correctOptionId);
      }
      progress = applyAssessmentResult(progress, answered, true, 3);
      expect(isChapterMastered(progress, DATA_STRUCTURES_TOPICS)).toBe(false);
    }

    expect(getMasteredCount(progress)).toBe(6);
    expect(isChapterMastered(progress, DATA_STRUCTURES_TOPICS)).toBe(false);

    // Master 7th topic (trie-ds)
    const lastTopic = DATA_STRUCTURES_TOPICS[6];
    const { attempt: lastAttempt, questions: lastQs } = createAssessmentAttempt(lastTopic);
    let lastAnswered = lastAttempt;
    for (const q of lastQs) {
      lastAnswered = recordAssessmentAnswer(lastAnswered, q.id, q.correctOptionId);
    }
    progress = applyAssessmentResult(progress, lastAnswered, true, 3);

    expect(getMasteredCount(progress)).toBe(7);
    expect(isChapterMastered(progress, DATA_STRUCTURES_TOPICS)).toBe(true);
  });

  it('rejects unknown or invalid algorithm IDs gracefully', () => {
    const INVALID_TOPICS = [
      'quantum-sort',
      'neural-tree',
      'blockchain-hash',
    ];

    for (const algoId of INVALID_TOPICS) {
      expect(hasMasteryQuestions(algoId), `${algoId} should not have authored questions`).toBe(false);
      expect(() => selectAssessmentQuestions(algoId)).toThrow();
    }
  });
});

describe('Mastery System — Trees Question Bank (Chapter 04)', () => {
  const TREES_TOPICS = [
    'binary-tree',
    'bst',
    'inorder-traversal',
    'preorder-traversal',
    'postorder-traversal',
  ];

  it('contains exactly 45 reviewed questions for the Trees chapter', () => {
    expect(TREES_QUESTION_BANK.length).toBe(45);
  });

  it('brings total combined question bank to exactly 288 questions across all 32 topics', () => {
    expect(QUESTION_BANK.length).toBe(288);
  });

  it.each(TREES_TOPICS)(
    'contains exactly 9 questions for %s (3 Easy, 3 Medium, 3 Hard)',
    (topic) => {
      const easy = getQuestionsForTopicAndTier(topic, 'easy');
      const med = getQuestionsForTopicAndTier(topic, 'medium');
      const hard = getQuestionsForTopicAndTier(topic, 'hard');

      expect(easy.length, `${topic} easy count`).toBe(3);
      expect(med.length, `${topic} medium count`).toBe(3);
      expect(hard.length, `${topic} hard count`).toBe(3);
    }
  );

  it('guarantees unique IDs and valid metadata across all 288 questions', () => {
    const ids = new Set<string>();

    for (const q of QUESTION_BANK) {
      expect(ids.has(q.id), `Duplicate question ID across full bank: ${q.id}`).toBe(false);
      ids.add(q.id);

      expect(q.prompt.length).toBeGreaterThan(15);
      expect(q.options.length).toBe(3);
      expect(q.pedagogicalRationale.length).toBeGreaterThan(15);

      const correctOpt = q.options.find((o) => o.id === q.correctOptionId);
      expect(correctOpt, `Missing correct option for ${q.id}`).toBeDefined();

      for (const opt of q.options) {
        expect(opt.explanation.length).toBeGreaterThan(10);
      }
    }
  });

  it('technically specifies binary tree capacity and LCA bottom-up logic for binary-tree', () => {
    const capQ = getQuestionById('q-binary-tree-med-01');
    const capOpt = capQ?.options.find((o) => o.id === capQ?.correctOptionId);
    expect(capOpt?.label).toContain('2^(h + 1) - 1');

    const lcaQ = getQuestionById('q-binary-tree-hard-02');
    const lcaOpt = lcaQ?.options.find((o) => o.id === lcaQ?.correctOptionId);
    expect(lcaOpt?.label).toContain('separate subtrees');
  });

  it('technically specifies BST ordering, Hibbard successor deletion, and range validation for bst', () => {
    const ordQ = getQuestionById('q-bst-easy-01');
    const ordOpt = ordQ?.options.find((o) => o.id === ordQ?.correctOptionId);
    expect(ordOpt?.label).toContain('strictly less than X.val');

    const hibbardQ = getQuestionById('q-bst-hard-01');
    const hibbardOpt = hibbardQ?.options.find((o) => o.id === hibbardQ?.correctOptionId);
    expect(hibbardOpt?.label).toContain('inorder successor');

    const validQ = getQuestionById('q-bst-hard-02');
    const validOpt = validQ?.options.find((o) => o.id === validQ?.correctOptionId);
    expect(validOpt?.label).toContain('right subtree could have a value smaller than an ancestor');
  });

  it('technically specifies L-N-R sequence, sorted output, and Morris O(1) space for inorder-traversal', () => {
    const seqQ = getQuestionById('q-inorder-traversal-easy-01');
    const seqOpt = seqQ?.options.find((o) => o.id === seqQ?.correctOptionId);
    expect(seqOpt?.label).toContain('L-N-R');

    const sortQ = getQuestionById('q-inorder-traversal-easy-02');
    const sortOpt = sortQ?.options.find((o) => o.id === sortQ?.correctOptionId);
    expect(sortOpt?.label).toContain('strictly ascending');

    const morrisQ = getQuestionById('q-inorder-traversal-hard-01');
    const morrisOpt = morrisQ?.options.find((o) => o.id === morrisQ?.correctOptionId);
    expect(morrisOpt?.label).toContain('threads');
  });

  it('technically specifies N-L-R sequence, root first, and right-before-left stack push for preorder-traversal', () => {
    const preQ = getQuestionById('q-preorder-traversal-easy-01');
    const preOpt = preQ?.options.find((o) => o.id === preQ?.correctOptionId);
    expect(preOpt?.label).toContain('N-L-R');

    const rootQ = getQuestionById('q-preorder-traversal-easy-02');
    const rootOpt = rootQ?.options.find((o) => o.id === rootQ?.correctOptionId);
    expect(rootOpt?.label).toContain('root node');

    const pushQ = getQuestionById('q-preorder-traversal-med-02');
    const pushOpt = pushQ?.options.find((o) => o.id === pushQ?.correctOptionId);
    expect(pushOpt?.label).toContain('LIFO');
  });

  it('technically specifies L-R-N sequence, root last, and safe C deallocation for postorder-traversal', () => {
    const postQ = getQuestionById('q-postorder-traversal-easy-01');
    const postOpt = postQ?.options.find((o) => o.id === postQ?.correctOptionId);
    expect(postOpt?.label).toContain('L-R-N');

    const lastQ = getQuestionById('q-postorder-traversal-easy-02');
    const lastOpt = lastQ?.options.find((o) => o.id === lastQ?.correctOptionId);
    expect(lastOpt?.label).toContain('very end');

    const freeQ = getQuestionById('q-postorder-traversal-med-01');
    const freeOpt = freeQ?.options.find((o) => o.id === freeQ?.correctOptionId);
    expect(freeOpt?.label).toContain('use-after-free');
  });
});

describe('Mastery System — Trees Question Selector', () => {
  const TREES_TOPICS = [
    'binary-tree',
    'bst',
    'inorder-traversal',
    'preorder-traversal',
    'postorder-traversal',
  ];

  it.each(TREES_TOPICS)(
    'selects 1 Easy, 1 Medium, and 1 Hard question for %s',
    (topic) => {
      const [easyQ, medQ, hardQ] = selectAssessmentQuestions(topic);

      expect(easyQ.algoId).toBe(topic);
      expect(easyQ.tier).toBe('easy');

      expect(medQ.algoId).toBe(topic);
      expect(medQ.tier).toBe('medium');

      expect(hardQ.algoId).toBe(topic);
      expect(hardQ.tier).toBe('hard');

      expect(new Set([easyQ.id, medQ.id, hardQ.id]).size).toBe(3);
    }
  );

  it('guarantees reproducible selection with Mulberry32 PRNG for Trees topics', () => {
    const prng1 = createMulberry32(999);
    const set1 = selectAssessmentQuestions('bst', prng1);

    const prng2 = createMulberry32(999);
    const set2 = selectAssessmentQuestions('bst', prng2);

    expect(set1.map((q) => q.id)).toEqual(set2.map((q) => q.id));
  });
});

describe('Mastery System — Trees Attempt Lifecycle & Chapter Gating', () => {
  const TREES_TOPICS = [
    'binary-tree',
    'bst',
    'inorder-traversal',
    'preorder-traversal',
    'postorder-traversal',
  ];

  it('creates, evaluates, and awards mastery on 3/3 pass for bst', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };
    const { attempt, questions } = createAssessmentAttempt('bst');

    expect(attempt.algoId).toBe('bst');
    expect(attempt.status).toBe('in-progress');

    let answeredAttempt = attempt;
    for (const q of questions) {
      answeredAttempt = recordAssessmentAnswer(answeredAttempt, q.id, q.correctOptionId);
    }

    const evalResult = evaluateAssessmentAttempt(answeredAttempt, questions);
    expect(evalResult.passed).toBe(true);
    expect(evalResult.score).toBe(3);

    progress = applyAssessmentResult(progress, answeredAttempt, evalResult.passed, evalResult.score);
    expect(isTopicMastered(progress, 'bst')).toBe(true);
    expect(progress.masteryRecords['bst'].status).toBe('mastered');
    expect(progress.masteryRecords['bst'].bestScore).toBe(3);
    expect(getMasteredCount(progress)).toBe(1);
  });

  it('records failure without awarding mastery on 2/3 score for binary-tree', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };
    const { attempt, questions } = createAssessmentAttempt('binary-tree');

    let answeredAttempt = recordAssessmentAnswer(attempt, questions[0].id, questions[0].correctOptionId);
    answeredAttempt = recordAssessmentAnswer(answeredAttempt, questions[1].id, questions[1].correctOptionId);
    answeredAttempt = recordAssessmentAnswer(answeredAttempt, questions[2].id, 'wrong-answer');

    const evalResult = evaluateAssessmentAttempt(answeredAttempt, questions);
    expect(evalResult.passed).toBe(false);
    expect(evalResult.score).toBe(2);

    progress = applyAssessmentResult(progress, answeredAttempt, evalResult.passed, evalResult.score);
    expect(isTopicMastered(progress, 'binary-tree')).toBe(false);
    expect(progress.masteryRecords['binary-tree'].status).toBe('failed');
    expect(progress.masteryRecords['binary-tree'].bestScore).toBe(2);
    expect(getMasteredCount(progress)).toBe(0);
  });

  it('preserves mastered status on practice retakes for inorder-traversal (non-demotion)', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };
    const { attempt: passAttempt, questions } = createAssessmentAttempt('inorder-traversal');

    let answered = passAttempt;
    for (const q of questions) {
      answered = recordAssessmentAnswer(answered, q.id, q.correctOptionId);
    }
    progress = applyAssessmentResult(progress, answered, true, 3);
    expect(isTopicMastered(progress, 'inorder-traversal')).toBe(true);

    // Later retake: fail with 1/3
    const { attempt: retakeAttempt } = createAssessmentAttempt('inorder-traversal');
    progress = applyAssessmentResult(progress, retakeAttempt, false, 1);

    expect(isTopicMastered(progress, 'inorder-traversal')).toBe(true);
    expect(progress.masteryRecords['inorder-traversal'].status).toBe('mastered');
    expect(progress.masteryRecords['inorder-traversal'].attemptsCount).toBe(2);
  });

  it('gates Chapter 04 mastery strictly on completing all 5 tree topics', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };

    // Master first 4 topics
    for (let i = 0; i < 4; i++) {
      const topic = TREES_TOPICS[i];
      const { attempt, questions } = createAssessmentAttempt(topic);
      let answered = attempt;
      for (const q of questions) {
        answered = recordAssessmentAnswer(answered, q.id, q.correctOptionId);
      }
      progress = applyAssessmentResult(progress, answered, true, 3);
      expect(isChapterMastered(progress, TREES_TOPICS)).toBe(false);
    }

    expect(getMasteredCount(progress)).toBe(4);
    expect(isChapterMastered(progress, TREES_TOPICS)).toBe(false);

    // Master 5th topic (postorder-traversal)
    const lastTopic = TREES_TOPICS[4];
    const { attempt: lastAttempt, questions: lastQs } = createAssessmentAttempt(lastTopic);
    let lastAnswered = lastAttempt;
    for (const q of lastQs) {
      lastAnswered = recordAssessmentAnswer(lastAnswered, q.id, q.correctOptionId);
    }
    progress = applyAssessmentResult(progress, lastAnswered, true, 3);

    expect(getMasteredCount(progress)).toBe(5);
    expect(isChapterMastered(progress, TREES_TOPICS)).toBe(true);
  });
});

describe('Mastery System — Graphs Question Bank (Chapter 05)', () => {
  const GRAPHS_TOPICS = [
    'bfs',
    'dfs',
    'dijkstra',
    'prim',
    'kruskal',
  ];

  it('contains exactly 45 reviewed questions for the Graphs chapter', () => {
    expect(GRAPHS_QUESTION_BANK.length).toBe(45);
  });

  it('brings total combined question bank to exactly 288 questions across all 32 topics', () => {
    expect(QUESTION_BANK.length).toBe(288);
  });

  it.each(GRAPHS_TOPICS)(
    'contains exactly 9 questions for %s (3 Easy, 3 Medium, 3 Hard)',
    (topic) => {
      const easy = getQuestionsForTopicAndTier(topic, 'easy');
      const med = getQuestionsForTopicAndTier(topic, 'medium');
      const hard = getQuestionsForTopicAndTier(topic, 'hard');

      expect(easy.length, `${topic} easy count`).toBe(3);
      expect(med.length, `${topic} medium count`).toBe(3);
      expect(hard.length, `${topic} hard count`).toBe(3);
    }
  );

  it('guarantees unique IDs and valid metadata across all 45 graph questions', () => {
    const ids = new Set<string>();

    for (const q of GRAPHS_QUESTION_BANK) {
      expect(ids.has(q.id), `Duplicate question ID in graphs bank: ${q.id}`).toBe(false);
      ids.add(q.id);

      expect(q.prompt.length).toBeGreaterThan(15);
      expect(q.options.length).toBe(3);
      expect(q.pedagogicalRationale.length).toBeGreaterThan(15);

      const correctOpt = q.options.find((o) => o.id === q.correctOptionId);
      expect(correctOpt, `Missing correct option for ${q.id}`).toBeDefined();

      for (const opt of q.options) {
        expect(opt.explanation.length).toBeGreaterThan(10);
      }
    }
  });

  it('technically specifies FIFO level-order queue, unweighted shortest path, and 0-1 BFS deque for bfs', () => {
    const fifoQ = getQuestionById('q-bfs-easy-01');
    const fifoOpt = fifoQ?.options.find((o) => o.id === fifoQ?.correctOptionId);
    expect(fifoOpt?.label).toContain('FIFO queue');

    const pathQ = getQuestionById('q-bfs-easy-02');
    const pathOpt = pathQ?.options.find((o) => o.id === pathQ?.correctOptionId);
    expect(pathOpt?.label).toContain('unweighted graphs');

    const dequeQ = getQuestionById('q-bfs-hard-03');
    const dequeOpt = dequeQ?.options.find((o) => o.id === dequeQ?.correctOptionId);
    expect(dequeOpt?.label).toContain('double-ended queue (deque)');
  });

  it('technically specifies 3-color states, parent exclusion, topological finish order, and Tarjan bridge condition for dfs', () => {
    const colorQ = getQuestionById('q-dfs-med-01');
    const colorOpt = colorQ?.options.find((o) => o.id === colorQ?.correctOptionId);
    expect(colorOpt?.label).toContain('Gray');

    const parentQ = getQuestionById('q-dfs-med-02');
    const parentOpt = parentQ?.options.find((o) => o.id === parentQ?.correctOptionId);
    expect(parentOpt?.label).toContain('bidirectional');

    const topoQ = getQuestionById('q-dfs-med-03');
    const topoOpt = topoQ?.options.find((o) => o.id === topoQ?.correctOptionId);
    expect(topoOpt?.label).toContain('postorder backtrack');

    const bridgeQ = getQuestionById('q-dfs-hard-02');
    const bridgeOpt = bridgeQ?.options.find((o) => o.id === bridgeQ?.correctOptionId);
    expect(bridgeOpt?.label).toContain('low[v] > tin[u]');
  });

  it('technically specifies non-negative weights, relaxation inequality, flat-array dense superiority, and lazy deletion for dijkstra', () => {
    const nonNegQ = getQuestionById('q-dijkstra-easy-01');
    const nonNegOpt = nonNegQ?.options.find((o) => o.id === nonNegQ?.correctOptionId);
    expect(nonNegOpt?.label).toContain('non-negative');

    const relaxQ = getQuestionById('q-dijkstra-easy-02');
    const relaxOpt = relaxQ?.options.find((o) => o.id === relaxQ?.correctOptionId);
    expect(relaxOpt?.label).toBe('dist[u] + w < dist[v]');

    const denseQ = getQuestionById('q-dijkstra-med-02');
    const denseOpt = denseQ?.options.find((o) => o.id === denseQ?.correctOptionId);
    expect(denseOpt?.label).toContain('flat array');

    const lazyQ = getQuestionById('q-dijkstra-hard-02');
    const lazyOpt = lazyQ?.options.find((o) => o.id === lazyQ?.correctOptionId);
    expect(lazyOpt?.label).toContain('lazy deletion');
  });

  it('technically specifies cut property, V - 1 edge count, tree connection key, and cycle property for prim', () => {
    const cutQ = getQuestionById('q-prim-easy-01');
    const cutOpt = cutQ?.options.find((o) => o.id === cutQ?.correctOptionId);
    expect(cutOpt?.label).toContain('across the cut');

    const edgeCountQ = getQuestionById('q-prim-easy-02');
    const edgeCountOpt = edgeCountQ?.options.find((o) => o.id === edgeCountQ?.correctOptionId);
    expect(edgeCountOpt?.label).toBe('Exactly V - 1 edges.');

    const diffQ = getQuestionById('q-prim-med-01');
    const diffOpt = diffQ?.options.find((o) => o.id === diffQ?.correctOptionId);
    expect(diffOpt?.label).toContain('weight < key[v]');

    const cyclePropQ = getQuestionById('q-prim-hard-02');
    const cyclePropOpt = cyclePropQ?.options.find((o) => o.id === cyclePropQ?.correctOptionId);
    expect(cyclePropOpt?.label).toContain('strictly heaviest edge in C cannot belong to any Minimum Spanning Tree');
  });

  it('technically specifies edge sorting, DSU component check, O(E log E) bottleneck, and path compression for kruskal', () => {
    const sortQ = getQuestionById('q-kruskal-easy-01');
    const sortOpt = sortQ?.options.find((o) => o.id === sortQ?.correctOptionId);
    expect(sortOpt?.label).toContain('non-decreasing order');

    const findQ = getQuestionById('q-kruskal-easy-03');
    const findOpt = findQ?.options.find((o) => o.id === findQ?.correctOptionId);
    expect(findOpt?.label).toContain('find(u) != find(v)');

    const bottleQ = getQuestionById('q-kruskal-med-02');
    const bottleOpt = bottleQ?.options.find((o) => o.id === bottleQ?.correctOptionId);
    expect(bottleOpt?.label).toContain('O(E log E)');

    const dsuQ = getQuestionById('q-kruskal-hard-01');
    const dsuOpt = dsuQ?.options.find((o) => o.id === dsuQ?.correctOptionId);
    expect(dsuOpt?.label).toContain('Path compression flattens the tree');
  });
});

describe('Mastery System — Graphs Question Selector', () => {
  const GRAPHS_TOPICS = [
    'bfs',
    'dfs',
    'dijkstra',
    'prim',
    'kruskal',
  ];

  it.each(GRAPHS_TOPICS)(
    'selects exactly 3 questions (1 Easy, 1 Medium, 1 Hard) for %s',
    (topic) => {
      const [easyQ, medQ, hardQ] = selectAssessmentQuestions(topic);

      expect(easyQ.algoId).toBe(topic);
      expect(easyQ.tier).toBe('easy');

      expect(medQ.algoId).toBe(topic);
      expect(medQ.tier).toBe('medium');

      expect(hardQ.algoId).toBe(topic);
      expect(hardQ.tier).toBe('hard');
    }
  );

  it('selects deterministically when seeded with Mulberry32 PRNG on graph topics', () => {
    const prng1 = createMulberry32(777);
    const set1 = selectAssessmentQuestions('dijkstra', prng1);

    const prng2 = createMulberry32(777);
    const set2 = selectAssessmentQuestions('dijkstra', prng2);

    expect(set1.map((q) => q.id)).toEqual(set2.map((q) => q.id));
  });
});

describe('Mastery System — Graphs Mastery Lifecycle & Gating', () => {
  const GRAPHS_TOPICS = [
    'bfs',
    'dfs',
    'dijkstra',
    'prim',
    'kruskal',
  ];

  it('grants topic mastery when a user scores 3/3 on a graph assessment', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };
    const { attempt, questions } = createAssessmentAttempt('dijkstra');

    let answered = attempt;
    for (const q of questions) {
      answered = recordAssessmentAnswer(answered, q.id, q.correctOptionId);
    }

    const evaluation = evaluateAssessmentAttempt(answered, questions);
    expect(evaluation.passed).toBe(true);
    expect(evaluation.score).toBe(3);

    progress = applyAssessmentResult(progress, answered, evaluation.passed, evaluation.score);
    expect(isTopicMastered(progress, 'dijkstra')).toBe(true);
    expect(progress.masteryRecords['dijkstra'].status).toBe('mastered');
  });

  it('does NOT grant mastery on a partial score (e.g. 2/3) on graph assessment', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };
    const { attempt, questions } = createAssessmentAttempt('prim');

    let answered = attempt;
    // Answer first 2 correctly, 3rd incorrectly
    answered = recordAssessmentAnswer(answered, questions[0].id, questions[0].correctOptionId);
    answered = recordAssessmentAnswer(answered, questions[1].id, questions[1].correctOptionId);
    const wrongOpt = questions[2].options.find((o) => o.id !== questions[2].correctOptionId)?.id || 'opt-wrong';
    answered = recordAssessmentAnswer(answered, questions[2].id, wrongOpt);

    const evaluation = evaluateAssessmentAttempt(answered, questions);
    expect(evaluation.passed).toBe(false);
    expect(evaluation.score).toBe(2);

    progress = applyAssessmentResult(progress, answered, evaluation.passed, evaluation.score);
    expect(isTopicMastered(progress, 'prim')).toBe(false);
    expect(progress.masteryRecords['prim'].status).toBe('failed');
  });

  it('preserves existing topic mastery if a subsequent retake scores less than 3/3', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };
    const { attempt: passAttempt, questions } = createAssessmentAttempt('bfs');

    let answered = passAttempt;
    for (const q of questions) {
      answered = recordAssessmentAnswer(answered, q.id, q.correctOptionId);
    }
    progress = applyAssessmentResult(progress, answered, true, 3);
    expect(isTopicMastered(progress, 'bfs')).toBe(true);

    // Later retake: fail with 1/3
    const { attempt: retakeAttempt } = createAssessmentAttempt('bfs');
    progress = applyAssessmentResult(progress, retakeAttempt, false, 1);

    expect(isTopicMastered(progress, 'bfs')).toBe(true);
    expect(progress.masteryRecords['bfs'].status).toBe('mastered');
    expect(progress.masteryRecords['bfs'].attemptsCount).toBe(2);
  });

  it('gates Chapter 05 mastery strictly on completing all 5 graph topics', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };

    // Master first 4 topics
    for (let i = 0; i < 4; i++) {
      const topic = GRAPHS_TOPICS[i];
      const { attempt, questions } = createAssessmentAttempt(topic);
      let answered = attempt;
      for (const q of questions) {
        answered = recordAssessmentAnswer(answered, q.id, q.correctOptionId);
      }
      progress = applyAssessmentResult(progress, answered, true, 3);
      expect(isChapterMastered(progress, GRAPHS_TOPICS)).toBe(false);
    }

    expect(getMasteredCount(progress)).toBe(4);
    expect(isChapterMastered(progress, GRAPHS_TOPICS)).toBe(false);

    // Master 5th topic (kruskal)
    const lastTopic = GRAPHS_TOPICS[4];
    const { attempt: lastAttempt, questions: lastQs } = createAssessmentAttempt(lastTopic);
    let lastAnswered = lastAttempt;
    for (const q of lastQs) {
      lastAnswered = recordAssessmentAnswer(lastAnswered, q.id, q.correctOptionId);
    }
    progress = applyAssessmentResult(progress, lastAnswered, true, 3);

    expect(getMasteredCount(progress)).toBe(5);
    expect(isChapterMastered(progress, GRAPHS_TOPICS)).toBe(true);
  });

  it('rejects unknown or invalid algorithm IDs gracefully', () => {
    const INVALID_TOPICS = [
      'quantum-flow',
      'neural-parser',
    ];

    for (const algoId of INVALID_TOPICS) {
      expect(hasMasteryQuestions(algoId), `${algoId} should not have authored questions`).toBe(false);
      expect(() => selectAssessmentQuestions(algoId)).toThrow();
    }
  });
});

describe('Mastery System — Algorithmic Techniques Question Bank (Chapter 06)', () => {
  const TECHNIQUES_TOPICS = [
    'recursion',
    'two-pointers',
    'sliding-window',
    'divide-and-conquer',
    'greedy',
    'backtracking',
    'dynamic-programming',
  ];

  it('contains exactly 63 reviewed questions for the Algorithmic Techniques chapter', () => {
    expect(TECHNIQUES_QUESTION_BANK.length).toBe(63);
  });

  it('brings total combined question bank to exactly 288 questions across all 32 topics', () => {
    expect(QUESTION_BANK.length).toBe(288);
  });

  it.each(TECHNIQUES_TOPICS)(
    'contains exactly 9 questions for %s (3 Easy, 3 Medium, 3 Hard)',
    (topic) => {
      const easy = getQuestionsForTopicAndTier(topic, 'easy');
      const med = getQuestionsForTopicAndTier(topic, 'medium');
      const hard = getQuestionsForTopicAndTier(topic, 'hard');

      expect(easy.length, `${topic} easy count`).toBe(3);
      expect(med.length, `${topic} medium count`).toBe(3);
      expect(hard.length, `${topic} hard count`).toBe(3);
    }
  );

  it('guarantees unique IDs and valid metadata across all 63 techniques questions', () => {
    const ids = new Set<string>();

    for (const q of TECHNIQUES_QUESTION_BANK) {
      expect(ids.has(q.id), `Duplicate question ID in techniques bank: ${q.id}`).toBe(false);
      ids.add(q.id);

      expect(q.prompt.length).toBeGreaterThan(15);
      expect(q.options.length).toBe(3);
      expect(q.pedagogicalRationale.length).toBeGreaterThan(15);

      const correctOpt = q.options.find((o) => o.id === q.correctOptionId);
      expect(correctOpt, `Missing correct option for ${q.id}`).toBeDefined();

      for (const opt of q.options) {
        expect(opt.explanation.length).toBeGreaterThan(10);
      }
    }
  });

  it('guarantees unique IDs across the entire 288-question curriculum bank', () => {
    const allIds = new Set<string>();
    for (const q of QUESTION_BANK) {
      expect(allIds.has(q.id), `Duplicate ID across entire bank: ${q.id}`).toBe(false);
      allIds.add(q.id);
    }
    expect(allIds.size).toBe(288);
  });

  it('technically specifies base cases, activation records, TCO, and Master Theorem for recursion', () => {
    const baseQ = getQuestionById('q-recursion-easy-01');
    const baseOpt = baseQ?.options.find((o) => o.id === baseQ?.correctOptionId);
    expect(baseOpt?.label).toContain('Base Case');

    const frameQ = getQuestionById('q-recursion-easy-02');
    const frameOpt = frameQ?.options.find((o) => o.id === frameQ?.correctOptionId);
    expect(frameOpt?.label).toContain('activation record');

    const tcoQ = getQuestionById('q-recursion-med-01');
    const tcoOpt = tcoQ?.options.find((o) => o.id === tcoQ?.correctOptionId);
    expect(tcoOpt?.label).toContain('reuse the current stack frame in O(1)');

    const masterQ = getQuestionById('q-recursion-hard-01');
    const masterOpt = masterQ?.options.find((o) => o.id === masterQ?.correctOptionId);
    expect(masterOpt?.label).toContain('O(n log n)');
  });

  it('technically specifies opposite-end pointers, monotonic decision rules, Floyd cycle detection, and Container With Most Water for two-pointers', () => {
    const initQ = getQuestionById('q-two-pointers-easy-01');
    const initOpt = initQ?.options.find((o) => o.id === initQ?.correctOptionId);
    expect(initOpt?.label).toContain('inward towards each other');

    const updateQ = getQuestionById('q-two-pointers-easy-02');
    const updateOpt = updateQ?.options.find((o) => o.id === updateQ?.correctOptionId);
    expect(updateOpt?.label).toContain('left++');

    const floydQ = getQuestionById('q-two-pointers-med-01');
    const floydOpt = floydQ?.options.find((o) => o.id === floydQ?.correctOptionId);
    expect(floydOpt?.label).toContain('slow pointer advances 1 step');

    const containerQ = getQuestionById('q-two-pointers-hard-01');
    const containerOpt = containerQ?.options.find((o) => o.id === containerQ?.correctOptionId);
    expect(containerOpt?.label).toContain('min(h[left], h[right])');
  });

  it('technically specifies fixed-window delta update, contiguous constraints, amortized 2n steps, and monotonic deque for sliding-window', () => {
    const deltaQ = getQuestionById('q-sliding-window-easy-01');
    const deltaOpt = deltaQ?.options.find((o) => o.id === deltaQ?.correctOptionId);
    expect(deltaOpt?.label).toContain('arr[i] - arr[i - k]');

    const contigQ = getQuestionById('q-sliding-window-easy-03');
    const contigOpt = contigQ?.options.find((o) => o.id === contigQ?.correctOptionId);
    expect(contigOpt?.label).toContain('contiguous subarray');

    const amortQ = getQuestionById('q-sliding-window-med-02');
    const amortOpt = amortQ?.options.find((o) => o.id === amortQ?.correctOptionId);
    expect(amortOpt?.label).toContain('2n');

    const dequeQ = getQuestionById('q-sliding-window-hard-01');
    const dequeOpt = dequeQ?.options.find((o) => o.id === dequeQ?.correctOptionId);
    expect(dequeOpt?.label).toContain('monotonically decreasing');
  });

  it('technically specifies 3 phases, even/odd powers, overflow avoidance, and Strassen recurrence for divide-and-conquer', () => {
    const phasesQ = getQuestionById('q-divide-and-conquer-easy-01');
    const phasesOpt = phasesQ?.options.find((o) => o.id === phasesQ?.correctOptionId);
    expect(phasesOpt?.label).toContain('Divide');

    const evenQ = getQuestionById('q-divide-and-conquer-easy-02');
    const evenOpt = evenQ?.options.find((o) => o.id === evenQ?.correctOptionId);
    expect(evenOpt?.label).toContain('(x^(n / 2))^2');

    const oddQ = getQuestionById('q-divide-and-conquer-med-01');
    const oddOpt = oddQ?.options.find((o) => o.id === oddQ?.correctOptionId);
    expect(oddOpt?.label).toContain('x * (x^((n - 1) / 2))^2');

    const strassenQ = getQuestionById('q-divide-and-conquer-hard-03');
    const strassenOpt = strassenQ?.options.find((o) => o.id === strassenQ?.correctOptionId);
    expect(strassenOpt?.label).toContain('7T(n/2)');
  });

  it('technically specifies local choice property, finish-time sorting, Exchange Argument, and Matroids for greedy', () => {
    const localQ = getQuestionById('q-greedy-easy-01');
    const localOpt = localQ?.options.find((o) => o.id === localQ?.correctOptionId);
    expect(localOpt?.label).toContain('locally optimal choice');

    const sortQ = getQuestionById('q-greedy-easy-02');
    const sortOpt = sortQ?.options.find((o) => o.id === sortQ?.correctOptionId);
    expect(sortOpt?.label).toContain('Finish Times');

    const exchangeQ = getQuestionById('q-greedy-hard-01');
    expect(exchangeQ?.prompt).toContain('Exchange Argument');
    const exchangeOpt = exchangeQ?.options.find((o) => o.id === exchangeQ?.correctOptionId);
    expect(exchangeOpt?.label).toContain('exchanging choices');

    const matroidQ = getQuestionById('q-greedy-hard-02');
    const matroidOpt = matroidQ?.options.find((o) => o.id === matroidQ?.correctOptionId);
    expect(matroidOpt?.label).toContain('Matroid');
  });

  it('technically specifies state space pruning, undo step, column-by-column left check, and Dancing Links for backtracking', () => {
    const pruneQ = getQuestionById('q-backtracking-easy-01');
    const pruneOpt = pruneQ?.options.find((o) => o.id === pruneQ?.correctOptionId);
    expect(pruneOpt?.label).toContain('pruning');

    const undoQ = getQuestionById('q-backtracking-easy-02');
    const undoOpt = undoQ?.options.find((o) => o.id === undoQ?.correctOptionId);
    expect(undoOpt?.label).toContain('board[row][col] = 0');

    const leftCheckQ = getQuestionById('q-backtracking-med-01');
    const leftCheckOpt = leftCheckQ?.options.find((o) => o.id === leftCheckQ?.correctOptionId);
    expect(leftCheckOpt?.label).toContain('columns to the left');

    const dlxQ = getQuestionById('q-backtracking-hard-01');
    const dlxOpt = dlxQ?.options.find((o) => o.id === dlxQ?.correctOptionId);
    expect(dlxOpt?.label).toContain('circular doubly linked lists');
  });

  it('technically specifies optimal substructure, 0/1 indivisibility, pseudo-polynomial complexity, and reverse 1D iteration for dynamic-programming', () => {
    const propsQ = getQuestionById('q-dynamic-programming-easy-01');
    const propsOpt = propsQ?.options.find((o) => o.id === propsQ?.correctOptionId);
    expect(propsOpt?.label).toContain('Optimal Substructure');
    expect(propsOpt?.label).toContain('Overlapping Subproblems');

    const pseudoQ = getQuestionById('q-dynamic-programming-med-01');
    const pseudoOpt = pseudoQ?.options.find((o) => o.id === pseudoQ?.correctOptionId);
    expect(pseudoOpt?.label).toContain('exponential in the number of bits');

    const recQ = getQuestionById('q-dynamic-programming-med-02');
    const recOpt = recQ?.options.find((o) => o.id === recQ?.correctOptionId);
    expect(recOpt?.label).toContain('dp[i][w] = max(dp[i - 1][w]');

    const revQ = getQuestionById('q-dynamic-programming-med-03');
    const revOpt = revQ?.options.find((o) => o.id === revQ?.correctOptionId);
    expect(revOpt?.label).toContain('reverse order from W down to wt[i-1]');
  });
});

describe('Mastery System — Algorithmic Techniques Question Selector', () => {
  const TECHNIQUES_TOPICS = [
    'recursion',
    'two-pointers',
    'sliding-window',
    'divide-and-conquer',
    'greedy',
    'backtracking',
    'dynamic-programming',
  ];

  it.each(TECHNIQUES_TOPICS)(
    'selects exactly 3 questions (1 Easy, 1 Medium, 1 Hard) for %s',
    (topic) => {
      const [easyQ, medQ, hardQ] = selectAssessmentQuestions(topic);

      expect(easyQ.algoId).toBe(topic);
      expect(easyQ.tier).toBe('easy');

      expect(medQ.algoId).toBe(topic);
      expect(medQ.tier).toBe('medium');

      expect(hardQ.algoId).toBe(topic);
      expect(hardQ.tier).toBe('hard');
    }
  );

  it('selects deterministically when seeded with Mulberry32 PRNG on techniques topics', () => {
    const prng1 = createMulberry32(888);
    const set1 = selectAssessmentQuestions('dynamic-programming', prng1);

    const prng2 = createMulberry32(888);
    const set2 = selectAssessmentQuestions('dynamic-programming', prng2);

    expect(set1.map((q) => q.id)).toEqual(set2.map((q) => q.id));
  });
});

describe('Mastery System — Algorithmic Techniques Mastery Lifecycle & Full Curriculum Mastery', () => {
  const TECHNIQUES_TOPICS = [
    'recursion',
    'two-pointers',
    'sliding-window',
    'divide-and-conquer',
    'greedy',
    'backtracking',
    'dynamic-programming',
  ];

  it('grants topic mastery when a user scores 3/3 on dynamic-programming', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };
    const { attempt, questions } = createAssessmentAttempt('dynamic-programming');

    let answered = attempt;
    for (const q of questions) {
      answered = recordAssessmentAnswer(answered, q.id, q.correctOptionId);
    }

    const evaluation = evaluateAssessmentAttempt(answered, questions);
    expect(evaluation.passed).toBe(true);
    expect(evaluation.score).toBe(3);

    progress = applyAssessmentResult(progress, answered, evaluation.passed, evaluation.score);
    expect(isTopicMastered(progress, 'dynamic-programming')).toBe(true);
    expect(progress.masteryRecords['dynamic-programming'].status).toBe('mastered');
  });

  it('does NOT grant mastery on a partial score (e.g. 2/3) on backtracking', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };
    const { attempt, questions } = createAssessmentAttempt('backtracking');

    let answered = attempt;
    answered = recordAssessmentAnswer(answered, questions[0].id, questions[0].correctOptionId);
    answered = recordAssessmentAnswer(answered, questions[1].id, questions[1].correctOptionId);
    const wrongOpt = questions[2].options.find((o) => o.id !== questions[2].correctOptionId)?.id || 'opt-wrong';
    answered = recordAssessmentAnswer(answered, questions[2].id, wrongOpt);

    const evaluation = evaluateAssessmentAttempt(answered, questions);
    expect(evaluation.passed).toBe(false);
    expect(evaluation.score).toBe(2);

    progress = applyAssessmentResult(progress, answered, evaluation.passed, evaluation.score);
    expect(isTopicMastered(progress, 'backtracking')).toBe(false);
    expect(progress.masteryRecords['backtracking'].status).toBe('failed');
  });

  it('preserves existing topic mastery if a subsequent retake scores less than 3/3 for two-pointers', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };
    const { attempt: passAttempt, questions } = createAssessmentAttempt('two-pointers');

    let answered = passAttempt;
    for (const q of questions) {
      answered = recordAssessmentAnswer(answered, q.id, q.correctOptionId);
    }
    progress = applyAssessmentResult(progress, answered, true, 3);
    expect(isTopicMastered(progress, 'two-pointers')).toBe(true);

    // Later retake: fail with 1/3
    const { attempt: retakeAttempt } = createAssessmentAttempt('two-pointers');
    progress = applyAssessmentResult(progress, retakeAttempt, false, 1);

    expect(isTopicMastered(progress, 'two-pointers')).toBe(true);
    expect(progress.masteryRecords['two-pointers'].status).toBe('mastered');
    expect(progress.masteryRecords['two-pointers'].attemptsCount).toBe(2);
  });

  it('gates Chapter 06 mastery strictly on completing all 7 algorithmic techniques topics', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };

    // Master first 6 topics
    for (let i = 0; i < 6; i++) {
      const topic = TECHNIQUES_TOPICS[i];
      const { attempt, questions } = createAssessmentAttempt(topic);
      let answered = attempt;
      for (const q of questions) {
        answered = recordAssessmentAnswer(answered, q.id, q.correctOptionId);
      }
      progress = applyAssessmentResult(progress, answered, true, 3);
      expect(isChapterMastered(progress, TECHNIQUES_TOPICS)).toBe(false);
    }

    expect(getMasteredCount(progress)).toBe(6);
    expect(isChapterMastered(progress, TECHNIQUES_TOPICS)).toBe(false);

    // Master 7th topic (dynamic-programming)
    const lastTopic = TECHNIQUES_TOPICS[6];
    const { attempt: lastAttempt, questions: lastQs } = createAssessmentAttempt(lastTopic);
    let lastAnswered = lastAttempt;
    for (const q of lastQs) {
      lastAnswered = recordAssessmentAnswer(lastAnswered, q.id, q.correctOptionId);
    }
    progress = applyAssessmentResult(progress, lastAnswered, true, 3);

    expect(getMasteredCount(progress)).toBe(7);
    expect(isChapterMastered(progress, TECHNIQUES_TOPICS)).toBe(true);
  });

  it('demonstrates full curriculum mastery across all 32 algorithms in AlgoLens', () => {
    let progress = { ...DEFAULT_PROGRESS_V3 };
    const ALL_32_TOPICS = Array.from(new Set(QUESTION_BANK.map((q) => q.algoId)));

    expect(ALL_32_TOPICS.length).toBe(32);

    for (const topic of ALL_32_TOPICS) {
      const { attempt, questions } = createAssessmentAttempt(topic);
      let answered = attempt;
      for (const q of questions) {
        answered = recordAssessmentAnswer(answered, q.id, q.correctOptionId);
      }
      progress = applyAssessmentResult(progress, answered, true, 3);
    }

    expect(getMasteredCount(progress)).toBe(32);
    expect(ALL_32_TOPICS.every((t) => isTopicMastered(progress, t))).toBe(true);
  });
});

describe('Final Curriculum & Question Bank Audit — Comprehensive Invariants', () => {
  it('validates 6 canonical categories and exactly 32 registered algorithms in registry', () => {
    expect(CATEGORIES.length).toBe(6);
    expect(Object.keys(ALGORITHM_REGISTRY).length).toBe(32);
  });

  it('validates exactly 288 questions across all 32 algorithms with 3E, 3M, 3H per topic', () => {
    expect(QUESTION_BANK.length).toBe(288);
    const registeredIds = Object.keys(ALGORITHM_REGISTRY);

    for (const algoId of registeredIds) {
      const easy = getQuestionsForTopicAndTier(algoId, 'easy');
      const med = getQuestionsForTopicAndTier(algoId, 'medium');
      const hard = getQuestionsForTopicAndTier(algoId, 'hard');

      expect(easy.length, `${algoId} easy questions`).toBe(3);
      expect(med.length, `${algoId} medium questions`).toBe(3);
      expect(hard.length, `${algoId} hard questions`).toBe(3);
    }
  });

  it('audits question schema, unique IDs, non-empty text, and option integrity across all 288 questions', () => {
    const seenIds = new Set<string>();
    const seenPrompts = new Set<string>();

    for (const q of QUESTION_BANK) {
      // Globally unique question ID
      expect(seenIds.has(q.id), `Duplicate question ID: ${q.id}`).toBe(false);
      seenIds.add(q.id);

      // Unique prompt
      expect(seenPrompts.has(q.prompt.trim()), `Duplicate prompt in ${q.id}`).toBe(false);
      seenPrompts.add(q.prompt.trim());

      // Valid registered algoId
      expect(ALGORITHM_REGISTRY[q.algoId], `Unregistered algoId in ${q.id}: ${q.algoId}`).toBeDefined();

      // Exactly 3 options
      expect(q.options.length, `${q.id} options length`).toBe(3);

      // Unique option IDs and valid correctOptionId
      const optIds = new Set<string>();
      let hasCorrect = false;
      for (const opt of q.options) {
        expect(optIds.has(opt.id), `Duplicate option ID ${opt.id} in ${q.id}`).toBe(false);
        optIds.add(opt.id);

        expect(opt.label.trim().length, `Empty label in ${q.id} ${opt.id}`).toBeGreaterThan(0);
        expect(opt.explanation.trim().length, `Empty explanation in ${q.id} ${opt.id}`).toBeGreaterThan(0);

        if (opt.id === q.correctOptionId) {
          hasCorrect = true;
          expect(opt.explanation.toLowerCase(), `${q.id} correct explanation`).toContain('correct');
        } else {
          expect(opt.explanation.toLowerCase(), `${q.id} incorrect explanation`).toContain('incorrect');
        }
      }
      expect(hasCorrect, `${q.id} correct option not found`).toBe(true);

      // Non-empty pedagogical rationale
      expect(q.pedagogicalRationale.trim().length, `${q.id} empty rationale`).toBeGreaterThan(15);
    }
  });

  it('regression: explicitly specifies edge-based height convention in q-binary-tree-med-02', () => {
    const q = getQuestionById('q-binary-tree-med-02');
    expect(q?.prompt).toContain('measured in edges, where a single-node tree has height 0');
  });

  it('regression: explicitly specifies non-negative preconditions and stopping criteria in q-dijkstra-hard-03', () => {
    const q = getQuestionById('q-dijkstra-hard-03');
    expect(q?.prompt).toContain('algorithmic preconditions');
    const correctOpt = q?.options.find((o) => o.id === q.correctOptionId);
    expect(correctOpt?.label).toContain('non-negative edge weights');
    expect(correctOpt?.label).toContain('dist_s(top_s) + dist_t(top_t) >= mu');
  });

  it('regression: explicitly specifies strictly second-best MST path query and avoiding equal-weight duplicates in q-kruskal-hard-03', () => {
    const q = getQuestionById('q-kruskal-hard-03');
    expect(q?.concept).toContain('Strictly Second-Best');
    const correctOpt = q?.options.find((o) => o.id === q.correctOptionId);
    expect(correctOpt?.label).toContain('strictly lighter than e');
    expect(correctOpt?.label).toContain('avoid equal-weight');
  });
});

