import type { ArrayStep, ElementState, AlgorithmMetadata } from '../types';

export const bubbleSortMetadata: AlgorithmMetadata = {
  id: 'bubble-sort',
  name: 'Bubble Sort',
  category: 'sorting',
  visualizationType: 'array',
  difficulty: 'Beginner',
  prerequisites: ['Arrays', 'Loops', 'Conditionals'],
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
  },
  spaceComplexity: 'O(1)',
  description:
    'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Larger values "bubble" to the end.',
  keyIdea:
    'Compare adjacent pairs and swap them if out of order. Each full pass locks the next largest element into its final position at the end.',
  whenToUse: [
    'For educational and introductory learning of sorting mechanics.',
    'Nearly-sorted arrays where an early-exit optimization achieves O(n) performance.',
    'Small datasets where implementation simplicity is preferred over speed.',
  ],
  limitations: [
    'Severely inefficient for medium-to-large datasets (quadratic time complexity O(n²)).',
    'High number of element swaps and writes compared to Selection Sort or Insertion Sort.',
  ],
  sourceCode: {
    c: `// Bubble Sort in C
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break; // Array is sorted early
    }
}`,
    typescript: `// Bubble Sort in TypeScript
function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
  },
};

export function bubbleSort(inputArray: number[]): ArrayStep[] {
  const arr = [...inputArray];
  const n = arr.length;
  const steps: ArrayStep[] = [];

  const elementStates: Record<number, ElementState> = {};
  for (let k = 0; k < n; k++) elementStates[k] = 'default';

  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;

  // Initial step
  steps.push({
    kind: 'array',
    array: [...arr],
    elementStates: { ...elementStates },
    isFound: false,
    codeLine: 2,
    description: `Starting Bubble Sort on ${n} elements.`,
    stats: { comparisons, swaps, accesses },
  });

  if (n <= 1) {
    if (n === 1) elementStates[0] = 'sorted';
    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: { ...elementStates },
      isFound: false,
      codeLine: 13,
      description: 'Array is already sorted.',
      stats: { comparisons, swaps, accesses },
    });
    return steps;
  }

  for (let i = 0; i < n - 1; i++) {
    let hasSwapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      accesses += 2;
      comparisons += 1;

      // Comparing step
      const compareStates: Record<number, ElementState> = { ...elementStates };
      compareStates[j] = 'comparing';
      compareStates[j + 1] = 'comparing';

      steps.push({
        kind: 'array',
        array: [...arr],
        elementStates: compareStates,
        pointers: { current: j },
        isFound: false,
        codeLine: 6,
        description: `Comparing arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}).`,
        stats: { comparisons, swaps, accesses },
      });

      if (arr[j] > arr[j + 1]) {
        // Swap
        accesses += 2;
        swaps += 1;
        hasSwapped = true;

        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        const swapStates: Record<number, ElementState> = { ...elementStates };
        swapStates[j] = 'swapping';
        swapStates[j + 1] = 'swapping';

        steps.push({
          kind: 'array',
          array: [...arr],
          elementStates: swapStates,
          pointers: { current: j },
          isFound: false,
          codeLine: 7,
          description: `arr[${j}] > arr[${j + 1}]. Swapped ${arr[j + 1]} and ${arr[j]}.`,
          stats: { comparisons, swaps, accesses },
        });
      }
    }

    // Element at n - i - 1 is now in its final sorted position
    elementStates[n - i - 1] = 'sorted';

    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: { ...elementStates },
      isFound: false,
      codeLine: 12,
      description: `Pass ${i + 1} complete. Element at index ${n - i - 1} (${arr[n - i - 1]}) is locked in place.`,
      stats: { comparisons, swaps, accesses },
    });

    if (!hasSwapped) {
      // Early exit optimization
      for (let k = 0; k < n; k++) elementStates[k] = 'sorted';
      steps.push({
        kind: 'array',
        array: [...arr],
        elementStates: { ...elementStates },
        isFound: false,
        codeLine: 13,
        description: 'No swaps occurred during this pass. Array is fully sorted early!',
        stats: { comparisons, swaps, accesses },
      });
      return steps;
    }
  }

  // Final first element is also sorted
  elementStates[0] = 'sorted';
  steps.push({
    kind: 'array',
    array: [...arr],
    elementStates: { ...elementStates },
    isFound: false,
    codeLine: 14,
    description: `Bubble Sort complete! Array is sorted in ${comparisons} comparisons and ${swaps} swaps.`,
    stats: { comparisons, swaps, accesses },
  });

  return steps;
}
