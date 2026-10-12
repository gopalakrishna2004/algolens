import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ALGORITHM_REGISTRY, CATEGORIES, getAlgorithmById } from './algorithms/registry';
import { isSorted } from './algorithms/searching/binarySearch';
import { generateLinearSearchSource } from './algorithms/searching/linearSearch';
import { useAlgorithmPlayer } from './hooks/useAlgorithmPlayer';
import { VisualizerHost } from './visualizers/VisualizerHost';
import { Controls } from './components/Controls/Controls';
import { Metrics } from './components/Metrics/Metrics';
import { Explanation } from './components/Explanation/Explanation';
import { Sidebar } from './components/Navigation/Sidebar';
import { InstrumentNavbar } from './components/Navigation/InstrumentNavbar';
import { KeyboardShortcutsModal } from './components/Navigation/KeyboardShortcutsModal';
import { LandingPage } from './components/Landing/LandingPage';
import { ChallengeView } from './components/InteractiveLearning/ChallengeView';
import { WorkbenchDesk, type WorkbenchTab } from './components/Workbench/WorkbenchDesk';
import { generateChallenge } from './learning/challengeEngine';
import { MasteryModal } from './components/Mastery/MasteryModal';
import { getMasteredCount } from './learning/mastery/masteryEngine';
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

const parseHashRoute = () => {
  if (typeof window === 'undefined') return { view: 'landing' as const, algoId: undefined };
  const hash = window.location.hash;
  if (hash.startsWith('#lab')) {
    const match = hash.match(/algo=([a-z0-9-]+)/i);
    return { view: 'lab' as const, algoId: match ? match[1] : undefined };
  }
  return { view: 'landing' as const, algoId: undefined };
};

