import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { UserProgressDataV3, MasteryQuestion } from '../../learning/types';
import {
  createAssessmentAttempt,
  recordAssessmentAnswer,
  evaluateAssessmentAttempt,
  applyAssessmentResult,
  getQuestionsForAttempt,
  isTopicMastered,
} from '../../learning/mastery/masteryEngine';
import { hasMasteryQuestions } from '../../learning/mastery/questionBank';
import {
  saveAssessmentAttempt,
  saveUserProgress,
  clearAssessmentAttempt,
} from '../../learning/progressStorage';
import './MasteryModal.css';

interface MasteryModalProps {
  isOpen: boolean;
  onClose: () => void;
  algoId: string;
  algoName: string;
  userProgress: UserProgressDataV3;
  onUpdateProgress: (updated: UserProgressDataV3) => void;
}

export const MasteryModal: React.FC<MasteryModalProps> = ({
  isOpen,
  onClose,
  algoId,
  algoName,
  userProgress,
  onUpdateProgress,
}) => {
  const isTopicAvailable = hasMasteryQuestions(algoId);
  const isMastered = isTopicMastered(userProgress, algoId);

  const activeAttempt = userProgress.activeAssessment?.algoId === algoId
    ? userProgress.activeAssessment
    : null;

  const [currentQIndex, setCurrentQIndex] = useState(0);

  const handleClose = useCallback(() => {
    if (activeAttempt && (activeAttempt.status === 'passed' || activeAttempt.status === 'failed')) {
      const cleared = clearAssessmentAttempt(userProgress);
      onUpdateProgress(cleared);
    }
    onClose();
  }, [activeAttempt, userProgress, onUpdateProgress, onClose]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Hydrate questions from active attempt
  const questions = useMemo<[MasteryQuestion, MasteryQuestion, MasteryQuestion] | null>(() => {
    if (!activeAttempt) return null;
    return getQuestionsForAttempt(activeAttempt);
  }, [activeAttempt]);

  // Derive evaluation results from active attempt status
  const evaluationResult = useMemo(() => {
    if (!activeAttempt || !questions) return null;
    if (activeAttempt.status === 'passed' || activeAttempt.status === 'failed') {
      return evaluateAssessmentAttempt(activeAttempt, questions);
    }
    return null;
  }, [activeAttempt, questions]);

  if (!isOpen) return null;

  const handleStartAttempt = () => {
    const { attempt } = createAssessmentAttempt(algoId);
    const updated = saveAssessmentAttempt(userProgress, attempt);
    onUpdateProgress(updated);
    setCurrentQIndex(0);
  };

  const handleSelectOption = (qId: string, optId: string) => {
    if (!activeAttempt || activeAttempt.status !== 'in-progress') return;
    const updatedAttempt = recordAssessmentAnswer(activeAttempt, qId, optId);
    const updatedProgress = saveAssessmentAttempt(userProgress, updatedAttempt);
    onUpdateProgress(updatedProgress);
  };

  const handleSubmitAssessment = () => {
    if (!activeAttempt || !questions) return;
    const evalRes = evaluateAssessmentAttempt(activeAttempt, questions);
    const updatedProgress = applyAssessmentResult(
      userProgress,
      activeAttempt,
      evalRes.passed,
      evalRes.score
    );
    saveUserProgress(updatedProgress);
    onUpdateProgress(updatedProgress);
  };

  const currentQ = questions ? questions[currentQIndex] : null;
  const selectedOptId = currentQ && activeAttempt ? activeAttempt.answers[currentQ.id] : undefined;
  const canAdvance = Boolean(selectedOptId);

  return (
    <div
      className="mastery-modal-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mastery-modal-title"
    >
      <div className="mastery-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="mastery-modal-header">
          <div className="mastery-header-left">
            <span className="mastery-crest-badge" aria-hidden="true">★</span>
            <h2 id="mastery-modal-title" className="mastery-modal-title">
              {algoName} · Topic Mastery
            </h2>
          </div>
          <button
            type="button"
            className="mastery-close-btn"
            onClick={handleClose}
            aria-label="Close Mastery Assessment dialog"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="mastery-modal-body">
          {!isTopicAvailable ? (
            <div className="mastery-pilot-notice">
              <h3 className="pilot-notice-title">Topic Assessment Not Found</h3>
              <p className="pilot-notice-desc">
                The Topic Mastery System is fully active across all six curriculum chapters (Searching,
                Sorting, Data Structures, Trees, Graphs, and Algorithmic Techniques).
                No assessment questions were found for this topic identifier.
              </p>
            </div>
          ) : !activeAttempt ? (
            <div className="mastery-pilot-notice">
              {isMastered ? (
                <>
                  <h3 className="pilot-notice-title">Topic Mastered ★</h3>
                  <p className="pilot-notice-desc">
                    You have successfully passed the Easy, Medium, and Hard assessments for {algoName}.
                    You can start a practice attempt at any time to test your invariant recall.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="pilot-notice-title">Mastery Assessment (3 Questions)</h3>
                  <p className="pilot-notice-desc">
                    Test your understanding with 3 randomized questions:
                    <strong> Easy</strong> (Foundations), <strong>Medium</strong> (Invariants),
                    and <strong>Hard</strong> (C Semantics & Complexity).
                    Answering all 3 correctly in one attempt awards permanent topic mastery.
                  </p>
                </>
              )}
            </div>
          ) : evaluationResult ? (
            /* Evaluation Results Screen */
            <div className="mastery-results-card">
              <div className={`results-banner ${evaluationResult.passed ? 'passed' : 'failed'}`}>
                <h3 className="results-score-title">
                  {evaluationResult.passed
                    ? '★ Topic Mastered! (3 / 3)'
                    : `Score: ${evaluationResult.score} / 3`}
                </h3>
                <p className="results-score-desc">
                  {evaluationResult.passed
                    ? `Outstanding work! You demonstrated complete mastery of ${algoName} across all three difficulty tiers.`
                    : 'Mastery requires all 3 tiers (Easy, Medium, Hard) to be answered correctly in the same attempt. Review the rationale below and retry.'}
                </p>
              </div>

              <div className="results-breakdown-list">
                {questions?.map((q, idx) => {
                  const res = evaluationResult.results[q.id];
                  const tierLabel = q.tier.charAt(0).toUpperCase() + q.tier.slice(1);
                  return (
                    <div
                      key={q.id}
                      className={`breakdown-item ${res.isCorrect ? 'correct' : 'incorrect'}`}
                    >
                      <div className="breakdown-header">
                        <span>Tier {idx + 1}: {tierLabel} · {q.concept}</span>
                        <span>{res.isCorrect ? '✓ Correct' : '✗ Missed'}</span>
                      </div>
                      <p className="breakdown-explanation">{q.pedagogicalRationale}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : currentQ ? (
            /* Active Assessment Question View */
            <>
              {/* Stepper */}
              <div className="mastery-tier-stepper" role="tablist" aria-label="Assessment Progress">
                {questions?.map((q, idx) => {
                  const isCur = idx === currentQIndex;
                  const isDone = Boolean(activeAttempt.answers[q.id]);
                  const tierLabel = q.tier.charAt(0).toUpperCase() + q.tier.slice(1);
                  return (
                    <div
                      key={q.id}
                      className={`stepper-step ${isCur ? 'active' : ''} ${isDone ? 'completed' : ''}`}
                    >
                      <span className="step-pip" />
                      <span>{idx + 1}. {tierLabel}</span>
                    </div>
                  );
                })}
              </div>

              {/* Prompt */}
              <div className="mastery-prompt-container">
                <span className="mastery-concept-pill">{currentQ.concept}</span>
                <p className="mastery-prompt-text">{currentQ.prompt}</p>
              </div>

              {/* Code Context if present */}
              {currentQ.codeContext && (
                <div className="mastery-code-box">
                  <pre><code>{currentQ.codeContext.code}</code></pre>
                </div>
              )}

              {/* Options */}
              <div className="mastery-options-list" role="radiogroup" aria-label="Answer options">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedOptId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`mastery-option-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectOption(currentQ.id, opt.id)}
                      role="radio"
                      aria-checked={isSelected}
                    >
                      <span className="option-radio-dot">
                        {isSelected && <span className="option-radio-inner" />}
                      </span>
                      <div className="option-text-wrap">
                        <span className="option-label">{opt.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : null}
        </div>

        {/* Footer */}
        <div className="mastery-modal-footer">
          <button
            type="button"
            className="mastery-btn-secondary"
            onClick={handleClose}
          >
            {evaluationResult ? 'Close' : 'Cancel'}
          </button>

          {!isTopicAvailable ? null : !activeAttempt ? (
            <button
              type="button"
              className="mastery-btn-primary"
              onClick={handleStartAttempt}
            >
              {isMastered ? 'Start Practice Assessment' : 'Start Mastery Assessment'}
            </button>
          ) : evaluationResult ? (
            <button
              type="button"
              className="mastery-btn-primary"
              onClick={handleStartAttempt}
            >
              {evaluationResult.passed ? 'Practice Again' : 'Retry Assessment'}
            </button>
          ) : currentQIndex < 2 ? (
            <button
              type="button"
              className="mastery-btn-primary"
              onClick={() => setCurrentQIndex((prev) => prev + 1)}
              disabled={!canAdvance}
            >
              Next Question →
            </button>
          ) : (
            <button
              type="button"
              className="mastery-btn-primary"
              onClick={handleSubmitAssessment}
              disabled={!canAdvance}
            >
              Submit Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
