import type { AlgorithmCategory } from '../algorithms/types';

export type LearningMode = 'explore' | 'guided' | 'challenge';

export interface ChallengeOption {
  id: string;
  label: string;
  explanation: string;
}

export interface ChallengeQuestion {
  id: string;
  algoId: string;
  stepIndex: number;
  prompt: string;
  options: ChallengeOption[];
  correctOptionId: string;
  rationale: string;
  category: AlgorithmCategory;
  concept: string;
}

export interface ChallengeAttempt {
  questionId: string;
  algoId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timestamp: number;
}

export interface UserProgressDataV2 {
  completedAlgoIds: string[];
  recentlyExploredIds: string[];
  lastExploredAlgoId: string | null;
  challengeStats: {
    totalAttempted: number;
    totalCorrect: number;
    streak: number;
    bestStreak: number;
  };
}

export type DifficultyTier = 'easy' | 'medium' | 'hard';

export interface MasteryOption {
  id: string;
  label: string;
  codeSnippet?: string;
  explanation: string;
}

export interface MasteryQuestion {
  id: string;
  algoId: string;
  tier: DifficultyTier;
  concept: string;
  prompt: string;
  codeContext?: {
    language: 'c';
    code: string;
  };
  options: MasteryOption[];
  correctOptionId: string;
  pedagogicalRationale: string;
}

export interface TopicMasteryRecord {
  algoId: string;
  status: 'unattempted' | 'failed' | 'mastered';
  attemptsCount: number;
  lastAttemptTimestamp: number;
  bestScore?: number; // 0..3
  completedTimestamp?: number;
}

export interface ActiveAssessmentState {
  algoId: string;
  attemptId: string;
  questionIds: [string, string, string]; // [easyId, mediumId, hardId]
  answers: Record<string, string>;       // questionId -> selectedOptionId
  status: 'in-progress' | 'passed' | 'failed';
  startedAt: number;
}

export interface UserProgressDataV3 {
  schemaVersion: 3;
  completedAlgoIds: string[];
  recentlyExploredIds: string[];
  lastExploredAlgoId: string | null;
  challengeStats: {
    totalAttempted: number;
    totalCorrect: number;
    streak: number;
    bestStreak: number;
  };
  masteryRecords: Record<string, TopicMasteryRecord>;
  activeAssessment: ActiveAssessmentState | null;
}

export type UserProgressData = UserProgressDataV3;

