import React, { useState, useMemo } from 'react';
import { getAlgorithmById } from '../../algorithms/registry';
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer';
import { VisualizerHost } from '../../visualizers/VisualizerHost';
import type { AnyAlgorithmStep } from '../../algorithms/types';

interface LandingHeroDemoProps {
  onOpenLabWithAlgo: (algoId: string) => void;
}

const HERO_DEMO_ALGOS = [
  { id: 'binary-search', label: 'Binary Search', chapter: '01', category: 'Searching' },
  { id: 'bubble-sort', label: 'Bubble Sort', chapter: '02', category: 'Sorting' },
  { id: 'quick-sort', label: 'Quick Sort', chapter: '02', category: 'Sorting' },
  { id: 'bfs', label: 'BFS Graph', chapter: '05', category: 'Graphs' },
];

export const LandingHeroDemo: React.FC<LandingHeroDemoProps> = ({ onOpenLabWithAlgo }) => {
  const [selectedDemoId, setSelectedDemoId] = useState<string>('binary-search');

  const algoDef = useMemo(() => {
    return getAlgorithmById(selectedDemoId) || getAlgorithmById('binary-search')!;
  }, [selectedDemoId]);

  // Compute real execution steps from the actual algorithm engine
  const steps: AnyAlgorithmStep[] = useMemo(() => {
    return algoDef.run({
      array: algoDef.defaultInput.array || [14, 28, 36, 49, 62, 75, 88, 97],
      target: algoDef.defaultInput.target ?? 62,
    });
  }, [algoDef]);

  const {
    currentStep,
    currentStepIndex,
    totalSteps,
    isPlaying,
    play,
    pause,
    reset,
    stepForward,
    stepBackward,
    jumpToStep,
  } = useAlgorithmPlayer({ steps });

  const currentStepNum = totalSteps > 0 ? String(currentStepIndex + 1).padStart(2, '0') : '00';
  const totalStepsNum = totalSteps > 0 ? String(totalSteps).padStart(2, '0') : '00';
  const progressRatio = totalSteps > 0 ? ((currentStepIndex + 1) / totalSteps) * 100 : 0;

  return (
    <div className="aperture-stage-root">
      {/* Top Architectural Roster & Selector */}
      <div className="aperture-top-roster">
        <div className="aperture-algo-tabs" role="tablist" aria-label="Aperture Algorithm Demonstrations">
          {HERO_DEMO_ALGOS.map((item) => {
            const isActive = selectedDemoId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`aperture-tab-item ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  setSelectedDemoId(item.id);
                  reset();
                }}
              >
                <span className="tab-chapter-tag">{item.chapter}</span>
                <span className="tab-name">{item.label}</span>
                {isActive && <span className="tab-active-pip" />}
              </button>
            );
          })}
        </div>

        <div className="aperture-header-actions">
          <div className="aperture-step-counter">
            <span className="counter-lbl">FRAME</span>
            <span className="counter-val">{currentStepNum} / {totalStepsNum}</span>
          </div>

          <button
            type="button"
            className="aperture-open-lab-cta"
            onClick={() => onOpenLabWithAlgo(selectedDemoId)}
            title={`Launch ${algoDef.metadata.name} in the full Laboratory`}
          >
            <span>Inspect in Laboratory</span>
            <span className="cta-arrow-symbol" aria-hidden="true">↗</span>
          </button>
        </div>
      </div>

      {/* Thin Progress Rail */}
      <div className="aperture-progress-rail">
        <div className="aperture-progress-gauge" style={{ width: `${progressRatio}%` }} />
      </div>

      {/* Main Living Canvas Floor */}
      <div className="aperture-canvas-floor">
        <VisualizerHost
          step={currentStep}
          fallbackArray={algoDef.defaultInput.array || [14, 28, 36, 49, 62, 75, 88, 97]}
        />
      </div>

      {/* Docked Interaction Deck: Step Explanation & Transport */}
      <div className="aperture-dock-deck">
        <div className="dock-explanation-marginalia">
          <span className="dock-action-tag">ACTION</span>
          <p className="dock-explanation-text">
            {currentStep?.description || 'Select an algorithm or trigger Play to observe live state transitions.'}
          </p>
        </div>

        <div className="dock-controls-cluster">
          {/* Timeline Scrubber */}
          <div className="dock-scrubber-unit">
            <input
              type="range"
              min={0}
              max={Math.max(0, totalSteps - 1)}
              value={currentStepIndex}
              onChange={(e) => jumpToStep(Number(e.target.value))}
              className="dock-scrubber-input"
              aria-label="Timeline Scrubber"
            />
          </div>

          {/* Transport Buttons */}
          <div className="dock-button-group">
            <button
              type="button"
              className="dock-ctrl-btn"
              onClick={reset}
              title="Reset Timeline to Frame 0"
              aria-label="Reset Timeline"
            >
              ↺
            </button>
            <button
              type="button"
              className="dock-ctrl-btn"
              onClick={stepBackward}
              disabled={currentStepIndex <= 0 || isPlaying}
              title="Step Backward (Left Arrow)"
              aria-label="Step Backward"
            >
              ◀
            </button>
            {isPlaying ? (
              <button
                type="button"
                className="dock-ctrl-btn is-playback-active"
                onClick={pause}
                title="Pause Timeline (Space)"
                aria-label="Pause"
              >
                ⏸ Pause
              </button>
            ) : (
              <button
                type="button"
                className="dock-ctrl-btn is-playback-trigger"
                onClick={play}
                disabled={currentStepIndex >= totalSteps - 1}
                title="Play Timeline (Space)"
                aria-label="Play"
              >
                ▶ Play
              </button>
            )}
            <button
              type="button"
              className="dock-ctrl-btn"
              onClick={stepForward}
              disabled={currentStepIndex >= totalSteps - 1 || isPlaying}
              title="Step Forward (Right Arrow)"
              aria-label="Step Forward"
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
