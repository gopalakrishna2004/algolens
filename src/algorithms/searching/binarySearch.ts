import type { ArrayStep, ElementState, AlgorithmMetadata } from '../types';

export const binarySearchMetadata: AlgorithmMetadata = {
  id: 'binary-search',
  name: 'Binary Search',
  category: 'searching',
  visualizationType: 'array',
  difficulty: 'Beginner',
  prerequisites: ['Arrays', 'Sorted Arrays', 'Divide and Conquer'],
  timeComplexity: {
    best: 'O(1)',
    average: 'O(log n)',
    worst: 'O(log n)',
  },
  spaceComplexity: 'O(1)',
  description:
    'Efficiently searches a sorted array by repeatedly dividing the search space in half. Compares the target to the middle element to discard half of the remaining elements at each step.',
  keyIdea:
    'Leverage sorted order by checking the middle element and throwing away half of the remaining array every turn.',
  whenToUse: [
    'When the dataset is already sorted in ascending or descending order.',
    'When multiple lookup queries are performed on relatively static data.',
    'When searching large arrays where O(log n) speed is critical (e.g. 1M elements checked in ~20 steps).',
  ],
  limitations: [
    'Strictly requires a sorted dataset with constant-time random access.',
    'Sorting an unsorted array first takes O(n log n), which is slower than linear search for a single query.',
    'Not well-suited for dynamic collections with frequent insertions or deletions.',
  ],
  sourceCode: {
    c: `// Binary Search in C
int binarySearch(int arr[], int n, int target) {
    int left = 0;
    int right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid; // Target found
        }
        if (arr[mid] < target) {
            left = mid + 1; // Discard left half
        } else {
            right = mid - 1; // Discard right half
        }
    }
    return -1; // Target not found
}`,
    typescript: `// Binary Search in TypeScript
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (arr[mid] === target) {
      return mid; // Target found
    }
    if (arr[mid] < target) {
      left = mid + 1; // Discard left half
    } else {
      right = mid - 1; // Discard right half
    }
  }
  return -1; // Target not found
}`,
  },
};

/**
 * Checks if an array is sorted in ascending order.
 * Binary Search requires a sorted array to operate correctly.
 */
export function isSorted(array: number[]): boolean {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) {
      return false;
    }
  }
  return true;
}

/**
 * Pure Binary Search algorithm implementation.
 *
 * Runs the algorithm and records the complete sequence of atomic execution steps.
 * Has zero dependencies on React or DOM.
 *
 * @param array - Sorted array of numbers in ascending order
 * @param target - Target value to find
 * @returns ArrayStep[] - Ordered snapshots representing each moment of the search
 */
