import React from 'react';
import type { AlgorithmCategory, StepPointers } from '../../algorithms/types';
import './Metrics.css';

interface MetricsProps {
  category: AlgorithmCategory;
  target?: number;
  currentIndex?: number;
  pointers?: StepPointers;
  isFound: boolean;
  foundIndex?: number;
  comparisons: number;
  swaps?: number;
  isCompleted: boolean;
}

export const Metrics: React.FC<MetricsProps> = ({
  category,
  target,
  currentIndex,
  pointers,
  isFound,
  foundIndex,
  comparisons,
  swaps,
  isCompleted,
}) => {
  let statusText = 'Idle';
  let statusType = 'status-idle';

  if (category === 'sorting') {
    if (isCompleted) {
      statusText = 'Sorted';
      statusType = 'status-found';
    } else {
      statusText = 'Sorting…';
      statusType = 'status-active';
    }
  } else {
    if (isFound) {
      statusText = `Match at index ${foundIndex}`;
      statusType = 'status-found';
    } else if (isCompleted) {
      statusText = 'Target not found';
      statusType = 'status-not-found';
    } else if (currentIndex !== undefined || pointers?.mid !== undefined) {
      statusText = 'Comparing…';
      statusType = 'status-active';
    }
  }

  const isBinarySearchPointers =
    category === 'searching' &&
    (pointers?.left !== undefined || pointers?.right !== undefined);

  return (
    <div className="telemetry-strip">
      {/* Target Spec */}
      {category === 'searching' && target !== undefined && (
        <div className="telemetry-node">
          <span className="telemetry-kicker">Target</span>
          <span className="telemetry-val text-accent">{target}</span>
        </div>
      )}

      {/* Position Pointers */}
      {isBinarySearchPointers ? (
        <>
          <div className="telemetry-divider" />
          <div className="telemetry-node">
            <span className="telemetry-kicker">Pointers (L · Mid · R)</span>
            <span className="telemetry-val">
              <span style={{ color: 'var(--accent-cyan, #0369a1)' }}>{pointers?.left ?? '—'}</span>
              <span className="telemetry-sub-divider">·</span>
              <span style={{ color: 'var(--accent-amber, #b45309)' }}>{pointers?.mid ?? '—'}</span>
              <span className="telemetry-sub-divider">·</span>
              <span style={{ color: 'var(--accent-violet, #4338ca)' }}>{pointers?.right ?? '—'}</span>
            </span>
          </div>
        </>
      ) : (
        currentIndex !== undefined && (
          <>
            <div className="telemetry-divider" />
            <div className="telemetry-node">
              <span className="telemetry-kicker">Index</span>
              <span className="telemetry-val">[{currentIndex}]</span>
            </div>
          </>
        )
      )}

      {/* Comparisons */}
      <div className="telemetry-divider" />
      <div className="telemetry-node">
        <span className="telemetry-kicker">Comparisons</span>
        <span className="telemetry-val">{comparisons}</span>
      </div>

      {/* Swaps if relevant */}
      {swaps !== undefined && (
        <>
          <div className="telemetry-divider" />
          <div className="telemetry-node">
            <span className="telemetry-kicker">Swaps &amp; Shifts</span>
            <span className="telemetry-val text-coral">{swaps}</span>
          </div>
        </>
      )}

      {/* Status */}
      <div className="telemetry-divider" />
      <div className="telemetry-node">
        <span className="telemetry-kicker">Status</span>
        <span className={`telemetry-val ${statusType}`}>{statusText}</span>
      </div>
    </div>
  );
};
