import React from 'react';
import type { MatrixStep } from '../../algorithms/types';
import './MatrixVisualizer.css';

interface MatrixVisualizerProps {
  step: MatrixStep;
}

export const MatrixVisualizer: React.FC<MatrixVisualizerProps> = ({ step }) => {
  const { matrix, rowLabels, colLabels, highlightedCells = [], currentCallStack, action } = step;

  const isCellHighlighted = (r: number, c: number) => {
    return highlightedCells.find((cell) => cell.row === r && cell.col === c);
  };

  return (
    <div className="matrix-stage">
      {/* Top Banner: Action */}
      <div className="matrix-telemetry-strip">
        <div className="matrix-op-tag">
          OP // {action ? action.toUpperCase() : 'GRID STEP'}
        </div>
      </div>

      <div className="matrix-workspace-grid">
        {/* Call Stack Section (for Recursion & Backtracking) */}
        {currentCallStack && currentCallStack.length > 0 && (
          <div className="call-stack-column">
            <div className="call-stack-header">
              <span>CALL STACK</span>
              <span>// DEPTH {currentCallStack.length}</span>
            </div>
            <div className="call-stack-chamber">
              {currentCallStack.map((frame, idx) => {
                const isTop = idx === currentCallStack.length - 1;
                return (
                  <div
                    key={idx}
                    className={`call-stack-frame ${isTop ? 'is-top' : ''}`}
                  >
                    <span>{frame}</span>
                    {isTop && (
                      <span className="call-stack-top-badge">
                        ACTIVE
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2D Matrix Table Section (for Dynamic Programming & Grids) */}
        {matrix && matrix.length > 0 && (
          <div className="dp-table-column">
            <div className="dp-table-header">
              <span>DP MEMOIZATION TABLE</span>
              <span>// MATRIX [{matrix.length} × {matrix[0]?.length || 0}]</span>
            </div>
            <table className="dp-table-grid">
              {/* Column Headers */}
              {colLabels && (
                <thead>
                  <tr>
                    {rowLabels && <th style={{ width: '40px' }} />}
                    {colLabels.map((col, idx) => (
                      <th key={idx} className="dp-col-label">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}

              <tbody>
                {matrix.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {/* Row Label */}
                    {rowLabels && (
                      <td className="dp-row-label">
                        {rowLabels[rIdx]}
                      </td>
                    )}

                    {/* Row Cells */}
                    {row.map((val, cIdx) => {
                      const highlight = isCellHighlighted(rIdx, cIdx);
                      let cellClass = 'dp-cell';

                      if (highlight?.state === 'writing') {
                        cellClass += ' is-writing';
                      } else if (highlight?.state === 'reading') {
                        cellClass += ' is-reading';
                      } else if (highlight?.state === 'highlighted') {
                        cellClass += ' is-highlighted';
                      }

                      return (
                        <td key={cIdx} className={cellClass}>
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
