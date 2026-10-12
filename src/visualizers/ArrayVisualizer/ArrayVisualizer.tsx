import React, { useMemo } from 'react';
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

  const maxVal = useMemo(() => {
    return array.length > 0 ? Math.max(...array, 1) : 1;
  }, [array]);

  return (
    <section className="array-stage" aria-label="Array Visualization Canvas">
      {/* Array Elements Workspace Track */}
      <div className="array-track" role="list">
        {array.map((value, idx) => {
          const state = elementStates[idx] || 'default';

          // Collect active pointer labels for this index
          const labels: string[] = [];
          let primaryType = 'current';

          if (pointers?.left === idx) {
            labels.push('Left');
            primaryType = 'left';
          }
          if (pointers?.mid === idx) {
            labels.push('Mid');
            primaryType = 'mid';
          }
          if (pointers?.right === idx) {
            labels.push('Right');
            primaryType = primaryType === 'current' ? 'right' : primaryType;
          }
          if (pointers) {
            for (const [key, val] of Object.entries(pointers)) {
              if (
                val === idx &&
                !['left', 'mid', 'right', 'current'].includes(key)
              ) {
                labels.push(key);
              }
            }
          }
          if (
            labels.length === 0 &&
            ((pointers?.current === idx && pointers?.mid === undefined) ||
              currentIndex === idx)
          ) {
            labels.push('Current');
            primaryType = 'current';
          }

          const hasPointer = labels.length > 0;

          // In Binary Search, elements outside [L..R] are discarded
          const isInActiveRange =
            hasRangePointers &&
            idx >= (pointers?.left ?? 0) &&
            idx <= (pointers?.right ?? -1) &&
            state !== 'discarded';

          // Magnitude percentage for visual amplitude bar
          const magnitudePercent = Math.max(14, Math.min(100, Math.round((value / maxVal) * 100)));

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
                {/* Background Magnitude Gauge Bar */}
                <div
                  className="element-magnitude-fill"
                  style={{ height: `${magnitudePercent}%` }}
                  aria-hidden="true"
                />

                {/* Prominent High-Contrast Value */}
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
