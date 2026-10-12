import React from 'react';
import type { LearningMode } from '../../learning/types';
import { ThemeToggle } from './ThemeToggle';
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
  onOpenMasteryModal?: () => void;
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
  onOpenMasteryModal,
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
          <span className="brand-label">AlgoLens</span>
          <span className="brand-sub">Laboratory</span>
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
          <span className="trigger-chapter-badge">Chapter {chapterNumber} · {categoryName}</span>
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
            <svg className="mode-tab-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
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
            <svg className="mode-tab-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="12 2 19 21 12 17 5 21 12 2" />
            </svg>
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
            <svg className="mode-tab-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="mode-tab-text">Challenge</span>
            {challengeStreak > 0 && (
              <span className="mode-streak-badge">+{challengeStreak}</span>
            )}
          </button>
        </div>
      </div>

      {/* Right: Progress Telemetry & Keyboard Helper */}
      <div className="navbar-right">
        <ThemeToggle />

        <button
          type="button"
          className="nav-progress-capsule"
          onClick={onOpenMasteryModal}
          title={`${completedCount} of ${totalAlgorithms} algorithms mastered. Click to open Mastery Assessment.`}
          aria-label={`Mastery Progress: ${completedCount} of ${totalAlgorithms} algorithms mastered. Click to open Mastery Assessment.`}
        >
          <span className="capsule-label">Mastered</span>
          <span className="capsule-count">
            <strong>{completedCount}</strong>/{totalAlgorithms}
          </span>
        </button>

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
