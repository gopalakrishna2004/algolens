import { describe, it, expect } from 'vitest';
import { generateChallenge } from './challengeEngine';
import { binarySearch, binarySearchMetadata } from '../algorithms/searching/binarySearch';
import { linearSearch, linearSearchMetadata } from '../algorithms/searching/linearSearch';
import { bubbleSort, bubbleSortMetadata } from '../algorithms/sorting/bubbleSort';
import { simulateStack, stackMetadata } from '../algorithms/dataStructures/stackOperations';
import { simulateQueue, queueMetadata } from '../algorithms/dataStructures/queueOperations';
import { simulateBST, bstMetadata } from '../algorithms/trees/bst';
import { simulateDijkstra, dijkstraMetadata } from '../algorithms/graphs/dijkstra';
import { simulateTwoPointers, twoPointersMetadata } from '../algorithms/techniques/twoPointers';

describe('Challenge Engine', () => {
  it('generates binary search decision challenges correctly', () => {
    const array = [10, 20, 30, 40, 50, 60, 70];
    const steps = binarySearch(array, 50);
    expect(steps.length).toBeGreaterThan(1);

    // Initial step (midpoint comparison)
    const challenge = generateChallenge('binary-search', 0, steps, binarySearchMetadata);
    expect(challenge).not.toBeNull();
    expect(challenge?.algoId).toBe('binary-search');
    expect(challenge?.options.length).toBeGreaterThanOrEqual(2);
    expect(challenge?.correctOptionId).toBeDefined();

    // Verify option explanation matches correct id
    const correctOption = challenge?.options.find((o) => o.id === challenge?.correctOptionId);
    expect(correctOption).toBeDefined();
    expect(challenge?.rationale).toBeDefined();
  });

  it('generates linear search sequential scanning challenge', () => {
    const array = [12, 34, 56];
    const steps = linearSearch(array, 56);
    expect(steps.length).toBeGreaterThan(1);

    const challengeInit = generateChallenge('linear-search', 0, steps, linearSearchMetadata);
    expect(challengeInit).not.toBeNull();
    expect(challengeInit?.concept).toBe('Sequential Scanning Invariant');
    expect(challengeInit?.correctOptionId).toBe('start-at-zero');

    const challengeScan = generateChallenge('linear-search', 1, steps, linearSearchMetadata);
    expect(challengeScan).not.toBeNull();
    expect(challengeScan?.correctOptionId).toBe('advance');
  });

  it('generates bubble sort swap prediction challenges correctly', () => {
    const array = [5, 1, 4];
    const steps = bubbleSort(array);
    expect(steps.length).toBeGreaterThan(1);

    let foundChallenge = false;
    for (let i = 0; i < steps.length - 1; i++) {
      const challenge = generateChallenge('bubble-sort', i, steps, bubbleSortMetadata);
      if (challenge) {
        foundChallenge = true;
        expect(challenge.category).toBe('sorting');
        expect(challenge.options.length).toBeGreaterThanOrEqual(2);
        break;
      }
    }
    expect(foundChallenge).toBe(true);
  });

  it('generates stack LIFO challenge accurately', () => {
    const steps = simulateStack();
    expect(steps.length).toBeGreaterThan(1);

    let foundChallenge = false;
    for (let i = 0; i < steps.length - 1; i++) {
      const challenge = generateChallenge('stack', i, steps, stackMetadata);
      if (challenge) {
        foundChallenge = true;
        expect(challenge.concept).toContain('LIFO');
        expect(challenge.correctOptionId).toBe('top-item');
        break;
      }
    }
    expect(foundChallenge).toBe(true);
  });

  it('generates queue FIFO challenge accurately', () => {
    const steps = simulateQueue();
    expect(steps.length).toBeGreaterThan(1);

    let foundChallenge = false;
    for (let i = 0; i < steps.length - 1; i++) {
      const challenge = generateChallenge('queue', i, steps, queueMetadata);
      if (challenge) {
        foundChallenge = true;
        expect(challenge.concept).toContain('FIFO');
        expect(challenge.correctOptionId).toBe('front-item');
        break;
      }
    }
    expect(foundChallenge).toBe(true);
  });

  it('generates BST branching challenge accurately', () => {
    const steps = simulateBST();
    expect(steps.length).toBeGreaterThan(1);

    let foundChallenge = false;
    for (let i = 0; i < steps.length - 1; i++) {
      const challenge = generateChallenge('bst', i, steps, bstMetadata);
      if (challenge) {
        foundChallenge = true;
        expect(challenge.concept).toContain('Binary Search Tree');
        break;
      }
    }
    expect(foundChallenge).toBe(true);
  });

  it('generates Dijkstra shortest path greedy choice challenge', () => {
    const steps = simulateDijkstra();
    expect(steps.length).toBeGreaterThan(1);

    const challenge = generateChallenge('dijkstra', 0, steps, dijkstraMetadata);
    expect(challenge).not.toBeNull();
    expect(challenge?.concept).toContain('Dijkstra');
    expect(challenge?.correctOptionId).toBe('min-dist');
  });

  it('generates two pointers pointer movement challenge', () => {
    const steps = simulateTwoPointers({ array: [2, 7, 11, 15, 20], target: 18 });
    expect(steps.length).toBeGreaterThan(1);

    const challenge = generateChallenge('two-pointers', 0, steps, twoPointersMetadata);
    expect(challenge).not.toBeNull();
    expect(challenge?.concept).toContain('Pointer');
  });

  it('returns null on empty steps array or terminal step without throwing', () => {
    expect(generateChallenge('binary-search', 0, [], binarySearchMetadata)).toBeNull();

    const steps = binarySearch([10, 20], 20);
    const terminalChallenge = generateChallenge('binary-search', steps.length - 1, steps, binarySearchMetadata);
    expect(terminalChallenge).toBeNull();
  });
});
