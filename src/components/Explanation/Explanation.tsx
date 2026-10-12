import React, { useMemo } from 'react';
import type { LearningMode } from '../../learning/types';
import './Explanation.css';

interface ExplanationProps {
  algorithmName: string;
  description: string;
  currentStepIndex: number;
  totalSteps: number;
  mode?: LearningMode;
  codeLine?: number;
  cSourceCode?: string;
  onOpenCodeViewer?: () => void;
}

export const Explanation: React.FC<ExplanationProps> = ({
  description,
  currentStepIndex,
  totalSteps,
  mode = 'explore',
  codeLine,
  cSourceCode,
  onOpenCodeViewer,
}) => {
  const currentStepNum = totalSteps > 0 ? String(currentStepIndex + 1).padStart(2, '0') : '00';
  const totalStepsNum = totalSteps > 0 ? String(totalSteps).padStart(2, '0') : '00';
  const progressPercent = totalSteps > 0 ? ((currentStepIndex + 1) / totalSteps) * 100 : 0;

  // Extract the active executing C instruction line
  const activeCodeSnippet = useMemo(() => {
    if (!codeLine || !cSourceCode) return null;
    const lines = cSourceCode.split('\n');
    const targetLine = lines[codeLine - 1];
    return targetLine ? targetLine.trim() : null;
  }, [codeLine, cSourceCode]);

  return (
    <div className={`teaching-hud ${mode === 'guided' ? 'is-guided-mode' : ''}`} role="status" aria-live="polite">
      {/* Top Meta Line with Step Tracking & Progress */}
      <div className="teaching-hud-meta">
        <div className="step-tracker-label">
          <span className="step-tag">Step</span>
          <span className="step-numbers">
            {currentStepNum} <span className="step-slash">/</span> {totalStepsNum}
          </span>
          {mode === 'guided' && (
            <span className="guided-checkpoint-tag">
              Invariant Checkpoint
            </span>
          )}
        </div>

        {/* Subtle Horizontal Progress Line */}
        <div className="teaching-progress-track">
          <div
            className="teaching-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Primary Teaching Callout & Synchronized Instruction Strip */}
      <div className="teaching-hud-body">
        <p className="teaching-text">{description}</p>

        {activeCodeSnippet && (
          <div className="teaching-code-sync" aria-label="Executing C Source Line">
            <div className="code-sync-badge-group">
              <span className="code-sync-badge">C Instruction · L{codeLine}</span>
            </div>
            <code className="code-sync-snippet">{activeCodeSnippet}</code>
            {onOpenCodeViewer && (
              <button
                type="button"
                className="code-sync-view-btn"
                onClick={onOpenCodeViewer}
                title="View line inside full source file"
              >
                <span>Full Source</span>
                <span className="view-arrow" aria-hidden="true">↗</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
