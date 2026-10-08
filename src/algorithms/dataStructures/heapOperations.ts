import type { TreeStep, VisualTreeNode, AlgorithmMetadata } from '../types';

export const heapMetadata: AlgorithmMetadata = {
  id: 'heap-ds',
  name: 'Binary Heap (Max-Heap)',
  category: 'data-structures',
  visualizationType: 'tree',
  difficulty: 'Intermediate',
  prerequisites: ['Arrays', 'Complete Binary Trees', 'Heap Property'],
  timeComplexity: {
    best: 'O(1) [Find Max / Root]',
    average: 'O(log n) [Insert / Extract-Max]',
    worst: 'O(log n) [Insert / Extract-Max]',
  },
  spaceComplexity: 'O(n)',
  description:
    'A complete binary tree stored compactly in a flat array where every parent node is greater than or equal to its children (Max-Heap property). Child indices: Left = 2*i + 1, Right = 2*i + 2.',
  keyIdea:
    'The heap invariant guarantees the maximum value is always at the root (index 0). Insertions bubble up from the bottom; deletions replace root with the last leaf and bubble down.',
  whenToUse: [
    'Priority Queues (Dijkstra shortest paths, Prim MST, CPU job scheduling).',
    'Heap Sort algorithm (O(n log n) in-place sorting).',
    'Finding the Kth largest/smallest element in an ongoing stream.',
  ],
  limitations: [
    'Searching for arbitrary non-maximum values takes linear O(n) time.',
    'No efficient way to print elements in sorted order without extracting one-by-one.',
  ],
  sourceCode: {
    c: `// Max-Heap in C
#define MAX 100
int heap[MAX];
int size = 0;

void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

void insert(int val) {
    int i = size++;
    heap[i] = val;
    // Bubble Up
    while (i > 0 && heap[(i - 1) / 2] < heap[i]) {
        swap(&heap[i], &heap[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

int extractMax() {
    if (size == 0) return -1;
    int maxVal = heap[0];
    heap[0] = heap[--size];
    // Bubble Down
    int i = 0;
    while (2 * i + 1 < size) {
        int left = 2 * i + 1, right = 2 * i + 2, largest = left;
        if (right < size && heap[right] > heap[left]) largest = right;
        if (heap[i] >= heap[largest]) break;
        swap(&heap[i], &heap[largest]);
        i = largest;
    }
    return maxVal;
}`,
    typescript: `// Max-Heap in TypeScript
class MaxHeap {
  heap: number[] = [];
  insert(val: number) {
    this.heap.push(val);
    let i = this.heap.length - 1;
    while (i > 0 && this.heap[Math.floor((i - 1) / 2)] < this.heap[i]) {
      const p = Math.floor((i - 1) / 2);
      [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
      i = p;
    }
  }
}`,
  },
};

function buildTreeNodes(heap: number[], activeIdx?: number, swapIdx?: number): {
  nodes: Record<string, VisualTreeNode>;
  rootId?: string;
} {
  const nodes: Record<string, VisualTreeNode> = {};
  if (heap.length === 0) return { nodes };

  for (let i = 0; i < heap.length; i++) {
    const id = `node-${i}`;
    const leftIdx = 2 * i + 1;
    const rightIdx = 2 * i + 2;

    let state: VisualTreeNode['state'] = 'default';
    if (i === activeIdx) state = 'comparing';
    if (i === swapIdx) state = 'swapping';

    nodes[id] = {
      id,
      value: heap[i],
      leftId: leftIdx < heap.length ? `node-${leftIdx}` : undefined,
      rightId: rightIdx < heap.length ? `node-${rightIdx}` : undefined,
      state,
    };
  }

  return { nodes, rootId: 'node-0' };
}

export interface HeapSimulationInput {
  initialHeap?: number[];
  insertValue?: number;
}

