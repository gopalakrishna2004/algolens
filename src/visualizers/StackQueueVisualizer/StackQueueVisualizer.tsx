import React from 'react';
import type { StackQueueStep } from '../../algorithms/types';
import './StackQueueVisualizer.css';

interface StackQueueVisualizerProps {
  step: StackQueueStep;
}

export const StackQueueVisualizer: React.FC<StackQueueVisualizerProps> = ({ step }) => {
  const isStack = step.structureType === 'stack';

  return (
    <div className="stack-queue-stage">
      {/* Editorial Telemetry Strip */}
      <div className="sq-telemetry-strip">
        <div className="sq-op-tag">
          {step.action.charAt(0).toUpperCase() + step.action.slice(1)} {step.activeItem !== undefined ? `(${step.activeItem})` : ''}
        </div>
        <div className="sq-stat-pill">
          Structure: <strong>{isStack ? 'Stack (LIFO)' : 'Queue (FIFO)'}</strong>
        </div>
        <div className="sq-stat-pill">
          Size: <strong>{step.items.length}</strong>
        </div>
      </div>

      {isStack ? (
        /* Vertical Stack View */
        <div className="stack-layout">
          <div className="stack-chamber-container">
            <div className="stack-entry-indicator">
              Push &amp; Pop Aperture
            </div>

            {/* Stack Container Chamber */}
            <div className="stack-chamber">
              {step.items.length === 0 ? (
                <div className="stack-chamber-empty">
                  Empty stack
                </div>
              ) : (
                step.items.map((val, idx) => {
                  const isTop = idx === step.items.length - 1;
                  const isHighlighted = idx === step.highlightedIndex;

                  let cartridgeClass = 'stack-cartridge';
                  if (isTop) cartridgeClass += ' is-top';
                  if (isHighlighted) cartridgeClass += ' is-highlighted';

                  return (
                    <div key={idx} className={cartridgeClass}>
                      <div className="stack-cartridge-left">
                        <span className="stack-slot-index">[{idx}]</span>
                        <span className="stack-val">{val}</span>
                      </div>
                      {isTop && <span className="stack-top-badge">Top</span>}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Stack Legend & Editorial Notation */}
          <div className="stack-legend-panel">
            <div className="stack-legend-title">Top Register</div>
            <div className="stack-legend-meta">
              Top Index: <strong>{step.items.length > 0 ? step.items.length - 1 : 'Empty'}</strong>
            </div>
            <div className="stack-legend-meta">
              LIFO discipline: pushes and pops occur strictly at the top aperture.
            </div>
          </div>
        </div>
      ) : (
        /* Horizontal Queue View */
        <div className="queue-layout">
          <div className="queue-conveyor-row">
            {/* Front Exit Gate */}
            <div className="queue-gate front">
              <span>Front</span>
              <span>(Dequeue)</span>
            </div>

            {/* Conveyor Track */}
            <div className="queue-conveyor-track">
              {step.items.length === 0 ? (
                <div className="queue-empty-msg">Empty queue</div>
              ) : (
                step.items.map((val, idx) => {
                  const isFront = idx === 0;
                  const isRear = idx === step.items.length - 1;
                  const isHighlighted = idx === step.highlightedIndex;

                  let capsuleClass = 'queue-capsule';
                  if (isFront) capsuleClass += ' is-front';
                  if (isRear) capsuleClass += ' is-rear';
                  if (isHighlighted) capsuleClass += ' is-highlighted';

                  return (
                    <div key={idx} className={capsuleClass}>
                      <span className="queue-capsule-val">{val}</span>
                      <span className="queue-capsule-tag">
                        {isFront ? 'Front' : isRear ? 'Rear' : `[${idx}]`}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Rear Entry Gate */}
            <div className="queue-gate rear">
              <span>Rear</span>
              <span>(Enqueue)</span>
            </div>
          </div>

          <div className="queue-policy-note">
            FIFO discipline: elements enter at the rear and depart from the front.
          </div>
        </div>
      )}
    </div>
  );
};
