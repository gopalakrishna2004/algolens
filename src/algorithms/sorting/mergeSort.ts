import type { ArrayStep, ElementState, AlgorithmMetadata } from '../types';

export const mergeSortMetadata: AlgorithmMetadata = {
  id: 'merge-sort',
  name: 'Merge Sort',
  category: 'sorting',
  visualizationType: 'array',
  difficulty: 'Intermediate',
  prerequisites: ['Recursion', 'Divide and Conquer', 'Two Pointers'],
  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
  },
  spaceComplexity: 'O(n)',
  description:
    'A classic Divide and Conquer algorithm that recursively splits the array into two halves, sorts them, and then merges the two sorted halves into a single sorted array.',
  keyIdea:
    'Recursively halve the array until subarrays have 1 element, then merge sorted subarrays back together in linear time.',
  whenToUse: [
    'When guaranteed O(n log n) worst-case time is strictly required.',
    'Sorting linked lists (merging does not require extra auxiliary array for nodes).',
    'When stable sorting is required for objects with multiple keys.',
  ],
  limitations: [
    'Requires O(n) additional auxiliary memory to hold merged elements.',
    'Slightly slower than Quicksort in practice for cache-locality reasons on arrays.',
  ],
  sourceCode: {
    c: `// Merge Sort in C
void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
    typescript: `// Merge Sort in TypeScript
function merge(arr: number[], l: number, m: number, r: number) {
  const left = arr.slice(l, m + 1);
  const right = arr.slice(m + 1, r + 1);
  let i = 0, j = 0, k = l;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) arr[k++] = left[i++];
    else arr[k++] = right[j++];
  }
  while (i < left.length) arr[k++] = left[i++];
  while (j < right.length) arr[k++] = right[j++];
}

function mergeSort(arr: number[], l = 0, r = arr.length - 1): number[] {
  if (l < r) {
    const m = Math.floor(l + (r - l) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
  return arr;
}`,
  },
};

export function mergeSort(inputArray: number[]): ArrayStep[] {
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
    codeLine: 18,
    description: `Starting Merge Sort on ${n} elements.`,
    stats: { comparisons, swaps, accesses },
  });

  if (n <= 1) {
    if (n === 1) elementStates[0] = 'sorted';
    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: { ...elementStates },
      isFound: false,
      codeLine: 19,
      description: 'Array is already sorted.',
      stats: { comparisons, swaps, accesses },
    });
    return steps;
  }

  function merge(l: number, m: number, r: number) {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L: number[] = [];
    const R: number[] = [];

    for (let i = 0; i < n1; i++) {
      accesses += 1;
      L.push(arr[l + i]);
    }
    for (let j = 0; j < n2; j++) {
      accesses += 1;
      R.push(arr[m + 1 + j]);
    }

    // Highlighting the two subarrays being merged
    const mergePrepareStates = { ...elementStates };
    for (let idx = l; idx <= m; idx++) mergePrepareStates[idx] = 'comparing';
    for (let idx = m + 1; idx <= r; idx++) mergePrepareStates[idx] = 'swapping';

    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: mergePrepareStates,
      pointers: { left: l, mid: m, right: r },
      isFound: false,
      codeLine: 2,
      description: `Merging sorted subarrays [${l}..${m}] and [${m + 1}..${r}].`,
      stats: { comparisons, swaps, accesses },
    });

    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
      comparisons += 1;
      accesses += 2;

      const compareStates = { ...elementStates };
      compareStates[k] = 'comparing';

      steps.push({
        kind: 'array',
        array: [...arr],
        elementStates: compareStates,
        pointers: { left: l, current: k, right: r },
        isFound: false,
        codeLine: 9,
        description: `Comparing left subelement (${L[i]}) with right subelement (${R[j]}).`,
        stats: { comparisons, swaps, accesses },
      });

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        accesses += 1;
        swaps += 1;
        i++;
      } else {
        arr[k] = R[j];
        accesses += 1;
        swaps += 1;
        j++;
      }

      const writeStates = { ...elementStates };
      writeStates[k] = 'found';

      steps.push({
        kind: 'array',
        array: [...arr],
        elementStates: writeStates,
        pointers: { current: k },
        isFound: false,
        codeLine: 10,
        description: `Placed smaller value (${arr[k]}) into merged index ${k}.`,
        stats: { comparisons, swaps, accesses },
      });

      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      accesses += 2;
      swaps += 1;
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      accesses += 2;
      swaps += 1;
      j++;
      k++;
    }

    for (let idx = l; idx <= r; idx++) {
      elementStates[idx] = 'sorted';
    }

    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: { ...elementStates },
      pointers: { left: l, right: r },
      isFound: false,
      codeLine: 14,
      description: `Merged range [${l}..${r}] is now completely sorted.`,
      stats: { comparisons, swaps, accesses },
    });
  }

  function sort(l: number, r: number) {
    if (l < r) {
      const m = Math.floor(l + (r - l) / 2);

      const splitStates = { ...elementStates };
      splitStates[m] = 'comparing';

      steps.push({
        kind: 'array',
        array: [...arr],
        elementStates: splitStates,
        pointers: { left: l, mid: m, right: r },
        isFound: false,
        codeLine: 20,
        description: `Dividing range [${l}..${r}] at midpoint ${m}.`,
        stats: { comparisons, swaps, accesses },
      });

      sort(l, m);
      sort(m + 1, r);
      merge(l, m, r);
    }
  }

  sort(0, n - 1);

  for (let k = 0; k < n; k++) elementStates[k] = 'sorted';

  steps.push({
    kind: 'array',
    array: [...arr],
    elementStates: { ...elementStates },
    isFound: false,
    codeLine: 23,
    description: `Merge Sort complete! Array sorted in ${comparisons} comparisons and ${swaps} write operations.`,
    stats: { comparisons, swaps, accesses },
  });

  return steps;
}
