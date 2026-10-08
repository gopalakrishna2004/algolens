import type { MatrixStep, MatrixCellState, AlgorithmMetadata } from '../types';

export const dynamicProgrammingMetadata: AlgorithmMetadata = {
  id: 'dynamic-programming',
  name: 'Dynamic Programming (0/1 Knapsack)',
  category: 'techniques',
  visualizationType: 'matrix',
  difficulty: 'Intermediate',
  prerequisites: ['Recursion', 'Overlapping Subproblems', 'Optimal Substructure', 'Memoization'],
  timeComplexity: {
    best: 'O(n * W)',
    average: 'O(n * W)',
    worst: 'O(n * W)',
  },
  spaceComplexity: 'O(n * W) [2D DP Table]',
  description:
    'An algorithmic technique that solves complex problems by breaking them down into simpler overlapping subproblems, solving each subproblem once, and storing the answers in a table (memoization / tabulation) to avoid redundant computations.',
  keyIdea:
    'Store, do not recompute! State transition: dp[i][w] = max(skip item: dp[i-1][w], take item: val[i-1] + dp[i-1][w - wt[i-1]]).',
  whenToUse: [
    'Resource optimization problems (0/1 Knapsack, Coin Change, Rod Cutting).',
    'Sequence alignment and text similarity (Longest Common Subsequence, Edit Distance).',
    'Grid path counting and graph shortest paths (Floyd-Warshall, Bellman-Ford).',
  ],
  limitations: [
    'Requires both Optimal Substructure and Overlapping Subproblems properties.',
    'Memory consumption for large multidimensional DP tables (O(n * W)).',
  ],
  sourceCode: {
    c: `// 0/1 Knapsack via DP in C
int knapsack(int W, int wt[], int val[], int n) {
    int dp[n + 1][W + 1];

    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0)
                dp[i][w] = 0;
            else if (wt[i - 1] <= w)
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            else
                dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][W];
}`,
    typescript: `// 0/1 Knapsack in TypeScript
function knapsack(W: number, wt: number[], val: number[]): number {
  const n = val.length;
  const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= W; w++) {
      if (wt[i - 1] <= w) dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
      else dp[i][w] = dp[i - 1][w];
    }
  }
  return dp[n][W];
}`,
  },
};

export function simulateDynamicProgramming(): MatrixStep[] {
  const items = [
    { name: 'Item 1', wt: 1, val: 10 },
    { name: 'Item 2', wt: 2, val: 15 },
    { name: 'Item 3', wt: 3, val: 40 },
  ];
  const W = 4;
  const n = items.length;

  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));
  const rowLabels = ['0 (None)', '1 (wt:1, v:10)', '2 (wt:2, v:15)', '3 (wt:3, v:40)'];
  const colLabels = ['W=0', 'W=1', 'W=2', 'W=3', 'W=4'];

  const getSnapshot = () => dp.map((r) => [...r]);
  const steps: MatrixStep[] = [];

  steps.push({
    kind: 'matrix',
    matrix: getSnapshot(),
    rowLabels,
    colLabels,
    action: 'init',
    description: `Initialized DP table for 0/1 Knapsack with ${n} items and max capacity W=${W}. Base row 0 initialized to 0.`,
    stats: { capacity: W, itemCount: n, maxProfit: 0 },
    codeLine: 5,
  });

  for (let i = 1; i <= n; i++) {
    const item = items[i - 1];

    for (let w = 1; w <= W; w++) {
      const skipVal = dp[i - 1][w];
      const canTake = item.wt <= w;

      const reads: MatrixCellState[] = [{ row: i - 1, col: w, state: 'reading' }];
      if (canTake) {
        reads.push({ row: i - 1, col: w - item.wt, state: 'reading' });
      }

      if (canTake) {
        const takeVal = item.val + dp[i - 1][w - item.wt];
        dp[i][w] = Math.max(skipVal, takeVal);

        steps.push({
          kind: 'matrix',
          matrix: getSnapshot(),
          rowLabels,
          colLabels,
          highlightedCells: [...reads, { row: i, col: w, state: 'writing' }],
          action: 'compute-cell',
          description: `Cell [${i}, ${w}]: Compare SKIP (${skipVal}) vs TAKE (val: ${item.val} + dp[${i - 1}][${w - item.wt}] = ${takeVal}). Chosen: ${dp[i][w]}.`,
          stats: { row: i, col: w, optimalSubproblemVal: dp[i][w] },
          codeLine: 9,
        });
      } else {
        dp[i][w] = skipVal;
        steps.push({
          kind: 'matrix',
          matrix: getSnapshot(),
          rowLabels,
          colLabels,
          highlightedCells: [...reads, { row: i, col: w, state: 'writing' }],
          action: 'skip-item',
          description: `Cell [${i}, ${w}]: Item wt (${item.wt}) > capacity (${w}). Must SKIP item. Carried forward: ${skipVal}.`,
          stats: { row: i, col: w, skipped: true },
          codeLine: 11,
        });
      }
    }
  }

  steps.push({
    kind: 'matrix',
    matrix: getSnapshot(),
    rowLabels,
    colLabels,
    highlightedCells: [{ row: n, col: W, state: 'highlighted' }],
    action: 'complete',
    description: `DP Knapsack complete! Bottom-right cell dp[${n}][${W}] holds the global optimal value: ${dp[n][W]}.`,
    stats: { optimalKnapsackValue: dp[n][W], completed: true },
    codeLine: 14,
  });

  return steps;
}
