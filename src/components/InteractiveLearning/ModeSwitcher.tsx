import React from 'react';
import type { LearningMode } from '../../learning/types';
import './ModeSwitcher.css';

interface ModeSwitcherProps {
  currentMode: LearningMode;
  onModeChange: (mode: LearningMode) => void;
  stats: {
    totalAttempted: number;
    totalCorrect: number;
    streak: number;
  };
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({
  currentMode,
  onModeChange,
  stats,
}) => {
  const accuracy =
    stats.totalAttempted > 0
      ? Math.round((stats.totalCorrect / stats.totalAttempted) * 100)
      : null;

  return (
    <div className="lab-mode-bar" role="toolbar" aria-label="Learning Mode Selection">
      <div className="mode-toggle-group">
        <button
          type="button"
          className={`mode-tab-btn ${currentMode === 'explore' ? 'active' : ''}`}
          onClick={() => onModeChange('explore')}
          aria-pressed={currentMode === 'explore'}
        >
          <span className="mode-icon">🧪</span>
          <span className="mode-title">Explore</span>
        </button>

        <button
          type="button"
          className={`mode-tab-btn ${currentMode === 'guided' ? 'active' : ''}`}
          onClick={() => onModeChange('guided')}
          aria-pressed={currentMode === 'guided'}
        >
          <span className="mode-icon">🧭</span>
          <span className="mode-title">Guided</span>
        </button>

        <button
          type="button"
          className={`mode-tab-btn ${currentMode === 'challenge' ? 'active' : ''}`}
          onClick={() => onModeChange('challenge')}
          aria-pressed={currentMode === 'challenge'}
        >
          <span className="mode-icon">🎯</span>
          <span className="mode-title">Challenge Mode</span>
        </button>
      </div>

      {/* Mode telemetry summary */}
      <div className="mode-telemetry-summary">
        {currentMode === 'explore' && (
          <span className="mode-hint-text">
            Unrestricted manual playback &amp; inspection.
          </span>
        )}
        {currentMode === 'guided' && (
          <span className="mode-hint-text">
            Walkthrough with invariant checkpoints &amp; C code alignment.
          </span>
        )}
        {currentMode === 'challenge' && (
          <div className="challenge-score-summary">
            <span className="score-label">ACCURACY:</span>
            <span className="score-value">
              {accuracy !== null ? `${accuracy}% (${stats.totalCorrect}/${stats.totalAttempted})` : '0 Attempted'}
            </span>
            {stats.streak > 0 && (
              <span className="score-streak">🔥 {stats.streak} Streak</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
