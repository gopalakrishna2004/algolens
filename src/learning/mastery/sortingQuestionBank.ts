import type { MasteryQuestion } from '../types';

/**
 * 54 Reviewed Questions for Chapter 02: Sorting.
 * - Bubble Sort (9 questions: 3 Easy, 3 Medium, 3 Hard)
 * - Selection Sort (9 questions: 3 Easy, 3 Medium, 3 Hard)
 * - Insertion Sort (9 questions: 3 Easy, 3 Medium, 3 Hard)
 * - Merge Sort (9 questions: 3 Easy, 3 Medium, 3 Hard)
 * - Quick Sort (9 questions: 3 Easy, 3 Medium, 3 Hard)
 * - Heap Sort (9 questions: 3 Easy, 3 Medium, 3 Hard)
 */
export const SORTING_QUESTION_BANK: MasteryQuestion[] = [
  // ==========================================
  // TOPIC 1: BUBBLE SORT
  // ==========================================

  // --- Bubble Sort: Easy ---
  {
    id: 'q-bubble-sort-easy-01',
    algoId: 'bubble-sort',
    tier: 'easy',
    concept: 'Adjacent Pair Comparison & Sinking',
    prompt: 'In Bubble Sort, what fundamental operation is performed on each step of the inner loop?',
    options: [
      {
        id: 'opt-a',
        label: 'Adjacent elements arr[j] and arr[j+1] are compared and swapped if arr[j] > arr[j+1], causing larger values to move rightward.',
        explanation: 'Correct! Bubble Sort operates strictly by comparing adjacent pairs and swapping them if out of order.',
      },
      {
        id: 'opt-b',
        label: 'The smallest element in the entire array is located and swapped directly with arr[0].',
        explanation: 'Incorrect. Finding the global minimum and placing it at index 0 describes Selection Sort.',
      },
      {
        id: 'opt-c',
        label: 'The array is partitioned around a chosen pivot into two disjoint subarrays.',
        explanation: 'Incorrect. Partitioning around a pivot describes Quick Sort.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Bubble Sort is defined by local adjacent comparisons. Each swap exchanges adjacent elements, causing larger elements to "bubble" toward the end of the array.',
  },
  {
    id: 'q-bubble-sort-easy-02',
    algoId: 'bubble-sort',
    tier: 'easy',
    concept: 'Outer Pass Invariant',
    prompt: 'After completing k outer passes of Bubble Sort on an array of length n, what guarantee is established about the array?',
    options: [
      {
        id: 'opt-a',
        label: 'The last k elements of the array are in their final, sorted positions and will not move again.',
        explanation: 'Correct! Each outer pass bubbles the largest remaining unsorted element to the end. After k passes, the suffix [n-k..n-1] is sorted.',
      },
      {
        id: 'opt-b',
        label: 'The first k elements of the array are guaranteed to be in their final sorted positions.',
        explanation: 'Incorrect. The sorted portion grows from right to left at the end of the array, not from the beginning.',
      },
      {
        id: 'opt-c',
        label: 'All elements with values less than k have been completely eliminated from the array.',
        explanation: 'Incorrect. Bubble Sort does not eliminate elements; it rearranges them.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Each outer loop iteration guarantees that the largest unsorted value sinks to its final resting position at the end of the array. After k passes, exactly k elements at the end are locked.',
  },
  {
    id: 'q-bubble-sort-easy-03',
    algoId: 'bubble-sort',
    tier: 'easy',
    concept: 'Worst-Case Time Complexity',
    prompt: 'What is the worst-case time complexity of standard Bubble Sort, and what input ordering triggers it?',
    options: [
      {
        id: 'opt-a',
        label: 'O(n²), triggered when the input array is sorted in reverse (descending) order.',
        explanation: 'Correct! On a reverse-sorted array, every adjacent comparison requires a swap, yielding n*(n-1)/2 operations (O(n²)).',
      },
      {
        id: 'opt-b',
        label: 'O(n log n), triggered when all elements in the array are identical.',
        explanation: 'Incorrect. Bubble Sort never exhibits O(n log n) behavior.',
      },
      {
        id: 'opt-c',
        label: 'O(n), triggered when the array elements are randomly shuffled.',
        explanation: 'Incorrect. Randomly shuffled arrays require average-case O(n²) operations.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Worst-case occurs when the array is sorted in reverse order. Every pair is inverted, requiring maximum comparisons and maximum swaps: sum_{i=1}^{n-1} i = n(n-1)/2 = O(n²).',
  },

  // --- Bubble Sort: Medium ---
  {
    id: 'q-bubble-sort-med-01',
    algoId: 'bubble-sort',
    tier: 'medium',
    concept: 'Early-Exit Optimization Invariant',
    codeContext: {
      language: 'c',
      code: 'int swapped = 0;\nfor (int j = 0; j < n - i - 1; j++) {\n    if (arr[j] > arr[j + 1]) {\n        int temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp;\n        swapped = 1;\n    }\n}\nif (!swapped) break;',
    },
    prompt: 'Why does the optimized Bubble Sort implementation shown above achieve O(n) best-case time complexity on already-sorted arrays?',
    options: [
      {
        id: 'opt-a',
        label: 'If a full pass completes with swapped == 0, no adjacent inversions exist, proving the array is already sorted and halting execution after n - 1 comparisons.',
        explanation: 'Correct! If no adjacent elements were out of order during pass 1, the entire array is sorted, allowing immediate termination in O(n) time.',
      },
      {
        id: 'opt-b',
        label: 'The compiler detects the swapped flag and replaces the nested loops with a call to qsort at runtime.',
        explanation: 'Incorrect. Compilers do not replace user algorithms with qsort calls based on flag variables.',
      },
      {
        id: 'opt-c',
        label: 'Because swapped == 0 divides the array in half on each step, reducing iterations to log2(n).',
        explanation: 'Incorrect. Bubble Sort does not divide arrays in half.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'If an entire pass completes without a single swap, every adjacent pair satisfies arr[j] <= arr[j+1]. By transitivity, the array is completely sorted, enabling an early exit after only n - 1 comparisons.',
  },
  {
    id: 'q-bubble-sort-med-02',
    algoId: 'bubble-sort',
    tier: 'medium',
    concept: 'Stability Condition',
    prompt: 'Why is standard Bubble Sort a stable sorting algorithm when using if (arr[j] > arr[j + 1])?',
    options: [
      {
        id: 'opt-a',
        label: 'Equal elements are never swapped because the strict inequality > is false when arr[j] == arr[j + 1], preserving their initial relative order.',
        explanation: 'Correct! Because swaps only trigger on strict inequality (>), identical values never pass one another.',
      },
      {
        id: 'opt-b',
        label: 'Because it operates in-place without allocating dynamic heap memory.',
        explanation: 'Incorrect. In-place operation is unrelated to stability (e.g. Heapsort is in-place but unstable).',
      },
      {
        id: 'opt-c',
        label: 'Because it only sorts integers rather than composite structs.',
        explanation: 'Incorrect. Stability is a property of the algorithm logic, not data types.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Stability means that elements with equal keys maintain their initial relative order. Using strict inequality `arr[j] > arr[j+1]` ensures that equal elements never swap. If `>=` were used, stability would be lost.',
  },
  {
    id: 'q-bubble-sort-med-03',
    algoId: 'bubble-sort',
    tier: 'medium',
    concept: 'Single Pass Operation Tracing',
    prompt: 'Given the input array [5, 1, 4, 2, 8], what is the exact state of the array after the first complete outer pass of Bubble Sort?',
    options: [
      {
        id: 'opt-a',
        label: '[1, 4, 2, 5, 8]',
        explanation: 'Correct! Trace: (5,1)->swap->[1,5,4,2,8]; (5,4)->swap->[1,4,5,2,8]; (5,2)->swap->[1,4,2,5,8]; (5,8)->no swap->[1,4,2,5,8].',
      },
      {
        id: 'opt-b',
        label: '[1, 2, 4, 5, 8]',
        explanation: 'Incorrect. This is the fully sorted array, which requires 3 passes.',
      },
      {
        id: 'opt-c',
        label: '[5, 4, 2, 1, 8]',
        explanation: 'Incorrect. 1 is swapped with 5 on the very first comparison.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Tracing pass 1: compare indices 0 & 1 (5 > 1) -> swap [1,5,4,2,8]; compare 1 & 2 (5 > 4) -> swap [1,4,5,2,8]; compare 2 & 3 (5 > 2) -> swap [1,4,2,5,8]; compare 3 & 4 (5 < 8) -> no swap [1,4,2,5,8].',
  },

  // --- Bubble Sort: Hard ---
  {
    id: 'q-bubble-sort-hard-01',
    algoId: 'bubble-sort',
    tier: 'hard',
    concept: 'Inner Loop Boundary & Out-of-Bounds Avoidance',
    prompt: 'In the inner loop for (int j = 0; j < n - i - 1; j++), why is the upper bound specifically n - i - 1 rather than n - 1?',
    options: [
      {
        id: 'opt-a',
        label: 'The last i elements are already guaranteed to be in their final positions from prior passes, and n - i - 1 ensures arr[j + 1] never accesses memory beyond index n - 1.',
        explanation: 'Correct! The last i elements are already sorted. Moreover, evaluating arr[j + 1] requires j to stop at n - i - 2 so j + 1 <= n - 1.',
      },
      {
        id: 'opt-b',
        label: 'To prevent integer overflow in the inner counter j on 32-bit CPU architectures.',
        explanation: 'Incorrect. Loop limits are determined by array bounds, not register overflow.',
      },
      {
        id: 'opt-c',
        label: 'Because C standard libraries mandate that loop bounds decrease by at least 1 per iteration.',
        explanation: 'Incorrect. The ISO C standard does not mandate decreasing loop limits.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'After i passes, the last i elements are already sorted, so checking them is redundant. Furthermore, because adjacent comparisons check arr[j] and arr[j + 1], stopping at j < n - i - 1 prevents reading past the array boundary.',
  },
  {
    id: 'q-bubble-sort-hard-02',
    algoId: 'bubble-sort',
    tier: 'hard',
    concept: 'Inversion Elimination Property',
    prompt: 'How does the number of swaps performed by Bubble Sort relate to the mathematical inversions in the input array?',
    options: [
      {
        id: 'opt-a',
        label: 'Every swap of adjacent inverted elements decreases the total number of inversions in the array by exactly 1; the total swap count equals the exact number of inversions.',
        explanation: 'Correct! Swapping adjacent elements (arr[j], arr[j+1]) resolves that single inverted pair without affecting the relative order of any other pair.',
      },
      {
        id: 'opt-b',
        label: 'Each swap eliminates 2 inversions because two array indices change values simultaneously.',
        explanation: 'Incorrect. Swapping adjacent elements affects only the relationship between those two elements.',
      },
      {
        id: 'opt-c',
        label: 'There is no correlation between array inversions and Bubble Sort swaps.',
        explanation: 'Incorrect. Bubble Sort swaps correspond directly to the inversion count.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'An inversion is a pair (p, q) where p < q and arr[p] > arr[q]. Swapping adjacent elements arr[j] and arr[j+1] where arr[j] > arr[j+1] fixes that single inverted pair while leaving all other pairs untouched, eliminating exactly 1 inversion per swap.',
  },
  {
    id: 'q-bubble-sort-hard-03',
    algoId: 'bubble-sort',
    tier: 'hard',
    concept: 'Memory Bus Write Pressure vs Selection Sort',
    prompt: 'Why does Bubble Sort typically demonstrate worse real-world hardware performance than Selection Sort on identical average-case inputs, despite both being O(n²)?',
    options: [
      {
        id: 'opt-a',
        label: 'Bubble Sort executes O(n²) memory write operations across its adjacent swaps, whereas Selection Sort performs at most O(n) total memory swaps.',
        explanation: 'Correct! Memory writes cause CPU cache line dirtying and bus traffic. Bubble Sort performs up to O(n²) writes, whereas Selection Sort performs at most n - 1 swaps (O(n) writes).',
      },
      {
        id: 'opt-b',
        label: 'Bubble Sort requires allocating dynamic stack frames on every inner comparison.',
        explanation: 'Incorrect. Bubble Sort is purely iterative and allocates no stack frames.',
      },
      {
        id: 'opt-c',
        label: 'Selection Sort uses SIMD vectorization by default, which Bubble Sort disables.',
        explanation: 'Incorrect. The algorithmic difference in write count explains the hardware performance gap.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Writing to memory is significantly more expensive than reading due to cache invalidation and store-buffer stalls. Bubble Sort performs O(n²) swaps on average, whereas Selection Sort performs at most n - 1 swaps total, making Selection Sort much lighter on memory bus bandwidth.',
  },

  // ==========================================
  // TOPIC 2: SELECTION SORT
  // ==========================================

  // --- Selection Sort: Easy ---
  {
    id: 'q-selection-sort-easy-01',
    algoId: 'selection-sort',
    tier: 'easy',
    concept: 'Minimum Element Selection',
    prompt: 'What is the core strategy of Selection Sort on each pass of its outer loop?',
    options: [
      {
        id: 'opt-a',
        label: 'It finds the smallest element in the remaining unsorted portion and swaps it with the first unsorted element, expanding the sorted prefix.',
        explanation: 'Correct! Selection Sort repeatedly identifies the minimum of [i..n-1] and exchanges it with arr[i].',
      },
      {
        id: 'opt-b',
        label: 'It compares each adjacent pair and swaps them if the left element is larger than the right element.',
        explanation: 'Incorrect. Adjacent pair comparison describes Bubble Sort.',
      },
      {
        id: 'opt-c',
        label: 'It recursively divides the array in half, sorts each half, and merges them together.',
        explanation: 'Incorrect. Halving and merging describes Merge Sort.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Selection Sort divides the array into a sorted prefix and an unsorted suffix. On each outer pass, it searches the unsorted suffix for the minimum element and swaps it into the beginning of the unsorted section.',
  },
  {
    id: 'q-selection-sort-easy-02',
    algoId: 'selection-sort',
    tier: 'easy',
    concept: 'Total Swap Bound',
    prompt: 'On an array of n elements, what is the maximum number of element swaps Selection Sort will ever perform?',
    options: [
      {
        id: 'opt-a',
        label: 'At most n - 1 swaps, because each outer loop pass performs at most one swap.',
        explanation: 'Correct! The outer loop iterates n - 1 times, performing at most 1 swap per iteration, bounding total swaps to at most n - 1.',
      },
      {
        id: 'opt-b',
        label: 'At most n(n - 1) / 2 swaps, because every comparison triggers an immediate swap.',
        explanation: 'Incorrect. Selection Sort only swaps once per outer loop pass, not on every comparison.',
      },
      {
        id: 'opt-c',
        label: 'At most log2(n) swaps, because it halves the unsorted range on each step.',
        explanation: 'Incorrect. Selection Sort is not a logarithmic divide-and-conquer algorithm.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The outer loop runs for i from 0 to n - 2. On each iteration, finding the minimum requires comparisons, but only a single swap occurs to place the minimum element at index i. Hence, total swaps <= n - 1.',
  },
  {
    id: 'q-selection-sort-easy-03',
    algoId: 'selection-sort',
    tier: 'easy',
    concept: 'Invariant Comparison Complexity',
    prompt: 'What is the time complexity of Selection Sort on an array that is already sorted in ascending order?',
    options: [
      {
        id: 'opt-a',
        label: 'O(n²), because it must still scan the entire unsorted suffix on every pass to verify the minimum element.',
        explanation: 'Correct! Selection Sort does not detect prior sortedness; it must exhaustively scan the remaining suffix on every pass.',
      },
      {
        id: 'opt-b',
        label: 'O(n), because it immediately recognizes that every element is in its correct place.',
        explanation: 'Incorrect. Standard Selection Sort has no early-exit mechanism and always performs O(n²) comparisons.',
      },
      {
        id: 'opt-c',
        label: 'O(1), because no swaps are executed on sorted data.',
        explanation: 'Incorrect. Comparisons still take O(n²) time even if swaps are skipped.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Standard Selection Sort always performs (n-1) + (n-2) + ... + 1 = n(n-1)/2 comparisons regardless of initial data arrangement, resulting in O(n²) best, average, and worst-case time complexity.',
  },

  // --- Selection Sort: Medium ---
  {
    id: 'q-selection-sort-med-01',
    algoId: 'selection-sort',
    tier: 'medium',
    concept: 'Instability of Long-Distance Swaps',
    prompt: 'Why is standard array-based Selection Sort classified as an unstable sorting algorithm?',
    options: [
      {
        id: 'opt-a',
        label: 'Long-distance swaps can jump an element over an equal element earlier in the array, disrupting their initial relative order.',
        explanation: 'Correct! For example, in [4a, 4b, 2], swapping 4a with 2 produces [2, 4b, 4a], inverting the relative order of 4a and 4b.',
      },
      {
        id: 'opt-b',
        label: 'Because it uses recursion, which can reorder identical elements across stack frames.',
        explanation: 'Incorrect. Selection Sort is iterative, not recursive.',
      },
      {
        id: 'opt-c',
        label: 'Because it modifies the original array in-place without allocating auxiliary memory.',
        explanation: 'Incorrect. In-place algorithms can be stable (e.g. Insertion Sort).',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Selection Sort swaps the minimum element with arr[i]. If an element equal to arr[i] appears between index i and minIdx, swapping arr[i] with arr[minIdx] moves arr[i] past its equal counterpart, destroying stability.',
  },
  {
    id: 'q-selection-sort-med-02',
    algoId: 'selection-sort',
    tier: 'medium',
    concept: 'Two-Pass Operation Tracing',
    prompt: 'Given the input array [29, 10, 14, 37, 13], what is the exact state of the array after the first 2 outer passes of Selection Sort?',
    options: [
      {
        id: 'opt-a',
        label: '[10, 13, 14, 37, 29]',
        explanation: 'Correct! Pass 1: min is 10 at idx 1 -> swap with 29 -> [10, 29, 14, 37, 13]. Pass 2: min of [29, 14, 37, 13] is 13 at idx 4 -> swap with 29 -> [10, 13, 14, 37, 29].',
      },
      {
        id: 'opt-b',
        label: '[10, 14, 29, 37, 13]',
        explanation: 'Incorrect. 13 is smaller than 14, so 13 is chosen in pass 2.',
      },
      {
        id: 'opt-c',
        label: '[10, 13, 29, 14, 37]',
        explanation: 'Incorrect. In pass 2, 13 is swapped with index 1 (which holds 29), placing 29 at index 4.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Pass 1 finds min 10 at index 1, swaps with index 0: [10, 29, 14, 37, 13]. Pass 2 searches indices 1..4; min is 13 at index 4, swaps with index 1: [10, 13, 14, 37, 29].',
  },
  {
    id: 'q-selection-sort-med-03',
    algoId: 'selection-sort',
    tier: 'medium',
    concept: 'Flash Memory & Write Minimization',
    prompt: 'In embedded systems with EEPROM or Flash memory where write cycles degrade physical hardware, why might Selection Sort be preferred over Bubble Sort or Insertion Sort for small arrays?',
    options: [
      {
        id: 'opt-a',
        label: 'Selection Sort guarantees a strictly linear O(n) upper bound on total memory writes, minimizing wear on write-constrained storage.',
        explanation: 'Correct! With at most n - 1 swaps (at most 2n writes), Selection Sort minimizes physical wear compared to O(n²) writes in Bubble/Insertion sort.',
      },
      {
        id: 'opt-b',
        label: 'Selection Sort writes directly to CPU registers without touching physical flash memory.',
        explanation: 'Incorrect. Arrays reside in memory, not exclusively in registers.',
      },
      {
        id: 'opt-c',
        label: 'Selection Sort compresses array data before writing it back to memory.',
        explanation: 'Incorrect. Selection Sort does not compress data.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Flash memory endurance is limited by write cycles. While Selection Sort does O(n²) comparisons (reads), it performs at most n - 1 swaps (writes), whereas Bubble and Insertion Sort can trigger up to O(n²) memory writes.',
  },

  // --- Selection Sort: Hard ---
  {
    id: 'q-selection-sort-hard-01',
    algoId: 'selection-sort',
    tier: 'hard',
    concept: 'Self-Swap Guard Optimization',
    codeContext: {
      language: 'c',
      code: 'if (minIdx != i) {\n    int temp = arr[i];\n    arr[i] = arr[minIdx];\n    arr[minIdx] = temp;\n}',
    },
    prompt: 'What specific purpose does the if (minIdx != i) guard serve in the C implementation above?',
    options: [
      {
        id: 'opt-a',
        label: 'It skips unnecessary memory read/write cycles when the minimum element is already located at index i, avoiding redundant self-assignment.',
        explanation: 'Correct! If arr[i] is already the smallest element, minIdx equals i. Guarding with minIdx != i saves 3 memory assignments.',
      },
      {
        id: 'opt-b',
        label: 'It prevents a division-by-zero exception if the array contains negative numbers.',
        explanation: 'Incorrect. Selection Sort performs no division operations.',
      },
      {
        id: 'opt-c',
        label: 'It ensures that the function returns a pointer to the newly sorted array.',
        explanation: 'Incorrect. The function returns void and modifies the array in-place.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'When minIdx == i, arr[i] is already in its correct sorted position for that pass. The check `minIdx != i` prevents redundant memory stores that overwrite memory with its existing value.',
  },
  {
    id: 'q-selection-sort-hard-02',
    algoId: 'selection-sort',
    tier: 'hard',
    concept: 'Prefix/Suffix Partition Invariant',
    prompt: 'What formal loop invariant holds at the beginning of iteration i of Selection Sort\'s outer loop?',
    options: [
      {
        id: 'opt-a',
        label: 'Subarray arr[0..i-1] contains the i smallest elements of the entire array in fully sorted order, and every element in arr[i..n-1] is greater than or equal to every element in arr[0..i-1].',
        explanation: 'Correct! This two-part invariant proves correctness: the prefix is sorted, and no element in the suffix is smaller than any element in the prefix.',
      },
      {
        id: 'opt-b',
        label: 'Subarray arr[i..n-1] is guaranteed to be completely sorted in descending order.',
        explanation: 'Incorrect. The suffix arr[i..n-1] is unsorted.',
      },
      {
        id: 'opt-c',
        label: 'The pivot element has been placed at index n/2, with smaller elements to its left.',
        explanation: 'Incorrect. Selection Sort does not use pivots or divide at index n/2.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The loop invariant of Selection Sort states: (1) arr[0..i-1] consists of the i smallest elements of the original array in sorted order; (2) every element in arr[i..n-1] is >= every element in arr[0..i-1]. When i reaches n - 1, the entire array is sorted.',
  },
  {
    id: 'q-selection-sort-hard-03',
    algoId: 'selection-sort',
    tier: 'hard',
    concept: 'Comparison Lower Bound vs Adaptivity',
    prompt: 'Why cannot Selection Sort be adapted to achieve O(n) best-case performance using a simple early-exit boolean flag like Bubble Sort?',
    options: [
      {
        id: 'opt-a',
        label: 'Because determining the minimum element of an unsorted suffix requires examining every candidate element in that suffix; no single comparison proves that an uninspected element is not smaller.',
        explanation: 'Correct! Proving that arr[i] is the smallest element in arr[i..n-1] requires inspecting all n - i elements. Skipping any element could miss a smaller value.',
      },
      {
        id: 'opt-b',
        label: 'Because C does not support boolean variables in loops with two indices.',
        explanation: 'Incorrect. C supports boolean types via <stdbool.h> or integers.',
      },
      {
        id: 'opt-c',
        label: 'Because Selection Sort must recalculate array pointers using recursive memory allocators.',
        explanation: 'Incorrect. Selection Sort is iterative and does not allocate memory.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In Bubble Sort, an early exit flag works because verifying that all adjacent pairs are sorted is equivalent to verifying global sortedness. In Selection Sort, verifying that arr[i] is the minimum of [i..n-1] requires inspecting every element in [i..n-1]; an adversary could place a smaller value at the very last index.',
  },

  // ==========================================
  // TOPIC 3: INSERTION SORT
  // ==========================================

  // --- Insertion Sort: Easy ---
  {
    id: 'q-insertion-sort-easy-01',
    algoId: 'insertion-sort',
    tier: 'easy',
    concept: 'Incremental Hand-Card Sorting',
    prompt: 'Which description best characterizes how Insertion Sort operates on an array?',
    options: [
      {
        id: 'opt-a',
        label: 'It takes each element one by one and inserts it into its proper position within the already-sorted prefix, shifting larger elements rightward.',
        explanation: 'Correct! Insertion Sort incrementally grows a sorted prefix by picking the next element (key) and inserting it into place.',
      },
      {
        id: 'opt-b',
        label: 'It finds the smallest element in the entire array and places it at index 0 on each step.',
        explanation: 'Incorrect. Finding the minimum of the entire remaining array describes Selection Sort.',
      },
      {
        id: 'opt-c',
        label: 'It recursively divides the array in half until individual elements can be merged.',
        explanation: 'Incorrect. Halving and merging describes Merge Sort.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Insertion Sort mimics how people sort playing cards: holding sorted cards in hand and inserting each new card into its correct position by sliding larger cards rightward.',
  },
  {
    id: 'q-insertion-sort-easy-02',
    algoId: 'insertion-sort',
    tier: 'easy',
    concept: 'Best-Case Linear Time',
    prompt: 'Under what input condition does Insertion Sort achieve its optimal best-case time complexity of O(n)?',
    options: [
      {
        id: 'opt-a',
        label: 'When the array is already sorted in ascending order, because each key is immediately compared once and not shifted.',
        explanation: 'Correct! If arr[j] <= key on the first comparison, the while loop exits immediately with 0 shifts, taking O(n) time.',
      },
      {
        id: 'opt-b',
        label: 'When the array is sorted in strictly descending order.',
        explanation: 'Incorrect. Descending order is the worst case, requiring maximum shifts (O(n²)).',
      },
      {
        id: 'opt-c',
        label: 'When all array elements are distinct prime numbers.',
        explanation: 'Incorrect. Numerical values do not affect comparison count; ordering does.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'When the array is already sorted, for every i from 1 to n - 1, the condition arr[i - 1] > key evaluates to false immediately. Exactly 1 comparison and 0 shifts occur per element, giving n - 1 comparisons total (O(n)).',
  },
  {
    id: 'q-insertion-sort-easy-03',
    algoId: 'insertion-sort',
    tier: 'easy',
    concept: 'Stability Preservation',
    prompt: 'Why is standard Insertion Sort a stable sorting algorithm?',
    options: [
      {
        id: 'opt-a',
        label: 'The inner condition while (j >= 0 && arr[j] > key) stops shifting as soon as it meets an element less than or equal to key, placing key after identical elements.',
        explanation: 'Correct! Because shifting stops on arr[j] <= key, equal elements are not bypassed, preserving their original order.',
      },
      {
        id: 'opt-b',
        label: 'Because it allocates a secondary hash map to remember original element indices.',
        explanation: 'Incorrect. Insertion Sort uses O(1) auxiliary memory without hash maps.',
      },
      {
        id: 'opt-c',
        label: 'Because it only performs operations on elements whose indices are even numbers.',
        explanation: 'Incorrect. Insertion Sort processes every sequential index.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The condition `arr[j] > key` strictly shifts elements larger than key. When it encounters an element equal to key, shifting halts, and key is placed at `arr[j + 1]`, maintaining the original relative order.',
  },

  // --- Insertion Sort: Medium ---
  {
    id: 'q-insertion-sort-med-01',
    algoId: 'insertion-sort',
    tier: 'medium',
    concept: 'Element Shifting vs Swapping',
    prompt: 'Why does shifting elements rightward (arr[j + 1] = arr[j]) in Insertion Sort perform fewer memory writes than repeatedly swapping adjacent pairs?',
    options: [
      {
        id: 'opt-a',
        label: 'A shift performs 1 write per displaced element plus 1 final write for key, whereas an adjacent swap requires 3 assignments (2 writes to the array).',
        explanation: 'Correct! Shifting requires k + 1 array writes for k positions, whereas k adjacent swaps require 2k array writes.',
      },
      {
        id: 'opt-b',
        label: 'Shifting causes the CPU to execute memory writes in parallel on the GPU.',
        explanation: 'Incorrect. Shifting executes sequentially on the CPU.',
      },
      {
        id: 'opt-c',
        label: 'A swap deletes elements from memory, whereas a shift copies them to registers.',
        explanation: 'Incorrect. Swapping overwrites array memory cells, not deletes them.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'A standard swap involves 3 assignments: temp = a, a = b, b = temp (2 array writes). Displacing an element by k positions via swaps takes 2k array writes. Shifting simply copies elements rightward (k writes) and writes key once into the open position (1 write), cutting writes nearly in half.',
  },
  {
    id: 'q-insertion-sort-med-02',
    algoId: 'insertion-sort',
    tier: 'medium',
    concept: 'Online Sorting Suitability',
    prompt: 'Why is Insertion Sort particularly well-suited for "online" sorting scenarios where data arrives one item at a time from a stream?',
    options: [
      {
        id: 'opt-a',
        label: 'It can immediately insert each newly arrived element into the existing sorted list in O(k) time without restarting the sort from scratch.',
        explanation: 'Correct! Since the current elements are already sorted, inserting a new element takes at most O(k) operations.',
      },
      {
        id: 'opt-b',
        label: 'It requires an active internet connection to download sorting lookup tables.',
        explanation: 'Incorrect. "Online" in algorithm design means processing inputs piece-by-piece as they arrive, not internet connectivity.',
      },
      {
        id: 'opt-c',
        label: 'It guarantees O(1) worst-case time complexity regardless of how many items have already arrived.',
        explanation: 'Incorrect. Inserting an element into k items takes O(k) in the worst case.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'An online algorithm processes its input piece-by-piece in a serial fashion. Because Insertion Sort maintains a sorted prefix at all times, a new incoming element can be inserted into the existing k elements with a single pass in O(k) time, without re-sorting previous data.',
  },
  {
    id: 'q-insertion-sort-med-03',
    algoId: 'insertion-sort',
    tier: 'medium',
    concept: 'Single Key Insertion Tracing',
    prompt: 'Given a sorted prefix [12, 25, 40, 55] and a new key element 30, what exact sequence of shifts occurs before placing 30?',
    options: [
      {
        id: 'opt-a',
        label: '55 shifts right, 40 shifts right, then 30 is placed into the slot vacated by 40, resulting in [12, 25, 30, 40, 55].',
        explanation: 'Correct! 55 > 30 shifts right; 40 > 30 shifts right; 25 <= 30 stops shifting; 30 is placed into index 2.',
      },
      {
        id: 'opt-b',
        label: '12 shifts left, 25 shifts left, and 30 is placed at index 0.',
        explanation: 'Incorrect. Elements shift rightward to make room, not leftward.',
      },
      {
        id: 'opt-c',
        label: '30 is swapped directly with 55 without moving 40.',
        explanation: 'Incorrect. 30 is smaller than 40, so 40 must also shift.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Compare 55 with 30: 55 > 30 -> 55 shifts to index 4. Compare 40 with 30: 40 > 30 -> 40 shifts to index 3. Compare 25 with 30: 25 <= 30 -> while loop terminates. 30 is placed into index 2.',
  },

  // --- Insertion Sort: Hard ---
  {
    id: 'q-insertion-sort-hard-01',
    algoId: 'insertion-sort',
    tier: 'hard',
    concept: 'C Short-Circuit Evaluation & Negative Index Guard',
    codeContext: {
      language: 'c',
      code: 'while (j >= 0 && arr[j] > key) {\n    arr[j + 1] = arr[j];\n    j = j - 1;\n}',
    },
    prompt: 'In the C while loop condition above, why is the order j >= 0 && arr[j] > key critical?',
    options: [
      {
        id: 'opt-a',
        label: 'In C, && uses short-circuit evaluation; placing j >= 0 first guarantees arr[j] is never evaluated when j is -1, preventing an out-of-bounds memory read.',
        explanation: 'Correct! If reversed, when j == -1, arr[-1] would be evaluated before checking j >= 0, causing undefined behavior.',
      },
      {
        id: 'opt-b',
        label: 'Reversing the order causes the C compiler to treat arr[j] as a function call instead of an array lookup.',
        explanation: 'Incorrect. Syntax interpretation does not depend on operand order in logical expressions.',
      },
      {
        id: 'opt-c',
        label: 'Because relational operators like > have lower operator precedence than logical AND && in C.',
        explanation: 'Incorrect. Relational operators have higher precedence than logical AND.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'C guarantees left-to-right evaluation with short-circuiting for `&&`. If j becomes -1, `j >= 0` is false, and `arr[j] > key` is never executed. If reversed, `arr[-1]` would attempt to read unallocated memory before index 0, invoking undefined behavior.',
  },
  {
    id: 'q-insertion-sort-hard-02',
    algoId: 'insertion-sort',
    tier: 'hard',
    concept: 'Inversion-Sensitive Time Complexity O(n + I)',
    prompt: 'How is the running time of Insertion Sort parameterized in terms of array size n and inversion count I?',
    options: [
      {
        id: 'opt-a',
        label: 'O(n + I), meaning that for nearly-sorted arrays where I is O(n), Insertion Sort runs in linear O(n) time.',
        explanation: 'Correct! The outer loop runs n times, and the inner loop executes exactly I shifts total, giving O(n + I) overall.',
      },
      {
        id: 'opt-b',
        label: 'O(n * I), meaning that any non-zero inversion count forces quadratic running time.',
        explanation: 'Incorrect. Inversions add linearly to the outer loop iterations, not multiplicatively.',
      },
      {
        id: 'opt-c',
        label: 'O(I log n), because each inversion requires a binary search lookup.',
        explanation: 'Incorrect. Standard Insertion Sort uses sequential linear scans.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Every shift in Insertion Sort resolves exactly one inversion. The outer loop does n - 1 steps, and the inner loop shifts elements I times across the entire execution. Thus, running time is Theta(n + I). When I = O(n), it runs in O(n) time.',
  },
  {
    id: 'q-insertion-sort-hard-03',
    algoId: 'insertion-sort',
    tier: 'hard',
    concept: 'Small-Subarray Cutoff in Hybrid Sorts',
    prompt: 'Why do industrial sorting algorithms like Timsort (Python/Java) and IntroSort (C++ std::sort) typically switch to Insertion Sort for small subarrays (such as when size falls below an empirical threshold around 16 to 32 elements)?',
    options: [
      {
        id: 'opt-a',
        label: 'On tiny arrays, Insertion Sort\'s low constant factors, absence of recursive overhead, and exceptional CPU cache locality outperform O(n log n) divide-and-conquer algorithms.',
        explanation: 'Correct! For small n, n² multiplied by a tiny constant factor is faster than n log n burdened by recursion and buffer allocations.',
      },
      {
        id: 'opt-b',
        label: 'Because Quicksort and Merge Sort fail to compile on arrays smaller than 32 elements.',
        explanation: 'Incorrect. All sorting algorithms can compile and run on arbitrary array sizes.',
      },
      {
        id: 'opt-c',
        label: 'Because CPU branch predictors disable speculative execution on arrays larger than 32 elements.',
        explanation: 'Incorrect. Branch prediction is unrelated to 32-element array cutoffs.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Asymptotic notation ignores constant factors. Merge and Quick Sort have overhead from recursion, midpoint math, and buffer copying. For small n (typically configured empirically between 16 and 32 elements depending on hardware architecture and element size), Insertion Sort\'s tight inner loop, high cache locality, and lack of function call overhead make it significantly faster in practice.',
  },

  // ==========================================
  // TOPIC 4: MERGE SORT
  // ==========================================

  // --- Merge Sort: Easy ---
  {
    id: 'q-merge-sort-easy-01',
    algoId: 'merge-sort',
    tier: 'easy',
    concept: 'Divide and Conquer Strategy',
    prompt: 'What three algorithmic phases define the Divide and Conquer strategy of Merge Sort?',
    options: [
      {
        id: 'opt-a',
        label: 'Divide the array in half, Conquer by recursively sorting both halves, and Combine by merging the two sorted halves into a single sorted array.',
        explanation: 'Correct! Merge Sort divides at the midpoint, recursively sorts subarrays, and combines them in linear time.',
      },
      {
        id: 'opt-b',
        label: 'Pick a pivot element, partition smaller elements left and larger elements right, and recurse on sub-partitions.',
        explanation: 'Incorrect. Pivot selection and partitioning describes Quick Sort.',
      },
      {
        id: 'opt-c',
        label: 'Build a binary heap, extract the root element to the end, and down-heapify the remaining elements.',
        explanation: 'Incorrect. Heap construction and extraction describes Heap Sort.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Merge Sort is a textbook Divide and Conquer algorithm: Divide into two halves [l..m] and [m+1..r]; Conquer by sorting recursively; Combine by merging the two sorted halves in O(n) time.',
  },
  {
    id: 'q-merge-sort-easy-02',
    algoId: 'merge-sort',
    tier: 'easy',
    concept: 'Consistent O(n log n) Time Complexity',
    prompt: 'What is the time complexity of Merge Sort in its best, average, and worst cases?',
    options: [
      {
        id: 'opt-a',
        label: 'O(n log n) in all cases (best, average, and worst).',
        explanation: 'Correct! Merge Sort always halves the array and performs O(n) work per level, guaranteeing O(n log n) in all cases.',
      },
      {
        id: 'opt-b',
        label: 'O(n) best case, O(n log n) average case, O(n²) worst case.',
        explanation: 'Incorrect. Merge Sort never degrades to O(n²), nor does standard merge sort run in O(n) best case.',
      },
      {
        id: 'opt-c',
        label: 'O(n log n) average case, but O(n²) worst case on reverse-sorted data.',
        explanation: 'Incorrect. Reverse-sorted data is still split evenly, running in O(n log n).',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Because Merge Sort always splits the array at its midpoint regardless of element values, the recursion tree height is always ceil(log2 n). Every level does O(n) merging work, ensuring O(n log n) running time under all input distributions.',
  },
  {
    id: 'q-merge-sort-easy-03',
    algoId: 'merge-sort',
    tier: 'easy',
    concept: 'Stable Merge Comparison',
    prompt: 'When merging two sorted arrays L and R into arr, which comparison condition guarantees that Merge Sort remains stable?',
    options: [
      {
        id: 'opt-a',
        label: 'if (L[i] <= R[j]) arr[k++] = L[i++];',
        explanation: 'Correct! Using <= favors elements from the left subarray L on ties, preserving original relative order.',
      },
      {
        id: 'opt-b',
        label: 'if (L[i] < R[j]) arr[k++] = L[i++];',
        explanation: 'Incorrect. Using strict < takes R[j] on equal keys, which inverts the relative order of identical elements.',
      },
      {
        id: 'opt-c',
        label: 'if (L[i] != R[j]) arr[k++] = R[j++];',
        explanation: 'Incorrect. Inequality does not compare magnitude.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Stability requires that equal elements preserve their input order. Because L contains elements that appeared before elements in R in the original array, using `<=` ensures that on identical keys (`L[i] == R[j]`), `L[i]` is chosen first.',
  },

  // --- Merge Sort: Medium ---
  {
    id: 'q-merge-sort-med-01',
    algoId: 'merge-sort',
    tier: 'medium',
    concept: 'Auxiliary Space Complexity O(n)',
    prompt: 'Why does standard Merge Sort on arrays require O(n) auxiliary space complexity?',
    options: [
      {
        id: 'opt-a',
        label: 'Merging two sorted arrays requires allocating temporary buffer space of total size O(n) proportional to the subarrays being combined.',
        explanation: 'Correct! Standard merging cannot be done in-place without costly element shifts; temporary buffers totaling O(n) are required.',
      },
      {
        id: 'opt-b',
        label: 'Because each recursive function call allocates a new copy of the operating system process memory.',
        explanation: 'Incorrect. Processes are not duplicated; function calls share memory.',
      },
      {
        id: 'opt-c',
        label: 'Because it stores a hash table of pointers to every array index.',
        explanation: 'Incorrect. Merge Sort uses temporary array buffers, not hash tables.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'To merge two contiguous sorted subarrays in linear time, elements must be read and written into a destination without overwriting unvisited elements in the other subarray. This requires temporary arrays (L and R) of total size n.',
  },
  {
    id: 'q-merge-sort-med-02',
    algoId: 'merge-sort',
    tier: 'medium',
    concept: 'Two-Pointer Merge Tracing',
    prompt: 'Given two sorted subarrays L = [3, 8] and R = [2, 5, 9], in what order are elements merged into the destination array?',
    options: [
      {
        id: 'opt-a',
        label: '2, 3, 5, 8, 9',
        explanation: 'Correct! min(3,2)=2; min(3,5)=3; min(8,5)=5; min(8,9)=8; append remaining 9 -> [2, 3, 5, 8, 9].',
      },
      {
        id: 'opt-b',
        label: '3, 8, 2, 5, 9',
        explanation: 'Incorrect. 2 is smaller than 3, so 2 must be merged first.',
      },
      {
        id: 'opt-c',
        label: '2, 5, 3, 8, 9',
        explanation: 'Incorrect. 3 is smaller than 5, so 3 precedes 5.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The two pointers step through L and R: compare 3 and 2 -> take 2 from R; compare 3 and 5 -> take 3 from L; compare 8 and 5 -> take 5 from R; compare 8 and 9 -> take 8 from L; L is exhausted, copy remaining 9 from R.',
  },
  {
    id: 'q-merge-sort-med-03',
    algoId: 'merge-sort',
    tier: 'medium',
    concept: 'Merge Sort on Linked Lists',
    prompt: 'Why is Merge Sort the preferred sorting algorithm for singly linked lists over Quicksort?',
    options: [
      {
        id: 'opt-a',
        label: 'Merging two sorted linked lists requires only O(1) auxiliary buffer memory by rewiring next pointers (unlike arrays which require O(n) buffers), and sequential traversal avoids random array indexing penalties.',
        explanation: 'Correct! Linked list nodes can be spliced in O(1) buffer memory without external arrays, and sequential traversal avoids random-access penalties.',
      },
      {
        id: 'opt-b',
        label: 'Because linked lists cannot store numbers larger than 255.',
        explanation: 'Incorrect. Node payload values are arbitrary data types.',
      },
      {
        id: 'opt-c',
        label: 'Because Quicksort cannot partition lists with an odd number of nodes.',
        explanation: 'Incorrect. Parity of node count does not restrict Quicksort.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Linked lists provide O(1) pointer splicing, allowing the merge step to execute with O(1) auxiliary data buffer memory (unlike arrays which require an O(n) temporary buffer). While standard recursive list merge sort still uses O(log n) call stack frames (which can be reduced to O(1) via bottom-up iterative merging), it avoids allocating an O(n) data buffer. Furthermore, sequential pointer traversal naturally suits linked lists, whereas Quicksort relies on fast O(1) random-access indexing.',
  },

  // --- Merge Sort: Hard ---
  {
    id: 'q-merge-sort-hard-01',
    algoId: 'merge-sort',
    tier: 'hard',
    concept: 'Master Theorem & Recurrence Relation',
    prompt: 'What is the recurrence relation for Merge Sort comparisons T(n), and how does the Master Theorem solve it?',
    options: [
      {
        id: 'opt-a',
        label: 'T(n) = 2T(n/2) + O(n); with a = 2, b = 2, f(n) = O(n), case 2 applies (n^(log_b a) = n^1), yielding Theta(n log n).',
        explanation: 'Correct! Two subproblems of size n/2 plus linear merge work gives T(n) = 2T(n/2) + O(n) = Theta(n log n).',
      },
      {
        id: 'opt-b',
        label: 'T(n) = T(n/2) + O(1); solving via Master Theorem case 1 yields O(log n).',
        explanation: 'Incorrect. T(n/2) + O(1) is the recurrence for Binary Search.',
      },
      {
        id: 'opt-c',
        label: 'T(n) = 2T(n/2) + O(n²); solving via Master Theorem case 3 yields O(n²).',
        explanation: 'Incorrect. Merging takes linear time O(n), not quadratic O(n²).',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The recurrence is T(n) = 2T(n/2) + O(n). In the Master Theorem: a = 2, b = 2, log_b(a) = log_2(2) = 1. Since f(n) = Theta(n^1) = Theta(n^(log_b a)), Case 2 applies, giving T(n) = Theta(n^(log_b a) * log n) = Theta(n log n).',
  },
  {
    id: 'q-merge-sort-hard-02',
    algoId: 'merge-sort',
    tier: 'hard',
    concept: 'Overflow-Safe Midpoint Calculation',
    codeContext: {
      language: 'c',
      code: 'int m = l + (r - l) / 2;\nmergeSort(arr, l, m);\nmergeSort(arr, m + 1, r);\nmerge(arr, l, m, r);',
    },
    prompt: 'In C, why is int m = l + (r - l) / 2 used to compute the midpoint instead of int m = (l + r) / 2?',
    options: [
      {
        id: 'opt-a',
        label: 'If l + r exceeds INT_MAX, (l + r) triggers signed integer overflow (undefined behavior in C), whereas l + (r - l) / 2 is mathematically guaranteed not to overflow.',
        explanation: 'Correct! In C (C99 §6.5/5), signed integer overflow is undefined behavior. Computing r - l first prevents the sum from exceeding r.',
      },
      {
        id: 'opt-b',
        label: 'Because modern CPU architectures do not support addition inside recursive functions.',
        explanation: 'Incorrect. CPUs support addition in all contexts.',
      },
      {
        id: 'opt-c',
        label: 'Because (l + r) / 2 rounds upward while l + (r - l) / 2 rounds downward.',
        explanation: 'Incorrect. Both expressions truncate toward zero for non-negative integers.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'If indices l and r are large positive integers, their sum can exceed INT_MAX (2^31 - 1 on 32-bit int systems). In C, signed overflow is undefined behavior. Computing r - l first guarantees all intermediate terms remain within [0, r], avoiding overflow.',
  },
  {
    id: 'q-merge-sort-hard-03',
    algoId: 'merge-sort',
    tier: 'hard',
    concept: 'Cache Locality & Bandwidth Trade-Off vs Quicksort',
    prompt: 'Why does standard Quicksort typically outperform Merge Sort in real-world wall-clock benchmarks on arrays, despite both having O(n log n) average complexity?',
    options: [
      {
        id: 'opt-a',
        label: 'Quicksort sorts in-place with high cache locality, whereas Merge Sort constantly allocates and copies data to/from external buffers, doubling memory bus bandwidth consumption.',
        explanation: 'Correct! Merge Sort reads and writes through auxiliary buffers, causing higher cache line churn and memory traffic than Quicksort\'s in-place partitioning.',
      },
      {
        id: 'opt-b',
        label: 'Because Merge Sort uses hardware floating-point registers for comparison.',
        explanation: 'Incorrect. Both algorithms use integer comparisons by default.',
      },
      {
        id: 'opt-c',
        label: 'Because modern operating systems throttle merge operations to conserve CPU power.',
        explanation: 'Incorrect. Operating systems do not throttle merge routines.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Merge Sort requires allocating temporary memory and copying elements back and forth between arrays on every merge step. This doubles memory bus bandwidth consumption and increases cache evictions. Quicksort partitions in-place within contiguous L1/L2 cache lines, maximizing hardware memory bandwidth efficiency.',
  },

  // ==========================================
  // TOPIC 5: QUICK SORT
  // ==========================================

  // --- Quick Sort: Easy ---
  {
    id: 'q-quick-sort-easy-01',
    algoId: 'quick-sort',
    tier: 'easy',
    concept: 'Pivot Selection and Partitioning',
    prompt: 'What is the primary role of the pivot element in Quick Sort\'s partition procedure?',
    options: [
      {
        id: 'opt-a',
        label: 'It serves as a benchmark value to rearrange elements so that smaller values move to its left and larger values to its right, placing the pivot into its final sorted index.',
        explanation: 'Correct! Partitioning places elements < pivot to the left and elements > pivot to the right, locking the pivot into its final sorted position.',
      },
      {
        id: 'opt-b',
        label: 'It acts as an accumulator variable that stores the running sum of all array elements.',
        explanation: 'Incorrect. The pivot is an element used for comparison partitioning, not summation.',
      },
      {
        id: 'opt-c',
        label: 'It marks the boundary of a complete binary heap within the array.',
        explanation: 'Incorrect. Heap boundaries pertain to Heap Sort, not Quick Sort.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The cornerstone of Quick Sort is the partition step: selecting a pivot value and arranging all elements smaller than the pivot to its left, and all larger elements to its right. After partitioning, the pivot itself sits at its permanent sorted index.',
  },
  {
    id: 'q-quick-sort-easy-02',
    algoId: 'quick-sort',
    tier: 'easy',
    concept: 'Average-Case Time Complexity',
    prompt: 'What is the average-case time complexity of Quick Sort?',
    options: [
      {
        id: 'opt-a',
        label: 'O(n log n), achieved when the pivot splits the array into reasonably balanced partitions.',
        explanation: 'Correct! When partitions are balanced on average, recursion depth is log2(n) with O(n) work per level, giving O(n log n).',
      },
      {
        id: 'opt-b',
        label: 'O(n²), which occurs on any randomly shuffled array.',
        explanation: 'Incorrect. Randomly shuffled arrays produce O(n log n) expected performance.',
      },
      {
        id: 'opt-c',
        label: 'O(n), because each partitioning pass runs in constant time.',
        explanation: 'Incorrect. Partitioning takes linear O(n) time per level, not O(1).',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'On random or average-case data, the pivot splits the array roughly in half or into proportional fractions (e.g. 1/4 and 3/4). This produces a recursion tree of logarithmic depth O(log n), each performing O(n) partitioning comparisons, yielding O(n log n) time.',
  },
  {
    id: 'q-quick-sort-easy-03',
    algoId: 'quick-sort',
    tier: 'easy',
    concept: 'In-Place Classification',
    prompt: 'Why is Quick Sort classified as an in-place sorting algorithm?',
    options: [
      {
        id: 'opt-a',
        label: 'It rearranges elements directly within the input array using swaps without allocating an O(n) auxiliary array.',
        explanation: 'Correct! Quick Sort does not require external storage for data elements; auxiliary memory is limited to O(log n) call stack frames.',
      },
      {
        id: 'opt-b',
        label: 'It requires zero memory on the call stack during recursive execution.',
        explanation: 'Incorrect. Recursive calls require stack space (O(log n) average).',
      },
      {
        id: 'opt-c',
        label: 'It only works when executed on read-only memory.',
        explanation: 'Incorrect. Sorting in-place requires mutating the input array.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'An in-place sorting algorithm rearranges the input list within its original array allocation without requiring a secondary array buffer (unlike Merge Sort which requires O(n) auxiliary memory). Auxiliary storage is restricted to stack frames.',
  },

  // --- Quick Sort: Medium ---
  {
    id: 'q-quick-sort-med-01',
    algoId: 'quick-sort',
    tier: 'medium',
    concept: 'Lomuto Partitioning Mechanics',
    codeContext: {
      language: 'c',
      code: 'int partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n    for (int j = low; j < high; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;\n        }\n    }\n    int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;\n    return (i + 1);\n}',
    },
    prompt: 'In the Lomuto partition scheme shown above, what invariant is maintained by pointer i throughout the loop?',
    options: [
      {
        id: 'opt-a',
        label: 'i tracks the end of the region containing elements strictly less than the pivot; all elements from low to i are less than the pivot.',
        explanation: 'Correct! Pointer i marks the boundary of smaller elements. When arr[j] < pivot, i increments and swaps with j.',
      },
      {
        id: 'opt-b',
        label: 'i tracks the largest element found in the array so far.',
        explanation: 'Incorrect. Pointer i marks index boundaries, not maximum values.',
      },
      {
        id: 'opt-c',
        label: 'i points to the one-past-the-end position of the entire array.',
        explanation: 'Incorrect. Pointer i stays strictly within [low-1..high-1].',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Lomuto\'s partition maintains the invariant that all elements in arr[low..i] are < pivot, and all elements in arr[i+1..j-1] are >= pivot. When j discovers an element smaller than pivot, i is incremented and arr[i] is swapped with arr[j]. Finally, the pivot is placed at i + 1.',
  },
  {
    id: 'q-quick-sort-med-02',
    algoId: 'quick-sort',
    tier: 'medium',
    concept: 'Worst-Case Quadratic Degradation',
    prompt: 'Under what circumstance does naive Quick Sort (picking the last element as pivot) degrade to its worst-case time complexity of O(n²)?',
    options: [
      {
        id: 'opt-a',
        label: 'When the array is already sorted or reverse-sorted, causing the pivot to always be the maximum or minimum element and creating highly unbalanced partitions of sizes 0 and n - 1.',
        explanation: 'Correct! Picking an extreme element as pivot produces partitions of 0 and n - 1, resulting in a recursion depth of n and O(n²) total comparisons.',
      },
      {
        id: 'opt-b',
        label: 'When the array contains exclusively negative numbers.',
        explanation: 'Incorrect. Sign of numbers does not alter partitioning balance.',
      },
      {
        id: 'opt-c',
        label: 'When the array size is an exact power of two.',
        explanation: 'Incorrect. Array size being a power of two does not cause degradation.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'If the array is already sorted and arr[high] is chosen as pivot, the pivot is always the maximum element. The left partition has n - 1 elements and the right partition has 0. This degenerates the recursion tree into a linked chain of depth n, requiring n + (n-1) + ... + 1 = O(n²) comparisons.',
  },
  {
    id: 'q-quick-sort-med-03',
    algoId: 'quick-sort',
    tier: 'medium',
    concept: 'Instability of Partitioning Swaps',
    prompt: 'Why is standard Quick Sort an unstable sorting algorithm?',
    options: [
      {
        id: 'opt-a',
        label: 'Partitioning swaps non-adjacent elements across the pivot without tracking their initial relative order.',
        explanation: 'Correct! Long-distance swaps during partitioning can exchange elements across equal keys, destroying stability.',
      },
      {
        id: 'opt-b',
        label: 'Because Lomuto partitioning reverses the entire array on each recursive call.',
        explanation: 'Incorrect. Lomuto partitioning does not reverse arrays.',
      },
      {
        id: 'opt-c',
        label: 'Because Quick Sort requires sorting floating-point numbers.',
        explanation: 'Incorrect. Data type is irrelevant to algorithmic stability.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In Lomuto or Hoare partitioning, swaps occur between non-adjacent elements across wide spans of the array. For example, in [3a, 3b, 1] with pivot 1, swapping 3a with 1 moves 3a past 3b to yield [1, 3b, 3a], reversing their original order.',
  },

  // --- Quick Sort: Hard ---
  {
    id: 'q-quick-sort-hard-01',
    algoId: 'quick-sort',
    tier: 'hard',
    concept: 'Call Stack Space Optimization',
    prompt: 'What is the worst-case call stack depth of naive recursive Quick Sort, and how can it be guaranteed to remain O(log n)?',
    options: [
      {
        id: 'opt-a',
        label: 'Naive worst-case stack depth is O(n); it can be capped at O(log n) by always recursing on the smaller partition first and using tail-call optimization for the larger partition.',
        explanation: 'Correct! Recursing into the smaller partition guarantees that partition size is at most n/2, limiting stack depth to floor(log2 n).',
      },
      {
        id: 'opt-b',
        label: 'Naive worst-case stack depth is O(1); no optimization is necessary.',
        explanation: 'Incorrect. Recursive calls require stack frames.',
      },
      {
        id: 'opt-c',
        label: 'Stack depth is always O(n²); it cannot be reduced without using Merge Sort.',
        explanation: 'Incorrect. Stack depth is at most O(n) even in worst-case naive recursion.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'If naive Quick Sort degrades to unbalanced splits, it creates n activation records on the call stack, risking stack overflow. By always recursing on the smaller partition (size <= n/2) and converting the larger partition into a loop (tail-call elimination), stack depth is strictly bounded by O(log n).',
  },
  {
    id: 'q-quick-sort-hard-02',
    algoId: 'quick-sort',
    tier: 'hard',
    concept: 'Lomuto vs Hoare Partitioning Comparison',
    prompt: 'How does Hoare\'s original two-pointer partition scheme compare to Lomuto\'s partition scheme in terms of swap efficiency?',
    options: [
      {
        id: 'opt-a',
        label: 'Hoare\'s scheme uses two converging pointers from both ends, performing roughly three times fewer swaps on average than Lomuto and handling duplicate keys more efficiently.',
        explanation: 'Correct! Hoare\'s scheme only swaps when both pointers find an out-of-place element, doing about 1/3 as many swaps on average.',
      },
      {
        id: 'opt-b',
        label: 'Hoare\'s scheme requires allocating twice as much auxiliary memory as Lomuto\'s scheme.',
        explanation: 'Incorrect. Both schemes operate in-place with O(1) auxiliary data memory.',
      },
      {
        id: 'opt-c',
        label: 'Lomuto\'s scheme executes in O(log n) time while Hoare\'s scheme takes O(n²).',
        explanation: 'Incorrect. Both schemes take linear O(n) time per partition pass.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Lomuto\'s partition scheme uses a single forward pointer and swaps on every element smaller than the pivot (even if already on the left). Hoare\'s scheme moves pointers inward from both ends, swapping only when elements on both sides violate the pivot partition. This reduces swaps by approximately 3x and avoids quadratic degradation on arrays of identical elements.',
  },
  {
    id: 'q-quick-sort-hard-03',
    algoId: 'quick-sort',
    tier: 'hard',
    concept: 'IntroSort & Worst-Case Protection',
    prompt: 'How does IntroSort (used in modern C++ std::sort) eliminate Quick Sort\'s worst-case O(n²) risk while retaining its fast average-case cache locality?',
    options: [
      {
        id: 'opt-a',
        label: 'It begins with Quick Sort, but monitors recursion depth; if depth exceeds 2 * log2(n), it switches the remaining partition to Heap Sort (guaranteeing O(n log n)).',
        explanation: 'Correct! IntroSort uses Quick Sort for fast cache locality, but falls back to Heap Sort if recursion depth exceeds 2*log2(n) to guarantee O(n log n).',
      },
      {
        id: 'opt-b',
        label: 'It converts the entire array into a hash table before sorting.',
        explanation: 'Incorrect. IntroSort does not use hash tables.',
      },
      {
        id: 'opt-c',
        label: 'It automatically falls back to Bubble Sort when duplicate elements appear.',
        explanation: 'Incorrect. IntroSort uses Insertion Sort for small partitions and Heap Sort for deep recursion.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'IntroSort (Musser, 1997) starts with Quick Sort to take advantage of superior L1/L2 cache locality. It tracks recursion depth; if depth exceeds 2*floor(log2 n) (indicating degenerate partitioning), it switches to Heap Sort, guaranteeing an O(n log n) worst-case ceiling. On tiny partitions (e.g. n < 16), it finishes with Insertion Sort.',
  },

  // ==========================================
  // TOPIC 6: HEAP SORT
  // ==========================================

  // --- Heap Sort: Easy ---
  {
    id: 'q-heap-sort-easy-01',
    algoId: 'heap-sort',
    tier: 'easy',
    concept: 'Array-Based Complete Binary Tree Representation',
    prompt: 'In an array-based binary heap where the root is at index i = 0, what formulas locate the left and right children of node i?',
    options: [
      {
        id: 'opt-a',
        label: 'Left child = 2 * i + 1, Right child = 2 * i + 2.',
        explanation: 'Correct! In a 0-indexed complete binary tree, children of node i reside at 2*i + 1 and 2*i + 2.',
      },
      {
        id: 'opt-b',
        label: 'Left child = i / 2, Right child = i / 2 + 1.',
        explanation: 'Incorrect. Dividing by 2 finds the parent node, not child nodes.',
      },
      {
        id: 'opt-c',
        label: 'Left child = i + 1, Right child = i + 2.',
        explanation: 'Incorrect. Adjacent indices do not represent binary tree branching.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'A complete binary tree can be packed into a contiguous array without explicit node pointers. For 0-indexed arrays, the left child of node i is at 2*i + 1, the right child is at 2*i + 2, and the parent is at floor((i - 1) / 2).',
  },
  {
    id: 'q-heap-sort-easy-02',
    algoId: 'heap-sort',
    tier: 'easy',
    concept: 'Max-Heap Property',
    prompt: 'What invariant defines a Max-Heap data structure?',
    options: [
      {
        id: 'opt-a',
        label: 'For every node i (other than the root), the value of the parent is greater than or equal to the values of its children; the root arr[0] holds the maximum value.',
        explanation: 'Correct! In a Max-Heap, every parent is >= its children, placing the global maximum at the root (index 0).',
      },
      {
        id: 'opt-b',
        label: 'The left child is always less than the root, and the right child is always greater than the root.',
        explanation: 'Incorrect. Left < root < right defines a Binary Search Tree (BST), not a Max-Heap.',
      },
      {
        id: 'opt-c',
        label: 'All leaf nodes must hold negative values.',
        explanation: 'Incorrect. Values in a heap can be any signed or unsigned numbers.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'A Max-Heap satisfies the heap property: arr[parent] >= arr[child] for all valid nodes. This places the maximum element at the root (arr[0]). Unlike a BST, there is no ordered relationship between sibling nodes.',
  },
  {
    id: 'q-heap-sort-easy-03',
    algoId: 'heap-sort',
    tier: 'easy',
    concept: 'Guaranteed O(n log n) Time & O(1) Space',
    prompt: 'What are the time and auxiliary space complexities of Heap Sort across all cases?',
    options: [
      {
        id: 'opt-a',
        label: 'Time complexity is O(n log n) in all cases (best, average, worst); auxiliary space is O(1) (in-place).',
        explanation: 'Correct! Heap Sort is strictly in-place with O(1) auxiliary data memory and guarantees O(n log n) time in all cases.',
      },
      {
        id: 'opt-b',
        label: 'Time complexity is O(n²) worst case; auxiliary space is O(n).',
        explanation: 'Incorrect. Heap Sort never degrades to O(n²) and does not require an O(n) auxiliary buffer.',
      },
      {
        id: 'opt-c',
        label: 'Time complexity is O(n log n) average, but auxiliary space is O(log n) call stack space.',
        explanation: 'Incorrect. Iterative heapify uses O(1) space, and even recursive heapify does not change in-place classification.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Building a heap takes O(n) time, and extracting n elements takes n * O(log n) time, giving O(n log n) running time in best, average, and worst cases. Heap Sort operates in-place within the array, requiring O(1) auxiliary space.',
  },

  // --- Heap Sort: Medium ---
  {
    id: 'q-heap-sort-med-01',
    algoId: 'heap-sort',
    tier: 'medium',
    concept: 'Linear Time Heap Construction (O(n) Build-Heap)',
    codeContext: {
      language: 'c',
      code: 'for (int i = n / 2 - 1; i >= 0; i--) {\n    heapify(arr, n, i);\n}',
    },
    prompt: 'Why does building a binary heap from an arbitrary array of size n take O(n) time rather than O(n log n)?',
    options: [
      {
        id: 'opt-a',
        label: 'Most nodes in a heap reside near the leaves where their heights are small; the sum of node heights across the tree mathematically converges to O(n).',
        explanation: 'Correct! Half the nodes are leaves (height 0), 1/4 have height 1, etc. The sum sum_{h=0}^{log n} (n / 2^(h+1)) * h converges to O(n).',
      },
      {
        id: 'opt-b',
        label: 'Because heapify operates in O(1) time on every node in the tree.',
        explanation: 'Incorrect. Heapify takes O(h) time proportional to node height.',
      },
      {
        id: 'opt-c',
        label: 'Because the compiler vectorizes the loop using SIMD instructions.',
        explanation: 'Incorrect. The linear bound is a mathematical property of tree heights, not a compiler optimization.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Building a heap bottom-up calls heapify on nodes from height 0 up to log n. Because the number of nodes at height h decreases exponentially (n / 2^(h+1)), the work sum is sum (n / 2^(h+1)) * O(h) = O(n * sum h/2^h) = O(n * 2) = O(n).',
  },
  {
    id: 'q-heap-sort-med-02',
    algoId: 'heap-sort',
    tier: 'medium',
    concept: 'Extraction Phase Invariant',
    codeContext: {
      language: 'c',
      code: 'for (int i = n - 1; i > 0; i--) {\n    int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;\n    heapify(arr, i, 0);\n}',
    },
    prompt: 'In the extraction loop shown above, what happens on each iteration?',
    options: [
      {
        id: 'opt-a',
        label: 'The maximum element at arr[0] is swapped with the last element of the heap arr[i], the active heap size shrinks to i, and heapify restores the max-heap property at root 0.',
        explanation: 'Correct! Swapping arr[0] with arr[i] locks the max element at index i, shrinks the heap to size i, and down-heapifies root 0.',
      },
      {
        id: 'opt-b',
        label: 'The array is reversed in place and then divided into two sorted halves.',
        explanation: 'Incorrect. Heap Sort does not reverse or divide arrays.',
      },
      {
        id: 'opt-c',
        label: 'A new dynamic heap is allocated from system memory on each step.',
        explanation: 'Incorrect. Heap Sort operates strictly in-place within the original array.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'At the start of the extraction loop, arr[0] is the maximum element in the heap. Swapping it with arr[i] moves it into its final sorted position at index i. The heap boundary shrinks to [0..i-1], and down-heapifying index 0 in O(log i) time prepares the next maximum.',
  },
  {
    id: 'q-heap-sort-med-03',
    algoId: 'heap-sort',
    tier: 'medium',
    concept: 'Instability of Heap Sort',
    prompt: 'Why is Heap Sort classified as an unstable sorting algorithm?',
    options: [
      {
        id: 'opt-a',
        label: 'Swapping root elements with the end of the heap and sifting elements down across tree levels can alter the relative order of duplicate keys.',
        explanation: 'Correct! Swapping the root to the bottom of the array and sifting elements across tree levels moves equal keys out of their original order.',
      },
      {
        id: 'opt-b',
        label: 'Because binary trees cannot store duplicate elements by definition.',
        explanation: 'Incorrect. Binary heaps comfortably store duplicate values.',
      },
      {
        id: 'opt-c',
        label: 'Because heap sort modifies array indices using floating-point division.',
        explanation: 'Incorrect. Heap Sort uses integer index arithmetic.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'During heap construction and root extractions, elements jump across distant levels of the tree. If two elements have equal keys, the first one can be swapped to a lower level or into the root while the second remains in place, inverting their original relative sequence.',
  },

  // --- Heap Sort: Hard ---
  {
    id: 'q-heap-sort-hard-01',
    algoId: 'heap-sort',
    tier: 'hard',
    concept: 'Poor CPU Cache Locality vs Quicksort',
    prompt: 'Why does Heap Sort typically run significantly slower than Quick Sort on modern hardware, despite having a superior worst-case asymptotic bound of O(n log n)?',
    options: [
      {
        id: 'opt-a',
        label: 'Heap parent-child indexing (2*i + 1, 2*i + 2) creates large non-contiguous memory stride jumps, causing frequent CPU L1/L2 cache misses and TLB misses.',
        explanation: 'Correct! Child index lookups jump exponentially across distant array cache lines, causing frequent CPU cache misses that stall execution pipelines.',
      },
      {
        id: 'opt-b',
        label: 'Because Heap Sort uses slow recursive call stacks while Quicksort uses zero instructions.',
        explanation: 'Incorrect. Both algorithms use recursion or iteration.',
      },
      {
        id: 'opt-c',
        label: 'Because building a heap requires hardware floating-point operations.',
        explanation: 'Incorrect. Heap Sort performs simple integer comparisons.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'CPU hardware prefetchers rely on spatial locality. During down-heapification, parent-child transitions jump by factors of 2 (2i + 1), quickly traversing past 64-byte L1/L2 cache lines and memory page boundaries. Quicksort streams through contiguous blocks of memory, minimizing cache misses.',
  },
  {
    id: 'q-heap-sort-hard-02',
    algoId: 'heap-sort',
    tier: 'hard',
    concept: 'Heapify Boundary & Largest Child Guard',
    codeContext: {
      language: 'c',
      code: 'void heapify(int arr[], int n, int i) {\n    int largest = i;\n    int left = 2 * i + 1;\n    int right = 2 * i + 2;\n    if (left < n && arr[left] > arr[largest]) largest = left;\n    if (right < n && arr[right] > arr[largest]) largest = right;\n    if (largest != i) {\n        int temp = arr[i]; arr[i] = arr[largest]; arr[largest] = temp;\n        heapify(arr, n, largest);\n    }\n}',
    },
    prompt: 'What critical safety role do the conditions left < n and right < n perform in heapify?',
    options: [
      {
        id: 'opt-a',
        label: 'They verify whether the left and right children actually exist within the active heap boundary n before accessing their indices, preventing out-of-bounds memory reads.',
        explanation: 'Correct! Leaf nodes or nodes near the boundary do not have children within the heap; checking left < n and right < n prevents out-of-bounds array access.',
      },
      {
        id: 'opt-b',
        label: 'They check whether the array elements are positive integers.',
        explanation: 'Incorrect. The conditions compare indices against heap size n, not values.',
      },
      {
        id: 'opt-c',
        label: 'They prevent the function from recursing more than 3 times.',
        explanation: 'Incorrect. Recusion depth is bounded by tree height log2(n), not by this guard.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In a complete binary tree of size n, nodes with indices >= n/2 have no children, and some nodes may have a left child but no right child. Checking `left < n` and `right < n` ensures that `arr[left]` and `arr[right]` are only accessed when the children fall within the current heap size boundary.',
  },
  {
    id: 'q-heap-sort-hard-03',
    algoId: 'heap-sort',
    tier: 'hard',
    concept: 'Comparison Triad: Merge vs Quick vs Heap Sort',
    prompt: 'When comparing Merge Sort, Quick Sort, and Heap Sort, what is the specific architectural trade-off that uniquely characterizes Heap Sort?',
    options: [
      {
        id: 'opt-a',
        label: 'Heap Sort achieves Merge Sort\'s guaranteed O(n log n) worst-case time while matching Quick Sort\'s O(1) in-place auxiliary memory, but sacrifices stability and CPU cache locality.',
        explanation: 'Correct! Heap Sort uniquely combines worst-case O(n log n) time with O(1) in-place memory, trading away stability and cache locality.',
      },
      {
        id: 'opt-b',
        label: 'Heap Sort is the only stable O(n log n) algorithm that uses O(1) memory.',
        explanation: 'Incorrect. Heap Sort is not stable.',
      },
      {
        id: 'opt-c',
        label: 'Heap Sort runs in O(n) average time while Merge Sort and Quick Sort run in O(n log n).',
        explanation: 'Incorrect. Comparison sorts have an Omega(n log n) lower bound on average.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The classic comparison sort trade-off triad: Merge Sort is stable with O(n log n) worst-case time, but requires O(n) auxiliary memory. Quick Sort is in-place and fast in practice, but is unstable and has O(n²) worst-case time. Heap Sort combines O(1) in-place memory with guaranteed O(n log n) worst-case time, but is unstable and suffers from poor cache locality.',
  },
];
