import type {
  ActiveAssessmentState,
  TopicMasteryRecord,
  UserProgressDataV2,
  UserProgressDataV3,
} from './types';

export const PROGRESS_STORAGE_KEY_V2 = 'algolens_progress_v2';
export const PROGRESS_STORAGE_KEY_V3 = 'algolens_progress_v3';
export const PROGRESS_STORAGE_KEY = PROGRESS_STORAGE_KEY_V3;

export const DEFAULT_PROGRESS_V2: UserProgressDataV2 = {
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

export const DEFAULT_PROGRESS_V3: UserProgressDataV3 = {
  schemaVersion: 3,
  completedAlgoIds: [],
  recentlyExploredIds: [],
  lastExploredAlgoId: null,
  challengeStats: {
    totalAttempted: 0,
    totalCorrect: 0,
    streak: 0,
    bestStreak: 0,
  },
  masteryRecords: {},
  activeAssessment: null,
};

export const DEFAULT_PROGRESS = DEFAULT_PROGRESS_V3;

/**
 * Validates and sanitizes unknown progress data from storage into a clean V3 structure.
 */
export function sanitizeProgress(raw: unknown): UserProgressDataV3 {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_PROGRESS_V3 };
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

  const rawStats =
    candidate.challengeStats && typeof candidate.challengeStats === 'object'
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

  // Sanitize mastery records
  const masteryRecords: Record<string, TopicMasteryRecord> = {};
  if (candidate.masteryRecords && typeof candidate.masteryRecords === 'object') {
    for (const [algoId, rec] of Object.entries(candidate.masteryRecords)) {
      if (rec && typeof rec === 'object') {
        const r = rec as Record<string, any>;
        const status =
          r.status === 'mastered' || r.status === 'failed' || r.status === 'unattempted'
            ? r.status
            : 'unattempted';

        masteryRecords[algoId] = {
          algoId,
          status,
          attemptsCount: typeof r.attemptsCount === 'number' && r.attemptsCount >= 0 ? Math.floor(r.attemptsCount) : 0,
          lastAttemptTimestamp: typeof r.lastAttemptTimestamp === 'number' ? r.lastAttemptTimestamp : 0,
          bestScore: typeof r.bestScore === 'number' ? Math.min(Math.max(0, Math.floor(r.bestScore)), 3) : undefined,
          completedTimestamp: typeof r.completedTimestamp === 'number' ? r.completedTimestamp : undefined,
        };
      }
    }
  }

  // Sanitize active assessment
  let activeAssessment: ActiveAssessmentState | null = null;
  if (candidate.activeAssessment && typeof candidate.activeAssessment === 'object') {
    const act = candidate.activeAssessment as Record<string, any>;
    if (
      typeof act.algoId === 'string' &&
      typeof act.attemptId === 'string' &&
      Array.isArray(act.questionIds) &&
      act.questionIds.length === 3 &&
      act.questionIds.every((id: any) => typeof id === 'string')
    ) {
      const answers: Record<string, string> = {};
      if (act.answers && typeof act.answers === 'object') {
        for (const [qId, optId] of Object.entries(act.answers)) {
          if (typeof optId === 'string') {
            answers[qId] = optId;
          }
        }
      }

      const status =
        act.status === 'passed' || act.status === 'failed' || act.status === 'in-progress'
          ? act.status
          : 'in-progress';

      activeAssessment = {
        algoId: act.algoId,
        attemptId: act.attemptId,
        questionIds: [act.questionIds[0], act.questionIds[1], act.questionIds[2]],
        answers,
        status,
        startedAt: typeof act.startedAt === 'number' ? act.startedAt : Date.now(),
      };
    }
  }

  return {
    schemaVersion: 3,
    completedAlgoIds,
    recentlyExploredIds,
    lastExploredAlgoId,
    challengeStats: {
      totalAttempted,
      totalCorrect,
      streak,
      bestStreak: Math.max(bestStreak, streak),
    },
    masteryRecords,
    activeAssessment,
  };
}

/**
 * Migrates existing V2 progress data into V3 without data loss.
 * Preserves completedAlgoIds as lesson completions, but initializes mastery as unmastered.
 */
export function migrateProgressV2ToV3(rawV2: unknown): UserProgressDataV3 {
  if (!rawV2 || typeof rawV2 !== 'object') {
    return { ...DEFAULT_PROGRESS_V3 };
  }

  const candidate = rawV2 as Record<string, any>;

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

  const rawStats =
    candidate.challengeStats && typeof candidate.challengeStats === 'object'
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
    schemaVersion: 3,
    completedAlgoIds,
    recentlyExploredIds,
    lastExploredAlgoId,
    challengeStats: {
      totalAttempted,
      totalCorrect,
      streak,
      bestStreak: Math.max(bestStreak, streak),
    },
    masteryRecords: {},
    activeAssessment: null,
  };
}

