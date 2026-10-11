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

export interface UserProgressData {
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
