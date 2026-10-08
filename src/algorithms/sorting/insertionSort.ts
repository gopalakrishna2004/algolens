import type { ArrayStep, ElementState, AlgorithmMetadata } from '../types';

export const insertionSortMetadata: AlgorithmMetadata = {
  id: 'insertion-sort',
  name: 'Insertion Sort',
  category: 'sorting',
  visualizationType: 'array',
  difficulty: 'Beginner',
  prerequisites: ['Arrays', 'Loops', 'Shift Operations'],
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
  },
  spaceComplexity: 'O(1)',
  description:
    'Builds the sorted array one element at a time by picking the next element and inserting it into its correct position among previously sorted elements, like sorting cards in hand.',
  keyIdea:
    'Iterate through the array, pick each element as a "key", and shift larger elements in the sorted prefix to the right to make space for the key.',
  whenToUse: [
    'For small datasets (typically < 30 items) where it often outperforms Quicksort due to low constant factors.',
    'Nearly sorted datasets (runs in nearly linear O(n) time).',
    'Online sorting where data is received incrementally item-by-item.',
  ],
  limitations: [
    'Quadratic time complexity O(n²) on average and worst cases (reversed array).',
    'High number of element shift writes for distant elements.',
  ],
  sourceCode: {
    c: `// Insertion Sort in C
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
    typescript: `// Insertion Sort in TypeScript
function insertionSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
  },
};

export function insertionSort(inputArray: number[]): ArrayStep[] {
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
    description: `Starting Insertion Sort on ${n} elements.`,
    stats: { comparisons, swaps, accesses },
  });

  if (n <= 1) {
    if (n === 1) elementStates[0] = 'sorted';
    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: { ...elementStates },
      isFound: false,
      codeLine: 12,
      description: 'Array is already sorted.',
      stats: { comparisons, swaps, accesses },
    });
    return steps;
  }

  elementStates[0] = 'sorted';

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    accesses += 1;
    let j = i - 1;

    const pickKeyStates = { ...elementStates };
    pickKeyStates[i] = 'comparing';

    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: pickKeyStates,
      pointers: { current: i },
      isFound: false,
      codeLine: 4,
      description: `Picking key = arr[${i}] (${key}) to insert into the sorted prefix [0..${i - 1}].`,
      stats: { comparisons, swaps, accesses },
    });

    while (j >= 0) {
      accesses += 1;
      comparisons += 1;

      const compareStates = { ...elementStates };
      compareStates[j] = 'comparing';
      compareStates[j + 1] = 'comparing';

      steps.push({
        kind: 'array',
        array: [...arr],
        elementStates: compareStates,
        pointers: { current: j, mid: i },
        isFound: false,
        codeLine: 6,
        description: `Comparing prefix element arr[${j}] (${arr[j]}) with key (${key}).`,
        stats: { comparisons, swaps, accesses },
      });

      if (arr[j] > key) {
        // Shift right
        accesses += 2;
        swaps += 1; // treat shift as data movement / swap metric
        arr[j + 1] = arr[j];

        const shiftStates = { ...elementStates };
        shiftStates[j + 1] = 'swapping';

        steps.push({
          kind: 'array',
          array: [...arr],
          elementStates: shiftStates,
          pointers: { current: j + 1 },
          isFound: false,
          codeLine: 7,
          description: `arr[${j}] (${arr[j]}) > key (${key}). Shifted ${arr[j]} right to index ${j + 1}.`,
          stats: { comparisons, swaps, accesses },
        });

        j = j - 1;
      } else {
        break;
      }
    }

    arr[j + 1] = key;
    accesses += 1;

    // Mark sorted prefix up to i
    for (let k = 0; k <= i; k++) {
      elementStates[k] = 'sorted';
    }

    const insertedStates = { ...elementStates };
    insertedStates[j + 1] = 'found';

    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: insertedStates,
      pointers: { current: j + 1 },
      isFound: false,
      codeLine: 10,
      description: `Inserted key (${key}) into index ${j + 1}. Prefix [0..${i}] is now sorted.`,
      stats: { comparisons, swaps, accesses },
    });
  }

  for (let k = 0; k < n; k++) elementStates[k] = 'sorted';

  steps.push({
    kind: 'array',
    array: [...arr],
    elementStates: { ...elementStates },
    isFound: false,
    codeLine: 12,
    description: `Insertion Sort complete! Array sorted in ${comparisons} comparisons and ${swaps} shifts.`,
    stats: { comparisons, swaps, accesses },
  });

  return steps;
}
