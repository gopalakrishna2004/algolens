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
});
