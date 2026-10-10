import React, { useState, useMemo } from 'react';
import { getAlgorithmById } from '../../algorithms/registry';
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer';
import { VisualizerHost } from '../../visualizers/VisualizerHost';
import type { AnyAlgorithmStep } from '../../algorithms/types';

interface LandingHeroDemoProps {
  onOpenLabWithAlgo: (algoId: string) => void;
}

const HERO_DEMO_ALGOS = [
  { id: 'binary-search', label: 'Binary Search', tag: 'Ch. 01 Searching' },
  { id: 'bubble-sort', label: 'Bubble Sort', tag: 'Ch. 02 Sorting' },
  { id: 'bfs', label: 'Breadth-First Search', tag: 'Ch. 05 Graphs' },
];

export const LandingHeroDemo: React.FC<LandingHeroDemoProps> = ({ onOpenLabWithAlgo }) => {
  const [selectedDemoId, setSelectedDemoId] = useState<string>('binary-search');

  const algoDef = useMemo(() => {
    return getAlgorithmById(selectedDemoId) || getAlgorithmById('binary-search')!;
  }, [selectedDemoId]);

  // Compute real execution steps
  const steps: AnyAlgorithmStep[] = useMemo(() => {
    return algoDef.run({
      array: algoDef.defaultInput.array || [12, 24, 32, 45, 57, 68, 81, 99],
      target: algoDef.defaultInput.target ?? 57,
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

  return (
    <div className="hero-demo-console">
      {/* Console Top Toolbar */}
      <div className="hero-demo-topbar">
        <div className="demo-algo-switcher" role="tablist" aria-label="Demo Algorithm Selector">
          {HERO_DEMO_ALGOS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selectedDemoId === item.id}
              className={`demo-tab-btn ${selectedDemoId === item.id ? 'is-active' : ''}`}
              onClick={() => {
                setSelectedDemoId(item.id);
                reset();
              }}
            >
              <span className="demo-tab-dot" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className="demo-open-lab-btn"
          onClick={() => onOpenLabWithAlgo(selectedDemoId)}
          title="Open this algorithm in the full Laboratory"
        >
          <span>Open in Lab</span>
          <span className="arrow-glyph" aria-hidden="true">↗</span>
        </button>
      </div>

      {/* Real Algorithm Visualizer Stage */}
      <div className="hero-demo-canvas-viewport">
        <div className="hero-demo-canvas-inner">
          <VisualizerHost
            step={currentStep}
            fallbackArray={algoDef.defaultInput.array || [12, 24, 32, 45, 57, 68, 81, 99]}
          />
        </div>
      </div>

      {/* Step Explanation Callout */}
      <div className="hero-demo-step-hud">
        <div className="demo-hud-step-tag">
          <span className="pulse-beacon" />
          <span>STEP {currentStepNum} / {totalStepsNum}</span>
        </div>
        <p className="demo-hud-explanation">
          {currentStep?.description || 'Press Play or Step Forward to observe execution.'}
        </p>
      </div>

      {/* Interactive Controls & Timeline Scrubbing */}
      <div className="hero-demo-controls">
        <div className="demo-playback-buttons">
          <button
            type="button"
            className="demo-ctrl-btn"
            onClick={reset}
            title="Reset to step 0"
            aria-label="Reset demonstration"
          >
            ↺
          </button>
          <button
            type="button"
            className="demo-ctrl-btn"
            onClick={stepBackward}
            disabled={currentStepIndex <= 0 || isPlaying}
            title="Step Back"
            aria-label="Step back"
          >
            ◀
          </button>
          {isPlaying ? (
            <button
              type="button"
              className="demo-ctrl-btn is-play"
              onClick={pause}
              title="Pause"
              aria-label="Pause playback"
            >
              ⏸ Pause
            </button>
          ) : (
            <button
              type="button"
              className="demo-ctrl-btn is-play"
              onClick={play}
              disabled={currentStepIndex >= totalSteps - 1}
              title="Play"
              aria-label="Play execution"
            >
              ▶ Play
            </button>
          )}
          <button
            type="button"
            className="demo-ctrl-btn"
            onClick={stepForward}
            disabled={currentStepIndex >= totalSteps - 1 || isPlaying}
            title="Step Forward"
            aria-label="Step forward"
          >
            ▶
          </button>
        </div>

        {/* Timeline Scrubber */}
        <div className="demo-scrubber-container">
          <input
            type="range"
            min={0}
            max={Math.max(0, totalSteps - 1)}
            value={currentStepIndex}
            onChange={(e) => jumpToStep(Number(e.target.value))}
            className="demo-scrubber-slider"
            aria-label="Demonstration Timeline Scrubber"
          />
        </div>
      </div>
    </div>
  );
};
