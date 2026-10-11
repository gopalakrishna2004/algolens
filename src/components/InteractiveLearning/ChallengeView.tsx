import React, { useState } from 'react';
import type { ChallengeQuestion } from '../../learning/types';
import './ChallengeView.css';

interface ChallengeViewProps {
  challenge: ChallengeQuestion | null;
  onAnswer: (isCorrect: boolean) => void;
  onContinue: () => void;
  onExitChallenge: () => void;
  currentStepIndex: number;
  totalSteps: number;
  streak: number;
}

export const ChallengeView: React.FC<ChallengeViewProps> = ({
  challenge,
  onAnswer,
  onContinue,
  onExitChallenge,
  currentStepIndex,
  totalSteps,
  streak,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [revealed, setRevealed] = useState(false);


  if (!challenge) {
    return (
      <div className="challenge-idle-banner" role="region" aria-label="Challenge Status">
        <div className="idle-banner-left">
          <span className="challenge-mode-badge">🎯 CHALLENGE MODE</span>
          <span className="idle-banner-text">
            Step {currentStepIndex + 1} of {totalSteps}: Advance playback to the next decision boundary to test your prediction.
          </span>
        </div>
        <div className="idle-banner-actions">
          <button
            type="button"
            className="challenge-action-btn btn-secondary"
            onClick={onExitChallenge}
            aria-label="Exit Challenge Mode"
          >
            Exit to Explore
          </button>
        </div>
      </div>
    );
  }

  const isCorrect = selectedOptionId === challenge.correctOptionId;
  const selectedOption = challenge.options.find((o) => o.id === selectedOptionId);

  const handleSubmit = (optionId: string) => {
    if (hasSubmitted && isCorrect) return;
    setSelectedOptionId(optionId);
    setHasSubmitted(true);
    const correct = optionId === challenge.correctOptionId;
    onAnswer(correct);
  };

  const handleRetry = () => {
    setSelectedOptionId(null);
    setHasSubmitted(false);
  };

  const handleReveal = () => {
    setRevealed(true);
  };

  return (
    <section className="challenge-console" role="region" aria-label="Algorithmic Challenge">
      {/* Header telemetry */}
      <div className="challenge-console-header">
        <div className="challenge-tag-group">
          <span className="challenge-mode-badge">🎯 PREDICTION CHALLENGE</span>
          <span className="challenge-concept-tag">{challenge.concept}</span>
        </div>
        <div className="challenge-meta-right">
          {streak > 0 && (
            <span className="challenge-streak-chip">
              🔥 {streak} Streak
            </span>
          )}
          <button
            type="button"
            className="challenge-exit-btn"
            onClick={onExitChallenge}
            title="Exit Challenge Mode"
            aria-label="Exit Challenge Mode"
          >
            Exit Challenge ✕
          </button>
        </div>
      </div>

      {/* Question Prompt */}
      <div className="challenge-prompt-box">
        <h3 className="challenge-prompt-title">{challenge.prompt}</h3>
      </div>

      {/* Multiple-choice options */}
      <div className="challenge-options-deck" role="radiogroup" aria-label="Prediction options">
        {challenge.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          const isThisOptionCorrect = option.id === challenge.correctOptionId;

          let optionStateClass = '';
          if (hasSubmitted || revealed) {
            if (isThisOptionCorrect) {
              optionStateClass = 'option-correct';
            } else if (isSelected) {
              optionStateClass = 'option-incorrect';
            }
          } else if (isSelected) {
            optionStateClass = 'option-selected';
          }

          return (
            <button
              key={option.id}
              type="button"
              className={`challenge-option-card ${optionStateClass}`}
              onClick={() => handleSubmit(option.id)}
              disabled={hasSubmitted && isCorrect}
              role="radio"
              aria-checked={isSelected}
            >
              <span className="option-index-badge">{String.fromCharCode(65 + idx)}</span>
              <span className="option-label-text">{option.label}</span>
            </button>
          );
        })}
      </div>

      {/* Immediate feedback & rationales */}
      {(hasSubmitted || revealed) && (
        <div className={`challenge-feedback-panel ${isCorrect || revealed ? 'feedback-success' : 'feedback-error'}`}>
          <div className="feedback-status-line">
            <span className="feedback-icon">{isCorrect ? '✓' : revealed ? 'ℹ' : '✗'}</span>
            <span className="feedback-verdict">
              {isCorrect
                ? 'Accurate Prediction! Invariant Verified.'
                : revealed
                ? 'Invariant Blueprint Revealed'
                : 'Prediction Missed'}
            </span>
          </div>

          <div className="feedback-explanation">
            {selectedOption && !revealed && (
              <p className="feedback-detail-text">
                <strong>Analysis:</strong> {selectedOption.explanation}
              </p>
            )}
            <p className="feedback-rationale-text">
              <strong>Core Rule:</strong> {challenge.rationale}
            </p>
          </div>

          <div className="feedback-actions-row">
            {!isCorrect && !revealed && (
              <>
                <button
                  type="button"
                  className="challenge-action-btn btn-secondary"
                  onClick={handleRetry}
                >
                  Try Again
                </button>
                <button
                  type="button"
                  className="challenge-action-btn btn-secondary"
                  onClick={handleReveal}
                >
                  Reveal Answer
                </button>
              </>
            )}
            <button
              type="button"
              className="challenge-action-btn btn-primary"
              onClick={onContinue}
            >
              Continue Execution ➔
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
