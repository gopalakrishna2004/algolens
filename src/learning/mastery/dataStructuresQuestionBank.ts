import type { MasteryQuestion } from '../types';

/**
 * 63 Reviewed Mastery Questions for Chapter 03: Data Structures.
 *
 * Covers all 7 Data Structures topics (9 questions each: 3 Easy, 3 Medium, 3 Hard):
 * 1. array-ds (Arrays)
 * 2. stack-ds (Stacks)
 * 3. queue-ds (Queues)
 * 4. linked-list-ds (Linked Lists)
 * 5. hash-table-ds (Hash Tables)
 * 6. heap-ds (Binary Heaps)
 * 7. trie-ds (Tries)
 */
export const DATA_STRUCTURES_QUESTION_BANK: MasteryQuestion[] = [
  // ==========================================
  // TOPIC 1: ARRAY OPERATIONS (array-ds)
  // ==========================================

  // --- Array Operations: Easy ---
  {
    id: 'q-array-ds-easy-01',
    algoId: 'array-ds',
    tier: 'easy',
    concept: 'Contiguous Memory & Random Access',
    prompt: 'Why does an array provide constant-time O(1) random access to any element by its index?',
    options: [
      {
        id: 'opt-a',
        label: 'Elements are stored in contiguous memory cells of identical byte size, allowing the CPU to compute any element\'s memory address directly via base + (index * element_size).',
        explanation: 'Correct! Because elements are contiguous and uniform in size, calculating an address requires a single multiplication and addition, taking O(1) time.',
      },
      {
        id: 'opt-b',
        label: 'Because arrays allocate a secondary hash table of pointer lookups for every index.',
        explanation: 'Incorrect. Arrays do not use hash tables; direct indexing uses base address arithmetic.',
      },
      {
        id: 'opt-c',
        label: 'Because the operating system automatically caches all array indices in GPU memory.',
        explanation: 'Incorrect. CPU registers and cache handle standard memory access; GPU caching is unrelated.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The defining property of an array is contiguous storage of uniform-size elements. The physical memory address of element i is calculated as Address(i) = BaseAddress + i * sizeof(Element). This direct calculation executes in O(1) time without traversing intermediate elements.',
  },
  {
    id: 'q-array-ds-easy-02',
    algoId: 'array-ds',
    tier: 'easy',
    concept: 'Access vs Search Complexity',
    prompt: 'What are the time complexities for accessing an element by index versus searching for a specific value in an unsorted array of size n?',
    options: [
      {
        id: 'opt-a',
        label: 'Access by index is O(1); search for an arbitrary value is O(n).',
        explanation: 'Correct! Index access computes the direct memory offset in O(1), but searching an unsorted array requires scanning up to n elements.',
      },
      {
        id: 'opt-b',
        label: 'Access by index is O(n); search for a value is O(1).',
        explanation: 'Incorrect. Index access is instantaneous O(1), not linear O(n).',
      },
      {
        id: 'opt-c',
        label: 'Both operations take O(log n) time.',
        explanation: 'Incorrect. Logarithmic search requires sorted order (Binary Search), not an unsorted array.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Knowing the index allows direct address calculation in O(1) time. Conversely, without sorted ordering or an auxiliary index, finding a target value requires inspecting each element sequentially until found or exhausted, requiring O(n) comparisons.',
  },
  {
    id: 'q-array-ds-easy-03',
    algoId: 'array-ds',
    tier: 'easy',
    concept: '0-Based Indexing & Bounds',
    prompt: 'In standard 0-indexed arrays with capacity n, what are the valid indices, and what happens when accessing index n?',
    options: [
      {
        id: 'opt-a',
        label: 'Valid indices range strictly from 0 to n - 1; accessing index n is an off-by-one out-of-bounds access that reads unallocated or foreign memory.',
        explanation: 'Correct! An array of size n has indices 0 through n - 1. Accessing index n accesses memory outside the array boundary.',
      },
      {
        id: 'opt-b',
        label: 'Valid indices range from 1 to n; index 0 is reserved for array metadata.',
        explanation: 'Incorrect. Standard C and modern languages use 0-based indexing where 0 is the first data element.',
      },
      {
        id: 'opt-c',
        label: 'Valid indices range from 0 to n; index n automatically returns 0.',
        explanation: 'Incorrect. Arrays do not wrap or return default values at index n; accessing index n is an error.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Because indexing starts at 0, the last valid element is at index n - 1. Attempting to access index n is a classic off-by-one bug. In C, reading or writing index n constitutes an out-of-bounds memory access invoking undefined behavior.',
  },

  // --- Array Operations: Medium ---
  {
    id: 'q-array-ds-med-01',
    algoId: 'array-ds',
    tier: 'medium',
    concept: 'Middle Insertion & Element Shifting',
    prompt: 'When inserting an element at index k into an array of size n (where 0 <= k < n), why is the time complexity O(n)?',
    options: [
      {
        id: 'opt-a',
        label: 'To maintain contiguous storage, all existing elements from index k up to n - 1 must be shifted one position to the right, requiring n - k memory moves.',
        explanation: 'Correct! Inserting into the middle requires sliding existing elements rightward to open slot k, taking O(n) shifts.',
      },
      {
        id: 'opt-b',
        label: 'Because the entire array must be sorted after every insertion.',
        explanation: 'Incorrect. Standard insertion does not sort elements; it only preserves their existing relative positions.',
      },
      {
        id: 'opt-c',
        label: 'Because the operating system reallocates virtual memory page tables on every insert.',
        explanation: 'Incorrect. Shifting occurs within the array buffer without modifying OS page tables.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Arrays require contiguous element storage. Inserting at index k cannot overwrite existing data, so elements arr[k..n-1] must each be shifted rightward to arr[k+1..n]. In the worst case (inserting at index 0), all n elements must shift, making insertion O(n).',
  },
  {
    id: 'q-array-ds-med-02',
    algoId: 'array-ds',
    tier: 'medium',
    concept: 'Element Deletion Mechanics',
    prompt: 'When deleting an element at index k from an array of size n, what operation is required to preserve array invariants?',
    options: [
      {
        id: 'opt-a',
        label: 'Elements from index k + 1 to n - 1 must be shifted leftward by one position to fill the vacated gap, followed by decrementing the logical size.',
        explanation: 'Correct! Arrays cannot have empty holes in the middle; subsequent elements shift left by 1 position (arr[j] = arr[j+1]).',
      },
      {
        id: 'opt-b',
        label: 'The vacated slot is replaced with a null pointer, leaving all other elements in place.',
        explanation: 'Incorrect. Leaving gaps destroys contiguous indexing arithmetic.',
      },
      {
        id: 'opt-c',
        label: 'The entire array is halved in capacity immediately on every single deletion.',
        explanation: 'Incorrect. Capacity shrinkage typically occurs only when size drops significantly below capacity (e.g. at 25% occupancy).',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'To maintain contiguous indexing without "holes", deleting an element at index k requires shifting every subsequent element leftward: arr[i] = arr[i + 1] for i from k to n - 2. This takes n - 1 - k operations (O(n) worst-case when k = 0).',
  },
  {
    id: 'q-array-ds-med-03',
    algoId: 'array-ds',
    tier: 'medium',
    concept: 'Dynamic Array Geometric Resizing',
    prompt: 'Why do dynamic array implementations (like C++ std::vector or Python list) double their capacity when full instead of growing by a fixed constant (like +1 or +10)?',
    options: [
      {
        id: 'opt-a',
        label: 'Geometric doubling ensures that the expensive O(n) reallocation and element copy cost is amortized across many insertions, achieving O(1) amortized push-back time.',
        explanation: 'Correct! Doubling capacity reduces reallocation frequency geometrically. The sum of reallocation copies over n insertions is bounded by 2n, giving O(1) amortized cost.',
      },
      {
        id: 'opt-b',
        label: 'Because modern computer memory hardware only allows memory allocation in powers of two.',
        explanation: 'Incorrect. Memory allocators can allocate arbitrary byte sizes.',
      },
      {
        id: 'opt-c',
        label: 'Because growing by a constant size causes CPU arithmetic registers to overflow.',
        explanation: 'Incorrect. Fixed incrementing is mathematically sound but results in quadratic O(n²) total insertion time.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'If capacity grew by a fixed constant c, reaching size n would require n/c reallocations, each copying an increasing number of elements: c + 2c + ... + n = O(n²) total work, or O(n) per insert. Geometric doubling ensures reallocations happen at powers of two, making total copying work <= 2n, yielding O(1) amortized time per insertion.',
  },

  // --- Array Operations: Hard ---
  {
    id: 'q-array-ds-hard-01',
    algoId: 'array-ds',
    tier: 'hard',
    concept: 'C Array Parameter Pointer Decay',
    codeContext: {
      language: 'c',
      code: 'void printSize(int arr[]) {\n    printf("%zu", sizeof(arr));\n}',
    },
    prompt: 'In C, what does sizeof(arr) evaluate to inside the printSize function above, and why?',
    options: [
      {
        id: 'opt-a',
        label: 'It evaluates to the size of a pointer (e.g. 8 bytes on 64-bit systems) because array function parameters in C decay into pointers to their first element.',
        explanation: 'Correct! In C (C99 §6.7.5.3/7), array parameters decay to pointers (`int*`). Inside the function, `sizeof(arr)` yields pointer size, not array capacity.',
      },
      {
        id: 'opt-b',
        label: 'It evaluates to the total number of elements multiplied by sizeof(int).',
        explanation: 'Incorrect. The array type decays to a pointer type in function parameter lists, losing element count information.',
      },
      {
        id: 'opt-c',
        label: 'It causes a compile-time syntax error because sizeof cannot be applied to arrays.',
        explanation: 'Incorrect. sizeof can be applied to arrays and pointers; here it evaluates the decayed pointer type.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In C, an array argument passed to a function decays to a pointer to its first element (`int arr[]` becomes `int *arr`). Consequently, `sizeof(arr)` computes the byte size of the pointer itself (typically 8 bytes on modern 64-bit architectures), which is why C functions require a separate `size` or `length` parameter.',
  },
  {
    id: 'q-array-ds-hard-02',
    algoId: 'array-ds',
    tier: 'hard',
    concept: 'Spatial Locality & Hardware Prefetching',
    prompt: 'Why does iterating sequentially through an array achieve significantly higher hardware throughput than traversing an equal number of nodes in a linked list?',
    options: [
      {
        id: 'opt-a',
        label: 'Array elements reside contiguously, allowing CPU hardware prefetchers to stream 64-byte cache lines into L1/L2 caches ahead of execution, minimizing memory latency stalls.',
        explanation: 'Correct! Contiguous memory layout maximizes spatial locality: loading one element brings adjacent elements into CPU cache lines automatically.',
      },
      {
        id: 'opt-b',
        label: 'Because the CPU executes array loop instructions in parallel on the GPU without memory bus access.',
        explanation: 'Incorrect. Array loops run on CPU cores; performance gains come from CPU cache line prefetching.',
      },
      {
        id: 'opt-c',
        label: 'Because linked list pointers require floating-point arithmetic to dereference.',
        explanation: 'Incorrect. Pointer dereferencing uses integer memory addresses, not floating-point operations.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Modern CPUs read memory in 64-byte cache lines. In an array of 4-byte integers, fetching one cache line loads 16 consecutive elements into L1 cache. The hardware stream prefetcher detects linear strides and fetches future lines speculatively. In contrast, linked list nodes reside at scattered heap locations, incurring high-latency cache misses on every node.',
  },
  {
    id: 'q-array-ds-hard-03',
    algoId: 'array-ds',
    tier: 'hard',
    concept: 'Overlapping Memory Shifting: memmove vs memcpy in C',
    prompt: 'When shifting array elements rightward to insert a value into the middle of an array in C, why must memmove be used instead of memcpy?',
    options: [
      {
        id: 'opt-a',
        label: 'The source and destination ranges overlap; C standard §7.21.2.1 states that memcpy has undefined behavior on overlapping memory, whereas memmove safely handles overlapping buffers.',
        explanation: 'Correct! When shifting elements within the same array, source and destination overlap. memcpy assumes disjoint regions and can corrupt data; memmove is guaranteed safe.',
      },
      {
        id: 'opt-b',
        label: 'Because memcpy only operates on arrays containing fewer than 10 elements.',
        explanation: 'Incorrect. memcpy accepts arbitrary byte lengths.',
      },
      {
        id: 'opt-c',
        label: 'Because memmove automatically increases the capacity of the destination array.',
        explanation: 'Incorrect. memmove does not resize arrays; it copies bytes within pre-allocated memory.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'When shifting elements within an array (e.g. from index k to k + 1), the source range [k..n-1] and destination range [k+1..n] share common memory addresses. The ISO C standard states that if copying takes place between overlapping objects, the behavior of `memcpy` is undefined. `memmove` safely copies via a temporary buffer or direction-aware loop.',
  },

  // ==========================================
  // TOPIC 2: STACK OPERATIONS (stack-ds)
  // ==========================================

  // --- Stack Operations: Easy ---
  {
    id: 'q-stack-ds-easy-01',
    algoId: 'stack-ds',
    tier: 'easy',
    concept: 'LIFO Discipline',
    prompt: 'What fundamental ordering discipline governs the operations of a Stack data structure?',
    options: [
      {
        id: 'opt-a',
        label: 'LIFO (Last-In, First-Out): the element most recently pushed onto the stack is the first element to be removed by a pop.',
        explanation: 'Correct! A stack operates on the Last-In, First-Out principle, analogous to a stack of dinner plates.',
      },
      {
        id: 'opt-b',
        label: 'FIFO (First-In, First-Out): the element that has spent the longest time in the stack is removed first.',
        explanation: 'Incorrect. FIFO describes a Queue, not a Stack.',
      },
      {
        id: 'opt-c',
        label: 'Priority order: the element with the highest numerical value is always popped first.',
        explanation: 'Incorrect. Removal based on value priority describes a Priority Queue (Heap).',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'A stack is a linear collection characterized by the Last-In, First-Out (LIFO) protocol. Elements can only be added (pushed) and removed (popped) at a single designated end, called the "top".',
  },
  {
    id: 'q-stack-ds-easy-02',
    algoId: 'stack-ds',
    tier: 'easy',
    concept: 'Core Stack Operations & Complexity',
    prompt: 'What are the three primary operations of a stack, and what is their time complexity?',
    options: [
      {
        id: 'opt-a',
        label: 'Push (insert at top), Pop (remove from top), and Peek/Top (inspect top element); all three execute in O(1) time.',
        explanation: 'Correct! Stack operations manipulate only the top index/pointer, requiring no element shifting or traversal (O(1)).',
      },
      {
        id: 'opt-b',
        label: 'Push is O(1), Pop is O(n), and Peek is O(log n).',
        explanation: 'Incorrect. Pop does not shift elements in a properly implemented stack; it executes in O(1).',
      },
      {
        id: 'opt-c',
        label: 'Push is O(n), Pop is O(1), and Peek is O(1).',
        explanation: 'Incorrect. Push places the item at the top without searching or shifting (O(1)).',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In a standard stack implemented with an array or linked list, pushing, popping, and peeking operate exclusively on the top element. Because no other elements are touched or shifted, all three operations run in O(1) time.',
  },
  {
    id: 'q-stack-ds-easy-03',
    algoId: 'stack-ds',
    tier: 'easy',
    concept: 'Stack Underflow Condition',
    prompt: 'What error state occurs when a program attempts to execute a pop() or peek() operation on an empty stack?',
    options: [
      {
        id: 'opt-a',
        label: 'Stack Underflow, which occurs when an operation attempts to extract or read an element when the stack size is 0.',
        explanation: 'Correct! Popping an empty stack is an underflow condition because no elements exist to remove.',
      },
      {
        id: 'opt-b',
        label: 'Stack Overflow, because the stack capacity has exceeded memory limits.',
        explanation: 'Incorrect. Overflow occurs when attempting to push onto a full stack, not popping an empty one.',
      },
      {
        id: 'opt-c',
        label: 'Deadlock, because the operating system freezes the process thread.',
        explanation: 'Incorrect. Deadlock involves circular lock contention, not basic data structure emptiness.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Stack underflow occurs when an extraction operation (pop or peek) is requested on a stack that contains zero elements (top == -1). Robust implementations guard against underflow with an `isEmpty()` check.',
  },

  // --- Stack Operations: Medium ---
  {
    id: 'q-stack-ds-med-01',
    algoId: 'stack-ds',
    tier: 'medium',
    concept: 'Fixed-Capacity Stack Overflow',
    codeContext: {
      language: 'c',
      code: 'int push(int stack[], int *top, int capacity, int value) {\n    if (*top == capacity - 1) return -1; // Overflow\n    stack[++(*top)] = value;\n    return 0;\n}',
    },
    prompt: 'In the fixed-array stack implementation above, under what condition does Stack Overflow occur?',
    options: [
      {
        id: 'opt-a',
        label: 'When *top equals capacity - 1, indicating all allocated array slots are occupied and no space remains to push a new element.',
        explanation: 'Correct! With 0-based indexing, slot capacity - 1 is the last available slot; pushing beyond it causes an overflow.',
      },
      {
        id: 'opt-b',
        label: 'When value is less than 0, violating the unsigned integer limit.',
        explanation: 'Incorrect. Value magnitudes do not determine stack overflow; capacity bounds do.',
      },
      {
        id: 'opt-c',
        label: 'When *top equals 0, meaning only 1 element remains.',
        explanation: 'Incorrect. top == 0 means 1 element is in the stack, which is not full unless capacity is 1.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In a fixed-size array stack of size `capacity`, the top index begins at -1 (empty) and increments up to `capacity - 1` (full). Attempting to push when `*top == capacity - 1` results in Stack Overflow, attempting an out-of-bounds array write.',
  },
  {
    id: 'q-stack-ds-med-02',
    algoId: 'stack-ds',
    tier: 'medium',
    concept: 'Balanced Parentheses Verification',
    prompt: 'How does an algorithm use a stack to verify whether a string containing brackets like "({[]})" is properly balanced?',
    options: [
      {
        id: 'opt-a',
        label: 'It pushes each opening bracket onto the stack; when a closing bracket appears, it pops the top bracket and verifies they match, requiring an empty stack at the end.',
        explanation: 'Correct! Opening brackets wait on the stack for their corresponding closing bracket. The most recent opening bracket must match the next closing bracket.',
      },
      {
        id: 'opt-b',
        label: 'It counts opening brackets and closing brackets with a single integer counter without tracking bracket types.',
        explanation: 'Incorrect. A single counter cannot differentiate mismatched bracket types like "(]" or "([)]".',
      },
      {
        id: 'opt-c',
        label: 'It sorts all characters in alphabetical order and checks if adjacent characters match.',
        explanation: 'Incorrect. Sorting destroys the sequential nesting order of brackets.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Bracket nesting adheres strictly to LIFO semantics: the most recently opened bracket must be the first one closed. Pushing opening brackets and popping upon closing brackets allows matching pairs in O(n) time and O(n) space. The string is balanced if all pairs match and the stack is empty upon completion.',
  },
  {
    id: 'q-stack-ds-med-03',
    algoId: 'stack-ds',
    tier: 'medium',
    concept: 'Two Stacks in One Array',
    prompt: 'How can two separate stacks be efficiently implemented within a single array of size n without risking false overflow?',
    options: [
      {
        id: 'opt-a',
        label: 'Stack 1 starts at index 0 and grows rightward (++top1), while Stack 2 starts at index n - 1 and grows leftward (--top2); overflow occurs only when top1 + 1 == top2.',
        explanation: 'Correct! Growing from opposite ends shares the total array capacity dynamically, preventing false overflow until the entire array is full.',
      },
      {
        id: 'opt-b',
        label: 'By allocating all even indices to Stack 1 and all odd indices to Stack 2.',
        explanation: 'Incorrect. Interleaved allocation causes Stack 1 to overflow when half full even if Stack 2 is completely empty.',
      },
      {
        id: 'opt-c',
        label: 'By dividing the array rigidly into two halves [0..n/2-1] and [n/2..n-1].',
        explanation: 'Incorrect. Rigid splitting causes false overflow if Stack 1 fills up while Stack 2 remains empty.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'By growing Stack 1 from index 0 upward and Stack 2 from index n - 1 downward, memory is utilized elastically. Space is available to either stack as long as their top pointers have not met (`top1 < top2 - 1`), maximizing memory efficiency without false overflow.',
  },

  // --- Stack Operations: Hard ---
  {
    id: 'q-stack-ds-hard-01',
    algoId: 'stack-ds',
    tier: 'hard',
    concept: 'Call Stack Frame Allocation & Overflow in C',
    prompt: 'In C execution environments, what physical memory structures are allocated on the program call stack during a function call, and what causes an OS stack overflow?',
    options: [
      {
        id: 'opt-a',
        label: 'Each call pushes an activation record (stack frame) containing return address, saved frame pointer, and local variables; unbounded recursion exhausts the OS thread stack quota (typically 1–8 MB), triggering a segmentation fault.',
        explanation: 'Correct! Stack frames allocate function context on the OS stack. Deep recursion without a base case exhausts the fixed thread stack limit.',
      },
      {
        id: 'opt-b',
        label: 'Function calls allocate heap blocks via malloc; stack overflow occurs when dynamic RAM is completely exhausted.',
        explanation: 'Incorrect. Function calls use the OS call stack, not heap malloc calls.',
      },
      {
        id: 'opt-c',
        label: 'Each function call writes its code instructions into disk storage; overflow occurs when the SSD fills up.',
        explanation: 'Incorrect. Call frames reside in system RAM within the thread\'s call stack region.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'When a function is called in C, an activation record (stack frame) is allocated on the thread\'s call stack containing the return address, saved registers, arguments, and local automatic variables. If recursion runs too deeply, the stack pointer exceeds the allocated stack segment boundary (typically 8 MB on Linux, 1 MB on Windows), resulting in SIGSEGV (segmentation fault).',
  },
  {
    id: 'q-stack-ds-hard-02',
    algoId: 'stack-ds',
    tier: 'hard',
    concept: 'Monotonic Stack O(n) Amortized Complexity',
    prompt: 'In the "Next Greater Element" problem on an array of size n, why does a Monotonic Stack solve the problem in linear O(n) time despite containing nested loops?',
    options: [
      {
        id: 'opt-a',
        label: 'Across the entire execution, each element index is pushed onto the stack exactly once and popped from the stack at most once, bounding total stack operations to at most 2n (O(n)).',
        explanation: 'Correct! Amortized analysis proves that although individual iterations may pop multiple items, total push and pop operations cannot exceed 2n.',
      },
      {
        id: 'opt-b',
        label: 'Because the inner while loop only executes when n is an odd number.',
        explanation: 'Incorrect. Loop execution depends on element comparisons, not n parity.',
      },
      {
        id: 'opt-c',
        label: 'Because the compiler automatically vectorizes the stack into SIMD registers.',
        explanation: 'Incorrect. The linear complexity is a mathematical invariant of push/pop counts, not compiler vectorization.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Using aggregate amortized analysis: the outer for-loop pushes each of the n elements onto the stack exactly once. An element can only be popped if it was previously pushed. Therefore, the inner while-loop can execute at most n pop operations across the entire lifespan of the algorithm. Total operations = n pushes + at most n pops = 2n = O(n).',
  },
  {
    id: 'q-stack-ds-hard-03',
    algoId: 'stack-ds',
    tier: 'hard',
    concept: 'Array vs Linked-List Stack Architectural Trade-Off',
    prompt: 'When evaluating an array-based stack versus a linked-list-based stack, what is the primary hardware efficiency trade-off?',
    options: [
      {
        id: 'opt-a',
        label: 'The array stack provides superior CPU cache locality and zero per-element pointer overhead, but may require occasional reallocation; the linked-list stack never reallocates, but incurs node pointer overhead and higher heap allocation/cache miss latency.',
        explanation: 'Correct! Array stacks pack contiguous elements without node pointers; linked list stacks allocate heap nodes individually, causing cache line fragmentation.',
      },
      {
        id: 'opt-b',
        label: 'The linked-list stack runs in O(1) time while the array stack takes O(n) time for every push.',
        explanation: 'Incorrect. Both stacks perform pushes in O(1) time (amortized O(1) for dynamic arrays).',
      },
      {
        id: 'opt-c',
        label: 'The array stack cannot store integer values larger than 1024.',
        explanation: 'Incorrect. Array stacks store standard primitive types of any value within their type bounds.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'An array stack stores elements contiguously with zero metadata overhead per element, maximizing CPU L1 cache line efficiency. A linked-list stack dynamically allocates each node, incurring pointer storage overhead (8 bytes per node on 64-bit systems) plus heap allocator bookkeeping, alongside memory fragmentation and frequent cache misses on node dereferencing.',
  },

  // ==========================================
  // TOPIC 3: QUEUE OPERATIONS (queue-ds)
  // ==========================================

  // --- Queue Operations: Easy ---
  {
    id: 'q-queue-ds-easy-01',
    algoId: 'queue-ds',
    tier: 'easy',
    concept: 'FIFO Discipline',
    prompt: 'What fundamental ordering discipline governs the operations of a standard Queue data structure?',
    options: [
      {
        id: 'opt-a',
        label: 'FIFO (First-In, First-Out): the element that was enqueued earliest is the first element to be removed by a dequeue.',
        explanation: 'Correct! A queue operates on the First-In, First-Out principle, analogous to a checkout line of customers.',
      },
      {
        id: 'opt-b',
        label: 'LIFO (Last-In, First-Out): the newest element is removed first.',
        explanation: 'Incorrect. LIFO describes a Stack, not a Queue.',
      },
      {
        id: 'opt-c',
        label: 'Random order: elements are dequeued in pseudo-random sequence.',
        explanation: 'Incorrect. Standard queues strictly preserve arrival order.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'A queue enforces First-In, First-Out (FIFO) ordering. Items are inserted at the back (rear/tail) and extracted from the front (head), ensuring elements are processed in their exact arrival sequence.',
  },
  {
    id: 'q-queue-ds-easy-02',
    algoId: 'queue-ds',
    tier: 'easy',
    concept: 'Enqueue and Dequeue Semantics',
    prompt: 'At which designated ends of a queue do Enqueue and Dequeue operations occur, and what is their time complexity?',
    options: [
      {
        id: 'opt-a',
        label: 'Enqueue inserts at the rear/tail; Dequeue removes from the front/head; both operate in O(1) time.',
        explanation: 'Correct! Enqueue appends to the rear and Dequeue extracts from the front, each in constant O(1) time.',
      },
      {
        id: 'opt-b',
        label: 'Enqueue inserts at the front; Dequeue removes from the rear; both operate in O(n) time.',
        explanation: 'Incorrect. Standard queues enqueue at the rear and dequeue at the front in O(1) time.',
      },
      {
        id: 'opt-c',
        label: 'Both Enqueue and Dequeue operate strictly at the center index in O(log n) time.',
        explanation: 'Incorrect. Queue operations never occur at the center index.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'A properly designed queue maintains separate `front` and `rear` pointers/indices. Enqueuing appends to `rear` in O(1), and dequeuing extracts from `front` in O(1). Neither requires shifting elements when implemented correctly.',
  },
  {
    id: 'q-queue-ds-easy-03',
    algoId: 'queue-ds',
    tier: 'easy',
    concept: 'Queue Underflow Condition',
    prompt: 'What condition triggers a Queue Underflow error?',
    options: [
      {
        id: 'opt-a',
        label: 'Attempting to dequeue or read the front element when the queue contains zero elements.',
        explanation: 'Correct! Extracting from an empty queue is an underflow condition.',
      },
      {
        id: 'opt-b',
        label: 'Attempting to insert an element when the queue capacity is completely full.',
        explanation: 'Incorrect. Inserting into a full queue triggers Queue Overflow.',
      },
      {
        id: 'opt-c',
        label: 'When the rear pointer value is smaller than the front pointer value in a circular queue.',
        explanation: 'Incorrect. In a circular queue, rear < front is normal when rear wraps around to index 0.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Queue underflow occurs when an extraction request (`dequeue` or `front`) is issued against an empty queue (`count == 0` or `front == -1`). Attempting to read or remove non-existent data constitutes an error.',
  },

  // --- Queue Operations: Medium ---
  {
    id: 'q-queue-ds-med-01',
    algoId: 'queue-ds',
    tier: 'medium',
    concept: 'False Overflow in Linear Array Queues',
    prompt: 'Why does implementing a queue using a simple linear array with incrementing front and rear indices suffer from "false overflow"?',
    options: [
      {
        id: 'opt-a',
        label: 'As elements are enqueued and dequeued, front and rear drift rightward; rear reaches capacity - 1 and prevents further enqueues even if unused slots exist at the front.',
        explanation: 'Correct! Without circular wraparound or shifting, dequeued slots at the beginning are permanently abandoned, causing false overflow.',
      },
      {
        id: 'opt-b',
        label: 'Because the linear array automatically deletes its elements after 100 milliseconds.',
        explanation: 'Incorrect. Memory does not auto-delete based on time.',
      },
      {
        id: 'opt-c',
        label: 'Because front and rear indices trigger integer overflow after 10 enqueues.',
        explanation: 'Incorrect. Index bounds match array capacity, not integer register limits.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In a naive array queue where dequeue simply increments `front++`, vacated slots at indices 0, 1, ... are never reused. When `rear` reaches `capacity - 1`, the queue claims to be full even if `front` is at `capacity - 1` and the queue contains only 1 element. This problem is called "false overflow" or "queue drift".',
  },
  {
    id: 'q-queue-ds-med-02',
    algoId: 'queue-ds',
    tier: 'medium',
    concept: 'Circular Queue Modulo Indexing',
    prompt: 'How does a Circular Queue solve false overflow without shifting elements on every dequeue?',
    options: [
      {
        id: 'opt-a',
        label: 'It uses modulo arithmetic: next_rear = (rear + 1) % capacity and next_front = (front + 1) % capacity, wrapping indices back to 0 when reaching the end of the array.',
        explanation: 'Correct! Modulo arithmetic wraps indices in a continuous ring, reusing slots vacated by earlier dequeues in O(1) time.',
      },
      {
        id: 'opt-b',
        label: 'It executes an O(n) shift of all remaining elements to index 0 on every dequeue.',
        explanation: 'Incorrect. Shifting elements on dequeue degrades dequeue complexity from O(1) to O(n).',
      },
      {
        id: 'opt-c',
        label: 'It reallocates a brand new array on every single enqueue operation.',
        explanation: 'Incorrect. Reallocating on every enqueue is inefficient and defeats ring buffering.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'A circular queue treats the backing array as a continuous logical ring. By advancing indices via `(index + 1) % capacity`, when `rear` reaches `capacity - 1`, the next increment places it at index 0. This reclaims previously dequeued slots in O(1) time without element shifting.',
  },
  {
    id: 'q-queue-ds-med-03',
    algoId: 'queue-ds',
    tier: 'medium',
    concept: 'Circular Buffer Full vs Empty Disambiguation',
    prompt: 'In a circular queue without an explicit count variable, why does front == rear represent ambiguity, and how is it resolved?',
    options: [
      {
        id: 'opt-a',
        label: 'Both completely empty and completely full states yield front == rear; it is resolved by sacrificing one array slot, defining full as (rear + 1) % capacity == front.',
        explanation: 'Correct! Reserving one empty slot guarantees that front == rear uniquely indicates an empty queue, while (rear + 1) % capacity == front indicates full.',
      },
      {
        id: 'opt-b',
        label: 'Because front and rear pointers cannot point to the same memory address in C.',
        explanation: 'Incorrect. Multiple pointers can easily share the same address.',
      },
      {
        id: 'opt-c',
        label: 'By setting rear to -1 whenever front reaches capacity / 2.',
        explanation: 'Incorrect. Arbitrary pointer resets break FIFO ordering.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'If all capacity slots are usable, both an empty queue and a full queue result in `front == rear`. Standard solutions either: (1) maintain an explicit `count` variable tracking the current number of elements, or (2) sacrifice 1 slot so that the queue is considered full when `(rear + 1) % capacity == front`, while `front == rear` strictly means empty.',
  },

  // --- Queue Operations: Hard ---
  {
    id: 'q-queue-ds-hard-01',
    algoId: 'queue-ds',
    tier: 'hard',
    concept: 'Queue via Two Stacks Amortized Complexity',
    prompt: 'When implementing a Queue using two Stacks (inStack for enqueue and outStack for dequeue), why is the dequeue operation amortized O(1) despite occasionally transferring up to n elements?',
    options: [
      {
        id: 'opt-a',
        label: 'Each element is pushed to inStack once, popped from inStack once, pushed to outStack once, and popped from outStack once; total operations across n elements is 4n, yielding amortized O(1) cost per operation.',
        explanation: 'Correct! By amortized analysis, each item experiences at most 4 stack operations over its entire lifecycle, bounding total work to O(n) for n operations.',
      },
      {
        id: 'opt-b',
        label: 'Because elements in outStack are transferred directly across CPU L1 cache lines without loop execution.',
        explanation: 'Incorrect. Elements are transferred via standard loop instructions.',
      },
      {
        id: 'opt-c',
        label: 'Because inStack and outStack share the same memory pointer in the operating system.',
        explanation: 'Incorrect. The stacks are distinct data structures.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Enqueues push to `inStack` in O(1). A dequeue pops from `outStack` if non-empty; if empty, it transfers all elements from `inStack` to `outStack` (reversing their order to restore FIFO). Every element is pushed to `inStack` once, moved to `outStack` once, and popped once. Total cost for n items is 4n operations, giving O(1) amortized time per operation.',
  },
  {
    id: 'q-queue-ds-hard-02',
    algoId: 'queue-ds',
    tier: 'hard',
    concept: 'Ring Buffer vs Linked-List Queue Cache Performance',
    prompt: 'Why is an array-based circular ring buffer universally preferred over a linked-list queue in high-performance network packet processing and lock-free concurrency?',
    options: [
      {
        id: 'opt-a',
        label: 'The ring buffer pre-allocates contiguous memory with zero dynamic malloc/free overhead per packet, eliminates node pointer overhead, and exhibits high spatial CPU cache locality.',
        explanation: 'Correct! Ring buffers avoid dynamic heap memory allocation churn and pointer chasing, critical for low-latency packet processing.',
      },
      {
        id: 'opt-b',
        label: 'Because linked lists cannot be accessed by multi-threaded programs.',
        explanation: 'Incorrect. Concurrent linked lists exist, but suffer higher allocation overhead and cache misses.',
      },
      {
        id: 'opt-c',
        label: 'Because ring buffers automatically compress packet payloads using hardware decompression.',
        explanation: 'Incorrect. Ring buffers are memory structures, not compression algorithms.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'High-throughput systems (such as Linux kernel network drivers, ring buffers, and LMAX Disruptor) avoid linked lists because invoking `malloc`/`free` per packet causes severe heap lock contention and memory fragmentation. An array ring buffer pre-allocates contiguous memory, maximizing CPU cache line hits and allowing atomic index operations without memory allocations.',
  },
  {
    id: 'q-queue-ds-hard-03',
    algoId: 'queue-ds',
    tier: 'hard',
    concept: 'BFS Level-Order Monotonic Queue Invariant',
    prompt: 'In Breadth-First Search (BFS) on unweighted graphs, what invariant does the queue maintain regarding the distance of queued vertices from the source?',
    options: [
      {
        id: 'opt-a',
        label: 'The queue vertices have monotonically non-decreasing distances from the source, containing vertices of distance d followed by vertices of distance d + 1, guaranteeing shortest paths when vertices are dequeued.',
        explanation: 'Correct! BFS queue ordering guarantees that all vertices at distance d are processed before any vertex at distance d + 1, ensuring shortest path discovery.',
      },
      {
        id: 'opt-b',
        label: 'The queue always contains vertices ordered by their degree of incident edges.',
        explanation: 'Incorrect. Vertex degree does not determine BFS queue placement.',
      },
      {
        id: 'opt-c',
        label: 'The queue contains vertices in strictly descending order of distance.',
        explanation: 'Incorrect. Distances in BFS increase monotonically from 0 upward.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The fundamental invariant of BFS is that the queue contains vertices with distance values {d, d, ..., d, d+1, ..., d+1}. Because vertices at distance d are dequeued before distance d + 1, their neighbors (distance d + 1) are enqueued after existing distance d elements. This guarantees that the first time a vertex is dequeued, its shortest path has been found.',
  },

  // ==========================================
  // TOPIC 4: LINKED LIST OPERATIONS (linked-list-ds)
  // ==========================================

  // --- Linked List Operations: Easy ---
  {
    id: 'q-linked-list-ds-easy-01',
    algoId: 'linked-list-ds',
    tier: 'easy',
    concept: 'Node & Pointer Linkage',
    prompt: 'What basic components comprise a standard node in a singly linked list?',
    options: [
      {
        id: 'opt-a',
        label: 'A data payload field storing the value, and a next pointer storing the memory address of the subsequent node (or NULL if it is the last node).',
        explanation: 'Correct! A singly linked list node contains a data element and a reference/pointer to the next node in the sequence.',
      },
      {
        id: 'opt-b',
        label: 'An array index number, a hash key, and a pointer to the operating system root.',
        explanation: 'Incorrect. Linked list nodes do not store array indices or OS roots.',
      },
      {
        id: 'opt-c',
        label: 'Two integer values and a pointer to the middle node of the list.',
        explanation: 'Incorrect. A singly linked list node points only to its immediate successor.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In C, a singly linked list node is typically declared as `struct Node { int data; struct Node *next; };`. Each node holds its data payload and an explicit pointer to the next node in memory, with the tail node\'s `next` pointer set to `NULL`.',
  },
  {
    id: 'q-linked-list-ds-easy-02',
    algoId: 'linked-list-ds',
    tier: 'easy',
    concept: 'Non-Contiguous Dynamic Memory',
    prompt: 'Unlike arrays, how are linked list nodes organized within physical system memory?',
    options: [
      {
        id: 'opt-a',
        label: 'Nodes are allocated individually across non-contiguous heap memory locations and connected dynamically via explicit pointers.',
        explanation: 'Correct! Each node is allocated independently on the heap; they do not need to sit contiguously in memory.',
      },
      {
        id: 'opt-b',
        label: 'All nodes must be stored in consecutive adjacent memory addresses in the stack segment.',
        explanation: 'Incorrect. Adjacent storage describes arrays, not dynamic linked lists.',
      },
      {
        id: 'opt-c',
        label: 'Nodes reside in read-only program code memory.',
        explanation: 'Incorrect. Nodes reside in dynamically allocated read-write heap memory.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Because nodes are linked via pointer addresses rather than memory adjacency, they can be allocated on demand anywhere in the process heap. This eliminates the need for contiguous memory blocks and allows dynamic growth without reallocating existing nodes.',
  },
  {
    id: 'q-linked-list-ds-easy-03',
    algoId: 'linked-list-ds',
    tier: 'easy',
    concept: 'Sequential Traversal Complexity',
    prompt: 'What is the time complexity to access the k-th element of a singly linked list of size n, and why?',
    options: [
      {
        id: 'opt-a',
        label: 'O(k) (or O(n) worst-case), because accessing node k requires starting at the head and sequentially traversing k next pointers.',
        explanation: 'Correct! Linked lists lack random indexing; reaching node k requires sequential traversal from the head.',
      },
      {
        id: 'opt-b',
        label: 'O(1), because the CPU calculates node addresses via base + k * sizeof(Node).',
        explanation: 'Incorrect. Base address arithmetic only works for contiguous arrays, not scattered linked nodes.',
      },
      {
        id: 'opt-c',
        label: 'O(log n), because next pointers can be bisected using binary search.',
        explanation: 'Incorrect. Binary search requires direct random access, which linked lists do not possess.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Because nodes are scattered in heap memory, finding the k-th node requires starting at `head` and following `curr = curr->next` k times. This sequential dependency results in O(k) access time, contrasting with arrays\' O(1) random access.',
  },

  // --- Linked List Operations: Medium ---
  {
    id: 'q-linked-list-ds-med-01',
    algoId: 'linked-list-ds',
    tier: 'medium',
    concept: 'Head Insertion vs Tail Insertion',
    prompt: 'What are the time complexities for inserting a new node at the head versus inserting at the tail of a singly linked list with only a head pointer?',
    options: [
      {
        id: 'opt-a',
        label: 'Head insertion is O(1) because only two pointer assignments are needed; tail insertion is O(n) because the entire list must be traversed to locate the last node.',
        explanation: 'Correct! Head insertion connects newNode->next = head and head = newNode in O(1). Without a tail pointer, reaching the end takes O(n) traversal.',
      },
      {
        id: 'opt-b',
        label: 'Both head and tail insertions take O(1) time regardless of whether a tail pointer exists.',
        explanation: 'Incorrect. Finding the tail without a tail pointer requires traversing all n nodes.',
      },
      {
        id: 'opt-c',
        label: 'Head insertion is O(n) due to element shifting; tail insertion is O(1).',
        explanation: 'Incorrect. Linked lists never shift elements on insertion.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Inserting at the head takes O(1): allocate node, set `newNode->next = head`, and update `head = newNode`. Without a dedicated tail pointer, inserting at the tail requires traversing `while (curr->next != NULL)` across all n nodes (O(n)) before attaching the new node.',
  },
  {
    id: 'q-linked-list-ds-med-02',
    algoId: 'linked-list-ds',
    tier: 'medium',
    concept: 'Search Cost vs Splicing Cost Distinction',
    prompt: 'When deleting a node with a specific value from a singly linked list, which statement accurately distinguishes locating the node from removing it?',
    options: [
      {
        id: 'opt-a',
        label: 'Locating the target node requires O(n) sequential search, but once the preceding node is identified, the pointer splicing operation itself (prev->next = curr->next) takes O(1) time.',
        explanation: 'Correct! The computational bottleneck is finding the node; rewiring the pointer links takes constant O(1) time.',
      },
      {
        id: 'opt-b',
        label: 'Both locating the node and splicing the pointers take O(n) time.',
        explanation: 'Incorrect. Pointer modification is a single assignment (O(1)).',
      },
      {
        id: 'opt-c',
        label: 'Splicing pointers requires shifting all subsequent nodes leftward in memory.',
        explanation: 'Incorrect. Nodes in a linked list do not shift in memory; only pointers are updated.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'A common misconception is that linked list deletion is O(1). In reality: finding a node by value takes O(n) search. However, given a direct pointer to the predecessor node `prev`, the deletion itself is O(1): `prev->next = curr->next; free(curr);`. No element shifting occurs.',
  },
  {
    id: 'q-linked-list-ds-med-03',
    algoId: 'linked-list-ds',
    tier: 'medium',
    concept: 'Singly vs Doubly Linked List Trade-Offs',
    prompt: 'What advantage does a Doubly Linked List provide over a Singly Linked List, and what is its associated cost?',
    options: [
      {
        id: 'opt-a',
        label: 'It allows bidirectional traversal and O(1) deletion given only a pointer to the node itself (via node->prev), but incurs extra memory for a prev pointer per node and additional link maintenance on updates.',
        explanation: 'Correct! Having `prev` allows deleting a node directly without finding its predecessor, at the expense of an extra pointer per node.',
      },
      {
        id: 'opt-b',
        label: 'It provides O(1) random index access like an array, but doubles memory usage.',
        explanation: 'Incorrect. Doubly linked lists still require sequential traversal (O(n) access).',
      },
      {
        id: 'opt-c',
        label: 'It guarantees that all nodes are stored in contiguous memory.',
        explanation: 'Incorrect. Doubly linked list nodes are also dynamically allocated across the heap.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'A doubly linked list node has both `next` and `prev` pointers. Given an arbitrary node reference `curr`, it can be deleted in O(1) time via `curr->prev->next = curr->next; curr->next->prev = curr->prev;` without searching for its predecessor. The trade-off is an extra pointer (8 bytes on 64-bit systems) per node and maintaining 4 pointers on insertions/deletions.',
  },

  // --- Linked List Operations: Hard ---
  {
    id: 'q-linked-list-ds-hard-01',
    algoId: 'linked-list-ds',
    tier: 'hard',
    concept: 'Pointer-to-Pointer (Node**) Head Modification in C',
    codeContext: {
      language: 'c',
      code: 'void insertHead(struct Node **head_ref, int new_data) {\n    struct Node *new_node = malloc(sizeof(struct Node));\n    new_node->data = new_data;\n    new_node->next = *head_ref;\n    *head_ref = new_node;\n}',
    },
    prompt: 'In C, why must the function above accept a pointer-to-pointer (struct Node **head_ref) rather than a single pointer (struct Node *head)?',
    options: [
      {
        id: 'opt-a',
        label: 'C passes function arguments by value; passing a single pointer would only modify a local copy, whereas passing Node** allows the function to dereference and modify the caller\'s actual head pointer variable.',
        explanation: 'Correct! In C, passing `head` passes the pointer by value. To change what pointer variable `head` points to in the calling scope, its address (`&head`) must be passed as `Node**`.',
      },
      {
        id: 'opt-b',
        label: 'Because the C compiler forbids dynamic memory allocation through single pointers.',
        explanation: 'Incorrect. malloc works identically regardless of argument indirection.',
      },
      {
        id: 'opt-c',
        label: 'Because single pointers cannot access member fields using the arrow operator ->.',
        explanation: 'Incorrect. Single pointers access struct members with `->` standardly.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In C, all arguments are passed by value. If `insertHead` took `struct Node *head`, assigning `head = new_node;` would only rebind the local parameter copy, leaving the caller\'s `head` pointer unchanged (and leaking memory). Passing `struct Node **head_ref` allows writing directly into the caller\'s pointer: `*head_ref = new_node;`.',
  },
  {
    id: 'q-linked-list-ds-hard-02',
    algoId: 'linked-list-ds',
    tier: 'hard',
    concept: 'Floyd\'s Cycle Detection (Tortoise and Hare)',
    prompt: 'In Floyd\'s Cycle-Finding Algorithm for detecting a loop in a linked list, why are two pointers advancing at speeds 1 and 2 guaranteed to meet in O(n) time if a cycle exists?',
    options: [
      {
        id: 'opt-a',
        label: 'Once both pointers enter the cycle, the relative distance between the fast and slow pointer decreases by exactly 1 on every step (2 - 1 = 1); since the cycle has finite length C, they must collide in at most C steps.',
        explanation: 'Correct! The fast pointer closes the gap by 1 node per iteration, mathematically guaranteeing collision within one traversal of the cycle.',
      },
      {
        id: 'opt-b',
        label: 'Because the fast pointer reverses direction when reaching the end of the cycle.',
        explanation: 'Incorrect. Pointers only advance forward along next links; they never reverse direction.',
      },
      {
        id: 'opt-c',
        label: 'Because the operating system detects cyclic memory pointers and triggers an interrupt.',
        explanation: 'Incorrect. OS memory managers do not inspect pointer topologies of user lists.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Let the cycle have length C. When both slow and fast pointers are within the cycle, fast is behind slow by some distance d < C. On each step, slow advances 1 node and fast advances 2 nodes, reducing the distance between them by (2 - 1) = 1 node modulo C. Because the gap shrinks by 1 each step, fast is guaranteed to catch slow in at most C steps without extra memory (O(1) space).',
  },
  {
    id: 'q-linked-list-ds-hard-03',
    algoId: 'linked-list-ds',
    tier: 'hard',
    concept: 'Memory Fragmentation & Cache Inefficiency',
    prompt: 'Why does traversing an array of structs typically exhibit far better wall-clock performance than traversing an identically sized linked list of structs on modern CPU architectures?',
    options: [
      {
        id: 'opt-a',
        label: 'Linked list nodes are scattered across the heap, causing spatial cache misses and TLB misses on pointer dereferences, whereas array elements pack into contiguous cache lines with hardware prefetching.',
        explanation: 'Correct! Pointer chasing disrupts memory prefetchers and incurs multi-cycle cache miss penalties on almost every node hop.',
      },
      {
        id: 'opt-b',
        label: 'Because linked list nodes must be decrypted by the CPU before each access.',
        explanation: 'Incorrect. Heap memory is not encrypted by default.',
      },
      {
        id: 'opt-c',
        label: 'Because array elements are stored directly in CPU register files.',
        explanation: 'Incorrect. Both structures reside in RAM, but arrays leverage CPU caches effectively.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Modern CPUs spend hundreds of clock cycles fetching data from main memory. Arrays maximize spatial locality: reading one element brings adjacent elements into 64-byte L1 cache lines. In a linked list, each node is allocated independently on the heap; dereferencing `node->next` jumps to a distant memory address, causing L1/L2 cache misses and pipeline stalls on nearly every node.',
  },

  // ==========================================
  // TOPIC 5: HASH TABLE OPERATIONS (hash-table-ds)
  // ==========================================

  // --- Hash Table Operations: Easy ---
  {
    id: 'q-hash-table-ds-easy-01',
    algoId: 'hash-table-ds',
    tier: 'easy',
    concept: 'Key-to-Index Hash Mapping',
    prompt: 'What is the primary role of a hash function in a Hash Table data structure?',
    options: [
      {
        id: 'opt-a',
        label: 'To transform an arbitrary key (such as a string or number) into an integer hash value that maps to a valid bucket index within the table array.',
        explanation: 'Correct! The hash function computes an integer from the key, which is reduced modulo array capacity to locate the bucket.',
      },
      {
        id: 'opt-b',
        label: 'To sort all keys in strictly ascending alphabetical order.',
        explanation: 'Incorrect. Hash tables do not sort keys; they map keys to discrete bucket indices.',
      },
      {
        id: 'opt-c',
        label: 'To compress the entire table into a single byte of memory.',
        explanation: 'Incorrect. A hash function generates an index, not file compression.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'A hash table maps associative keys to values. The hash function h(k) converts a key k into an integer hash code, and the table index is calculated via `index = h(k) % table_size`. This allows direct array access by key.',
  },
  {
    id: 'q-hash-table-ds-easy-02',
    algoId: 'hash-table-ds',
    tier: 'easy',
    concept: 'Average-Case O(1) Complexity',
    prompt: 'Under uniform hashing assumptions, what is the average-case time complexity of lookup, insert, and delete in a Hash Table?',
    options: [
      {
        id: 'opt-a',
        label: 'O(1) average time for lookup, insert, and delete.',
        explanation: 'Correct! Under uniform distribution, keys disperse evenly across buckets, achieving constant O(1) average time.',
      },
      {
        id: 'opt-b',
        label: 'O(log n) average time for lookup, insert, and delete.',
        explanation: 'Incorrect. O(log n) is the complexity of balanced Binary Search Trees, not hash tables.',
      },
      {
        id: 'opt-c',
        label: 'O(n) average time for all operations.',
        explanation: 'Incorrect. O(n) is the worst-case degradation when all keys collide, not the average case.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Under the Simple Uniform Hashing Assumption (SUHA), every key is equally likely to hash into any of the m slots. When the load factor alpha = n/m is kept small, the expected number of elements per bucket is O(1), yielding O(1) average time for insertions, lookups, and deletions.',
  },
  {
    id: 'q-hash-table-ds-easy-03',
    algoId: 'hash-table-ds',
    tier: 'easy',
    concept: 'Hash Collision Definition',
    prompt: 'What constitutes a "hash collision" in a Hash Table?',
    options: [
      {
        id: 'opt-a',
        label: 'When two distinct keys produce the identical bucket index after hash computation and modulo reduction.',
        explanation: 'Correct! When h(key1) % size == h(key2) % size for key1 != key2, a collision occurs.',
      },
      {
        id: 'opt-b',
        label: 'When the hash table runs out of physical RAM and crashes the computer.',
        explanation: 'Incorrect. Out of memory is a system error, not a hash collision.',
      },
      {
        id: 'opt-c',
        label: 'When a key and its associated value are identical.',
        explanation: 'Incorrect. Key and value equality is completely valid and does not cause a collision.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'By the Pigeonhole Principle, because the universe of possible keys is much larger than the finite number of buckets in the hash table, collisions are inevitable: two distinct keys k1 != k2 will map to the same bucket index. Hash tables use collision resolution strategies to handle this.',
  },

  // --- Hash Table Operations: Medium ---
  {
    id: 'q-hash-table-ds-med-01',
    algoId: 'hash-table-ds',
    tier: 'medium',
    concept: 'Separate Chaining vs Open Addressing',
    prompt: 'How do Separate Chaining and Open Addressing fundamentally differ in how they resolve hash collisions?',
    options: [
      {
        id: 'opt-a',
        label: 'Separate Chaining maintains an auxiliary data structure (like a linked list) at each bucket for colliding keys; Open Addressing stores all keys directly in the table array and probes alternative empty slots.',
        explanation: 'Correct! Chaining stores multiple items per bucket via lists; open addressing keeps all items inside the array using probe sequences.',
      },
      {
        id: 'opt-b',
        label: 'Separate Chaining overwrites the old key with the new key; Open Addressing drops the new key.',
        explanation: 'Incorrect. Collision resolution preserves both keys without discarding data.',
      },
      {
        id: 'opt-c',
        label: 'Separate Chaining only works with integers; Open Addressing only works with strings.',
        explanation: 'Incorrect. Both collision resolution strategies support arbitrary data types.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Separate Chaining places colliding elements in a secondary collection (e.g. linked list or red-black tree) anchored at that bucket. Open Addressing stores all elements directly within the primary array; when a collision occurs, it systematically probes alternative slots (linear, quadratic, or double hashing) until an empty cell is found.',
  },
  {
    id: 'q-hash-table-ds-med-02',
    algoId: 'hash-table-ds',
    tier: 'medium',
    concept: 'Linear Probing Primary Clustering',
    prompt: 'In Open Addressing with Linear Probing (probe index = (hash + i) % size), what is "primary clustering" and why does it degrade performance?',
    options: [
      {
        id: 'opt-a',
        label: 'Long contiguous runs of occupied slots form in the array; any key hashing anywhere into the cluster must traverse the entire cluster, increasing search times significantly.',
        explanation: 'Correct! Contiguous occupied slots grow longer as new keys land within or adjacent to them, leading to severe probe sequence degradation.',
      },
      {
        id: 'opt-b',
        label: 'Primary clustering refers to the CPU cache overheating during hash lookups.',
        explanation: 'Incorrect. Primary clustering is an algorithmic clustering phenomenon in the table array.',
      },
      {
        id: 'opt-c',
        label: 'It causes the table to permanently lock write access to all buckets.',
        explanation: 'Incorrect. Primary clustering slows down lookups and inserts, but does not lock the table.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'With linear probing, once a cluster of adjacent occupied slots forms, any key that hashes to any slot in that cluster (or the slot immediately following it) increases the cluster size. This creates a positive feedback loop where larger clusters grow faster, causing lookup and insertion times to approach O(n).',
  },
  {
    id: 'q-hash-table-ds-med-03',
    algoId: 'hash-table-ds',
    tier: 'medium',
    concept: 'Load Factor & Rehashing',
    prompt: 'What is the Load Factor (alpha = n / m) of a hash table with n elements and m buckets, and why is rehashing triggered when alpha exceeds a threshold (e.g. 0.75)?',
    options: [
      {
        id: 'opt-a',
        label: 'alpha measures average bucket occupancy; when alpha exceeds the threshold, collisions multiply and probe chains lengthen, so the table allocates a larger array (often 2m) and re-hashes all keys to restore O(1) performance.',
        explanation: 'Correct! As the table fills, collisions increase; resizing and reinserting keys restores low bucket occupancy and O(1) performance.',
      },
      {
        id: 'opt-b',
        label: 'alpha measures the byte size of each key; when keys exceed 0.75 bytes, the table truncates them.',
        explanation: 'Incorrect. Load factor is the ratio of stored elements n to bucket count m.',
      },
      {
        id: 'opt-c',
        label: 'Rehashing is triggered to delete all duplicate keys automatically.',
        explanation: 'Incorrect. Rehashing redistributes valid entries across a larger array to maintain O(1) performance.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The load factor alpha = n / m represents table fullness. If alpha becomes too large (e.g. > 0.75 in open addressing), empty slots become scarce and collision resolution sequences grow excessively long. To maintain O(1) expected time, the table allocates a larger array (typically 2m) and recomputes bucket indices for all existing keys.',
  },

  // --- Hash Table Operations: Hard ---
  {
    id: 'q-hash-table-ds-hard-01',
    algoId: 'hash-table-ds',
    tier: 'hard',
    concept: 'Worst-Case O(n) Degradation & Hash Flooding',
    prompt: 'Under what scenario does a Hash Table degrade to its theoretical worst-case time complexity of O(n) for lookups and insertions?',
    options: [
      {
        id: 'opt-a',
        label: 'When an adversarial input or pathological hash function maps all n keys to the identical bucket index, degenerating the table into a single linear linked list or probe chain of length n.',
        explanation: 'Correct! If every key hashes to the same slot, searching or inserting requires traversing all n keys, taking O(n) time.',
      },
      {
        id: 'opt-b',
        label: 'When the hash table is accessed concurrently by two threads.',
        explanation: 'Incorrect. Concurrency issues cause race conditions, not algorithmic asymptotic degradation.',
      },
      {
        id: 'opt-c',
        label: 'When all stored keys are even positive integers.',
        explanation: 'Incorrect. Even integers hash evenly under standard multiplicative or universal hash functions.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'If all keys produce the same hash code (e.g. via a poorly designed hash function or a deliberate algorithmic complexity attack / "hash flooding"), all n elements fall into a single bucket. With separate chaining, this forms a linked list of length n, degrading every operation to O(n). Universal hashing and keyed hash algorithms (like SipHash) defend against this.',
  },
  {
    id: 'q-hash-table-ds-hard-02',
    algoId: 'hash-table-ds',
    tier: 'hard',
    concept: 'Tombstones (Soft Deletes) in Open Addressing',
    prompt: 'In an Open Addressing hash table, why cannot a deleted slot simply be marked as empty (NULL/empty)?',
    options: [
      {
        id: 'opt-a',
        label: 'Lookups stop probing upon encountering an empty slot; marking a deleted slot as empty would prematurely terminate probe searches for other keys that were inserted past that slot, so deleted slots must instead be marked with a tombstone (soft delete) marker.',
        explanation: 'Correct! An empty slot signals the end of a probe sequence. Deleted slots must be marked with a "tombstone" (dummy marker) so future searches continue probing.',
      },
      {
        id: 'opt-b',
        label: 'Because the C language prevents assigning NULL to an array element after initialization.',
        explanation: 'Incorrect. C allows assigning NULL to pointers freely.',
      },
      {
        id: 'opt-c',
        label: 'Because marking a slot empty causes the CPU memory controller to deallocate the entire table array.',
        explanation: 'Incorrect. Deallocation requires explicit free() calls on the table pointer.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In open addressing, a search probes until it finds the key or encounters an empty slot (confirming the key is absent). If key B collided with key A and was placed after A, deleting A by setting its slot to EMPTY would cause a subsequent search for B to halt at A\'s former slot and falsely conclude B does not exist. Using a "tombstone" / "deleted" marker allows lookups to continue past it while allowing new inserts to reuse the slot.',
  },
  {
    id: 'q-hash-table-ds-hard-03',
    algoId: 'hash-table-ds',
    tier: 'hard',
    concept: 'Key Equality vs Hash Code Consistency',
    prompt: 'What fundamental contract must hold between the hash function and key equality comparison in a correct hash table implementation?',
    options: [
      {
        id: 'opt-a',
        label: 'If two keys are equal according to the equality predicate (k1 == k2), their hash codes MUST be identical (h(k1) == h(k2)); however, equal hash codes do not imply equal keys.',
        explanation: 'Correct! The hash contract mandates that equal keys yield equal hash codes. Two different keys may produce the same hash code (a collision).',
      },
      {
        id: 'opt-b',
        label: 'If two keys have equal hash codes, their keys must be identical; unequal keys must have unequal hash codes.',
        explanation: 'Incorrect. This describes a perfect hash function, which is not required for general hash tables where collisions can occur.',
      },
      {
        id: 'opt-c',
        label: 'The hash code must equal the memory address of the key variable.',
        explanation: 'Incorrect. Identity hashing by address fails for value-based keys (such as two distinct strings with identical contents).',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The essential hash table invariant states: `k1 == k2 ==> h(k1) == h(k2)`. If equal keys could produce different hash codes, identical keys would map to different buckets, making lookups unable to find previously inserted keys. The converse does not hold: `h(k1) == h(k2)` does NOT imply `k1 == k2` because collisions are allowed and expected.',
  },

  // ==========================================
  // TOPIC 6: HEAP OPERATIONS (heap-ds)
  // ==========================================

  // --- Heap Operations: Easy ---
  {
    id: 'q-heap-ds-easy-01',
    algoId: 'heap-ds',
    tier: 'easy',
    concept: 'Min-Heap vs Max-Heap Invariants',
    prompt: 'What structural invariant distinguishes a Min-Heap from a Max-Heap?',
    options: [
      {
        id: 'opt-a',
        label: 'In a Min-Heap, every parent node is less than or equal to its children (root is the minimum); in a Max-Heap, every parent node is greater than or equal to its children (root is the maximum).',
        explanation: 'Correct! The heap property dictates that parent nodes dominate child nodes (<= for min-heap, >= for max-heap).',
      },
      {
        id: 'opt-b',
        label: 'In a Min-Heap, all left children are smaller than right children; in a Max-Heap, right children are smaller.',
        explanation: 'Incorrect. Heaps impose no ordering relationship between sibling nodes.',
      },
      {
        id: 'opt-c',
        label: 'A Min-Heap stores negative numbers while a Max-Heap stores positive numbers.',
        explanation: 'Incorrect. Value signs do not define heap structural invariants.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The heap property is an ordering invariant between parents and children: for every node i, `val(parent) <= val(i)` in a min-heap, and `val(parent) >= val(i)` in a max-heap. Unlike a Binary Search Tree, there is no ordered relationship between left and right sibling nodes.',
  },
  {
    id: 'q-heap-ds-easy-02',
    algoId: 'heap-ds',
    tier: 'easy',
    concept: 'Array Representation Formulas',
    prompt: 'When a complete binary heap is stored in a 0-indexed array, what formulas locate the parent and children of node i?',
    options: [
      {
        id: 'opt-a',
        label: 'Left child = 2 * i + 1, Right child = 2 * i + 2, and Parent = floor((i - 1) / 2).',
        explanation: 'Correct! In a 0-indexed complete binary tree packed in an array, these formulas navigate parent and children directly in O(1) time without pointers.',
      },
      {
        id: 'opt-b',
        label: 'Left child = i * 2, Right child = i * 2 + 1, Parent = i / 2.',
        explanation: 'Incorrect. These formulas apply to 1-indexed heaps, not 0-indexed arrays.',
      },
      {
        id: 'opt-c',
        label: 'Left child = i + 1, Right child = i + 2, Parent = i - 1.',
        explanation: 'Incorrect. Tree branching is multiplicative (factor of 2), not linear.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'A complete binary tree has no gaps, allowing it to be stored contiguously in an array without node pointers. In 0-based indexing: left child is at `2i + 1`, right child is at `2i + 2`, and parent is at `(i - 1) / 2` (using integer truncation).',
  },
  {
    id: 'q-heap-ds-easy-03',
    algoId: 'heap-ds',
    tier: 'easy',
    concept: 'Peek Operation Complexity',
    prompt: 'What is the time complexity to inspect the minimum element in a Min-Heap (or maximum in a Max-Heap) without removing it?',
    options: [
      {
        id: 'opt-a',
        label: 'O(1), because the extreme element always resides at the root of the heap (index 0).',
        explanation: 'Correct! By the heap invariant, the root arr[0] always holds the minimum/maximum element, enabling instant O(1) peek.',
      },
      {
        id: 'opt-b',
        label: 'O(log n), because inspecting the root requires sifting it down to a leaf.',
        explanation: 'Incorrect. Peeking only reads arr[0] without modifying the heap.',
      },
      {
        id: 'opt-c',
        label: 'O(n), because the entire array must be scanned to verify no smaller element exists.',
        explanation: 'Incorrect. The heap property guarantees the minimum is at root 0.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In any valid heap, the root node (`arr[0]`) holds the global extremum (minimum for min-heap, maximum for max-heap). Peeking requires only returning `arr[0]`, executing in constant O(1) time with zero comparisons or tree traversals.',
  },

  // --- Heap Operations: Medium ---
  {
    id: 'q-heap-ds-med-01',
    algoId: 'heap-ds',
    tier: 'medium',
    concept: 'Insert & Sift-Up Operation',
    prompt: 'How is a new element inserted into a binary heap, and what is the time complexity of this operation?',
    options: [
      {
        id: 'opt-a',
        label: 'Append the new element to the end of the array (maintaining complete tree shape) and sift it upward along its parent path until the heap property is restored; takes O(log n) time.',
        explanation: 'Correct! Appending preserves tree shape in O(1); bubbling up along tree height h = log2(n) takes O(log n) time.',
      },
      {
        id: 'opt-b',
        label: 'Insert the element directly at root arr[0] and push all existing elements down by one index; takes O(n) time.',
        explanation: 'Incorrect. Inserting at the root and shifting violates shape invariants.',
      },
      {
        id: 'opt-c',
        label: 'Binary search the array to find its sorted position and insert it; takes O(1) time.',
        explanation: 'Incorrect. Heaps are not fully sorted, and array insertion takes O(n) shifts.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'To maintain the complete binary tree shape invariant, the new element is appended at the first open leaf position (index n). If it violates the heap property with its parent, it is repeatedly swapped with its parent (`sift-up` / `bubble-up`). Since tree height is floor(log2 n), insertion takes at most O(log n) swaps.',
  },
  {
    id: 'q-heap-ds-med-02',
    algoId: 'heap-ds',
    tier: 'medium',
    concept: 'Extract-Min/Max & Sift-Down Operation',
    prompt: 'What sequence of operations occurs during extract-min (or extract-max) in a binary heap, and what is its time complexity?',
    options: [
      {
        id: 'opt-a',
        label: 'Save root arr[0], move the last leaf element to root arr[0], decrement heap size, and sift the new root downward (heapify) by repeatedly swapping with its smaller/larger child; takes O(log n) time.',
        explanation: 'Correct! Replacing the root with the last leaf preserves tree shape in O(1); sifting down restores the heap property in O(log n) time.',
      },
      {
        id: 'opt-b',
        label: 'Delete arr[0] and shift all remaining array elements leftward by 1 position; takes O(n) time.',
        explanation: 'Incorrect. Shifting elements breaks parent-child tree indexing.',
      },
      {
        id: 'opt-c',
        label: 'Swap root arr[0] with its left child and terminate immediately; takes O(1) time.',
        explanation: 'Incorrect. One swap does not restore the heap property down the rest of the tree.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Extracting the root leaves an empty slot at index 0. To keep the tree complete, the last element at index `size - 1` is moved to the root. Then `sift-down` (`heapify`) compares the node with its children, swapping with the smaller child (in a min-heap) until the heap property is satisfied. Because tree depth is log2(n), this takes O(log n) time.',
  },
  {
    id: 'q-heap-ds-med-03',
    algoId: 'heap-ds',
    tier: 'medium',
    concept: 'Heap vs BST vs Sorted Array Distinctions',
    prompt: 'How does a Binary Heap differ from a Binary Search Tree (BST) and a fully sorted array?',
    options: [
      {
        id: 'opt-a',
        label: 'A Heap only guarantees parent-child ordering (not sorted order between siblings or across levels); searching for an arbitrary key in a heap takes O(n) time, whereas a balanced BST searches in O(log n).',
        explanation: 'Correct! Heaps are partially ordered priority structures, not search trees; finding an arbitrary element requires an O(n) scan.',
      },
      {
        id: 'opt-b',
        label: 'A Heap is always completely sorted in ascending order from index 0 to n - 1.',
        explanation: 'Incorrect. Only the root is guaranteed extreme; remaining elements are only partially ordered.',
      },
      {
        id: 'opt-c',
        label: 'A BST can only store integers, while a Heap can only store floating-point numbers.',
        explanation: 'Incorrect. Both structures support arbitrary comparable data types.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'A heap is a weakly ordered data structure designed for priority retrieval. The heap property only asserts that parents dominate children. There is no relationship between sibling nodes or across different branches. Consequently, an in-order traversal does not produce sorted data, and searching for an arbitrary non-root element requires a linear O(n) search.',
  },

  // --- Heap Operations: Hard ---
  {
    id: 'q-heap-ds-hard-01',
    algoId: 'heap-ds',
    tier: 'hard',
    concept: 'Linear Time Build-Heap vs Repeated Insertion',
    prompt: 'Why does building a binary heap from an arbitrary array of size n via bottom-up heapify take O(n) time, whereas repeatedly calling insert n times takes O(n log n) time?',
    options: [
      {
        id: 'opt-a',
        label: 'Bottom-up heapify operates downward on nodes from height 0 to log n; because the vast majority of nodes reside near the leaves (heights 0 and 1), the sum of node heights converges to O(n). In contrast, repeated insertion pushes leaves upward through height log n, taking O(n log n).',
        explanation: 'Correct! In bottom-up heapify, n/2 leaf nodes do 0 work, n/4 do 1 swap, etc. The sum sum (n/2^(h+1))*h = O(n). Repeated insertion does log n work on each of the n/2 leaf additions, taking O(n log n).',
      },
      {
        id: 'opt-b',
        label: 'Because bottom-up heapify uses parallel GPU threads while insert runs on a single CPU core.',
        explanation: 'Incorrect. Both run sequentially on the CPU; the complexity difference is mathematical.',
      },
      {
        id: 'opt-c',
        label: 'Because repeated insertion allocates dynamic heap memory for every single node.',
        explanation: 'Incorrect. Array heaps do not allocate dynamic nodes on insert.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In a complete binary tree of size n, half the nodes are leaves (height 0), 1/4 have height 1, etc. Bottom-up build-heap calls `heapify` on nodes of height h, performing work proportional to node height: Work = sum_{h=0}^{log n} (n / 2^{h+1}) * O(h) = O(n * sum h/2^h) = O(n). Repeated insertion pushes each element upward from the bottom, where half the elements may traverse all log n levels to the root, taking Theta(n log n).',
  },
  {
    id: 'q-heap-ds-hard-02',
    algoId: 'heap-ds',
    tier: 'hard',
    concept: 'Floyd\'s Sift-Down Child Comparison Optimization',
    codeContext: {
      language: 'c',
      code: 'void heapify(int arr[], int n, int i) {\n    int largest = i;\n    int left = 2 * i + 1;\n    int right = 2 * i + 2;\n    if (left < n && arr[left] > arr[largest]) largest = left;\n    if (right < n && arr[right] > arr[largest]) largest = right;\n    if (largest != i) {\n        int temp = arr[i]; arr[i] = arr[largest]; arr[largest] = temp;\n        heapify(arr, n, largest);\n    }\n}',
    },
    prompt: 'In the heapify implementation above, why does comparing left < n and right < n before evaluating arr[left] and arr[right] guarantee memory safety in C?',
    options: [
      {
        id: 'opt-a',
        label: 'In C, logical AND (&&) short-circuits left-to-right; if left or right exceeds the active heap boundary n, the array index dereference is skipped, preventing an out-of-bounds read.',
        explanation: 'Correct! Complete binary tree leaf nodes have no children; checking `left < n` first short-circuits before `arr[left]` is accessed.',
      },
      {
        id: 'opt-b',
        label: 'Because C compilers automatically allocate extra buffer padding at index 2*i + 1.',
        explanation: 'Incorrect. Compilers do not add buffer padding to prevent out-of-bounds indexing.',
      },
      {
        id: 'opt-c',
        label: 'Because comparing indices against n prevents signed integer overflow in i.',
        explanation: 'Incorrect. The guard protects array bounds, not integer overflow in variable i.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'For any node with index i >= n/2, both left and right children lie at or beyond index n. By C99 §6.5.13, `&&` evaluates left-to-right with short-circuiting: if `left < n` is false, `arr[left] > arr[largest]` is never evaluated. Without this guard, accessing `arr[left]` would read unallocated memory, invoking undefined behavior.',
  },
  {
    id: 'q-heap-ds-hard-03',
    algoId: 'heap-ds',
    tier: 'hard',
    concept: 'K-th Largest Element via Min-Heap of Size K',
    prompt: 'How does maintaining a Min-Heap of fixed size k efficiently find the k-th largest element across an incoming data stream of n elements?',
    options: [
      {
        id: 'opt-a',
        label: 'Keep a min-heap of size k storing the top k largest elements seen so far; for each incoming element x, if x > heap.peek(), extract the min and insert x. At any time, heap.peek() is the k-th largest element, requiring O(n log k) time and O(k) space.',
        explanation: 'Correct! The min-heap retains the k largest values; its root is the smallest of those k, which is exactly the k-th largest element overall.',
      },
      {
        id: 'opt-b',
        label: 'Insert all n elements into a max-heap of size n and extract the root k times, taking O(k log n) time and O(n) space.',
        explanation: 'Incorrect. This requires storing all n elements, which is infeasible for streaming data and uses O(n) memory.',
      },
      {
        id: 'opt-c',
        label: 'Sort the entire stream on every incoming element using quicksort.',
        explanation: 'Incorrect. Re-sorting on every element takes O(n² log n) time.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'A min-heap of capacity k acts as a dynamic filter for the top k largest elements. The root of the min-heap holds the smallest among the top k values (i.e. the k-th largest). If a new value x is larger than `minHeap.peek()`, the old minimum is removed and x is inserted in O(log k) time. This processes n elements in O(n log k) time using only O(k) auxiliary memory.',
  },

  // ==========================================
  // TOPIC 7: TRIE OPERATIONS (trie-ds)
  // ==========================================

  // --- Trie Operations: Easy ---
  {
    id: 'q-trie-ds-easy-01',
    algoId: 'trie-ds',
    tier: 'easy',
    concept: 'Prefix Tree Node & Edge Organization',
    prompt: 'What structural property uniquely defines a Trie (Prefix Tree) data structure?',
    options: [
      {
        id: 'opt-a',
        label: 'It is a tree where edges (or child links) represent individual characters, allowing words that share common prefixes to share identical ancestor paths from the root.',
        explanation: 'Correct! A trie reuses common prefix nodes; words like "cat" and "car" share the path root -> \'c\' -> \'a\'.',
      },
      {
        id: 'opt-b',
        label: 'It is a binary search tree where each node stores two complete sentences.',
        explanation: 'Incorrect. A trie is an m-ary tree branching on characters, not a binary tree storing sentences.',
      },
      {
        id: 'opt-c',
        label: 'It is a contiguous hash table where all keys are hashed using MD5.',
        explanation: 'Incorrect. A trie is a hierarchical tree structure, not a flat hash table.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'A trie (derived from re-trie-val) is an ordered tree data structure. Unlike trees where nodes store whole keys, a node\'s position in the trie defines the key with which it is associated. All descendants of a node share a common string prefix associated with that node.',
  },
  {
    id: 'q-trie-ds-easy-02',
    algoId: 'trie-ds',
    tier: 'easy',
    concept: 'Key-Length Lookup Complexity O(L)',
    prompt: 'What is the time complexity to search for a word of length L in a Trie containing N total words?',
    options: [
      {
        id: 'opt-a',
        label: 'O(L), strictly proportional to the length of the query key and completely independent of the total number of words N stored in the trie.',
        explanation: 'Correct! Searching steps down L character edges, taking O(L) time regardless of whether the trie contains 10 or 10,000,000 words.',
      },
      {
        id: 'opt-b',
        label: 'O(N * L), because every word in the trie must be scanned.',
        explanation: 'Incorrect. The trie branches on characters; only one path of length L is traversed.',
      },
      {
        id: 'opt-c',
        label: 'O(log N), matching standard binary search trees.',
        explanation: 'Incorrect. Trie complexity depends on key length L, not total word count N.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'To search for a word of length L, the algorithm traverses L child pointers from the root. Each character step takes O(1) lookup in the node\'s child array. Thus, search time is Theta(L), independent of the dictionary size N. This makes tries exceptionally fast for large dictionaries.',
  },
  {
    id: 'q-trie-ds-easy-03',
    algoId: 'trie-ds',
    tier: 'easy',
    concept: 'Terminal / End-of-Word Boolean Flag',
    prompt: 'Why must each Trie node maintain an isEndOfWord (or isTerminal) boolean flag?',
    options: [
      {
        id: 'opt-a',
        label: 'To provide an isEndOfWord terminal flag that distinguishes between a complete word and a prefix that only exists because it is part of a longer word (for example, distinguishing "app" from "apple").',
        explanation: 'Correct! When inserting "apple", nodes for \'a\', \'p\', \'p\' are created. Setting isEndOfWord=true at the second \'p\' registers "app" as an independent word.',
      },
      {
        id: 'opt-b',
        label: 'To indicate whether the node contains an even or odd character.',
        explanation: 'Incorrect. Character parity is irrelevant to dictionary storage.',
      },
      {
        id: 'opt-c',
        label: 'To lock the node against future insertions.',
        explanation: 'Incorrect. Other words sharing the prefix can still branch from or pass through terminal nodes.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'If the trie contains "apple", the path root -> a -> p -> p -> l -> e exists. Without an `isEndOfWord` flag, an inquiry for "app" would find a valid node path and could not determine whether "app" was deliberately inserted as a complete word or is merely an incidental prefix of "apple".',
  },

  // --- Trie Operations: Medium ---
  {
    id: 'q-trie-ds-med-01',
    algoId: 'trie-ds',
    tier: 'medium',
    concept: 'Prefix Search (startsWith) Mechanics',
    prompt: 'How does a prefix search (startsWith(prefix)) differ algorithmically from a full word search (search(word)) in a Trie?',
    options: [
      {
        id: 'opt-a',
        label: 'startsWith only verifies that the path of character edges exists down to the end of the prefix, without requiring the final node to have isEndOfWord set to true.',
        explanation: 'Correct! Prefix search succeeds if the traversal path completes; exact word search additionally requires `curr->isEndOfWord == true`.',
      },
      {
        id: 'opt-b',
        label: 'startsWith searches from the leaf nodes upward to the root.',
        explanation: 'Incorrect. Both searches traverse downward from the root.',
      },
      {
        id: 'opt-c',
        label: 'startsWith requires sorting all words in the trie alphabetically before searching.',
        explanation: 'Incorrect. The trie structure inherently represents prefixes without sorting passes.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'For both operations, the algorithm steps along child pointers matching each character of the query. If any pointer is NULL, both return false. If all characters are traversed: `startsWith` returns true immediately, while `search` returns `curr->isEndOfWord`.',
  },
  {
    id: 'q-trie-ds-med-02',
    algoId: 'trie-ds',
    tier: 'medium',
    concept: 'Fixed Alphabet Array Child Storage',
    codeContext: {
      language: 'c',
      code: 'struct TrieNode {\n    struct TrieNode *children[26];\n    bool isEndOfWord;\n};',
    },
    prompt: 'In the C TrieNode definition above for lowercase English letters (\'a\'–\'z\'), how is the child index determined, and what is the trade-off of using a fixed array of size 26?',
    options: [
      {
        id: 'opt-a',
        label: 'Index is calculated as char - \'a\' in O(1) time; the trade-off is high memory consumption because every node allocates 26 pointers (208 bytes on 64-bit systems) even if it only has 1 child.',
        explanation: 'Correct! Direct indexing `c - \'a\'` is instantaneous O(1), but allocating 26 pointers per node leads to significant memory overhead when branching is sparse.',
      },
      {
        id: 'opt-b',
        label: 'Index is calculated using a cryptographic hash; the trade-off is O(log n) lookup time.',
        explanation: 'Incorrect. Array lookups use simple character subtraction (`c - \'a\'`), not cryptographic hashes.',
      },
      {
        id: 'opt-c',
        label: 'Index is calculated by string length; the trade-off is that words longer than 26 letters cannot be stored.',
        explanation: 'Incorrect. The array represents branching on 26 possible alphabet characters, not word length.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Direct indexing `children[c - \'a\']` yields immediate O(1) child transitions without searching. However, in sparse tries where many nodes have only 1 or 2 children, allocating 26 pointers (26 * 8 = 208 bytes on 64-bit systems) per node leaves most pointers NULL, resulting in substantial memory overhead.',
  },
  {
    id: 'q-trie-ds-med-03',
    algoId: 'trie-ds',
    tier: 'medium',
    concept: 'Word Insertion Traversal & Node Creation',
    prompt: 'When inserting a word of length L into an existing Trie, what exact procedure is executed for each character?',
    options: [
      {
        id: 'opt-a',
        label: 'For each character, check if the corresponding child pointer exists; if NULL, allocate a new TrieNode and link it; then advance curr to that child; after the last character, set curr->isEndOfWord = true.',
        explanation: 'Correct! Inserting creates only the missing prefix nodes along the path and marks the final node terminal.',
      },
      {
        id: 'opt-b',
        label: 'Allocate L brand-new nodes unconditionally, discarding any existing shared prefix nodes.',
        explanation: 'Incorrect. Discarding shared prefix nodes destroys the prefix sharing property of the trie.',
      },
      {
        id: 'opt-c',
        label: 'Insert the word into a linked list at the root without creating child nodes.',
        explanation: 'Incorrect. A trie branches by character edges, not linked lists at the root.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Insertion walks down the trie character by character. For each character `c`, if `curr->children[c - \'a\'] == NULL`, a fresh `TrieNode` is allocated and assigned to that pointer. Then `curr` advances. Once all L characters are placed, `curr->isEndOfWord` is set to `true`. Existing prefix nodes are reused, conserving storage.',
  },

  // --- Trie Operations: Hard ---
  {
    id: 'q-trie-ds-hard-01',
    algoId: 'trie-ds',
    tier: 'hard',
    concept: 'Sparse Alphabet Memory Bloat vs Dynamic Maps',
    prompt: 'Why does a standard Trie with fixed child pointer arrays become prohibitively memory-inefficient for large alphabets (such as full Unicode or 256-byte ASCII), and how can node design be adapted?',
    options: [
      {
        id: 'opt-a',
        label: 'Each node allocates an array of size alphabet_size pointers (e.g. 256 * 8 = 2048 bytes for ASCII); for large alphabets, nodes are mostly empty NULL pointers. Replacing the fixed array with a dynamic hash map or sorted linked list per node saves memory at the cost of slight lookup overhead.',
        explanation: 'Correct! Sparse nodes with 256 or 65536 pointers waste immense memory. Using a hash map or balanced tree per node stores only active character branches.',
      },
      {
        id: 'opt-b',
        label: 'Because Unicode characters cannot be converted into integer indices in C.',
        explanation: 'Incorrect. Unicode code points are standard 32-bit integers.',
      },
      {
        id: 'opt-c',
        label: 'Because tries cannot store words longer than the alphabet size.',
        explanation: 'Incorrect. Word length is independent of alphabet size.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'With an alphabet size sigma (e.g. 256 for extended ASCII or 65,536 for basic Unicode), a fixed array requires sigma * sizeof(pointer) bytes per node. If a trie has 100,000 nodes, 256 pointers/node consumes ~200 MB, with >95% of pointers being NULL. Replacing fixed arrays with hash maps, ternary search trees (TST), or compact adaptive arrays dramatically reduces memory footprint.',
  },
  {
    id: 'q-trie-ds-hard-02',
    algoId: 'trie-ds',
    tier: 'hard',
    concept: 'Compressed Trie (Radix Tree / PATRICIA)',
    prompt: 'How does a Compressed Trie (Radix Tree or PATRICIA Trie) optimize both memory usage and traversal depth compared to a standard Trie?',
    options: [
      {
        id: 'opt-a',
        label: 'It collapses non-branching linear chains of single-child nodes into single edges containing multi-character substring labels (e.g. compressing \'t\' -> \'e\' -> \'s\' -> \'t\' into a single edge "test").',
        explanation: 'Correct! Compressing single-child chains reduces node count to at most 2k - 1 (for k keys) and eliminates redundant pointer hops.',
      },
      {
        id: 'opt-b',
        label: 'It converts all strings into 64-bit integer hashes and stores them in a binary heap.',
        explanation: 'Incorrect. Radix trees preserve string prefixes directly via edge labels, not hashes.',
      },
      {
        id: 'opt-c',
        label: 'It deletes all words that share prefixes with other words.',
        explanation: 'Incorrect. No words are deleted; only linear chains of single-child nodes are merged.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In a standard trie, long unique suffixes create long chains of nodes where each node has only one child. A Radix Tree (compact trie) merges contiguous non-branching nodes into single edges labeled with substrings (e.g. "romane", "romanus" share edge "roman" then branch to "e" and "us"). This bounds total nodes to at most 2k - 1 (where k is the number of stored keys) and reduces tree height.',
  },
  {
    id: 'q-trie-ds-hard-03',
    algoId: 'trie-ds',
    tier: 'hard',
    concept: 'Recursive Backtracking Deletion & Memory Reclamation',
    prompt: 'When deleting a word from a Trie in C, under what precise conditions can a child node be safely freed from heap memory during recursive post-order unwinding?',
    options: [
      {
        id: 'opt-a',
        label: 'A node can only be freed if its isEndOfWord flag is false AND all its child pointers are NULL; if it has other active children or represents the end of another valid word, it must be preserved.',
        explanation: 'Correct! Freeing a node that has other children would orphan remaining words; freeing a node with isEndOfWord=true would delete another stored word.',
      },
      {
        id: 'opt-b',
        label: 'Every node along the deleted word\'s path is freed unconditionally back to the root.',
        explanation: 'Incorrect. Freeing shared ancestor nodes would corrupt other words sharing that prefix.',
      },
      {
        id: 'opt-c',
        label: 'Nodes can only be freed if the word contained an even number of characters.',
        explanation: 'Incorrect. Character count parity has no bearing on memory deallocation.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Trie deletion requires recursive backtracking: (1) traverse down to the word\'s terminal node and set `isEndOfWord = false`. (2) on returning up the recursion stack, a node can only be deallocated with `free()` if it has no children (`hasChildren(node) == false`) AND `node->isEndOfWord == false`. If the node serves as a prefix for other words or is terminal for a shorter word (e.g. deleting "apple" when "app" is also stored), it must not be freed.',
  },
];
