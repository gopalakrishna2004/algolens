import { describe, it, expect } from 'vitest';
import { buildBinaryTree } from './binaryTree';
import { simulateBST } from './bst';
import { simulateInorderTraversal } from './inorderTraversal';
import { simulatePreorderTraversal } from './preorderTraversal';
import { simulatePostorderTraversal } from './postorderTraversal';

describe('Chapter 4: Trees', () => {
  it('builds a binary tree level by level', () => {
    const steps = buildBinaryTree();
    expect(steps.length).toBeGreaterThan(3);
    expect(steps.every((s) => s.kind === 'tree')).toBe(true);
    const last = steps[steps.length - 1];
    expect(last.stats.totalNodes).toBe(7);
  });

  it('inserts into BST and searches for target', () => {
    const steps = simulateBST();
    expect(steps.length).toBeGreaterThan(5);
    const foundStep = steps.find((s) => s.action === 'found');
    expect(foundStep).toBeDefined();
    expect(foundStep?.stats.found).toBe(true);
  });

  it('performs Inorder Traversal visiting nodes in ascending sorted order', () => {
    const steps = simulateInorderTraversal();
    const completeStep = steps[steps.length - 1];
    expect(completeStep.traversalOrder).toEqual([20, 30, 40, 50, 60, 70, 80]);
  });

  it('performs Preorder Traversal (Root ➔ Left ➔ Right)', () => {
    const steps = simulatePreorderTraversal();
    const completeStep = steps[steps.length - 1];
    expect(completeStep.traversalOrder).toEqual([1, 2, 4, 5, 3, 6, 7]);
  });

  it('performs Postorder Traversal (Left ➔ Right ➔ Root)', () => {
    const steps = simulatePostorderTraversal();
    const completeStep = steps[steps.length - 1];
    expect(completeStep.traversalOrder).toEqual([4, 5, 2, 6, 7, 3, 1]);
  });
});
