import React from 'react';
import type { MatrixStep } from '../../algorithms/types';

interface MatrixVisualizerProps {
  step: MatrixStep;
}

export const MatrixVisualizer: React.FC<MatrixVisualizerProps> = ({ step }) => {
  const { matrix, rowLabels, colLabels, highlightedCells = [], currentCallStack, action } = step;

  const isCellHighlighted = (r: number, c: number) => {
    return highlightedCells.find((cell) => cell.row === r && cell.col === c);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 16px',
        width: '100%',
        minHeight: '380px',
      }}
    >
      {/* Top Banner: Action */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            padding: '5px 14px',
            borderRadius: '6px',
            background: 'rgba(168, 85, 247, 0.08)',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            color: '#c084fc',
            fontSize: '0.8rem',
            fontWeight: 600,
            fontFamily: 'var(--font-mono, monospace)',
            letterSpacing: '0.06em',
          }}
        >
          OP // {action ? action.toUpperCase() : 'STEP'}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        {/* Call Stack Section (for Recursion & Backtracking) */}
        {currentCallStack && currentCallStack.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: '220px',
            }}
          >
            <span
              style={{
                fontSize: '0.8rem',
                color: '#38bdf8',
                fontWeight: 700,
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Call Stack (Depth: {currentCallStack.length})
            </span>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column-reverse',
                gap: '6px',
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid #334155',
                background: 'rgba(15, 23, 42, 0.7)',
                minHeight: '180px',
              }}
            >
              {currentCallStack.map((frame, idx) => {
                const isTop = idx === currentCallStack.length - 1;
                return (
                  <div
                    key={idx}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: isTop
                        ? 'linear-gradient(135deg, #0284c7, #0369a1)'
                        : '#1e293b',
                      border: isTop ? '1.5px solid #38bdf8' : '1px solid #475569',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      fontFamily: 'monospace',
                      boxShadow: isTop ? '0 0 10px rgba(56, 189, 248, 0.4)' : undefined,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>{frame}</span>
                    {isTop && (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          background: '#38bdf8',
                          color: '#0f172a',
                          padding: '1px 5px',
                          borderRadius: '3px',
                          fontWeight: 700,
                        }}
                      >
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflowX: 'auto',
            }}
          >
            <span
              style={{
                fontSize: '0.8rem',
                color: '#4ade80',
                fontWeight: 700,
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              DP Memoization Table
            </span>
            <table
              style={{
                borderCollapse: 'separate',
                borderSpacing: '6px',
              }}
            >
              {/* Column Headers */}
              {colLabels && (
                <thead>
                  <tr>
                    {rowLabels && <th style={{ width: '40px' }} />}
                    {colLabels.map((col, idx) => (
                      <th
                        key={idx}
                        style={{
                          color: '#94a3b8',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '4px',
                          textAlign: 'center',
                        }}
                      >
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
                      <td
                        style={{
                          color: '#94a3b8',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '4px',
                          textAlign: 'right',
                          paddingRight: '8px',
                        }}
                      >
                        {rowLabels[rIdx]}
                      </td>
                    )}

                    {/* Row Cells */}
                    {row.map((val, cIdx) => {
                      const highlight = isCellHighlighted(rIdx, cIdx);
                      let bg = '#1e293b';
                      let border = '#334155';
                      let color = '#f8fafc';

                      if (highlight?.state === 'writing') {
                        bg = 'linear-gradient(135deg, #15803d, #22c55e)';
                        border = '#4ade80';
                      } else if (highlight?.state === 'reading') {
                        bg = 'linear-gradient(135deg, #0369a1, #0ea5e9)';
                        border = '#38bdf8';
                      } else if (highlight?.state === 'highlighted') {
                        bg = 'linear-gradient(135deg, #b45309, #f59e0b)';
                        border = '#fbbf24';
                      }

                      return (
                        <td
                          key={cIdx}
                          style={{
                            minWidth: '42px',
                            height: '42px',
                            borderRadius: '6px',
                            background: bg,
                            border: `1.5px solid ${border}`,
                            color,
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            fontFamily: 'monospace',
                            boxShadow: highlight ? '0 0 10px rgba(0,0,0,0.4)' : undefined,
                            transition: 'all 0.2s ease',
                          }}
                        >
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
