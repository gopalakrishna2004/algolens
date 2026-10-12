import { describe, it, expect } from 'vitest';
import { linearSearch, linearSearchMetadata, generateLinearSearchSource } from './linearSearch';

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

  it('should synchronize step execution codeLines with beginner-facing C source code', () => {
    const array = [15, 42, 8, 23, 74];
    const stepsFound = linearSearch(array, 23);

    // Initial step should point to target definition (line 10)
    expect(stepsFound[0].codeLine).toBe(10);

    // Comparisons should point to the if condition (line 16)
    expect(stepsFound[1].codeLine).toBe(16);
    expect(stepsFound[2].codeLine).toBe(16);

    // Found step should point to printf indicating human position (line 18)
    const foundStep = stepsFound[stepsFound.length - 1];
    expect(foundStep.isFound).toBe(true);
    expect(foundStep.codeLine).toBe(18);

    // Test not-found step synchronization
    const stepsNotFound = linearSearch(array, 999);
    const notFoundStep = stepsNotFound[stepsNotFound.length - 1];
    expect(notFoundStep.isFound).toBe(false);
    expect(notFoundStep.codeLine).toBe(24);
  });

  it('should include beginner-friendly comments and compilable C elements in metadata sourceCode with 8 elements', () => {
    const cCode = linearSearchMetadata.sourceCode.c;
    const tsCode = linearSearchMetadata.sourceCode.typescript;

    expect(cCode).toContain('#include <stdio.h>');
    expect(cCode).toContain('int main(void)');
    expect(cCode).toContain('int numbers[] = {15, 42, 8, 23, 74, 31, 90, 56};');
    expect(cCode).toContain('int totalElements = 8;');
    expect(cCode).toContain('0-based index');
    expect(cCode).toContain('human position');
    expect(cCode).toContain('return 0;');
    expect(cCode).toContain('PROGRESSION NOTE');
    expect(cCode).toContain('return -1;');

    expect(tsCode).toContain('function main()');
    expect(tsCode).toContain('0-based index');
    expect(tsCode).toContain('human position');
    expect(tsCode).toContain('PROGRESSION NOTE');

    // Verify all referenced line numbers in C code exist and match expected instructions
    const cLines = cCode.split('\n');
    expect(cLines[7]).toContain('int numbers[] = {15, 42, 8, 23, 74, 31, 90, 56};'); // Line 8 (1-based)
    expect(cLines[8]).toContain('int totalElements = 8;'); // Line 9 (1-based)
    expect(cLines[9]).toContain('int target = 23;'); // Line 10 (1-based)
    expect(cLines[13]).toContain('for (int index = 0; index < totalElements; index++)'); // Line 14 (1-based)
    expect(cLines[15]).toContain('if (numbers[index] == target)'); // Line 16 (1-based)
    expect(cLines[17]).toContain('printf("Found target'); // Line 18 (1-based)
    expect(cLines[23]).toContain('printf("Target %d was not found'); // Line 24 (1-based)
  });

  it('should dynamically generate source code matching custom user arrays and targets', () => {
    const customArray = [100, 200, 300];
    const customTarget = 300;
    const generated = generateLinearSearchSource(customArray, customTarget);

    expect(generated.c).toContain('int numbers[] = {100, 200, 300};');
    expect(generated.c).toContain('int totalElements = 3;');
    expect(generated.c).toContain('int target = 300;');

    expect(generated.typescript).toContain('const numbers: number[] = [100, 200, 300];');
    expect(generated.typescript).toContain('const target: number = 300;');

    // Verify critical line numbers remain stable
    const cLines = generated.c.split('\n');
    expect(cLines[7]).toContain('int numbers[] = {100, 200, 300};'); // Line 8
    expect(cLines[8]).toContain('int totalElements = 3;'); // Line 9
    expect(cLines[9]).toContain('int target = 300;'); // Line 10
    expect(cLines[15]).toContain('if (numbers[index] == target)'); // Line 16
    expect(cLines[17]).toContain('printf("Found target'); // Line 18
    expect(cLines[23]).toContain('printf("Target %d was not found'); // Line 24
  });
});

