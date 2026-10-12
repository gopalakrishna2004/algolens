import type { MasteryQuestion } from '../types';

/**
 * 63 Reviewed Questions for Chapter 06: Algorithmic Techniques.
 * - Recursion (Call Stack) (9 questions: 3 Easy, 3 Medium, 3 Hard)
 * - Two Pointers Technique (9 questions: 3 Easy, 3 Medium, 3 Hard)
 * - Sliding Window Technique (9 questions: 3 Easy, 3 Medium, 3 Hard)
 * - Divide & Conquer (Binary Exponentiation) (9 questions: 3 Easy, 3 Medium, 3 Hard)
 * - Greedy Algorithms (Activity Selection) (9 questions: 3 Easy, 3 Medium, 3 Hard)
 * - Backtracking (4-Queens Puzzle) (9 questions: 3 Easy, 3 Medium, 3 Hard)
 * - Dynamic Programming (0/1 Knapsack) (9 questions: 3 Easy, 3 Medium, 3 Hard)
 */
export const TECHNIQUES_QUESTION_BANK: MasteryQuestion[] = [
  // ==========================================
  // TOPIC 1: RECURSION (CALL STACK)
  // ==========================================

  // --- Recursion: Easy ---
  {
    id: 'q-recursion-easy-01',
    algoId: 'recursion',
    tier: 'easy',
    concept: 'Base Case & Stack Overflow Prevention',
    prompt: 'What critical component must every recursive function define to prevent infinite recursion and stack overflow in C?',
    options: [
      {
        id: 'opt-a',
        label: 'A dynamic memory allocation malloc() call on every recursive step.',
        explanation: 'Incorrect. Dynamic allocation does not terminate recursion and would rapidly exhaust heap memory.',
      },
      {
        id: 'opt-b',
        label: 'A Base Case that terminates recursive calls when a stopping condition is met.',
        explanation: 'Correct! The base case provides the non-recursive terminating condition that stops the call stack from growing indefinitely.',
      },
      {
        id: 'opt-c',
        label: 'A global mutex variable tracking recursive calls.',
        explanation: 'Incorrect. Mutexes are concurrency primitives, not termination conditions for recursive functions.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'A recursive function consists of a base case and a recurrence step. Without a base case that is guaranteed to be reached, calls continue until the execution call stack overflows.',
  },
  {
    id: 'q-recursion-easy-02',
    algoId: 'recursion',
    tier: 'easy',
    concept: 'Activation Records & Call Stack Allocation',
    prompt: 'What happens physically in system memory each time a recursive function calls itself in C?',
    options: [
      {
        id: 'opt-a',
        label: 'A new activation record (stack frame) storing local variables, parameters, and the return address is pushed onto the call stack.',
        explanation: 'Correct! Each invocation gets an isolated stack frame containing its local execution context and return pointer.',
      },
      {
        id: 'opt-b',
        label: 'All previous stack frames are discarded and overwritten by the new function invocation.',
        explanation: 'Incorrect. Stack frames persist on the call stack until their respective calls return.',
      },
      {
        id: 'opt-c',
        label: 'The operating system forks a new background process with its own separate heap space.',
        explanation: 'Incorrect. Recursive calls run synchronously inside the same thread and call stack.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The call stack is LIFO. Every recursive call pushes an activation record. This explains why deep recursion consumes O(n) memory even if the code allocates no heap variables.',
  },
  {
    id: 'q-recursion-easy-03',
    algoId: 'recursion',
    tier: 'easy',
    concept: 'Call Stack Unwinding & Return Pass-Back',
    prompt: 'During the execution of a recursive function, what occurs during the "unwinding" phase?',
    options: [
      {
        id: 'opt-a',
        label: 'The compiler converts the recursive function into an iterative while loop at runtime.',
        explanation: 'Incorrect. Unwinding is a runtime call-stack event, not a dynamic compilation step.',
      },
      {
        id: 'opt-b',
        label: 'All memory allocated in the function is permanently converted into global static variables.',
        explanation: 'Incorrect. Unwinding deallocates stack frames as functions return.',
      },
      {
        id: 'opt-c',
        label: 'The base case is reached, and successive function calls return their computed values back up the call stack, popping each frame.',
        explanation: 'Correct! Once the base case returns, execution unwinds in reverse order, resolving pending operations and popping frames.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Recursion has two phases: winding (pushing frames down to base case) and unwinding (popping frames and returning values back up to the initial caller).',
  },

  // --- Recursion: Medium ---
  {
    id: 'q-recursion-med-01',
    algoId: 'recursion',
    tier: 'medium',
    concept: 'Tail Call Optimization (TCO)',
    prompt: 'What characterizes a "tail-recursive" function, and why is it advantageous when optimized by compliant compilers?',
    options: [
      {
        id: 'opt-a',
        label: 'The recursive call is the final operation performed by the function, allowing the compiler to reuse the current stack frame in O(1) auxiliary space instead of pushing a new frame.',
        explanation: 'Correct! When no work remains after the recursive call, the compiler can overwrite the current frame (Tail Call Elimination), achieving O(1) space.',
      },
      {
        id: 'opt-b',
        label: 'The recursive call is executed only when the recursion depth reaches the end of an array.',
        explanation: 'Incorrect. Tail recursion refers to the syntactic position of the recursive call, not input boundaries.',
      },
      {
        id: 'opt-c',
        label: 'The function returns void, ensuring no return value needs to be passed back to the caller.',
        explanation: 'Incorrect. Tail-recursive functions frequently return values using accumulator parameters.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In standard recursion like `return n * fact(n - 1)`, multiplication occurs after the call returns, preventing frame reuse. In tail recursion `return fact_tail(n - 1, n * acc)`, the frame can be replaced in-place.',
  },
  {
    id: 'q-recursion-med-02',
    algoId: 'recursion',
    tier: 'medium',
    concept: 'Direct vs Indirect (Mutual) Recursion',
    prompt: 'What is the defining structural difference between direct recursion and indirect (mutual) recursion?',
    options: [
      {
        id: 'opt-a',
        label: 'Direct recursion runs in O(n) time, whereas indirect recursion always runs in O(1) time.',
        explanation: 'Incorrect. Both forms can have identical asymptotic time complexities.',
      },
      {
        id: 'opt-b',
        label: 'Direct recursion is supported only in interpreted languages, whereas indirect recursion requires C.',
        explanation: 'Incorrect. Both forms are fully supported in C and all major programming languages.',
      },
      {
        id: 'opt-c',
        label: 'In direct recursion, function A calls function A directly; in indirect recursion, function A calls function B, which in turn calls function A.',
        explanation: 'Correct! Indirect (or mutual) recursion involves a cycle across two or more functions (e.g., A -> B -> A).',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Direct recursion calls itself explicitly. Mutual recursion forms a dependency cycle among multiple functions, requiring forward function declarations in C.',
  },
  {
    id: 'q-recursion-med-03',
    algoId: 'recursion',
    tier: 'medium',
    concept: 'Stack Frame Size & System Stack Capacity',
    prompt: 'If a recursive C function uses 128 bytes of stack frame per call, and the operating system allocates an 8 MB default thread stack, approximately how many recursive calls can be made before stack overflow occurs?',
    options: [
      {
        id: 'opt-a',
        label: 'Approximately 65,536 calls (8,388,608 bytes / 128 bytes per frame).',
        explanation: 'Correct! Dividing total stack capacity (8 * 1024 * 1024 = 8,388,608 bytes) by frame size (128 bytes) yields ~65,536 activation records.',
      },
      {
        id: 'opt-b',
        label: 'Exactly 256 calls, because C imposes a hard ceiling of 256 recursive calls regardless of stack size.',
        explanation: 'Incorrect. C standards impose no arbitrary limit on call counts; limits are strictly physical memory constraints.',
      },
      {
        id: 'opt-c',
        label: 'Infinite calls, because the C runtime automatically expands stack memory onto the heap when full.',
        explanation: 'Incorrect. C call stacks are fixed in size per thread; exceeding limits triggers an uncatchable segmentation fault.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Physical call stack capacity is finite. For deep recursive tasks (n >= 10^5), linear recursion in C often crashes with SIGSEGV, necessitating iterative conversions or heap-backed stacks.',
  },

  // --- Recursion: Hard ---
  {
    id: 'q-recursion-hard-01',
    algoId: 'recursion',
    tier: 'hard',
    concept: 'Master Theorem Recurrence Solving',
    prompt: 'For the recurrence relation T(n) = 2T(n/2) + O(n), what is the tight asymptotic time complexity according to the Master Theorem?',
    options: [
      {
        id: 'opt-a',
        label: 'O(n^2), because the branching factor 2 squares the input size at each recursion level.',
        explanation: 'Incorrect. The branching factor splits the problem, it does not square input size.',
      },
      {
        id: 'opt-b',
        label: 'O(n log n), because log_b(a) = log_2(2) = 1 matches the exponent of f(n) = O(n^1) (Case 2 of the Master Theorem).',
        explanation: 'Correct! Since a = 2, b = 2, n^{log_b a} = n^1. Since f(n) = Theta(n^1), T(n) = Theta(n log n) by Case 2 of the Master Theorem.',
      },
      {
        id: 'opt-c',
        label: 'O(log n), because dividing the problem size in half guarantees logarithmic runtime.',
        explanation: 'Incorrect. O(log n) requires a = 1 (single branch), whereas a = 2 branches do O(n) work per level.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'The Master Theorem solves divide-and-conquer recurrences T(n) = aT(n/b) + f(n). When work at each level matches the leaf count (Case 2), the depth log_b(n) multiplies work, yielding O(n log n).',
  },
  {
    id: 'q-recursion-hard-02',
    algoId: 'recursion',
    tier: 'hard',
    concept: 'Naive Fibonacci Recursion Tree Explosion',
    prompt: 'Why does naive recursive Fibonacci `int fib(int n) { if (n <= 1) return n; return fib(n-1) + fib(n-2); }` suffer from O(2^n) exponential time complexity?',
    options: [
      {
        id: 'opt-a',
        label: 'Because it forms a binary recursion tree of height n where overlapping subproblems (e.g., fib(n-2), fib(n-3)) are redundantly recomputed an exponential number of times.',
        explanation: 'Correct! The recursion tree has ~2^n nodes. Overlapping subproblems are re-evaluated from scratch rather than stored, causing exponential explosion.',
      },
      {
        id: 'opt-b',
        label: 'Because each recursive call allocates O(n) bytes on the heap, triggering frequent garbage collection.',
        explanation: 'Incorrect. Naive Fibonacci allocates zero heap memory; the inefficiency is purely algorithmic redundancy.',
      },
      {
        id: 'opt-c',
        label: 'Because signed integer arithmetic slows down exponentially as numbers grow larger in C.',
        explanation: 'Incorrect. Hardware addition executes in O(1) clock cycles; the branching call count is the issue.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Naive Fibonacci has recurrence T(n) = T(n-1) + T(n-2) + O(1) ≈ O(Phi^n) ≈ O(1.618^n) = O(2^n). Storing intermediate results with Memoization or Tabulation drops this to O(n).',
  },
  {
    id: 'q-recursion-hard-03',
    algoId: 'recursion',
    tier: 'hard',
    concept: 'Simulating Recursion via Explicit Heap Stack',
    prompt: 'How can any recursive algorithm be mechanically converted into an iterative algorithm in C to avoid call stack overflow on deep inputs?',
    options: [
      {
        id: 'opt-a',
        label: 'By replacing all recursive calls with goto statements jumping to the start of the function without storing state.',
        explanation: 'Incorrect. `goto` cannot preserve caller return states or local variables across nested invocations.',
      },
      {
        id: 'opt-b',
        label: 'By increasing the CPU clock frequency to process calls before the stack fills.',
        explanation: 'Incorrect. Clock speed has no bearing on stack capacity.',
      },
      {
        id: 'opt-c',
        label: 'By managing an explicit stack data structure on the heap to simulate activation records (storing parameters, local variables, and return states).',
        explanation: 'Correct! Moving frame storage from the thread call stack (8 MB limit) to a heap-allocated stack (gigabytes available) enables arbitrarily deep execution.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Every recursive call is isomorphic to pushing a struct `{ state, params, locals }` to a stack and executing a loop. Since heap memory is orders of magnitude larger than thread stack memory, this avoids stack overflows.',
  },

  // ==========================================
  // TOPIC 2: TWO POINTERS TECHNIQUE
  // ==========================================

  // --- Two Pointers: Easy ---
  {
    id: 'q-two-pointers-easy-01',
    algoId: 'two-pointers',
    tier: 'easy',
    concept: 'Inward Pointers on Sorted Array',
    prompt: 'In the classic Two Sum problem on a pre-sorted array, where are the two pointers initialized and how do they move?',
    options: [
      {
        id: 'opt-a',
        label: 'One pointer starts at index 0 (left) and the other at index n - 1 (right), advancing inward towards each other based on sum comparisons.',
        explanation: 'Correct! Initializing at opposite ends allows monotonic narrowing of the search space in O(n) time.',
      },
      {
        id: 'opt-b',
        label: 'Both pointers start at index 0 and move synchronously to the right at the exact same speed.',
        explanation: 'Incorrect. Moving at the same speed maintains a constant distance and does not narrow pairs.',
      },
      {
        id: 'opt-c',
        label: 'Both pointers start at index n / 2 and move outward away from each other towards the ends.',
        explanation: 'Incorrect. Inward-moving pointers provide a clear termination condition (`left < right`).',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Opposite-end Two Pointers leverages array sortedness: left points to smallest available value, right to largest. Comparing their sum with the target directs exactly which pointer must step.',
  },
  {
    id: 'q-two-pointers-easy-02',
    algoId: 'two-pointers',
    tier: 'easy',
    concept: 'Monotonic Pointer Decision Rule',
    prompt: 'When running Two Pointers on a sorted array seeking target T, if `arr[left] + arr[right] < T`, what pointer update is mathematically required?',
    options: [
      {
        id: 'opt-a',
        label: 'Decrement right--, because moving right to the left decreases the sum.',
        explanation: 'Incorrect. Decrementing right would make the sum even smaller, moving further away from target T.',
      },
      {
        id: 'opt-b',
        label: 'Increment left++, because moving left to the right increases arr[left], potentially raising the sum towards T.',
        explanation: 'Correct! Since the array is sorted, advancing left to a higher index increases the candidate sum.',
      },
      {
        id: 'opt-c',
        label: 'Reset both left = 0 and right = n - 1 back to the starting boundaries.',
        explanation: 'Incorrect. Two Pointers moves monotonically without resetting.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'Because `arr` is sorted: if sum < target, no smaller right can ever pair with `arr[left]` to hit target, so `left` is eliminated via `left++`. If sum > target, `right--` eliminates `right`.',
  },
  {
    id: 'q-two-pointers-easy-03',
    algoId: 'two-pointers',
    tier: 'easy',
    concept: 'Complexity Reduction vs Nested Loops',
    prompt: 'What is the primary asymptotic time complexity advantage of applying Two Pointers to find a pair sum on a pre-sorted array of size n?',
    options: [
      {
        id: 'opt-a',
        label: 'It reduces linear time O(n) down to constant time O(1).',
        explanation: 'Incorrect. Two Pointers still inspects elements linearly across the array.',
      },
      {
        id: 'opt-b',
        label: 'It reduces space complexity from O(n) to O(1/n).',
        explanation: 'Incorrect. O(1/n) is not a standard computational space complexity.',
      },
      {
        id: 'opt-c',
        label: 'It reduces the quadratic brute-force nested-loop time of O(n^2) down to linear O(n).',
        explanation: 'Correct! Instead of checking all n*(n-1)/2 pairs in O(n^2), each step discards at least one element, finishing in at most n steps (O(n)).',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Brute force checks all pairs (O(n^2)). Two Pointers uses sorted monotonicity to discard an entire row or column of pairs per step, solving the problem in O(n) time and O(1) space.',
  },

  // --- Two Pointers: Medium ---
  {
    id: 'q-two-pointers-med-01',
    algoId: 'two-pointers',
    tier: 'medium',
    concept: 'Floyd\'s Cycle Finding (Fast & Slow Pointers)',
    prompt: 'In Floyd\'s Cycle-Finding Algorithm (Tortoise and Hare), how do the two pointers traverse a linked list to detect a cycle?',
    options: [
      {
        id: 'opt-a',
        label: 'The slow pointer advances 1 step at a time while the fast pointer advances 2 steps at a time; if a cycle exists, they must eventually meet inside the cycle.',
        explanation: 'Correct! The fast pointer closes the gap by 1 node per iteration inside a cycle of length C, guaranteeing collision within C steps.',
      },
      {
        id: 'opt-b',
        label: 'Both pointers advance 1 step at a time, but in opposite directions along the list.',
        explanation: 'Incorrect. Singly linked lists have unidirectional `next` pointers and cannot be traversed backwards.',
      },
      {
        id: 'opt-c',
        label: 'The fast pointer jumps directly to the end of the list and searches backwards toward the slow pointer.',
        explanation: 'Incorrect. A cyclical linked list has no end (null pointer).',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Fast and slow pointers move in the same direction at different speeds. The relative speed difference is 1 step/iteration, ensuring the fast runner catches the slow runner inside any loop.',
  },
  {
    id: 'q-two-pointers-med-02',
    algoId: 'two-pointers',
    tier: 'medium',
    concept: 'In-Place Deduplication with Read/Write Pointers',
    prompt: 'When using Two Pointers to remove duplicate values in-place from a sorted array `arr` of size n, how do the read and write pointers interact?',
    options: [
      {
        id: 'opt-a',
        label: 'The write pointer moves backwards from n - 1 while the read pointer stays at index 0.',
        explanation: 'Incorrect. Both pointers progress forward from index 0.',
      },
      {
        id: 'opt-b',
        label: 'Both pointers swap elements unconditionally on every iteration.',
        explanation: 'Incorrect. Swapping on every step would destroy sorted ordering.',
      },
      {
        id: 'opt-c',
        label: 'A write pointer tracks the boundary of unique elements; a fast read pointer scans forward, and whenever arr[read] != arr[write], write is incremented and updated with arr[read].',
        explanation: 'Correct! The write pointer advances only when a novel unique element is discovered by the read pointer, packing unique elements into `arr[0..write]`.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'This slow/fast pattern partitions the array in-place into processed unique elements `[0..write]` and unexamined elements `[read..n-1]` in O(n) time and O(1) space.',
  },
  {
    id: 'q-two-pointers-med-03',
    algoId: 'two-pointers',
    tier: 'medium',
    concept: 'Monotonicity Requirement & Unsorted Data Limitation',
    prompt: 'Why can the inward-moving Two Pointers technique NOT be applied directly to an arbitrary unsorted array to solve Two Sum?',
    options: [
      {
        id: 'opt-a',
        label: 'Because unsorted arrays cannot be indexed using two pointer variables simultaneously in C.',
        explanation: 'Incorrect. C supports multiple pointers on any array regardless of content.',
      },
      {
        id: 'opt-b',
        label: 'Because without sorted monotonicity, arr[left] + arr[right] < T does not guarantee that incrementing left will increase the sum or that decrementing right will decrease it.',
        explanation: 'Correct! Without sorting, moving a pointer could randomly increase, decrease, or maintain the sum, destroying the mathematical elimination guarantee.',
      },
      {
        id: 'opt-c',
        label: 'Because unsorted arrays require 64-bit pointers while sorted arrays use 32-bit pointers.',
        explanation: 'Incorrect. Pointer bit-width is determined by CPU architecture, not array contents.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'Two Pointers relies on a monotonic decision invariant. On unsorted data, stepping a pointer provides zero guarantee of sum direction, requiring either prior sorting (O(n log n)) or a hash map (O(n) space).',
  },

  // --- Two Pointers: Hard ---
  {
    id: 'q-two-pointers-hard-01',
    algoId: 'two-pointers',
    tier: 'hard',
    concept: 'Container With Most Water Greedy Proof',
    prompt: 'In the "Container With Most Water" problem with vertical lines at indices left and right, why is it mathematically optimal to advance the pointer pointing to the shorter line?',
    options: [
      {
        id: 'opt-a',
        label: 'The container area is limited by min(h[left], h[right]) * (right - left). Advancing the taller pointer decreases width while height cannot exceed the shorter line, guaranteeing no larger area; thus, only advancing the shorter pointer can potentially find a larger area.',
        explanation: 'Correct! Any other line paired with the current shorter line will have smaller width and at most equal height, so the shorter line can be permanently discarded.',
      },
      {
        id: 'opt-b',
        label: 'Advancing the shorter line pointer guarantees that the width between pointers increases.',
        explanation: 'Incorrect. Advancing either pointer always decreases the width by 1.',
      },
      {
        id: 'opt-c',
        label: 'Advancing the taller line pointer causes an immediate out-of-bounds memory error.',
        explanation: 'Incorrect. Both pointers remain safely within array bounds.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Area = width * min(h[l], h[r]). If h[l] < h[r], pairing l with any other index between l and r has width < (r - l) and height <= h[l], strictly yielding smaller area. Thus, l is provably exhausted.',
  },
  {
    id: 'q-two-pointers-hard-02',
    algoId: 'two-pointers',
    tier: 'hard',
    concept: '3Sum Problem Reduction & Duplicate Pruning',
    prompt: 'How does the optimal Two Pointers algorithm solve the 3Sum problem (finding all unique triplets summing to 0) in O(n^2) time?',
    options: [
      {
        id: 'opt-a',
        label: 'Use three nested while loops advancing three pointers at different speeds in O(n^3) time.',
        explanation: 'Incorrect. Three nested loops is brute force O(n^3).',
      },
      {
        id: 'opt-b',
        label: 'Sort the array in O(n log n), then fix each element i from 0 to n - 3, using Two Pointers on the remaining subarray to find pairs summing to -arr[i] while skipping duplicate values.',
        explanation: 'Correct! Fixing one element reduces 3Sum to 2Sum on the remaining sorted slice in O(n). Repeating for n elements yields O(n^2) total runtime.',
      },
      {
        id: 'opt-c',
        label: 'Hash all possible triplets into a 3D hash table of size O(n^3).',
        explanation: 'Incorrect. This consumes excessive O(n^3) memory.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'Sorting enables two benefits: reducing k-Sum to (k-1)-Sum via Two Pointers, and trivially skipping duplicates by checking `if (i > 0 && arr[i] == arr[i - 1]) continue;`.',
  },
  {
    id: 'q-two-pointers-hard-03',
    algoId: 'two-pointers',
    tier: 'hard',
    concept: 'Trapping Rain Water O(1) Auxiliary Space Invariant',
    prompt: 'In the Trapping Rain Water problem, how does the two-pointer approach achieve O(n) time and O(1) auxiliary space without precomputing prefix and suffix max arrays?',
    options: [
      {
        id: 'opt-a',
        label: 'By filling the entire elevation array with water and draining it using BFS from the edges.',
        explanation: 'Incorrect. Draining simulations require 2D priority queues and higher space overhead.',
      },
      {
        id: 'opt-b',
        label: 'By computing the convex hull of the elevation map in O(n log n) time.',
        explanation: 'Incorrect. Convex hulls do not account for interior water collection pockets.',
      },
      {
        id: 'opt-c',
        label: 'By maintaining leftMax and rightMax; if leftMax < rightMax, the trapped water at left is strictly bounded by leftMax - height[left] regardless of higher peaks to the right, allowing left++ to proceed safely.',
        explanation: 'Correct! Because water level is determined by min(leftMax, rightMax), knowing that leftMax < rightMax guarantees that the bottleneck on the left is known, permitting immediate calculation.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Water trapped at i is `min(maxL, maxR) - h[i]`. If `leftMax < rightMax`, we know that whatever lies in between cannot pull the bottleneck below `leftMax`, so left can be evaluated without knowing the exact maxR.',
  },

  // ==========================================
  // TOPIC 3: SLIDING WINDOW TECHNIQUE
  // ==========================================

  // --- Sliding Window: Easy ---
  {
    id: 'q-sliding-window-easy-01',
    algoId: 'sliding-window',
    tier: 'easy',
    concept: 'Fixed-Size Window Transition Formula',
    prompt: 'In a fixed-size sliding window of size k on an array, how is the sum of the new window computed in O(1) time when shifting one position to the right?',
    options: [
      {
        id: 'opt-a',
        label: 'Sum all k elements from scratch using a nested loop `for (int j = 0; j < k; j++)`.',
        explanation: 'Incorrect. Summing from scratch takes O(k) per step rather than O(1).',
      },
      {
        id: 'opt-b',
        label: 'newSum = oldSum + arr[i] - arr[i - k] (add the incoming element and subtract the outgoing element).',
        explanation: 'Correct! Reusing overlapping elements allows the window sum to update in strictly two arithmetic operations (O(1)).',
      },
      {
        id: 'opt-c',
        label: 'Multiply oldSum by (arr[i] / arr[i - k]).',
        explanation: 'Incorrect. Arithmetic sums are additive, not multiplicative.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'The sliding window invariant reuses computation: adjacent windows of size k share k - 1 elements. Subtracting the left-leaving element and adding the right-entering element takes O(1) time.',
  },
  {
    id: 'q-sliding-window-easy-02',
    algoId: 'sliding-window',
    tier: 'easy',
    concept: 'Complexity Advantage over Brute Force',
    prompt: 'What is the asymptotic time complexity of finding the maximum sum subarray of fixed size k in an array of size n using a sliding window versus a naive nested loop?',
    options: [
      {
        id: 'opt-a',
        label: 'Sliding window runs in O(n) time, whereas the naive nested loop takes O(n * k) time.',
        explanation: 'Correct! Sliding window inspects each element once, transforming O(n * k) into O(n).',
      },
      {
        id: 'opt-b',
        label: 'Sliding window runs in O(log n) time, whereas the naive nested loop takes O(n) time.',
        explanation: 'Incorrect. Sliding window requires scanning the array linearly (O(n)).',
      },
      {
        id: 'opt-c',
        label: 'Both approaches run in identical O(n * k) time, but sliding window uses less RAM.',
        explanation: 'Incorrect. Sliding window strictly improves the time complexity from O(n * k) to O(n).',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Naive nested iteration computes n - k + 1 subarrays of size k, taking O(n * k). Sliding window computes the first window in O(k) and slides n - k times in O(1), totaling O(n).',
  },
  {
    id: 'q-sliding-window-easy-03',
    algoId: 'sliding-window',
    tier: 'easy',
    concept: 'Contiguous Subarray Structural Constraint',
    prompt: 'What fundamental structural requirement must a problem satisfy to be solvable with the Sliding Window technique?',
    options: [
      {
        id: 'opt-a',
        label: 'The array elements must be strictly sorted in ascending order.',
        explanation: 'Incorrect. Sliding window works on unsorted collections as long as subarrays are contiguous.',
      },
      {
        id: 'opt-b',
        label: 'The array must have a size that is an exact power of 2.',
        explanation: 'Incorrect. Sliding window operates on arbitrary array lengths.',
      },
      {
        id: 'opt-c',
        label: 'The target elements must form a contiguous subarray or substring within the sequential input.',
        explanation: 'Correct! Sliding window operates exclusively on contiguous blocks of sequential data.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Sliding window tracks contiguous intervals `[left..right]`. If a problem asks for non-contiguous subsequences or arbitrary subsets, sliding window cannot be applied directly.',
  },

  // --- Sliding Window: Medium ---
  {
    id: 'q-sliding-window-med-01',
    algoId: 'sliding-window',
    tier: 'medium',
    concept: 'Variable-Size Window Expand & Shrink Invariant',
    prompt: 'How does a variable-size sliding window maintain its invariant when searching for the longest valid subarray satisfying condition C?',
    options: [
      {
        id: 'opt-a',
        label: 'The right pointer expands the window by including elements until condition C is violated; the left pointer then shrinks the window from the left until condition C is restored.',
        explanation: 'Correct! The two-phase expansion (to include candidates) and contraction (to restore validity) is the canonical variable-window pattern.',
      },
      {
        id: 'opt-b',
        label: 'Both left and right pointers expand simultaneously on every iteration, doubling the window size.',
        explanation: 'Incorrect. Doubling window size skips potential intermediate subarray lengths.',
      },
      {
        id: 'opt-c',
        label: 'The left pointer scans backwards while the right pointer remains stationary.',
        explanation: 'Incorrect. Both pointers move monotonically forward.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In variable sliding windows: expand right to gather elements, and when an invariant is violated (e.g. sum > limit or duplicates > 0), shrink left until validity is restored.',
  },
  {
    id: 'q-sliding-window-med-02',
    algoId: 'sliding-window',
    tier: 'medium',
    concept: 'Amortized O(n) Runtime Analysis',
    prompt: 'In a variable-size sliding window with an inner `while` loop that advances the left boundary, why is the overall time complexity still O(n) rather than O(n^2)?',
    options: [
      {
        id: 'opt-a',
        label: 'Because modern CPU branch predictors optimize inner while loops into O(1) instructions.',
        explanation: 'Incorrect. Hardware branch prediction does not alter asymptotic algorithmic complexity.',
      },
      {
        id: 'opt-b',
        label: 'Because the inner while loop only executes when n is an even integer.',
        explanation: 'Incorrect. The loop executes based on window validity, not parity of n.',
      },
      {
        id: 'opt-c',
        label: 'Because both the right pointer and the left pointer move monotonically forward at most n times each, so each element enters and leaves the window at most once (at most 2n operations).',
        explanation: 'Correct! Even though the inner loop runs multiple times on some steps, the left pointer never resets backwards; across the entire algorithm it advances at most n times.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Amortized analysis aggregates work: right increments n times, left increments at most n times. Total pointer operations <= 2n, proving strict O(n) runtime despite nested loops.',
  },
  {
    id: 'q-sliding-window-med-03',
    algoId: 'sliding-window',
    tier: 'medium',
    concept: 'Frequency Map & Window State Tracking',
    prompt: 'In the "Longest Substring Without Repeating Characters" problem, how is the sliding window state tracked to achieve O(n) time?',
    options: [
      {
        id: 'opt-a',
        label: 'An array or hash map stores the last seen index of each character; when a duplicate character is encountered at index right, left jumps to max(left, lastSeen[char] + 1).',
        explanation: 'Correct! Direct index lookups allow `left` to skip directly past the duplicate without stepping one-by-one, keeping execution strictly linear.',
      },
      {
        id: 'opt-b',
        label: 'A circular buffer stores all permutations of characters in O(n!) space.',
        explanation: 'Incorrect. Permutation buffers are unnecessary and exponentially expensive.',
      },
      {
        id: 'opt-c',
        label: 'The entire substring is cleared back to empty every time any character repeats.',
        explanation: 'Incorrect. Clearing the window discards valid non-overlapping prefixes.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Tracking character locations in an integer table `lastSeen[256]` in C allows jumping `left = max(left, lastSeen[c] + 1)`, ensuring each character is processed in O(1) amortized time.',
  },

  // --- Sliding Window: Hard ---
  {
    id: 'q-sliding-window-hard-01',
    algoId: 'sliding-window',
    tier: 'hard',
    concept: 'Monotonic Deque for Sliding Window Maximum',
    prompt: 'How does the optimal sliding window maximum algorithm find the maximum in every window of size k in O(n) total time?',
    options: [
      {
        id: 'opt-a',
        label: 'By maintaining a double-ended queue (deque) of indices where values are strictly monotonically decreasing; elements smaller than the incoming item are popped from the back, and expired indices are popped from the front.',
        explanation: 'Correct! A monotonic decreasing deque maintains the maximum at its front in O(1) time. Each element is pushed and popped at most once, yielding O(n) total runtime.',
      },
      {
        id: 'opt-b',
        label: 'By sorting the window elements using Quicksort after every slide in O(n log k) time.',
        explanation: 'Incorrect. Sorting every window takes O(n * k log k), which is much slower.',
      },
      {
        id: 'opt-c',
        label: 'By inserting all window elements into a binary search tree without balancing.',
        explanation: 'Incorrect. Unbalanced BSTs degrade to O(k) per step (O(n * k) worst-case).',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'A monotonic deque stores potential future maximums. If incoming `arr[i] >= arr[back]`, `arr[back]` can never be the maximum of any future window containing `arr[i]`, so it is popped.',
  },
  {
    id: 'q-sliding-window-hard-02',
    algoId: 'sliding-window',
    tier: 'hard',
    concept: 'Negative Numbers & Monotonicity Failure',
    prompt: 'Why does the standard variable-size sliding window fail to solve the "Subarray Sum Equals K" problem when the array contains negative numbers?',
    options: [
      {
        id: 'opt-a',
        label: 'Because negative integers cannot be stored in C array indices.',
        explanation: 'Incorrect. Array values and array indices are distinct concepts.',
      },
      {
        id: 'opt-b',
        label: 'Because sliding windows require edge weights to be non-zero graph vertices.',
        explanation: 'Incorrect. Sliding window is an array technique, not a graph algorithm.',
      },
      {
        id: 'opt-c',
        label: 'Because negative numbers destroy monotonicity: expanding the window can decrease the sum, and shrinking can increase the sum, breaking the greedy decision rule (requiring prefix sums + hash map instead).',
        explanation: 'Correct! Without positive-only values, window sum is non-monotonic, so advancing left or right cannot guarantee sum direction. Prefix sums with hash tables must be used instead.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Variable sliding windows strictly require that expanding increases the metric and shrinking decreases it. Negative numbers break this monotonicity, rendering sliding window invalid.',
  },
  {
    id: 'q-sliding-window-hard-03',
    algoId: 'sliding-window',
    tier: 'hard',
    concept: 'Minimum Window Substring Match Invariant',
    prompt: 'In the Minimum Window Substring problem (finding the shortest substring of S containing all characters of T), how does the sliding window verify all target characters are satisfied in O(1) per step?',
    options: [
      {
        id: 'opt-a',
        label: 'By re-scanning the entire string T on every single right-pointer increment.',
        explanation: 'Incorrect. Scanning T on every step takes O(|T|) per step, destroying linear runtime.',
      },
      {
        id: 'opt-b',
        label: 'By maintaining a matchCount tracking how many unique characters have met their required target frequencies; when matchCount == requiredUnique, the window is valid and can attempt shrinking from the left.',
        explanation: 'Correct! Incrementing `matchCount` only when `windowFreq[c] == targetFreq[c]` allows checking completeness in O(1) time without looping over T.',
      },
      {
        id: 'opt-c',
        label: 'By sorting strings S and T alphabetically at the start of every iteration.',
        explanation: 'Incorrect. Sorting destroys the original character positions in S.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'Tracking the count of satisfied distinct character constraints (`formed == required`) enables instantaneous O(1) validity checking, keeping the total runtime at O(|S| + |T|).',
  },

  // ==========================================
  // TOPIC 4: DIVIDE & CONQUER (BINARY EXPONENTIATION)
  // ==========================================

  // --- Divide & Conquer: Easy ---
  {
    id: 'q-divide-and-conquer-easy-01',
    algoId: 'divide-and-conquer',
    tier: 'easy',
    concept: 'Three Phases of Divide and Conquer',
    prompt: 'What are the three conceptual phases that define every Divide-and-Conquer algorithm?',
    options: [
      {
        id: 'opt-a',
        label: 'Divide the problem into subproblems, Conquer subproblems recursively, and Combine their solutions into the final answer.',
        explanation: 'Correct! Divide (break down), Conquer (solve base/subproblems), and Combine (merge results) form the universal paradigm.',
      },
      {
        id: 'opt-b',
        label: 'Allocate memory, Iterate over array, and Free memory.',
        explanation: 'Incorrect. This describes standard C memory lifecycle, not an algorithmic paradigm.',
      },
      {
        id: 'opt-c',
        label: 'Sort inputs, Hash keys, and Filter results.',
        explanation: 'Incorrect. This is a data-processing pipeline, not divide and conquer.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Divide & Conquer partitions a problem into smaller instances of the same problem, recurses until base cases, and merges the partial results.',
  },
  {
    id: 'q-divide-and-conquer-easy-02',
    algoId: 'divide-and-conquer',
    tier: 'easy',
    concept: 'Binary Exponentiation Even Power Recurrence',
    prompt: 'In Binary Exponentiation (computing x^n using Divide & Conquer), what recurrence relation is used when the exponent n is an even positive integer?',
    options: [
      {
        id: 'opt-a',
        label: 'x^n = x * x^(n - 1) (multiply x by itself n times sequentially).',
        explanation: 'Incorrect. Linear subtraction produces naive O(n) multiplication, not divide and conquer.',
      },
      {
        id: 'opt-b',
        label: 'x^n = (x^2)^(n - 2) (square the base and subtract 2 from the exponent).',
        explanation: 'Incorrect. This does not halve the exponent.',
      },
      {
        id: 'opt-c',
        label: 'x^n = (x^(n / 2))^2 (compute x^(n/2) once recursively, then square the result).',
        explanation: 'Correct! By computing half = power(x, n/2) once and returning half * half, problem size n is halved in 1 multiplication.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Halving the exponent: x^n = (x^(n/2))^2. Computing `half = power(x, n/2)` once and squaring takes 1 multiplication per level, halving the problem size.',
  },
  {
    id: 'q-divide-and-conquer-easy-03',
    algoId: 'divide-and-conquer',
    tier: 'easy',
    concept: 'Logarithmic Multiplication Complexity',
    prompt: 'How many multiplications does Binary Exponentiation perform to calculate x^n compared to naive linear multiplication?',
    options: [
      {
        id: 'opt-a',
        label: 'O(1) multiplications, compared to O(log n) for naive multiplication.',
        explanation: 'Incorrect. Binary exponentiation requires O(log n) steps, not O(1).',
      },
      {
        id: 'opt-b',
        label: 'O(log n) multiplications, compared to O(n) for naive sequential multiplication.',
        explanation: 'Correct! Repeatedly halving exponent n reduces multiplication count from n down to at most 2 * log_2(n).',
      },
      {
        id: 'opt-c',
        label: 'O(n log n) multiplications, compared to O(n^2) for naive multiplication.',
        explanation: 'Incorrect. Multiplication count is strictly logarithmic O(log n).',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'For n = 1,000,000, naive multiplication takes ~1,000,000 operations. Binary exponentiation takes ~20 multiplications (log_2 10^6 ≈ 20), an astronomical performance gain.',
  },

  // --- Divide & Conquer: Medium ---
  {
    id: 'q-divide-and-conquer-med-01',
    algoId: 'divide-and-conquer',
    tier: 'medium',
    concept: 'Binary Exponentiation Odd Power Handling',
    prompt: 'In Binary Exponentiation, what operation is performed when the exponent n is an odd positive integer?',
    options: [
      {
        id: 'opt-a',
        label: 'Add x to the result and divide the base by 2.',
        explanation: 'Incorrect. Exponentiation is multiplicative, not additive.',
      },
      {
        id: 'opt-b',
        label: 'x^n = x * (x^((n - 1) / 2))^2 (extract one factor of x, making the remaining exponent even, and apply the even rule).',
        explanation: 'Correct! In integer division `n / 2` in C, `half = power(x, n / 2)` computes x^((n-1)/2). Returning `x * half * half` resolves odd exponents correctly.',
      },
      {
        id: 'opt-c',
        label: 'Round n up to the next even number and calculate the square root.',
        explanation: 'Incorrect. Square roots are not used in integer binary exponentiation.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'For odd n: x^n = x * x^(n - 1) = x * (x^(n/2))^2 in C integer division. One extra multiplication handles the parity difference.',
  },
  {
    id: 'q-divide-and-conquer-med-02',
    algoId: 'divide-and-conquer',
    tier: 'medium',
    concept: 'Disjoint vs Overlapping Subproblems',
    prompt: 'What is the fundamental difference in subproblem relationships between Divide-and-Conquer and Dynamic Programming?',
    options: [
      {
        id: 'opt-a',
        label: 'Divide-and-Conquer solves disjoint, independent subproblems; Dynamic Programming solves overlapping subproblems by caching and reusing intermediate results.',
        explanation: 'Correct! Divide-and-conquer subproblems do not share state (e.g. left and right halves in Merge Sort); DP problems share repeated subproblems.',
      },
      {
        id: 'opt-b',
        label: 'Divide-and-Conquer works only on numbers, while Dynamic Programming works only on strings.',
        explanation: 'Incorrect. Both paradigms apply to numbers, strings, graphs, and matrices.',
      },
      {
        id: 'opt-c',
        label: 'Divide-and-Conquer uses iteration, while Dynamic Programming is strictly recursive with no loops.',
        explanation: 'Incorrect. Both paradigms can be formulated recursively or iteratively.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'If subproblems are independent (disjoint), divide and conquer solves each once. If subproblems overlap (same inputs appear across branches), divide and conquer duplicates work exponentially, requiring DP.',
  },
  {
    id: 'q-divide-and-conquer-med-03',
    algoId: 'divide-and-conquer',
    tier: 'medium',
    concept: 'Modular Exponentiation & Integer Overflow Prevention',
    prompt: 'Why is Modular Exponentiation `(x^n) % m` in cryptography (e.g., RSA) always computed by applying the modulo operation at every intermediate multiplication step rather than once at the end?',
    options: [
      {
        id: 'opt-a',
        label: 'Because applying modulo at each step reduces the time complexity from O(log n) to O(1).',
        explanation: 'Incorrect. The step count remains O(log n).',
      },
      {
        id: 'opt-b',
        label: 'Because the C language prohibits performing the % modulo operator on numbers greater than 100.',
        explanation: 'Incorrect. C operators work on standard hardware integer bit-widths.',
      },
      {
        id: 'opt-c',
        label: 'Because x^n grows astronomically large (hundreds of digits), causing massive integer overflow in standard hardware registers unless reduced modulo m after every multiplication.',
        explanation: 'Correct! By the identity (a * b) % m = ((a % m) * (b % m)) % m, applying modulo after each multiply keeps values bounded within [0, m - 1], fitting in standard integer types.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'In RSA cryptography, n has hundreds of bits. x^n would exceed available universe storage if evaluated unreduced. Applying modulo at every multiplication keeps values comfortably bounded.',
  },

  // --- Divide & Conquer: Hard ---
  {
    id: 'q-divide-and-conquer-hard-01',
    algoId: 'divide-and-conquer',
    tier: 'hard',
    concept: 'Merge Sort Combine Phase Recurrence',
    prompt: 'Why does Merge Sort\'s recurrence T(n) = 2T(n/2) + O(n) result in O(n log n) runtime, and which phase takes the linear O(n) time?',
    options: [
      {
        id: 'opt-a',
        label: 'The Combine phase takes O(n) to merge two sorted halves using two pointers; the recursion tree has log_2(n) levels, each doing total O(n) merge work, yielding O(n log n).',
        explanation: 'Correct! Dividing the array is O(1) pointer arithmetic; merging two sorted halves takes O(n). Across all log_2(n) levels, work sums to O(n log n).',
      },
      {
        id: 'opt-b',
        label: 'The Divide phase takes O(n) to copy array pointers into separate hardware threads.',
        explanation: 'Incorrect. Finding the midpoint `mid = (low + high) / 2` takes O(1) time.',
      },
      {
        id: 'opt-c',
        label: 'The Base Case takes O(n) because sorting an array of size 1 requires a linear search.',
        explanation: 'Incorrect. A single-element array is sorted by definition in O(1) time.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In Merge Sort, all substantive work occurs in the Combine phase: merging two sorted runs into one auxiliary buffer. With log n tree depth and n items merged per level, runtime is strictly Theta(n log n).',
  },
  {
    id: 'q-divide-and-conquer-hard-02',
    algoId: 'divide-and-conquer',
    tier: 'hard',
    concept: 'Closest Pair of Points Geometric Packing Bound',
    prompt: 'In the O(n log n) Divide-and-Conquer algorithm for the Closest Pair of Points in 2D space, how is the combine step bounded to linear time across the dividing vertical line?',
    options: [
      {
        id: 'opt-a',
        label: 'All points in the strip are compared pairwise in O(d^2) time.',
        explanation: 'Incorrect. Unbounded pairwise comparisons would degrade the combine step to quadratic O(n^2).',
      },
      {
        id: 'opt-b',
        label: 'Points across the boundary are discarded because the closest pair can never cross the median line.',
        explanation: 'Incorrect. The closest pair could easily straddle the median line.',
      },
      {
        id: 'opt-c',
        label: 'Within a strip of width 2*d around the dividing line, each point needs to be compared with at most 7 subsequent points sorted by y-coordinate due to geometric packing constraints.',
        explanation: 'Correct! In a d x 2d rectangle, at most 8 points can exist with mutual distance >= d. Thus, comparing each point against at most 7 neighbors in y-order yields O(n) combine time.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Geometric sparsity ensures that in any d/2 x d/2 sub-box, at most 1 point can fit. This packing argument caps candidates per point to <= 7, preserving the O(n log n) divide-and-conquer bound.',
  },
  {
    id: 'q-divide-and-conquer-hard-03',
    algoId: 'divide-and-conquer',
    tier: 'hard',
    concept: 'Strassen\'s Matrix Multiplication Recurrence',
    prompt: 'How does Strassen\'s matrix multiplication algorithm beat standard O(n^3) matrix multiplication using Divide and Conquer?',
    options: [
      {
        id: 'opt-a',
        label: 'It computes the matrix determinant first in O(1) time and inverts the diagonal.',
        explanation: 'Incorrect. Determinants cannot be computed in O(1) for n x n matrices.',
      },
      {
        id: 'opt-b',
        label: 'It reduces the number of submatrix multiplications from 8 down to 7 (at the cost of extra additions), yielding recurrence T(n) = 7T(n/2) + O(n^2), which solves to O(n^(log_2 7)) ≈ O(n^2.807).',
        explanation: 'Correct! By trading 1 expensive recursive multiplication for 18 matrix additions, the branching factor drops from 8 to 7, reducing asymptotic complexity to O(n^2.807).',
      },
      {
        id: 'opt-c',
        label: 'It transposes the matrix and performs binary search on row vectors in O(n^2 log n).',
        explanation: 'Incorrect. Binary search cannot perform matrix multiplication.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'Standard 2x2 block multiplication requires 8 multiplications (T(n) = 8T(n/2) + O(n^2) = O(n^3)). Strassen cleverly computes 7 intermediate products, lowering the exponent from 3 to log_2(7) ≈ 2.807.',
  },

  // ==========================================
  // TOPIC 5: GREEDY ALGORITHMS (ACTIVITY SELECTION)
  // ==========================================

  // --- Greedy: Easy ---
  {
    id: 'q-greedy-easy-01',
    algoId: 'greedy',
    tier: 'easy',
    concept: 'Core Greedy Choice Property',
    prompt: 'What fundamental principle defines a Greedy Algorithm?',
    options: [
      {
        id: 'opt-a',
        label: 'It evaluates every possible combination of choices in a state space tree before selecting the optimal path.',
        explanation: 'Incorrect. Evaluating all combinations describes brute force or backtracking, not greedy.',
      },
      {
        id: 'opt-b',
        label: 'It divides the input into two equal halves and solves each half independently.',
        explanation: 'Incorrect. That describes Divide and Conquer.',
      },
      {
        id: 'opt-c',
        label: 'At each decision step, it selects the locally optimal choice that looks best at the current moment, without ever backtracking or revising previous choices.',
        explanation: 'Correct! Greedy algorithms make irrevocable local optimal choices at each step, relying on problem structure to guarantee a global optimum.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'A greedy algorithm makes the immediate best choice without backtracking. For problems with the Greedy Choice Property and Optimal Substructure, this yields the global optimum.',
  },
  {
    id: 'q-greedy-easy-02',
    algoId: 'greedy',
    tier: 'easy',
    concept: 'Activity Selection Sorting Criterion',
    prompt: 'In the classic Activity Selection problem (maximizing the number of mutually compatible activities), by which metric must activities be sorted before greedy selection?',
    options: [
      {
        id: 'opt-a',
        label: 'By their Finish Times in ascending order (earliest finish time first).',
        explanation: 'Correct! Sorting by finish time ensures that selecting the first compatible activity leaves the maximum remaining time window for subsequent activities.',
      },
      {
        id: 'opt-b',
        label: 'By their Start Times in ascending order (earliest start time first).',
        explanation: 'Incorrect. An early starting activity might run for hours and block many shorter activities.',
      },
      {
        id: 'opt-c',
        label: 'By their total Duration in descending order (longest activity first).',
        explanation: 'Incorrect. Longest activities block other activities and minimize scheduling capacity.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Sorting by finish time `f[i]` is the proven greedy strategy. An activity that finishes earliest frees up the resource as early as possible for future candidates.',
  },
  {
    id: 'q-greedy-easy-03',
    algoId: 'greedy',
    tier: 'easy',
    concept: 'Intuitive Rationale of Earliest Finish Time',
    prompt: 'What is the intuitive rationale behind choosing the activity that finishes earliest in Activity Selection?',
    options: [
      {
        id: 'opt-a',
        label: 'It guarantees that the activity with the highest monetary payoff is always executed first.',
        explanation: 'Incorrect. Unweighted activity selection maximizes activity count, not monetary values.',
      },
      {
        id: 'opt-b',
        label: 'Finishing an activity as early as possible frees up the maximum remaining time window for scheduling future compatible activities.',
        explanation: 'Correct! Ending early minimizes resource lock-in and leaves the largest possible remaining timeline [finish, infinity) for subsequent activities.',
      },
      {
        id: 'opt-c',
        label: 'It minimizes the number of CPU interrupts required by the operating system scheduler.',
        explanation: 'Incorrect. Hardware interrupt count is unrelated to interval scheduling optimality.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'By choosing the activity that finishes earliest, we leave as much time as possible for remaining activities. Mathematically, this choice cannot restrict future compatibility more than any alternative choice.',
  },

  // --- Greedy: Medium ---
  {
    id: 'q-greedy-med-01',
    algoId: 'greedy',
    tier: 'medium',
    concept: 'Activity Compatibility Invariant',
    prompt: 'In Activity Selection with activities sorted by finish time `f[]`, under what condition is the next candidate activity `j` compatible with previously selected activity `i`?',
    options: [
      {
        id: 'opt-a',
        label: 's[j] >= f[i] (the start time of activity j is greater than or equal to the finish time of activity i).',
        explanation: 'Correct! Two activities are compatible if their time intervals do not overlap, meaning activity j starts after or at the exact instant activity i concludes.',
      },
      {
        id: 'opt-b',
        label: 'f[j] <= s[i] (the finish time of activity j is less than the start time of activity i).',
        explanation: 'Incorrect. Candidate activities are evaluated in forward chronological order of finish time.',
      },
      {
        id: 'opt-c',
        label: 's[j] == s[i] (both activities start at the exact same moment).',
        explanation: 'Incorrect. Simultaneous start times create a direct scheduling collision.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In C: `if (s[j] >= f[lastSelected]) { select(j); lastSelected = j; }`. Non-overlapping intervals require `start[next] >= finish[prev]`.',
  },
  {
    id: 'q-greedy-med-02',
    algoId: 'greedy',
    tier: 'medium',
    concept: 'Fractional Knapsack vs 0/1 Knapsack',
    prompt: 'Why does a greedy strategy (sorting by value-to-weight ratio `v[i] / w[i]`) guarantee an optimal solution for Fractional Knapsack, but fails for 0/1 Knapsack?',
    options: [
      {
        id: 'opt-a',
        label: 'Because 0/1 Knapsack allows items to have negative weights while Fractional Knapsack does not.',
        explanation: 'Incorrect. Both standard knapsack problems assume non-negative weights.',
      },
      {
        id: 'opt-b',
        label: 'In Fractional Knapsack, items can be subdivided to completely fill remaining capacity with the highest value density; in 0/1 Knapsack, items are indivisible, and choosing a high-density item may leave unusable empty capacity.',
        explanation: 'Correct! Fractional knapsack can take partial items to saturate capacity. In 0/1 knapsack, taking a high-density item might block taking two slightly lower-density items that together achieve higher value.',
      },
      {
        id: 'opt-c',
        label: 'Because sorting fractional numbers takes O(n) time, whereas sorting integers takes O(n log n) time.',
        explanation: 'Incorrect. Comparison sorting takes O(n log n) regardless of numeric type.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'Fractional Knapsack exhibits the greedy choice property because capacity can be 100% packed with maximum value density. 0/1 Knapsack has indivisibility constraints, requiring Dynamic Programming.',
  },
  {
    id: 'q-greedy-med-03',
    algoId: 'greedy',
    tier: 'medium',
    concept: 'Huffman Coding Greedy Tree Construction',
    prompt: 'How does Huffman Coding construct an optimal prefix-free variable-length code using a greedy approach?',
    options: [
      {
        id: 'opt-a',
        label: 'By assigning 1-bit codes to consonants and 2-bit codes to vowels alphabetically.',
        explanation: 'Incorrect. Huffman coding uses statistical frequencies, not linguistic categories.',
      },
      {
        id: 'opt-b',
        label: 'By sorting characters by ASCII value and splitting them into equal halves recursively.',
        explanation: 'Incorrect. That describes Shannon-Fano coding, not Huffman\'s greedy min-heap tree.',
      },
      {
        id: 'opt-c',
        label: 'By repeatedly extracting the two lowest-frequency character nodes from a min-heap, merging them into a parent node with sum frequency, and reinserting until a single tree remains.',
        explanation: 'Correct! Merging the two least frequent nodes ensures the least frequent characters receive the longest code words at the bottom of the tree, minimizing expected code length.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Huffman\'s greedy strategy builds the code tree bottom-up: always combine the two rarest symbols. In an alphabet of size V, V - 1 merges via min-heap produce the optimal prefix tree in O(V log V) time.',
  },

  // --- Greedy: Hard ---
  {
    id: 'q-greedy-hard-01',
    algoId: 'greedy',
    tier: 'hard',
    concept: 'The Exchange Argument Proof Technique',
    prompt: 'In formal algorithmic analysis, how does the "Exchange Argument" mathematically prove that a greedy algorithm produces a globally optimal solution?',
    options: [
      {
        id: 'opt-a',
        label: 'It assumes an optimal solution O differs from the greedy solution G, and shows that exchanging choices in O with greedy choices step-by-step preserves or improves solution quality without violating feasibility, proving G is optimal.',
        explanation: 'Correct! By gradually morphing an arbitrary optimal solution into the greedy solution without degrading total value, the Exchange Argument proves the greedy solution is itself optimal.',
      },
      {
        id: 'opt-b',
        label: 'It proves by induction that the problem has no base case and therefore cannot be solved by dynamic programming.',
        explanation: 'Incorrect. The exchange argument establishes optimality, not the absence of base cases.',
      },
      {
        id: 'opt-c',
        label: 'It executes the algorithm on 1,000,000 randomized test cases and verifies that no test case fails.',
        explanation: 'Incorrect. Empirical testing is not a mathematical proof of correctness.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The Exchange Argument is the primary proof technique for greedy algorithms. Let O be an optimal solution. Find the first difference between O and greedy solution G. Swap O\'s choice with G\'s choice. Show O remains optimal. Repeat until O = G.',
  },
  {
    id: 'q-greedy-hard-02',
    algoId: 'greedy',
    tier: 'hard',
    concept: 'Matroids & Combinatorial Greedy Guarantees',
    prompt: 'What algebraic structure characterizes combinatorial optimization problems that are guaranteed to yield optimal solutions via greedy algorithms?',
    options: [
      {
        id: 'opt-a',
        label: 'A Non-Deterministic Finite Automaton (NFA).',
        explanation: 'Incorrect. NFAs are formal language recognizers, not optimization structures.',
      },
      {
        id: 'opt-b',
        label: 'A Strongly Connected Directed Graph.',
        explanation: 'Incorrect. Strong connectivity is a topological property of directed graphs.',
      },
      {
        id: 'opt-c',
        label: 'A Matroid (a ground set and an independent system satisfying hereditary and exchange axioms).',
        explanation: 'Correct! By the Rado-Edmonds Theorem, a greedy algorithm finds the maximum-weight independent set if and only if the system forms a Matroid.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Matroid theory formalizes greedy optimality. Graphic matroids explain why Kruskal and Prim find MSTs, while uniform matroids explain fractional knapsack.',
  },
  {
    id: 'q-greedy-hard-03',
    algoId: 'greedy',
    tier: 'hard',
    concept: 'Coin Change Greedy Counterexample',
    prompt: 'For canonical US coin denominations {25, 10, 5, 1}, the greedy algorithm always produces minimum coins. For denominations {1, 3, 4}, what target amount serves as a minimal counterexample where greedy fails?',
    options: [
      {
        id: 'opt-a',
        label: 'Amount = 4: Greedy picks 4 (1 coin), whereas optimal picks 1 + 3 (2 coins).',
        explanation: 'Incorrect. 1 coin is optimal for amount 4, not a failure.',
      },
      {
        id: 'opt-b',
        label: 'Amount = 6: Greedy picks 4 + 1 + 1 (3 coins), whereas the optimal solution is 3 + 3 (2 coins).',
        explanation: 'Correct! Greedy grabs the largest coin <= 6 (which is 4), leaving 2, which requires two 1s (total 3 coins). The true optimum uses two 3-cent coins (total 2 coins).',
      },
      {
        id: 'opt-c',
        label: 'Amount = 5: Greedy picks 4 + 1 (2 coins), which is suboptimal compared to 3 + 1 + 1 (3 coins).',
        explanation: 'Incorrect. 2 coins is strictly better than 3 coins.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'A system of denominations where greedy yields optimal change is called "canonical". Arbitrary denominations {1, 3, 4} violate the greedy choice property at amount = 6, demonstrating why Coin Change requires Dynamic Programming in general.',
  },

  // ==========================================
  // TOPIC 6: BACKTRACKING (4-QUEENS PUZZLE)
  // ==========================================

  // --- Backtracking: Easy ---
  {
    id: 'q-backtracking-easy-01',
    algoId: 'backtracking',
    tier: 'easy',
    concept: 'State Space Tree & Pruning Definition',
    prompt: 'What is the primary conceptual definition of Backtracking compared to pure exhaustive brute force?',
    options: [
      {
        id: 'opt-a',
        label: 'It explores a State Space Tree incrementally, abandoning ("pruning") entire branches as soon as it determines a partial candidate cannot satisfy the constraints.',
        explanation: 'Correct! Backtracking avoids exploring fruitless subtrees by testing constraint validity at each step and retreating as soon as a constraint is violated.',
      },
      {
        id: 'opt-b',
        label: 'It runs a binary search on all possible solution permutations in sorted array memory.',
        explanation: 'Incorrect. Backtracking does not store precomputed permutations in an array.',
      },
      {
        id: 'opt-c',
        label: 'It caches every explored subproblem in a permanent hash table to avoid recursion.',
        explanation: 'Incorrect. Caching subproblems is Dynamic Programming / Memoization, not standard Backtracking.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Backtracking builds candidates step-by-step. Pruning discards an entire subtree when a partial candidate violates problem constraints, pruning millions of dead-end states.',
  },
  {
    id: 'q-backtracking-easy-02',
    algoId: 'backtracking',
    tier: 'easy',
    concept: 'Undo Operation / Backtrack Step in C',
    prompt: 'In the N-Queens problem in C, what must the code do immediately after exploring a recursive branch `solveNQ(board, col + 1)` that fails to find a solution?',
    options: [
      {
        id: 'opt-a',
        label: 'Exit the program immediately with an error code.',
        explanation: 'Incorrect. Failure along one branch triggers exploring the next candidate row, not program termination.',
      },
      {
        id: 'opt-b',
        label: 'board[row][col] = 0; (undo the queen placement by resetting the cell back to empty before trying the next row).',
        explanation: 'Correct! The defining action of backtracking is undoing state modifications (`board[row][col] = 0`) before testing alternative candidates.',
      },
      {
        id: 'opt-c',
        label: 'Shift all previously placed queens one column to the right.',
        explanation: 'Incorrect. Prior columns have already established placements that must remain intact while trying new rows.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'In C: `board[row][col] = 1; if (solve(col + 1)) return true; board[row][col] = 0;`. Restoring state to its previous snapshot is the literal "backtrack" operation.',
  },
  {
    id: 'q-backtracking-easy-03',
    algoId: 'backtracking',
    tier: 'easy',
    concept: 'N-Queens Problem Objective & Constraints',
    prompt: 'What is the goal of the N-Queens problem on an N x N chessboard?',
    options: [
      {
        id: 'opt-a',
        label: 'Move a single queen across all N x N squares of the chessboard in the minimum number of moves.',
        explanation: 'Incorrect. Visiting all squares is the Knight\'s Tour problem, not N-Queens.',
      },
      {
        id: 'opt-b',
        label: 'Place as many queens as possible on a board such that every square is attacked by at least three queens.',
        explanation: 'Incorrect. N-Queens seeks non-attacking configurations, not maximal board attacks.',
      },
      {
        id: 'opt-c',
        label: 'Place N queens on the board such that no two queens threaten each other (no two queens share the same row, column, or diagonal).',
        explanation: 'Correct! The objective is placing N mutual non-attacking queens on an N x N grid.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'In chess, a queen attacks along its row, column, and both diagonals. Placing N queens on an N x N board requires exactly one queen per column and row with zero diagonal collisions.',
  },

  // --- Backtracking: Medium ---
  {
    id: 'q-backtracking-med-01',
    algoId: 'backtracking',
    tier: 'medium',
    concept: 'Column-by-Column Safety Check Optimization',
    prompt: 'When placing queens column-by-column from left to right (col 0 to N - 1), why does `isSafe(board, row, col)` only need to check the left side of the board?',
    options: [
      {
        id: 'opt-a',
        label: 'Because queens in chess can only move left and backward.',
        explanation: 'Incorrect. Queens move in all 8 directions.',
      },
      {
        id: 'opt-b',
        label: 'Because no queens have been placed in the columns to the right yet (col + 1 to N - 1), so conflicts can only exist in already-placed columns to the left.',
        explanation: 'Correct! Since columns are processed sequentially from 0 to N - 1, columns to the right are completely empty, making rightward checks redundant.',
      },
      {
        id: 'opt-c',
        label: 'Because the right side of the chessboard is stored in read-only memory in C.',
        explanation: 'Incorrect. The board array is read-write.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'The order of search defines safety invariants. Placing one queen per column sequentially means cols >= current_col contain no queens. We only check: row to the left, upper-left diagonal, lower-left diagonal.',
  },
  {
    id: 'q-backtracking-med-02',
    algoId: 'backtracking',
    tier: 'medium',
    concept: 'Permutations vs Combinations State Space Size',
    prompt: 'When generating all Permutations of n distinct numbers versus all Subsets (Combinations) using backtracking, how do their respective state space tree sizes compare?',
    options: [
      {
        id: 'opt-a',
        label: 'Permutations generate n! leaves, whereas Subsets generate 2^n leaves.',
        explanation: 'Correct! Permutations has n choices for 1st item, n-1 for 2nd, etc. (n!). Subsets has 2 choices (include/exclude) for each of n items (2^n).',
      },
      {
        id: 'opt-b',
        label: 'Permutations generate 2^n leaves, whereas Subsets generate n! leaves.',
        explanation: 'Incorrect. Permutations is factorial n!, subsets is exponential 2^n.',
      },
      {
        id: 'opt-c',
        label: 'Both problems generate identical n^2 leaves.',
        explanation: 'Incorrect. Neither problem has polynomial search space.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Permutations arranges n items without replacement: n * (n-1) * ... * 1 = n!. Power sets (subsets) make a binary include/exclude decision at each level: 2 * 2 * ... * 2 = 2^n.',
  },
  {
    id: 'q-backtracking-med-03',
    algoId: 'backtracking',
    tier: 'medium',
    concept: 'Sudoku Solver Constraint Checking',
    prompt: 'In a 9x9 Sudoku solver using backtracking, what three distinct constraints must be verified in `isValid(grid, row, col, num)` before placing number `num`?',
    options: [
      {
        id: 'opt-a',
        label: 'num must be strictly greater than the number in the cell directly to its left.',
        explanation: 'Incorrect. Sudoku cells have no relative numerical magnitude ordering.',
      },
      {
        id: 'opt-b',
        label: 'The sum of all numbers in the row must equal 45 before num is inserted.',
        explanation: 'Incorrect. Sum checking is only valid when the entire row is completely filled.',
      },
      {
        id: 'opt-c',
        label: 'num must not already appear in the same row, in the same column, or in the same 3x3 subgrid box.',
        explanation: 'Correct! Standard Sudoku rules require each digit from 1 to 9 to be unique across its row, column, and 3x3 subgrid.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Sudoku is an exact cover constraint satisfaction problem. Checking row `grid[row][j] != num`, column `grid[i][col] != num`, and 3x3 box `grid[row - row%3 + i][col - col%3 + j] != num` prunes invalid placements instantly.',
  },

  // --- Backtracking: Hard ---
  {
    id: 'q-backtracking-hard-01',
    algoId: 'backtracking',
    tier: 'hard',
    concept: 'Knuth\'s Algorithm X & Dancing Links (DLX)',
    prompt: 'How does Donald Knuth\'s Dancing Links (DLX) algorithm achieve ultra-fast backtracking for Exact Cover problems (such as generalized N-Queens and Sudoku)?',
    options: [
      {
        id: 'opt-a',
        label: 'It executes backtracking across multiple CPU threads using mutex locks.',
        explanation: 'Incorrect. DLX is a sequential pointer-manipulation algorithm, not a multithreading library.',
      },
      {
        id: 'opt-b',
        label: 'It approximates the answer using simulated annealing and neural networks.',
        explanation: 'Incorrect. DLX is an exact, complete backtrack algorithm.',
      },
      {
        id: 'opt-c',
        label: 'It represents the sparse constraint matrix using circular doubly linked lists in 4 directions; covering and uncovering rows/columns involves pointer manipulation (L[R[x]] = L[x]) that can be executed and undone in O(1) time without allocating or freeing memory.',
        explanation: 'Correct! By using 2D circular doubly linked lists, removing and restoring constraints during backtrack takes O(1) pointer updates without dynamic memory churn.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Dancing Links takes advantage of doubly linked list deletion `node->left->right = node->right; node->right->left = node->left;` and its exact reversal. This makes covering and uncovering constraints in Algorithm X instantaneous.',
  },
  {
    id: 'q-backtracking-hard-02',
    algoId: 'backtracking',
    tier: 'hard',
    concept: 'Bitmask Optimization for N-Queens',
    prompt: 'How can N-Queens conflict checks (rows, main diagonals, anti-diagonals) be optimized from O(N) array scans to O(1) bitwise operations in C?',
    options: [
      {
        id: 'opt-a',
        label: 'By using three integer bitmasks (cols, diag1, diag2); a position is safe if `(cols | diag1 | diag2) & (1 << row) == 0`, with diagonals bit-shifted by 1 on each column step.',
        explanation: 'Correct! Bitwise OR combines all attacked rows. Shifting `(diag1 | bit) << 1` and `(diag2 | bit) >> 1` propagates diagonal threats in O(1) CPU instructions.',
      },
      {
        id: 'opt-b',
        label: 'By allocating three 64-bit float arrays and computing their cross product.',
        explanation: 'Incorrect. Vector cross products do not represent chessboard attack lines.',
      },
      {
        id: 'opt-c',
        label: 'By hashing the board configuration with MD5 at each step.',
        explanation: 'Incorrect. Cryptographic hashing adds massive overhead and does not check line conflicts.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Bitwise N-Queens uses 3 integers: `cols`, `ld`, and `rd`. A safe placement corresponds to `~(cols | ld | rd)`. Finding candidates uses `bit = available & -available` in O(1) cycles.',
  },
  {
    id: 'q-backtracking-hard-03',
    algoId: 'backtracking',
    tier: 'hard',
    concept: 'Branch and Bound Pruning in TSP',
    prompt: 'In the Travelling Salesperson Problem (TSP) solved via Branch and Bound / Backtracking, how does bounding differ from simple constraint backtracking?',
    options: [
      {
        id: 'opt-a',
        label: 'Bounding converts the problem into linear programming and stops after 1 iteration.',
        explanation: 'Incorrect. Branch and Bound explores multiple branches across the tree.',
      },
      {
        id: 'opt-b',
        label: 'Bounding computes a lower bound on the cost of completing the partial tour (e.g., via MST of unvisited vertices); if currentCost + lowerBound >= bestSoFar, the entire branch is pruned before exploring dead ends.',
        explanation: 'Correct! Computing an optimistic lower bound on the remaining path cost allows pruning branches that cannot beat the current best solution, even if the path is otherwise valid.',
      },
      {
        id: 'opt-c',
        label: 'Bounding ignores edge weights and solves the unweighted problem instead.',
        explanation: 'Incorrect. Ignoring weights would solve Hamiltonian cycle, not TSP.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'Standard backtracking prunes on constraint infeasibility (cannot be completed). Branch and Bound prunes on sub-optimality: if `cost(partial) + lower_bound(remaining) >= best_tour`, no completion can be optimal, pruning the branch.',
  },

  // ==========================================
  // TOPIC 7: DYNAMIC PROGRAMMING (0/1 KNAPSACK)
  // ==========================================

  // --- Dynamic Programming: Easy ---
  {
    id: 'q-dynamic-programming-easy-01',
    algoId: 'dynamic-programming',
    tier: 'easy',
    concept: 'Two Essential Properties of Dynamic Programming',
    prompt: 'What two essential mathematical properties must a computational problem exhibit to be solvable using Dynamic Programming?',
    options: [
      {
        id: 'opt-a',
        label: 'Optimal Substructure (an optimal solution contains optimal solutions to subproblems) and Overlapping Subproblems (the same subproblems are solved repeatedly).',
        explanation: 'Correct! Optimal substructure guarantees solutions can be composed from subproblem solutions; overlapping subproblems ensures caching avoids exponential duplication.',
      },
      {
        id: 'opt-b',
        label: 'Monotonic Ordering and Disjoint Independent Partitions.',
        explanation: 'Incorrect. Disjoint partitions characterize Divide and Conquer, not Dynamic Programming.',
      },
      {
        id: 'opt-c',
        label: 'Planar Graph Representation and Bipartite Connectivity.',
        explanation: 'Incorrect. DP applies to sequence, string, tree, and numerical optimization problems with no graph planarity requirements.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Dynamic Programming requires: 1. Optimal Substructure (Bellman\'s principle of optimality), and 2. Overlapping Subproblems (subproblems recur repeatedly, making memoization/tabulation effective).',
  },
  {
    id: 'q-dynamic-programming-easy-02',
    algoId: 'dynamic-programming',
    tier: 'easy',
    concept: '0/1 Knapsack Item Indivisibility Constraint',
    prompt: 'In the 0/1 Knapsack problem with n items (each with weight `wt[i]` and value `val[i]`) and capacity W, what does the "0/1" designation signify?',
    options: [
      {
        id: 'opt-a',
        label: 'All weights and values must be binary numbers (0 or 1).',
        explanation: 'Incorrect. Weights and values can be arbitrary positive integers.',
      },
      {
        id: 'opt-b',
        label: 'The knapsack can hold a maximum of 1 item total.',
        explanation: 'Incorrect. The knapsack can hold any subset of items as long as total weight <= W.',
      },
      {
        id: 'opt-c',
        label: 'Each item can either be taken completely (1) or left behind entirely (0); fractional items are strictly disallowed.',
        explanation: 'Correct! The decision for each item is binary: include (1) or exclude (0). You cannot take fractions of an item.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'The binary choice {0, 1} means items are discrete and indivisible. This indivisibility prevents greedy ratio selection from guaranteeing optimality, necessitating Dynamic Programming.',
  },
  {
    id: 'q-dynamic-programming-easy-03',
    algoId: 'dynamic-programming',
    tier: 'easy',
    concept: 'Memoization (Top-Down) vs Tabulation (Bottom-Up)',
    prompt: 'What distinguishes Memoization from Tabulation in Dynamic Programming?',
    options: [
      {
        id: 'opt-a',
        label: 'Memoization uses arrays while Tabulation uses linked lists.',
        explanation: 'Incorrect. Both approaches typically use arrays or lookup tables.',
      },
      {
        id: 'opt-b',
        label: 'Memoization is Top-Down recursion augmented with a lookup cache; Tabulation is Bottom-Up iteration filling a table from base cases up to the final answer.',
        explanation: 'Correct! Top-down memoization evaluates states on demand using recursion and caching; bottom-up tabulation fills an iterative table systematically without recursion.',
      },
      {
        id: 'opt-c',
        label: 'Memoization runs in polynomial time while Tabulation runs in exponential time.',
        explanation: 'Incorrect. Both solve the same number of distinct states and share identical asymptotic complexity.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'Top-down (Memoization) starts at the root goal and caches subproblem returns. Bottom-up (Tabulation) orders subproblems topologically (e.g. from 0 to n) and fills an iterative table with zero call-stack overhead.',
  },

  // --- Dynamic Programming: Medium ---
  {
    id: 'q-dynamic-programming-med-01',
    algoId: 'dynamic-programming',
    tier: 'medium',
    concept: 'Pseudo-Polynomial Time Complexity Analysis',
    prompt: 'Why is the O(n * W) time complexity of the 0/1 Knapsack dynamic programming algorithm classified as "pseudo-polynomial" rather than strictly polynomial?',
    options: [
      {
        id: 'opt-a',
        label: 'Because it only works on arrays whose size is a prime number.',
        explanation: 'Incorrect. Knapsack algorithms work on arrays of any positive integer size.',
      },
      {
        id: 'opt-b',
        label: 'Because W is a numeric value, and its input size in bits is B = log_2(W); the runtime O(n * 2^B) is exponential in the number of bits needed to represent capacity W.',
        explanation: 'Correct! True polynomial time is polynomial in the length of the binary input string. Since W takes log_2(W) bits, O(n * W) is exponential in input bit-length.',
      },
      {
        id: 'opt-c',
        label: 'Because the algorithm uses heuristic approximations rather than finding the exact maximum.',
        explanation: 'Incorrect. 0/1 Knapsack DP finds the exact global optimum, not an approximation.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'In computational complexity, input size is measured in bits. Number W takes B = log_2(W) bits. An algorithm with runtime proportional to value W has runtime O(n * 2^B), which is exponential in input size.',
  },
  {
    id: 'q-dynamic-programming-med-02',
    algoId: 'dynamic-programming',
    tier: 'medium',
    concept: '0/1 Knapsack 2D Tabulation Recurrence',
    prompt: 'In the 2D tabulation table `dp[i][w]` representing the maximum value using a subset of the first i items with capacity w, what is the recurrence relation when item `i - 1` fits (`wt[i - 1] <= w`)?',
    options: [
      {
        id: 'opt-a',
        label: 'dp[i][w] = max(dp[i - 1][w], val[i - 1] + dp[i - 1][w - wt[i - 1]]) (maximum of skipping the item versus taking it).',
        explanation: 'Correct! Skipping item i-1 yields `dp[i - 1][w]`. Taking item i-1 adds its value `val[i - 1]` and adds the best value achievable with remaining capacity `dp[i - 1][w - wt[i - 1]]`.',
      },
      {
        id: 'opt-b',
        label: 'dp[i][w] = dp[i - 1][w] + val[i - 1] * wt[i - 1] (add item value multiplied by weight).',
        explanation: 'Incorrect. Values are added directly, not scaled by weight.',
      },
      {
        id: 'opt-c',
        label: 'dp[i][w] = min(dp[i - 1][w], dp[i][w - 1]) (minimum of adjacent table cells).',
        explanation: 'Incorrect. The goal is maximizing value, not minimizing.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The core state transition: for item i, we either exclude it (`dp[i-1][w]`) or include it (`val[i-1] + dp[i-1][w - wt[i-1]]`). Taking the maximum chooses the optimal decision.',
  },
  {
    id: 'q-dynamic-programming-med-03',
    algoId: 'dynamic-programming',
    tier: 'medium',
    concept: '1D Space Optimization & Reverse Iteration',
    prompt: 'How can the space complexity of 0/1 Knapsack tabulation be reduced from O(n * W) down to O(W) using a single 1D array `dp[w]`?',
    options: [
      {
        id: 'opt-a',
        label: 'By allocating memory on a GPU rather than system RAM.',
        explanation: 'Incorrect. Hardware offloading does not reduce algorithmic space complexity.',
      },
      {
        id: 'opt-b',
        label: 'By dividing all item weights by 2 on every iteration.',
        explanation: 'Incorrect. Dividing weights alters problem parameters and produces incorrect results.',
      },
      {
        id: 'opt-c',
        label: 'By iterating capacity w in reverse order from W down to wt[i-1], ensuring each item from the current step only uses values computed in the previous item\'s step.',
        explanation: 'Correct! Iterating backwards prevents using the same item multiple times in the same step, because `dp[w - wt[i-1]]` has not yet been overwritten by the current item.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'If we iterate forward (0 to W), updating `dp[w]` uses `dp[w - wt]`, which was already updated in the current iteration, inadvertently allowing the item to be taken multiple times. Reverse iteration preserves 0/1 semantics.',
  },

  // --- Dynamic Programming: Hard ---
  {
    id: 'q-dynamic-programming-hard-01',
    algoId: 'dynamic-programming',
    tier: 'hard',
    concept: 'Unbounded Knapsack vs 0/1 Forward Iteration',
    prompt: 'In the Unbounded Knapsack problem (where each item can be chosen an unlimited number of times), how does the 1D DP array update direction differ from 0/1 Knapsack?',
    options: [
      {
        id: 'opt-a',
        label: 'Unbounded Knapsack iterates capacity w forward from wt[i] up to W (allowing multiple uses of the same item in the same step), whereas 0/1 Knapsack iterates backward from W down to wt[i].',
        explanation: 'Correct! In forward iteration, `dp[w]` can build on `dp[w - wt[i]]` which was already updated for item i, naturally allowing unbounded reuse of the same item.',
      },
      {
        id: 'opt-b',
        label: 'Unbounded Knapsack requires two separate 2D matrices while 0/1 Knapsack requires 3D matrices.',
        explanation: 'Incorrect. Unbounded knapsack can be solved in a single 1D array of size W + 1.',
      },
      {
        id: 'opt-c',
        label: 'Unbounded Knapsack iterates over odd capacities first, then even capacities.',
        explanation: 'Incorrect. Parity interleaving does not satisfy topological dependency ordering.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Forward 1D iteration `for (int w = wt[i]; w <= W; w++)` allows item i to be included repeatedly. Backward iteration `for (int w = W; w >= wt[i]; w--)` enforces single inclusion (0/1 constraint).',
  },
  {
    id: 'q-dynamic-programming-hard-02',
    algoId: 'dynamic-programming',
    tier: 'hard',
    concept: 'Longest Increasing Subsequence (LIS) Patience Sorting',
    prompt: 'What is the optimal time complexity to compute the Longest Increasing Subsequence (LIS) of an array of size n using Patience Sorting (binary search over DP tails array)?',
    options: [
      {
        id: 'opt-a',
        label: 'O(n^3) time and O(1) space, by testing all possible triplets.',
        explanation: 'Incorrect. Subsequences of arbitrary length cannot be found via fixed triplets.',
      },
      {
        id: 'opt-b',
        label: 'O(n log n) time and O(n) space, by maintaining the smallest tail of all increasing subsequences of various lengths and updating via binary search.',
        explanation: 'Correct! Maintaining an array `tails` where `tails[i]` is the smallest tail of all increasing subsequences of length i + 1 allows each element to be placed in O(log n) via binary search.',
      },
      {
        id: 'opt-c',
        label: 'O(2^n) time, because finding subsequences is an NP-complete problem.',
        explanation: 'Incorrect. LIS is in P and solved in O(n log n) time.',
      },
    ],
    correctOptionId: 'opt-b',
    pedagogicalRationale: 'Standard DP checks all previous elements in O(n^2). The Patience Sorting optimization maintains a monotonic tails array, allowing `std::lower_bound` / binary search to place each element in O(log n), totaling O(n log n).',
  },
  {
    id: 'q-dynamic-programming-hard-03',
    algoId: 'dynamic-programming',
    tier: 'hard',
    concept: 'Matrix Chain Multiplication & Non-Greedy Substructure',
    prompt: 'In Matrix Chain Multiplication (finding the optimal multiplication parenthesization for matrices A_1 * A_2 * ... * A_n), what is the time complexity of the dynamic programming solution, and why is greedy choice insufficient?',
    options: [
      {
        id: 'opt-a',
        label: 'O(n) time, because matrices can always be multiplied from left to right with uniform scalar cost.',
        explanation: 'Incorrect. Matrix chain multiplication costs depend heavily on dimension matches and parenthesization.',
      },
      {
        id: 'opt-b',
        label: 'O(n!) time, because every matrix permutation must be evaluated.',
        explanation: 'Incorrect. Parenthesizations number in Catalan numbers C_n, solved in polynomial O(n^3) time by DP.',
      },
      {
        id: 'opt-c',
        label: 'O(n^3) time by computing `m[i][j] = min_{i <= k < j} (m[i][k] + m[k+1][j] + p_{i-1}*p_k*p_j)`; greedy choice of multiplying adjacent smallest dimensions fails because local choices cannot foresee downstream dimension mismatches.',
        explanation: 'Correct! Evaluating all split points k for all chain lengths takes O(n^3). Greedy fails because a cheap local multiply can produce a product matrix with terrible dimensions for later operations.',
      },
    ],
    correctOptionId: 'opt-c',
    pedagogicalRationale: 'Matrix Chain Multiplication has recurrence `m[i][j] = min_k (m[i][k] + m[k+1][j] + p_{i-1}p_k p_j)`. There are O(n^2) subchains, and testing O(n) split points k takes O(n^3) total time.',
  },
];
