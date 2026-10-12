import type { ArrayStep, ElementState, AlgorithmMetadata } from '../types';

export function generateLinearSearchSource(array: number[] = [15, 42, 8, 23, 74, 31, 90, 56], target: number = 23) {
  const cArrayStr = array.join(', ');
  const tsArrayStr = array.join(', ');
  const count = array.length;

  return {
    c: `#include <stdio.h>

// AlgoLens — Linear Search: Absolute Beginner Edition
// Linear Search inspects each element one by one from left to right.

int main(void) {
    // The collection of numbers we will search through
    int numbers[] = {${cArrayStr}};
    int totalElements = ${count}; // How many items are in the array
    int target = ${target};       // The number we want to find

    // In C, array indexing starts at 0 (the first item is numbers[0]).
    // Start at index 0. Add 1 each round to inspect the next slot.
    for (int index = 0; index < totalElements; index++) {
        // Compare the current slot's number with our target
        if (numbers[index] == target) {
            // Index starts at 0, but human position counts from 1 (index + 1)
            printf("Found target %d at index %d (human position %d)!\\n", target, index, index + 1);
            return 0; // Found! Exit program early (0 indicates clean process exit).
        }
    }

    // If the loop finished without returning, target was not in the array
    printf("Target %d was not found after checking all %d elements.\\n", target, totalElements);
    return 0; // Search concluded without a match; 0 indicates clean process exit.
}

// -------------------------------------------------------------
// PROGRESSION NOTE: Once comfortable with the basic loop in main(),
// DSA libraries package this logic into a reusable helper function:
//
// int linearSearch(int arr[], int n, int target) {
//     for (int i = 0; i < n; i++) {
//         if (arr[i] == target) {
//             return i; // Return 0-based index where match occurred
//         }
//     }
//     return -1; // -1 conventionally indicates "not found"
// }`,
    typescript: `// Linear Search in TypeScript: Absolute Beginner Edition

// Linear Search inspects each element one by one from left to right.
// In TypeScript, we can run this beginner walkthrough in a function.

function main(): void {
    // The collection of numbers we will search through
    const numbers: number[] = [${tsArrayStr}];
    const totalElements: number = numbers.length; // Count of items in array
    const target: number = ${target};                    // The number we want to find

    // In TypeScript, arrays also start at index 0 (first is numbers[0]).
    // Start at index 0. Add 1 each round to inspect the next slot.
    for (let index = 0; index < totalElements; index++) {
        // Compare the current slot's number with our target
        if (numbers[index] === target) {
            // Index starts at 0, but human position counts from 1 (index + 1)
            console.log(\`Found target \${target} at index \${index} (human position \${index + 1})!\`);
            return; // Found! Exit early (search concluded with success).
        }
    }

    // If the loop finished without returning, target was not in array
    console.log(\`Target \${target} was not found after checking all \${totalElements} elements.\`);
    return; // Exit function indicating search concluded without a match.
}

// -------------------------------------------------------------
// PROGRESSION NOTE: Once comfortable with the basic loop in main(),
// DSA libraries package this logic into a reusable helper function:
//
// function linearSearch(arr: number[], target: number): number {
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] === target) {
//             return i; // Return 0-based index where match occurred
//         }
//     }
//     return -1; // -1 conventionally indicates "not found"
// }`,
  };
}

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
  sourceCode: generateLinearSearchSource([15, 42, 8, 23, 74, 31, 90, 56], 23),
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
    codeLine: 10,
    description:
      n === 0
        ? `Array is empty. Cannot search for target ${target}.`
        : `Starting Linear Search for target ${target} across ${n} elements. Initializing search variables.`,
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
        codeLine: 16,
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
        codeLine: 18,
        description: `Target ${target} found at index ${i} (human position ${i + 1}) after ${comparisons} comparison(s).`,
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
        codeLine: 16,
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
    codeLine: 24,
    description: `Search complete. Target ${target} was not found in the array after ${comparisons} comparison(s).`,
    stats: { comparisons, accesses },
  });

  return steps;
}
