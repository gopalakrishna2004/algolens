import type { ArrayStep, ElementState, AlgorithmMetadata } from '../types';

export const linearSearchMetadata: AlgorithmMetadata = {
  id: 'linear-search',
  name: 'Linear Search',
  category: 'searching',
  visualizationType: 'array',
  difficulty: 'Beginner',
  prerequisites: ['Arrays', 'Loops'],
  timeComplexity: {
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)',
  },
  spaceComplexity: 'O(1)',
  description:
    'Sequentially checks each element in the array from start to end until the target is found or all elements have been examined.',
  keyIdea:
    'Check elements one by one from left to right until you find a match or run out of elements.',
  whenToUse: [
    'When the collection is unsorted or in random order.',
    'For small arrays where sorting overhead is not justified.',
    'When searching linked lists or sequential data streams without random access.',
  ],
  limitations: [
    'Inefficient for large datasets (scales linearly: O(n)).',
    'Cannot take advantage of sorted ordering.',
  ],
  sourceCode: {
    c: `// Linear Search in C
int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i; // Target found at index i
        }
    }
    return -1; // Target not found
}`,
    typescript: `// Linear Search in TypeScript
function linearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Target found at index i
    }
  }
  return -1; // Target not found
}`,
  },
};

/**
 * Pure Linear Search algorithm implementation.
 *
 * Runs the algorithm and records the complete sequence of atomic execution steps.
 * This function has zero dependencies on React or the DOM.
 *
 * @param array - The array of numbers to search through
 * @param target - The number to search for
 * @returns ArrayStep[] - An ordered list of steps representing each moment in the search
 */
export function linearSearch(array: number[], target: number): ArrayStep[] {
  const steps: ArrayStep[] = [];
  const n = array.length;

  // Track the persistent visual state of each index
  const elementStates: Record<number, ElementState> = {};
  for (let i = 0; i < n; i++) {
    elementStates[i] = 'default';
  }

  let comparisons = 0;
  let accesses = 0;

  // Step 0: Initial state before search begins
  steps.push({
    kind: 'array',
    array: [...array],
    elementStates: { ...elementStates },
    target,
    isFound: false,
    description:
      n === 0
        ? `Array is empty. Cannot search for target ${target}.`
        : `Starting Linear Search for target ${target} across ${n} elements.`,
    stats: { comparisons: 0, accesses: 0 },
  });

  if (n === 0) {
    return steps;
  }

  // Iterate sequentially through each element
  for (let i = 0; i < n; i++) {
    accesses += 1;
    comparisons += 1;

    // Mark current element as actively being compared
    const currentStates: Record<number, ElementState> = { ...elementStates };
    currentStates[i] = 'comparing';

    const currentValue = array[i];
    const isMatch = currentValue === target;

    if (isMatch) {
      // Step A: Active comparison step
      steps.push({
        kind: 'array',
        array: [...array],
        elementStates: { ...currentStates },
        currentIndex: i,
        target,
        isFound: false,
        codeLine: 4,
        description: `Examining index ${i} (value: ${currentValue}). Matches target ${target}!`,
        stats: { comparisons, accesses },
      });

      // Step B: Mark as found
      currentStates[i] = 'found';
      elementStates[i] = 'found';

      steps.push({
        kind: 'array',
        array: [...array],
        elementStates: { ...currentStates },
        currentIndex: i,
        target,
        isFound: true,
        foundIndex: i,
        codeLine: 5,
        description: `Target ${target} found at index ${i} after ${comparisons} comparison(s).`,
        stats: { comparisons, accesses },
      });

      return steps;
    } else {
      // Step: Element inspected but does not match
      steps.push({
        kind: 'array',
        array: [...array],
        elementStates: { ...currentStates },
        currentIndex: i,
        target,
        isFound: false,
        codeLine: 4,
        description: `Examining index ${i} (value: ${currentValue}). Does not match target ${target}.`,
        stats: { comparisons, accesses },
      });

      // Mark this index as discarded for future steps
      elementStates[i] = 'discarded';
    }
  }

  // Final Step: Target was not found in the entire array
  const finalStates: Record<number, ElementState> = {};
  for (let i = 0; i < n; i++) {
    finalStates[i] = 'discarded';
  }

  steps.push({
    kind: 'array',
    array: [...array],
    elementStates: finalStates,
    target,
    isFound: false,
    codeLine: 8,
    description: `Search complete. Target ${target} was not found in the array after ${comparisons} comparison(s).`,
    stats: { comparisons, accesses },
  });

  return steps;
}
