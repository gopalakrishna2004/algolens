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
  onSpeedChange,
}) => {
  return (
    <div className="playback-transport-bar">
      {/* Primary Transport Controls */}
      <div className="transport-deck">
        <button
          type="button"
          className="transport-btn btn-step"
          onClick={onStepBackward}
          disabled={!canStepBackward || isPlaying}
          title="Step Back"
          aria-label="Step Back"
        >
          <span className="btn-icon">◀</span>
          <span className="btn-text">Step Back</span>
        </button>

        {isPlaying ? (
          <button
            type="button"
            className="transport-btn btn-play-pause is-playing"
            onClick={onPause}
            title="Pause Execution"
            aria-label="Pause"
          >
            <span className="btn-icon">⏸</span>
            <span className="btn-text">Pause</span>
          </button>
        ) : (
          <button
            type="button"
            className="transport-btn btn-play-pause"
            onClick={onPlay}
            disabled={totalSteps <= 1 || currentStepIndex >= totalSteps - 1}
            title="Play Execution"
            aria-label="Play"
          >
            <span className="btn-icon">▶</span>
            <span className="btn-text">Play</span>
          </button>
        )}

        <button
          type="button"
          className="transport-btn btn-step"
          onClick={onStepForward}
          disabled={!canStepForward || isPlaying}
          title="Step Forward"
          aria-label="Step Forward"
        >
          <span className="btn-text">Step Forward</span>
          <span className="btn-icon">▶</span>
        </button>

        <button
          type="button"
          className="transport-btn btn-reset"
          onClick={onReset}
          title="Reset to start"
          aria-label="Reset"
        >
          <span className="btn-icon">↺</span>
          <span className="btn-text">Reset</span>
        </button>
      </div>

      {/* Speed Controls Segment */}
      <div className="speed-deck">
        <span className="speed-label">SPEED</span>
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
        />
      </div>
    </div>
  );
};
