import React from 'react';
import type { TrieStep, VisualTrieNode } from '../../algorithms/types';

interface TrieVisualizerProps {
  step: TrieStep;
}

export const TrieVisualizer: React.FC<TrieVisualizerProps> = ({ step }) => {
  const renderNode = (node: VisualTrieNode, depth = 0): React.ReactNode => {
    const isActive = node.id === step.activeNodeId;
    const childKeys = Object.keys(node.children);

    return (
      <div
        key={node.id}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 8px',
        }}
      >
        {/* Node Circle */}
        <div
          style={{
            minWidth: depth === 0 ? '54px' : '44px',
            height: depth === 0 ? '54px' : '44px',
            borderRadius: '50%',
            background: isActive
              ? 'linear-gradient(135deg, #10b981, #059669)'
              : node.isEndOfWord
              ? 'linear-gradient(135deg, #0284c7, #0369a1)'
              : '#1e293b',
            border: isActive
              ? '2.5px solid #34d399'
              : node.isEndOfWord
              ? '2px solid #38bdf8'
              : '2px solid #475569',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: depth === 0 ? '0.75rem' : '1.1rem',
            boxShadow: isActive ? '0 0 15px rgba(52, 211, 153, 0.6)' : '0 2px 5px rgba(0,0,0,0.3)',
            transition: 'all 0.2s ease',
          }}
        >
          <span>{node.char}</span>
        </div>

        {/* End of Word Badge */}
        {node.isEndOfWord && (
          <span
            style={{
              fontSize: '0.6rem',
              color: '#38bdf8',
              fontWeight: 700,
              marginTop: '2px',
            }}
          >
            END
          </span>
        )}

        {/* Children Connection Line & Children Container */}
        {childKeys.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '4px',
            }}
          >
            <div style={{ width: '2px', height: '16px', background: '#475569' }} />
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: '8px',
                borderTop: childKeys.length > 1 ? '1px solid #475569' : undefined,
                paddingTop: childKeys.length > 1 ? '6px' : undefined,
              }}
            >
              {childKeys.map((k) => renderNode(node.children[k], depth + 1))}
            </div>
          </div>
        )}
      </div>
    );
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
        overflowX: 'auto',
      }}
    >
      {/* Action Header */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '28px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            padding: '5px 14px',
            borderRadius: '6px',
            background: 'rgba(52, 211, 153, 0.08)',
            border: '1px solid rgba(52, 211, 153, 0.25)',
            color: '#34d399',
            fontSize: '0.8rem',
            fontWeight: 600,
            fontFamily: 'var(--font-mono, monospace)',
            letterSpacing: '0.06em',
          }}
        >
          OP // {step.action.toUpperCase()}
        </div>
        {step.word && (
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
            Word: <strong style={{ color: '#f8fafc' }}>&quot;{step.word}&quot;</strong>
          </div>
        )}
      </div>

      {/* Visual Trie Tree */}
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        {renderNode(step.root)}
      </div>
    </div>
  );
};