/**
 * Safely loads user progress from localStorage.
 * Reads V3, or migrates from V2 if V3 does not yet exist.
 * Leaves V2 intact in storage for backup and recovery.
 * Never overwrites storage with defaults when a read or parse error occurs.
 */
export function loadUserProgress(): UserProgressDataV3 {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return { ...DEFAULT_PROGRESS_V3 };
    }

    // 1. Try reading V3 data
    const itemV3 = window.localStorage.getItem(PROGRESS_STORAGE_KEY_V3);
    if (itemV3) {
      try {
        const parsedV3 = JSON.parse(itemV3);
        return sanitizeProgress(parsedV3);
      } catch (parseErr) {
        console.warn(
          '[AlgoLens Storage] Malformed V3 data encountered. Returning clean default without overwriting stored data.',
          parseErr
        );
        return { ...DEFAULT_PROGRESS_V3 };
      }
    }

    // 2. Check for existing V2 data to migrate
    const itemV2 = window.localStorage.getItem(PROGRESS_STORAGE_KEY_V2);
    if (itemV2) {
      try {
        const parsedV2 = JSON.parse(itemV2);
        const migrated = migrateProgressV2ToV3(parsedV2);

        // Write V3 without deleting V2
        try {
          window.localStorage.setItem(PROGRESS_STORAGE_KEY_V3, JSON.stringify(migrated));
        } catch {
          // If write fails (e.g. storage quota), return in-memory migrated data safely
        }

        return migrated;
      } catch (parseErr) {
        console.warn(
          '[AlgoLens Storage] Malformed V2 data during migration. Returning clean default.',
          parseErr
        );
        return { ...DEFAULT_PROGRESS_V3 };
      }
    }

    return { ...DEFAULT_PROGRESS_V3 };
  } catch {
    return { ...DEFAULT_PROGRESS_V3 };
  }
}

/**
 * Safely persists user progress to localStorage.
 */
export function saveUserProgress(progress: UserProgressDataV3): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const sanitized = sanitizeProgress(progress);
    window.localStorage.setItem(PROGRESS_STORAGE_KEY_V3, JSON.stringify(sanitized));
  } catch {
    // Storage quota exceeded or storage disabled
  }
}

/**
 * Record viewing an algorithm.
 */
export function recordExploredAlgorithm(
  prev: UserProgressDataV3,
  algoId: string
): UserProgressDataV3 {
  const filteredRecents = prev.recentlyExploredIds.filter((id) => id !== algoId);
  const updatedRecents = [algoId, ...filteredRecents].slice(0, 8);

  const updated: UserProgressDataV3 = {
    ...prev,
    lastExploredAlgoId: algoId,
    recentlyExploredIds: updatedRecents,
  };
  saveUserProgress(updated);
  return updated;
}

/**
 * Mark an algorithm as completed (lesson/animation playback finished).
 */
export function markAlgorithmCompleted(
  prev: UserProgressDataV3,
  algoId: string
): UserProgressDataV3 {
  if (prev.completedAlgoIds.includes(algoId)) return prev;

  const updated: UserProgressDataV3 = {
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
  prev: UserProgressDataV3,
  isCorrect: boolean
): UserProgressDataV3 {
  const totalAttempted = prev.challengeStats.totalAttempted + 1;
  const totalCorrect = prev.challengeStats.totalCorrect + (isCorrect ? 1 : 0);
  const newStreak = isCorrect ? prev.challengeStats.streak + 1 : 0;
  const bestStreak = Math.max(prev.challengeStats.bestStreak, newStreak);

  const updated: UserProgressDataV3 = {
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
 * Saves an active assessment attempt to storage so page refreshes preserve state.
 */
export function saveAssessmentAttempt(
  prev: UserProgressDataV3,
  attempt: ActiveAssessmentState | null
): UserProgressDataV3 {
  const updated: UserProgressDataV3 = {
    ...prev,
    activeAssessment: attempt,
  };
  saveUserProgress(updated);
  return updated;
}

/**
 * Clears any active assessment attempt from storage.
 */
export function clearAssessmentAttempt(prev: UserProgressDataV3): UserProgressDataV3 {
  return saveAssessmentAttempt(prev, null);
}

/**
 * Reset all progress data back to factory defaults.
 */
export function resetUserProgress(): UserProgressDataV3 {
  const reset = { ...DEFAULT_PROGRESS_V3 };
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(PROGRESS_STORAGE_KEY_V3);
      window.localStorage.removeItem(PROGRESS_STORAGE_KEY_V2);
    }
  } catch {
    // ignore
  }
  return reset;
}
