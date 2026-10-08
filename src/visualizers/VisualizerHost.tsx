import React from 'react';
import type { AnyAlgorithmStep } from '../algorithms/types';
import { ArrayVisualizer } from './ArrayVisualizer/ArrayVisualizer';
import { StackQueueVisualizer } from './StackQueueVisualizer/StackQueueVisualizer';
import { LinkedListVisualizer } from './LinkedListVisualizer/LinkedListVisualizer';
import { HashTableVisualizer } from './HashTableVisualizer/HashTableVisualizer';
import { TrieVisualizer } from './TrieVisualizer/TrieVisualizer';
import { TreeVisualizer } from './TreeVisualizer/TreeVisualizer';
import { GraphVisualizer } from './GraphVisualizer/GraphVisualizer';
import { MatrixVisualizer } from './MatrixVisualizer/MatrixVisualizer';

interface VisualizerHostProps {
  step: AnyAlgorithmStep | null;
  fallbackArray: number[];
}

/**
 * Polymorphic Visualizer Dispatcher.
 * Inspects step.kind to render the appropriate visual canvas.
 */
export const VisualizerHost: React.FC<VisualizerHostProps> = ({
  step,
  fallbackArray,
}) => {
  if (!step) {
    return (
      <ArrayVisualizer
        array={fallbackArray}
        elementStates={{}}
      />
    );
  }

  switch (step.kind) {
    case 'array':
      return (
        <ArrayVisualizer
          array={step.array}
          elementStates={step.elementStates}
          currentIndex={step.currentIndex}
          pointers={step.pointers}
        />
      );

    case 'stack-queue':
      return <StackQueueVisualizer step={step} />;

    case 'linked-list':
      return <LinkedListVisualizer step={step} />;

    case 'hash-table':
      return <HashTableVisualizer step={step} />;

    case 'trie':
      return <TrieVisualizer step={step} />;

    case 'tree':
      return <TreeVisualizer step={step} />;

    case 'graph':
      return <GraphVisualizer step={step} />;

    case 'matrix':
      return <MatrixVisualizer step={step} />;

    default:
      return (
        <div style={{ padding: '24px', textAlign: 'center', color: '#ef4444' }}>
          Unknown visualization kind: {(step as AnyAlgorithmStep).kind}
        </div>
      );
  }
};
