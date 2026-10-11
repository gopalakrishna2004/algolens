import React from 'react';
import type { LearningMode } from '../../learning/types';
import './InstrumentNavbar.css';

interface InstrumentNavbarProps {
  onNavigateHome: () => void;
  activeAlgorithmName: string;
  chapterNumber: string;
  categoryName: string;
  isCurriculumOpen: boolean;
  onToggleCurriculum: () => void;
  learningMode: LearningMode;
  onModeChange: (mode: LearningMode) => void;
  completedCount: number;
  totalAlgorithms: number;
  challengeStreak: number;
  onOpenShortcutsModal?: () => void;
}

export const InstrumentNavbar: React.FC<InstrumentNavbarProps> = ({
  onNavigateHome,
  activeAlgorithmName,
  chapterNumber,
  categoryName,
  isCurriculumOpen,
  onToggleCurriculum,
  learningMode,
  onModeChange,
  completedCount,
  totalAlgorithms,
  challengeStreak,
  onOpenShortcutsModal,
}) => {
  return (
    <header className="instrument-navbar" role="banner">
      {/* Left: Brand Mark & Home Return */}
      <div className="navbar-left">
        <button
          type="button"
          className="nav-home-btn"
          onClick={onNavigateHome}
          title="Return to AlgoLens Overview"
          aria-label="Return to AlgoLens Overview"
        >
          <span className="home-glyph" aria-hidden="true">←</span>
          <span className="home-text">Overview</span>
        </button>

        <div className="nav-divider" />

        <div className="nav-brand-lockup">
          <span className="brand-dot" />
          <span className="brand-label">ALGOLENS</span>
          <span className="brand-sub">LAB</span>
        </div>

        {/* Curriculum Command Selector Trigger */}
        <button
          type="button"
          className={`curriculum-command-trigger ${isCurriculumOpen ? 'is-open' : ''}`}
          onClick={onToggleCurriculum}
          aria-expanded={isCurriculumOpen}
          aria-label="Toggle Curriculum Explorer"
          title="Browse all 32 algorithms across 6 chapters (Hotkey: C or Cmd+K)"
        >
          <span className="trigger-chapter-badge">CH {chapterNumber} • {categoryName.toUpperCase()}</span>
          <span className="trigger-algo-name">{activeAlgorithmName}</span>
          <span className="trigger-arrow" aria-hidden="true">▾</span>
          <kbd className="trigger-kbd">C</kbd>
        </button>
      </div>

      {/* Center: Interactive Mode Switcher */}
      <div className="navbar-center">
        <div className="nav-mode-segmented-control" role="tablist" aria-label="Learning Mode">
          <button
            type="button"
            role="tab"
            aria-selected={learningMode === 'explore'}
            className={`nav-mode-tab ${learningMode === 'explore' ? 'is-active' : ''}`}
            onClick={() => onModeChange('explore')}
            title="Explore Mode: Self-paced temporal stepping and free inspection"
          >
            <span className="mode-tab-icon" aria-hidden="true">🔭</span>
            <span className="mode-tab-text">Explore</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={learningMode === 'guided'}
            className={`nav-mode-tab ${learningMode === 'guided' ? 'is-active' : ''}`}
            onClick={() => onModeChange('guided')}
            title="Guided Mode: Pedagogical stops at algorithmic invariant boundaries"
          >
            <span className="mode-tab-icon" aria-hidden="true">🧭</span>
            <span className="mode-tab-text">Guided</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={learningMode === 'challenge'}
            className={`nav-mode-tab ${learningMode === 'challenge' ? 'is-active' : ''}`}
            onClick={() => onModeChange('challenge')}
            title="Challenge Mode: Predict execution transitions with streak tracking"
          >
            <span className="mode-tab-icon" aria-hidden="true">🎯</span>
            <span className="mode-tab-text">Challenge</span>
            {challengeStreak > 0 && (
              <span className="mode-streak-badge">⚡{challengeStreak}</span>
            )}
          </button>
        </div>
      </div>

      {/* Right: Progress Telemetry & Keyboard Helper */}
      <div className="navbar-right">
        <div className="nav-progress-capsule" title={`${completedCount} of ${totalAlgorithms} algorithms mastered`}>
          <span className="capsule-label">MASTERED</span>
          <span className="capsule-count">
            <strong>{completedCount}</strong>/{totalAlgorithms}
          </span>
        </div>

        {onOpenShortcutsModal && (
          <button
            type="button"
            className="nav-shortcuts-btn"
            onClick={onOpenShortcutsModal}
            title="View Keyboard Shortcuts (?)"
            aria-label="View Keyboard Shortcuts"
          >
            <kbd className="shortcuts-kbd">?</kbd>
          </button>
        )}
      </div>
    </header>
  );
};