export function simulateHeap(input?: HeapSimulationInput): TreeStep[] {
  const heap = input?.initialHeap ? [...input.initialHeap] : [80, 50, 60, 20, 30, 40];
  const insertVal = input?.insertValue ?? 95;
  const steps: TreeStep[] = [];

  const initialTree = buildTreeNodes(heap);
  steps.push({
    kind: 'tree',
    nodes: initialTree.nodes,
    rootId: initialTree.rootId,
    heapArray: [...heap],
    action: 'idle',
    description: `Initial Max-Heap with ${heap.length} elements. Root is ${heap[0]} (highest priority).`,
    stats: { size: heap.length, root: heap[0] ?? 'Empty' },
    codeLine: 5,
  });

  // Action 1: Insert new value at end
  heap.push(insertVal);
  let curr = heap.length - 1;
  let treeState = buildTreeNodes(heap, curr);

  steps.push({
    kind: 'tree',
    nodes: treeState.nodes,
    rootId: treeState.rootId,
    heapArray: [...heap],
    activeNodeId: `node-${curr}`,
    action: 'insert',
    description: `INSERT(${insertVal}): Placed at bottom leaf (index ${curr}). Starting Bubble Up (Sift Up).`,
    stats: { size: heap.length, current: insertVal },
    codeLine: 11,
  });

  // Bubble up
  while (curr > 0) {
    const parent = Math.floor((curr - 1) / 2);
    treeState = buildTreeNodes(heap, curr, parent);

    steps.push({
      kind: 'tree',
      nodes: treeState.nodes,
      rootId: treeState.rootId,
      heapArray: [...heap],
      activeNodeId: `node-${curr}`,
      action: 'compare',
      description: `Comparing child heap[${curr}] (${heap[curr]}) with parent heap[${parent}] (${heap[parent]}).`,
      stats: { size: heap.length, child: heap[curr], parent: heap[parent] },
      codeLine: 13,
    });

    if (heap[curr] > heap[parent]) {
      const temp = heap[curr];
      heap[curr] = heap[parent];
      heap[parent] = temp;

      treeState = buildTreeNodes(heap, parent, curr);
      steps.push({
        kind: 'tree',
        nodes: treeState.nodes,
        rootId: treeState.rootId,
        heapArray: [...heap],
        activeNodeId: `node-${parent}`,
        action: 'swap',
        description: `Max-heap violation! Swapped child (${temp}) with parent (${heap[curr]}).`,
        stats: { size: heap.length, swapped: temp },
        codeLine: 14,
      });

      curr = parent;
    } else {
      break;
    }
  }

  // Final insertion state
  const settledTree = buildTreeNodes(heap);
  steps.push({
    kind: 'tree',
    nodes: settledTree.nodes,
    rootId: settledTree.rootId,
    heapArray: [...heap],
    action: 'settled',
    description: `Bubble up complete. ${insertVal} is in its correct heap position.`,
    stats: { size: heap.length, root: heap[0] },
    codeLine: 16,
  });

  // Action 2: Extract Max
  const maxVal = heap[0];
  const lastVal = heap.pop()!;
  if (heap.length > 0) {
    heap[0] = lastVal;
    let downTree = buildTreeNodes(heap, 0);

    steps.push({
      kind: 'tree',
      nodes: downTree.nodes,
      rootId: downTree.rootId,
      heapArray: [...heap],
      activeNodeId: 'node-0',
      action: 'extract-max',
      description: `EXTRACT-MAX(): Removed root (${maxVal}). Replaced root with last element (${lastVal}). Starting Sift Down.`,
      stats: { size: heap.length, extracted: maxVal },
      codeLine: 23,
    });

    // Bubble down
    let p = 0;
    while (2 * p + 1 < heap.length) {
      const left = 2 * p + 1;
      const right = 2 * p + 2;
      let largest = left;

      if (right < heap.length && heap[right] > heap[left]) {
        largest = right;
      }

      if (heap[p] < heap[largest]) {
        const t = heap[p];
        heap[p] = heap[largest];
        heap[largest] = t;

        const downStepTree = buildTreeNodes(heap, largest, p);
        steps.push({
          kind: 'tree',
          nodes: downStepTree.nodes,
          rootId: downStepTree.rootId,
          heapArray: [...heap],
          activeNodeId: `node-${largest}`,
          action: 'sift-down',
          description: `Sift Down: Swapped heap[${p}] (${t}) with larger child heap[${largest}] (${heap[p]}).`,
          stats: { size: heap.length, siftDown: heap[p] },
          codeLine: 30,
        });

        p = largest;
      } else {
        break;
      }
    }
  }

  const finalTree = buildTreeNodes(heap);
  steps.push({
    kind: 'tree',
    nodes: finalTree.nodes,
    rootId: finalTree.rootId,
    heapArray: [...heap],
    action: 'idle',
    description: `Extract-Max complete. New root is ${heap[0] ?? 'Empty'}. Heap invariant preserved.`,
    stats: { size: heap.length, root: heap[0] ?? 'Empty' },
    codeLine: 34,
  });

  return steps;
}
