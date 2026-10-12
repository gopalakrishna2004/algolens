import { describe, it, expect } from 'vitest';
import {
  ALGORITHM_REGISTRY,
  getAlgorithmById,
  getAlgorithmsByCategory,
  CATEGORIES,
} from './registry';

describe('Algorithm Registry', () => {
  it('should contain Linear Search and Binary Search under the searching category', () => {
    const searchingAlgorithms = getAlgorithmsByCategory('searching');
    expect(searchingAlgorithms.length).toBe(2);

    const ids = searchingAlgorithms.map((a) => a.metadata.id);
    expect(ids).toContain('linear-search');
    expect(ids).toContain('binary-search');
  });

  it('should contain all 6 sorting algorithms under the sorting category', () => {
    const sortingAlgorithms = getAlgorithmsByCategory('sorting');
    expect(sortingAlgorithms.length).toBe(6);

    const ids = sortingAlgorithms.map((a) => a.metadata.id);
    expect(ids).toEqual([
      'bubble-sort',
      'selection-sort',
      'insertion-sort',
      'merge-sort',
      'quick-sort',
      'heap-sort',
    ]);
  });

  it('should have complete metadata for all registered algorithms', () => {
    Object.values(ALGORITHM_REGISTRY).forEach((algo) => {
      const meta = algo.metadata;
      expect(meta.name).toBeDefined();
      expect(meta.description.length).toBeGreaterThan(10);
      expect(meta.keyIdea.length).toBeGreaterThan(10);
      expect(meta.whenToUse.length).toBeGreaterThan(0);
      expect(meta.limitations.length).toBeGreaterThan(0);
      expect(meta.timeComplexity.best).toBeDefined();
      expect(meta.timeComplexity.average).toBeDefined();
      expect(meta.timeComplexity.worst).toBeDefined();
      expect(meta.spaceComplexity).toBeDefined();
      expect(meta.sourceCode.c.length).toBeGreaterThan(20);
      expect(meta.sourceCode.typescript.length).toBeGreaterThan(20);
    });
  });

  it('should retrieve algorithms by ID using getAlgorithmById', () => {
    const linear = getAlgorithmById('linear-search');
    expect(linear).toBeDefined();
    expect(linear?.metadata.name).toBe('Linear Search');

    const binary = getAlgorithmById('binary-search');
    expect(binary).toBeDefined();
    expect(binary?.metadata.name).toBe('Binary Search');

    const unknown = getAlgorithmById('non-existent');
    expect(unknown).toBeUndefined();
  });

  it('should define all 6 planned curriculum categories', () => {
    expect(CATEGORIES.length).toBe(6);
    const categoryIds = CATEGORIES.map((c) => c.id);
    expect(categoryIds).toEqual([
      'searching',
      'sorting',
      'data-structures',
      'trees',
      'graphs',
      'techniques',
    ]);
  });

  it('should successfully execute all 32 algorithms with default inputs and produce non-empty steps', () => {
    const keys = Object.keys(ALGORITHM_REGISTRY);
    expect(keys.length).toBe(32);
    keys.forEach((key) => {
      const algo = ALGORITHM_REGISTRY[key];
      const steps = algo.run(algo.defaultInput);
      expect(Array.isArray(steps), `${key} should return an array`).toBe(true);
      expect(steps.length, `${key} should produce at least one step`).toBeGreaterThan(0);
      expect(steps[0].description, `${key} step 0 should have a description`).toBeDefined();
    });
  });

  it('should reliably survive 100 random stress iterations across edge cases with zero crashes or invalid states', () => {
    const searchingAndSorting = ['linear-search', 'binary-search', 'bubble-sort', 'selection-sort', 'insertion-sort', 'merge-sort', 'quick-sort', 'heap-sort'];

    for (let iteration = 0; iteration < 100; iteration++) {
      // Generate diverse test inputs
      const size = Math.floor(Math.random() * 15); // 0 to 14 elements
      const array = Array.from({ length: size }, () => Math.floor(Math.random() * 200) - 50);
      const sortedArray = [...array].sort((a, b) => a - b);
      const target = iteration % 2 === 0 && array.length > 0 ? array[Math.floor(Math.random() * array.length)] : 999;

      // 1. Test linear-search
      const linearSteps = ALGORITHM_REGISTRY['linear-search'].run({ array, target });
      expect(linearSteps.length).toBeGreaterThan(0);
      const linearFinal = linearSteps[linearSteps.length - 1];
      if (array.includes(target)) {
        expect(linearFinal.isFound).toBe(true);
      } else {
        expect(linearFinal.isFound).toBe(false);
      }

      // 2. Test binary-search on sorted input
      const binarySteps = ALGORITHM_REGISTRY['binary-search'].run({ array: sortedArray, target });
      expect(binarySteps.length).toBeGreaterThan(0);
      const binaryFinal = binarySteps[binarySteps.length - 1];
      if (sortedArray.includes(target)) {
        expect(binaryFinal.isFound).toBe(true);
      } else {
        expect(binaryFinal.isFound).toBe(false);
      }

      // 3. Test sorting algorithms
      const sortKey = searchingAndSorting[2 + (iteration % 6)];
      const sortAlgo = ALGORITHM_REGISTRY[sortKey];
      const sortSteps = sortAlgo.run({ array: [...array] });
      expect(sortSteps.length).toBeGreaterThan(0);
      const sortFinal = sortSteps[sortSteps.length - 1];
      if (sortFinal && sortFinal.array) {
        const result = sortFinal.array;
        for (let i = 1; i < result.length; i++) {
          expect(result[i]).toBeGreaterThanOrEqual(result[i - 1]);
        }
      }
    }
  });
});