export function binarySearch(array: number[], target: number): ArrayStep[] {
  const steps: ArrayStep[] = [];
  const n = array.length;

  // Requirement: Binary Search must require sorted input
  if (!isSorted(array)) {
    return [
      {
        kind: 'array',
        array: [...array],
        elementStates: {},
        target,
        isFound: false,
        description:
          'Error: Binary Search requires a sorted array (in ascending order). Please sort the array before searching.',
        stats: { comparisons: 0, accesses: 0 },
      },
    ];
  }

  // Handle empty array edge case
  if (n === 0) {
    return [
      {
        kind: 'array',
        array: [],
        elementStates: {},
        target,
        isFound: false,
        description: `Array is empty. Cannot search for target ${target}.`,
        stats: { comparisons: 0, accesses: 0 },
      },
    ];
  }

  // Initialize visual states: all active in the search range
  const elementStates: Record<number, ElementState> = {};
  for (let i = 0; i < n; i++) {
    elementStates[i] = 'default';
  }

  let comparisons = 0;
  let accesses = 0;
  let left = 0;
  let right = n - 1;

  // Step 0: Initial search bounds
  steps.push({
    kind: 'array',
    array: [...array],
    elementStates: { ...elementStates },
    pointers: { left, right },
    target,
    isFound: false,
    codeLine: 4,
    description: `Starting Binary Search for target ${target}. Initial search range is [${left}..${right}].`,
    stats: { comparisons: 0, accesses: 0 },
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    accesses += 1;
    comparisons += 1;

    const currentStates: Record<number, ElementState> = { ...elementStates };
    currentStates[mid] = 'comparing';

    const midValue = array[mid];

    if (midValue === target) {
      // Step A: Mid element comparison matches target
      steps.push({
        kind: 'array',
        array: [...array],
        elementStates: { ...currentStates },
        currentIndex: mid,
        pointers: { left, mid, right },
        target,
        isFound: false,
        codeLine: 8,
        description: `Calculated middle index mid = Math.floor((${left} + ${right}) / 2) = ${mid}. array[${mid}] (${midValue}) matches target ${target}!`,
        stats: { comparisons, accesses },
      });

      // Step B: Mark target as found
      currentStates[mid] = 'found';
      steps.push({
        kind: 'array',
        array: [...array],
        elementStates: { ...currentStates },
        currentIndex: mid,
        pointers: { left, mid, right },
        target,
        isFound: true,
        foundIndex: mid,
        codeLine: 9,
        description: `Target ${target} found at index ${mid} after ${comparisons} comparison(s)!`,
        stats: { comparisons, accesses },
      });

      return steps;
    } else if (midValue < target) {
      // midValue < target: target is in the right half, discard left half [left..mid]
      steps.push({
        kind: 'array',
        array: [...array],
        elementStates: { ...currentStates },
        currentIndex: mid,
        pointers: { left, mid, right },
        target,
        isFound: false,
        codeLine: 11,
        description: `Examining mid = ${mid} (value: ${midValue}). Since ${midValue} < target (${target}), target must be in right half. Discarding indices [${left}..${mid}].`,
        stats: { comparisons, accesses },
      });

      // Mark left half through mid as discarded
      for (let i = left; i <= mid; i++) {
        elementStates[i] = 'discarded';
      }

      left = mid + 1;

      // If remaining range is still valid, record the updated active range
      if (left <= right) {
        steps.push({
          kind: 'array',
          array: [...array],
          elementStates: { ...elementStates },
          pointers: { left, right },
          target,
          isFound: false,
          codeLine: 12,
          description: `Updated search range to [${left}..${right}].`,
          stats: { comparisons, accesses },
        });
      }
    } else {
      // midValue > target: target is in the left half, discard right half [mid..right]
      steps.push({
        kind: 'array',
        array: [...array],
        elementStates: { ...currentStates },
        currentIndex: mid,
        pointers: { left, mid, right },
        target,
        isFound: false,
        codeLine: 13,
        description: `Examining mid = ${mid} (value: ${midValue}). Since ${midValue} > target (${target}), target must be in left half. Discarding indices [${mid}..${right}].`,
        stats: { comparisons, accesses },
      });

      // Mark right half from mid through right as discarded
      for (let i = mid; i <= right; i++) {
        elementStates[i] = 'discarded';
      }

      right = mid - 1;

      // If remaining range is still valid, record the updated active range
      if (left <= right) {
        steps.push({
          kind: 'array',
          array: [...array],
          elementStates: { ...elementStates },
          pointers: { left, right },
          target,
          isFound: false,
          codeLine: 14,
          description: `Updated search range to [${left}..${right}].`,
          stats: { comparisons, accesses },
        });
      }
    }
  }

  // Step: Search space exhausted without finding target
  const finalStates: Record<number, ElementState> = {};
  for (let i = 0; i < n; i++) {
    finalStates[i] = 'discarded';
  }

  steps.push({
    kind: 'array',
    array: [...array],
    elementStates: finalStates,
    pointers: { left, right },
    target,
    isFound: false,
    codeLine: 17,
    description: `Search space exhausted (left: ${left} > right: ${right}). Target ${target} is not in the array after ${comparisons} comparison(s).`,
    stats: { comparisons, accesses },
  });

  return steps;
}
