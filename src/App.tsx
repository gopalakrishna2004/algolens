import React, { useState, useMemo } from 'react';
import { ALGORITHM_REGISTRY, CATEGORIES, getAlgorithmById } from './algorithms/registry';
import { isSorted } from './algorithms/searching/binarySearch';
import { useAlgorithmPlayer } from './hooks/useAlgorithmPlayer';
import { VisualizerHost } from './visualizers/VisualizerHost';
import { Controls } from './components/Controls/Controls';
import { Metrics } from './components/Metrics/Metrics';
import { Explanation } from './components/Explanation/Explanation';
import { DataInput } from './components/DataInput/DataInput';
import { Sidebar } from './components/Navigation/Sidebar';
import { CodeViewer } from './components/CodeViewer/CodeViewer';
import { AlgorithmInfoGuide } from './components/AlgorithmInfoGuide/AlgorithmInfoGuide';
import { SearchingComparison } from './components/SearchingComparison/SearchingComparison';
import { AITutorPanel } from './components/AITutor/AITutorPanel';
import type { AnyAlgorithmStep, StepPointers } from './algorithms/types';
import './App.css';

export const App: React.FC = () => {
  const [selectedAlgoId, setSelectedAlgoId] = useState<string>('linear-search');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Input dataset state
  const [array, setArray] = useState<number[]>([15, 42, 8, 23, 74, 31, 90, 56]);
  const [target, setTarget] = useState<number>(23);

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
    setSpeed,
  } = useAlgorithmPlayer({ steps });

  const handleSelectAlgorithm = (id: string) => {
    setSelectedAlgoId(id);
    const targetAlgo = getAlgorithmById(id);
    if (targetAlgo) {
      if (targetAlgo.defaultInput.array && targetAlgo.defaultInput.array.length > 0) {
        setArray(targetAlgo.defaultInput.array);
      }
      if (targetAlgo.defaultInput.target !== undefined) {
        setTarget(targetAlgo.defaultInput.target);
      }
    }
  };

  const handleUpdateData = (newArray: number[], newTarget: number) => {
    setArray(newArray);
    setTarget(newTarget);
  };

  const handleSortArray = () => {
    const sorted = [...array].sort((a, b) => a - b);
    setArray(sorted);
  };

  const isCompleted = totalSteps > 0 && currentStepIndex === totalSteps - 1;

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
      <div className="mobile-top-bar">
        <span className="mobile-brand-title">ALGOLENS</span>
        <button
          type="button"
          className="mobile-curriculum-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
      />

      {/* Main Algorithm Exploration Stage */}
      <main className="main-stage">
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
          <div className="complexity-spec-bar">
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
          <div className="requirement-notice-banner">
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

        {/* Teaching HUD (Heads-Up Display) */}
        <Explanation
          algorithmName={metadata.name}
          description={
            currentStep?.description || 'Select an algorithm or press Play to begin.'
          }
          currentStepIndex={currentStepIndex}
          totalSteps={totalSteps}
        />

        {/* Visualizer Hero Workbench Canvas */}
        <section className="workbench-stage">
          <VisualizerHost step={currentStep} fallbackArray={array} />
        </section>

        {/* Precision Telemetry Strip */}
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

        {/* Playback Transport Deck */}
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
          onSpeedChange={setSpeed}
        />

        {/* Deep Interactive Exploration Section (Developer Tools & Study) */}
        <section className="workbench-tools-deck">
          {/* Data Input Panel (for array algorithms) */}
          {showArrayInput && (
            <DataInput
              initialArray={array}
              initialTarget={target}
              disabled={isPlaying}
              showTarget={metadata.category === 'searching' || selectedAlgoId === 'two-pointers'}
              requireSorted={selectedAlgoId === 'binary-search'}
              onUpdateData={handleUpdateData}
              onSortArray={handleSortArray}
            />
          )}

          {/* Source Code Viewer (C and TypeScript) */}
          <CodeViewer
            sourceCode={metadata.sourceCode}
            highlightLine={currentStep?.codeLine}
          />

          {/* AI Laboratory Tutor Assistant Console */}
          <AITutorPanel
            metadata={metadata}
            currentStep={currentStep}
            currentStepIndex={currentStepIndex}
            totalSteps={totalSteps}
          />

          {/* Concept Reference: When, Why & Limitations */}
          <AlgorithmInfoGuide metadata={metadata} />

          {/* Conceptual Comparison: Linear Search vs Binary Search */}
          {metadata.category === 'searching' && <SearchingComparison />}
        </section>
      </main>
    </div>
  );
};

export default App;
