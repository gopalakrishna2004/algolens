import { describe, it, expect } from 'vitest';
import { bubbleSort } from './bubbleSort';
import { selectionSort } from './selectionSort';
import { insertionSort } from './insertionSort';
import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';
import { heapSort } from './heapSort';

const algorithms = [
  { name: 'Bubble Sort', fn: bubbleSort },
  { name: 'Selection Sort', fn: selectionSort },
  { name: 'Insertion Sort', fn: insertionSort },
  { name: 'Merge Sort', fn: mergeSort },
  { name: 'Quick Sort', fn: quickSort },
  { name: 'Heap Sort', fn: heapSort },
];

describe('Sorting Algorithms Suite', () => {
  algorithms.forEach(({ name, fn }) => {
    describe(name, () => {
      it('should sort an unsorted random array correctly', () => {
        const input = [64, 25, 12, 22, 11, 90, 3];
        const steps = fn(input);

        expect(steps.length).toBeGreaterThan(0);
        const lastStep = steps[steps.length - 1];
        expect(lastStep.array).toEqual([3, 11, 12, 22, 25, 64, 90]);
      });

      it('should handle an already-sorted array', () => {
        const input = [1, 2, 3, 4, 5];
        const steps = fn(input);

        const lastStep = steps[steps.length - 1];
        expect(lastStep.array).toEqual([1, 2, 3, 4, 5]);
      });

      it('should handle a reversed array', () => {
        const input = [5, 4, 3, 2, 1];
        const steps = fn(input);

        const lastStep = steps[steps.length - 1];
        expect(lastStep.array).toEqual([1, 2, 3, 4, 5]);
      });

      it('should handle an array with duplicate elements', () => {
        const input = [4, 2, 4, 3, 1, 2];
        const steps = fn(input);

        const lastStep = steps[steps.length - 1];
        expect(lastStep.array).toEqual([1, 2, 2, 3, 4, 4]);
      });

      it('should handle a single-element array', () => {
        const input = [42];
        const steps = fn(input);

        const lastStep = steps[steps.length - 1];
        expect(lastStep.array).toEqual([42]);
      });

      it('should handle an empty array safely', () => {
        const input: number[] = [];
        const steps = fn(input);

        expect(steps.length).toBeGreaterThanOrEqual(1);
        const lastStep = steps[steps.length - 1];
        expect(lastStep.array).toEqual([]);
      });
    });
  });
});
