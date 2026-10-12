import type { DifficultyTier, MasteryQuestion } from '../types';
import { SORTING_QUESTION_BANK } from './sortingQuestionBank';
import { DATA_STRUCTURES_QUESTION_BANK } from './dataStructuresQuestionBank';
import { TREES_QUESTION_BANK } from './treesQuestionBank';
import { GRAPHS_QUESTION_BANK } from './graphsQuestionBank';
import { TECHNIQUES_QUESTION_BANK } from './techniquesQuestionBank';

export {
  SORTING_QUESTION_BANK,
  DATA_STRUCTURES_QUESTION_BANK,
  TREES_QUESTION_BANK,
  GRAPHS_QUESTION_BANK,
  TECHNIQUES_QUESTION_BANK,
};

/**
 * 18 Reviewed Pilot Questions for Chapter 01: Searching.
 * - Linear Search (9 questions: 3 Easy, 3 Medium, 3 Hard)
 * - Binary Search (9 questions: 3 Easy, 3 Medium, 3 Hard)
 */
export const SEARCHING_QUESTION_BANK: MasteryQuestion[] = [
  // ==========================================
  // TOPIC 1: LINEAR SEARCH
  // ==========================================

  // --- Linear Search: Easy ---
  {
    id: 'q-linear-search-easy-01',
    algoId: 'linear-search',
    tier: 'easy',
    concept: 'Sequential Traversal Order',
    prompt: 'In standard linear search on an array of size n, in what order are elements inspected?',
    options: [
      {
        id: 'opt-a',
        label: 'Sequentially from index 0 up to n - 1, checking each adjacent element one by one.',
        explanation: 'Correct! Linear search makes no assumptions about element ordering, checking indices sequentially from 0 through n - 1.',
      },
      {
        id: 'opt-b',
        label: 'By repeatedly jumping to the middle index and dividing the array in half.',
        explanation: 'Incorrect. Dividing the search range in half requires sorted data and describes binary search.',
      },
      {
        id: 'opt-c',
        label: 'From the largest value to the smallest value regardless of index positions.',
        explanation: 'Incorrect. Linear search visits elements by array index order, not sorted value order.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Linear search operates by sequential scan. Because unsorted arrays lack structural invariants, verifying elements requires examining index 0 through index n - 1.',
  },
  {
    id: 'q-linear-search-easy-02',
    algoId: 'linear-search',
    tier: 'easy',
    concept: 'Target Match Termination',
    prompt: 'What does a standard linear search algorithm do the moment it evaluates arr[i] == target?',
    options: [
      {
        id: 'opt-a',
        label: 'It halts immediately and returns the index i of the found element.',
        explanation: 'Correct! Standard search terminates upon discovering the first instance of target.',
      },
      {
        id: 'opt-b',
        label: 'It continues scanning the rest of the array to count all duplicate matches.',
        explanation: 'Incorrect. Finding all duplicates is a multi-match scan; basic linear search stops on the first match.',
      },
      {
        id: 'opt-c',
        label: 'It swaps arr[i] with arr[0] before terminating.',
        explanation: 'Incorrect. Standard linear search does not mutate the array.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Upon finding arr[i] == target, the search objective is achieved and the function immediately returns index i.',
  },
  {
    id: 'q-linear-search-easy-03',
    algoId: 'linear-search',
    tier: 'easy',
    concept: 'Best-Case Time Complexity',
    prompt: 'Under what specific condition does linear search achieve its best-case time complexity of O(1)?',
    options: [
      {
        id: 'opt-a',
        label: 'When the target element resides at index 0 (the very first element inspected).',
        explanation: 'Correct! If arr[0] == target, only 1 comparison is performed, taking O(1) time.',
      },
      {
        id: 'opt-b',
        label: 'When the target element resides at index n - 1 (the last element).',
        explanation: 'Incorrect. Checking the last element requires n comparisons, representing worst-case time O(n).',
      },
      {
        id: 'opt-c',
        label: 'When the array contains exclusively positive numbers.',
        explanation: 'Incorrect. Element values do not change the number of loop iterations.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Best-case occurs when the search target is at index 0, requiring exactly 1 comparison (O(1)).',
  },

  // --- Linear Search: Medium ---
  {
    id: 'q-linear-search-med-01',
    algoId: 'linear-search',
    tier: 'medium',
    concept: 'Absence Verification Invariant',
    prompt: 'When the target value is not present in an unsorted array of size n, how many element comparisons must linear search perform before concluding the target is absent?',
    options: [
      {
        id: 'opt-a',
        label: 'Exactly n comparisons, because every index from 0 to n - 1 must be checked.',
        explanation: 'Correct! In unsorted data, any unvisited index might contain the target, so absence requires exhausting all n elements.',
      },
      {
        id: 'opt-b',
        label: 'At most n / 2 comparisons, because half the array can be deduced from the other half.',
        explanation: 'Incorrect. In unsorted data, no index provides information about any other index.',
      },
      {
        id: 'opt-c',
        label: 'About log2(n) comparisons.',
        explanation: 'Incorrect. Logarithmic comparison counts require sorted monotonicity.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Proving absence in an unsorted array requires checking all n elements. The loop only concludes absence after reaching index n, taking O(n) comparisons.',
  },
  {
    id: 'q-linear-search-med-02',
    algoId: 'linear-search',
    tier: 'medium',
    concept: 'Unsorted Lower Bound',
    prompt: 'Why is it impossible for any comparison-based algorithm to guarantee sub-linear worst-case search time on an arbitrary unsorted array?',
    options: [
      {
        id: 'opt-a',
        label: 'Because an unequal comparison arr[i] != target provides zero information about values at uninspected indices.',
        explanation: 'Correct! Without an ordering invariant, eliminating one element leaves all remaining elements as independent candidates.',
      },
      {
        id: 'opt-b',
        label: 'Because C arrays cannot be indexed in O(1) random access time.',
        explanation: 'Incorrect. C arrays provide O(1) random access via pointer offset arithmetic.',
      },
      {
        id: 'opt-c',
        label: 'Because compilers convert all search loops into recursive function calls.',
        explanation: 'Incorrect. Compilers do not convert iterative search loops into recursion.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'In an adversary model on unsorted data, any uninspected position could contain the target. Thus, every element must be verified in the worst case, establishing an Ω(n) lower bound.',
  },
  {
    id: 'q-linear-search-med-03',
    algoId: 'linear-search',
    tier: 'medium',
    concept: 'Early Exit on Ascending Data',
    prompt: 'If linear search is executed on an array known to be sorted in ascending order, how can missing-target searches be optimized?',
    options: [
      {
        id: 'opt-a',
        label: 'Stop and return -1 as soon as an element arr[i] > target is encountered.',
        explanation: 'Correct! In ascending data, arr[i] > target guarantees that all subsequent elements arr[k] (k >= i) also exceed target.',
      },
      {
        id: 'opt-b',
        label: 'Skip every second element and inspect only even indices.',
        explanation: 'Incorrect. Skipping elements could bypass the target entirely.',
      },
      {
        id: 'opt-c',
        label: 'Reverse the array before searching.',
        explanation: 'Incorrect. Reversing takes O(n) time and does not improve search bounds.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'By the sorted invariant, if arr[i] > target, then for all k >= i, arr[k] >= arr[i] > target. We can safely conclude absence without scanning the remainder of the array.',
  },

  // --- Linear Search: Hard ---
  {
    id: 'q-linear-search-hard-01',
    algoId: 'linear-search',
    tier: 'hard',
    concept: 'C Zero-Indexing & Sentinel Returns',
    codeContext: {
      language: 'c',
      code: 'int linearSearch(const int arr[], int n, int target) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == target) return i;\n    }\n    return -1;\n}',
    },
    prompt: 'In the C implementation shown above, why is -1 returned on failure rather than 0?',
    options: [
      {
        id: 'opt-a',
        label: 'In C, 0 is a valid array index representing arr[0]; returning 0 would ambiguously report a match at index 0.',
        explanation: 'Correct! C arrays are zero-indexed [0..n-1]. 0 indicates success at the first index, making -1 the standard out-of-band sentinel.',
      },
      {
        id: 'opt-b',
        label: 'C functions returning int are required by the ISO standard to return negative values on failure.',
        explanation: 'Incorrect. Return value conventions are determined by API design, not language mandate.',
      },
      {
        id: 'opt-c',
        label: 'Returning -1 raises a CPU trap that alerts the operating system of an error.',
        explanation: 'Incorrect. -1 is an ordinary scalar integer value returned to the caller.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Because 0 is a valid index, using 0 for failure would cause caller confusion. -1 is an out-of-band integer outside the valid index range [0, n-1].',
  },
  {
    id: 'q-linear-search-hard-02',
    algoId: 'linear-search',
    tier: 'hard',
    concept: 'C Pointer Range Invariant',
    codeContext: {
      language: 'c',
      code: 'const int* linearSearchPtr(const int* start, const int* end, int target) {\n    for (const int* p = start; p < end; p++) {\n        if (*p == target) return p;\n    }\n    return NULL;\n}',
    },
    prompt: 'In this pointer-based linear search, why does the loop condition use p < end with end = start + n rather than p <= end?',
    options: [
      {
        id: 'opt-a',
        label: 'start + n points to the one-past-the-end position, which is valid for pointer comparison but undefined to dereference.',
        explanation: 'Correct! In C (C99 §6.5.6), pointers may legally point one element past an array, but dereferencing that address is undefined behavior.',
      },
      {
        id: 'opt-b',
        label: 'Because C pointers cannot be compared using the <= relational operator.',
        explanation: 'Incorrect. Relational comparisons between pointers to elements of the same array are valid in C.',
      },
      {
        id: 'opt-c',
        label: 'Because the compiler automatically decrements end on every loop iteration.',
        explanation: 'Incorrect. end is a const pointer parameter and remains fixed.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Standard C half-open ranges [start, end) treat end as an exclusive boundary. Dereferencing *(start + n) accesses unallocated memory, so the loop must terminate when p == end.',
  },
  {
    id: 'q-linear-search-hard-03',
    algoId: 'linear-search',
    tier: 'hard',
    concept: 'Spatial Locality and Cache Lines',
    prompt: 'Why does iterative linear search over a contiguous C array often exhibit high real-world throughput despite its O(n) theoretical complexity?',
    options: [
      {
        id: 'opt-a',
        label: 'Contiguous memory layout maximizes CPU hardware prefetching and spatial cache locality, loading multiple elements per cache line.',
        explanation: 'Correct! Sequential memory access leverages CPU L1/L2 cache line prefetching (e.g., 64-byte chunks), minimizing cache misses.',
      },
      {
        id: 'opt-b',
        label: 'Iterative loops run on the GPU while binary search is restricted to the CPU.',
        explanation: 'Incorrect. Both run on CPU registers by default.',
      },
      {
        id: 'opt-c',
        label: 'The C compiler optimizes linear search into O(1) hash lookups at compile time.',
        explanation: 'Incorrect. Compilers do not transform arbitrary array searches into hash tables.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Hardware prefetchers detect contiguous ascending access patterns and stream adjacent 64-byte cache lines into CPU cache before the loop requests them, providing high memory bandwidth.',
  },

  // ==========================================
  // TOPIC 2: BINARY SEARCH
  // ==========================================

  // --- Binary Search: Easy ---
  {
    id: 'q-binary-search-easy-01',
    algoId: 'binary-search',
    tier: 'easy',
    concept: 'Monotonic Order Precondition',
    prompt: 'What essential precondition must an array satisfy before binary search can be correctly executed on it?',
    options: [
      {
        id: 'opt-a',
        label: 'The array must be sorted in a monotonic order (such as ascending or descending).',
        explanation: 'Correct! Binary search relies on ordering to discard half the remaining elements after each midpoint comparison.',
      },
      {
        id: 'opt-b',
        label: 'The array length must be an exact power of two.',
        explanation: 'Incorrect. Binary search operates on arrays of any arbitrary length n >= 0.',
      },
      {
        id: 'opt-c',
        label: 'All elements in the array must be distinct with zero duplicates.',
        explanation: 'Incorrect. Binary search works on arrays with duplicate elements.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Without sorted monotonicity, evaluating arr[mid] < target or arr[mid] > target provides no guarantee about which half of the array contains the target.',
  },
  {
    id: 'q-binary-search-easy-02',
    algoId: 'binary-search',
    tier: 'easy',
    concept: 'Subarray Elimination Rule',
    prompt: 'In binary search on an ascending sorted array, arr[mid] is 50 and the search target is 22. What pointer update correctly eliminates the unneeded half?',
    options: [
      {
        id: 'opt-a',
        label: 'Set right = mid - 1, eliminating the right half [mid..right].',
        explanation: 'Correct! Since arr[mid] (50) > target (22), all elements at or after mid are >= 50 and cannot match 22.',
      },
      {
        id: 'opt-b',
        label: 'Set left = mid + 1, eliminating the left half [left..mid].',
        explanation: 'Incorrect. Target (22) is smaller than arr[mid] (50), so target can only exist in the left half.',
      },
      {
        id: 'opt-c',
        label: 'Set right = mid, keeping mid in the active range.',
        explanation: 'Incorrect. arr[mid] has already been checked and is not 22; keeping it can cause an infinite loop.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Because arr[mid] > target and the array is ascending, for all k >= mid, arr[k] >= arr[mid] > target. The entire right half [mid..right] is safely eliminated.',
  },
  {
    id: 'q-binary-search-easy-03',
    algoId: 'binary-search',
    tier: 'easy',
    concept: 'Logarithmic Step Growth',
    prompt: 'In the worst case, approximately how many comparisons does binary search perform on a sorted array of 1,024 elements?',
    options: [
      {
        id: 'opt-a',
        label: 'At most 11 comparisons, because log2(1024) = 10 and each step halves the range.',
        explanation: 'Correct! 1024 -> 512 -> 256 -> 128 -> 64 -> 32 -> 16 -> 8 -> 4 -> 2 -> 1 -> 0 requires at most 11 comparisons.',
      },
      {
        id: 'opt-b',
        label: 'Exactly 512 comparisons, because it checks half of the 1,024 elements.',
        explanation: 'Incorrect. Binary search halves the remaining range on every single step, not just once.',
      },
      {
        id: 'opt-c',
        label: '1,024 comparisons, because each position must be visited.',
        explanation: 'Incorrect. 1,024 comparisons corresponds to linear search, not binary search.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The search space shrinks by a factor of 2 on each iteration: floor(log2(n)) + 1 steps at most. For n = 1,024, this is 11 comparisons.',
  },

  // --- Binary Search: Medium ---
  {
    id: 'q-binary-search-med-01',
    algoId: 'binary-search',
    tier: 'medium',
    concept: 'Interval Invariant while (left <= right)',
    prompt: 'In standard binary search on a closed interval [left, right], why must the loop condition be while (left <= right) rather than while (left < right)?',
    options: [
      {
        id: 'opt-a',
        label: 'When left == right, exactly one candidate element remains in the search range that has not yet been inspected.',
        explanation: 'Correct! When left == right, the interval [left, right] contains one element. Terminating early at left < right would miss the target if it resides at that index.',
      },
      {
        id: 'opt-b',
        label: 'Because the <= operator prevents C pointers from wrapping around to zero.',
        explanation: 'Incorrect. The comparison is between array index integers, not pointer wrap-around protections.',
      },
      {
        id: 'opt-c',
        label: 'To allow the loop to run indefinitely until a return statement is triggered.',
        explanation: 'Incorrect. Binary search guarantees termination when left > right.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'The closed interval [left, right] is non-empty whenever left <= right. When left == right, the range contains exactly one element: arr[left]. Exiting at left < right would skip this final candidate.',
  },
  {
    id: 'q-binary-search-med-02',
    algoId: 'binary-search',
    tier: 'medium',
    concept: 'Off-by-One and Infinite Loops',
    prompt: 'What bug occurs if an implementation uses left = mid and right = mid instead of left = mid + 1 and right = mid - 1 in standard integer binary search?',
    options: [
      {
        id: 'opt-a',
        label: 'When right - left == 1 and arr[mid] < target, mid evaluates to left, causing left = mid to make no progress and loop infinitely.',
        explanation: 'Correct! With integer truncation, mid = (left + right) / 2 evaluates to left when right == left + 1. If left = mid, the state never changes.',
      },
      {
        id: 'opt-b',
        label: 'The array elements are swapped in place, corrupting the sorted order.',
        explanation: 'Incorrect. Binary search does not mutate or swap elements.',
      },
      {
        id: 'opt-c',
        label: 'The target index is always reported as a negative integer.',
        explanation: 'Incorrect. The defect is an infinite loop, not negative index values.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Because integer division truncates toward zero, mid = left when right = left + 1. If arr[mid] < target and left is updated to mid, the interval [left, right] does not shrink, producing an infinite loop.',
  },
  {
    id: 'q-binary-search-med-03',
    algoId: 'binary-search',
    tier: 'medium',
    concept: 'Duplicate Key Guarantees',
    prompt: 'If an ascending sorted array contains multiple duplicate occurrences of target (e.g., [10, 20, 20, 20, 30] with target 20), what does standard 3-way binary search return?',
    options: [
      {
        id: 'opt-a',
        label: 'It returns an arbitrary matching index, which may be the first, middle, or last occurrence depending on array length.',
        explanation: 'Correct! Standard binary search terminates on the very first match it discovers, providing no guarantee about which duplicate index is returned.',
      },
      {
        id: 'opt-b',
        label: 'It is guaranteed to return the lowest index of the duplicate sequence.',
        explanation: 'Incorrect. Finding the lowest index requires a lower_bound variant that continues searching left after a match.',
      },
      {
        id: 'opt-c',
        label: 'It fails and returns -1 because duplicate values violate the binary search invariant.',
        explanation: 'Incorrect. Duplicates do not violate the sorted invariant.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Standard binary search returns whenever arr[mid] == target. To find the first or last duplicate specifically, one must use lower_bound or upper_bound search variants.',
  },

  // --- Binary Search: Hard ---
  {
    id: 'q-binary-search-hard-01',
    algoId: 'binary-search',
    tier: 'hard',
    concept: 'C Signed Integer Overflow & Undefined Behavior',
    codeContext: {
      language: 'c',
      code: '/* Approach A: */\nint mid = (left + right) / 2;\n\n/* Approach B: */\nint mid = left + (right - left) / 2;',
    },
    prompt: 'In C, why is Approach B preferred over Approach A when indexing large arrays?',
    options: [
      {
        id: 'opt-a',
        label: 'If left + right exceeds INT_MAX, Approach A triggers signed integer overflow, which is undefined behavior in C. Approach B guarantees all intermediate values remain within valid bounds.',
        explanation: 'Correct! In C (C99 §6.5/5), signed integer overflow is undefined behavior. In Approach B, right - left is non-negative and <= right, so no overflow can occur.',
      },
      {
        id: 'opt-b',
        label: 'Approach B executes in fewer CPU instruction cycles because modern ALUs cannot divide by 2.',
        explanation: 'Incorrect. Both expressions compile to identical shift instructions; the distinction is overflow safety.',
      },
      {
        id: 'opt-c',
        label: 'Approach A causes C pointers to automatically dereference null memory.',
        explanation: 'Incorrect. The variables are integer indices, not pointers.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Signed integer overflow invokes undefined behavior in C. If left and right are both large positive integers whose sum exceeds INT_MAX, (left + right) overflows. Approach B computes right - left first, which is always non-negative and fits in int.',
  },
  {
    id: 'q-binary-search-hard-02',
    algoId: 'binary-search',
    tier: 'hard',
    concept: 'Two-Way vs Three-Way Branching Trade-Off',
    codeContext: {
      language: 'c',
      code: '/* 2-Way Branching Binary Search: */\nint binarySearch2Way(const int arr[], int n, int target) {\n    int left = 0, right = n - 1;\n    while (left < right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] < target) left = mid + 1;\n        else right = mid;\n    }\n    return (arr[left] == target) ? left : -1;\n}',
    },
    prompt: 'What is the primary architectural trade-off of the 2-way branching binary search shown above compared to standard 3-way branching?',
    options: [
      {
        id: 'opt-a',
        label: 'It performs only 1 comparison per loop iteration instead of up to 2, aiding CPU branch prediction, but always takes ceil(log2 n) iterations without early exit.',
        explanation: 'Correct! 2-way search reduces comparisons inside the loop to 1, which benefits CPU branch pipelining, but gives up the O(1) early exit when the target is at the midpoint.',
      },
      {
        id: 'opt-b',
        label: 'It reduces the asymptotic time complexity from O(log n) down to O(1).',
        explanation: 'Incorrect. Both algorithms are O(log n).',
      },
      {
        id: 'opt-c',
        label: 'It allows binary search to operate correctly on unsorted arrays.',
        explanation: 'Incorrect. Both variants require sorted arrays.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Standard 3-way search tests equality on every step and can exit early, but has 2 branch conditions per iteration. 2-way search reduces the loop to a single comparison, improving branch predictor throughput at the expense of deferring equality checking until the interval narrows to 1.',
  },
  {
    id: 'q-binary-search-hard-03',
    algoId: 'binary-search',
    tier: 'hard',
    concept: 'Recurrence and Call Stack Depth',
    prompt: 'What is the recurrence relation for binary search comparisons T(n), and what is the auxiliary space complexity of iterative binary search versus naive recursive binary search without compiler tail-call optimization in C?',
    options: [
      {
        id: 'opt-a',
        label: 'T(n) = T(n/2) + O(1); iterative requires O(1) auxiliary space, whereas naive recursive requires O(log n) space due to call stack frames.',
        explanation: 'Correct! By the Master Theorem, T(n) = T(n/2) + O(1) yields O(log n) time. Iterative uses O(1) stack memory, while naive recursion creates a stack frame for each halving (O(log n) frames).',
      },
      {
        id: 'opt-b',
        label: 'T(n) = 2T(n/2) + O(n); iterative requires O(log n) space and recursive requires O(n) space.',
        explanation: 'Incorrect. 2T(n/2) + O(n) is merge sort, not binary search.',
      },
      {
        id: 'opt-c',
        label: 'T(n) = T(n - 1) + O(1); both require O(1) auxiliary space.',
        explanation: 'Incorrect. T(n - 1) + O(1) is linear search recurrence, not binary search.',
      },
    ],
    correctOptionId: 'opt-a',
    pedagogicalRationale: 'Each step solves 1 subproblem of size n/2 in O(1) time: T(n) = T(n/2) + O(1) = O(log n). Iterative code uses scalar stack variables (O(1) memory), whereas naive recursive calls allocate a new activation record per step (O(log n) space).',
  },
];

/**
 * Complete AlgoLens Question Bank combining all Chapters 01–06: Searching, Sorting, Data Structures, Trees, Graphs, and Algorithmic Techniques (288 reviewed questions across all 32 algorithms).
 */
export const QUESTION_BANK: MasteryQuestion[] = [
  ...SEARCHING_QUESTION_BANK,
  ...SORTING_QUESTION_BANK,
  ...DATA_STRUCTURES_QUESTION_BANK,
  ...TREES_QUESTION_BANK,
  ...GRAPHS_QUESTION_BANK,
  ...TECHNIQUES_QUESTION_BANK,
];

/**
 * Checks whether a given topic has authored mastery questions available.
 */
export function hasMasteryQuestions(algoId: string): boolean {
  return QUESTION_BANK.some((q) => q.algoId === algoId);
}

/**
 * Retrieves all reviewed questions for a given topic and difficulty tier.
 */
export function getQuestionsForTopicAndTier(
  algoId: string,
  tier: DifficultyTier
): MasteryQuestion[] {
  return QUESTION_BANK.filter(
    (q) => q.algoId === algoId && q.tier === tier
  );
}

/**
 * Retrieves a single question by its unique ID across the entire curriculum bank.
 */
export function getQuestionById(id: string): MasteryQuestion | undefined {
  return QUESTION_BANK.find((q) => q.id === id);
}
