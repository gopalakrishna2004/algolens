import React, { useState } from 'react';
import type { AlgorithmMetadata, BaseStep } from '../../algorithms/types';
import { CodeViewer } from '../CodeViewer/CodeViewer';
import { AITutorPanel } from '../AITutor/AITutorPanel';
import { DataInput } from '../DataInput/DataInput';
import { AlgorithmInfoGuide } from '../AlgorithmInfoGuide/AlgorithmInfoGuide';
import { SearchingComparison } from '../SearchingComparison/SearchingComparison';
import './WorkbenchDesk.css';

interface WorkbenchDeskProps {
  metadata: AlgorithmMetadata;
  currentStep: BaseStep | null;
  currentStepIndex: number;
  totalSteps: number;
  sourceCode: {
    c: string;
    typescript: string;
  };
  highlightLine?: number;
  inputArray: number[];
  inputTarget: number;
  lastChallengeResult?: { isCorrect: boolean; concept?: string } | null;
  showArrayInput: boolean;
  isPlaying: boolean;
  requireSorted: boolean;
  showTarget: boolean;
  onUpdateData: (newArray: number[], newTarget: number) => void;
  onSortArray: () => void;
}

export type WorkbenchTab = 'code' | 'tutor' | 'dataset' | 'theory' | 'compare';

export const WorkbenchDesk: React.FC<WorkbenchDeskProps> = ({
  metadata,
  currentStep,
  currentStepIndex,
  totalSteps,
  sourceCode,
  highlightLine,
  inputArray,
  inputTarget,
  lastChallengeResult,
  showArrayInput,
  isPlaying,
  requireSorted,
  showTarget,
  onUpdateData,
  onSortArray,
}) => {
  const [activeTab, setActiveTab] = useState<WorkbenchTab>('code');

  const isSearching = metadata.category === 'searching';

  return (
    <section className="workbench-desk" aria-label="Laboratory Study & Development Tools">
      {/* Desk Tab Selection Strip */}
      <div className="desk-tab-strip" role="tablist" aria-label="Workbench Tools">
        <button
          type="button"
          role="tab"
          id="tab-code"
          aria-selected={activeTab === 'code'}
          aria-controls="panel-code"
          className={`desk-tab-btn ${activeTab === 'code' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          <span className="desk-tab-icon">💻</span>
          <span className="desk-tab-label">Source Code</span>
          {highlightLine && (
            <span className="desk-tab-badge">L{highlightLine}</span>
          )}
        </button>

        <button
          type="button"
          role="tab"
          id="tab-tutor"
          aria-selected={activeTab === 'tutor'}
          aria-controls="panel-tutor"
          className={`desk-tab-btn ${activeTab === 'tutor' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('tutor')}
        >
          <span className="desk-tab-icon">🧠</span>
          <span className="desk-tab-label">Lab Tutor</span>
          <span className="desk-tab-badge badge-cyan">100% Local</span>
        </button>

        {showArrayInput && (
          <button
            type="button"
            role="tab"
            id="tab-dataset"
            aria-selected={activeTab === 'dataset'}
            aria-controls="panel-dataset"
            className={`desk-tab-btn ${activeTab === 'dataset' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('dataset')}
          >
            <span className="desk-tab-icon">📊</span>
            <span className="desk-tab-label">Custom Dataset</span>
          </button>
        )}

        <button
          type="button"
          role="tab"
          id="tab-theory"
          aria-selected={activeTab === 'theory'}
          aria-controls="panel-theory"
          className={`desk-tab-btn ${activeTab === 'theory' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('theory')}
        >
          <span className="desk-tab-icon">📖</span>
          <span className="desk-tab-label">Theory &amp; Prerequisites</span>
        </button>

        {isSearching && (
          <button
            type="button"
            role="tab"
            id="tab-compare"
            aria-selected={activeTab === 'compare'}
            aria-controls="panel-compare"
            className={`desk-tab-btn ${activeTab === 'compare' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('compare')}
          >
            <span className="desk-tab-icon">⚖️</span>
            <span className="desk-tab-label">Linear vs Binary Benchmark</span>
          </button>
        )}
      </div>

      {/* Desk Tab Panels */}
      <div className="desk-content-panel">
        {activeTab === 'code' && (
          <div role="tabpanel" id="panel-code" aria-labelledby="tab-code">
            <CodeViewer
              sourceCode={sourceCode}
              highlightLine={highlightLine}
            />
          </div>
        )}

        {activeTab === 'tutor' && (
          <div role="tabpanel" id="panel-tutor" aria-labelledby="tab-tutor">
            <AITutorPanel
              metadata={metadata}
              currentStep={currentStep}
              currentStepIndex={currentStepIndex}
              totalSteps={totalSteps}
              inputArray={inputArray}
              inputTarget={inputTarget}
              lastChallengeResult={lastChallengeResult}
            />
          </div>
        )}

        {activeTab === 'dataset' && showArrayInput && (
          <div role="tabpanel" id="panel-dataset" aria-labelledby="tab-dataset">
            <DataInput
              initialArray={inputArray}
              initialTarget={inputTarget}
              disabled={isPlaying}
              showTarget={showTarget}
              requireSorted={requireSorted}
              onUpdateData={onUpdateData}
              onSortArray={onSortArray}
            />
          </div>
        )}

        {activeTab === 'theory' && (
          <div role="tabpanel" id="panel-theory" aria-labelledby="tab-theory">
            <AlgorithmInfoGuide metadata={metadata} />
          </div>
        )}

        {activeTab === 'compare' && isSearching && (
          <div role="tabpanel" id="panel-compare" aria-labelledby="tab-compare">
            <SearchingComparison />
          </div>
        )}
      </div>
    </section>
  );
};
