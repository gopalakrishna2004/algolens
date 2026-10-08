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
  let statusText = 'IDLE';
  let statusType = 'status-idle';

  if (category === 'sorting') {
    if (isCompleted) {
      statusText = 'SORTED ✓';
      statusType = 'status-found';
    } else {
      statusText = 'SORTING';
      statusType = 'status-active';
    }
  } else {
    if (isFound) {
      statusText = `MATCH AT [${foundIndex}]`;
      statusType = 'status-found';
    } else if (isCompleted) {
      statusText = 'NOT FOUND';
      statusType = 'status-not-found';
    } else if (currentIndex !== undefined || pointers?.mid !== undefined) {
      statusText = 'COMPARING';
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
          <span className="telemetry-kicker">TARGET</span>
          <span className="telemetry-val text-accent">{target}</span>
        </div>
      )}

      {/* Position Pointers */}
      {isBinarySearchPointers ? (
        <>
          <div className="telemetry-divider" />
          <div className="telemetry-node">
            <span className="telemetry-kicker">L / MID / R</span>
            <span className="telemetry-val">
              <span style={{ color: '#38bdf8' }}>{pointers?.left ?? '—'}</span>
              <span className="telemetry-sub-divider">/</span>
              <span style={{ color: '#fbbf24' }}>{pointers?.mid ?? '—'}</span>
              <span className="telemetry-sub-divider">/</span>
              <span style={{ color: '#c084fc' }}>{pointers?.right ?? '—'}</span>
            </span>
          </div>
        </>
      ) : (
        currentIndex !== undefined && (
          <>
            <div className="telemetry-divider" />
            <div className="telemetry-node">
              <span className="telemetry-kicker">INDEX</span>
              <span className="telemetry-val">[{currentIndex}]</span>
            </div>
          </>
        )
      )}

      {/* Comparisons */}
      <div className="telemetry-divider" />
      <div className="telemetry-node">
        <span className="telemetry-kicker">COMPARISONS</span>
        <span className="telemetry-val">{comparisons}</span>
      </div>

      {/* Swaps if relevant */}
      {swaps !== undefined && (
        <>
          <div className="telemetry-divider" />
          <div className="telemetry-node">
            <span className="telemetry-kicker">SWAPS / SHIFTS</span>
            <span className="telemetry-val text-coral">{swaps}</span>
          </div>
        </>
      )}

      {/* Status */}
      <div className="telemetry-divider" />
      <div className="telemetry-node">
        <span className="telemetry-kicker">STATUS</span>
        <span className={`telemetry-val ${statusType}`}>{statusText}</span>
      </div>
    </div>
  );
};
