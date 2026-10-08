import type { ArrayStep, ElementState, AlgorithmMetadata } from '../types';

export const arrayOperationsMetadata: AlgorithmMetadata = {
  id: 'array-ds',
  name: 'Array Operations',
  category: 'data-structures',
  visualizationType: 'array',
  difficulty: 'Beginner',
  prerequisites: ['Memory Allocation', 'Contiguous Memory', 'Zero-Indexed Pointers'],
  timeComplexity: {
    best: 'O(1) [Access by Index]',
    average: 'O(n) [Insert/Delete at arbitrary index]',
    worst: 'O(n) [Insert at Head]',
  },
  spaceComplexity: 'O(1)',
  description:
    'A contiguous block of memory holding elements of the same type. Provides instant O(1) random access by index, but requires O(n) shifting to insert or delete elements in the middle.',
  keyIdea:
    'Contiguous memory means address(i) = base + i * size. Instant random access, but inserting or deleting requires physically moving subsequent elements.',
  whenToUse: [
    'When elements need fast random lookup by numerical index.',
    'Fixed or predictable dataset sizes where memory overhead must be minimal.',
    'Iterating over elements with optimal CPU cache prefetching.',
  ],
  limitations: [
    'Fixed size in native C (reallocation requires copying entire array).',
    'Inserting or deleting at the front requires shifting all n elements (O(n)).',
  ],
  sourceCode: {
    c: `// Array Operations in C
void insertAt(int arr[], int *n, int index, int value) {
    for (int i = *n; i > index; i--) {
        arr[i] = arr[i - 1]; // Shift right
    }
    arr[index] = value;
    (*n)++;
}

void deleteAt(int arr[], int *n, int index) {
    for (int i = index; i < *n - 1; i++) {
        arr[i] = arr[i + 1]; // Shift left
    }
    (*n)--;
}`,
    typescript: `// Array Operations in TypeScript
function insertAt(arr: number[], index: number, value: number): number[] {
  arr.splice(index, 0, value);
  return arr;
}

function deleteAt(arr: number[], index: number): number[] {
  arr.splice(index, 1);
  return arr;
}`,
  },
};

export interface ArrayOperationParams {
  array: number[];
  operation?: 'insert' | 'delete' | 'search';
  index?: number;
  value?: number;
}

export function arrayOperations(params: ArrayOperationParams): ArrayStep[] {
  const arr = [...params.array];
  const operation = params.operation || 'insert';
  const index = Math.min(Math.max(params.index ?? 2, 0), arr.length);
  const value = params.value ?? 99;

  const steps: ArrayStep[] = [];
  const n = arr.length;

  const elementStates: Record<number, ElementState> = {};
  for (let k = 0; k < n; k++) elementStates[k] = 'default';

  steps.push({
    kind: 'array',
    array: [...arr],
    elementStates: { ...elementStates },
    isFound: false,
    codeLine: 2,
    description: `Starting Array operation: ${operation.toUpperCase()} at index ${index} (value: ${value}).`,
    stats: { comparisons: 0, accesses: 0 },
  });

  if (operation === 'insert') {
    // Shift elements from n - 1 down to index
    for (let i = n; i > index; i--) {
      arr[i] = arr[i - 1];

      const shiftStates: Record<number, ElementState> = {};
      for (let k = 0; k < arr.length; k++) shiftStates[k] = 'default';
      shiftStates[i] = 'swapping';
      shiftStates[i - 1] = 'comparing';

      steps.push({
        kind: 'array',
        array: [...arr],
        elementStates: shiftStates,
        pointers: { current: i },
        isFound: false,
        codeLine: 4,
        description: `Shifting element arr[${i - 1}] (${arr[i - 1]}) right to index ${i} to create space.`,
        stats: { comparisons: 0, accesses: i, swaps: n - i + 1 },
      });
    }

    arr[index] = value;
    const finalStates: Record<number, ElementState> = {};
    for (let k = 0; k < arr.length; k++) finalStates[k] = 'default';
    finalStates[index] = 'found';

    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: finalStates,
      pointers: { current: index },
      isFound: true,
      codeLine: 6,
      description: `Inserted value ${value} at index ${index}. Total elements now: ${arr.length}.`,
      stats: { comparisons: 0, accesses: n, swaps: n - index },
    });
  } else if (operation === 'delete') {
    if (n === 0) return steps;
    const deletedVal = arr[index];

    const delStates: Record<number, ElementState> = {};
    for (let k = 0; k < arr.length; k++) delStates[k] = 'default';
    delStates[index] = 'discarded';

    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: delStates,
      pointers: { current: index },
      isFound: false,
      codeLine: 11,
      description: `Removing element arr[${index}] (${deletedVal}). Shifting trailing elements left.`,
      stats: { comparisons: 0, accesses: 1 },
    });

    for (let i = index; i < n - 1; i++) {
      arr[i] = arr[i + 1];

      const shiftStates: Record<number, ElementState> = {};
      for (let k = 0; k < arr.length; k++) shiftStates[k] = 'default';
      shiftStates[i] = 'swapping';

      steps.push({
        kind: 'array',
        array: [...arr],
        elementStates: shiftStates,
        pointers: { current: i },
        isFound: false,
        codeLine: 12,
        description: `Shifted arr[${i + 1}] (${arr[i]}) left to index ${i}.`,
        stats: { comparisons: 0, accesses: i + 1, swaps: i - index + 1 },
      });
    }

    arr.pop(); // Remove last shifted element

    const finalStates: Record<number, ElementState> = {};
    for (let k = 0; k < arr.length; k++) finalStates[k] = 'default';

    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: finalStates,
      isFound: true,
      codeLine: 14,
      description: `Deletion complete. Total elements reduced to ${arr.length}.`,
      stats: { comparisons: 0, accesses: n, swaps: n - 1 - index },
    });
  }

  return steps;
}
