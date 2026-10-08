import React, { useState } from 'react';
import type { AlgorithmMetadata, BaseStep } from '../../algorithms/types';
import './AITutorPanel.css';

interface AITutorPanelProps {
  metadata: AlgorithmMetadata;
  currentStep: BaseStep | null;
  currentStepIndex: number;
  totalSteps: number;
}

export const AITutorPanel: React.FC<AITutorPanelProps> = ({
  metadata,
  currentStep,
  currentStepIndex,
  totalSteps,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);

  const handlePromptClick = (
    type: 'step' | 'why_works' | 'complexity' | 'c_code' | 'viva'
  ) => {
    setIsOpen(true);
    switch (type) {
      case 'step':
        if (!currentStep) {
          setAnswer('Start or advance the visualization using the Play or Next button to analyze an active step.');
          return;
        }
        setAnswer(
          `**Step ${currentStepIndex + 1} of ${totalSteps} Analysis:**\n\n` +
            `• **Current Operation:** ${currentStep.action ? currentStep.action.toUpperCase() : 'Inspection'}\n` +
            `• **Core Observation:** ${currentStep.description}\n` +
            `• **Source Pointer:** Line ${currentStep.codeLine ?? 'N/A'} in the C implementation is currently active.\n\n` +
            `💡 **Key Insight:** At this transition, the algorithm maintains its core invariant before deciding whether to branch, swap, or advance.`
        );
        break;

      case 'why_works':
        setAnswer(
          `**Why ${metadata.name} Works:**\n\n` +
            `• **Core Invariant:** ${metadata.keyIdea}\n` +
            `• **Correctness Guarantee:** ${metadata.description}\n\n` +
            `💡 In practical applications, this algorithm ensures predictable behavior by enforcing this invariant at every cycle.`
        );
        break;

      case 'complexity':
        setAnswer(
          `**Complexity Blueprint for ${metadata.name}:**\n\n` +
            `• **Best Case:** ${metadata.timeComplexity.best}\n` +
            `• **Average Case:** ${metadata.timeComplexity.average}\n` +
            `• **Worst Case:** ${metadata.timeComplexity.worst}\n` +
            `• **Space Complexity:** ${metadata.spaceComplexity}\n\n` +
            `⚠️ **Known Boundary Conditions:**\n` +
            metadata.limitations.map((l) => `  - ${l}`).join('\n')
        );
        break;

      case 'c_code':
        setAnswer(
          `**Connecting to C Source Code:**\n\n` +
            `In C, algorithms directly manipulate raw memory addresses, pointers, and array indices without language abstraction overhead.\n\n` +
            `Currently executing: Line ${currentStep?.codeLine ?? 1} in the active function. Notice how every index check mirrors the manual pointer dereference in C.`
        );
        break;

      case 'viva':
        setAnswer(
          `**BCA & Technical Interview Viva Questions (${metadata.name}):**\n\n` +
            `1. **What is the foundational invariant of ${metadata.name}?**\n` +
            `   ➔ ${metadata.keyIdea}\n\n` +
            `2. **When is it optimal to use this algorithm?**\n` +
            `   ➔ ${metadata.whenToUse[0] ?? 'When predictable linear traversal is needed.'}\n\n` +
            `3. **What is the space overhead?**\n` +
            `   ➔ Requires ${metadata.spaceComplexity} auxiliary memory.\n\n` +
            `4. **What are the prerequisites to be mindful of?**\n` +
            `   ➔ ${metadata.prerequisites.join(', ')}.`
        );
        break;
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsOpen(true);
    const q = query.toLowerCase();
    let response = '';

    if (q.includes('time') || q.includes('complexity') || q.includes('big o')) {
      response = `**Time Complexity Breakdown (${metadata.name}):**\nBest: ${metadata.timeComplexity.best} • Average: ${metadata.timeComplexity.average} • Worst: ${metadata.timeComplexity.worst}. Space: ${metadata.spaceComplexity}.`;
    } else if (q.includes('step') || q.includes('now') || q.includes('current')) {
      response = currentStep
        ? `**Active Step (${currentStepIndex + 1}/${totalSteps}):** ${currentStep.description}`
        : 'Visualization is at initial state. Press Play or Step to begin.';
    } else if (q.includes('why') || q.includes('how') || q.includes('idea')) {
      response = `**Foundational Principle:**\n${metadata.keyIdea}\n\n${metadata.description}`;
    } else if (q.includes('limitation') || q.includes('bad') || q.includes('worst')) {
      response = `**Boundary Conditions & Limitations:**\n${metadata.limitations.map((l) => `• ${l}`).join('\n')}`;
    } else {
      response = `**AlgoLens Laboratory Tutor:**\nRegarding "${query}":\n\nIn **${metadata.name}** (${metadata.category}), the invariant is that ${metadata.keyIdea}.\n\nPrimary application: ${metadata.whenToUse[0] ?? 'standard algorithmic workflows'}.`;
    }

    setAnswer(response);
    setQuery('');
  };

  return (
    <section className="laboratory-assistant">
      <div className="assistant-header">
        <div className="assistant-title-group">
          <span className="assistant-badge">ALGO TUTOR</span>
          <span className="assistant-context-tag">
            {metadata.name} • Step {currentStepIndex + 1}/{totalSteps}
          </span>
        </div>

        <button
          type="button"
          className="assistant-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Minimize ▴' : 'Open Assistant ▾'}
        </button>
      </div>

      {/* Suggested Action Chips (Always accessible) */}
      <div className="assistant-chip-tray">
        <button
          type="button"
          className="action-chip"
          onClick={() => handlePromptClick('step')}
        >
          Explain this step
        </button>
        <button
          type="button"
          className="action-chip"
          onClick={() => handlePromptClick('why_works')}
        >
          Why does this work?
        </button>
        <button
          type="button"
          className="action-chip"
          onClick={() => handlePromptClick('complexity')}
        >
          Explain complexity
        </button>
        <button
          type="button"
          className="action-chip"
          onClick={() => handlePromptClick('c_code')}
        >
          How does this C code work?
        </button>
        <button
          type="button"
          className="action-chip"
          onClick={() => handlePromptClick('viva')}
        >
          Viva question
        </button>
      </div>

      {/* Expandable Assistant Console */}
      {isOpen && (
        <div className="assistant-console-body">
          {answer && <div className="assistant-response-display">{answer}</div>}

          <form className="assistant-input-form" onSubmit={handleCustomSubmit}>
            <input
              type="text"
              className="assistant-text-input"
              placeholder={`Ask a question about ${metadata.name} (e.g. "Why is it O(log n)?")...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="assistant-send-btn">
              Ask Tutor
            </button>
          </form>
        </div>
      )}
    </section>
  );
};
