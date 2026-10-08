import type { AlgorithmCategory, AlgorithmMetadata } from './types';
import { linearSearch, linearSearchMetadata } from './searching/linearSearch';
import { binarySearch, binarySearchMetadata } from './searching/binarySearch';
import { bubbleSort, bubbleSortMetadata } from './sorting/bubbleSort';
import { selectionSort, selectionSortMetadata } from './sorting/selectionSort';
import { insertionSort, insertionSortMetadata } from './sorting/insertionSort';
import { mergeSort, mergeSortMetadata } from './sorting/mergeSort';
import { quickSort, quickSortMetadata } from './sorting/quickSort';
import { heapSort, heapSortMetadata } from './sorting/heapSort';
import { arrayOperations, arrayOperationsMetadata } from './dataStructures/arrayOperations';
import { simulateStack, stackMetadata } from './dataStructures/stackOperations';
import { simulateQueue, queueMetadata } from './dataStructures/queueOperations';
import { simulateLinkedList, linkedListMetadata } from './dataStructures/linkedListOperations';
import { simulateHashTable, hashTableMetadata } from './dataStructures/hashTableOperations';
import { simulateHeap, heapMetadata } from './dataStructures/heapOperations';
import { simulateTrie, trieMetadata } from './dataStructures/trieOperations';
import { buildBinaryTree, binaryTreeMetadata } from './trees/binaryTree';
import { simulateBST, bstMetadata } from './trees/bst';
import { simulateInorderTraversal, inorderTraversalMetadata } from './trees/inorderTraversal';
import { simulatePreorderTraversal, preorderTraversalMetadata } from './trees/preorderTraversal';
import { simulatePostorderTraversal, postorderTraversalMetadata } from './trees/postorderTraversal';
import { simulateBFS, bfsMetadata } from './graphs/bfs';
import { simulateDFS, dfsMetadata } from './graphs/dfs';
import { simulateDijkstra, dijkstraMetadata } from './graphs/dijkstra';
import { simulatePrim, primMetadata } from './graphs/prim';
import { simulateKruskal, kruskalMetadata } from './graphs/kruskal';
import { simulateRecursion, recursionMetadata } from './techniques/recursion';
import { simulateTwoPointers, twoPointersMetadata } from './techniques/twoPointers';
import { simulateSlidingWindow, slidingWindowMetadata } from './techniques/slidingWindow';
import { simulateDivideAndConquer, divideAndConquerMetadata } from './techniques/divideAndConquer';
import { simulateGreedy, greedyMetadata } from './techniques/greedy';
import { simulateBacktracking, backtrackingMetadata } from './techniques/backtracking';
import { simulateDynamicProgramming, dynamicProgrammingMetadata } from './techniques/dynamicProgramming';

export interface CategoryInfo {
  id: AlgorithmCategory;
  name: string;
  icon: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'searching',
    name: 'Searching',
    icon: '🔍',
    description: 'Algorithms for locating target values inside collections.',
  },
  {
    id: 'sorting',
    name: 'Sorting',
    icon: '📶',
    description: 'Algorithms for arranging elements in specified ordering.',
  },
  {
    id: 'data-structures',
    name: 'Data Structures',
    icon: '🧱',
    description: 'Fundamental data organizations and dynamic operations.',
  },
  {
    id: 'trees',
    name: 'Trees',
    icon: '🌳',
    description: 'Hierarchical node structures and traversal orders.',
  },
  {
    id: 'graphs',
    name: 'Graphs',
    icon: '🕸️',
    description: 'Network topologies, shortest paths, and spanning trees.',
  },
  {
    id: 'techniques',
    name: 'Techniques',
    icon: '⚡',
    description: 'Algorithmic paradigms like Two Pointers, DP, and Greedy.',
  },
];

export interface RegisteredAlgorithm {
  metadata: AlgorithmMetadata;
  run: (input: any) => any[];
  defaultInput: {
    array: number[];
    target?: number;
    [key: string]: any;
  };
}

const DEFAULT_SORTING_ARRAY = [45, 12, 85, 32, 89, 39, 69, 22];

/**
 * Registry of all available algorithms in AlgoLens.
 */
