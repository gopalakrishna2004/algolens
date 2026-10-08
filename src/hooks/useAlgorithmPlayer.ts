import { useState, useEffect, useRef, useCallback } from 'react';
import type { BaseStep } from '../algorithms/types';

interface UseAlgorithmPlayerProps<TStep extends BaseStep> {
  steps: TStep[];
  defaultSpeedMs?: number;
}

/**
 * Universal playback engine for AlgoLens.
 * Generic over any step type implementing BaseStep (Array, Tree, Graph, Stack, etc.).
 */
export function useAlgorithmPlayer<TStep extends BaseStep>({
  steps,
  defaultSpeedMs = 600,
}: UseAlgorithmPlayerProps<TStep>) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(defaultSpeedMs);

  const timerRef = useRef<number | null>(null);

  // Safely clear active timer
  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Reset timeline when steps change
  useEffect(() => {
    clearTimer();
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }, [steps, clearTimer]);

  // Manage automatic step advancement
  useEffect(() => {
    if (!isPlaying) {
      clearTimer();
      return;
    }

    if (currentStepIndex >= steps.length - 1) {
      clearTimer();
      setIsPlaying(false);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setCurrentStepIndex((prevIndex) => {
        if (prevIndex >= steps.length - 1) {
          clearTimer();
          setIsPlaying(false);
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, speedMs);

    return () => {
      clearTimer();
    };
  }, [isPlaying, speedMs, steps.length, currentStepIndex, clearTimer]);

  const play = useCallback(() => {
    if (steps.length === 0) return;
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(true);
  }, [currentStepIndex, steps.length]);

  const pause = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }, [clearTimer]);

  const stepForward = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  }, [clearTimer, steps.length]);

  const stepBackward = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  }, [clearTimer]);

  const currentStep: TStep | null = steps[currentStepIndex] || null;

  return {
    currentStep,
    currentStepIndex,
    totalSteps: steps.length,
    isPlaying,
    speedMs,
    play,
    pause,
    reset,
    stepForward,
    stepBackward,
    setSpeed: setSpeedMs,
  };
}
