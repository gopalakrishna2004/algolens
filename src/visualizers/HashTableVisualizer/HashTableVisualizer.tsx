import React from 'react';
import type { HashTableStep } from '../../algorithms/types';

interface HashTableVisualizerProps {
  step: HashTableStep;
}

export const HashTableVisualizer: React.FC<HashTableVisualizerProps> = ({ step }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 16px',
        width: '100%',
        minHeight: '360px',
      }}
    >
      {/* Action & Hash Info Header */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            padding: '5px 14px',
            borderRadius: '6px',
            background: 'rgba(234, 179, 8, 0.08)',
            border: '1px solid rgba(234, 179, 8, 0.25)',
            color: '#facc15',
            fontSize: '0.8rem',
            fontWeight: 600,
            fontFamily: 'var(--font-mono, monospace)',
            letterSpacing: '0.06em',
          }}
        >
          OP // {step.action.toUpperCase()}
        </div>
        {step.activeKey && (
          <div
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: '#1e293b',
              border: '1px solid #334155',
              fontSize: '0.85rem',
              color: '#94a3b8',
            }}
          >
            Key: <strong style={{ color: '#f8fafc' }}>&quot;{step.activeKey}&quot;</strong> | Hash: <strong style={{ color: '#38bdf8' }}>{step.activeHash}</strong>
          </div>
        )}
      </div>

      {/* Bucket Array with Separate Chaining */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
          maxWidth: '650px',
        }}
      >
        {step.buckets.map((chain, bucketIdx) => {
          const isTargetBucket = step.activeHash === bucketIdx;

          return (
            <div
              key={bucketIdx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 12px',
                borderRadius: '8px',
                background: isTargetBucket ? 'rgba(56, 189, 248, 0.08)' : 'rgba(15, 23, 42, 0.5)',
                border: isTargetBucket ? '1.5px solid #38bdf8' : '1px solid #334155',
                transition: 'all 0.25s ease',
              }}
            >
              {/* Bucket Index Header */}
              <div
                style={{
                  minWidth: '70px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  background: isTargetBucket ? '#0284c7' : '#1e293b',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textAlign: 'center',
                  fontFamily: 'monospace',
                }}
              >
                [{bucketIdx}]
              </div>

              {/* Bucket Chain / Linked List */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                  flex: 1,
                }}
              >
                {chain.length === 0 ? (
                  <span style={{ color: '#475569', fontSize: '0.85rem', fontStyle: 'italic' }}>
                    empty
                  </span>
                ) : (
                  chain.map((entry, entryIdx) => {
                    const isKeyActive = entry.key === step.activeKey;

                    return (
                      <React.Fragment key={entryIdx}>
                        <div
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            background: isKeyActive
                              ? 'linear-gradient(135deg, #0284c7, #0369a1)'
                              : '#1e293b',
                            border: isKeyActive ? '1.5px solid #38bdf8' : '1px solid #475569',
                            color: '#ffffff',
                            fontSize: '0.85rem',
                            display: 'flex',
                            gap: '6px',
                            boxShadow: isKeyActive ? '0 0 10px rgba(56, 189, 248, 0.4)' : undefined,
                          }}
                        >
                          <span style={{ color: '#93c5fd', fontWeight: 600 }}>{entry.key}:</span>
                          <span style={{ fontWeight: 700 }}>{entry.value}</span>
                        </div>
                        {entryIdx < chain.length - 1 && (
                          <span style={{ color: '#64748b', fontSize: '0.9rem' }}>→</span>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
