import type { ArrayStep, ElementState, AlgorithmMetadata } from '../types';

export const quickSortMetadata: AlgorithmMetadata = {
  id: 'quick-sort',
  name: 'Quick Sort',
  category: 'sorting',
  visualizationType: 'array',
  difficulty: 'Intermediate',
  prerequisites: ['Recursion', 'Divide and Conquer', 'Partitioning'],
  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n²)',
  },
  spaceComplexity: 'O(log n)',
  description:
    'Selects a "pivot" element and partitions the array such that all elements smaller than the pivot precede it, and all larger elements follow it. Recursively sorts sub-partitions in-place.',
  keyIdea:
    'Pick a pivot, partition elements into smaller and larger groups around the pivot, and repeat recursively on the sub-arrays.',
  whenToUse: [
    'General-purpose in-memory sorting where average-case speed and cache locality are critical.',
    'Systems where extra memory is constrained (requires only O(log n) call stack space).',
    'Standard library defaults (e.g., C qsort, C++ std::sort (IntroSort)).',
  ],
  limitations: [
    'Degrades to O(n²) worst-case time on already-sorted or identical arrays if naive pivot selection is used.',
    'Not stable (equal elements may be reordered during partitioning swaps).',
  ],
  sourceCode: {
    c: `// Quick Sort in C (Lomuto Partition)
int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
        }
    }
    int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
    typescript: `// Quick Sort in TypeScript
function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

function quickSort(arr: number[], low = 0, high = arr.length - 1): number[] {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}`,
  },
};

export function quickSort(inputArray: number[]): ArrayStep[] {
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
    codeLine: 16,
    description: `Starting Quick Sort on ${n} elements.`,
    stats: { comparisons, swaps, accesses },
  });

  if (n <= 1) {
    if (n === 1) elementStates[0] = 'sorted';
    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: { ...elementStates },
      isFound: false,
      codeLine: 21,
      description: 'Array is already sorted.',
      stats: { comparisons, swaps, accesses },
    });
    return steps;
  }

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    accesses += 1;
    let i = low - 1;

    // Highlight pivot
    const pivotStates = { ...elementStates };
    pivotStates[high] = 'comparing';

    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: pivotStates,
      pointers: { left: low, right: high, mid: high },
      isFound: false,
      codeLine: 3,
      description: `Selected pivot = arr[${high}] (${pivot}) for partition [${low}..${high}].`,
      stats: { comparisons, swaps, accesses },
    });

    for (let j = low; j < high; j++) {
      accesses += 1;
      comparisons += 1;

      const compareStates = { ...elementStates };
      compareStates[high] = 'comparing';
      compareStates[j] = 'comparing';

      steps.push({
        kind: 'array',
        array: [...arr],
        elementStates: compareStates,
        pointers: { left: low, current: j, right: high },
        isFound: false,
        codeLine: 6,
        description: `Comparing arr[${j}] (${arr[j]}) with pivot (${pivot}).`,
        stats: { comparisons, swaps, accesses },
      });

      if (arr[j] < pivot) {
        i++;
        accesses += 2;
        swaps += 1;

        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        const swapStates = { ...elementStates };
        swapStates[i] = 'swapping';
        swapStates[j] = 'swapping';
        swapStates[high] = 'comparing';

        steps.push({
          kind: 'array',
          array: [...arr],
          elementStates: swapStates,
          pointers: { left: low, current: i, right: high },
          isFound: false,
          codeLine: 8,
          description: `arr[${j}] < pivot. Swapped arr[${i}] (${arr[i]}) into smaller-elements partition.`,
          stats: { comparisons, swaps, accesses },
        });
      }
    }

    // Place pivot in correct place
    accesses += 2;
    swaps += 1;
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    const pivotPlacedIndex = i + 1;
    elementStates[pivotPlacedIndex] = 'sorted';

    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: { ...elementStates },
      pointers: { mid: pivotPlacedIndex },
      isFound: false,
      codeLine: 11,
      description: `Placed pivot (${arr[pivotPlacedIndex]}) into its final sorted position at index ${pivotPlacedIndex}.`,
      stats: { comparisons, swaps, accesses },
    });

    return pivotPlacedIndex;
  }

  function sort(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    } else if (low === high) {
      elementStates[low] = 'sorted';
    }
  }

  sort(0, n - 1);

  for (let k = 0; k < n; k++) elementStates[k] = 'sorted';

  steps.push({
    kind: 'array',
    array: [...arr],
    elementStates: { ...elementStates },
    isFound: false,
    codeLine: 21,
    description: `Quick Sort complete! Array sorted in ${comparisons} comparisons and ${swaps} swaps.`,
    stats: { comparisons, swaps, accesses },
  });

  return steps;
}
