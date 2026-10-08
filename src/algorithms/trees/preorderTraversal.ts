import type { TreeStep, VisualTreeNode, AlgorithmMetadata } from '../types';

export const preorderTraversalMetadata: AlgorithmMetadata = {
  id: 'preorder-traversal',
  name: 'Preorder Traversal (N-L-R)',
  category: 'trees',
  visualizationType: 'tree',
  difficulty: 'Beginner',
  prerequisites: ['Binary Trees', 'Recursion', 'DFS Principle'],
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },
  spaceComplexity: 'O(h) [Recursion Stack]',
  description:
    'A depth-first traversal strategy that visits the Current Node first, then recursively explores the Left Subtree, and finally the Right Subtree. Commonly used to create a copy or serialize a tree.',
  keyIdea:
    'Root ➔ Left ➔ Right. Processes each parent node before any of its descendants, preserving root-to-leaf hierarchy.',
  whenToUse: [
    'Tree serialization and cloning (saving tree topology to a file).',
    'Prefix notation generation (Polish notation) for mathematical expressions.',
    'Directory tree printing and structured hierarchical outlines.',
  ],
  limitations: [
    'Does not produce sorted order on a BST.',
    'Requires recursive stack memory O(h).',
  ],
  sourceCode: {
    c: `// Preorder Traversal in C
void preorder(TreeNode *root) {
    if (root == NULL) return;
    printf("%d ", root->val);  // 1. Visit Node
    preorder(root->left);       // 2. Visit Left
    preorder(root->right);      // 3. Visit Right
}`,
    typescript: `// Preorder in TypeScript
function preorder(root: TreeNode | null, result: number[] = []): number[] {
  if (!root) return result;
  result.push(root.val);
  preorder(root.left, result);
  preorder(root.right, result);
  return result;
}`,
  },
};

export function simulatePreorderTraversal(): TreeStep[] {
  const nodes: Record<string, VisualTreeNode> = {
    '1': { id: '1', value: 1, leftId: '2', rightId: '3', state: 'default' },
    '2': { id: '2', value: 2, leftId: '4', rightId: '5', state: 'default' },
    '4': { id: '4', value: 4, state: 'default' },
    '5': { id: '5', value: 5, state: 'default' },
    '3': { id: '3', value: 3, leftId: '6', rightId: '7', state: 'default' },
    '6': { id: '6', value: 6, state: 'default' },
    '7': { id: '7', value: 7, state: 'default' },
  };

  const steps: TreeStep[] = [];
  const traversalOrder: number[] = [];
  const visitedNodeIds: string[] = [];

  steps.push({
    kind: 'tree',
    nodes: JSON.parse(JSON.stringify(nodes)),
    rootId: '1',
    action: 'start',
    description: 'Starting Preorder Traversal (Root ➔ Left ➔ Right).',
    stats: { visitedCount: 0 },
    codeLine: 2,
  });

  function traverse(nodeId?: string) {
    if (!nodeId || !nodes[nodeId]) return;
    const curr = nodes[nodeId];

    // 1. Visit Root/Node first
    visitedNodeIds.push(nodeId);
    traversalOrder.push(curr.value);
    nodes[nodeId].state = 'visited';

    steps.push({
      kind: 'tree',
      nodes: JSON.parse(JSON.stringify(nodes)),
      rootId: '1',
      activeNodeId: nodeId,
      visitedNodeIds: [...visitedNodeIds],
      traversalOrder: [...traversalOrder],
      action: 'visit-root',
      description: `VISIT NODE(${curr.value}): Evaluated before children! Output: [${traversalOrder.join(', ')}].`,
      stats: { current: curr.value, visitedCount: traversalOrder.length },
      codeLine: 4,
    });

    // 2. Left
    if (curr.leftId) {
      steps.push({
        kind: 'tree',
        nodes: JSON.parse(JSON.stringify(nodes)),
        rootId: '1',
        activeNodeId: nodeId,
        visitedNodeIds: [...visitedNodeIds],
        traversalOrder: [...traversalOrder],
        action: 'branch-left',
        description: `Moving down to LEFT child (${nodes[curr.leftId].value}).`,
        stats: { current: curr.value },
        codeLine: 5,
      });
      traverse(curr.leftId);
    }

    // 3. Right
    if (curr.rightId) {
      steps.push({
        kind: 'tree',
        nodes: JSON.parse(JSON.stringify(nodes)),
        rootId: '1',
        activeNodeId: nodeId,
        visitedNodeIds: [...visitedNodeIds],
        traversalOrder: [...traversalOrder],
        action: 'branch-right',
        description: `Moving down to RIGHT child (${nodes[curr.rightId].value}).`,
        stats: { current: curr.value },
        codeLine: 6,
      });
      traverse(curr.rightId);
    }
  }

  traverse('1');

  steps.push({
    kind: 'tree',
    nodes: JSON.parse(JSON.stringify(nodes)),
    rootId: '1',
    visitedNodeIds: [...visitedNodeIds],
    traversalOrder: [...traversalOrder],
    action: 'complete',
    description: `Preorder Traversal complete! Order: [${traversalOrder.join(', ')}].`,
    stats: { visitedCount: traversalOrder.length },
    codeLine: 7,
  });

  return steps;
}
