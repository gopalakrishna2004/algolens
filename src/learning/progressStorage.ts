import type { UserProgressData } from './types';

export const PROGRESS_STORAGE_KEY = 'algolens_progress_v2';

export const DEFAULT_PROGRESS: UserProgressData = {
  completedAlgoIds: [],
  recentlyExploredIds: [],
  lastExploredAlgoId: null,
  challengeStats: {
    totalAttempted: 0,
    totalCorrect: 0,
    streak: 0,
    bestStreak: 0,
  },
};

/**
 * Validates and sanitizes unknown progress data from storage.
 */
export function sanitizeProgress(raw: unknown): UserProgressData {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_PROGRESS };
  }

  const candidate = raw as Record<string, any>;

  const completedAlgoIds = Array.isArray(candidate.completedAlgoIds)
    ? candidate.completedAlgoIds.filter((id) => typeof id === 'string')
    : [];

  const recentlyExploredIds = Array.isArray(candidate.recentlyExploredIds)
    ? candidate.recentlyExploredIds.filter((id) => typeof id === 'string').slice(0, 8)
    : [];

  const lastExploredAlgoId =
    typeof candidate.lastExploredAlgoId === 'string'
      ? candidate.lastExploredAlgoId
      : null;

  const rawStats = candidate.challengeStats && typeof candidate.challengeStats === 'object'
    ? candidate.challengeStats
    : {};

  const totalAttempted =
    typeof rawStats.totalAttempted === 'number' && rawStats.totalAttempted >= 0
      ? Math.floor(rawStats.totalAttempted)
      : 0;

  const totalCorrect =
    typeof rawStats.totalCorrect === 'number' && rawStats.totalCorrect >= 0
      ? Math.min(Math.floor(rawStats.totalCorrect), totalAttempted)
      : 0;

  const streak =
    typeof rawStats.streak === 'number' && rawStats.streak >= 0
      ? Math.floor(rawStats.streak)
      : 0;

  const bestStreak =
    typeof rawStats.bestStreak === 'number' && rawStats.bestStreak >= 0
      ? Math.floor(rawStats.bestStreak)
      : 0;

  return {
    completedAlgoIds,
    recentlyExploredIds,
    lastExploredAlgoId,
    challengeStats: {
      totalAttempted,
      totalCorrect,
      streak,
      bestStreak: Math.max(bestStreak, streak),
    },
  };
}

/**
 * Safely loads user progress from localStorage.
 */
export function loadUserProgress(): UserProgressData {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return { ...DEFAULT_PROGRESS };
    }
    const item = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!item) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(item);
    return sanitizeProgress(parsed);
  } catch {
    // If parsing fails or localStorage is restricted, fall back gracefully
    return { ...DEFAULT_PROGRESS };
  }
}

/**
 * Safely persists user progress to localStorage.
 */
export function saveUserProgress(progress: UserProgressData): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const sanitized = sanitizeProgress(progress);
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(sanitized));
  } catch {
    // Storage quota exceeded or storage disabled
  }
}

/**
 * Record viewing an algorithm.
 */
export function recordExploredAlgorithm(
  prev: UserProgressData,
  algoId: string
): UserProgressData {
  const filteredRecents = prev.recentlyExploredIds.filter((id) => id !== algoId);
  const updatedRecents = [algoId, ...filteredRecents].slice(0, 8);

  const updated: UserProgressData = {
    ...prev,
    lastExploredAlgoId: algoId,
    recentlyExploredIds: updatedRecents,
  };
  saveUserProgress(updated);
  return updated;
}

/**
 * Mark an algorithm as completed (e.g., when full execution completes).
 */
export function markAlgorithmCompleted(
  prev: UserProgressData,
  algoId: string
): UserProgressData {
  if (prev.completedAlgoIds.includes(algoId)) return prev;

  const updated: UserProgressData = {
    ...prev,
    completedAlgoIds: [...prev.completedAlgoIds, algoId],
  };
  saveUserProgress(updated);
  return updated;
}

/**
 * Record a challenge prediction result.
 */
export function recordChallengeResult(
  prev: UserProgressData,
  isCorrect: boolean
): UserProgressData {
  const totalAttempted = prev.challengeStats.totalAttempted + 1;
  const totalCorrect = prev.challengeStats.totalCorrect + (isCorrect ? 1 : 0);
  const newStreak = isCorrect ? prev.challengeStats.streak + 1 : 0;
  const bestStreak = Math.max(prev.challengeStats.bestStreak, newStreak);

  const updated: UserProgressData = {
    ...prev,
    challengeStats: {
      totalAttempted,
      totalCorrect,
      streak: newStreak,
      bestStreak,
    },
  };
  saveUserProgress(updated);
  return updated;
}

/**
 * Reset all progress data back to factory defaults.
 */
export function resetUserProgress(): UserProgressData {
  const reset = { ...DEFAULT_PROGRESS };
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
    }
  } catch {
    // ignore
  }
  return reset;
}
