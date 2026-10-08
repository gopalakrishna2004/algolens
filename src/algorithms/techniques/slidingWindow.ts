import type { ArrayStep, ElementState, AlgorithmMetadata } from '../types';

export const slidingWindowMetadata: AlgorithmMetadata = {
  id: 'sliding-window',
  name: 'Sliding Window Technique',
  category: 'techniques',
  visualizationType: 'array',
  difficulty: 'Beginner',
  prerequisites: ['Arrays', 'Subarrays', 'Window Invariants'],
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },
  spaceComplexity: 'O(1)',
  description:
    'Transforms nested loops (O(n * k)) over contiguous subarrays into a linear O(n) scan by reusing computations from the overlapping window: add the new incoming item and subtract the outgoing item.',
  keyIdea:
    'Incremental window update: new_sum = old_sum - outgoing_element + incoming_element. Avoids recomputing entire subarrays from scratch.',
  whenToUse: [
    'Maximum or minimum sum subarray of fixed size k.',
    'Longest substring without repeating characters (variable window).',
    'Subarray product or averages over continuous streaming data.',
  ],
  limitations: [
    'Requires contiguous subarray or substring constraints.',
    'Variable-size windows require monotonic shrink/expand conditions.',
  ],
  sourceCode: {
    c: `// Max Sum Subarray of Size k in C
int maxSubarraySum(int arr[], int n, int k) {
    if (n < k) return -1;
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];

    int maxSum = windowSum;
    for (int i = k; i < n; i++) {
        windowSum += arr[i] - arr[i - k]; // Slide
        if (windowSum > maxSum) maxSum = windowSum;
    }
    return maxSum;
}`,
    typescript: `// Sliding Window in TypeScript
function maxSubarraySum(arr: number[], k: number): number {
  let windowSum = arr.slice(0, k).reduce((a, b) => a + b, 0);
  let maxSum = windowSum;
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}`,
  },
};

export function simulateSlidingWindow(input?: { array?: number[]; k?: number }): ArrayStep[] {
  const arr = input?.array && input.array.length >= 3 ? [...input.array] : [2, 1, 5, 1, 3, 2, 7, 4];
  const k = input?.k ?? 3;
  const n = arr.length;
  const steps: ArrayStep[] = [];

  const defaultStates: Record<number, ElementState> = {};
  for (let i = 0; i < n; i++) defaultStates[i] = 'default';

  // Step 1: Compute initial window sum
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i];
  let maxSum = windowSum;

  const initStates: Record<number, ElementState> = { ...defaultStates };
  for (let i = 0; i < k; i++) initStates[i] = 'comparing';

  steps.push({
    kind: 'array',
    array: [...arr],
    elementStates: initStates,
    pointers: { left: 0, right: k - 1 },
    isFound: false,
    action: 'init-window',
    description: `Computed initial window [0..${k - 1}] sum: ${arr.slice(0, k).join(' + ')} = ${windowSum}. Initial maxSum = ${maxSum}.`,
    stats: { windowSum, maxSum, k },
    codeLine: 5,
  });

  // Step 2: Slide window from k to n - 1
  for (let i = k; i < n; i++) {
    const outgoingIdx = i - k;
    const incomingIdx = i;
    const outgoingVal = arr[outgoingIdx];
    const incomingVal = arr[incomingIdx];

    const slideStates: Record<number, ElementState> = { ...defaultStates };
    slideStates[outgoingIdx] = 'discarded';
    slideStates[incomingIdx] = 'comparing';
    for (let j = outgoingIdx + 1; j < incomingIdx; j++) slideStates[j] = 'sorted';

    windowSum = windowSum - outgoingVal + incomingVal;
    const isNewMax = windowSum > maxSum;
    if (isNewMax) maxSum = windowSum;

    steps.push({
      kind: 'array',
      array: [...arr],
      elementStates: slideStates,
      pointers: { left: outgoingIdx + 1, right: incomingIdx },
      isFound: isNewMax,
      action: 'slide',
      description: `SLIDE WINDOW: Dropped arr[${outgoingIdx}] (${outgoingVal}), added arr[${incomingIdx}] (${incomingVal}). New sum = ${windowSum}. ${isNewMax ? `NEW RECORD MAX: ${maxSum}!` : `maxSum remains ${maxSum}.`}`,
      stats: { windowSum, maxSum, added: incomingVal, dropped: outgoingVal },
      codeLine: 8,
    });
  }

  const finalStates: Record<number, ElementState> = { ...defaultStates };
  steps.push({
    kind: 'array',
    array: [...arr],
    elementStates: finalStates,
    isFound: true,
    action: 'complete',
    description: `Sliding Window complete! Maximum subarray sum of window size ${k} is ${maxSum}.`,
    stats: { finalMaxSum: maxSum, totalElements: n },
    codeLine: 11,
  });

  return steps;
}
