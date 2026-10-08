import type { MatrixStep, AlgorithmMetadata } from '../types';

export const divideAndConquerMetadata: AlgorithmMetadata = {
  id: 'divide-and-conquer',
  name: 'Divide & Conquer (Binary Exponentiation)',
  category: 'techniques',
  visualizationType: 'matrix',
  difficulty: 'Intermediate',
  prerequisites: ['Recursion', 'Logarithmic Division', 'Merge / Combine Step'],
  timeComplexity: {
    best: 'O(log n)',
    average: 'O(log n)',
    worst: 'O(log n)',
  },
  spaceComplexity: 'O(log n) [Call Stack Depth]',
  description:
    'Solves a complex problem by breaking it down into smaller, independent subproblems of the same type, solving each recursively, and combining the results. Illustrated via Fast Power (x^n in O(log n) multiplications).',
  keyIdea:
    'Divide into halves: if n is even, x^n = (x^(n/2))^2; if odd, x^n = x * x^(n-1). Reduces an O(n) linear operation down to lightning-fast O(log n).',
  whenToUse: [
    'Fast power calculation (Modular Exponentiation in cryptography, RSA).',
    'Sorting algorithms (Merge Sort, Quick Sort).',
    'Geometric algorithms (Closest Pair of Points, Convex Hull).',
    'Strassen matrix multiplication and Fast Fourier Transform (FFT).',
  ],
  limitations: [
    'Subproblems must be independent; overlapping subproblems require Dynamic Programming instead.',
    'Overhead of repeated function calls for small base cases.',
  ],
  sourceCode: {
    c: `// Binary Exponentiation (Divide & Conquer) in C
long long power(long long x, int n) {
    if (n == 0) return 1; // Base case
    long long half = power(x, n / 2); // Divide & Conquer
    if (n % 2 == 0) {
        return half * half; // Combine (Even)
    } else {
        return x * half * half; // Combine (Odd)
    }
}`,
    typescript: `// Binary Exponentiation in TypeScript
function power(x: number, n: number): number {
  if (n === 0) return 1;
  const half = power(x, Math.floor(n / 2));
  return n % 2 === 0 ? half * half : x * half * half;
}`,
  },
};

export function simulateDivideAndConquer(): MatrixStep[] {
  const steps: MatrixStep[] = [];
  const stack: string[] = [];

  steps.push({
    kind: 'matrix',
    matrix: [],
    currentCallStack: [...stack],
    action: 'start',
    description: 'Starting Divide & Conquer: Computing 2^8 via Fast Binary Exponentiation.',
    stats: { base: 2, exp: 8 },
    codeLine: 2,
  });

  // Call power(2, 8)
  stack.push('power(2, 8)');
  steps.push({
    kind: 'matrix',
    matrix: [],
    currentCallStack: [...stack],
    action: 'divide',
    description: 'DIVIDE power(2, 8): n=8 is even. Split into (power(2, 4))^2.',
    stats: { x: 2, n: 8, stackDepth: stack.length },
    codeLine: 4,
  });

  // Call power(2, 4)
  stack.push('power(2, 4)');
  steps.push({
    kind: 'matrix',
    matrix: [],
    currentCallStack: [...stack],
    action: 'divide',
    description: 'DIVIDE power(2, 4): n=4 is even. Split into (power(2, 2))^2.',
    stats: { x: 2, n: 4, stackDepth: stack.length },
    codeLine: 4,
  });

  // Call power(2, 2)
  stack.push('power(2, 2)');
  steps.push({
    kind: 'matrix',
    matrix: [],
    currentCallStack: [...stack],
    action: 'divide',
    description: 'DIVIDE power(2, 2): n=2 is even. Split into (power(2, 1))^2.',
    stats: { x: 2, n: 2, stackDepth: stack.length },
    codeLine: 4,
  });

  // Call power(2, 1)
  stack.push('power(2, 1)');
  steps.push({
    kind: 'matrix',
    matrix: [],
    currentCallStack: [...stack],
    action: 'divide',
    description: 'DIVIDE power(2, 1): n=1 is odd. Split into 2 * (power(2, 0))^2.',
    stats: { x: 2, n: 1, stackDepth: stack.length },
    codeLine: 4,
  });

  // Call power(2, 0) -> Base Case
  stack.push('power(2, 0)');
  steps.push({
    kind: 'matrix',
    matrix: [],
    currentCallStack: [...stack],
    action: 'base-case',
    description: 'BASE CASE: power(2, 0) reaches n=0. Returns 1! Ready to combine solutions.',
    stats: { x: 2, n: 0, returned: 1 },
    codeLine: 3,
  });

  // Combine power(2, 1)
  stack.pop();
  steps.push({
    kind: 'matrix',
    matrix: [],
    currentCallStack: [...stack],
    action: 'combine',
    description: 'COMBINE power(2, 1): 2 * (1 * 1) = 2. Returning 2.',
    stats: { subResult: 2, stackDepth: stack.length },
    codeLine: 8,
  });

  // Combine power(2, 2)
  stack.pop();
  steps.push({
    kind: 'matrix',
    matrix: [],
    currentCallStack: [...stack],
    action: 'combine',
    description: 'COMBINE power(2, 2): half=2, compute 2 * 2 = 4. Returning 4.',
    stats: { subResult: 4, stackDepth: stack.length },
    codeLine: 6,
  });

  // Combine power(2, 4)
  stack.pop();
  steps.push({
    kind: 'matrix',
    matrix: [],
    currentCallStack: [...stack],
    action: 'combine',
    description: 'COMBINE power(2, 4): half=4, compute 4 * 4 = 16. Returning 16.',
    stats: { subResult: 16, stackDepth: stack.length },
    codeLine: 6,
  });

  // Combine power(2, 8)
  stack.pop();
  steps.push({
    kind: 'matrix',
    matrix: [],
    currentCallStack: [...stack],
    action: 'combine',
    description: 'COMBINE power(2, 8): half=16, compute 16 * 16 = 256. Final calculation!',
    stats: { finalResult: 256, stackDepth: 0 },
    codeLine: 6,
  });

  return steps;
}
