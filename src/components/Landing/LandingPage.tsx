import React, { useState } from 'react';
import { CATEGORIES, getAlgorithmsByCategory } from '../../algorithms/registry';
import { LandingHeroDemo } from './LandingHeroDemo';
import type { AlgorithmCategory } from '../../algorithms/types';
import './LandingPage.css';

interface LandingPageProps {
  onEnterLab: (algoId?: string) => void;
  completedAlgoIds?: string[];
  challengeStats?: {
    totalAttempted: number;
    totalCorrect: number;
    streak: number;
  };
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterLab,
  completedAlgoIds = [],
  challengeStats,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<AlgorithmCategory | 'all'>('all');

  const scrollToCurriculum = () => {
    const el = document.getElementById('curriculum-ledger');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayedAlgorithms = React.useMemo(() => {
    if (selectedCategory === 'all') {
      return CATEGORIES.flatMap((c) =>
        getAlgorithmsByCategory(c.id).map((algo, idx) => ({
          ...algo,
          chapterIndex: CATEGORIES.findIndex((cat) => cat.id === c.id) + 1,
          itemIndex: idx + 1,
        }))
      );
    }
    const catIndex = CATEGORIES.findIndex((c) => c.id === selectedCategory);
    return getAlgorithmsByCategory(selectedCategory).map((algo, idx) => ({
      ...algo,
      chapterIndex: catIndex + 1,
      itemIndex: idx + 1,
    }));
  }, [selectedCategory]);

  return (
    <div className="editorial-landing-root">
      {/* Editorial Masthead */}
      <header className="editorial-masthead" role="banner">
        <div className="masthead-brand-group">
          <div className="masthead-symbol-lockup">
            <span className="masthead-mark-glyph" aria-hidden="true">◈</span>
            <span className="masthead-brand-name">ALGOLENS</span>
          </div>
          <span className="masthead-tagline-pipe">/</span>
          <span className="masthead-descriptor">PRECISION COMPUTER SCIENCE INSTRUMENT</span>
        </div>

        <nav className="masthead-links-cluster" aria-label="Main Navigation">
          <a href="#curriculum-ledger" className="masthead-text-link">Curriculum</a>
          <a href="#pedagogical-architecture" className="masthead-text-link">Pedagogy</a>
          <a href="#deterministic-engine" className="masthead-text-link">Engine</a>
          <button
            type="button"
            className="masthead-primary-action"
            onClick={() => onEnterLab()}
            title="Launch the Interactive Learning Laboratory"
          >
            <span>Enter Laboratory</span>
            <span className="action-arrow" aria-hidden="true">──▶</span>
          </button>
        </nav>
      </header>

      {/* Hero Section: Monumental Typography & Aperture Stage */}
      <section className="editorial-hero-block" aria-label="Overview Hero">
        <div className="hero-typography-container">
          <div className="hero-kicker-strip">
            <span className="kicker-pip" />
            <span>THE CHOREOGRAPHY OF COMPUTATION</span>
          </div>

          <h1 className="hero-sculptural-title">
            Algorithms made tangible.
          </h1>

          <p className="hero-editorial-statement">
            AlgoLens renders algorithmic execution not as simulated graphics, but as
            frame-accurate mathematical snapshots. Observe memory registers, trace invariant
            boundaries, and step through 32 fundamental data structures and algorithms with
            zero cloud dependencies.
          </p>

          <div className="hero-action-row">
            <button
              type="button"
              className="hero-launch-lab-btn"
              onClick={() => onEnterLab()}
            >
              <span>Launch Laboratory</span>
              <span className="btn-arrow" aria-hidden="true">──▶</span>
            </button>
            <button
              type="button"
              className="hero-index-jump-btn"
              onClick={scrollToCurriculum}
            >
              <span>Curriculum Index (32 Instruments)</span>
              <span className="btn-down-glyph" aria-hidden="true">↓</span>
            </button>
          </div>
        </div>

        {/* Cinematic Aperture Stage (Live Running Instrument) */}
        <div className="hero-aperture-stage-wrapper">
          <LandingHeroDemo onOpenLabWithAlgo={(id) => onEnterLab(id)} />
        </div>
      </section>

      {/* Narrative Section 1: Three Architectural Postulates */}
      <section className="postulates-section" id="deterministic-engine" aria-label="Design Principles">
        <div className="section-super-heading">
          <span className="super-num">01</span>
          <span className="super-lbl">FOUNDATIONAL ARCHITECTURE</span>
        </div>

        <div className="postulates-triad">
          <div className="postulate-col">
            <span className="postulate-index">POSTULATE 01</span>
            <h2 className="postulate-title">Pure Execution Snapshots</h2>
            <p className="postulate-text">
              We never approximate algorithm behavior with decorative CSS animations or mock timers.
              Every rendered frame is a mathematically verified, immutable execution snapshot
              extracted directly from pure algorithmic logic before drawing a single pixel.
            </p>
            <span className="postulate-meta">Deterministic • Reproducible • Frame-accurate</span>
          </div>

          <div className="postulate-col">
            <span className="postulate-index">POSTULATE 02</span>
            <h2 className="postulate-title">Syntactic & Spatial Coherence</h2>
            <p className="postulate-text">
              Abstract data structures and real C language source lines are linked at the instruction level.
              When a pivot swaps in memory, the exact C line highlights in real time,
              bridging classroom pseudocode and physical memory layout.
            </p>
            <span className="postulate-meta">Synchronized C Code • Step Invariants • Memory Layout</span>
          </div>

          <div className="postulate-col">
            <span className="postulate-index">POSTULATE 03</span>
            <h2 className="postulate-title">Predictive Cognition</h2>
            <p className="postulate-text">
              Passive observation produces familiarity, not true conceptual mastery.
              AlgoLens turns learners into active participants by prompting them to predict
              partition pivots, loop invariants, and pointer destinations before the next step executes.
            </p>
            <span className="postulate-meta">Active Prediction • Real Feedback • Winning Streaks</span>
          </div>
        </div>
      </section>

      {/* Narrative Section 2: Master Algorithm Curriculum Ledger */}
      <section className="curriculum-ledger-section" id="curriculum-ledger" aria-label="Curriculum Ledger">
        <div className="ledger-header-row">
          <div className="section-super-heading">
            <span className="super-num">02</span>
            <span className="super-lbl">CURRICULUM REGISTRY</span>
          </div>
          <h2 className="ledger-main-title">Thirty-two algorithms across six chapters</h2>
          <p className="ledger-sub-text">
            Filter by computational domain or browse the entire catalogue. Select any entry to launch directly into its dedicated laboratory instrument.
          </p>
        </div>

        {/* Minimalist Chapter Filter Rails */}
        <div className="ledger-filter-rail" role="tablist" aria-label="Curriculum Filter">
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === 'all'}
            className={`filter-pill-btn ${selectedCategory === 'all' ? 'is-active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            <span>All 32 Algorithms</span>
          </button>
          {CATEGORIES.map((cat, idx) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`filter-pill-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat.id as AlgorithmCategory)}
              >
                <span className="cat-num">0{idx + 1}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Editorial Ledger Rows */}
        <div className="ledger-table-container">
          <div className="ledger-table-head">
            <span className="th-col col-idx">CH</span>
            <span className="th-col col-name">ALGORITHM</span>
            <span className="th-col col-idea">INVARIANT & KEY THESIS</span>
            <span className="th-col col-time">TIME (AVG)</span>
            <span className="th-col col-diff">DIFFICULTY</span>
            <span className="th-col col-action">ACTION</span>
          </div>

          <div className="ledger-table-body" role="list">
            {displayedAlgorithms.map((algo) => {
              const isCompleted = completedAlgoIds.includes(algo.metadata.id);
              return (
                <div
                  key={algo.metadata.id}
                  className={`ledger-row-item ${isCompleted ? 'is-completed' : ''}`}
                  role="listitem"
                  onClick={() => onEnterLab(algo.metadata.id)}
                >
                  <div className="row-col col-idx">
                    <span className="ch-code">0{algo.chapterIndex}.{algo.itemIndex}</span>
                  </div>

                  <div className="row-col col-name">
                    <span className="algo-display-name">{algo.metadata.name}</span>
                    {isCompleted && <span className="solved-tag">✓ Solved</span>}
                  </div>

                  <div className="row-col col-idea">
                    <p className="algo-thesis-excerpt">{algo.metadata.keyIdea}</p>
                  </div>

                  <div className="row-col col-time">
                    <span className="time-complexity-tag">{algo.metadata.timeComplexity.average}</span>
                  </div>

                  <div className="row-col col-diff">
                    <span className={`diff-tag ${algo.metadata.difficulty.toLowerCase()}`}>
                      {algo.metadata.difficulty}
                    </span>
                  </div>

                  <div className="row-col col-action">
                    <button
                      type="button"
                      className="ledger-launch-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEnterLab(algo.metadata.id);
                      }}
                      title={`Launch ${algo.metadata.name} in Laboratory`}
                    >
                      <span>Launch</span>
                      <span className="launch-glyph" aria-hidden="true">↗</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Narrative Section 3: Three Modalities of Mastery */}
      <section className="pedagogical-architecture-section" id="pedagogical-architecture" aria-label="Pedagogy">
        <div className="section-super-heading">
          <span className="super-num">03</span>
          <span className="super-lbl">PEDAGOGICAL MODALITIES</span>
        </div>

        <div className="pedagogy-spread">
          <div className="pedagogy-card explore">
            <div className="pedagogy-card-header">
              <span className="pedagogy-num">MODE 01</span>
              <span className="pedagogy-symbol">🔭</span>
            </div>
            <h3 className="pedagogy-title">Explore Mode</h3>
            <p className="pedagogy-text">
              Unrestricted temporal stepping. Scrub across execution snapshots,
              input custom arrays or graphs, modulate velocity from 0.5× to 4×,
              and study state transitions at your own pace.
            </p>
            <div className="pedagogy-spec-list">
              <span>• Free timeline scrubbing and stepping</span>
              <span>• Custom dataset inputs and sorted validators</span>
              <span>• Dual algorithm comparative benchmarks</span>
            </div>
          </div>

          <div className="pedagogy-card guided">
            <div className="pedagogy-card-header">
              <span className="pedagogy-num">MODE 02</span>
              <span className="pedagogy-symbol">🧭</span>
            </div>
            <h3 className="pedagogy-title">Guided Mode</h3>
            <p className="pedagogy-text">
              Curated invariant checkpoints. Playback pauses at critical inflection
              points — partition pivots, edge relaxations, and base-case terminations —
              explaining exactly why the algorithm behaves as it does.
            </p>
            <div className="pedagogy-spec-list">
              <span>• Invariant preservation callouts</span>
              <span>• Context-aware decision boundary explanations</span>
              <span>• Synchronized C source line tracking</span>
            </div>
          </div>

          <div className="pedagogy-card challenge">
            <div className="pedagogy-card-header">
              <span className="pedagogy-num">MODE 03</span>
              <span className="pedagogy-symbol">🎯</span>
            </div>
            <h3 className="pedagogy-title">Challenge Mode</h3>
            <p className="pedagogy-text">
              Active prediction engine. Generates context-grounded prediction challenges
              directly from the upcoming execution snapshot. Test your mental model before
              the CPU commits the next state change.
            </p>
            <div className="pedagogy-spec-list">
              <span>• Real snapshot-grounded prediction questions</span>
              <span>• Instant mathematical feedback for answers</span>
              <span>• Accuracy percentages and winning streaks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section 4: Deterministic AI Tutor & Local Persistence */}
      <section className="integrity-banner-section" aria-label="System Integrity">
        <div className="integrity-banner-box">
          <div className="integrity-content">
            <span className="integrity-kicker">HONEST LOCAL INTELLIGENCE</span>
            <h2 className="integrity-headline">Mathematical fidelity. Zero cloud hallucinations.</h2>
            <p className="integrity-paragraph">
              AlgoLens does not connect to external LLMs that hallucinate algorithmic steps.
              Its internal tutor is a deterministic pedagogical advisor that maps
              every step to verified C language specifications, viva exam questions, and complexity proofs.
              All progress is stored privately in your browser&apos;s localStorage.
            </p>
            {challengeStats && (
              <div className="integrity-stats-strip">
                <span>Personal Lab Record:</span>
                <strong>{completedAlgoIds.length}/32 Mastered</strong>
                <span>•</span>
                <strong>{challengeStats.streak} Win Streak</strong>
              </div>
            )}
          </div>
          <div className="integrity-action">
            <button
              type="button"
              className="integrity-launch-btn"
              onClick={() => onEnterLab()}
            >
              <span>Enter the Laboratory</span>
              <span className="btn-glyph" aria-hidden="true">──▶</span>
            </button>
          </div>
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="editorial-footer" role="contentinfo">
        <div className="footer-top-grid">
          <div className="footer-col-brand">
            <div className="footer-brand-title">
              <span className="brand-glyph" aria-hidden="true">◈</span>
              <span>ALGOLENS</span>
            </div>
            <p className="footer-brand-desc">
              An interactive technical instrument dedicated to the art, mathematics,
              and spatial choreography of data structures and algorithms.
            </p>
          </div>

          <div className="footer-col-curriculum">
            <span className="footer-col-title">Curriculum Chapters</span>
            <div className="footer-cat-list">
              {CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.id}
                  type="button"
                  className="footer-cat-btn"
                  onClick={() => {
                    setSelectedCategory(cat.id as AlgorithmCategory);
                    scrollToCurriculum();
                  }}
                >
                  <span className="cat-idx">0{idx + 1}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="footer-col-shortcuts">
            <span className="footer-col-title">Keyboard Hotkeys</span>
            <div className="footer-shortcuts-list">
              <div className="shortcut-item"><kbd>Space</kbd> <span>Play / Pause</span></div>
              <div className="shortcut-item"><kbd>←</kbd> <span>Step Backward</span></div>
              <div className="shortcut-item"><kbd>→</kbd> <span>Step Forward</span></div>
              <div className="shortcut-item"><kbd>Home</kbd> <span>Rewind Step 0</span></div>
              <div className="shortcut-item"><kbd>C</kbd> <span>Curriculum Drawer</span></div>
              <div className="shortcut-item"><kbd>?</kbd> <span>Shortcuts Guide</span></div>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <span>© AlgoLens • Client-Side Mathematical Visualizer • Zero Cloud Trackers</span>
          <button
            type="button"
            className="footer-back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to Top ↑
          </button>
        </div>
      </footer>
    </div>
  );
};
