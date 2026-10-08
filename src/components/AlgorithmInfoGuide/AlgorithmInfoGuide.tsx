import React, { useState } from 'react';
import type { AlgorithmMetadata } from '../../algorithms/types';
import './AlgorithmInfoGuide.css';

interface AlgorithmInfoGuideProps {
  metadata: AlgorithmMetadata;
}

export const AlgorithmInfoGuide: React.FC<AlgorithmInfoGuideProps> = ({ metadata }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="info-guide-panel">
      <div className="info-guide-header">
        <div className="info-guide-title">
          <span>📖</span>
          <span>{metadata.name}: When, Why & Limitations</span>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="info-guide-toggle"
        >
          {isExpanded ? 'Hide Details ▲' : 'Learn Details ▼'}
        </button>
      </div>

      {isExpanded && (
        <div className="info-guide-body">
          <div className="key-idea-callout">
            💡 <strong>Key Concept:</strong> {metadata.keyIdea}
          </div>

          <div className="info-two-col">
            <div className="info-card">
              <span className="info-card-header">
                <span>✅ When to Use</span>
              </span>
              <ul className="info-list">
                {metadata.whenToUse.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="info-card">
              <span className="info-card-header">
                <span>⚠️ Important Limitations</span>
              </span>
              <ul className="info-list">
                {metadata.limitations.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
