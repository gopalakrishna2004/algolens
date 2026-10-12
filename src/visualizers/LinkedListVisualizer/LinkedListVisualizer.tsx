import React from 'react';
import type { LinkedListStep } from '../../algorithms/types';
import './LinkedListVisualizer.css';

interface LinkedListVisualizerProps {
  step: LinkedListStep;
}

export const LinkedListVisualizer: React.FC<LinkedListVisualizerProps> = ({ step }) => {
  return (
    <div className="linked-list-stage">
      {/* Editorial Telemetry Strip */}
      <div className="ll-telemetry-strip">
        <div className="ll-op-tag">
          {step.action.charAt(0).toUpperCase() + step.action.slice(1)}
        </div>
        <div className="ll-stat-pill">
          Nodes: <strong>{step.nodes.length}</strong>
        </div>
      </div>

      {/* Nodes Chain Track */}
      <div className="ll-nodes-track">
        {step.nodes.length === 0 ? (
          <div className="ll-empty-notice">
            <span>Empty List</span>
            <code>head → null</code>
          </div>
        ) : (
          step.nodes.map((node, index) => {
            const isActive = node.id === step.activeNodeId;
            const isHead = step.pointers?.head === node.id || index === 0;
            const isCurrent = step.pointers?.current === node.id;
            const isPrev = step.pointers?.prev === node.id;

            let cardClass = 'll-node-card';
            if (isActive) cardClass += ' is-active';
            if (isCurrent) cardClass += ' is-current';

            return (
              <React.Fragment key={node.id}>
                {/* Node Structure */}
                <div className="ll-node-wrapper">
                  {/* Pointers badges above node */}
                  <div className="ll-pointers-row">
                    {isHead && (
                      <span className="ll-pointer-badge head">
                        Head
                      </span>
                    )}
                    {isCurrent && (
                      <span className="ll-pointer-badge curr">
                        Current
                      </span>
                    )}
                    {isPrev && (
                      <span className="ll-pointer-badge prev">
                        Previous
                      </span>
                    )}
                  </div>

                  {/* Node Memory Card: [ Data | *Next ] */}
                  <div className={cardClass}>
                    {/* Value cell */}
                    <div className="ll-node-val-cell">
                      <span className="ll-node-micro-label">val</span>
                      <span className="ll-node-value">{node.value}</span>
                    </div>

                    {/* Next pointer cell */}
                    <div className="ll-node-next-cell" title={`Pointer to next node or null`}>
                      <span className="ll-node-micro-label">next</span>
                      <div className="ll-next-bullet" />
                    </div>
                  </div>
                </div>

                {/* SVG Arrow to Next Node */}
                <div className={`ll-arrow-connector ${isActive || isCurrent ? 'active' : ''}`}>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="19" y2="12" />
                    <polyline points="13 6 19 12 13 18" />
                  </svg>
                </div>
              </React.Fragment>
            );
          })
        )}

        {/* Tail Terminal NULL */}
        <div className="ll-null-terminal">
          <span>null</span>
          <span className="ll-null-subtext">tail</span>
        </div>
      </div>
    </div>
  );
};
