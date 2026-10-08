import { describe, it, expect } from 'vitest';
import { simulateRecursion } from './recursion';
import { simulateTwoPointers } from './twoPointers';
import { simulateSlidingWindow } from './slidingWindow';
import { simulateDivideAndConquer } from './divideAndConquer';
import { simulateGreedy } from './greedy';
import { simulateBacktracking } from './backtracking';
import { simulateDynamicProgramming } from './dynamicProgramming';

describe('Chapter 6: Algorithmic Techniques', () => {
  it('simulates Recursion call stack unwinding', () => {
    const steps = simulateRecursion();
    expect(steps.length).toBeGreaterThan(5);
    expect(steps.every((s) => s.kind === 'matrix')).toBe(true);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.stats.finalResult).toBe(24);
  });

  it('simulates Two Pointers inward convergence on sorted array', () => {
    const steps = simulateTwoPointers({ array: [2, 7, 11, 15, 19, 28, 33], target: 30 });
    expect(steps.length).toBeGreaterThan(2);
    expect(steps.every((s) => s.kind === 'array')).toBe(true);
    const foundStep = steps.find((s) => s.isFound);
    expect(foundStep).toBeDefined();
    expect(foundStep?.stats.pair).toBe('2+28');
  });

  it('simulates Sliding Window max sum calculation', () => {
    const steps = simulateSlidingWindow({ array: [2, 1, 5, 1, 3, 2], k: 3 });
    expect(steps.length).toBeGreaterThan(2);
    expect(steps.every((s) => s.kind === 'array')).toBe(true);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.stats.finalMaxSum).toBe(9); // [1, 5, 3] or [5, 1, 3] = 9
  });

  it('simulates Divide and Conquer binary exponentiation (2^8)', () => {
    const steps = simulateDivideAndConquer();
    expect(steps.length).toBeGreaterThan(5);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.stats.finalResult).toBe(256);
  });

  it('simulates Greedy Activity Selection', () => {
    const steps = simulateGreedy();
    expect(steps.length).toBeGreaterThan(4);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.stats.totalSelected).toBeGreaterThanOrEqual(3);
  });

  it('simulates Backtracking N-Queens solution', () => {
    const steps = simulateBacktracking();
    expect(steps.length).toBeGreaterThan(5);
    const solvedStep = steps.find((s) => s.action === 'solved');
    expect(solvedStep).toBeDefined();
    expect(solvedStep?.stats.queensPlaced).toBe(4);
  });

  it('simulates Dynamic Programming 0/1 Knapsack memoization table', () => {
    const steps = simulateDynamicProgramming();
    expect(steps.length).toBeGreaterThan(5);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.stats.optimalKnapsackValue).toBe(50); // Item 1 (10) + Item 3 (40) = 50 for capacity 4
  });
});
