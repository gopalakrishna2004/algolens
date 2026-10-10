import React from 'react';
import type { ElementState, StepPointers } from '../../algorithms/types';
import './ArrayVisualizer.css';

interface ArrayVisualizerProps {
  array: number[];
  elementStates: Record<number, ElementState>;
  currentIndex?: number;
  pointers?: StepPointers;
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
  array,
  elementStates,
  currentIndex,
  pointers,
}) => {
  const hasRangePointers =
    pointers?.left !== undefined && pointers?.right !== undefined;

  return (
    <section className="array-stage" aria-label="Array Visualization Canvas">
      {/* Array Elements Workspace */}
      <div className="array-track" role="list">
        {array.map((value, idx) => {
          const state = elementStates[idx] || 'default';

          // Collect active pointer labels for this index
          const labels: string[] = [];
          let primaryType = 'current';

          if (pointers?.left === idx) {
            labels.push('LEFT');
            primaryType = 'left';
          }
          if (pointers?.mid === idx) {
            labels.push('MID');
            primaryType = 'mid';
          }
          if (pointers?.right === idx) {
            labels.push('RIGHT');
            primaryType = primaryType === 'current' ? 'right' : primaryType;
          }
          if (pointers) {
            for (const [key, val] of Object.entries(pointers)) {
              if (
                val === idx &&
                !['left', 'mid', 'right', 'current'].includes(key)
              ) {
                labels.push(key.toUpperCase());
              }
            }
          }
          if (
            labels.length === 0 &&
            ((pointers?.current === idx && pointers?.mid === undefined) ||
              currentIndex === idx)
          ) {
            labels.push('CURRENT');
            primaryType = 'current';
          }

          const hasPointer = labels.length > 0;

          // In Binary Search, elements outside [L..R] are discarded
          const isInActiveRange =
            hasRangePointers &&
            idx >= (pointers?.left ?? 0) &&
            idx <= (pointers?.right ?? -1) &&
            state !== 'discarded';

          return (
            <div key={idx} className="array-column" role="listitem">
              {/* Physical Pointer Dock */}
              <div className="pointer-dock">
                {hasPointer ? (
                  <div className={`physical-pointer pointer-${primaryType}`}>
                    <span className="pointer-name">{labels.join(' · ')}</span>
                    <span className="pointer-stem-arrow" aria-hidden="true">↓</span>
                  </div>
                ) : (
                  <div className="pointer-placeholder" aria-hidden="true" />
                )}
              </div>

              {/* Workbench Data Cell */}
              <div
                className={`array-element state-${state} ${
                  isInActiveRange ? 'is-active-range' : ''
                }`}
                title={`Index [${idx}]: Value ${value} (State: ${state})`}
              >
                <span className="element-value">{value}</span>
              </div>

              {/* Technical Monospace Index */}
              <div className="element-index-tag">
                <span>[{idx}]</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modern Streamlined State Legend */}
      <footer className="array-legend">
        <div className="legend-chip">
          <span className="legend-pip pip-default" aria-hidden="true" />
          <span>Default</span>
        </div>
        {hasRangePointers && (
          <div className="legend-chip">
            <span className="legend-pip pip-active-range" aria-hidden="true" />
            <span>Active Range [L..R]</span>
          </div>
        )}
        <div className="legend-chip">
          <span className="legend-pip pip-comparing" aria-hidden="true" />
          <span>Evaluating</span>
        </div>
        <div className="legend-chip">
          <span className="legend-pip pip-found" aria-hidden="true" />
          <span>Found / Target</span>
        </div>
        <div className="legend-chip">
          <span className="legend-pip pip-sorted" aria-hidden="true" />
          <span>Sorted</span>
        </div>
        <div className="legend-chip">
          <span className="legend-pip pip-discarded" aria-hidden="true" />
          <span>Discarded</span>
        </div>
      </footer>
    </section>
  );
};
