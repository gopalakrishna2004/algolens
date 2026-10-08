import type { TreeStep, VisualTreeNode, AlgorithmMetadata } from '../types';

export const postorderTraversalMetadata: AlgorithmMetadata = {
  id: 'postorder-traversal',
  name: 'Postorder Traversal (L-R-N)',
  category: 'trees',
  visualizationType: 'tree',
  difficulty: 'Beginner',
  prerequisites: ['Binary Trees', 'Recursion', 'Bottom-Up Evaluation'],
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  },
  spaceComplexity: 'O(h) [Recursion Stack]',
  description:
    'A depth-first traversal strategy that recursively explores the Left Subtree, then the Right Subtree, and finally visits the Current Node. Ideal for bottom-up operations like deleting trees or calculating subtree sizes.',
  keyIdea:
    'Left ➔ Right ➔ Root. Evaluates all children before visiting the parent. Essential for postfix expressions (Reverse Polish Notation) and garbage collection.',
  whenToUse: [
    'Deleting or deallocating a tree in C (children must be freed before parent).',
    'Bottom-up tree evaluations (computing height, subtree sizes, diameter).',
    'Postfix expression evaluation.',
  ],
  limitations: [
    'Parent nodes cannot be processed until both subtrees are completely resolved.',
  ],
  sourceCode: {
    c: `// Postorder Traversal in C
void postorder(TreeNode *root) {
    if (root == NULL) return;
    postorder(root->left);       // 1. Visit Left
    postorder(root->right);      // 2. Visit Right
    printf("%d ", root->val);    // 3. Visit Node
}`,
    typescript: `// Postorder in TypeScript
function postorder(root: TreeNode | null, result: number[] = []): number[] {
  if (!root) return result;
  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.val);
  return result;
}`,
  },
};

export function simulatePostorderTraversal(): TreeStep[] {
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
    description: 'Starting Postorder Traversal (Left ➔ Right ➔ Root).',
    stats: { visitedCount: 0 },
    codeLine: 2,
  });

  function traverse(nodeId?: string) {
    if (!nodeId || !nodes[nodeId]) return;
    const curr = nodes[nodeId];

    // 1. Recurse left
    if (curr.leftId) {
      steps.push({
        kind: 'tree',
        nodes: JSON.parse(JSON.stringify(nodes)),
        rootId: '1',
        activeNodeId: nodeId,
        visitedNodeIds: [...visitedNodeIds],
        traversalOrder: [...traversalOrder],
        action: 'go-left',
        description: `Descending to LEFT child of node(${curr.value}).`,
        stats: { current: curr.value },
        codeLine: 4,
      });
      traverse(curr.leftId);
    }

    // 2. Recurse right
    if (curr.rightId) {
      steps.push({
        kind: 'tree',
        nodes: JSON.parse(JSON.stringify(nodes)),
        rootId: '1',
        activeNodeId: nodeId,
        visitedNodeIds: [...visitedNodeIds],
        traversalOrder: [...traversalOrder],
        action: 'go-right',
        description: `Descending to RIGHT child of node(${curr.value}).`,
        stats: { current: curr.value },
        codeLine: 5,
      });
      traverse(curr.rightId);
    }

    // 3. Visit Root/Node last
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
      action: 'visit-node',
      description: `VISIT NODE(${curr.value}) after both subtrees are done! Output: [${traversalOrder.join(', ')}].`,
      stats: { current: curr.value, visitedCount: traversalOrder.length },
      codeLine: 6,
    });
  }

  traverse('1');

  steps.push({
    kind: 'tree',
    nodes: JSON.parse(JSON.stringify(nodes)),
    rootId: '1',
    visitedNodeIds: [...visitedNodeIds],
    traversalOrder: [...traversalOrder],
    action: 'complete',
    description: `Postorder Traversal complete! Order: [${traversalOrder.join(', ')}].`,
    stats: { visitedCount: traversalOrder.length },
    codeLine: 7,
  });

  return steps;
}
