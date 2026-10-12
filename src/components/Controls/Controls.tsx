import React from 'react';
import './Controls.css';

interface ControlsProps {
  isPlaying: boolean;
  canStepForward: boolean;
  canStepBackward: boolean;
  currentStepIndex: number;
  totalSteps: number;
  speedMs: number;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onJumpToStep?: (stepIndex: number) => void;
  onSpeedChange: (speedMs: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  canStepForward,
  canStepBackward,
  currentStepIndex,
  totalSteps,
  speedMs,
  onPlay,
  onPause,
  onReset,
  onStepForward,
  onStepBackward,
  onJumpToStep,
  onSpeedChange,
}) => {
  const currentStepNum = totalSteps > 0 ? String(currentStepIndex + 1).padStart(2, '0') : '00';
  const totalStepsNum = totalSteps > 0 ? String(totalSteps).padStart(2, '0') : '00';

  return (
    <div className="playback-transport-bar" role="toolbar" aria-label="Algorithm Execution Controls">
      {/* Primary Transport Controls */}
      <div className="transport-deck">
        <button
          type="button"
          className="transport-btn btn-step"
          onClick={onStepBackward}
          disabled={!canStepBackward || isPlaying}
          title="Step Back (Left Arrow)"
          aria-label="Step Back"
        >
          <span className="btn-icon" aria-hidden="true">◀</span>
          <span className="btn-text">Step Back</span>
          <kbd className="btn-kbd">←</kbd>
        </button>

        {isPlaying ? (
          <button
            type="button"
            className="transport-btn btn-play-pause is-playing"
            onClick={onPause}
            title="Pause Execution (Space)"
            aria-label="Pause Execution"
          >
            <span className="btn-icon" aria-hidden="true">⏸</span>
            <span className="btn-text">Pause</span>
            <kbd className="btn-kbd">Space</kbd>
          </button>
        ) : (
          <button
            type="button"
            className="transport-btn btn-play-pause"
            onClick={onPlay}
            disabled={totalSteps <= 1 || currentStepIndex >= totalSteps - 1}
            title="Play Execution (Space)"
            aria-label="Play Execution"
          >
            <span className="btn-icon" aria-hidden="true">▶</span>
            <span className="btn-text">Play</span>
            <kbd className="btn-kbd">Space</kbd>
          </button>
        )}

        <button
          type="button"
          className="transport-btn btn-step"
          onClick={onStepForward}
          disabled={!canStepForward || isPlaying}
          title="Step Forward (Right Arrow)"
          aria-label="Step Forward"
        >
          <span className="btn-text">Step Forward</span>
          <span className="btn-icon" aria-hidden="true">▶</span>
          <kbd className="btn-kbd">→</kbd>
        </button>

        <button
          type="button"
          className="transport-btn btn-reset"
          onClick={onReset}
          title="Reset to start (Home)"
          aria-label="Reset Execution to Step 0"
        >
          <span className="btn-icon" aria-hidden="true">↺</span>
          <span className="btn-text">Reset</span>
          <kbd className="btn-kbd">Home</kbd>
        </button>
      </div>

      {/* Timeline Scrubber */}
      {totalSteps > 1 && onJumpToStep && (
        <div className="timeline-scrubber-deck">
          <span className="scrubber-label">
            {currentStepNum} / {totalStepsNum}
          </span>
          <input
            type="range"
            min="0"
            max={totalSteps - 1}
            value={currentStepIndex}
            onChange={(e) => onJumpToStep(Number(e.target.value))}
            className="timeline-range-slider"
            title={`Scrub to step ${currentStepIndex + 1} of ${totalSteps}`}
            aria-label="Timeline Scrubber"
          />
        </div>
      )}

      {/* Speed Controls Segment */}
      <div className="speed-deck">
        <span className="speed-label">Speed</span>
        <div className="speed-presets">
          {[
            { label: '0.5x', ms: 1000 },
            { label: '1x', ms: 500 },
            { label: '2x', ms: 250 },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              className={`preset-btn ${speedMs === preset.ms ? 'active' : ''}`}
              onClick={() => onSpeedChange(preset.ms)}
              aria-label={`Set playback speed to ${preset.label}`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <input
          id="speed-slider"
          type="range"
          min="100"
          max="1200"
          step="50"
          value={1300 - speedMs}
          onChange={(e) => onSpeedChange(1300 - Number(e.target.value))}
          className="speed-range-slider"
          title={`Speed: ${speedMs}ms / step`}
          aria-label="Playback speed slider"
        />
      </div>
    </div>
  );
};
