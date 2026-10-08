import React, { useState, useMemo } from 'react';
import { CATEGORIES, getAlgorithmsByCategory } from '../../algorithms/registry';
import './Sidebar.css';

interface SidebarProps {
  activeAlgorithmId: string;
  disabled: boolean;
  onSelectAlgorithm: (id: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeAlgorithmId,
  disabled,
  onSelectAlgorithm,
  isOpenMobile = false,
  onCloseMobile,
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
    return filteredCategories.reduce((acc, cat) => acc + cat.algorithms.length, 0);
  }, [filteredCategories]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div className="sidebar-backdrop" onClick={onCloseMobile} />
      )}

      <aside className={`sidebar-curriculum ${isOpenMobile ? 'mobile-open' : ''}`}>
        {/* Brand Display Header */}
        <div className="sidebar-brand-box">
          <div className="brand-logo-lockup">
            <div className="brand-mark">
              <span className="brand-optic-ring" />
              <span className="brand-optic-dot" />
            </div>
            <div className="brand-text-stack">
              <span className="brand-text-primary">ALGO</span>
              <span className="brand-text-secondary">LENS</span>
            </div>
          </div>
          <div className="brand-badge-status">
            <span className="pulse-indicator" />
            <span>LABORATORY</span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="sidebar-search-area">
          <div className="search-input-wrapper">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              className="curriculum-search-input"
              placeholder="Search algorithm or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchTerm('')}
              >
                ✕
              </button>
            )}
          </div>

          <div className="difficulty-segmented-control">
            <button
              type="button"
              className={`seg-btn ${difficultyFilter === 'all' ? 'active' : ''}`}
              onClick={() => setDifficultyFilter('all')}
            >
              All ({totalAlgorithms})
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
        <nav className="curriculum-nav">
          <div className="curriculum-eyebrow">
            <span>CURRICULUM</span>
          </div>

          <div className="curriculum-chapters-list">
            {filteredCategories.map((cat) => {
              if (cat.algorithms.length === 0 && searchTerm) return null;

              return (
                <div key={cat.id} className="chapter-group">
                  <div className="chapter-header">
                    <span className="chapter-index">{cat.chapterNumber}</span>
                    <span className="chapter-title">{cat.name.toUpperCase()}</span>
                    <span className="chapter-count">{cat.algorithms.length}</span>
                  </div>

                  <ul className="chapter-algo-list">
                    {cat.algorithms.map((algo) => {
                      const isActive = algo.metadata.id === activeAlgorithmId;
                      const isIntermediate = algo.metadata.difficulty === 'Intermediate';

                      return (
                        <li key={algo.metadata.id}>
                          <button
                            type="button"
                            className={`algo-item-btn ${isActive ? 'is-active' : ''}`}
                            onClick={() => {
                              onSelectAlgorithm(algo.metadata.id);
                              if (onCloseMobile) onCloseMobile();
                            }}
                            disabled={disabled}
                          >
                            <span className="algo-item-name">{algo.metadata.name}</span>
                            <div className="algo-item-meta">
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
