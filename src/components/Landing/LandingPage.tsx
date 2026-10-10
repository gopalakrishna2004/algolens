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
  const [activeCurriculumTab, setActiveCurriculumTab] = useState<AlgorithmCategory>('searching');

  const scrollToCurriculum = () => {
    const el = document.getElementById('curriculum-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeCategoryAlgos = getAlgorithmsByCategory(activeCurriculumTab);

  return (
    <div className="landing-container">
      {/* Editorial Navigation Masthead */}
      <header className="landing-masthead" role="banner">
        <div className="masthead-left">
          <div className="masthead-mark">
            <span className="optic-glyph">◈</span>
            <span className="brand-logotype">ALGOLENS</span>
          </div>
          <span className="masthead-divider">/</span>
          <span className="masthead-tagline">AN INSTRUMENT FOR COMPUTER SCIENCE</span>
        </div>

        <nav className="masthead-nav" aria-label="Main Navigation">
          <a href="#curriculum-section" className="masthead-nav-link">Curriculum</a>
          <a href="#philosophy-section" className="masthead-nav-link">Architecture</a>
          <a href="#modalities-section" className="masthead-nav-link">Pedagogy</a>
          <button
            type="button"
            className="masthead-cta-btn"
            onClick={() => onEnterLab()}
            title="Open the active learning laboratory"
          >
            <span>Launch Laboratory</span>
            <span className="cta-arrow" aria-hidden="true">──▶</span>
          </button>
        </nav>
      </header>

      {/* Hero Section: Asymmetric Composition & Real Algorithm Engine Demo */}
      <section className="landing-hero-section" aria-label="Introduction">
        <div className="hero-editorial-col">
          <div className="hero-eyebrow">
            <span className="eyebrow-pip" />
            <span>THE ART OF UNDERSTANDING ALGORITHMS</span>
          </div>

          <h1 className="hero-monumental-headline">
            Algorithms,<br />
            rendered as<br />
            <span className="headline-accent-phrase">living thought.</span>
          </h1>

          <p className="hero-editorial-lead">
            AlgoLens transforms abstract computation into deterministic, frame-accurate
            choreography. Observe memory allocation, track state invariants, and predict
            transitions across 32 data structures and algorithms with mathematical fidelity.
          </p>

          <div className="hero-action-cluster">
            <button
              type="button"
              className="hero-primary-btn"
              onClick={() => onEnterLab()}
            >
              <span>Enter Laboratory</span>
              <span className="btn-arrow" aria-hidden="true">──▶</span>
            </button>
            <button
              type="button"
              className="hero-secondary-btn"
              onClick={scrollToCurriculum}
            >
              <span>Explore 6 Chapters</span>
              <span className="btn-glyph" aria-hidden="true">↓</span>
            </button>
          </div>

          {/* Precision Specification Metric Line */}
          <div className="hero-spec-strip" role="list">
            <div className="spec-item" role="listitem">
              <span className="spec-val">32</span>
              <span className="spec-desc">Classic Algorithms</span>
            </div>
            <div className="spec-sep" />
            <div className="spec-item" role="listitem">
              <span className="spec-val">06</span>
              <span className="spec-desc">Study Chapters</span>
            </div>
            <div className="spec-sep" />
            <div className="spec-item" role="listitem">
              <span className="spec-val">100%</span>
              <span className="spec-desc">Deterministic Execution</span>
            </div>
            <div className="spec-sep" />
            <div className="spec-item" role="listitem">
              <span className="spec-val">0 ms</span>
              <span className="spec-desc">Offline Speed</span>
            </div>
          </div>
        </div>

        {/* Real Live Working Algorithm Demonstration */}
        <div className="hero-instrument-col">
          <div className="hero-stage-plaque">
            <div className="plaque-header">
              <div className="plaque-left">
                <span className="plaque-dot" />
                <span className="plaque-title">INTERACTIVE APPARATUS // LIVE ENGINE</span>
              </div>
              <span className="plaque-meta">REAL RUNTIME SNAPSHOTS</span>
            </div>
            <LandingHeroDemo onOpenLabWithAlgo={(id) => onEnterLab(id)} />
          </div>
        </div>
      </section>

      {/* Narrative Section 1: Philosophy & Visible Computation */}
      <section className="landing-philosophy-section" id="philosophy-section" aria-label="Philosophy">
        <div className="section-label-row">
          <span className="section-roman">01 // PHILOSOPHY</span>
          <h2 className="section-editorial-title">How computation becomes visible</h2>
        </div>

        <div className="philosophy-triad-grid">
          <div className="philosophy-card">
            <div className="card-top-index">PILLAR 01</div>
            <h3 className="card-title">Pure Snapshot Architecture</h3>
            <p className="card-text">
              We never approximate algorithm behavior with decorative CSS animations.
              Every visual frame is an immutable, mathematically verified execution snapshot
              extracted directly from pure algorithmic logic before rendering.
            </p>
            <div className="card-micro-spec">Deterministic • Reproducible • Frame-accurate</div>
          </div>

          <div className="philosophy-card">
            <div className="card-top-index">PILLAR 02</div>
            <h3 className="card-title">Syntactic & Spatial Sync</h3>
            <p className="card-text">
              Code and spatial structures are linked at the instruction level.
              When an element swaps in memory, the exact C source line executes in the viewer,
              bridging theoretical pseudocode and physical memory layout.
            </p>
            <div className="card-micro-spec">C Source Code • Line Highlighting • Step HUD</div>
          </div>

          <div className="philosophy-card">
            <div className="card-top-index">PILLAR 03</div>
            <h3 className="card-title">Predictive Cognition</h3>
            <p className="card-text">
              Observation alone produces passive familiarity, not mastery.
              AlgoLens turns learners into active participants by prompting them to predict
              partition pivots, loop invariants, and pointer destinations before the next step executes.
            </p>
            <div className="card-micro-spec">Active Predictions • Real Feedback • Streak Tracking</div>
          </div>
        </div>
      </section>

      {/* Narrative Section 2: The Six Chapters Curriculum */}
      <section className="landing-curriculum-section" id="curriculum-section" aria-label="Curriculum">
        <div className="section-label-row">
          <span className="section-roman">02 // CURRICULUM</span>
          <h2 className="section-editorial-title">Six chapters of computational thought</h2>
          <p className="section-intro-text">
            From foundational linear traversals to complex state-space recursion.
            Select any chapter to inspect its algorithms and launch directly into the laboratory.
          </p>
        </div>

        {/* Chapter Category Tabs */}
        <div className="curriculum-tabs-rail" role="tablist" aria-label="Chapter Selection">
          {CATEGORIES.map((cat, idx) => {
            const isActive = activeCurriculumTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`curriculum-tab-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveCurriculumTab(cat.id as AlgorithmCategory)}
              >
                <span className="tab-chapter-idx">CH 0{idx + 1}</span>
                <span className="tab-name">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Algorithms Grid for Active Chapter */}
        <div className="curriculum-algorithm-grid">
          {activeCategoryAlgos.map((algo) => {
            const isCompleted = completedAlgoIds.includes(algo.metadata.id);
            return (
              <article key={algo.metadata.id} className="algorithm-showcase-card">
                <div className="algo-card-top">
                  <div className="algo-card-badges">
                    <span className="algo-difficulty-badge">{algo.metadata.difficulty}</span>
                    {isCompleted && <span className="algo-completed-badge">✓ Solved</span>}
                  </div>
                  <span className="algo-complexity-pill">
                    {algo.metadata.timeComplexity.average}
                  </span>
                </div>

                <h3 className="algo-card-title">{algo.metadata.name}</h3>
                <p className="algo-card-thesis">{algo.metadata.keyIdea}</p>

                <div className="algo-card-specs-row">
                  <div className="spec-pair">
                    <span className="pair-lbl">BEST</span>
                    <span className="pair-val">{algo.metadata.timeComplexity.best}</span>
                  </div>
                  <div className="spec-pair">
                    <span className="pair-lbl">WORST</span>
                    <span className="pair-val">{algo.metadata.timeComplexity.worst}</span>
                  </div>
                  <div className="spec-pair">
                    <span className="pair-lbl">SPACE</span>
                    <span className="pair-val">{algo.metadata.spaceComplexity}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="algo-card-launch-btn"
                  onClick={() => onEnterLab(algo.metadata.id)}
                  title={`Launch ${algo.metadata.name} in the Laboratory`}
                >
                  <span>Launch in Lab</span>
                  <span className="launch-arrow" aria-hidden="true">→</span>
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* Narrative Section 3: Three Modalities of Mastery */}
      <section className="landing-modalities-section" id="modalities-section" aria-label="Learning Modalities">
        <div className="section-label-row">
          <span className="section-roman">03 // PEDAGOGY</span>
          <h2 className="section-editorial-title">Three modalities of algorithmic mastery</h2>
        </div>

        <div className="modalities-grid">
          <div className="modality-panel explore">
            <div className="modality-header">
              <span className="modality-icon">🔭</span>
              <span className="modality-mode-tag">MODE 01</span>
            </div>
            <h3 className="modality-title">Explore Mode</h3>
            <p className="modality-desc">
              Unrestricted temporal inspection. Scrub through execution snapshots,
              feed custom arrays or graph configurations, alter playback velocity from 0.5× to 4×,
              and study live pointer trajectories at your own pace.
            </p>
            <ul className="modality-bullets">
              <li>Free timeline scrubbing and stepping</li>
              <li>Custom dataset inputs and sorted validators</li>
              <li>Dual algorithm comparative benchmarks</li>
            </ul>
          </div>

          <div className="modality-panel guided">
            <div className="modality-header">
              <span className="modality-icon">🧭</span>
              <span className="modality-mode-tag">MODE 02</span>
            </div>
            <h3 className="modality-title">Guided Mode</h3>
            <p className="modality-desc">
              Curated pedagogical checkpoints. Automatically pauses playback at critical
              invariant boundaries — pivot partitions, edge relaxations, and base-case returns —
              providing deep explanations of why the algorithm behaves as it does.
            </p>
            <ul className="modality-bullets">
              <li>Invariant preservation callouts</li>
              <li>Context-aware decision boundary explanations</li>
              <li>C source code line-by-line sync</li>
            </ul>
          </div>

          <div className="modality-panel challenge">
            <div className="modality-header">
              <span className="modality-icon">🎯</span>
              <span className="modality-mode-tag">MODE 03</span>
            </div>
            <h3 className="modality-title">Challenge Mode</h3>
            <p className="modality-desc">
              Active predictive testing. Generates context-grounded prediction challenges
              directly from the upcoming execution snapshot. Test your mental model before
              the CPU commits the next state change.
            </p>
            <ul className="modality-bullets">
              <li>Real execution-grounded multiple-choice questions</li>
              <li>Instant mathematical rationales for correct & incorrect answers</li>
              <li>Accuracy percentages and persistent winning streaks</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Narrative Section 4: Deterministic AI Tutor & Local Persistence */}
      <section className="landing-companion-section" aria-label="Local Intelligence">
        <div className="companion-banner">
          <div className="companion-left">
            <span className="companion-kicker">LOCAL PEDAGOGICAL INTELLIGENCE</span>
            <h2 className="companion-heading">Honest, deterministic guidance. Zero cloud hallucinations.</h2>
            <p className="companion-copy">
              AlgoLens does not connect to external LLMs that hallucinate algorithmic steps.
              Its internal tutor is a deterministic rule-based pedagogical system that maps
              every step to verified C language specifications, viva exam questions, and complexity proofs.
              All progress is stored privately in your browser&apos;s localStorage.
            </p>
            {challengeStats && (
              <div className="companion-stats-badge">
                <span>Your Lab Stats:</span>
                <strong>{completedAlgoIds.length}/32 Solved</strong>
                <span>•</span>
                <strong>{challengeStats.streak} Current Streak</strong>
              </div>
            )}
          </div>
          <div className="companion-right">
            <button
              type="button"
              className="companion-enter-btn"
              onClick={() => onEnterLab()}
            >
              <span>Enter the Laboratory</span>
              <span className="arrow-glyph" aria-hidden="true">──▶</span>
            </button>
          </div>
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="landing-footer" role="contentinfo">
        <div className="footer-top-row">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="optic-glyph">◈</span>
              <span>ALGOLENS 2.0</span>
            </div>
            <p className="footer-about">
              An interactive learning laboratory dedicated to the art, mathematics,
              and spatial choreography of computer science algorithms.
            </p>
          </div>

          <div className="footer-links-col">
            <span className="col-title">Curriculum</span>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className="footer-link-btn"
                onClick={() => {
                  setActiveCurriculumTab(c.id as AlgorithmCategory);
                  scrollToCurriculum();
                }}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="footer-links-col">
            <span className="col-title">Keyboard Navigation</span>
            <span className="kbd-hint"><kbd>Space</kbd> Play / Pause</span>
            <span className="kbd-hint"><kbd>←</kbd> Step Backward</span>
            <span className="kbd-hint"><kbd>→</kbd> Step Forward</span>
            <span className="kbd-hint"><kbd>Home</kbd> Reset Step</span>
            <span className="kbd-hint"><kbd>Esc</kbd> Close Drawer</span>
          </div>
        </div>

        <div className="footer-bottom-row">
          <span className="footer-copyright">
            © AlgoLens • Client-Side Mathematical Visualizer • Zero Trackers
          </span>
          <button
            type="button"
            className="footer-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to Top ↑
          </button>
        </div>
      </footer>
    </div>
  );
};
