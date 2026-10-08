import type { ArrayStep, ElementState, AlgorithmMetadata } from '../types';

export const twoPointersMetadata: AlgorithmMetadata = {
  id: 'two-pointers',
  name: 'Two Pointers Technique',
  category: 'techniques',
  visualizationType: 'array',
  difficulty: 'Beginner',
  prerequisites: ['Arrays', 'Sorted Sequences', 'Inward / Outward Pointers'],
  timeComplexity: {
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)',
  },
  spaceComplexity: 'O(1)',
  description:
    'An optimization technique where two index pointers traverse a sequence synchronously or inward towards each other, solving search and pair problems in linear O(n) time instead of quadratic O(n^2).',
  keyIdea:
    'Move pointers monotonically based on sorted properties. If arr[left] + arr[right] is too small, increase left; if too large, decrease right.',
  whenToUse: [
    'Two Sum on a pre-sorted array.',
    'Checking palindromes (comparing characters from both ends inwards).',
    'Reversing an array in-place or removing duplicates.',
    'Trapping Rain Water and Container With Most Water problems.',
  ],
  limitations: [
    'Most variants require sorted data or specific monotonic ordering.',
    'Cannot be applied directly to arbitrary unsorted collections without prior sorting overhead.',
  ],
  sourceCode: {
    c: `// Two Sum Sorted via Two Pointers in C
int twoSumSorted(int arr[], int n, int target, int *idx1, int *idx2) {
    int left = 0, right = n - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            *idx1 = left; *idx2 = right;
            return 1; // Found
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return 0; // Not found
}`,
    typescript: `// Two Pointers in TypeScript
function twoSumSorted(arr: number[], target: number): [number, number] | null {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return null;
}`,
  },
};

export function simulateTwoPointers(input?: { array?: number[]; target?: number }): ArrayStep[] {
  const arr = input?.array ? [...input.array].sort((a, b) => a - b) : [2, 7, 11, 15, 19, 28, 33];
  const target = input?.target ?? 30;
  const steps: ArrayStep[] = [];

  let left = 0;
  let right = arr.length - 1;
  let comparisons = 0;

  const defaultStates: Record<number, ElementState> = {};
  for (let i = 0; i < arr.length; i++) defaultStates[i] = 'default';

  steps.push({
    kind: 'array',
    array: [...arr],
    elementStates: { ...defaultStates },
    pointers: { left, right },
    target,
    isFound: false,
    action: 'init',
    description: `Initialized Two Pointers on sorted array. Target sum = ${target}. Left = 0, Right = ${right}.`,
    stats: { comparisons: 0, accesses: 2 },
    codeLine: 3,
  });

  while (left < right) {
    comparisons++;
    const sum = arr[left] + arr[right];

    const currentStates: Record<number, ElementState> = { ...defaultStates };
    currentStates[left] = 'comparing';
    currentStates[right] = 'comparing';

    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: currentStates,
      pointers: { left, right },
      target,
      isFound: false,
      action: 'compare',
      description: `Testing pair arr[${left}] (${arr[left]}) + arr[${right}] (${arr[right]}) = ${sum}. Target is ${target}.`,
      stats: { comparisons, accesses: comparisons * 2, currentSum: sum },
      codeLine: 5,
    });

    if (sum === target) {
      const matchStates: Record<number, ElementState> = { ...defaultStates };
      matchStates[left] = 'found';
      matchStates[right] = 'found';

      steps.push({
        kind: 'array',
        array: [...arr],
        elementStates: matchStates,
        pointers: { left, right },
        target,
        isFound: true,
        foundIndex: left,
        action: 'found',
        description: `MATCH FOUND! arr[${left}] (${arr[left]}) + arr[${right}] (${arr[right]}) = ${target}!`,
        stats: { comparisons, accesses: comparisons * 2, pair: `${arr[left]}+${arr[right]}` },
        codeLine: 7,
      });
      return steps;
    }

    if (sum < target) {
      const shiftStates: Record<number, ElementState> = { ...defaultStates };
      shiftStates[left] = 'discarded';

      steps.push({
        kind: 'array',
        array: [...arr],
        elementStates: shiftStates,
        pointers: { left, right },
        target,
        isFound: false,
        action: 'shift-left',
        description: `Sum ${sum} < ${target}. To increase sum, increment LEFT pointer (${left} ➔ ${left + 1}).`,
        stats: { comparisons, accesses: comparisons * 2 },
        codeLine: 9,
      });
      left++;
    } else {
      const shiftStates: Record<number, ElementState> = { ...defaultStates };
      shiftStates[right] = 'discarded';

      steps.push({
        kind: 'array',
        array: [...arr],
        elementStates: shiftStates,
        pointers: { left, right },
        target,
        isFound: false,
        action: 'shift-right',
        description: `Sum ${sum} > ${target}. To decrease sum, decrement RIGHT pointer (${right} ➔ ${right - 1}).`,
        stats: { comparisons, accesses: comparisons * 2 },
        codeLine: 11,
      });
      right--;
    }
  }

  steps.push({
    kind: 'array',
    array: [...arr],
    elementStates: { ...defaultStates },
    pointers: { left, right },
    target,
    isFound: false,
    action: 'not-found',
    description: `Pointers crossed. No pair exists in array that sums to ${target}.`,
    stats: { comparisons, accesses: comparisons * 2 },
    codeLine: 14,
  });

  return steps;
}