export const App: React.FC = () => {
  // Hash-based view state ('landing' | 'lab')
  const [currentView, setCurrentView] = useState<'landing' | 'lab'>(() => parseHashRoute().view);

  // Load persistent user progress from storage
  const [userProgress, setUserProgress] = useState<UserProgressData>(() => loadUserProgress());

  // Determine initial algorithm: URL hash param, or last explored, or default 'linear-search'
  const initialRouteAlgo = parseHashRoute().algoId;
  const initialAlgoId =
    initialRouteAlgo && getAlgorithmById(initialRouteAlgo)
      ? initialRouteAlgo
      : userProgress.lastExploredAlgoId && getAlgorithmById(userProgress.lastExploredAlgoId)
      ? userProgress.lastExploredAlgoId
      : 'linear-search';

  const [selectedAlgoId, setSelectedAlgoId] = useState<string>(initialAlgoId);
  const [isCurriculumDrawerOpen, setIsCurriculumDrawerOpen] = useState(false);
  const [isSidebarPinned, setIsSidebarPinned] = useState(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);
  const [isMasteryModalOpen, setIsMasteryModalOpen] = useState(false);
  const [learningMode, setLearningMode] = useState<LearningMode>('explore');
  const [workbenchTab, setWorkbenchTab] = useState<WorkbenchTab>('code');
  const [lastChallengeResult, setLastChallengeResult] = useState<{
    isCorrect: boolean;
    concept?: string;
  } | null>(null);

  // Listen for browser hash transitions
  useEffect(() => {
    const handleHashChange = () => {
      const { view, algoId } = parseHashRoute();
      setCurrentView(view);
      if (algoId && getAlgorithmById(algoId)) {
        setSelectedAlgoId(algoId);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Input dataset state
  const targetAlgoInitial = getAlgorithmById(selectedAlgoId) || ALGORITHM_REGISTRY['linear-search'];
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

    if (window.location.hash.startsWith('#lab')) {
      window.location.hash = `#lab?algo=${id}`;
    }
  }, []);

  const handleEnterLab = (algoId?: string) => {
    const id = algoId || selectedAlgoId;
    if (algoId) {
      handleSelectAlgorithm(algoId);
    }
    window.location.hash = `#lab?algo=${id}`;
    setCurrentView('lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    window.location.hash = '#';
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        if (isShortcutsModalOpen) {
          setIsShortcutsModalOpen(false);
          return;
        }
        if (isCurriculumDrawerOpen) {
          setIsCurriculumDrawerOpen(false);
          return;
        }
      }

      if (isTextInput) return;

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsShortcutsModalOpen((prev) => !prev);
        return;
      }

      if (currentView === 'lab') {
        if ((e.key === 'c' || e.key === 'C') && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          setIsCurriculumDrawerOpen((prev) => !prev);
          return;
        }

        if (e.key === '1') {
          setLearningMode('explore');
        } else if (e.key === '2') {
          setLearningMode('guided');
        } else if (e.key === '3') {
          setLearningMode('challenge');
        }

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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, play, pause, stepForward, stepBackward, reset, isCurriculumDrawerOpen, isShortcutsModalOpen, currentView]);

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

  // Dynamically synchronize source code with active user input
  const activeSourceCode = useMemo(() => {
    if (selectedAlgoId === 'linear-search' && array) {
      return generateLinearSearchSource(array, target);
    }
    return metadata.sourceCode;
  }, [selectedAlgoId, array, target, metadata.sourceCode]);

  // Render Dedicated Landing Page when view === 'landing'
  if (currentView === 'landing') {
    return (
      <LandingPage
        onEnterLab={handleEnterLab}
        completedAlgoIds={userProgress.completedAlgoIds}
        challengeStats={userProgress.challengeStats}
      />
    );
  }

  // Render Reconceived Learning Laboratory when view === 'lab'
  return (
    <div className={`app-layout ${isSidebarPinned ? 'sidebar-pinned-layout' : ''}`}>
      {/* Sleek Master Instrument Top Navigation Bar */}
      <InstrumentNavbar
        onNavigateHome={handleNavigateHome}
        activeAlgorithmName={metadata.name}
        chapterNumber={chapterNumber}
        categoryName={metadata.category}
        isCurriculumOpen={isCurriculumDrawerOpen}
        onToggleCurriculum={() => setIsCurriculumDrawerOpen((prev) => !prev)}
        learningMode={learningMode}
        onModeChange={setLearningMode}
        completedCount={getMasteredCount(userProgress)}
        totalAlgorithms={Object.keys(ALGORITHM_REGISTRY).length}
        challengeStreak={userProgress.challengeStats.streak}
        onOpenShortcutsModal={() => setIsShortcutsModalOpen(true)}
        onOpenMasteryModal={() => setIsMasteryModalOpen(true)}
      />

      <div className="main-stage-wrapper">
        {/* Slide-over or Pinned Curriculum Drawer */}
        <Sidebar
          activeAlgorithmId={selectedAlgoId}
          disabled={isPlaying}
          onSelectAlgorithm={handleSelectAlgorithm}
          isOpenDrawer={isCurriculumDrawerOpen}
          onCloseDrawer={() => setIsCurriculumDrawerOpen(false)}
          isPinned={isSidebarPinned}
          onTogglePin={() => setIsSidebarPinned((prev) => !prev)}
          completedAlgoIds={userProgress.completedAlgoIds}
          recentlyExploredIds={userProgress.recentlyExploredIds}
          challengeStats={userProgress.challengeStats}
          onResetProgress={handleResetAllProgress}
        />

        {/* Main Algorithm Exploration Stage */}
        <main className="main-stage" id="main-content">
          {/* Unified Master Laboratory Instrument Console */}
          <div className="lab-instrument-console" aria-label="Algorithm Laboratory Instrument">
            {/* Console Crown: Title, Category, Difficulty & Integrated Complexity Plaque */}
            <header className="instrument-crown">
              <div className="crown-title-group">
                <div className="chapter-eyebrow">
                  <span className="eyebrow-chapter">Chapter {chapterNumber}</span>
                  <span className="eyebrow-sep">·</span>
                  <span className="eyebrow-category">{metadata.category}</span>
                  <span className="eyebrow-difficulty">{metadata.difficulty}</span>
                </div>

                <h1 className="instrument-title">{metadata.name}</h1>
                <p className="instrument-thesis">{metadata.keyIdea}</p>
              </div>

              {/* Compact Inline Complexity Specs Plaque */}
              <div className="complexity-plaque" role="group" aria-label="Complexity Specifications">
                <div className="plaque-col">
                  <span className="plaque-lbl">Best</span>
                  <span className="plaque-val">{metadata.timeComplexity.best}</span>
                </div>
                <div className="plaque-divider" />
                <div className="plaque-col">
                  <span className="plaque-lbl">Average</span>
                  <span className="plaque-val">{metadata.timeComplexity.average}</span>
                </div>
                <div className="plaque-divider" />
                <div className="plaque-col">
                  <span className="plaque-lbl">Worst</span>
                  <span className="plaque-val">{metadata.timeComplexity.worst}</span>
                </div>
                <div className="plaque-divider" />
                <div className="plaque-col">
                  <span className="plaque-lbl">Space</span>
                  <span className="plaque-val">{metadata.spaceComplexity}</span>
                </div>
              </div>
            </header>

            {/* Binary Search Sorted Requirement Notice (if unsorted) */}
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

            {/* Embedded Active Learning Invariant / Challenge HUD */}
            <div className="instrument-hud-area">
              {learningMode === 'challenge' ? (
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
              ) : (
                <Explanation
                  algorithmName={metadata.name}
                  description={
                    currentStep?.description || 'Select an algorithm or press Play to begin.'
                  }
                  currentStepIndex={currentStepIndex}
                  totalSteps={totalSteps}
                  mode={learningMode}
                  codeLine={currentStep?.codeLine}
                  cSourceCode={activeSourceCode.c}
                  onOpenCodeViewer={() => {
                    setWorkbenchTab('code');
                    const deskEl = document.getElementById('workbench-study-desk');
                    if (deskEl) {
                      deskEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                />
              )}
            </div>

            {/* The Living Visualization Canvas */}
            <div className="instrument-canvas-viewport">
              <VisualizerHost step={currentStep} fallbackArray={array} />
            </div>

            {/* Integrated Docked Base Telemetry & Playback Deck */}
            <div className="instrument-base-deck">
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
            </div>
          </div>

          {/* Deep Secondary Study Desk */}
          <section className="workbench-section" id="workbench-study-desk" aria-label="Secondary Learning Workbench">
            <WorkbenchDesk
              metadata={metadata}
              currentStep={currentStep}
              currentStepIndex={currentStepIndex}
              totalSteps={totalSteps}
              sourceCode={activeSourceCode}
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
              activeTab={workbenchTab}
              onTabChange={setWorkbenchTab}
            />
          </section>
        </main>
      </div>

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />

      {/* Topic Mastery Assessment Modal */}
      <MasteryModal
        isOpen={isMasteryModalOpen}
        onClose={() => setIsMasteryModalOpen(false)}
        algoId={selectedAlgoId}
        algoName={metadata.name}
        userProgress={userProgress}
        onUpdateProgress={setUserProgress}
      />
    </div>
  );
};

export default App;
