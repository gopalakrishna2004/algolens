import { describe, it, expect } from 'vitest';
import { binarySearch, isSorted } from './binarySearch';

describe('binarySearch', () => {
  it('should find target in the array (target found)', () => {
    const array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
    const steps = binarySearch(array, 23);

    const lastStep = steps[steps.length - 1];
    expect(lastStep.isFound).toBe(true);
    expect(lastStep.foundIndex).toBe(5);
    expect(lastStep.stats.comparisons).toBeGreaterThan(0);
    expect(lastStep.elementStates[5]).toBe('found');
  });

  it('should handle target not found', () => {
    const array = [10, 20, 30, 40, 50];
    const steps = binarySearch(array, 25);

    const lastStep = steps[steps.length - 1];
    expect(lastStep.isFound).toBe(false);
    expect(lastStep.foundIndex).toBeUndefined();
    // All elements should eventually be marked discarded
    for (let i = 0; i < array.length; i++) {
      expect(lastStep.elementStates[i]).toBe('discarded');
    }
  });

  it('should find target at the first position', () => {
    const array = [5, 10, 15, 20, 25, 30];
    const steps = binarySearch(array, 5);

    const lastStep = steps[steps.length - 1];
    expect(lastStep.isFound).toBe(true);
    expect(lastStep.foundIndex).toBe(0);
    expect(lastStep.elementStates[0]).toBe('found');
  });

  it('should find target at the last position', () => {
    const array = [3, 9, 14, 22, 35, 48, 60];
    const steps = binarySearch(array, 60);

    const lastStep = steps[steps.length - 1];
    expect(lastStep.isFound).toBe(true);
    expect(lastStep.foundIndex).toBe(6);
    expect(lastStep.elementStates[6]).toBe('found');
  });

  describe('array sizing edge cases', () => {
    it('should handle single-element array (target found)', () => {
      const array = [42];
      const steps = binarySearch(array, 42);

      const lastStep = steps[steps.length - 1];
      expect(lastStep.isFound).toBe(true);
      expect(lastStep.foundIndex).toBe(0);
      expect(lastStep.stats.comparisons).toBe(1);
    });

    it('should handle single-element array (target not found)', () => {
      const array = [42];
      const steps = binarySearch(array, 99);

      const lastStep = steps[steps.length - 1];
      expect(lastStep.isFound).toBe(false);
      expect(lastStep.foundIndex).toBeUndefined();
      expect(lastStep.stats.comparisons).toBe(1);
      expect(lastStep.elementStates[0]).toBe('discarded');
    });

    it('should handle empty array gracefully', () => {
      const steps = binarySearch([], 10);

      expect(steps.length).toBe(1);
      expect(steps[0].isFound).toBe(false);
      expect(steps[0].stats.comparisons).toBe(0);
      expect(steps[0].description).toContain('empty');
    });

    it('should correctly search in an even-sized array', () => {
      // 6 elements (even)
      const array = [4, 8, 15, 16, 23, 42];
      const steps = binarySearch(array, 16);

      const lastStep = steps[steps.length - 1];
      expect(lastStep.isFound).toBe(true);
      expect(lastStep.foundIndex).toBe(3);
    });

    it('should correctly search in an odd-sized array', () => {
      // 7 elements (odd)
      const array = [1, 3, 5, 7, 9, 11, 13];
      const steps = binarySearch(array, 7);

      const lastStep = steps[steps.length - 1];
      expect(lastStep.isFound).toBe(true);
      expect(lastStep.foundIndex).toBe(3);
      // For odd array with target exactly in the middle, best case 1 comparison!
      expect(lastStep.stats.comparisons).toBe(1);
    });
  });

  describe('sorted input requirement', () => {
    it('should detect if array is sorted using isSorted helper', () => {
      expect(isSorted([1, 2, 3, 4])).toBe(true);
      expect(isSorted([1, 1, 2, 5])).toBe(true);
      expect(isSorted([4, 2, 5])).toBe(false);
      expect(isSorted([])).toBe(true);
      expect(isSorted([10])).toBe(true);
    });

    it('should reject unsorted input with an error step', () => {
      const unsorted = [10, 5, 20, 15];
      const steps = binarySearch(unsorted, 5);

      expect(steps.length).toBe(1);
      expect(steps[0].isFound).toBe(false);
      expect(steps[0].description).toContain('Error: Binary Search requires a sorted array');
    });
  });
});