export const ALGORITHM_REGISTRY: Record<string, RegisteredAlgorithm> = {
  // --- Chapter 1: Searching ---
  'linear-search': {
    metadata: linearSearchMetadata,
    run: ({ array, target = 23 }) => linearSearch(array, target),
    defaultInput: {
      array: [15, 42, 8, 23, 74, 31, 90, 56],
      target: 23,
    },
  },
  'binary-search': {
    metadata: binarySearchMetadata,
    run: ({ array, target = 23 }) => binarySearch(array, target),
    defaultInput: {
      array: [5, 12, 19, 23, 35, 48, 62, 79, 91],
      target: 23,
    },
  },

  // --- Chapter 2: Sorting ---
  'bubble-sort': {
    metadata: bubbleSortMetadata,
    run: ({ array }) => bubbleSort(array),
    defaultInput: {
      array: DEFAULT_SORTING_ARRAY,
    },
  },
  'selection-sort': {
    metadata: selectionSortMetadata,
    run: ({ array }) => selectionSort(array),
    defaultInput: {
      array: DEFAULT_SORTING_ARRAY,
    },
  },
  'insertion-sort': {
    metadata: insertionSortMetadata,
    run: ({ array }) => insertionSort(array),
    defaultInput: {
      array: DEFAULT_SORTING_ARRAY,
    },
  },
  'merge-sort': {
    metadata: mergeSortMetadata,
    run: ({ array }) => mergeSort(array),
    defaultInput: {
      array: DEFAULT_SORTING_ARRAY,
    },
  },
  'quick-sort': {
    metadata: quickSortMetadata,
    run: ({ array }) => quickSort(array),
    defaultInput: {
      array: DEFAULT_SORTING_ARRAY,
    },
  },
  'heap-sort': {
    metadata: heapSortMetadata,
    run: ({ array }) => heapSort(array),
    defaultInput: {
      array: DEFAULT_SORTING_ARRAY,
    },
  },

  // --- Chapter 3: Data Structures ---
  'array-ds': {
    metadata: arrayOperationsMetadata,
    run: ({ array }) => arrayOperations({ array: array.length ? array : [10, 20, 30, 40, 50], operation: 'insert', index: 2, value: 99 }),
    defaultInput: {
      array: [10, 20, 30, 40, 50],
    },
  },
  'stack-ds': {
    metadata: stackMetadata,
    run: () => simulateStack(),
    defaultInput: {
      array: [10, 25, 40],
    },
  },
  'queue-ds': {
    metadata: queueMetadata,
    run: () => simulateQueue(),
    defaultInput: {
      array: [15, 30, 45],
    },
  },
  'linked-list-ds': {
    metadata: linkedListMetadata,
    run: () => simulateLinkedList(),
    defaultInput: {
      array: [10, 20, 30],
    },
  },
  'hash-table-ds': {
    metadata: hashTableMetadata,
    run: () => simulateHashTable(),
    defaultInput: {
      array: [],
    },
  },
  'heap-ds': {
    metadata: heapMetadata,
    run: () => simulateHeap(),
    defaultInput: {
      array: [80, 50, 60, 20, 30, 40],
    },
  },
  'trie-ds': {
    metadata: trieMetadata,
    run: () => simulateTrie(),
    defaultInput: {
      array: [],
    },
  },

  // --- Chapter 4: Trees ---
  'binary-tree': {
    metadata: binaryTreeMetadata,
    run: () => buildBinaryTree(),
    defaultInput: {
      array: [1, 2, 3, 4, 5, 6, 7],
    },
  },
  'bst': {
    metadata: bstMetadata,
    run: () => simulateBST(),
    defaultInput: {
      array: [50, 30, 70, 20, 40, 60, 80],
    },
  },
  'inorder-traversal': {
    metadata: inorderTraversalMetadata,
    run: () => simulateInorderTraversal(),
    defaultInput: {
      array: [50, 30, 70, 20, 40, 60, 80],
    },
  },
  'preorder-traversal': {
    metadata: preorderTraversalMetadata,
    run: () => simulatePreorderTraversal(),
    defaultInput: {
      array: [1, 2, 4, 5, 3, 6, 7],
    },
  },
  'postorder-traversal': {
    metadata: postorderTraversalMetadata,
    run: () => simulatePostorderTraversal(),
    defaultInput: {
      array: [4, 5, 2, 6, 7, 3, 1],
    },
  },

  // --- Chapter 5: Graphs ---
  'bfs': {
    metadata: bfsMetadata,
    run: () => simulateBFS(),
    defaultInput: {
      array: [],
    },
  },
  'dfs': {
    metadata: dfsMetadata,
    run: () => simulateDFS(),
    defaultInput: {
      array: [],
    },
  },
  'dijkstra': {
    metadata: dijkstraMetadata,
    run: () => simulateDijkstra(),
    defaultInput: {
      array: [],
    },
  },
  'prim': {
    metadata: primMetadata,
    run: () => simulatePrim(),
    defaultInput: {
      array: [],
    },
  },
  'kruskal': {
    metadata: kruskalMetadata,
    run: () => simulateKruskal(),
    defaultInput: {
      array: [],
    },
  },

  // --- Chapter 6: Algorithmic Techniques ---
  'recursion': {
    metadata: recursionMetadata,
    run: () => simulateRecursion(),
    defaultInput: {
      array: [],
    },
  },
  'two-pointers': {
    metadata: twoPointersMetadata,
    run: ({ array, target = 30 }) =>
      simulateTwoPointers({
        array: array.length ? array : [2, 7, 11, 15, 19, 28, 33],
        target,
      }),
    defaultInput: {
      array: [2, 7, 11, 15, 19, 28, 33],
      target: 30,
    },
  },
  'sliding-window': {
    metadata: slidingWindowMetadata,
    run: ({ array }) =>
      simulateSlidingWindow({
        array: array.length ? array : [2, 1, 5, 1, 3, 2, 7, 4],
        k: 3,
      }),
    defaultInput: {
      array: [2, 1, 5, 1, 3, 2, 7, 4],
    },
  },
  'divide-and-conquer': {
    metadata: divideAndConquerMetadata,
    run: () => simulateDivideAndConquer(),
    defaultInput: {
      array: [],
    },
  },
  'greedy': {
    metadata: greedyMetadata,
    run: () => simulateGreedy(),
    defaultInput: {
      array: [],
    },
  },
  'backtracking': {
    metadata: backtrackingMetadata,
    run: () => simulateBacktracking(),
    defaultInput: {
      array: [],
    },
  },
  'dynamic-programming': {
    metadata: dynamicProgrammingMetadata,
    run: () => simulateDynamicProgramming(),
    defaultInput: {
      array: [],
    },
  },
};

export function getAlgorithmById(id: string): RegisteredAlgorithm | undefined {
  return ALGORITHM_REGISTRY[id];
}

export function getAlgorithmsByCategory(category: AlgorithmCategory): RegisteredAlgorithm[] {
  return Object.values(ALGORITHM_REGISTRY).filter(
    (algo) => algo.metadata.category === category
  );
}
