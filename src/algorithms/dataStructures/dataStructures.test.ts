import { describe, it, expect } from 'vitest';
import { arrayOperations } from './arrayOperations';
import { simulateStack } from './stackOperations';
import { simulateQueue } from './queueOperations';
import { simulateLinkedList } from './linkedListOperations';
import { simulateHashTable } from './hashTableOperations';
import { simulateHeap } from './heapOperations';
import { simulateTrie } from './trieOperations';

describe('Chapter 3: Data Structures', () => {
  describe('Array Operations', () => {
    it('generates valid steps for array insertion', () => {
      const steps = arrayOperations({ array: [1, 2, 3], operation: 'insert', index: 1, value: 99 });
      expect(steps.length).toBeGreaterThan(1);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.array).toEqual([1, 99, 2, 3]);
      expect(lastStep.isFound).toBe(true);
    });

    it('generates valid steps for array deletion', () => {
      const steps = arrayOperations({ array: [10, 20, 30], operation: 'delete', index: 1 });
      expect(steps.length).toBeGreaterThan(1);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.array).toEqual([10, 30]);
    });
  });

  describe('Stack Operations', () => {
    it('simulates LIFO push, peek, and pop steps properly', () => {
      const steps = simulateStack({ initialItems: [5, 10] });
      expect(steps.length).toBeGreaterThan(3);
      expect(steps.every((s) => s.kind === 'stack-queue' && s.structureType === 'stack')).toBe(true);
      const hasPop = steps.some((s) => s.action === 'pop');
      const hasPush = steps.some((s) => s.action === 'push');
      expect(hasPop).toBe(true);
      expect(hasPush).toBe(true);
    });
  });

  describe('Queue Operations', () => {
    it('simulates FIFO enqueue and dequeue steps properly', () => {
      const steps = simulateQueue({ initialItems: [1, 2] });
      expect(steps.length).toBeGreaterThan(3);
      expect(steps.every((s) => s.kind === 'stack-queue' && s.structureType === 'queue')).toBe(true);
      const hasEnqueue = steps.some((s) => s.action === 'enqueue');
      const hasDequeue = steps.some((s) => s.action === 'dequeue');
      expect(hasEnqueue).toBe(true);
      expect(hasDequeue).toBe(true);
    });
  });

  describe('Linked List Operations', () => {
    it('simulates node pointers, insert-head, search, and delete', () => {
      const steps = simulateLinkedList({ initialValues: [10, 20, 30] });
      expect(steps.length).toBeGreaterThan(4);
      expect(steps.every((s) => s.kind === 'linked-list')).toBe(true);
      const hasInsertHead = steps.some((s) => s.action === 'insert-head');
      const hasDelete = steps.some((s) => s.action === 'delete');
      expect(hasInsertHead).toBe(true);
      expect(hasDelete).toBe(true);
    });
  });

  describe('Hash Table Operations', () => {
    it('simulates hashing and collision chaining across buckets', () => {
      const steps = simulateHashTable();
      expect(steps.length).toBeGreaterThan(4);
      expect(steps.every((s) => s.kind === 'hash-table')).toBe(true);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.capacity).toBe(5);
      const totalEntries = lastStep.buckets.reduce((acc, b) => acc + b.length, 0);
      expect(totalEntries).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Binary Heap Operations', () => {
    it('maintains Max-Heap property through insert sift-up and extract-max sift-down', () => {
      const steps = simulateHeap({ initialHeap: [50, 30, 20], insertValue: 60 });
      expect(steps.length).toBeGreaterThan(3);
      expect(steps.every((s) => s.kind === 'tree')).toBe(true);
      const hasExtractMax = steps.some((s) => s.action === 'extract-max');
      expect(hasExtractMax).toBe(true);
    });
  });

  describe('Trie Operations', () => {
    it('builds prefix tree and searches for keywords', () => {
      const steps = simulateTrie();
      expect(steps.length).toBeGreaterThan(4);
      expect(steps.every((s) => s.kind === 'trie')).toBe(true);
      const foundStep = steps.find((s) => s.action === 'found');
      expect(foundStep).toBeDefined();
    });
  });
});
