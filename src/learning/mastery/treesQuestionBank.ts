import type { MasteryQuestion } from '../types';

/**
 * 45 Reviewed Mastery Questions for Chapter 04: Trees.
 *
 * Covers all 5 registered Tree topics (9 questions each: 3 Easy, 3 Medium, 3 Hard):
 * 1. binary-tree (Binary Tree Structure & Properties)
 * 2. bst (Binary Search Tree Operations & Invariants)
 * 3. inorder-traversal (Inorder Traversal: Left-Root-Right)
 * 4. preorder-traversal (Preorder Traversal: Root-Left-Right)
 * 5. postorder-traversal (Postorder Traversal: Left-Right-Root)
 */
export const TREES_QUESTION_BANK: MasteryQuestion[] = [
  // ==========================================
  // TOPIC 1: BINARY TREE (binary-tree)
  // ==========================================

  // --- Binary Tree: Easy ---
  {
    id: 'q-binary-tree-easy-01',
    algoId: 'binary-tree',
    tier: 'easy',
    concept: 'Binary Tree Definition & Branching Factor',
    prompt: 'What fundamental structural constraint defines a Binary Tree data structure?',
    options: [
      {
        id: 'opt-a',
        label: 'Each node in the tree has at most two children, conventionally designated as the left child and the right child.',
        explanation: 'Correct! By definition, a binary tree restricts the out-degree (branching factor) of every node to at most 2.',
      },
      {
        id: 'opt-b',
        label: 'Each node must contain exactly two children; leaf nodes are forbidden in valid binary trees.',
        explanation: 'Incorrect. Nodes can have 0, 1, or 2 children; leaf nodes have 0 children.',
      },
      {
        id: 'opt-c',
        label: 'All left child values must be negative numbers and all right child values must be positive numbers.',
        explanation: 'Incorrect. Node data values are arbitrary and do not dictate binary tree structure.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'A binary tree is a hierarchical node collection where every node has a degree of at most 2. Each child is distinguished as either a left child or a right child, establishing an ordered branching structure.',
  },
  {
    id: 'q-binary-tree-easy-02',
    algoId: 'binary-tree',
    tier: 'easy',
    concept: 'Node Depth vs Tree Height',
    prompt: 'In standard computer science terminology, what is the difference between the depth of a node and the height of a tree?',
    options: [
      {
        id: 'opt-a',
        label: 'Depth is the number of edges along the path from the root down to that node; height is the maximum number of edges from the root down to any leaf.',
        explanation: 'Correct! Depth measures distance from the root downward; height measures the maximum downward distance to a leaf (tree height is the height of the root).',
      },
      {
        id: 'opt-b',
        label: 'Depth is the total number of leaves in the tree; height is the total number of internal nodes.',
        explanation: 'Incorrect. Depth and height are path-length distance metrics, not node counts.',
      },
      {
        id: 'opt-c',
        label: 'Depth is measured in bytes; height is measured in CPU clock cycles.',
        explanation: 'Incorrect. Both metrics measure graph path lengths (number of edges or levels).',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The depth of a node is the length of the unique path from the root to that node (root depth = 0). The height of a node is the length of the longest path from that node to a descendant leaf. The height of the entire tree is the height of its root.',
  },
  {
    id: 'q-binary-tree-easy-03',
    algoId: 'binary-tree',
    tier: 'easy',
    concept: 'Full vs Complete vs Perfect Binary Trees',
    prompt: 'Which description correctly defines a Complete Binary Tree?',
    options: [
      {
        id: 'opt-a',
        label: 'Every level is completely filled except possibly the last level, and all nodes on the last level are packed as far left as possible without gaps.',
        explanation: 'Correct! A complete binary tree fills all levels completely except possibly the last, which is filled sequentially from left to right.',
      },
      {
        id: 'opt-b',
        label: 'Every node in the tree has either 0 or 2 children, with no single-child nodes allowed anywhere.',
        explanation: 'Incorrect. Having 0 or 2 children defines a Full (or Proper) Binary Tree, not a Complete Binary Tree.',
      },
      {
        id: 'opt-c',
        label: 'All leaf nodes are at the same depth and every internal node has exactly 2 children.',
        explanation: 'Incorrect. This defines a Perfect Binary Tree.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'A Complete Binary Tree fills levels 0 through h - 1 completely. On the final level h, all leaves reside contiguously from left to right. This structural invariant allows complete binary trees to be stored compactly in contiguous arrays without pointer overhead (as in binary heaps).',
  },

  // --- Binary Tree: Medium ---
  {
    id: 'q-binary-tree-med-01',
    algoId: 'binary-tree',
    tier: 'medium',
    concept: 'Maximum Node Capacity at Depth and Height',
    prompt: 'For a binary tree of height h (where the root has depth 0), what is the maximum number of nodes the tree can contain?',
    options: [
      {
        id: 'opt-a',
        label: '2^(h + 1) - 1 nodes total, with at most 2^d nodes residing at depth d.',
        explanation: 'Correct! At depth d there are at most 2^d nodes. Summing the geometric series sum_{d=0}^h 2^d gives 2^(h+1) - 1 nodes.',
      },
      {
        id: 'opt-b',
        label: '2 * h nodes total, with at most h nodes at any level.',
        explanation: 'Incorrect. Binary branching grows exponentially with height, not linearly.',
      },
      {
        id: 'opt-c',
        label: 'h^2 nodes total, with 2h nodes at the leaf level.',
        explanation: 'Incorrect. Tree capacity is a base-2 exponential function.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'At depth d, a binary tree can hold at most 2^d nodes (depth 0 has 1, depth 1 has 2, depth 2 has 4, etc.). Summing across all levels from 0 to h: sum_{i=0}^h 2^i = 2^(h+1) - 1. A tree achieving this upper bound is a Perfect Binary Tree.',
  },
  {
    id: 'q-binary-tree-med-02',
    algoId: 'binary-tree',
    tier: 'medium',
    concept: 'Height Bounds on n Nodes',
    prompt: 'Given an arbitrary binary tree with n nodes, what are the theoretical minimum and maximum possible tree heights (measured in edges, where a single-node tree has height 0)?',
    options: [
      {
        id: 'opt-a',
        label: 'Minimum height is floor(log2(n)) (when completely balanced); maximum height is n - 1 (when degenerated into a linear skewed chain).',
        explanation: 'Correct! Packing nodes densely yields logarithmic height floor(log2(n)); chaining nodes in a single line yields linear height n - 1.',
      },
      {
        id: 'opt-b',
        label: 'Minimum height is 1; maximum height is log2(n) for all binary trees.',
        explanation: 'Incorrect. Height can degrade to n - 1 if the tree is unbalanced.',
      },
      {
        id: 'opt-c',
        label: 'Minimum height is n / 2; maximum height is 2n.',
        explanation: 'Incorrect. Height cannot exceed n - 1 because each edge connects two distinct nodes.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The best-case height occurs when nodes are packed as densely as possible into a complete binary tree: n <= 2^(h+1) - 1 ==> h >= ceil(log2(n + 1)) - 1 = floor(log2 n). The worst-case occurs when every node has only 1 child (a degenerate or pathological tree), stretching the height to n - 1.',
  },
  {
    id: 'q-binary-tree-med-03',
    algoId: 'binary-tree',
    tier: 'medium',
    concept: 'Recursive Size (Node Count) Computation',
    codeContext: {
      language: 'c',
      code: 'int countNodes(TreeNode *root) {\n    if (root == NULL) return 0;\n    return 1 + countNodes(root->left) + countNodes(root->right);\n}',
    },
    prompt: 'What are the time and auxiliary space complexities of the recursive countNodes function above on a tree with n nodes and height h?',
    options: [
      {
        id: 'opt-a',
        label: 'Time complexity is O(n) because every node is visited once; auxiliary space is O(h) on the call stack.',
        explanation: 'Correct! The recursion visits all n nodes in O(n) time. The call stack depth equals the tree height h (O(log n) balanced, O(n) skewed).',
      },
      {
        id: 'opt-b',
        label: 'Time complexity is O(log n); auxiliary space is O(1).',
        explanation: 'Incorrect. Counting all nodes requires visiting every node, taking O(n) time.',
      },
      {
        id: 'opt-c',
        label: 'Time complexity is O(n²); auxiliary space is O(n²).',
        explanation: 'Incorrect. Each node is visited exactly once, preventing quadratic execution.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The function divides the counting problem into independent left and right subproblems. Every node in the tree is reached by exactly one call frame, taking Theta(n) time. The maximum call stack depth corresponds to the maximum downward recursion depth, which is the height of the tree h (O(log n) best, O(n) worst).',
  },

  // --- Binary Tree: Hard ---
  {
    id: 'q-binary-tree-hard-01',
    algoId: 'binary-tree',
    tier: 'hard',
    concept: 'Call Stack Memory & Degenerate Skewed Trees',
    prompt: 'Why does calculating the height or size of a binary tree using standard recursion risk a stack overflow crash on large trees in C, and how does tree shape influence this risk?',
    options: [
      {
        id: 'opt-a',
        label: 'If the tree is degenerate (skewed like a linked list), height h equals n - 1, creating n recursive activation records on the program call stack which can exceed the OS thread stack quota.',
        explanation: 'Correct! Unbalanced trees produce linear recursion depth O(n). For large n, this exhausts fixed thread stack memory (typically 1–8 MB), causing a crash.',
      },
      {
        id: 'opt-b',
        label: 'Because C requires all binary tree nodes to be allocated on the stack rather than the heap.',
        explanation: 'Incorrect. Nodes are allocated on the heap; function call frames reside on the stack.',
      },
      {
        id: 'opt-c',
        label: 'Because recursion triggers floating-point register corruption on binary tree pointers.',
        explanation: 'Incorrect. Pointers are integer memory addresses.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In balanced binary trees, maximum recursion stack depth is O(log n), which is negligible (e.g. height <= 30 for 1,000,000,000 nodes). However, if elements were inserted in sorted order into an unbalancing structure, the tree degenerates into a linear chain of height n. A recursive function on 100,000 nodes creates 100,000 stack frames, blowing past typical 1 MB stack limits.',
  },
  {
    id: 'q-binary-tree-hard-02',
    algoId: 'binary-tree',
    tier: 'hard',
    concept: 'Lowest Common Ancestor (LCA) in General Binary Tree',
    codeContext: {
      language: 'c',
      code: 'TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n    if (root == NULL || root == p || root == q) return root;\n    TreeNode* left = lowestCommonAncestor(root->left, p, q);\n    TreeNode* right = lowestCommonAncestor(root->right, p, q);\n    if (left != NULL && right != NULL) return root;\n    return left != NULL ? left : right;\n}',
    },
    prompt: 'In the bottom-up LCA algorithm above for a general binary tree, what condition proves that root is the Lowest Common Ancestor of nodes p and q?',
    options: [
      {
        id: 'opt-a',
        label: 'When both left and right recursive calls return non-NULL, proving that p and q reside in separate subtrees branched beneath root.',
        explanation: 'Correct! If one target is found in the left subtree and the other in the right subtree, current root is their lowest common meeting point.',
      },
      {
        id: 'opt-b',
        label: 'When left is NULL and right is NULL, proving both nodes have been eliminated.',
        explanation: 'Incorrect. If both are NULL, neither p nor q exists in subtrees below root.',
      },
      {
        id: 'opt-c',
        label: 'When root->val equals (p->val + q->val) / 2.',
        explanation: 'Incorrect. General binary trees make no value-averaging assumptions.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The algorithm performs a post-order traversal. A node returns non-NULL if it matches p, matches q, or is an ancestor of either. If for some node `root`, both `left != NULL` and `right != NULL`, it means one target is in its left subtree and the other is in its right subtree. Therefore, `root` is their Lowest Common Ancestor. Runs in O(n) time and O(h) space.',
  },
  {
    id: 'q-binary-tree-hard-03',
    algoId: 'binary-tree',
    tier: 'hard',
    concept: 'Diameter of a Binary Tree',
    prompt: 'Why does the diameter (longest path between any two nodes) of a binary tree NOT necessarily pass through the root node?',
    options: [
      {
        id: 'opt-a',
        label: 'The longest path may reside entirely within either the left subtree or right subtree if one subtree is substantially deeper and wider than the rest of the tree.',
        explanation: 'Correct! A deep, sprawling subtree can contain two distant leaves whose interconnecting path never ascends to the global root.',
      },
      {
        id: 'opt-b',
        label: 'Because binary trees forbid paths that contain the root node.',
        explanation: 'Incorrect. Paths can freely pass through the root.',
      },
      {
        id: 'opt-c',
        label: 'Because the diameter is defined strictly as the depth of the root minus 1.',
        explanation: 'Incorrect. Diameter is the maximum edge (or node) count between any two nodes in the tree.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The diameter of a binary tree is the length of the longest path between any two arbitrary nodes. While the longest path passing through node X has length height(X.left) + height(X.right), the maximum such value across all nodes in the tree might occur at an internal node deep in a lopsided subtree rather than the global root.',
  },

  // ==========================================
  // TOPIC 2: BINARY SEARCH TREE (bst)
  // ==========================================

  // --- BST: Easy ---
  {
    id: 'q-bst-easy-01',
    algoId: 'bst',
    tier: 'easy',
    concept: 'BST Ordering Invariant',
    prompt: 'What ordering invariant must hold for every node X in a valid Binary Search Tree (BST)?',
    options: [
      {
        id: 'opt-a',
        label: 'All values in the left subtree of X are strictly less than X.val, and all values in the right subtree of X are strictly greater than X.val.',
        explanation: 'Correct! This recursive invariant holds across all nodes in the respective subtrees, not just immediate children.',
      },
      {
        id: 'opt-b',
        label: 'The left child of X must be even and the right child of X must be odd.',
        explanation: 'Incorrect. Parity of values is irrelevant to BST ordering.',
      },
      {
        id: 'opt-c',
        label: 'X.val must equal the sum of its left and right child values.',
        explanation: 'Incorrect. A BST orders elements by magnitude, not arithmetic sums.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The BST invariant states that for every node X: (1) every node in X\'s left subtree has key < X.key; (2) every node in X\'s right subtree has key > X.key (assuming distinct keys). This property enables binary search pruning on tree traversals.',
  },
  {
    id: 'q-bst-easy-02',
    algoId: 'bst',
    tier: 'easy',
    concept: 'Search Traversal Pruning',
    prompt: 'When searching for target value T in a BST starting at node curr, what decision rule is executed?',
    options: [
      {
        id: 'opt-a',
        label: 'If T == curr.val, found; if T < curr.val, search left child; if T > curr.val, search right child; if curr is NULL, target does not exist.',
        explanation: 'Correct! At each step, comparing T with curr.val eliminates an entire subtree from the search.',
      },
      {
        id: 'opt-b',
        label: 'Search both left and right subtrees concurrently on every step.',
        explanation: 'Incorrect. Searching both subtrees defeats the purpose of the BST invariant and takes O(n) time.',
      },
      {
        id: 'opt-c',
        label: 'Always search right first; if not found, restart the search at the root and search left.',
        explanation: 'Incorrect. BST search makes deterministic left or right choices based on value comparisons.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Because all values smaller than curr reside in its left subtree and larger values in its right subtree, a single comparison with curr.val directs the search down exactly one branch. This prunes half the remaining tree at each step in a balanced BST.',
  },
  {
    id: 'q-bst-easy-03',
    algoId: 'bst',
    tier: 'easy',
    concept: 'Locating Extremum Values (Min and Max)',
    prompt: 'How are the minimum and maximum values located in a non-empty Binary Search Tree?',
    options: [
      {
        id: 'opt-a',
        label: 'The minimum is found by starting at the root and following left pointers until left is NULL; the maximum by following right pointers until right is NULL.',
        explanation: 'Correct! By the BST property, smaller elements always branch left, placing the minimum at the leftmost node (and maximum at the rightmost).',
      },
      {
        id: 'opt-b',
        label: 'The minimum is always the root node, and the maximum is always the deepest leaf node.',
        explanation: 'Incorrect. Root is the minimum only in a Min-Heap, not a BST.',
      },
      {
        id: 'opt-c',
        label: 'Both minimum and maximum require scanning all n nodes using breadth-first search.',
        explanation: 'Incorrect. Finding min and max takes O(h) time by following extreme branch pointers.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'By the BST invariant, any node\'s left descendant has a smaller key. Thus, repeatedly traversing `curr = curr->left` until `curr->left == NULL` locates the absolute minimum in O(h) time. Symmetrically, following `curr->right` finds the maximum.',
  },

  // --- BST: Medium ---
  {
    id: 'q-bst-med-01',
    algoId: 'bst',
    tier: 'medium',
    concept: 'Average O(log n) vs Worst-Case O(n) Complexity',
    prompt: 'Under what input condition does a naive Binary Search Tree degrade to its worst-case time complexity of O(n) for search and insert operations?',
    options: [
      {
        id: 'opt-a',
        label: 'When keys are inserted in strictly sorted or reverse-sorted order, causing each new node to attach as a single child and forming a degenerate linear chain of height n.',
        explanation: 'Correct! Inserting sorted keys (e.g. 1, 2, 3, 4, 5) creates a tree with only right children, degrading search and insertion to linear O(n) scans.',
      },
      {
        id: 'opt-b',
        label: 'When keys are inserted in completely random order.',
        explanation: 'Incorrect. Random insertions produce balanced trees of expected height O(log n).',
      },
      {
        id: 'opt-c',
        label: 'When all inserted keys are prime numbers.',
        explanation: 'Incorrect. Numerical properties like primality do not affect tree balance.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In a naive BST without rebalancing logic, inserting keys in monotonically increasing sequence [1, 2, 3, 4, 5] causes every node to become the right child of its predecessor. The resulting tree is isomorphic to a singly linked list with height n - 1, degrading search, insertion, and deletion to O(n).',
  },
  {
    id: 'q-bst-med-02',
    algoId: 'bst',
    tier: 'medium',
    concept: 'Insertion Position & Tree Mutability',
    prompt: 'In a standard Binary Search Tree, where is a newly inserted key always placed?',
    options: [
      {
        id: 'opt-a',
        label: 'As a newly allocated leaf node at the exact terminal NULL position where a search for that key terminates.',
        explanation: 'Correct! Standard BST insertion traverses until finding the NULL child slot where the key belongs, attaching it as a new leaf without moving existing nodes.',
      },
      {
        id: 'opt-b',
        label: 'Directly at the root node, pushing all existing nodes down by one level.',
        explanation: 'Incorrect. Standard insertion places elements at leaf positions, not at the root.',
      },
      {
        id: 'opt-c',
        label: 'At the leftmost leaf unconditionally, regardless of its numerical value.',
        explanation: 'Incorrect. Placement depends on comparison with ancestor node keys.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Standard BST insertion is non-intrusive: existing nodes retain their positions and links. The algorithm traverses downward comparing the key with existing nodes until a `NULL` link is encountered, attaching the new node as a leaf at that slot in O(h) time.',
  },
  {
    id: 'q-bst-med-03',
    algoId: 'bst',
    tier: 'medium',
    concept: 'Inorder Successor Determination',
    prompt: 'How is the Inorder Successor of a node X determined in a Binary Search Tree when X has a non-empty right subtree?',
    options: [
      {
        id: 'opt-a',
        label: 'It is the minimum node in X\'s right subtree (the leftmost node reachable from X->right).',
        explanation: 'Correct! The smallest key strictly greater than X in an inorder traversal is the minimum element of X\'s right subtree.',
      },
      {
        id: 'opt-b',
        label: 'It is the maximum node in X\'s left subtree.',
        explanation: 'Incorrect. The maximum of the left subtree is X\'s inorder predecessor.',
      },
      {
        id: 'opt-c',
        label: 'It is X\'s immediate parent node unconditionally.',
        explanation: 'Incorrect. If X has a right subtree, the successor resides inside that right subtree, not at X\'s parent.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The inorder successor of X is the node with the smallest key strictly greater than X.key. If X has a right subtree, all elements greater than X reside in that right subtree, and the smallest among them is the leftmost descendant (`min(X->right)`).',
  },

  // --- BST: Hard ---
  {
    id: 'q-bst-hard-01',
    algoId: 'bst',
    tier: 'hard',
    concept: 'Hibbard Deletion with Two Children',
    prompt: 'When deleting a node Z that has two non-empty children from a BST, what procedure preserves the BST invariant?',
    options: [
      {
        id: 'opt-a',
        label: 'Find Z\'s inorder successor Y (minimum of right subtree), copy Y\'s value into Z, and then delete Y from the right subtree (where Y is guaranteed to have at most one child).',
        explanation: 'Correct! Hibbard deletion replaces Z with its successor Y (which has no left child), reducing the two-child deletion to a trivial 0-or-1-child deletion.',
      },
      {
        id: 'opt-b',
        label: 'Delete Z immediately and connect Z\'s left child directly to Z\'s right child.',
        explanation: 'Incorrect. Connecting children directly destroys the binary branching structure.',
      },
      {
        id: 'opt-c',
        label: 'Promote Z\'s left child to the root of the entire tree and discard Z\'s right subtree.',
        explanation: 'Incorrect. Discarding subtrees loses valid data.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Deleting a node with 2 children cannot be done by simple pointer rewiring. Hibbard\'s algorithm replaces Z with its inorder successor Y (the smallest node in Z\'s right subtree). Because Y is the minimum of the right subtree, Y has no left child (`Y->left == NULL`). We overwrite Z.val with Y.val and safely delete Y, which has at most 1 child.',
  },
  {
    id: 'q-bst-hard-02',
    algoId: 'bst',
    tier: 'hard',
    concept: 'Global Range Validation vs Local Checks',
    prompt: 'Why is verifying left->val < root->val < right->val at every node locally INSUFFICIENT to prove that a binary tree is a valid BST?',
    options: [
      {
        id: 'opt-a',
        label: 'Local checks only test immediate children; a node in the right subtree could have a value smaller than an ancestor higher up in the tree (e.g. root 10 with right child 15 whose left child is 6).',
        explanation: 'Correct! A valid BST requires every node in the right subtree to exceed all ancestors for which it is a right descendant. Range checking requires [min, max] bounds.',
      },
      {
        id: 'opt-b',
        label: 'Because BSTs only enforce ordering between sibling nodes, not parent-child nodes.',
        explanation: 'Incorrect. BSTs enforce strict subtree-wide parent-child ordering.',
      },
      {
        id: 'opt-c',
        label: 'Because local pointer comparisons invoke undefined behavior in C compilers.',
        explanation: 'Incorrect. Value comparisons are completely defined in C.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Consider a tree: Root = 10, Right = 15, and 15\'s Left child = 6. Locally at 15: 6 < 15 is valid. But globally, 6 is in the right subtree of 10, which violates the BST invariant (all nodes in 10\'s right subtree must be > 10). Correct validation must enforce global range constraints: `isValid(node, min, max)` where left child must satisfy `(min, node.val)` and right child `(node.val, max)`.',
  },
  {
    id: 'q-bst-hard-03',
    algoId: 'bst',
    tier: 'hard',
    concept: 'Self-Balancing Invariants (AVL vs Red-Black)',
    prompt: 'How do self-balancing search trees (such as AVL trees and Red-Black trees) guarantee O(log n) worst-case search complexity where naive BSTs fail?',
    options: [
      {
        id: 'opt-a',
        label: 'They enforce strict structural balancing invariants (e.g. AVL height difference <= 1; Red-Black color rules) and restore them using O(1) tree rotations during insertions and deletions.',
        explanation: 'Correct! Tree rotations restructure local pointers in O(1) time without altering inorder sequence, keeping tree height bounded by O(log n).',
      },
      {
        id: 'opt-b',
        label: 'They rebuild the entire tree from scratch into an array on every insertion.',
        explanation: 'Incorrect. Rebuilding from scratch takes O(n) time per insert.',
      },
      {
        id: 'opt-c',
        label: 'They replace pointer links with CPU cache registers that execute search in O(1) time.',
        explanation: 'Incorrect. Self-balancing trees remain pointer-based data structures.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'To prevent degenerate O(n) degradation, balanced trees augment nodes with balance metadata (AVL balance factor or Red-Black node colors). When an insertion or deletion violates balance criteria, local tree rotations (Left-Rotate, Right-Rotate) reconfigure pointers in O(1) time while preserving the BST inorder key ordering, strictly guaranteeing height h = O(log n).',
  },

  // ==========================================
  // TOPIC 3: INORDER TRAVERSAL (inorder-traversal)
  // ==========================================

  // --- Inorder Traversal: Easy ---
  {
    id: 'q-inorder-traversal-easy-01',
    algoId: 'inorder-traversal',
    tier: 'easy',
    concept: 'Left-Node-Right Recursive Discipline',
    prompt: 'In what exact operational sequence does an Inorder Traversal visit a binary tree node and its subtrees?',
    options: [
      {
        id: 'opt-a',
        label: 'Recursively traverse the Left subtree, visit the Current Node, and recursively traverse the Right subtree (L-N-R).',
        explanation: 'Correct! Inorder follows Left -> Node -> Right.',
      },
      {
        id: 'opt-b',
        label: 'Visit the Current Node first, traverse Left subtree, then Right subtree (N-L-R).',
        explanation: 'Incorrect. Node -> Left -> Right describes Preorder traversal.',
      },
      {
        id: 'opt-c',
        label: 'Traverse Left subtree, traverse Right subtree, and visit Current Node last (L-R-N).',
        explanation: 'Incorrect. Left -> Right -> Node describes Postorder traversal.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Inorder traversal is a depth-first search strategy where the current node is visited strictly between its left and right subtrees: (1) recursively visit left child; (2) process current node; (3) recursively visit right child.',
  },
  {
    id: 'q-inorder-traversal-easy-02',
    algoId: 'inorder-traversal',
    tier: 'easy',
    concept: 'BST Inorder Sorted Property',
    prompt: 'What unique property results when an Inorder Traversal is performed on a valid Binary Search Tree (BST)?',
    options: [
      {
        id: 'opt-a',
        label: 'Nodes are visited in strictly ascending, non-decreasing sorted order of their keys.',
        explanation: 'Correct! Because Left < Node < Right in a BST, an L-N-R traversal visits elements in perfectly sorted order.',
      },
      {
        id: 'opt-b',
        label: 'Nodes are visited in strictly descending order of their keys.',
        explanation: 'Incorrect. Ascending order is produced. Descending order requires reverse inorder (Right-Node-Left).',
      },
      {
        id: 'opt-c',
        label: 'Nodes are visited grouped by their depth level from top to bottom.',
        explanation: 'Incorrect. Level-by-level visiting describes Breadth-First Search (Level Order).',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In a BST, all keys in the left subtree are smaller than the root, and all keys in the right subtree are larger. Because Inorder visits Left, then Root, then Right, it processes every smaller key before the root, and the root before every larger key, yielding keys in sorted order.',
  },
  {
    id: 'q-inorder-traversal-easy-03',
    algoId: 'inorder-traversal',
    tier: 'easy',
    concept: 'Time and Space Complexity',
    prompt: 'What are the time and auxiliary space complexities of recursive inorder traversal on a tree with n nodes and height h?',
    options: [
      {
        id: 'opt-a',
        label: 'Time complexity is O(n); auxiliary space complexity is O(h) on the call stack.',
        explanation: 'Correct! Every node is visited once (O(n)), and call stack depth equals tree height h.',
      },
      {
        id: 'opt-b',
        label: 'Time complexity is O(log n); auxiliary space complexity is O(1).',
        explanation: 'Incorrect. Traversing all nodes requires O(n) visits.',
      },
      {
        id: 'opt-c',
        label: 'Time complexity is O(n²); auxiliary space complexity is O(n²).',
        explanation: 'Incorrect. The traversal makes exactly 2 recursive calls per node, running in linear time.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Every node in the tree is visited exactly once, taking Theta(n) time. The space complexity is determined by the maximum depth of the recursive call stack, which equals the tree height h: O(log n) for a balanced tree, and O(n) for a skewed tree.',
  },

  // --- Inorder Traversal: Medium ---
  {
    id: 'q-inorder-traversal-med-01',
    algoId: 'inorder-traversal',
    tier: 'medium',
    concept: 'Step-by-Step Traversal Tracing',
    prompt: 'Given a BST with root 50, left child 30 (which has left child 20 and right child 40), and right child 70, what is the exact output sequence of an inorder traversal?',
    options: [
      {
        id: 'opt-a',
        label: '20, 30, 40, 50, 70',
        explanation: 'Correct! Trace: left subtree of 50 -> left subtree of 30 (20) -> 30 -> right child of 30 (40) -> 50 -> right child of 50 (70).',
      },
      {
        id: 'opt-b',
        label: '50, 30, 20, 40, 70',
        explanation: 'Incorrect. This sequence represents a preorder traversal (Node-Left-Right).',
      },
      {
        id: 'opt-c',
        label: '20, 40, 30, 70, 50',
        explanation: 'Incorrect. This sequence represents a postorder traversal (Left-Right-Node).',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Tracing L-N-R: Start at 50, recurse left to 30, recurse left to 20. 20 has no children -> visit 20. Return to 30 -> visit 30. Recurse to 30\'s right child 40 -> visit 40. Return to 50 -> visit 50. Recurse to 50\'s right child 70 -> visit 70. Output: [20, 30, 40, 50, 70].',
  },
  {
    id: 'q-inorder-traversal-med-02',
    algoId: 'inorder-traversal',
    tier: 'medium',
    concept: 'Iterative Traversal using an Explicit Stack',
    codeContext: {
      language: 'c',
      code: 'void iterativeInorder(TreeNode* root) {\n    TreeNode* curr = root;\n    while (curr != NULL || !isEmpty(stack)) {\n        while (curr != NULL) {\n            push(stack, curr);\n            curr = curr->left;\n        }\n        curr = pop(stack);\n        printf("%d ", curr->val);\n        curr = curr->right;\n    }\n}',
    },
    prompt: 'In the iterative inorder traversal algorithm above, what does the inner while (curr != NULL) loop accomplish?',
    options: [
      {
        id: 'opt-a',
        label: 'It pushes the current node and all its left descendants onto the stack, drilling down to the leftmost unvisited node in the current subtree.',
        explanation: 'Correct! Inorder requires visiting the leftmost leaf before any ancestors; the inner loop pushes the entire left spine onto the stack.',
      },
      {
        id: 'opt-b',
        label: 'It searches the tree for negative numbers and deletes them.',
        explanation: 'Incorrect. The algorithm traverses nodes without modifying or deleting values.',
      },
      {
        id: 'opt-c',
        label: 'It reverses all right pointers in the tree to simulate a circular queue.',
        explanation: 'Incorrect. Standard iterative traversal does not mutate tree pointers.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'To simulate recursion explicitly, the algorithm pushes nodes along the left spine (`curr = curr->left`) until reaching `NULL`. When it cannot go left further, the top of the stack is the leftmost unvisited node. Popping it visits the node, and assigning `curr = curr->right` shifts the traversal to its right subtree.',
  },
  {
    id: 'q-inorder-traversal-med-03',
    algoId: 'inorder-traversal',
    tier: 'medium',
    concept: 'K-th Smallest Element in a BST',
    prompt: 'How can an Inorder Traversal be adapted to find the k-th smallest element in a BST in O(h + k) time without sorting an external array?',
    options: [
      {
        id: 'opt-a',
        label: 'Perform an inorder traversal with a counter; decrement or count up on each node visit, and return immediately when the count reaches k.',
        explanation: 'Correct! Because inorder visits nodes in ascending order, the k-th visited node is mathematically guaranteed to be the k-th smallest element.',
      },
      {
        id: 'opt-b',
        label: 'Perform a postorder traversal and select the node at index n - k.',
        explanation: 'Incorrect. Postorder does not process elements in sorted order.',
      },
      {
        id: 'opt-c',
        label: 'Traverse all nodes into an array and sort the array with Quicksort in O(n log n) time.',
        explanation: 'Incorrect. Re-sorting is redundant because inorder traversal already yields sorted order.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Because inorder traversal visits BST keys in monotonic ascending order, the k-th node visited during the traversal is the k-th smallest element. Maintaining an integer counter and terminating as soon as `count == k` finds the target in O(h + k) time without buffering all n elements.',
  },

  // --- Inorder Traversal: Hard ---
  {
    id: 'q-inorder-traversal-hard-01',
    algoId: 'inorder-traversal',
    tier: 'hard',
    concept: 'Morris Inorder Traversal (O(1) Space)',
    prompt: 'How does Morris Inorder Traversal achieve O(n) time complexity using strictly O(1) auxiliary space without recursion or an explicit stack?',
    options: [
      {
        id: 'opt-a',
        label: 'It establishes temporary "threads" by pointing the right pointer of a node\'s inorder predecessor to the node itself, traversing back up the tree and removing the threads on the second visit.',
        explanation: 'Correct! Morris traversal temporarily threads predecessor nodes to eliminate stack storage, restoring original pointers on the second pass in O(n) total time.',
      },
      {
        id: 'opt-b',
        label: 'It encodes the call stack into the unused floating-point registers of the CPU.',
        explanation: 'Incorrect. Morris traversal relies purely on tree pointer modifications, not CPU registers.',
      },
      {
        id: 'opt-c',
        label: 'It converts the entire tree into an array before starting the traversal.',
        explanation: 'Incorrect. An array requires O(n) auxiliary memory, violating the O(1) space constraint.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Morris traversal utilizes unused `NULL` right pointers of leaf nodes. For node `curr`, it finds its inorder predecessor (rightmost node of `curr->left`). If `pred->right == NULL`, it sets `pred->right = curr` (creating a thread) and moves `curr = curr->left`. If `pred->right == curr`, the left subtree is done: it removes the thread (`pred->right = NULL`), visits `curr`, and moves `curr = curr->right`. Each edge is traversed at most 3 times, achieving O(n) time and O(1) space.',
  },
  {
    id: 'q-inorder-traversal-hard-02',
    algoId: 'inorder-traversal',
    tier: 'hard',
    concept: 'Reconstruction Ambiguity from Inorder Alone',
    prompt: 'Why is an Inorder Traversal sequence ALONE insufficient to uniquely reconstruct the topology of a binary tree?',
    options: [
      {
        id: 'opt-a',
        label: 'Inorder provides the relative left-to-right sequence of keys but contains no information about which node is the parent or root (for example, [1, 2, 3] could be root 2 with children 1 and 3, or a skewed tree 1->2->3).',
        explanation: 'Correct! Without root identification from Preorder or Postorder, many different valid tree structures produce the identical inorder output.',
      },
      {
        id: 'opt-b',
        label: 'Because inorder traversals discard the values of leaf nodes.',
        explanation: 'Incorrect. Inorder visits every node including leaves.',
      },
      {
        id: 'opt-c',
        label: 'Because C compilers scramble tree node addresses during traversal.',
        explanation: 'Incorrect. Memory addresses are unrelated to the mathematical ambiguity of tree reconstruction.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'An inorder sequence [1, 2, 3] could represent: (1) root 2 with left 1 and right 3; (2) root 1 with right child 2 which has right child 3; (3) root 3 with left child 2 which has left child 1. To uniquely reconstruct a binary tree, an Inorder traversal must be paired with either a Preorder or Postorder sequence (which unambiguously identifies the root).',
  },
  {
    id: 'q-inorder-traversal-hard-03',
    algoId: 'inorder-traversal',
    tier: 'hard',
    concept: 'Recover Binary Search Tree (Two Swapped Nodes)',
    prompt: 'In a BST where exactly two nodes have been swapped by mistake, how does an inorder traversal locate the two misplaced nodes in a single pass?',
    options: [
      {
        id: 'opt-a',
        label: 'An inorder traversal should be strictly sorted; the first inverted pair (prev.val > curr.val) identifies the first swapped node as prev, and the last inverted pair identifies the second swapped node as curr.',
        explanation: 'Correct! Swapping two nodes creates either 1 or 2 inversions in the inorder sequence; tracking adjacent inversions identifies both swapped nodes in O(n) time.',
      },
      {
        id: 'opt-b',
        label: 'By comparing each node\'s value against the average of all node values in the tree.',
        explanation: 'Incorrect. The average does not pinpoint swapped positions.',
      },
      {
        id: 'opt-c',
        label: 'By reversing the tree and checking if the root node changes value.',
        explanation: 'Incorrect. Inverting a tree changes left/right orientation without fixing swapped values.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In a sorted array, swapping two elements x and y (where x < y originally) creates anomalies where `arr[i] > arr[i+1]`. If non-adjacent, two inversions occur: the first gives the first misplaced node (the larger value `prev`), and the second gives the second misplaced node (the smaller value `curr`). If adjacent, exactly one inversion occurs. Tracking these in an inorder pass locates both nodes in O(n) time.',
  },

  // ==========================================
  // TOPIC 4: PREORDER TRAVERSAL (preorder-traversal)
  // ==========================================

  // --- Preorder Traversal: Easy ---
  {
    id: 'q-preorder-traversal-easy-01',
    algoId: 'preorder-traversal',
    tier: 'easy',
    concept: 'Node-Left-Right Recursive Discipline',
    prompt: 'In what exact operational sequence does a Preorder Traversal visit a binary tree node and its subtrees?',
    options: [
      {
        id: 'opt-a',
        label: 'Visit the Current Node first, recursively explore the Left subtree, and then recursively explore the Right subtree (N-L-R).',
        explanation: 'Correct! Preorder processes the current node before either of its child subtrees.',
      },
      {
        id: 'opt-b',
        label: 'Traverse Left subtree, visit Current Node, traverse Right subtree (L-N-R).',
        explanation: 'Incorrect. Left -> Node -> Right describes Inorder traversal.',
      },
      {
        id: 'opt-c',
        label: 'Traverse Left subtree, traverse Right subtree, visit Current Node (L-R-N).',
        explanation: 'Incorrect. Left -> Right -> Node describes Postorder traversal.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Preorder traversal is a depth-first traversal defined by processing the parent node before ("pre") its children: (1) visit current node; (2) recursively traverse left subtree; (3) recursively traverse right subtree.',
  },
  {
    id: 'q-preorder-traversal-easy-02',
    algoId: 'preorder-traversal',
    tier: 'easy',
    concept: 'Root First Invariant',
    prompt: 'In any Preorder Traversal sequence of a non-empty binary tree, which node is guaranteed to appear at index 0?',
    options: [
      {
        id: 'opt-a',
        label: 'The root node of the entire tree.',
        explanation: 'Correct! Because preorder visits the current node before traversing children, the tree root is evaluated on the very first step.',
      },
      {
        id: 'opt-b',
        label: 'The leftmost leaf node of the tree.',
        explanation: 'Incorrect. Leftmost leaf appears first in Inorder or Postorder, not Preorder.',
      },
      {
        id: 'opt-c',
        label: 'The node with the smallest numerical value.',
        explanation: 'Incorrect. Minimum value appears first in Inorder of a BST, but Preorder starts at the root regardless of key value.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Because Preorder operates as Root -> Left -> Right, the root of any subtree is processed before any node in that subtree. Consequently, the global root node is always the very first element of the preorder traversal sequence.',
  },
  {
    id: 'q-preorder-traversal-easy-03',
    algoId: 'preorder-traversal',
    tier: 'easy',
    concept: 'Tree Serialization and Cloning',
    prompt: 'Why is Preorder Traversal particularly well-suited for cloning or serializing a binary tree structure?',
    options: [
      {
        id: 'opt-a',
        label: 'Visiting parent nodes before their children allows creating each parent node first, so its child pointers can be linked immediately as descendants are constructed.',
        explanation: 'Correct! When constructing or duplicating a tree, parents must exist before their children can be attached to them.',
      },
      {
        id: 'opt-b',
        label: 'Because preorder traversal automatically balances the tree during serialization.',
        explanation: 'Incorrect. Preorder traversal preserves the existing shape without balancing.',
      },
      {
        id: 'opt-c',
        label: 'Because preorder traversal executes in O(1) time regardless of tree size.',
        explanation: 'Incorrect. Visiting all n nodes takes O(n) time.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'To create an exact copy of a tree or deserialize it from a stream, you must instantiate the parent node before you can attach child nodes to its `left` and `right` fields. Preorder naturally provides this top-down parent-first construction order.',
  },

  // --- Preorder Traversal: Medium ---
  {
    id: 'q-preorder-traversal-med-01',
    algoId: 'preorder-traversal',
    tier: 'medium',
    concept: 'Step-by-Step Preorder Tracing',
    prompt: 'Given a binary tree with root 1, left child 2 (with children 4 and 5), and right child 3 (with children 6 and 7), what is the exact preorder traversal output?',
    options: [
      {
        id: 'opt-a',
        label: '1, 2, 4, 5, 3, 6, 7',
        explanation: 'Correct! Root 1 -> left subtree (root 2 -> 4 -> 5) -> right subtree (root 3 -> 6 -> 7).',
      },
      {
        id: 'opt-b',
        label: '4, 2, 5, 1, 6, 3, 7',
        explanation: 'Incorrect. This sequence represents the Inorder traversal.',
      },
      {
        id: 'opt-c',
        label: '4, 5, 2, 6, 7, 3, 1',
        explanation: 'Incorrect. This sequence represents the Postorder traversal.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Tracing N-L-R: (1) Visit root 1; (2) Recurse left to 2: visit 2, recurse left to 4 (visit 4), recurse right to 5 (visit 5); (3) Recurse right to 3: visit 3, recurse left to 6 (visit 6), recurse right to 7 (visit 7). Result: [1, 2, 4, 5, 3, 6, 7].',
  },
  {
    id: 'q-preorder-traversal-med-02',
    algoId: 'preorder-traversal',
    tier: 'medium',
    concept: 'Iterative Preorder Child Push Order',
    codeContext: {
      language: 'c',
      code: 'void iterativePreorder(TreeNode* root) {\n    if (root == NULL) return;\n    push(stack, root);\n    while (!isEmpty(stack)) {\n        TreeNode* curr = pop(stack);\n        printf("%d ", curr->val);\n        if (curr->right) push(stack, curr->right);\n        if (curr->left) push(stack, curr->left);\n    }\n}',
    },
    prompt: 'In the iterative preorder traversal algorithm above, why is the RIGHT child pushed onto the stack before the LEFT child?',
    options: [
      {
        id: 'opt-a',
        label: 'A stack is Last-In, First-Out (LIFO); pushing right first guarantees that the left child sits on top of the stack and is popped and processed before the right child.',
        explanation: 'Correct! Because LIFO pops the most recently pushed item first, pushing right then left ensures left is popped next, maintaining N-L-R order.',
      },
      {
        id: 'opt-b',
        label: 'Because the right child contains smaller values in a binary tree.',
        explanation: 'Incorrect. Binary trees do not guarantee right < left (even in a BST, right > left).',
      },
      {
        id: 'opt-c',
        label: 'To prevent memory leaks when popping the root node.',
        explanation: 'Incorrect. Push order governs traversal sequence, not memory reclamation.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Stacks enforce LIFO discipline. Because Preorder mandates visiting Left before Right, the Left child must be popped before the Right child. Therefore, the Right child is pushed first so that the Left child sits at the top of the stack ready for immediate popping on the next iteration.',
  },
  {
    id: 'q-preorder-traversal-med-03',
    algoId: 'preorder-traversal',
    tier: 'medium',
    concept: 'Prefix Expressions (Polish Notation)',
    prompt: 'When an arithmetic expression tree (with operators as internal nodes and numbers as leaves) is traversed in Preorder, what format of expression is produced?',
    options: [
      {
        id: 'opt-a',
        label: 'Prefix notation (Polish Notation), where each operator appears immediately before its two operands (e.g. + * A B C).',
        explanation: 'Correct! Visiting the operator node before its left and right subtrees produces prefix notation.',
      },
      {
        id: 'opt-b',
        label: 'Postfix notation (Reverse Polish Notation), where operators follow operands.',
        explanation: 'Incorrect. Postfix notation is produced by Postorder traversal (L-R-N).',
      },
      {
        id: 'opt-c',
        label: 'Standard Infix notation with parentheses.',
        explanation: 'Incorrect. Infix notation is produced by Inorder traversal (L-N-R).',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In an expression tree, operators are internal nodes and operands are leaves. In Preorder (Node -> Left -> Right), the operator is printed before its left and right operands, generating Prefix notation (Polish Notation, invented by Jan Lukasiewicz).',
  },

  // --- Preorder Traversal: Hard ---
  {
    id: 'q-preorder-traversal-hard-01',
    algoId: 'preorder-traversal',
    tier: 'hard',
    concept: 'Reconstructing BST from Preorder Alone',
    prompt: 'Why can a Binary Search Tree (BST) be uniquely reconstructed from its Preorder Traversal sequence ALONE, whereas a general binary tree cannot?',
    options: [
      {
        id: 'opt-a',
        label: 'In a BST, the first element is the root, and the BST ordering invariant partition boundary unambiguously separates the remaining elements into left subtree (< root) and right subtree (> root).',
        explanation: 'Correct! The BST property eliminates the need for an inorder sequence because key magnitudes determine left vs right subtree membership.',
      },
      {
        id: 'opt-b',
        label: 'Because preorder traversal on a BST produces sorted output.',
        explanation: 'Incorrect. Inorder produces sorted output on a BST, not preorder.',
      },
      {
        id: 'opt-c',
        label: 'Because BST nodes contain explicit parent pointer indices embedded in their keys.',
        explanation: 'Incorrect. BST nodes store keys and child pointers, not embedded parent indices.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'For a general binary tree, knowing the root from preorder does not reveal where the left subtree ends and right subtree begins without an inorder sequence. But in a BST, for root = `pre[0]`, all subsequent elements strictly less than `root` form the left subtree, and all elements greater than `root` form the right subtree. This allows unique O(n) reconstruction using upper/lower range bounds.',
  },
  {
    id: 'q-preorder-traversal-hard-02',
    algoId: 'preorder-traversal',
    tier: 'hard',
    concept: 'Serialization with Sentinel Markers',
    prompt: 'How can a general binary tree be uniquely serialized and deserialized using Preorder Traversal without an accompanying Inorder traversal?',
    options: [
      {
        id: 'opt-a',
        label: 'By explicitly serializing NULL child pointers as distinctive sentinel tokens (e.g. "#" or "null"); during deserialization, sentinel tokens definitively terminate subtrees.',
        explanation: 'Correct! Recording null leaves explicitly removes topological ambiguity, allowing unique top-down reconstruction in O(n) time.',
      },
      {
        id: 'opt-b',
        label: 'By converting all integer values to floating-point numbers before serializing.',
        explanation: 'Incorrect. Numerical format does not resolve structural ambiguity.',
      },
      {
        id: 'opt-c',
        label: 'By sorting the preorder sequence alphabetically before transmitting.',
        explanation: 'Incorrect. Sorting destroys the traversal sequence.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'If null children are recorded explicitly (e.g. `1, 2, #, #, 3, #, #`), the tree structure is fully encoded. When deserializing: the first token creates the root; the next token recursively builds the left subtree (returning `NULL` upon `#`); the following token builds the right subtree. This guarantees unique O(n) serialization and reconstruction.',
  },
  {
    id: 'q-preorder-traversal-hard-03',
    algoId: 'preorder-traversal',
    tier: 'hard',
    concept: 'Euler Tour & Subtree Interval Flattening',
    prompt: 'In tree algorithms (like Fenwick/Segment tree subtree queries), how does Preorder Traversal enable flattening a tree into an array such that any subtree maps to a contiguous subarray range [in[u], out[u]]?',
    options: [
      {
        id: 'opt-a',
        label: 'Preorder visits a node before any of its descendants and completes them before visiting any non-descendant; recording entry and exit timestamps maps node u and all its descendants to a contiguous index range.',
        explanation: 'Correct! By the depth-first property, all descendants of u are discovered and finished during u\'s active time interval, forming a contiguous range in the flattened preorder array.',
      },
      {
        id: 'opt-b',
        label: 'Preorder traversal swaps parent and child pointers to transform the tree into a doubly linked list.',
        explanation: 'Incorrect. Pointer swapping is not an Euler tour flattening.',
      },
      {
        id: 'opt-c',
        label: 'Because preorder traversal always sorts node values in ascending order.',
        explanation: 'Incorrect. Preorder traversal does not sort node values.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In a depth-first Euler tour, entering node u assigns timestamp `tin[u]`. All descendants of u are visited recursively before exiting u at timestamp `tout[u]`. In the flattened preorder sequence, every node in u\'s subtree appears contiguously within indices `[tin[u], tout[u]]`. This reduces subtree range queries and updates to standard 1D array segment/Fenwick operations in O(log n) time.',
  },

  // ==========================================
  // TOPIC 5: POSTORDER TRAVERSAL (postorder-traversal)
  // ==========================================

  // --- Postorder Traversal: Easy ---
  {
    id: 'q-postorder-traversal-easy-01',
    algoId: 'postorder-traversal',
    tier: 'easy',
    concept: 'Left-Right-Node Recursive Discipline',
    prompt: 'In what exact operational sequence does a Postorder Traversal visit a binary tree node and its subtrees?',
    options: [
      {
        id: 'opt-a',
        label: 'Recursively explore the Left subtree, recursively explore the Right subtree, and finally visit the Current Node (L-R-N).',
        explanation: 'Correct! Postorder processes both child subtrees before visiting the parent node.',
      },
      {
        id: 'opt-b',
        label: 'Visit Current Node, traverse Left subtree, traverse Right subtree (N-L-R).',
        explanation: 'Incorrect. Node -> Left -> Right is Preorder traversal.',
      },
      {
        id: 'opt-c',
        label: 'Traverse Left subtree, visit Current Node, traverse Right subtree (L-N-R).',
        explanation: 'Incorrect. Left -> Node -> Right is Inorder traversal.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Postorder traversal is a depth-first traversal strategy that defers processing the parent node until after ("post") all its descendants have been visited: (1) recursively traverse left subtree; (2) recursively traverse right subtree; (3) visit current node.',
  },
  {
    id: 'q-postorder-traversal-easy-02',
    algoId: 'postorder-traversal',
    tier: 'easy',
    concept: 'Root Last Invariant',
    prompt: 'In any Postorder Traversal sequence of a non-empty binary tree, where does the root node of the entire tree appear?',
    options: [
      {
        id: 'opt-a',
        label: 'At the very end of the sequence (index n - 1).',
        explanation: 'Correct! Because postorder visits the parent only after both child subtrees are completely processed, the root node is visited last.',
      },
      {
        id: 'opt-b',
        label: 'At the very beginning of the sequence (index 0).',
        explanation: 'Incorrect. Index 0 is the root in Preorder traversal, not Postorder.',
      },
      {
        id: 'opt-c',
        label: 'At the exact midpoint index floor(n / 2).',
        explanation: 'Incorrect. The root appears at the midpoint in an inorder traversal only if the tree is perfectly symmetrical.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Because Postorder operates as Left -> Right -> Root, the root of any subtree is visited only after all nodes in both of its subtrees have been processed. Therefore, the global root node of the tree is always the very last element in the postorder traversal output.',
  },
  {
    id: 'q-postorder-traversal-easy-03',
    algoId: 'postorder-traversal',
    tier: 'easy',
    concept: 'Bottom-Up Evaluation Principle',
    prompt: 'Why is Postorder Traversal the natural choice for calculating subtree properties such as total subtree size or tree height?',
    options: [
      {
        id: 'opt-a',
        label: 'A parent node\'s height or size depends directly on the results of its children; postorder guarantees both children are evaluated before the parent is computed.',
        explanation: 'Correct! Postorder evaluates children first, allowing the parent to synthesize its result bottom-up (e.g. height = 1 + max(left_h, right_h)).',
      },
      {
        id: 'opt-b',
        label: 'Because postorder traversal executes without using any stack frames.',
        explanation: 'Incorrect. Recursive postorder uses O(h) call stack frames.',
      },
      {
        id: 'opt-c',
        label: 'Because postorder traversal automatically deletes duplicate elements.',
        explanation: 'Incorrect. Traversal orders do not modify element uniqueness.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Many tree properties require bottom-up aggregation: you cannot compute a node\'s height or size until you know the heights or sizes of its left and right subtrees. Postorder naturally enforces this dependency graph by computing subtrees before visiting their parent.',
  },

  // --- Postorder Traversal: Medium ---
  {
    id: 'q-postorder-traversal-med-01',
    algoId: 'postorder-traversal',
    tier: 'medium',
    concept: 'Safe Tree Deallocation in C',
    codeContext: {
      language: 'c',
      code: 'void freeTree(TreeNode* root) {\n    if (root == NULL) return;\n    freeTree(root->left);\n    freeTree(root->right);\n    free(root);\n}',
    },
    prompt: 'In C memory management, why must deleting an entire binary tree be executed using Postorder traversal as shown above?',
    options: [
      {
        id: 'opt-a',
        label: 'If root were freed before its children (as in preorder), accessing root->left and root->right to free the subtrees would read freed memory (use-after-free bug, undefined behavior).',
        explanation: 'Correct! Deallocating children first ensures that pointers `root->left` and `root->right` remain valid until all descendants are safely freed.',
      },
      {
        id: 'opt-b',
        label: 'Because C free() only accepts pointers whose child pointers are NULL.',
        explanation: 'Incorrect. free() does not inspect struct member pointers.',
      },
      {
        id: 'opt-c',
        label: 'Because freeing the root first causes the operating system to allocate a new duplicate tree.',
        explanation: 'Incorrect. Freeing does not duplicate data; reading freed memory causes undefined behavior.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In C, once `free(root)` executes, the memory at `root` is returned to the heap allocator. Dereferencing `root->left` or `root->right` after that call constitutes a use-after-free bug (undefined behavior). Postorder deallocates bottom-up: both subtrees are recursively freed before `free(root)` is called.',
  },
  {
    id: 'q-postorder-traversal-med-02',
    algoId: 'postorder-traversal',
    tier: 'medium',
    concept: 'Postfix Notation (Reverse Polish Notation)',
    prompt: 'When an arithmetic expression tree is traversed in Postorder, what format of expression is produced, and how is it evaluated?',
    options: [
      {
        id: 'opt-a',
        label: 'Postfix notation (Reverse Polish Notation), where operands precede their operator (e.g. A B * C +); it can be evaluated in a single linear pass using a simple operand stack without parentheses.',
        explanation: 'Correct! Postorder places operands before operators, producing postfix expressions that evaluate efficiently on a stack.',
      },
      {
        id: 'opt-b',
        label: 'Infix notation, which requires complex operator precedence parsing tables.',
        explanation: 'Incorrect. Infix notation is generated by Inorder traversal.',
      },
      {
        id: 'opt-c',
        label: 'Binary machine code instructions directly executed by the GPU.',
        explanation: 'Incorrect. Postorder generates postfix mathematical strings, not machine bytecode.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In an expression tree, postorder (Left -> Right -> Node) prints left operand, right operand, then the operator. This produces Postfix notation (Reverse Polish Notation). Postfix expressions eliminate the need for parentheses and operator precedence rules, evaluating cleanly via a single stack: push operands, and when an operator appears, pop two operands and push the result.',
  },
  {
    id: 'q-postorder-traversal-med-03',
    algoId: 'postorder-traversal',
    tier: 'medium',
    concept: 'Step-by-Step Postorder Tracing',
    prompt: 'Given a binary tree with root 1, left child 2 (with children 4 and 5), and right child 3 (with children 6 and 7), what is the exact postorder traversal sequence?',
    options: [
      {
        id: 'opt-a',
        label: '4, 5, 2, 6, 7, 3, 1',
        explanation: 'Correct! Left subtree of 2 (4, 5, then 2) -> right subtree of 3 (6, 7, then 3) -> root 1.',
      },
      {
        id: 'opt-b',
        label: '1, 2, 4, 5, 3, 6, 7',
        explanation: 'Incorrect. This sequence represents Preorder traversal.',
      },
      {
        id: 'opt-c',
        label: '4, 2, 5, 1, 6, 3, 7',
        explanation: 'Incorrect. This sequence represents Inorder traversal.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Tracing L-R-N: (1) Traverse left subtree of 1: traverse left subtree of 2 (leaf 4), traverse right subtree of 2 (leaf 5), visit 2 -> [4, 5, 2]; (2) Traverse right subtree of 1: traverse left subtree of 3 (leaf 6), traverse right subtree of 3 (leaf 7), visit 3 -> [6, 7, 3]; (3) Visit root 1 -> result: [4, 5, 2, 6, 7, 3, 1].',
  },

  // --- Postorder Traversal: Hard ---
  {
    id: 'q-postorder-traversal-hard-01',
    algoId: 'postorder-traversal',
    tier: 'hard',
    concept: 'Iterative Postorder Single-Stack lastVisited Guard',
    prompt: 'Why is iterative postorder traversal using a single explicit stack substantially more complex than iterative preorder or inorder traversal?',
    options: [
      {
        id: 'opt-a',
        label: 'A parent node must be inspected twice (once after returning from the left subtree and again after returning from the right subtree); it can only be popped and visited after returning from the right child, requiring a lastVisited tracking pointer.',
        explanation: 'Correct! When ascending from the left child, the parent cannot be visited yet until its right child is processed; a pointer like lastVisited distinguishes first ascent from second ascent.',
      },
      {
        id: 'opt-b',
        label: 'Because postorder traversal cannot be implemented using stacks on modern operating systems.',
        explanation: 'Incorrect. Iterative postorder is standard, but requires state tracking.',
      },
      {
        id: 'opt-c',
        label: 'Because the stack size must exceed the number of nodes in the tree by a factor of 4.',
        explanation: 'Incorrect. Stack size is bounded by the tree height h.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In preorder and inorder, a node is popped as soon as you transition past it. In postorder, when you return from `curr->left`, `curr` is at the top of the stack, but it must NOT be visited yet until `curr->right` is fully traversed. To distinguish whether we just ascended from `curr->left` or `curr->right`, the algorithm must track `lastVisited` node to know when it is safe to pop and visit `curr`.',
  },
  {
    id: 'q-postorder-traversal-hard-02',
    algoId: 'postorder-traversal',
    tier: 'hard',
    concept: 'Two-Stack Reversal Transformation',
    prompt: 'How does the "Two-Stack" iterative postorder algorithm produce a valid postorder traversal (Left-Right-Root) using a modified preorder traversal?',
    options: [
      {
        id: 'opt-a',
        label: 'A modified preorder traversal visits Root -> Right -> Left and pushes visited nodes onto an output stack; popping the output stack reverses the sequence into Left -> Right -> Root.',
        explanation: 'Correct! The reverse of (Left -> Right -> Root) is (Root -> Right -> Left). Generating Root-Right-Left into an output stack reverses it directly to postorder upon popping.',
      },
      {
        id: 'opt-b',
        label: 'The first stack stores node keys and the second stack sorts the keys using Bubble Sort.',
        explanation: 'Incorrect. Postorder traversal reflects tree topology, not sorted key values.',
      },
      {
        id: 'opt-c',
        label: 'The first stack traverses only even nodes and the second stack traverses only odd nodes.',
        explanation: 'Incorrect. Traversal visits all nodes regardless of value parity.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Observe that the reverse of Postorder (L -> R -> N) is (N -> R -> L). We can easily generate (N -> R -> L) using a standard iterative traversal (pushing left before right onto stack 1). Instead of printing immediately, we push popped nodes onto stack 2. When stack 1 is empty, stack 2 contains all elements in (N -> R -> L) order. Popping stack 2 outputs the exact (L -> R -> N) postorder sequence in O(n) time and O(n) space.',
  },
  {
    id: 'q-postorder-traversal-hard-03',
    algoId: 'postorder-traversal',
    tier: 'hard',
    concept: 'Dynamic Programming on Trees (Subtree Aggregation)',
    prompt: 'In dynamic programming on trees (e.g. Maximum Path Sum or House Robber on a binary tree), why is postorder traversal mandatory?',
    options: [
      {
        id: 'opt-a',
        label: 'Computing the optimal DP state at node u depends on the already-solved optimal subproblem values of both left and right subtrees; postorder guarantees children are fully computed before u is evaluated.',
        explanation: 'Correct! Optimal substructure on trees flows bottom-up from leaves to root, which is strictly the evaluation order of postorder traversal.',
      },
      {
        id: 'opt-b',
        label: 'Because dynamic programming algorithms only work on trees with fewer than 10 nodes.',
        explanation: 'Incorrect. Tree DP scales to arbitrary tree sizes in O(n) time.',
      },
      {
        id: 'opt-c',
        label: 'Because postorder traversal automatically caches all function arguments in a global hash table.',
        explanation: 'Incorrect. Postorder provides the topological execution order, not memoization storage.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In tree DP, a node\'s state $DP[u]$ is a function of $DP[u.left]$ and $DP[u.right]$ (e.g., in Maximum Path Sum: $maxGain(u) = u.val + \\max(0, maxGain(u.left)) + \\max(0, maxGain(u.right))$). This topological dependency requires subtrees to be solved before evaluating their parent, which is the exact contract of postorder traversal.',
  },
];
