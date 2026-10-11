import React from 'react';
import type { TrieStep, VisualTrieNode } from '../../algorithms/types';
import './TrieVisualizer.css';

interface TrieVisualizerProps {
  step: TrieStep;
}

export const TrieVisualizer: React.FC<TrieVisualizerProps> = ({ step }) => {
  const renderNode = (node: VisualTrieNode, depth = 0): React.ReactNode => {
    const isActive = node.id === step.activeNodeId;
    const childKeys = Object.keys(node.children);

    let discClass = `trie-node-disc ${depth === 0 ? 'is-root' : 'is-char'}`;
    if (isActive) discClass += ' is-active';
    if (node.isEndOfWord) discClass += ' is-end-word';

    return (
      <div key={node.id} className="trie-node-wrapper">
        {/* Node Circle */}
        <div className={discClass}>
          <span>{node.char || 'ε'}</span>
        </div>

        {/* End of Word Badge */}
        {node.isEndOfWord && (
          <span className="trie-end-word-tag">
            [WORD]
          </span>
        )}

        {/* Children Connection Line & Children Container */}
        {childKeys.length > 0 && (
          <div className="trie-branch-system">
            <div className="trie-stem-vertical" />
            <div
              className="trie-children-row"
              style={{
                borderTop: childKeys.length > 1 ? undefined : 'none',
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
    <div className="trie-stage">
      {/* Top Banner: Action & Target Word */}
      <div className="trie-telemetry-strip">
        <div className="trie-op-tag">
          OP // {step.action.toUpperCase()}
        </div>
        {step.word && (
          <div className="trie-word-pill">
            PREFIX/KEY: <strong>&quot;{step.word}&quot;</strong>
          </div>
        )}
      </div>

      {/* Trie Tree Canvas */}
      <div className="trie-canvas-container">
        {renderNode(step.root)}
      </div>
    </div>
  );
};
