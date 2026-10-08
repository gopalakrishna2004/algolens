import React from 'react';
import './Explanation.css';

interface ExplanationProps {
  algorithmName: string;
  description: string;
  currentStepIndex: number;
  totalSteps: number;
}

export const Explanation: React.FC<ExplanationProps> = ({
  description,
  currentStepIndex,
  totalSteps,
}) => {
  const currentStepNum = totalSteps > 0 ? String(currentStepIndex + 1).padStart(2, '0') : '00';
  const totalStepsNum = totalSteps > 0 ? String(totalSteps).padStart(2, '0') : '00';
  const progressPercent = totalSteps > 0 ? ((currentStepIndex + 1) / totalSteps) * 100 : 0;

  return (
    <div className="teaching-hud">
      {/* Top Meta Line with Step Tracking & Progress */}
      <div className="teaching-hud-meta">
        <div className="step-tracker-label">
          <span className="step-tag">STEP</span>
          <span className="step-numbers">
            {currentStepNum} <span className="step-slash">/</span> {totalStepsNum}
          </span>
        </div>

        {/* Subtle Horizontal Progress Line */}
        <div className="teaching-progress-track">
          <div
            className="teaching-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Primary Teaching Callout */}
      <div className="teaching-hud-body">
        <p className="teaching-text">{description}</p>
      </div>
    </div>
  );
};
