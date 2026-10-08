import type { ArrayStep, ElementState, AlgorithmMetadata } from '../types';

export const heapSortMetadata: AlgorithmMetadata = {
  id: 'heap-sort',
  name: 'Heap Sort',
  category: 'sorting',
  visualizationType: 'array',
  difficulty: 'Intermediate',
  prerequisites: ['Binary Heaps', 'Trees', 'Arrays as Complete Trees'],
  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
  },
  spaceComplexity: 'O(1)',
  description:
    'Converts the array into a Binary Max-Heap, then repeatedly extracts the maximum root element, moves it to the end, and heapifies the reduced heap.',
  keyIdea:
    'Build a Max-Heap where the parent is always greater than children. Swap root to the end, shrink the heap size, and restore the heap property.',
  whenToUse: [
    'When guaranteed O(n log n) runtime is required without taking extra O(n) memory like Merge Sort.',
    'Systems with strict memory bounds (embedded systems, kernel priority schedulers).',
    'When avoiding Quicksort worst-case quadratic degradation is essential.',
  ],
  limitations: [
    'Poor cache locality compared to Quicksort (frequent jumps across large array strides 2*i + 1).',
    'Unstable sorting algorithm.',
  ],
  sourceCode: {
    c: `// Heap Sort in C
void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        int temp = arr[i]; arr[i] = arr[largest]; arr[largest] = temp;
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;
        heapify(arr, i, 0);
    }
}`,
    typescript: `// Heap Sort in TypeScript
function heapify(arr: number[], n: number, i: number) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

function heapSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}`,
  },
};

export function heapSort(inputArray: number[]): ArrayStep[] {
  const arr = [...inputArray];
  const n = arr.length;
  const steps: ArrayStep[] = [];

  const elementStates: Record<number, ElementState> = {};
  for (let k = 0; k < n; k++) elementStates[k] = 'default';

  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;

  steps.push({
    kind: 'array',
    array: [...arr],
    elementStates: { ...elementStates },
    isFound: false,
    codeLine: 15,
    description: `Starting Heap Sort on ${n} elements.`,
    stats: { comparisons, swaps, accesses },
  });

  if (n <= 1) {
    if (n === 1) elementStates[0] = 'sorted';
    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: { ...elementStates },
      isFound: false,
      codeLine: 20,
      description: 'Array is already sorted.',
      stats: { comparisons, swaps, accesses },
    });
    return steps;
  }

  function heapify(size: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    const heapifyStates = { ...elementStates };
    heapifyStates[i] = 'comparing';
    if (left < size) heapifyStates[left] = 'comparing';
    if (right < size) heapifyStates[right] = 'comparing';

    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: heapifyStates,
      pointers: { mid: i, left: left < size ? left : undefined, right: right < size ? right : undefined },
      isFound: false,
      codeLine: 3,
      description: `Heapifying subtree at node ${i} (${arr[i]}). Children: left=${left < size ? arr[left] : 'none'}, right=${right < size ? arr[right] : 'none'}.`,
      stats: { comparisons, swaps, accesses },
    });

    if (left < size) {
      comparisons += 1;
      accesses += 2;
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < size) {
      comparisons += 1;
      accesses += 2;
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      accesses += 2;
      swaps += 1;
      const temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;

      const swappedStates = { ...elementStates };
      swappedStates[i] = 'swapping';
      swappedStates[largest] = 'swapping';

      steps.push({
        kind: 'array',
        array: [...arr],
        elementStates: swappedStates,
        pointers: { mid: i, current: largest },
        isFound: false,
        codeLine: 9,
        description: `Violated max-heap property. Swapped parent arr[${i}] with child arr[${largest}] (${arr[i]}).`,
        stats: { comparisons, swaps, accesses },
      });

      heapify(size, largest);
    }
  }

  // Phase 1: Build Max-Heap
  steps.push({
    kind: 'array',
    array: [...arr],
    elementStates: { ...elementStates },
    isFound: false,
    codeLine: 16,
    description: 'Phase 1: Building initial Max-Heap from the bottom up.',
    stats: { comparisons, swaps, accesses },
  });

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  steps.push({
    kind: 'array',
    array: [...arr],
    elementStates: { ...elementStates },
    isFound: false,
    codeLine: 16,
    description: `Max-Heap constructed! Root element arr[0] (${arr[0]}) is the global maximum.`,
    stats: { comparisons, swaps, accesses },
  });

  // Phase 2: Extract elements
  for (let i = n - 1; i > 0; i--) {
    accesses += 2;
    swaps += 1;
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    elementStates[i] = 'sorted';

    const extractStates = { ...elementStates };
    extractStates[0] = 'swapping';

    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: extractStates,
      pointers: { mid: 0, right: i },
      isFound: false,
      codeLine: 18,
      description: `Extracted max element (${arr[i]}). Placed at final sorted index ${i}. Shrinking heap size to ${i}.`,
      stats: { comparisons, swaps, accesses },
    });

    heapify(i, 0);
  }

  elementStates[0] = 'sorted';

  steps.push({
    kind: 'array',
    array: [...arr],
    elementStates: { ...elementStates },
    isFound: false,
    codeLine: 20,
    description: `Heap Sort complete! Array sorted in ${comparisons} comparisons and ${swaps} swaps.`,
    stats: { comparisons, swaps, accesses },
  });

  return steps;
}
