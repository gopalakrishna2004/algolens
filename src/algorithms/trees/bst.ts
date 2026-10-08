import type { TreeStep, VisualTreeNode, AlgorithmMetadata } from '../types';

export const bstMetadata: AlgorithmMetadata = {
  id: 'bst',
  name: 'Binary Search Tree (BST)',
  category: 'trees',
  visualizationType: 'tree',
  difficulty: 'Intermediate',
  prerequisites: ['Binary Trees', 'Recursion', 'Binary Search Invariant'],
  timeComplexity: {
    best: 'O(log n) [Balanced]',
    average: 'O(log n)',
    worst: 'O(n) [Degenerate Skewed Tree]',
  },
  spaceComplexity: 'O(n)',
  description:
    'A binary tree data structure with the BST ordering invariant: for any given node, all elements in its left subtree are strictly smaller, and all elements in its right subtree are strictly greater.',
  keyIdea:
    'Binary Search on a tree! At every node, compare the target with node.val: if smaller go Left, if larger go Right. Reduces search space by half at each level if balanced.',
  whenToUse: [
    'Dynamic datasets requiring both rapid insertions and fast ordered lookups.',
    'Implementing sets and maps in standard libraries (e.g., C++ std::map, Java TreeMap).',
    'Range queries (finding all numbers between min and max).',
  ],
  limitations: [
    'Unbalanced insertions (e.g. sorted sequence 1,2,3,4) cause the tree to degrade into a linked list with O(n) search time.',
    'Requires self-balancing extensions (AVL or Red-Black trees) in production environments.',
  ],
  sourceCode: {
    c: `// BST Insert and Search in C
typedef struct Node {
    int val;
    struct Node *left, *right;
} Node;

Node* insert(Node* root, int val) {
    if (!root) {
        Node* n = (Node*)malloc(sizeof(Node));
        n->val = val; n->left = n->right = NULL;
        return n;
    }
    if (val < root->val) root->left = insert(root->left, val);
    else if (val > root->val) root->right = insert(root->right, val);
    return root;
}

Node* search(Node* root, int target) {
    if (!root || root->val == target) return root;
    if (target < root->val) return search(root->left, target);
    return search(root->right, target);
}`,
    typescript: `// BST in TypeScript
class BSTNode {
  val: number;
  left: BSTNode | null = null;
  right: BSTNode | null = null;
  constructor(val: number) { this.val = val; }
}

function search(root: BSTNode | null, target: number): BSTNode | null {
  if (!root || root.val === target) return root;
  return target < root.val ? search(root.left, target) : search(root.right, target);
}`,
  },
};

export function simulateBST(): TreeStep[] {
  const values = [50, 30, 70, 20, 40, 60, 80];
  const steps: TreeStep[] = [];
  const nodes: Record<string, VisualTreeNode> = {};

  function addNodeToTree(val: number) {
    const id = `node-${val}`;
    nodes[id] = { id, value: val, state: 'default' };

    if (Object.keys(nodes).length === 1) {
      steps.push({
        kind: 'tree',
        nodes: JSON.parse(JSON.stringify(nodes)),
        rootId: id,
        activeNodeId: id,
        action: 'insert-root',
        description: `Root node created with value ${val}.`,
        stats: { value: val, action: 'insert' },
        codeLine: 8,
      });
      return;
    }

    let currId = `node-${values[0]}`;
    while (currId) {
      const curr = nodes[currId];
      steps.push({
        kind: 'tree',
        nodes: JSON.parse(JSON.stringify(nodes)),
        rootId: `node-${values[0]}`,
        activeNodeId: currId,
        action: 'compare',
        description: `Comparing insert value ${val} with node ${curr.value}. ${val < curr.value ? `${val} < ${curr.value} ➔ Go LEFT` : `${val} > ${curr.value} ➔ Go RIGHT`}`,
        stats: { inserting: val, current: curr.value },
        codeLine: 13,
      });

      if (val < curr.value) {
        if (!curr.leftId) {
          curr.leftId = id;
          break;
        }
        currId = curr.leftId;
      } else {
        if (!curr.rightId) {
          curr.rightId = id;
          break;
        }
        currId = curr.rightId;
      }
    }

    steps.push({
      kind: 'tree',
      nodes: JSON.parse(JSON.stringify(nodes)),
      rootId: `node-${values[0]}`,
      activeNodeId: id,
      action: 'inserted',
      description: `Inserted node(${val}) into BST! Invariant preserved.`,
      stats: { inserted: val },
      codeLine: 14,
    });
  }

  for (const v of values) {
    addNodeToTree(v);
  }

  // Now simulate Searching for 60
  const searchTarget = 60;
  let sCurrId: string | undefined = `node-${values[0]}`;
  while (sCurrId) {
    const curr: VisualTreeNode = nodes[sCurrId];
    if (curr.value === searchTarget) {
      curr.state = 'visited';
      steps.push({
        kind: 'tree',
        nodes: JSON.parse(JSON.stringify(nodes)),
        rootId: `node-${values[0]}`,
        activeNodeId: sCurrId,
        action: 'found',
        description: `SEARCH(${searchTarget}): MATCH FOUND at node(${curr.value})!`,
        stats: { found: true, comparisons: 3, target: searchTarget },
        codeLine: 19,
      });
      break;
    }

    curr.state = 'comparing';
    const goLeft: boolean = searchTarget < curr.value;
    steps.push({
      kind: 'tree',
      nodes: JSON.parse(JSON.stringify(nodes)),
      rootId: `node-${values[0]}`,
      activeNodeId: sCurrId,
      action: 'search-step',
      description: `SEARCH(${searchTarget}): Comparing with node(${curr.value}). ${goLeft ? `${searchTarget} < ${curr.value} ➔ Branch LEFT` : `${searchTarget} > ${curr.value} ➔ Branch RIGHT`}.`,
      stats: { current: curr.value, target: searchTarget },
      codeLine: 20,
    });
    curr.state = 'default';
    sCurrId = goLeft ? curr.leftId : curr.rightId;
  }

  return steps;
}
