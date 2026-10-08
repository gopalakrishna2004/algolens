import React from 'react';
import type { LinkedListStep } from '../../algorithms/types';

interface LinkedListVisualizerProps {
  step: LinkedListStep;
}

export const LinkedListVisualizer: React.FC<LinkedListVisualizerProps> = ({ step }) => {
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
          marginBottom: '32px',
          padding: '5px 14px',
          borderRadius: '6px',
          background: 'rgba(168, 85, 247, 0.08)',
          border: '1px solid rgba(168, 85, 247, 0.25)',
          color: '#c084fc',
          fontSize: '0.8rem',
          fontWeight: 600,
          fontFamily: 'var(--font-mono, monospace)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        OP // {step.action}
      </div>

      {/* Nodes Chain */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          maxWidth: '100%',
          justifyContent: 'center',
          padding: '12px',
        }}
      >
        {step.nodes.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: '1rem' }}>Empty List (HEAD -&gt; NULL)</div>
        ) : (
          step.nodes.map((node, index) => {
            const isActive = node.id === step.activeNodeId;
            const isHead = step.pointers?.head === node.id || index === 0;
            const isCurrent = step.pointers?.current === node.id;
            const isPrev = step.pointers?.prev === node.id;

            return (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Pointers badges above node */}
                  <div
                    style={{
                      height: '24px',
                      display: 'flex',
                      gap: '4px',
                      marginBottom: '4px',
                    }}
                  >
                    {isHead && (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          padding: '1px 6px',
                          background: '#0284c7',
                          color: '#fff',
                          borderRadius: '4px',
                          fontWeight: 700,
                        }}
                      >
                        HEAD
                      </span>
                    )}
                    {isCurrent && (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          padding: '1px 6px',
                          background: '#f59e0b',
                          color: '#1e293b',
                          borderRadius: '4px',
                          fontWeight: 700,
                        }}
                      >
                        CURR
                      </span>
                    )}
                    {isPrev && (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          padding: '1px 6px',
                          background: '#64748b',
                          color: '#fff',
                          borderRadius: '4px',
                          fontWeight: 700,
                        }}
                      >
                        PREV
                      </span>
                    )}
                  </div>

                  {/* Node Structure: [ Data | Next ] */}
                  <div
                    style={{
                      display: 'flex',
                      border: isActive ? '2px solid #a855f7' : '2px solid #334155',
                      borderRadius: '8px',
                      background: isActive
                        ? 'linear-gradient(135deg, #581c87, #7e22ce)'
                        : 'linear-gradient(135deg, #1e293b, #0f172a)',
                      boxShadow: isActive
                        ? '0 0 15px rgba(168, 85, 247, 0.4)'
                        : '0 4px 6px rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.2s ease',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Value cell */}
                    <div
                      style={{
                        padding: '12px 18px',
                        color: '#f8fafc',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        borderRight: '1px solid #334155',
                      }}
                    >
                      {node.value}
                    </div>
                    {/* Next pointer cell */}
                    <div
                      style={{
                        padding: '12px 10px',
                        color: '#94a3b8',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0,0,0,0.2)',
                      }}
                    >
                      ●
                    </div>
                  </div>
                </div>

                {/* Arrow to Next Node */}
                <div
                  style={{
                    color: '#64748b',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    margin: '0 4px',
                    marginTop: '20px',
                  }}
                >
                  ──▶
                </div>
              </React.Fragment>
            );
          })
        )}

        {/* Tail NULL */}
        <div
          style={{
            marginTop: '20px',
            padding: '6px 12px',
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid #475569',
            borderRadius: '6px',
            color: '#ef4444',
            fontWeight: 700,
            fontSize: '0.85rem',
            fontFamily: 'monospace',
          }}
        >
          NULL
        </div>
      </div>
    </div>
  );
};
