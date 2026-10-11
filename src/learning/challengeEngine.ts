import type { AlgorithmMetadata, AnyAlgorithmStep, ArrayStep, StackQueueStep, TreeStep } from '../algorithms/types';
import type { ChallengeQuestion } from './types';

/**
 * Generates an educational challenge question for the active algorithm step.
 * Returns null if the current step does not form an appropriate decision checkpoint
 * (e.g., initial setup, terminal step, or trivial intermediate log).
 */
export function generateChallenge(
  algoId: string,
  stepIndex: number,
  steps: AnyAlgorithmStep[],
  metadata: AlgorithmMetadata
): ChallengeQuestion | null {
  if (steps.length === 0 || stepIndex >= steps.length - 1) {
    return null;
  }

  const currentStep = steps[stepIndex];
  const nextStep = steps[stepIndex + 1];

  // ==========================================
  // Family 1: Searching (Binary Search & Linear Search)
  // ==========================================
  if (currentStep.kind === 'array' && metadata.category === 'searching') {
    const curArrayStep = currentStep as ArrayStep;
    const target = curArrayStep.target ?? 23;
    const pointers = curArrayStep.pointers;

    // Binary Search
    if (algoId === 'binary-search' && pointers && pointers.mid !== undefined) {
      const mid = pointers.mid;
      const midVal = curArrayStep.array[mid];
      const left = pointers.left ?? 0;
      const right = pointers.right ?? curArrayStep.array.length - 1;

      if (midVal === target) {
        return {
          id: `${algoId}-step-${stepIndex}-match`,
          algoId,
          stepIndex,
          category: metadata.category,
          concept: 'Target Value Match Invariant',
          prompt: `Midpoint index [${mid}] holds value ${midVal}, and search target is ${target}. What should the algorithm do next?`,
          options: [
            {
              id: 'declare-found',
              label: `Declare target found at index [${mid}] and terminate with success.`,
              explanation: `Correct! Because arr[mid] == target (${midVal} == ${target}), the search has successfully concluded.`,
            },
            {
              id: 'search-left',
              label: `Discard right half and continue searching indices [${left}..${mid - 1}].`,
              explanation: `Incorrect. The target has already been located at mid index [${mid}]. Further searching is redundant.`,
            },
            {
              id: 'search-right',
              label: `Discard left half and continue searching indices [${mid + 1}..${right}].`,
              explanation: `Incorrect. There is no need to continue branching once arr[mid] == target is confirmed.`,
            },
          ],
          correctOptionId: 'declare-found',
          rationale: `Binary search stops immediately upon locating arr[mid] == target in O(1) from the current midpoint.`,
        };
      }

      if (midVal > target) {
        return {
          id: `${algoId}-step-${stepIndex}-gt`,
          algoId,
          stepIndex,
          category: metadata.category,
          concept: 'Monotonic Elimination of Upper Bound',
          prompt: `Midpoint value arr[${mid}] = ${midVal} is GREATER than target ${target}. Since the array is sorted in ascending order, which half is safely eliminated?`,
          options: [
            {
              id: 'eliminate-right',
              label: `Eliminate the right half [${mid}..${right}]. Update right pointer to ${mid - 1}.`,
              explanation: `Correct! Since arr[mid] (${midVal}) > target (${target}), all values at or above index ${mid} must also be > ${target}.`,
            },
            {
              id: 'eliminate-left',
              label: `Eliminate the left half [${left}..${mid}]. Update left pointer to ${mid + 1}.`,
              explanation: `Incorrect. The left half contains smaller values where target (${target}) could exist. Eliminating it would miss the target.`,
            },
            {
              id: 'restart-linear',
              label: `Reset search range to [0..${curArrayStep.array.length - 1}].`,
              explanation: `Incorrect. Binary search maintains logarithmic halving; resetting range would ruin the O(log n) efficiency.`,
            },
          ],
          correctOptionId: 'eliminate-right',
          rationale: `By the sorted invariant: for any index k >= mid, arr[k] >= arr[mid] > target, so target can only exist in [left..mid - 1].`,
        };
      }

      if (midVal < target) {
        return {
          id: `${algoId}-step-${stepIndex}-lt`,
          algoId,
          stepIndex,
          category: metadata.category,
          concept: 'Monotonic Elimination of Lower Bound',
          prompt: `Midpoint value arr[${mid}] = ${midVal} is LESS than target ${target}. How should the search boundaries adjust next?`,
          options: [
            {
              id: 'eliminate-left',
              label: `Eliminate left half [${left}..${mid}]. Move left pointer to ${mid + 1}.`,
              explanation: `Correct! Because arr[mid] (${midVal}) < target (${target}), all elements at or below index ${mid} are strictly smaller than target.`,
            },
            {
              id: 'eliminate-right',
              label: `Eliminate right half [${mid}..${right}]. Move right pointer to ${mid - 1}.`,
              explanation: `Incorrect. The target is greater than midVal, so it can only reside in the upper range [mid + 1..right].`,
            },
            {
              id: 'stay-same',
              label: `Keep pointers unchanged and re-evaluate midpoint.`,
              explanation: `Incorrect. The pointers must strictly contract to guarantee progress and terminate.`,
            },
          ],
          correctOptionId: 'eliminate-left',
          rationale: `Because the array is sorted, any element with index <= mid has value <= arr[mid] < target, so target must be strictly in [mid + 1..right].`,
        };
      }
    }

    // Linear Search
    if (algoId === 'linear-search') {
      if (stepIndex === 0 && curArrayStep.array.length > 0) {
        return {
          id: `${algoId}-step-${stepIndex}-init`,
          algoId,
          stepIndex,
          category: metadata.category,
          concept: 'Sequential Scanning Invariant',
          prompt: `Linear Search is starting for target ${target} across ${curArrayStep.array.length} elements. Where does the search begin?`,
          options: [
            {
              id: 'start-at-zero',
              label: `Begin inspection at index [0] (${curArrayStep.array[0]}) and iterate sequentially.`,
              explanation: `Correct! Linear search begins at index 0 and inspects each element monotonically.`,
            },
            {
              id: 'start-at-mid',
              label: `Jump directly to the middle index.`,
              explanation: `Incorrect. Jumping to the middle requires sorted data (Binary Search). Linear search scans sequentially from index 0.`,
            },
          ],
          correctOptionId: 'start-at-zero',
          rationale: `Linear search guarantees completeness on any collection by traversing from index 0 to n - 1.`,
        };
      }

      if (curArrayStep.currentIndex !== undefined) {
        const idx = curArrayStep.currentIndex;
        const val = curArrayStep.array[idx];
        const isMatch = val === target;

        return {
          id: `${algoId}-step-${stepIndex}`,
          algoId,
          stepIndex,
          category: metadata.category,
          concept: 'Sequential Scanning Invariant',
          prompt: `Inspecting index [${idx}] with value ${val}. Target is ${target}. What is the correct next action?`,
          options: [
            {
              id: isMatch ? 'found' : 'advance',
              label: isMatch
                ? `Match confirmed (${val} == ${target})! Terminate and return index [${idx}].`
                : `Values do not match (${val} != ${target}). Advance inspection pointer to index [${idx + 1}].`,
              explanation: `Correct! Sequential scan verifies elements one by one until a match is found or end of array is reached.`,
            },
            {
              id: isMatch ? 'advance' : 'found',
              label: isMatch
                ? `Ignore match and continue checking remaining elements.`
                : `Falsely report match at index [${idx}].`,
              explanation: `Incorrect. Linear search halts immediately upon finding the target, or advances if no match exists.`,
            },
          ],
          correctOptionId: isMatch ? 'found' : 'advance',
          rationale: isMatch
            ? `Value matches target exactly at index [${idx}].`
            : `Because arr[${idx}] != ${target}, linear search moves monotonically to index [${idx + 1}].`,
        };
      }
    }
  }

  // ==========================================
  // Family 2: Sorting (Bubble, Selection, Insertion, Quick, Merge, Heap)
  // ==========================================
  if (currentStep.kind === 'array' && metadata.category === 'sorting') {
    const curArray = (currentStep as ArrayStep).array;
    const nextArrayStep = nextStep as ArrayStep;
    const nextAction = nextArrayStep.action ?? '';

    // Check if next step is a swap
    const isNextSwap = nextAction.includes('swap') || nextStep.description.toLowerCase().includes('swap');

    // Find compared indices
    const compIndices = Object.entries(currentStep.elementStates)
      .filter((entry) => entry[1] === 'comparing')
      .map(([idx]) => Number(idx));

    if (compIndices.length >= 2) {
      const [i, j] = compIndices;
      const valI = curArray[i];
      const valJ = curArray[j];
      const shouldSwap = valI > valJ;

      return {
        id: `${algoId}-step-${stepIndex}-swap-pred`,
        algoId,
        stepIndex,
        category: metadata.category,
        concept: 'Inversion Detection & Exchange Rule',
        prompt: `Currently comparing arr[${i}] = ${valI} and arr[${j}] = ${valJ}. Under ascending sort order, should these elements be swapped next?`,
        options: [
          {
            id: shouldSwap ? 'swap-yes' : 'swap-no',
            label: shouldSwap
              ? `Yes: arr[${i}] (${valI}) > arr[${j}] (${valJ}), creating an inversion that must be swapped.`
              : `No: arr[${i}] (${valI}) <= arr[${j}] (${valJ}), so they are already in correct relative order.`,
            explanation: `Correct! Ascending sort requires arr[left] <= arr[right].`,
          },
          {
            id: shouldSwap ? 'swap-no' : 'swap-yes',
            label: shouldSwap
              ? `No: Keep them in their current positions without swapping.`
              : `Yes: Swap them even though they are already sorted.`,
            explanation: `Incorrect. We only swap when the preceding value exceeds the subsequent value (an inversion).`,
          },
        ],
        correctOptionId: shouldSwap ? 'swap-yes' : 'swap-no',
        rationale: `An inversion exists if and only if i < j and arr[i] > arr[j]. Swapping resolves the inversion.`,
      };
    }

    if (isNextSwap) {
      return {
        id: `${algoId}-step-${stepIndex}-action-swap`,
        algoId,
        stepIndex,
        category: metadata.category,
        concept: 'Element Displacement Step',
        prompt: `The algorithm has identified an unsorted pair. What mechanical transformation happens in the next step?`,
        options: [
          {
            id: 'swap',
            label: `Exchange (swap) the positions of the highlighted elements.`,
            explanation: `Correct! The algorithm swaps the elements to enforce monotonic order.`,
          },
          {
            id: 'delete',
            label: `Delete one of the elements from the array.`,
            explanation: `Incorrect. Standard sorting algorithms preserve all elements (permutation invariant).`,
          },
          {
            id: 'reset',
            label: `Terminate sort immediately.`,
            explanation: `Incorrect. Sorting must continue until all inversions are cleared.`,
          },
        ],
        correctOptionId: 'swap',
        rationale: `Swapping moves smaller elements toward the front and larger elements toward the rear.`,
      };
    }
  }

  // ==========================================
  // Family 3: Stack & Queue
  // ==========================================
  if (currentStep.kind === 'stack-queue') {
    const sqStep = currentStep as StackQueueStep;
    const isStack = sqStep.structureType === 'stack';
    const items = sqStep.items;

    if (items.length > 0) {
      if (isStack) {
        const topVal = items[items.length - 1];
        return {
          id: `${algoId}-step-${stepIndex}-lifo`,
          algoId,
          stepIndex,
          category: metadata.category,
          concept: 'LIFO (Last-In First-Out) Retrieval Policy',
          prompt: `The stack currently contains [${items.join(', ')}] with top element ${topVal}. If a POP operation is executed now, which element will be removed?`,
          options: [
            {
              id: 'top-item',
              label: `Element ${topVal} (the element at TOP of the stack).`,
              explanation: `Correct! Stacks enforce LIFO: the most recently inserted item is the only one accessible for pop.`,
            },
            {
              id: 'bottom-item',
              label: `Element ${items[0]} (the element at the BOTTOM of the stack).`,
              explanation: `Incorrect. The bottom element can only be removed after all elements above it are popped.`,
            },
            {
              id: 'random-item',
              label: `Any element chosen randomly.`,
              explanation: `Incorrect. Stacks provide strictly ordered O(1) access to top only.`,
            },
          ],
          correctOptionId: 'top-item',
          rationale: `LIFO guarantees that pop() returns the item at the top pointer (index ${items.length - 1}).`,
        };
      } else {
        const frontVal = items[0];
        return {
          id: `${algoId}-step-${stepIndex}-fifo`,
          algoId,
          stepIndex,
          category: metadata.category,
          concept: 'FIFO (First-In First-Out) Service Policy',
          prompt: `The queue currently contains [${items.join(', ')}] with front element ${frontVal}. If a DEQUEUE operation is executed now, which element leaves the queue?`,
          options: [
            {
              id: 'front-item',
              label: `Element ${frontVal} (at FRONT of the queue).`,
              explanation: `Correct! Queues enforce FIFO: the oldest enqueued element is dequeued first.`,
            },
            {
              id: 'rear-item',
              label: `Element ${items[items.length - 1]} (at REAR of the queue).`,
              explanation: `Incorrect. The rear of the queue is where new elements enter (enqueue), not where they leave.`,
            },
          ],
          correctOptionId: 'front-item',
          rationale: `FIFO queues remove from the front pointer and append to the rear pointer.`,
        };
      }
    }
  }

  // ==========================================
  // Family 4: Trees & Traversals
  // ==========================================
  if (currentStep.kind === 'tree') {
    const treeStep = currentStep as TreeStep;
    const activeNodeId = treeStep.activeNodeId;
    const node = activeNodeId ? treeStep.nodes[activeNodeId] : null;

    if (algoId === 'bst' && node) {
      return {
        id: `${algoId}-step-${stepIndex}-branch`,
        algoId,
        stepIndex,
        category: metadata.category,
        concept: 'Binary Search Tree Ordering Invariant',
        prompt: `Current BST node is ${node.value}. According to BST properties, where must any value smaller than ${node.value} be placed?`,
        options: [
          {
            id: 'left-subtree',
            label: `In the LEFT subtree (Left < Root < Right).`,
            explanation: `Correct! In a valid BST, all nodes in the left subtree have values strictly less than the current node.`,
          },
          {
            id: 'right-subtree',
            label: `In the RIGHT subtree.`,
            explanation: `Incorrect. The right subtree strictly stores values greater than the current node.`,
          },
        ],
        correctOptionId: 'left-subtree',
        rationale: `BST property: For any node X, all keys in left(X) < key(X) and all keys in right(X) > key(X).`,
      };
    }

    if (algoId.includes('inorder') && node) {
      return {
        id: `${algoId}-step-${stepIndex}-order`,
        algoId,
        stepIndex,
        category: metadata.category,
        concept: 'Inorder Traversal Sequence',
        prompt: `What is the canonical traversal order for Inorder depth-first search?`,
        options: [
          {
            id: 'inorder-correct',
            label: `Left Subtree ➔ Root Node ➔ Right Subtree.`,
            explanation: `Correct! Inorder visits left child first, then the root, then the right child.`,
          },
          {
            id: 'preorder',
            label: `Root Node ➔ Left Subtree ➔ Right Subtree.`,
            explanation: `Incorrect. That is Preorder traversal.`,
          },
          {
            id: 'postorder',
            label: `Left Subtree ➔ Right Subtree ➔ Root Node.`,
            explanation: `Incorrect. That is Postorder traversal.`,
          },
        ],
        correctOptionId: 'inorder-correct',
        rationale: `Inorder traversal of a binary search tree visits all keys in strictly ascending sorted order.`,
      };
    }
  }

  // ==========================================
  // Family 5: Graphs (Dijkstra, BFS, DFS, Kruskal, Prim)
  // ==========================================
  if (currentStep.kind === 'graph') {

    if (algoId === 'dijkstra') {
      return {
        id: `${algoId}-step-${stepIndex}-greedy`,
        algoId,
        stepIndex,
        category: metadata.category,
        concept: 'Dijkstra Greedy Vertex Selection',
        prompt: `In Dijkstra's shortest path algorithm, how does the algorithm choose the next unvisited vertex to finalize?`,
        options: [
          {
            id: 'min-dist',
            label: `Select the unvisited vertex with the minimum tentative distance from source.`,
            explanation: `Correct! Greedy choice property guarantees that this vertex cannot be reached via a shorter path since all edge weights are non-negative.`,
          },
          {
            id: 'max-dist',
            label: `Select the unvisited vertex with maximum tentative distance.`,
            explanation: `Incorrect. Dijkstra prioritizes the closest boundary vertex first.`,
          },
          {
            id: 'random-vertex',
            label: `Select any adjacent vertex arbitrarily regardless of weight.`,
            explanation: `Incorrect. That would be an unweighted traversal like arbitrary BFS, not Dijkstra.`,
          },
        ],
        correctOptionId: 'min-dist',
        rationale: `Dijkstra extracts the minimum from the priority queue of tentative distances at each expansion.`,
      };
    }

    if (algoId === 'bfs' || algoId === 'dfs') {
      const isBFS = algoId === 'bfs';
      return {
        id: `${algoId}-step-${stepIndex}-structure`,
        algoId,
        stepIndex,
        category: metadata.category,
        concept: isBFS ? 'Queue Frontier in Breadth-First Search' : 'Stack / Recursion Frontier in Depth-First Search',
        prompt: `Which underlying data structure governs vertex exploration in ${isBFS ? 'BFS (Breadth-First Search)' : 'DFS (Depth-First Search)'}?`,
        options: [
          {
            id: 'correct-structure',
            label: isBFS ? `FIFO Queue (explores level by level).` : `LIFO Stack / Call Stack (explores deepest branch first).`,
            explanation: `Correct! ${isBFS ? 'Queues ensure level-order expansion.' : 'Stacks ensure exploration travels deeply before backtracking.'}`,
          },
          {
            id: 'wrong-structure',
            label: isBFS ? `LIFO Stack.` : `FIFO Queue.`,
            explanation: `Incorrect. That represents the opposite traversal paradigm.`,
          },
        ],
        correctOptionId: 'correct-structure',
        rationale: isBFS
          ? `BFS discovers vertices in increasing distance from the start node using a queue.`
          : `DFS traverses down a branch until no unvisited neighbors remain using a stack.`,
      };
    }

    if (algoId === 'kruskal' || algoId === 'prim') {
      return {
        id: `${algoId}-step-${stepIndex}-mst`,
        algoId,
        stepIndex,
        category: metadata.category,
        concept: 'Minimum Spanning Tree (MST) Cycle Invariant',
        prompt: `When building a Minimum Spanning Tree (MST) on a connected graph with V vertices, what invariant must be preserved?`,
        options: [
          {
            id: 'acyclic',
            label: `The tree must connect all vertices with exactly V - 1 edges and NO cycles.`,
            explanation: `Correct! A tree with V vertices contains exactly V - 1 edges and is strictly acyclic.`,
          },
          {
            id: 'allow-cycle',
            label: `Cycles are allowed as long as total weight is minimized.`,
            explanation: `Incorrect. A tree cannot contain any cycles by mathematical definition.`,
          },
        ],
        correctOptionId: 'acyclic',
        rationale: `MST connects all vertices with minimum total weight while maintaining the acyclic tree property.`,
      };
    }
  }

  // ==========================================
  // Family 6: Algorithmic Techniques (Two Pointers, Sliding Window, DP, etc.)
  // ==========================================
  if (algoId === 'two-pointers' && currentStep.kind === 'array') {
    const curArrayStep = currentStep as ArrayStep;
    const left = curArrayStep.pointers?.left ?? 0;
    const right = curArrayStep.pointers?.right ?? curArrayStep.array.length - 1;
    const sum = curArrayStep.array[left] + curArrayStep.array[right];
    const target = curArrayStep.target ?? 30;

    if (sum === target) {
      return {
        id: `${algoId}-step-${stepIndex}-match`,
        algoId,
        stepIndex,
        category: metadata.category,
        concept: 'Two Pointers Pair Match',
        prompt: `Current pair sum is arr[${left}] + arr[${right}] = ${sum}, matching target ${target}. What is the result?`,
        options: [
          {
            id: 'target-found',
            label: `Target pair found at indices [${left}, ${right}].`,
            explanation: `Correct! Both pointers together satisfy the target sum condition.`,
          },
          {
            id: 'continue-moving',
            label: `Pointers must continue moving past each other.`,
            explanation: `Incorrect. Two Sum terminates as soon as the valid pair is found.`,
          },
        ],
        correctOptionId: 'target-found',
        rationale: `The sum of values at the two pointers equals the required target.`,
      };
    }

    const isSumSmall = sum < target;
    return {
      id: `${algoId}-step-${stepIndex}-move`,
      algoId,
      stepIndex,
      category: metadata.category,
      concept: 'Monotonic Pointer Shift Rule',
      prompt: `Current sum arr[${left}] (${curArrayStep.array[left]}) + arr[${right}] (${curArrayStep.array[right]}) = ${sum}. Target is ${target}. How should pointers adjust?`,
      options: [
        {
          id: isSumSmall ? 'increment-left' : 'decrement-right',
          label: isSumSmall
            ? `Sum is too small (${sum} < ${target}). Increment LEFT pointer (left++) to increase sum.`
            : `Sum is too large (${sum} > ${target}). Decrement RIGHT pointer (right--) to decrease sum.`,
          explanation: `Correct! Because the array is sorted, moving left pointer rightwards increases the sum, and moving right pointer leftwards decreases the sum.`,
        },
        {
          id: isSumSmall ? 'decrement-right' : 'increment-left',
          label: isSumSmall
            ? `Decrement RIGHT pointer (right--).`
            : `Increment LEFT pointer (left++).`,
          explanation: `Incorrect. Moving in that direction would shift the sum further away from target ${target}.`,
        },
      ],
      correctOptionId: isSumSmall ? 'increment-left' : 'decrement-right',
      rationale: isSumSmall
        ? `To increase the sum toward target ${target}, advance left pointer to access larger elements.`
        : `To reduce the sum toward target ${target}, retreat right pointer to access smaller elements.`,
    };
  }

  // Default fallback for other steps: provide a comprehension checkpoint if next step has code line
  if (currentStep.codeLine && nextStep.codeLine && currentStep.codeLine !== nextStep.codeLine) {
    return {
      id: `${algoId}-step-${stepIndex}-transition`,
      algoId,
      stepIndex,
      category: metadata.category,
      concept: 'Execution State Transition',
      prompt: `At Line ${currentStep.codeLine} in the C implementation, the current condition evaluated: "${currentStep.description}". What is the immediate consequence?`,
      options: [
        {
          id: 'advance-instruction',
          label: `Proceed to execute the subsequent instruction at Line ${nextStep.codeLine}.`,
          explanation: `Correct! Program execution flow advances according to the evaluated branching logic.`,
        },
        {
          id: 'halt-process',
          label: `Halt execution and abort algorithm.`,
          explanation: `Incorrect. The algorithm continues executing until its termination condition is satisfied.`,
        },
      ],
      correctOptionId: 'advance-instruction',
      rationale: `Program counter steps deterministically from line ${currentStep.codeLine} to line ${nextStep.codeLine}.`,
    };
  }

  return null;
}
