import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  sanitizeProgress,
  loadUserProgress,
  saveUserProgress,
  recordExploredAlgorithm,
  markAlgorithmCompleted,
  recordChallengeResult,
  resetUserProgress,
  DEFAULT_PROGRESS,
  PROGRESS_STORAGE_KEY,
} from './progressStorage';

describe('Progress Storage & Persistence', () => {
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

  it('sanitizes empty, null, or corrupted objects gracefully', () => {
    expect(sanitizeProgress(null)).toEqual(DEFAULT_PROGRESS);
    expect(sanitizeProgress('invalid json string')).toEqual(DEFAULT_PROGRESS);
    expect(sanitizeProgress({ completedAlgoIds: 'not an array' })).toEqual(DEFAULT_PROGRESS);
  });

  it('sanitizes partially valid data while preserving correct fields', () => {
    const raw = {
      completedAlgoIds: ['linear-search', 123, 'binary-search'],
      recentlyExploredIds: ['quick-sort'],
      challengeStats: {
        totalAttempted: 10,
        totalCorrect: 8,
        streak: 3,
        bestStreak: 5,
      },
    };

    const sanitized = sanitizeProgress(raw);
    expect(sanitized.completedAlgoIds).toEqual(['linear-search', 'binary-search']);
    expect(sanitized.recentlyExploredIds).toEqual(['quick-sort']);
    expect(sanitized.challengeStats.totalAttempted).toBe(10);
    expect(sanitized.challengeStats.totalCorrect).toBe(8);
    expect(sanitized.challengeStats.streak).toBe(3);
    expect(sanitized.challengeStats.bestStreak).toBe(5);
  });

  it('records explored algorithms into recently explored list and lastExploredAlgoId', () => {
    let progress = loadUserProgress();
    expect(progress.lastExploredAlgoId).toBeNull();

    progress = recordExploredAlgorithm(progress, 'binary-search');
    expect(progress.lastExploredAlgoId).toBe('binary-search');
    expect(progress.recentlyExploredIds).toContain('binary-search');

    progress = recordExploredAlgorithm(progress, 'quick-sort');
    expect(progress.lastExploredAlgoId).toBe('quick-sort');
    expect(progress.recentlyExploredIds[0]).toBe('quick-sort');
  });

  it('marks algorithm as completed without duplicates', () => {
    let progress = loadUserProgress();
    progress = markAlgorithmCompleted(progress, 'binary-search');
    expect(progress.completedAlgoIds).toContain('binary-search');

    progress = markAlgorithmCompleted(progress, 'binary-search');
    expect(progress.completedAlgoIds.filter((id) => id === 'binary-search').length).toBe(1);
  });

  it('tracks challenge attempts, streaks, and bestStreak correctly', () => {
    let progress = loadUserProgress();
    // Correct attempt
    progress = recordChallengeResult(progress, true);
    expect(progress.challengeStats.totalAttempted).toBe(1);
    expect(progress.challengeStats.totalCorrect).toBe(1);
    expect(progress.challengeStats.streak).toBe(1);
    expect(progress.challengeStats.bestStreak).toBe(1);

    // Another correct attempt
    progress = recordChallengeResult(progress, true);
    expect(progress.challengeStats.streak).toBe(2);
    expect(progress.challengeStats.bestStreak).toBe(2);

    // Incorrect attempt resets current streak but preserves bestStreak
    progress = recordChallengeResult(progress, false);
    expect(progress.challengeStats.totalAttempted).toBe(3);
    expect(progress.challengeStats.totalCorrect).toBe(2);
    expect(progress.challengeStats.streak).toBe(0);
    expect(progress.challengeStats.bestStreak).toBe(2);
  });

  it('resets progress back to default state', () => {
    let progress = loadUserProgress();
    progress = markAlgorithmCompleted(progress, 'bubble-sort');
    saveUserProgress(progress);
    expect(mockStore[PROGRESS_STORAGE_KEY]).toBeDefined();

    const reset = resetUserProgress();
    expect(reset.completedAlgoIds).toHaveLength(0);
    expect(mockStore[PROGRESS_STORAGE_KEY]).toBeUndefined();
  });
});
