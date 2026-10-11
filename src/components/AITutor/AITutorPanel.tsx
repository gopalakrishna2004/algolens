import React, { useState } from 'react';
import type { AlgorithmMetadata, BaseStep } from '../../algorithms/types';
import './AITutorPanel.css';

interface AITutorPanelProps {
  metadata: AlgorithmMetadata;
  currentStep: BaseStep | null;
  currentStepIndex: number;
  totalSteps: number;
  inputArray?: number[];
  inputTarget?: number;
  lastChallengeResult?: { isCorrect: boolean; concept?: string } | null;
}

export const AITutorPanel: React.FC<AITutorPanelProps> = ({
  metadata,
  currentStep,
  currentStepIndex,
  totalSteps,
  inputArray,
  inputTarget,
  lastChallengeResult,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);

  // Extract the specific highlighted line from C source code if available
  const getCSourceLine = (lineNum?: number): string | null => {
    if (!lineNum || !metadata.sourceCode?.c) return null;
    const lines = metadata.sourceCode.c.split('\n');
    const targetLine = lines[lineNum - 1];
    return targetLine ? targetLine.trim() : null;
  };

  const activeCLineText = getCSourceLine(currentStep?.codeLine);

  const handleAction = (
    actionType:
      | 'step'
      | 'c_line'
      | 'why_necessary'
      | 'complexity'
      | 'small_example'
      | 'viva'
      | 'compare'
      | 'challenge_analysis'
  ) => {
    setIsOpen(true);

    switch (actionType) {
      case 'step': {
        if (!currentStep) {
          setAnswer('Laboratory timeline is at initial reset state. Press Play or Step Forward to activate an execution snapshot.');
          return;
        }

        const statsEntries = Object.entries(currentStep.stats || {})
          .filter((entry) => entry[1] !== undefined)
          .map(([k, v]) => `${k}: ${v}`)
          .join(' • ');

        setAnswer(
          `**Laboratory Step Analysis (Step ${currentStepIndex + 1} of ${totalSteps}):**\n\n` +
          `• **Operation:** ${currentStep.action ? currentStep.action.toUpperCase() : 'INSPECTION'}\n` +
          `• **Current Action:** ${currentStep.description}\n` +
          `• **Live Metrics:** ${statsEntries || 'N/A'}\n` +
          `• **C Source Line:** ${currentStep.codeLine ? `Line ${currentStep.codeLine}` : 'Internal transition'}\n\n` +
          `💡 **Invariant Guarantee:** The algorithm strictly preserves its monotonic properties at this transition before deciding the next pointer or memory transformation.`
        );
        break;
      }

      case 'c_line': {
        const lineNum = currentStep?.codeLine ?? 1;
        const codeSnippet = activeCLineText ?? 'Line execution pointer';

        setAnswer(
          `**C Source Code Mapping (Line ${lineNum}):**\n\n` +
          `\`\`\`c\n` +
          `// Line ${lineNum} in ${metadata.name} C implementation\n` +
          `${codeSnippet}\n` +
          `\`\`\`\n\n` +
          `• **Low-Level Semantics:** In native C, this maps directly to CPU register operations or direct pointer dereferencing without language runtime overhead.\n` +
          `• **Memory Impact:** Manipulates elements in contiguous memory layout, maximizing L1/L2 cache locality.`
        );
        break;
      }

      case 'why_necessary': {
        setAnswer(
          `**Why Is This Operation Mandatory?**\n\n` +
          `• **Core Invariant:** "${metadata.keyIdea}"\n\n` +
          `• **What happens if skipped?**\n` +
          `  If this comparison, pointer shift, or boundary adjustment were omitted, the algorithm would fail to contract the search space or resolve inversions. This would lead to incorrect results, infinite loops, or violation of the time complexity guarantees.\n\n` +
          `• **Correctness Proof Anchor:** At each cycle, the algorithm reduces the unresolved problem size by a bounded factor.`
        );
        break;
      }

      case 'complexity': {
        setAnswer(
          `**Complexity & Resource Blueprint for ${metadata.name}:**\n\n` +
          `• **Best Case Time:** ${metadata.timeComplexity.best}\n` +
          `• **Average Case Time:** ${metadata.timeComplexity.average}\n` +
          `• **Worst Case Time:** ${metadata.timeComplexity.worst}\n` +
          `• **Auxiliary Space:** ${metadata.spaceComplexity}\n\n` +
          `⚠️ **Boundary Conditions & Limitations:**\n` +
          metadata.limitations.map((l) => `  - ${l}`).join('\n')
        );
        break;
      }

      case 'small_example': {
        const sample = inputArray && inputArray.length > 0 ? inputArray.slice(0, 4) : [3, 1, 4, 2];
        const targetClause = inputTarget !== undefined ? ` looking for target ${inputTarget}` : '';
        setAnswer(
          `**Walkthrough Example with Compact Input [${sample.join(', ')}]${targetClause}:**\n\n` +
          `1. **Initialization:** Set initial indices or structures according to ${metadata.name}.\n` +
          `2. **First Cycle:** Inspect first partition or element. Compare against target or adjacent value.\n` +
          `3. **State Transition:** Advance pointer or swap inverted pair.\n` +
          `4. **Termination:** Stop when pointers cross or whole collection satisfies the invariant.`
        );
        break;
      }

      case 'viva': {
        setAnswer(
          `**High-Yield Technical Interview & Viva Questions (${metadata.name}):**\n\n` +
          `1. **Q:** What is the foundational principle of ${metadata.name}?\n` +
          `   **A:** ${metadata.keyIdea}\n\n` +
          `2. **Q:** What is the worst-case time complexity and when does it occur?\n` +
          `   **A:** ${metadata.timeComplexity.worst}. Occurs under: ${metadata.limitations[0] ?? 'adverse input distribution'}.\n\n` +
          `3. **Q:** What is the space overhead and is this algorithm in-place?\n` +
          `   **A:** Auxiliary space is ${metadata.spaceComplexity}. ${metadata.spaceComplexity === 'O(1)' ? 'Yes, strictly in-place.' : 'No, requires additional memory.'}\n\n` +
          `4. **Q:** In what practical scenarios is this algorithm preferred?\n` +
          `   **A:** ${metadata.whenToUse.join(' • ')}.`
        );
        break;
      }

      case 'compare': {
        let comparisonTarget = 'Alternative algorithm';
        let comparisonDetails = '';

        if (metadata.id === 'linear-search') {
          comparisonTarget = 'Binary Search';
          comparisonDetails = `Linear Search operates on ANY unsorted array in O(n) time, whereas Binary Search requires O(n log n) prior sorting overhead but executes searches in ultra-fast O(log n) time.`;
        } else if (metadata.id === 'binary-search') {
          comparisonTarget = 'Linear Search';
          comparisonDetails = `Binary Search achieves O(log n) compared to Linear Search's O(n), but strictly depends on the array remaining sorted. For small arrays (< 16 items), Linear Search can be faster due to branch prediction.`;
        } else if (metadata.category === 'sorting') {
          comparisonTarget = metadata.id === 'quick-sort' ? 'Merge Sort' : 'Quick Sort';
          comparisonDetails = `Quick Sort is in-place O(1) space with O(n log n) average but O(n^2) worst case. Merge Sort is guaranteed O(n log n) and stable, but requires O(n) auxiliary space.`;
        } else if (metadata.category === 'graphs') {
          comparisonTarget = metadata.id === 'bfs' ? 'DFS' : 'BFS';
          comparisonDetails = `BFS finds the shortest path in unweighted graphs using a queue, while DFS explores branches deeply using a stack or recursion.`;
        } else {
          comparisonTarget = 'Alternative paradigm';
          comparisonDetails = `Compare based on time-space trade-offs, stability, and prerequisites.`;
        }

        setAnswer(
          `**Algorithm Comparison: ${metadata.name} vs ${comparisonTarget}:**\n\n` +
          `${comparisonDetails}\n\n` +
          `• **When to choose ${metadata.name}:**\n` +
          metadata.whenToUse.map((w) => `  - ${w}`).join('\n')
        );
        break;
      }

      case 'challenge_analysis': {
        if (!lastChallengeResult) {
          setAnswer('No recent challenge attempt recorded in this session. Switch to Challenge Mode to test your predictions!');
          return;
        }

        setAnswer(
          `**Analysis of Recent Prediction Attempt:**\n\n` +
          `• **Concept Tested:** ${lastChallengeResult.concept ?? 'Algorithmic Invariant'}\n` +
          `• **Result:** ${lastChallengeResult.isCorrect ? '✅ Successful prediction!' : '❌ Prediction missed.'}\n` +
          `• **Takeaway:** ${lastChallengeResult.isCorrect
            ? 'Great intuition! You correctly anticipated the state transformation governed by the algorithm invariant.'
            : 'Review the comparison rules and monotonic pointer direction to predict the next operation.'}`
        );
        break;
      }
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsOpen(true);
    const q = query.toLowerCase();
    let response = '';

    if (q.includes('time') || q.includes('complexity') || q.includes('big o') || q.includes('space')) {
      response = `**Complexity Blueprint for ${metadata.name}:**\n• Best: ${metadata.timeComplexity.best}\n• Average: ${metadata.timeComplexity.average}\n• Worst: ${metadata.timeComplexity.worst}\n• Auxiliary Space: ${metadata.spaceComplexity}`;
    } else if (q.includes('step') || q.includes('now') || q.includes('current')) {
      response = currentStep
        ? `**Active Step ${currentStepIndex + 1} of ${totalSteps}:** ${currentStep.description}\n\nAction: ${currentStep.action ?? 'Inspection'}. C Source: Line ${currentStep.codeLine ?? 'N/A'}.`
        : 'Visualization is at initial state. Press Play or Step Forward to begin.';
    } else if (q.includes('why') || q.includes('how') || q.includes('idea')) {
      response = `**Foundational Invariant of ${metadata.name}:**\n${metadata.keyIdea}\n\n${metadata.description}`;
    } else if (q.includes('c code') || q.includes('c line') || q.includes('source')) {
      response = `**C Source Code Mapping:**\nCurrently at Line ${currentStep?.codeLine ?? 1}.\n${activeCLineText ? `Code: \`${activeCLineText}\`` : 'Check the code viewer on the right to inspect full C source.'}`;
    } else if (q.includes('limitation') || q.includes('worst') || q.includes('disadvantage')) {
      response = `**Limitations & Boundary Conditions:**\n${metadata.limitations.map((l) => `• ${l}`).join('\n')}`;
    } else {
      response = `**AlgoLens Laboratory Tutor:**\nRegarding "${query}":\n\nIn **${metadata.name}** (${metadata.category}), the core invariant is: ${metadata.keyIdea}.\n\nRecommended use case: ${metadata.whenToUse[0] ?? 'standard algorithmic workflows'}.`;
    }

    setAnswer(response);
    setQuery('');
  };

  return (
    <section className="laboratory-assistant" role="region" aria-label="Intelligent Laboratory Tutor">
      <div className="assistant-header">
        <div className="assistant-title-group">
          <span className="assistant-badge">INTELLIGENT LAB TUTOR</span>
          <span className="assistant-context-tag">
            {metadata.name} • Step {currentStepIndex + 1}/{totalSteps}
          </span>
          <span className="assistant-engine-tag" title="Deterministic expert analysis computed entirely in-browser">
            100% Local Engine
          </span>
        </div>

        <button
          type="button"
          className="assistant-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Collapse Tutor Console' : 'Expand Tutor Console'}
        >
          {isOpen ? 'Minimize ▴' : 'Expand Tutor ▾'}
        </button>
      </div>

      {/* Suggested Action Chips */}
      <div className="assistant-chip-tray" role="group" aria-label="Tutor contextual action chips">
        <button
          type="button"
          className="action-chip"
          onClick={() => handleAction('step')}
        >
          Explain this step
        </button>
        <button
          type="button"
          className="action-chip"
          onClick={() => handleAction('c_line')}
        >
          Explain C line {currentStep?.codeLine ? `[L${currentStep.codeLine}]` : ''}
        </button>
        <button
          type="button"
          className="action-chip"
          onClick={() => handleAction('why_necessary')}
        >
          Why is this necessary?
        </button>
        <button
          type="button"
          className="action-chip"
          onClick={() => handleAction('complexity')}
        >
          Explain complexity
        </button>
        <button
          type="button"
          className="action-chip"
          onClick={() => handleAction('small_example')}
        >
          Small example
        </button>
        <button
          type="button"
          className="action-chip"
          onClick={() => handleAction('viva')}
        >
          Viva questions
        </button>
        <button
          type="button"
          className="action-chip"
          onClick={() => handleAction('compare')}
        >
          Compare algorithm
        </button>
        {lastChallengeResult && (
          <button
            type="button"
            className="action-chip highlight-chip"
            onClick={() => handleAction('challenge_analysis')}
          >
            Analyze my challenge answer
          </button>
        )}
      </div>

      {/* Expandable Assistant Console */}
      {isOpen && (
        <div className="assistant-console-body">
          {answer && (
            <div className="assistant-response-display" role="status" aria-live="polite">
              {answer}
            </div>
          )}

          <form className="assistant-input-form" onSubmit={handleCustomSubmit}>
            <input
              type="text"
              className="assistant-text-input"
              placeholder={`Ask about ${metadata.name} (e.g. "Why is it ${metadata.timeComplexity.worst}?", "Explain line ${currentStep?.codeLine ?? 1}")...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Ask algorithm tutor question"
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
