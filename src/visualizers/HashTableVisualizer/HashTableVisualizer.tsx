import React from 'react';
import type { HashTableStep } from '../../algorithms/types';
import './HashTableVisualizer.css';

interface HashTableVisualizerProps {
  step: HashTableStep;
}

export const HashTableVisualizer: React.FC<HashTableVisualizerProps> = ({ step }) => {
  return (
    <div className="hashtable-stage">
      {/* Action & Hash Info Header */}
      <div className="ht-telemetry-strip">
        <div className="ht-op-tag">
          {step.action.charAt(0).toUpperCase() + step.action.slice(1)}
        </div>
        {step.activeKey && (
          <div className="ht-hash-calc-pill">
            Key: <strong>&quot;{step.activeKey}&quot;</strong>
            &nbsp;→ Hash: <span className="hash-val">{step.activeHash}</span>
            &nbsp;→ Bucket: <span className="hash-val">[{step.activeHash}]</span>
          </div>
        )}
      </div>

      {/* Bucket Array with Separate Chaining */}
      <div className="ht-bucket-list">
        {step.buckets.map((chain, bucketIdx) => {
          const isTargetBucket = step.activeHash === bucketIdx;

          return (
            <div
              key={bucketIdx}
              className={`ht-bucket-row ${isTargetBucket ? 'is-target' : ''}`}
            >
              {/* Bucket Index Header */}
              <div className="ht-bucket-index-tag">
                Bucket {bucketIdx}
              </div>

              {/* Chained Linked List entries */}
              <div className="ht-chain-container">
                {chain.length === 0 ? (
                  <span className="ht-chain-empty">
                    empty slot
                  </span>
                ) : (
                  chain.map((entry, entryIdx) => (
                    <React.Fragment key={entryIdx}>
                      <div className="ht-entry-capsule">
                        <span className="ht-entry-key">&quot;{entry.key}&quot;</span>
                        <span className="ht-entry-sep">:</span>
                        <span className="ht-entry-val">{entry.value}</span>
                      </div>
                      <span className="ht-chain-arrow">→</span>
                    </React.Fragment>
                  ))
                )}
                {chain.length > 0 && (
                  <span className="ht-chain-null">
                    null
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
