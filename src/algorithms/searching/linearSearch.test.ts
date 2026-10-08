import { describe, it, expect } from 'vitest';
import { linearSearch } from './linearSearch';

describe('linearSearch', () => {
  it('should find target at the first element (best case)', () => {
    const array = [10, 20, 30, 40, 50];
    const steps = linearSearch(array, 10);

    // Initial step + compare step + found step = 3 steps
    expect(steps.length).toBe(3);

    const lastStep = steps[steps.length - 1];
    expect(lastStep.isFound).toBe(true);
    expect(lastStep.foundIndex).toBe(0);
    expect(lastStep.stats.comparisons).toBe(1);
    expect(lastStep.elementStates[0]).toBe('found');
  });

  it('should find target in the middle of the array', () => {
    const array = [5, 12, 19, 23, 35];
    const steps = linearSearch(array, 19);

    const lastStep = steps[steps.length - 1];
    expect(lastStep.isFound).toBe(true);
    expect(lastStep.foundIndex).toBe(2);
    expect(lastStep.stats.comparisons).toBe(3);
    expect(lastStep.elementStates[0]).toBe('discarded');
    expect(lastStep.elementStates[1]).toBe('discarded');
    expect(lastStep.elementStates[2]).toBe('found');
    expect(lastStep.elementStates[3]).toBe('default');
  });

  it('should find target at the end of the array', () => {
    const array = [4, 8, 15, 16, 23, 42];
    const steps = linearSearch(array, 42);

    const lastStep = steps[steps.length - 1];
    expect(lastStep.isFound).toBe(true);
    expect(lastStep.foundIndex).toBe(5);
    expect(lastStep.stats.comparisons).toBe(6);
    expect(lastStep.elementStates[5]).toBe('found');
  });

  it('should handle target not present in the array', () => {
    const array = [2, 4, 6, 8];
    const steps = linearSearch(array, 99);

    const lastStep = steps[steps.length - 1];
    expect(lastStep.isFound).toBe(false);
    expect(lastStep.foundIndex).toBeUndefined();
    expect(lastStep.stats.comparisons).toBe(4);
    // All elements should be marked discarded
    for (let i = 0; i < array.length; i++) {
      expect(lastStep.elementStates[i]).toBe('discarded');
    }
  });

  it('should handle an empty array gracefully', () => {
    const steps = linearSearch([], 42);

    expect(steps.length).toBe(1);
    expect(steps[0].isFound).toBe(false);
    expect(steps[0].stats.comparisons).toBe(0);
  });

  it('should stop at the first occurrence if duplicates exist', () => {
    const array = [7, 3, 7, 9];
    const steps = linearSearch(array, 7);

    const lastStep = steps[steps.length - 1];
    expect(lastStep.isFound).toBe(true);
    expect(lastStep.foundIndex).toBe(0);
    expect(lastStep.stats.comparisons).toBe(1);
  });

  it('should produce valid sequential step states without mutating input array', () => {
    const original = [10, 20, 30];
    const originalCopy = [...original];
    const steps = linearSearch(original, 20);

    // Ensure input array was not modified
    expect(original).toEqual(originalCopy);

    // Verify step progression
    expect(steps[0].description).toContain('Starting Linear Search');
    expect(steps[1].currentIndex).toBe(0);
    expect(steps[1].elementStates[0]).toBe('comparing');
    expect(steps[2].currentIndex).toBe(1);
    expect(steps[2].elementStates[0]).toBe('discarded');
    expect(steps[2].elementStates[1]).toBe('comparing');
  });
});
