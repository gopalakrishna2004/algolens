import type { TreeStep, VisualTreeNode, AlgorithmMetadata } from '../types';

export const binaryTreeMetadata: AlgorithmMetadata = {
  id: 'binary-tree',
  name: 'Binary Tree',
  category: 'trees',
  visualizationType: 'tree',
  difficulty: 'Beginner',
  prerequisites: ['Pointers', 'Dynamic Memory', 'Recursion'],
  timeComplexity: {
    best: 'O(1) [Root Access]',
    average: 'O(n) [Traverse / Find]',
    worst: 'O(n) [Traverse / Find]',
  },
  spaceComplexity: 'O(n)',
  description:
    'A hierarchical data structure in which each node has at most two children, referred to as the left child and right child. Forms the foundation of BSTs, Heaps, and expression trees.',
  keyIdea:
    'Hierarchical non-linear structure. Each parent node branches into at most two subtrees (left and right). Height of a balanced binary tree is O(log n).',
  whenToUse: [
    'Hierarchical parent-child relationships (DOM trees, folder structures).',
    'Expression parsing and Abstract Syntax Trees (ASTs) in compilers.',
    'Fast logarithmic search structures when balanced (BST, AVL, Red-Black).',
  ],
  limitations: [
    'Unbalanced binary trees degrade into linear linked lists (O(n) depth).',
    'Extra memory overhead for two child pointers per node.',
  ],
  sourceCode: {
    c: `// Binary Tree Node in C
typedef struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

TreeNode* createNode(int val) {
    TreeNode* node = (TreeNode*)malloc(sizeof(TreeNode));
    node->val = val;
    node->left = NULL;
    node->right = NULL;
    return node;
}

int countNodes(TreeNode* root) {
    if (!root) return 0;
    return 1 + countNodes(root->left) + countNodes(root->right);
}`,
    typescript: `// Binary Tree Node in TypeScript
class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val: number) { this.val = val; }
}`,
  },
};

export function buildBinaryTree(): TreeStep[] {
  const nodes: Record<string, VisualTreeNode> = {
    '1': { id: '1', value: 1, state: 'default' },
  };

  const steps: TreeStep[] = [];

  steps.push({
    kind: 'tree',
    nodes: { ...nodes },
    rootId: '1',
    activeNodeId: '1',
    action: 'create-root',
    description: 'Created Root node with value 1.',
    stats: { totalNodes: 1, height: 1 },
    codeLine: 8,
  });

  // Attach Left Child: 2
  nodes['2'] = { id: '2', value: 2, state: 'default' };
  nodes['1'].leftId = '2';
  steps.push({
    kind: 'tree',
    nodes: { ...nodes },
    rootId: '1',
    activeNodeId: '2',
    action: 'add-left',
    description: 'Attached Left Child node(2) to Root(1).',
    stats: { totalNodes: 2, height: 2 },
    codeLine: 12,
  });

  // Attach Right Child: 3
  nodes['3'] = { id: '3', value: 3, state: 'default' };
  nodes['1'].rightId = '3';
  steps.push({
    kind: 'tree',
    nodes: { ...nodes },
    rootId: '1',
    activeNodeId: '3',
    action: 'add-right',
    description: 'Attached Right Child node(3) to Root(1).',
    stats: { totalNodes: 3, height: 2 },
    codeLine: 13,
  });

  // Attach children to Node 2: 4 and 5
  nodes['4'] = { id: '4', value: 4, state: 'default' };
  nodes['2'].leftId = '4';
  steps.push({
    kind: 'tree',
    nodes: { ...nodes },
    rootId: '1',
    activeNodeId: '4',
    action: 'add-left',
    description: 'Attached Left Child node(4) to Node(2).',
    stats: { totalNodes: 4, height: 3 },
    codeLine: 12,
  });

  nodes['5'] = { id: '5', value: 5, state: 'default' };
  nodes['2'].rightId = '5';
  steps.push({
    kind: 'tree',
    nodes: { ...nodes },
    rootId: '1',
    activeNodeId: '5',
    action: 'add-right',
    description: 'Attached Right Child node(5) to Node(2).',
    stats: { totalNodes: 5, height: 3 },
    codeLine: 13,
  });

  // Attach children to Node 3: 6 and 7
  nodes['6'] = { id: '6', value: 6, state: 'default' };
  nodes['3'].leftId = '6';
  steps.push({
    kind: 'tree',
    nodes: { ...nodes },
    rootId: '1',
    activeNodeId: '6',
    action: 'add-left',
    description: 'Attached Left Child node(6) to Node(3).',
    stats: { totalNodes: 6, height: 3 },
    codeLine: 12,
  });

  nodes['7'] = { id: '7', value: 7, state: 'default' };
  nodes['3'].rightId = '7';
  steps.push({
    kind: 'tree',
    nodes: { ...nodes },
    rootId: '1',
    activeNodeId: '7',
    action: 'add-right',
    description: 'Attached Right Child node(7) to Node(3). Complete binary tree formed.',
    stats: { totalNodes: 7, height: 3 },
    codeLine: 13,
  });

  return steps;
}
