/**
 * Supported algorithm categories in AlgoLens.
 */
export type AlgorithmCategory =
  | 'searching'
  | 'sorting'
  | 'data-structures'
  | 'trees'
  | 'graphs'
  | 'techniques';

/**
 * Supported visualization canvas representations.
 * Extensible for current and upcoming visualizer modules.
 */
export type VisualizationType =
  | 'array'
  | 'tree'
  | 'graph'
  | 'stack-queue'
  | 'linked-list'
  | 'hash-table'
  | 'trie'
  | 'matrix';

/**
 * Visual states for array elements during animation.
 */
export type ElementState =
  | 'default'
  | 'comparing'
  | 'found'
  | 'discarded'
  | 'swapping'
  | 'sorted';

/**
 * Statistics tracked during algorithm execution.
 */
export interface StepStats extends Record<string, number | string | boolean | undefined> {
  comparisons?: number;
  accesses?: number;
  swaps?: number;
}

/**
 * Key pointers tracked during execution (e.g., left, mid, right in binary search).
 */
export interface StepPointers {
  left?: number;
  mid?: number;
  right?: number;
  current?: number;
  [key: string]: number | undefined;
}

/**
 * Universal base contract for ANY algorithm snapshot in AlgoLens.
 * Every algorithm step across arrays, trees, graphs, etc., implements BaseStep.
 */
export interface BaseStep {
  /** Discriminator determining which visualizer renders this step */
  kind: string;
  /** Human-readable explanation of what this specific step does */
  description: string;
  /** Optional action identifier (e.g. 'swap', 'compare', 'insert') */
  action?: string;
  /** Optional 1-indexed source code line number corresponding to this operation */
  codeLine?: number;
  /** Arbitrary live metrics (comparisons, accesses, visited count, etc.) */
  stats: Record<string, number | string | boolean | undefined>;
}

/**
 * Step representation for 1D Array algorithms (Searching, Sorting, Two Pointers, Sliding Window).
 */
export interface ArrayStep extends BaseStep {
  kind: 'array';
  /** Snapshot of the array at this step */
  array: number[];
  /** Visual highlight state for each index in the array */
  elementStates: Record<number, ElementState>;
  /** The specific array index being inspected in this step (if applicable) */
  currentIndex?: number;
  /** Active pointers on the array (e.g., left, mid, right) */
  pointers?: StepPointers;
  /** The value of the search target */
  target?: number;
  /** Whether the target has been successfully located at or before this step */
  isFound: boolean;
  /** The index where the target was found, or -1/undefined if not found */
  foundIndex?: number;
  /** Cumulative metrics up to this step */
  stats: StepStats;
}

export interface StackQueueStep extends BaseStep {
  kind: 'stack-queue';
  structureType: 'stack' | 'queue';
  items: number[];
  action: string;
  highlightedIndex?: number;
  activeItem?: number;
}

export interface LinkedListNode {
  id: string;
  value: number;
}

export interface LinkedListStep extends BaseStep {
  kind: 'linked-list';
  nodes: LinkedListNode[];
  activeNodeId?: string;
  pointers?: {
    head?: string;
    current?: string;
    prev?: string;
  };
  action: string;
}

export interface HashBucketEntry {
  key: string;
  value: number;
}

export interface HashTableStep extends BaseStep {
  kind: 'hash-table';
  capacity: number;
  buckets: HashBucketEntry[][];
  activeKey?: string;
  activeHash?: number;
  action: string;
}

export interface VisualTrieNode {
  id: string;
  char: string;
  isEndOfWord: boolean;
  children: Record<string, VisualTrieNode>;
}

export interface TrieStep extends BaseStep {
  kind: 'trie';
  root: VisualTrieNode;
  activeNodeId?: string;
  word?: string;
  action: string;
}

export interface VisualTreeNode {
  id: string;
  value: number;
  leftId?: string;
  rightId?: string;
  state?: 'default' | 'comparing' | 'swapping' | 'visited' | 'highlighted';
}

export interface TreeStep extends BaseStep {
  kind: 'tree';
  nodes: Record<string, VisualTreeNode>;
  rootId?: string;
  activeNodeId?: string;
  visitedNodeIds?: string[];
  traversalOrder?: number[];
  heapArray?: number[];
  action?: string;
}

export interface VisualGraphNode {
  id: string;
  label: string;
  state?: 'unvisited' | 'visiting' | 'visited' | 'current';
  distance?: number;
  x?: number;
  y?: number;
}

export interface VisualGraphEdge {
  from: string;
  to: string;
  weight?: number;
  state?: 'default' | 'considering' | 'included' | 'discarded';
}

export interface GraphStep extends BaseStep {
  kind: 'graph';
  nodes: VisualGraphNode[];
  edges: VisualGraphEdge[];
  activeNodeId?: string;
  activeEdge?: { from: string; to: string };
  queueOrStack?: string[];
  visitedNodes?: string[];
  mstEdges?: { from: string; to: string }[];
  action?: string;
}

export interface MatrixCellState {
  row: number;
  col: number;
  state: 'reading' | 'writing' | 'highlighted';
}

export interface MatrixStep extends BaseStep {
  kind: 'matrix';
  matrix: (number | string)[][];
  rowLabels?: string[];
  colLabels?: string[];
  highlightedCells?: MatrixCellState[];
  currentCallStack?: string[];
  action?: string;
}

/**
 * Union of all algorithm steps across all visualizers.
 */
export type AnyAlgorithmStep =
  | ArrayStep
  | TreeStep
  | GraphStep
  | StackQueueStep
  | LinkedListStep
  | HashTableStep
  | TrieStep
  | MatrixStep;

/**
 * Comprehensive metadata definition for an algorithm.
 */
export interface AlgorithmMetadata {
  id: string;
  name: string;
  category: AlgorithmCategory;
  visualizationType: VisualizationType;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  description: string;
  keyIdea: string;
  whenToUse: string[];
  limitations: string[];
  prerequisites: string[];
  sourceCode: {
    c: string;
    typescript: string;
  };
}
