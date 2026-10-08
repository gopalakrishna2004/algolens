import React from 'react';
import type { StackQueueStep } from '../../algorithms/types';

interface StackQueueVisualizerProps {
  step: StackQueueStep;
}

export const StackQueueVisualizer: React.FC<StackQueueVisualizerProps> = ({ step }) => {
  const isStack = step.structureType === 'stack';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 16px',
        width: '100%',
        minHeight: '360px',
        justifyContent: 'center',
      }}
    >
      {/* Lab Telemetry Action Tag */}
      <div
        style={{
          marginBottom: '28px',
          padding: '5px 14px',
          borderRadius: '6px',
          background: 'rgba(56, 189, 248, 0.08)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          color: '#38bdf8',
          fontSize: '0.8rem',
          fontWeight: 600,
          fontFamily: 'var(--font-mono, monospace)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        OP // {step.action} {step.activeItem !== undefined ? `(${step.activeItem})` : ''}
      </div>

      {isStack ? (
        /* Vertical Stack View */
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px' }}>
          {/* Stack Container Frame */}
          <div
            style={{
              width: '180px',
              minHeight: '260px',
              borderLeft: '4px solid #64748b',
              borderRight: '4px solid #64748b',
              borderBottom: '6px solid #94a3b8',
              borderRadius: '0 0 12px 12px',
              display: 'flex',
              flexDirection: 'column-reverse',
              padding: '10px',
              gap: '8px',
              background: 'rgba(15, 23, 42, 0.6)',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
            }}
          >
            {step.items.length === 0 ? (
              <div
                style={{
                  color: '#64748b',
                  fontSize: '0.85rem',
                  textAlign: 'center',
                  margin: 'auto',
                }}
              >
                (Empty Stack)
              </div>
            ) : (
              step.items.map((val, idx) => {
                const isTop = idx === step.items.length - 1;
                const isHighlighted = idx === step.highlightedIndex;

                let bg = 'linear-gradient(135deg, #1e293b, #334155)';
                let border = '#475569';
                let textColor = '#f8fafc';

                if (isHighlighted) {
                  bg = 'linear-gradient(135deg, #0284c7, #38bdf8)';
                  border = '#38bdf8';
                  textColor = '#ffffff';
                } else if (isTop) {
                  bg = 'linear-gradient(135deg, #0f766e, #14b8a6)';
                  border = '#2dd4bf';
                }

                return (
                  <div
                    key={idx}
                    style={{
                      height: '42px',
                      borderRadius: '8px',
                      background: bg,
                      border: `1.5px solid ${border}`,
                      color: textColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 16px',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <span>{val}</span>
                    {isTop && (
                      <span
                        style={{
                          fontSize: '0.7rem',
                          background: '#0d9488',
                          color: '#fff',
                          padding: '2px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        TOP
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Stack Legend & Pointer Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
            <div style={{ color: '#2dd4bf', fontWeight: 600 }}>▲ TOP POINTER</div>
            <div style={{ color: '#94a3b8' }}>
              Size: <strong style={{ color: '#f8fafc' }}>{step.items.length}</strong>
            </div>
            <div style={{ color: '#94a3b8' }}>LIFO Policy: Push and Pop at top</div>
          </div>
        </div>
      ) : (
        /* Horizontal Queue View */
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>
              FRONT (Dequeue) ◀
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                minHeight: '70px',
                padding: '12px 18px',
                borderRadius: '12px',
                border: '2px dashed #475569',
                background: 'rgba(15, 23, 42, 0.5)',
              }}
            >
              {step.items.length === 0 ? (
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>(Empty Queue)</div>
              ) : (
                step.items.map((val, idx) => {
                  const isFront = idx === 0;
                  const isRear = idx === step.items.length - 1;
                  const isHighlighted = idx === step.highlightedIndex;

                  let bg = 'linear-gradient(135deg, #1e293b, #334155)';
                  let border = '#475569';

                  if (isHighlighted) {
                    bg = 'linear-gradient(135deg, #0284c7, #38bdf8)';
                    border = '#38bdf8';
                  } else if (isFront) {
                    bg = 'linear-gradient(135deg, #065f46, #10b981)';
                    border = '#34d399';
                  } else if (isRear) {
                    bg = 'linear-gradient(135deg, #7c2d12, #f97316)';
                    border = '#fb923c';
                  }

                  return (
                    <div
                      key={idx}
                      style={{
                        minWidth: '56px',
                        height: '56px',
                        borderRadius: '10px',
                        background: bg,
                        border: `2px solid ${border}`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                      }}
                    >
                      <span>{val}</span>
                      <span style={{ fontSize: '0.65rem', color: '#e2e8f0', fontWeight: 500 }}>
                        {isFront ? 'FRONT' : isRear ? 'REAR' : `#${idx}`}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
            <span style={{ fontSize: '0.8rem', color: '#f97316', fontWeight: 700 }}>
              ◀ REAR (Enqueue)
            </span>
          </div>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
            FIFO Policy: First element queued is the first dequeued.
          </div>
        </div>
      )}
    </div>
  );
};
