import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ALGORITHM_REGISTRY, CATEGORIES, getAlgorithmById } from './algorithms/registry';
import { isSorted } from './algorithms/searching/binarySearch';
import { useAlgorithmPlayer } from './hooks/useAlgorithmPlayer';
import { VisualizerHost } from './visualizers/VisualizerHost';
import { Controls } from './components/Controls/Controls';
import { Metrics } from './components/Metrics/Metrics';
import { Explanation } from './components/Explanation/Explanation';
import { Sidebar } from './components/Navigation/Sidebar';
import { ModeSwitcher } from './components/InteractiveLearning/ModeSwitcher';
import { ChallengeView } from './components/InteractiveLearning/ChallengeView';
import { WorkbenchDesk } from './components/Workbench/WorkbenchDesk';
import { generateChallenge } from './learning/challengeEngine';
import {
  loadUserProgress,
  recordExploredAlgorithm,
  markAlgorithmCompleted,
  recordChallengeResult,
  resetUserProgress,
} from './learning/progressStorage';
import type { AnyAlgorithmStep, StepPointers } from './algorithms/types';
import type { LearningMode, UserProgressData } from './learning/types';
import './App.css';

export const App: React.FC = () => {
  // Load persistent user progress from storage
  const [userProgress, setUserProgress] = useState<UserProgressData>(() => loadUserProgress());

  // Determine initial algorithm: restore last explored or default to 'linear-search'
  const initialAlgoId =
    userProgress.lastExploredAlgoId && getAlgorithmById(userProgress.lastExploredAlgoId)
      ? userProgress.lastExploredAlgoId
      : 'linear-search';

  const [selectedAlgoId, setSelectedAlgoId] = useState<string>(initialAlgoId);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [learningMode, setLearningMode] = useState<LearningMode>('explore');
  const [lastChallengeResult, setLastChallengeResult] = useState<{
    isCorrect: boolean;
    concept?: string;
  } | null>(null);

  // Input dataset state
  const targetAlgoInitial = getAlgorithmById(initialAlgoId);
  const [array, setArray] = useState<number[]>(
    targetAlgoInitial?.defaultInput.array && targetAlgoInitial.defaultInput.array.length > 0
      ? targetAlgoInitial.defaultInput.array
      : [15, 42, 8, 23, 74, 31, 90, 56]
  );
  const [target, setTarget] = useState<number>(targetAlgoInitial?.defaultInput.target ?? 23);

  // Retrieve registered algorithm metadata and runner
  const currentAlgorithm = getAlgorithmById(selectedAlgoId) || ALGORITHM_REGISTRY['linear-search'];
  const metadata = currentAlgorithm.metadata;

  const isCurrentArraySorted = useMemo(() => isSorted(array), [array]);

  // Pre-generate execution step snapshots
  const steps: AnyAlgorithmStep[] = useMemo(() => {
    return currentAlgorithm.run({ array, target });
  }, [currentAlgorithm, array, target]);

  // Generic playback hook controlling step timeline
  const {
    currentStep,
    currentStepIndex,
    totalSteps,
    isPlaying,
    speedMs,
    play,
    pause,
    reset,
    stepForward,
    stepBackward,
    jumpToStep,
    setSpeed,
  } = useAlgorithmPlayer({ steps });

  // Generate real execution-grounded challenge for the active step
  const activeChallenge = useMemo(() => {
    return generateChallenge(selectedAlgoId, currentStepIndex, steps, metadata);
  }, [selectedAlgoId, currentStepIndex, steps, metadata]);

  // Pause playback automatically when reaching an active challenge in challenge mode
  useEffect(() => {
    if (learningMode === 'challenge' && isPlaying && activeChallenge) {
      pause();
    }
  }, [learningMode, isPlaying, activeChallenge, pause]);

  // Automatically mark algorithm as completed when the final step is reached
  const isCompleted = totalSteps > 0 && currentStepIndex === totalSteps - 1;
  useEffect(() => {
    if (isCompleted && selectedAlgoId) {
      setUserProgress((prev) => markAlgorithmCompleted(prev, selectedAlgoId));
    }
  }, [isCompleted, selectedAlgoId]);

  const handleSelectAlgorithm = useCallback((id: string) => {
    setSelectedAlgoId(id);
    setLastChallengeResult(null);
    setUserProgress((prev) => recordExploredAlgorithm(prev, id));

    const targetAlgo = getAlgorithmById(id);
    if (targetAlgo) {
      if (targetAlgo.defaultInput.array && targetAlgo.defaultInput.array.length > 0) {
        setArray(targetAlgo.defaultInput.array);
      }
      if (targetAlgo.defaultInput.target !== undefined) {
        setTarget(targetAlgo.defaultInput.target);
      }
    }
  }, []);

  const handleUpdateData = (newArray: number[], newTarget: number) => {
    setArray(newArray);
    setTarget(newTarget);
  };

  const handleSortArray = () => {
    const sorted = [...array].sort((a, b) => a - b);
    setArray(sorted);
  };

  const handleChallengeAnswer = (isCorrect: boolean) => {
    setLastChallengeResult({
      isCorrect,
      concept: activeChallenge?.concept,
    });
    setUserProgress((prev) => recordChallengeResult(prev, isCorrect));
  };

  const handleChallengeContinue = () => {
    stepForward();
  };

  const handleResetAllProgress = () => {
    const resetData = resetUserProgress();
    setUserProgress(resetData);
  };

  // Keyboard navigation & accessibility controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const targetEl = e.target as HTMLElement | null;
      const isTextInput =
        targetEl &&
        (targetEl.tagName === 'INPUT' ||
          targetEl.tagName === 'TEXTAREA' ||
          targetEl.tagName === 'SELECT' ||
          targetEl.isContentEditable);

      if (e.key === 'Escape') {
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
        return;
      }

      if (isTextInput) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (isPlaying) {
          pause();
        } else {
          play();
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        stepForward();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        stepBackward();
      } else if (e.key === 'Home') {
        e.preventDefault();
        reset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, play, pause, stepForward, stepBackward, reset, isMobileMenuOpen]);

  // Type guards for step properties
  const currentIndex =
    currentStep && currentStep.kind === 'array' ? currentStep.currentIndex : undefined;
  const pointers =
    currentStep && currentStep.kind === 'array' && 'pointers' in currentStep
      ? (currentStep.pointers as StepPointers)
      : undefined;
  const isFound = currentStep && 'isFound' in currentStep ? (currentStep.isFound as boolean) : false;
  const foundIndex = currentStep && 'foundIndex' in currentStep ? currentStep.foundIndex : undefined;

  const showArrayInput = metadata.visualizationType === 'array';
  const categoryIndex = CATEGORIES.findIndex((c) => c.id === metadata.category);
  const chapterNumber = String(categoryIndex >= 0 ? categoryIndex + 1 : 1).padStart(2, '0');

  return (
    <div className="app-layout">
      {/* Mobile Top Navigation Bar */}
      <div className="mobile-top-bar" role="banner">
        <span className="mobile-brand-title">ALGOLENS 2.0</span>
        <button
          type="button"
          className="mobile-curriculum-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Curriculum Navigation"
          aria-expanded={isMobileMenuOpen}
        >
          ☰ Curriculum
        </button>
      </div>

      {/* Curriculum Navigation Sidebar */}
      <Sidebar
        activeAlgorithmId={selectedAlgoId}
        disabled={isPlaying}
        onSelectAlgorithm={handleSelectAlgorithm}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        completedAlgoIds={userProgress.completedAlgoIds}
        recentlyExploredIds={userProgress.recentlyExploredIds}
        challengeStats={userProgress.challengeStats}
        onResetProgress={handleResetAllProgress}
      />

      {/* Main Algorithm Exploration Stage */}
      <main className="main-stage" id="main-content">
        {/* Lab Algorithm Lesson Header */}
        <header className="lab-header">
          <div className="chapter-eyebrow">
            <span className="eyebrow-chapter">CHAPTER {chapterNumber}</span>
            <span className="eyebrow-sep">/</span>
            <span className="eyebrow-category">{metadata.category.toUpperCase()}</span>
          </div>

          <div className="title-row">
            <h1 className="algorithm-hero-title">{metadata.name}</h1>
            <div className="difficulty-tag">
              <span className="difficulty-dot" />
              <span>{metadata.difficulty}</span>
            </div>
          </div>

          <p className="algorithm-lesson-thesis">
            {metadata.keyIdea}
          </p>

          {/* Compact Inline Complexity Specs Bar */}
          <div className="complexity-spec-bar" role="group" aria-label="Complexity Specifications">
            <div className="spec-col">
              <span className="spec-label">BEST</span>
              <span className="spec-value">{metadata.timeComplexity.best}</span>
            </div>
            <div className="spec-divider" />
            <div className="spec-col">
              <span className="spec-label">AVERAGE</span>
              <span className="spec-value">{metadata.timeComplexity.average}</span>
            </div>
            <div className="spec-divider" />
            <div className="spec-col">
              <span className="spec-label">WORST</span>
              <span className="spec-value">{metadata.timeComplexity.worst}</span>
            </div>
            <div className="spec-divider" />
            <div className="spec-col">
              <span className="spec-label">SPACE</span>
              <span className="spec-value">{metadata.spaceComplexity}</span>
            </div>
            {metadata.prerequisites.length > 0 && (
              <>
                <div className="spec-divider" />
                <div className="spec-col prereq-col">
                  <span className="spec-label">PREREQUISITE</span>
                  <span className="spec-value prereq-val">{metadata.prerequisites.join(' • ')}</span>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Binary Search Sorted Requirement Notice */}
        {selectedAlgoId === 'binary-search' && !isCurrentArraySorted && (
          <div className="requirement-notice-banner" role="alert">
            <span>
              ⚠️ <strong>Requirement:</strong> Binary Search requires sorted input.
            </span>
            <button
              type="button"
              onClick={handleSortArray}
              disabled={isPlaying}
              className="req-btn"
            >
              Sort Array Now
            </button>
          </div>
        )}

        {/* Interactive Learning Mode Switcher Bar */}
        <ModeSwitcher
          currentMode={learningMode}
          onModeChange={setLearningMode}
          stats={userProgress.challengeStats}
        />

        {/* Teaching HUD (Heads-Up Display) */}
        <Explanation
          algorithmName={metadata.name}
          description={
            currentStep?.description || 'Select an algorithm or press Play to begin.'
          }
          currentStepIndex={currentStepIndex}
          totalSteps={totalSteps}
          mode={learningMode}
        />

        {/* Prediction Challenge Console (When in Challenge Mode) */}
        {learningMode === 'challenge' && (
          <ChallengeView
            key={activeChallenge?.id || `idle-${currentStepIndex}`}
            challenge={activeChallenge}
            onAnswer={handleChallengeAnswer}
            onContinue={handleChallengeContinue}
            onExitChallenge={() => setLearningMode('explore')}
            currentStepIndex={currentStepIndex}
            totalSteps={totalSteps}
            streak={userProgress.challengeStats.streak}
          />
        )}

        {/* Dominant Visualizer Laboratory Stage */}
        <div className="hero-stage-container" aria-label="Active Algorithm Workbench Stage">
          {/* Technical Stage Top Navigation Banner */}
          <div className="stage-header-bar">
            <div className="stage-header-left">
              <span className="stage-indicator-dot" />
              <span className="stage-caption">
                LIVE ALGORITHM CANVAS // {metadata.visualizationType.toUpperCase()}
              </span>
            </div>
            <div className="stage-header-right">
              <span className="stage-coords-tag">ACTIVE TIMELINE SNAPSHOT</span>
            </div>
          </div>

          {/* Visualizer Hero Canvas */}
          <section className="workbench-stage">
            <VisualizerHost step={currentStep} fallbackArray={array} />
          </section>

          {/* Precision Telemetry Strip Docked at Stage Base */}
          <Metrics
            category={metadata.category}
            target={target}
            currentIndex={currentIndex}
            pointers={pointers}
            isFound={isFound}
            foundIndex={foundIndex}
            comparisons={
              typeof currentStep?.stats.comparisons === 'number'
                ? currentStep.stats.comparisons
                : 0
            }
            swaps={
              typeof currentStep?.stats.swaps === 'number'
                ? currentStep.stats.swaps
                : undefined
            }
            isCompleted={isCompleted}
          />
        </div>

        {/* Playback Transport Deck (Directly below stage) */}
        <Controls
          isPlaying={isPlaying}
          canStepForward={currentStepIndex < totalSteps - 1}
          canStepBackward={currentStepIndex > 0}
          currentStepIndex={currentStepIndex}
          totalSteps={totalSteps}
          speedMs={speedMs}
          onPlay={play}
          onPause={pause}
          onReset={reset}
          onStepForward={stepForward}
          onStepBackward={stepBackward}
          onJumpToStep={jumpToStep}
          onSpeedChange={setSpeed}
        />

        {/* Deep Interactive Laboratory Study Desk */}
        <WorkbenchDesk
          metadata={metadata}
          currentStep={currentStep}
          currentStepIndex={currentStepIndex}
          totalSteps={totalSteps}
          sourceCode={metadata.sourceCode}
          highlightLine={currentStep?.codeLine}
          inputArray={array}
          inputTarget={target}
          lastChallengeResult={lastChallengeResult}
          showArrayInput={showArrayInput}
          isPlaying={isPlaying}
          requireSorted={selectedAlgoId === 'binary-search'}
          showTarget={metadata.category === 'searching' || selectedAlgoId === 'two-pointers'}
          onUpdateData={handleUpdateData}
          onSortArray={handleSortArray}
        />
      </main>
    </div>
  );
};

export default App;
