import React, { useState, useMemo } from 'react';
import { CATEGORIES, getAlgorithmsByCategory, getAlgorithmById } from '../../algorithms/registry';
import './Sidebar.css';

interface SidebarProps {
  activeAlgorithmId: string;
  disabled: boolean;
  onSelectAlgorithm: (id: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  isOpenDrawer?: boolean;
  onCloseDrawer?: () => void;
  isPinned?: boolean;
  onTogglePin?: () => void;
  completedAlgoIds?: string[];
  recentlyExploredIds?: string[];
  challengeStats?: {
    totalAttempted: number;
    totalCorrect: number;
    streak: number;
  };
  onResetProgress?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeAlgorithmId,
  disabled,
  onSelectAlgorithm,
  isOpenMobile = false,
  onCloseMobile,
  isOpenDrawer = false,
  onCloseDrawer,
  isPinned = false,
  onTogglePin,
  completedAlgoIds = [],
  recentlyExploredIds = [],
  challengeStats,
  onResetProgress,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'beginner' | 'intermediate'>('all');

  const filteredCategories = useMemo(() => {
    return CATEGORIES.map((cat, index) => {
      const allInCat = getAlgorithmsByCategory(cat.id);
      const filtered = allInCat.filter((algo) => {
        const matchesName =
          algo.metadata.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          algo.metadata.keyIdea.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDiff =
          difficultyFilter === 'all' ||
          algo.metadata.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
        return matchesName && matchesDiff;
      });

      return {
        ...cat,
        chapterNumber: String(index + 1).padStart(2, '0'),
        algorithms: filtered,
        totalInCat: allInCat.length,
      };
    });
  }, [searchTerm, difficultyFilter]);

  const totalAlgorithms = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.totalInCat, 0);
  }, [filteredCategories]);

  const completedCount = completedAlgoIds.length;
  const progressPercent = totalAlgorithms > 0 ? Math.round((completedCount / totalAlgorithms) * 100) : 0;

  // Resolve recently explored algorithms
  const recentAlgos = useMemo(() => {
    return recentlyExploredIds
      .map((id) => getAlgorithmById(id))
      .filter((a): a is NonNullable<typeof a> => !!a)
      .slice(0, 4);
  }, [recentlyExploredIds]);

  const handleResetClick = () => {
    if (window.confirm('Reset all AlgoLens learning progress and challenge scores? This cannot be undone.')) {
      onResetProgress?.();
    }
  };

  const isVisible = isOpenDrawer || isOpenMobile || isPinned;

  return (
    <>
      {/* Backdrop when drawer is open and unpinned */}
      {isVisible && !isPinned && (
        <div
          className="sidebar-backdrop"
          onClick={() => {
            onCloseDrawer?.();
            onCloseMobile?.();
          }}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar-curriculum ${isVisible ? 'drawer-open' : ''} ${isPinned ? 'is-pinned' : ''}`}
        aria-label="Curriculum Navigation"
      >
        {/* Brand & Drawer Control Header */}
        <div className="sidebar-brand-box">
          <div className="brand-logo-lockup">
            <div className="brand-mark">
              <span className="brand-optic-ring" />
              <span className="brand-optic-dot" />
            </div>
            <div className="brand-text-stack">
              <span className="brand-text-primary">AlgoLens</span>
              <span className="brand-text-secondary">Curriculum</span>
            </div>
          </div>

          <div className="sidebar-header-actions">
            {onTogglePin && (
              <button
                type="button"
                className={`sidebar-action-btn ${isPinned ? 'is-active' : ''}`}
                onClick={onTogglePin}
                title={isPinned ? 'Unpin Sidebar (Floating Drawer)' : 'Pin Sidebar to Workspace'}
                aria-label={isPinned ? 'Unpin Sidebar' : 'Pin Sidebar'}
              >
                📌
              </button>
            )}
            <button
              type="button"
              className="sidebar-action-btn close"
              onClick={() => {
                onCloseDrawer?.();
                onCloseMobile?.();
              }}
              title="Close Curriculum Explorer (Esc)"
              aria-label="Close Curriculum Explorer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Lightweight Progression Overview Card */}
        <div className="sidebar-progress-card" role="region" aria-label="Learning Progression">
          <div className="progress-card-top">
            <div className="progress-metric-label">
              <span>Completion</span>
              <strong className="progress-metric-val">{completedCount}/{totalAlgorithms} ({progressPercent}%)</strong>
            </div>
            {onResetProgress && completedCount > 0 && (
              <button
                type="button"
                className="progress-reset-btn"
                onClick={handleResetClick}
                title="Reset Local Learning Progress"
                aria-label="Reset Learning Progress"
              >
                Reset
              </button>
            )}
          </div>

          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>

          {challengeStats && challengeStats.totalAttempted > 0 && (
            <div className="progress-challenge-stats">
              <span>Challenge Accuracy:</span>
              <strong>
                {Math.round((challengeStats.totalCorrect / challengeStats.totalAttempted) * 100)}% ({challengeStats.totalCorrect}/{challengeStats.totalAttempted})
              </strong>
            </div>
          )}
        </div>

        {/* Recently Explored Algorithms */}
        {recentAlgos.length > 0 && !searchTerm && (
          <div className="recent-algos-section">
            <span className="recent-section-label">Recently Explored</span>
            <div className="recent-chips-tray">
              {recentAlgos.map((algo) => (
                <button
                  key={algo.metadata.id}
                  type="button"
                  className={`recent-chip ${algo.metadata.id === activeAlgorithmId ? 'active' : ''}`}
                  onClick={() => {
                    onSelectAlgorithm(algo.metadata.id);
                    onCloseMobile?.();
                  }}
                  disabled={disabled}
                >
                  {algo.metadata.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search & Filter Toolbar */}
        <div className="sidebar-search-area">
          <div className="search-input-wrapper">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              type="text"
              className="curriculum-search-input"
              placeholder="Search algorithm or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search algorithms or concepts"
            />
            {searchTerm && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="difficulty-segmented-control" role="group" aria-label="Filter by difficulty">
            <button
              type="button"
              className={`seg-btn ${difficultyFilter === 'all' ? 'active' : ''}`}
              onClick={() => setDifficultyFilter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={`seg-btn ${difficultyFilter === 'beginner' ? 'active' : ''}`}
              onClick={() => setDifficultyFilter('beginner')}
            >
              Beginner
            </button>
            <button
              type="button"
              className={`seg-btn ${difficultyFilter === 'intermediate' ? 'active' : ''}`}
              onClick={() => setDifficultyFilter('intermediate')}
            >
              Intermediate
            </button>
          </div>
        </div>

        {/* Curriculum Navigation Section */}
        <nav className="curriculum-nav" aria-label="Curriculum Chapters">
          <div className="curriculum-eyebrow">
            <span>Chapters</span>
          </div>

          <div className="curriculum-chapters-list">
            {filteredCategories.map((cat) => {
              if (cat.algorithms.length === 0 && searchTerm) return null;

              return (
                <div key={cat.id} className="chapter-group">
                  <div className="chapter-header">
                    <span className="chapter-index">{cat.chapterNumber}</span>
                    <span className="chapter-title">{cat.name}</span>
                    <span className="chapter-count">{cat.algorithms.length}</span>
                  </div>

                  <ul className="chapter-algo-list">
                    {cat.algorithms.map((algo) => {
                      const isActive = algo.metadata.id === activeAlgorithmId;
                      const isCompleted = completedAlgoIds.includes(algo.metadata.id);
                      const isIntermediate = algo.metadata.difficulty === 'Intermediate';

                      return (
                        <li key={algo.metadata.id}>
                          <button
                            type="button"
                            className={`algo-item-btn ${isActive ? 'is-active' : ''}`}
                            onClick={() => {
                              onSelectAlgorithm(algo.metadata.id);
                              if (!isPinned) {
                                onCloseDrawer?.();
                                onCloseMobile?.();
                              }
                            }}
                            disabled={disabled}
                            aria-current={isActive ? 'page' : undefined}
                          >
                            <span className="algo-item-name">
                              {algo.metadata.name}
                            </span>
                            <div className="algo-item-meta">
                              {isCompleted && (
                                <span className="completed-check-icon" title="Completed">✓</span>
                              )}
                              <span
                                className={`diff-pip ${isIntermediate ? 'pip-intermediate' : 'pip-beginner'}`}
                                title={algo.metadata.difficulty}
                              >
                                {isIntermediate ? '••' : '•'}
                              </span>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
};
