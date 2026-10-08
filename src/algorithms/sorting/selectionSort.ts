import type { ArrayStep, ElementState, AlgorithmMetadata } from '../types';

export const selectionSortMetadata: AlgorithmMetadata = {
  id: 'selection-sort',
  name: 'Selection Sort',
  category: 'sorting',
  visualizationType: 'array',
  difficulty: 'Beginner',
  prerequisites: ['Arrays', 'Loops', 'Min/Max Search'],
  timeComplexity: {
    best: 'O(n²)',
    average: 'O(n²)',
    worst: 'O(n²)',
  },
  spaceComplexity: 'O(1)',
  description:
    'Finds the smallest element in the unsorted portion of the array and swaps it with the first unsorted element, growing the sorted prefix one by one.',
  keyIdea:
    'Repeatedly scan the remaining unsorted part of the array to find the minimum element, then place it at the beginning of that unsorted section.',
  whenToUse: [
    'When memory write operations are extremely costly (Selection Sort performs at most O(n) swaps).',
    'Simple embedded systems with small fixed-size arrays.',
    'Educational purposes to demonstrate finding minimums incrementally.',
  ],
  limitations: [
    'Always executes O(n²) comparisons even if the array is already sorted.',
    'Unstable sort in its standard implementation (may change relative order of equal elements).',
  ],
  sourceCode: {
    c: `// Selection Sort in C
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}`,
    typescript: `// Selection Sort in TypeScript
function selectionSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
  },
};

export function selectionSort(inputArray: number[]): ArrayStep[] {
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
    codeLine: 2,
    description: `Starting Selection Sort on ${n} elements.`,
    stats: { comparisons, swaps, accesses },
  });

  if (n <= 1) {
    if (n === 1) elementStates[0] = 'sorted';
    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: { ...elementStates },
      isFound: false,
      codeLine: 16,
      description: 'Array is already sorted.',
      stats: { comparisons, swaps, accesses },
    });
    return steps;
  }

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Highlight starting assumption of minIdx
    const initialPassStates = { ...elementStates };
    initialPassStates[i] = 'comparing';

    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: initialPassStates,
      pointers: { left: i, mid: minIdx },
      isFound: false,
      codeLine: 4,
      description: `Pass ${i + 1}: Assuming minimum for index ${i} is arr[${minIdx}] (${arr[minIdx]}).`,
      stats: { comparisons, swaps, accesses },
    });

    for (let j = i + 1; j < n; j++) {
      accesses += 2;
      comparisons += 1;

      const scanStates = { ...elementStates };
      scanStates[minIdx] = 'comparing';
      scanStates[j] = 'comparing';

      steps.push({
        kind: 'array',
        array: [...arr],
        elementStates: scanStates,
        pointers: { left: i, mid: minIdx, current: j },
        isFound: false,
        codeLine: 6,
        description: `Comparing candidate arr[${j}] (${arr[j]}) with current min arr[${minIdx}] (${arr[minIdx]}).`,
        stats: { comparisons, swaps, accesses },
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;

        const newMinStates = { ...elementStates };
        newMinStates[minIdx] = 'comparing';

        steps.push({
          kind: 'array',
          array: [...arr],
          elementStates: newMinStates,
          pointers: { left: i, mid: minIdx },
          isFound: false,
          codeLine: 7,
          description: `Found smaller element! New minimum for this pass is arr[${minIdx}] (${arr[minIdx]}).`,
          stats: { comparisons, swaps, accesses },
        });
      }
    }

    if (minIdx !== i) {
      accesses += 2;
      swaps += 1;

      const swapStates = { ...elementStates };
      swapStates[i] = 'swapping';
      swapStates[minIdx] = 'swapping';

      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;

      steps.push({
        kind: 'array',
        array: [...arr],
        elementStates: swapStates,
        pointers: { left: i, mid: minIdx },
        isFound: false,
        codeLine: 11,
        description: `Swapped minimum element ${arr[i]} into its correct sorted position at index ${i}.`,
        stats: { comparisons, swaps, accesses },
      });
    }

    elementStates[i] = 'sorted';

    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: { ...elementStates },
      pointers: { left: i },
      isFound: false,
      codeLine: 14,
      description: `Index ${i} (${arr[i]}) is now confirmed in its sorted position.`,
      stats: { comparisons, swaps, accesses },
    });
  }

  elementStates[n - 1] = 'sorted';

  steps.push({
    kind: 'array',
    array: [...arr],
    elementStates: { ...elementStates },
    isFound: false,
    codeLine: 16,
    description: `Selection Sort complete! Array sorted in ${comparisons} comparisons and ${swaps} swaps.`,
    stats: { comparisons, swaps, accesses },
  });

  return steps;
}
