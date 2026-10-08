import type { TreeStep, VisualTreeNode, AlgorithmMetadata } from '../types';

export const inorderTraversalMetadata: AlgorithmMetadata = {
  id: 'inorder-traversal',
  name: 'Inorder Traversal (L-N-R)',
  category: 'trees',
  visualizationType: 'tree',
  difficulty: 'Beginner',
  prerequisites: ['Binary Trees', 'Recursion', 'Call Stack'],
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },
  spaceComplexity: 'O(h) [Recursion Stack]',
  description:
    'A depth-first traversal strategy that recursively visits the Left Subtree, then the Current Node, and finally the Right Subtree. When performed on a BST, visits nodes in strictly ascending non-decreasing order!',
  keyIdea:
    'Left ➔ Root ➔ Right. In a Binary Search Tree, an Inorder traversal guarantees elements are retrieved in sorted order because all smaller elements on the left are processed before the root.',
  whenToUse: [
    'Retrieving all elements of a BST in ascending sorted order.',
    'Validating if a binary tree is a valid BST (checking if inorder array is strictly increasing).',
    'Flattening a BST into a sorted linked list or array.',
  ],
  limitations: [
    'Recursion stack takes O(h) memory, which is O(n) in worst-case skewed trees.',
  ],
  sourceCode: {
    c: `// Inorder Traversal in C
void inorder(TreeNode *root) {
    if (root == NULL) return;
    inorder(root->left);       // 1. Visit Left
    printf("%d ", root->val);  // 2. Visit Node
    inorder(root->right);      // 3. Visit Right
}`,
    typescript: `// Inorder in TypeScript
function inorder(root: TreeNode | null, result: number[] = []): number[] {
  if (!root) return result;
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result;
}`,
  },
};

export function simulateInorderTraversal(): TreeStep[] {
  // Balanced BST: 50 with left 30 (left 20, right 40) and right 70 (left 60, right 80)
  const nodes: Record<string, VisualTreeNode> = {
    '50': { id: '50', value: 50, leftId: '30', rightId: '70', state: 'default' },
    '30': { id: '30', value: 30, leftId: '20', rightId: '40', state: 'default' },
    '20': { id: '20', value: 20, state: 'default' },
    '40': { id: '40', value: 40, state: 'default' },
    '70': { id: '70', value: 70, leftId: '60', rightId: '80', state: 'default' },
    '60': { id: '60', value: 60, state: 'default' },
    '80': { id: '80', value: 80, state: 'default' },
  };

  const steps: TreeStep[] = [];
  const traversalOrder: number[] = [];
  const visitedNodeIds: string[] = [];

  steps.push({
    kind: 'tree',
    nodes: JSON.parse(JSON.stringify(nodes)),
    rootId: '50',
    action: 'start',
    description: 'Starting Inorder Traversal on BST (Left ➔ Root ➔ Right).',
    stats: { visitedCount: 0 },
    codeLine: 2,
  });

  function traverse(nodeId?: string) {
    if (!nodeId || !nodes[nodeId]) return;
    const curr = nodes[nodeId];

    // Traverse left
    if (curr.leftId) {
      steps.push({
        kind: 'tree',
        nodes: JSON.parse(JSON.stringify(nodes)),
        rootId: '50',
        activeNodeId: nodeId,
        visitedNodeIds: [...visitedNodeIds],
        traversalOrder: [...traversalOrder],
        action: 'go-left',
        description: `At node(${curr.value}): Recursing into LEFT subtree (node ${nodes[curr.leftId].value}).`,
        stats: { current: curr.value, phase: 'left' },
        codeLine: 4,
      });
      traverse(curr.leftId);
    }

    // Visit current
    visitedNodeIds.push(nodeId);
    traversalOrder.push(curr.value);
    nodes[nodeId].state = 'visited';

    steps.push({
      kind: 'tree',
      nodes: JSON.parse(JSON.stringify(nodes)),
      rootId: '50',
      activeNodeId: nodeId,
      visitedNodeIds: [...visitedNodeIds],
      traversalOrder: [...traversalOrder],
      action: 'visit',
      description: `VISIT NODE(${curr.value}): Emitted ${curr.value} to output!`,
      stats: { current: curr.value, visitedCount: traversalOrder.length },
      codeLine: 5,
    });

    // Traverse right
    if (curr.rightId) {
      steps.push({
        kind: 'tree',
        nodes: JSON.parse(JSON.stringify(nodes)),
        rootId: '50',
        activeNodeId: nodeId,
        visitedNodeIds: [...visitedNodeIds],
        traversalOrder: [...traversalOrder],
        action: 'go-right',
        description: `At node(${curr.value}): Recursing into RIGHT subtree (node ${nodes[curr.rightId].value}).`,
        stats: { current: curr.value, phase: 'right' },
        codeLine: 6,
      });
      traverse(curr.rightId);
    }
  }

  traverse('50');

  steps.push({
    kind: 'tree',
    nodes: JSON.parse(JSON.stringify(nodes)),
    rootId: '50',
    visitedNodeIds: [...visitedNodeIds],
    traversalOrder: [...traversalOrder],
    action: 'complete',
    description: `Inorder Traversal complete! Sorted result: [${traversalOrder.join(', ')}].`,
    stats: { visitedCount: traversalOrder.length, sorted: true },
    codeLine: 7,
  });

  return steps;
}
