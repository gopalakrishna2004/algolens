import type { MatrixStep, AlgorithmMetadata } from '../types';

export const recursionMetadata: AlgorithmMetadata = {
  id: 'recursion',
  name: 'Recursion (Call Stack)',
  category: 'techniques',
  visualizationType: 'matrix',
  difficulty: 'Beginner',
  prerequisites: ['Functions', 'Base Cases', 'LIFO Call Stack'],
  timeComplexity: {
    best: 'O(n) [Linear] / O(2^n) [Fibonacci]',
    average: 'O(2^n) [Naive Tree]',
    worst: 'O(2^n)',
  },
  spaceComplexity: 'O(n) [Call Stack Depth]',
  description:
    'A computational technique where a function solves a problem by calling itself with smaller sub-inputs until reaching a terminating Base Case, then unwinding back up the call stack.',
  keyIdea:
    'Deconstruct into base case + recurrence relation. Every recursive call pushes an activation record onto the call stack; returning pops the frame and passes the result to the caller.',
  whenToUse: [
    'Tree and graph traversals (DOM trees, AST parsers, DFS).',
    'Divide-and-Conquer algorithms (Merge Sort, Quick Sort).',
    'Mathematical recurrences and combinatorial generators.',
  ],
  limitations: [
    'Excessive recursive depth without tail call optimization triggers Stack Overflow errors.',
    'Naive repeated recursive subproblems have exponential time complexity without memoization.',
  ],
  sourceCode: {
    c: `// Factorial via Recursion in C
int factorial(int n) {
    if (n <= 1) return 1; // Base case
    return n * factorial(n - 1); // Recurse
}

int fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    typescript: `// Recursion in TypeScript
function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
  },
};

export function simulateRecursion(): MatrixStep[] {
  const steps: MatrixStep[] = [];
  const stack: string[] = [];

  steps.push({
    kind: 'matrix',
    matrix: [],
    currentCallStack: [...stack],
    action: 'start',
    description: 'Starting factorial(4) calculation. Evaluating activation frames.',
    stats: { target: 4, stackDepth: 0 },
    codeLine: 2,
  });

  // Call factorial(4)
  stack.push('factorial(4)');
  steps.push({
    kind: 'matrix',
    matrix: [],
    currentCallStack: [...stack],
    action: 'call',
    description: 'CALL factorial(4): 4 > 1, so recurse with 4 * factorial(3). Pushed frame to call stack.',
    stats: { currentN: 4, stackDepth: stack.length },
    codeLine: 4,
  });

  // Call factorial(3)
  stack.push('factorial(3)');
  steps.push({
    kind: 'matrix',
    matrix: [],
    currentCallStack: [...stack],
    action: 'call',
    description: 'CALL factorial(3): 3 > 1, so recurse with 3 * factorial(2). Pushed frame to call stack.',
    stats: { currentN: 3, stackDepth: stack.length },
    codeLine: 4,
  });

  // Call factorial(2)
  stack.push('factorial(2)');
  steps.push({
    kind: 'matrix',
    matrix: [],
    currentCallStack: [...stack],
    action: 'call',
    description: 'CALL factorial(2): 2 > 1, so recurse with 2 * factorial(1). Pushed frame to call stack.',
    stats: { currentN: 2, stackDepth: stack.length },
    codeLine: 4,
  });

  // Call factorial(1) - BASE CASE
  stack.push('factorial(1)');
  steps.push({
    kind: 'matrix',
    matrix: [],
    currentCallStack: [...stack],
    action: 'base-case',
    description: 'BASE CASE REACHED: factorial(1) hits n <= 1 condition. Returning 1! Unwinding stack begins.',
    stats: { currentN: 1, stackDepth: stack.length, baseCase: true },
    codeLine: 3,
  });

  // Return from factorial(1)
  stack.pop();
  steps.push({
    kind: 'matrix',
    matrix: [],
    currentCallStack: [...stack],
    action: 'return',
    description: 'RETURN: factorial(1) returned 1. Popped frame. factorial(2) computes: 2 * 1 = 2.',
    stats: { returnedVal: 1, stackDepth: stack.length },
    codeLine: 4,
  });

  // Return from factorial(2)
  stack.pop();
  steps.push({
    kind: 'matrix',
    matrix: [],
    currentCallStack: [...stack],
    action: 'return',
    description: 'RETURN: factorial(2) returned 2. Popped frame. factorial(3) computes: 3 * 2 = 6.',
    stats: { returnedVal: 2, stackDepth: stack.length },
    codeLine: 4,
  });

  // Return from factorial(3)
  stack.pop();
  steps.push({
    kind: 'matrix',
    matrix: [],
    currentCallStack: [...stack],
    action: 'return',
    description: 'RETURN: factorial(3) returned 6. Popped frame. factorial(4) computes: 4 * 6 = 24.',
    stats: { returnedVal: 6, stackDepth: stack.length },
    codeLine: 4,
  });

  // Final return
  stack.pop();
  steps.push({
    kind: 'matrix',
    matrix: [],
    currentCallStack: [...stack],
    action: 'complete',
    description: 'COMPLETE: factorial(4) evaluated to final answer 24! Call stack completely unwound.',
    stats: { finalResult: 24, stackDepth: 0 },
    codeLine: 5,
  });

  return steps;
}
