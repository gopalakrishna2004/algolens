import type { MatrixStep, AlgorithmMetadata } from '../types';

export const greedyMetadata: AlgorithmMetadata = {
  id: 'greedy',
  name: 'Greedy Algorithms (Activity Selection)',
  category: 'techniques',
  visualizationType: 'matrix',
  difficulty: 'Intermediate',
  prerequisites: ['Sorting', 'Greedy Choice Property', 'Optimal Substructure'],
  timeComplexity: {
    best: 'O(n log n) [Sorting]',
    average: 'O(n log n)',
    worst: 'O(n log n)',
  },
  spaceComplexity: 'O(1) auxiliary',
  description:
    'An algorithmic paradigm that builds up a solution piece by piece, always making the choice that looks best at the current moment (local optimum) in hopes of finding the global optimum.',
  keyIdea:
    'Greedy Choice Property. In Activity Selection, always pick the activity that finishes earliest! This leaves maximum remaining time for subsequent activities.',
  whenToUse: [
    'Interval scheduling and CPU process scheduling.',
    'Minimum Spanning Trees (Kruskal, Prim) and Shortest Paths (Dijkstra).',
    'Huffman Coding for lossless data compression.',
    'Fractional Knapsack problem.',
  ],
  limitations: [
    'Fails for problems where local optimal choices prevent reaching the global optimum (e.g. 0/1 Knapsack, longest path).',
    'Requires rigorous mathematical proof of correctness (exchange argument).',
  ],
  sourceCode: {
    c: `// Activity Selection (Greedy) in C
void selectActivities(int s[], int f[], int n) {
    // Assumes activities already sorted by finish time f[]
    int i = 0;
    printf("Selected: %d ", i); // First activity always selected

    for (int j = 1; j < n; j++) {
        if (s[j] >= f[i]) {
            printf("%d ", j);
            i = j; // Update last finish
        }
    }
}`,
    typescript: `// Greedy Activity Selection in TypeScript
function selectActivities(acts: { id: string; start: number; end: number }[]) {
  acts.sort((a, b) => a.end - b.end);
  const selected = [acts[0]];
  let lastEnd = acts[0].end;
  for (let i = 1; i < acts.length; i++) {
    if (acts[i].start >= lastEnd) {
      selected.push(acts[i]);
      lastEnd = acts[i].end;
    }
  }
  return selected;
}`,
  },
};

export function simulateGreedy(): MatrixStep[] {
  const steps: MatrixStep[] = [];

  const activities = [
    { id: 'A1', start: 1, end: 3 },
    { id: 'A2', start: 2, end: 5 },
    { id: 'A3', start: 4, end: 7 },
    { id: 'A4', start: 1, end: 8 },
    { id: 'A5', start: 5, end: 9 },
    { id: 'A6', start: 8, end: 10 },
  ];

  const colLabels = ['Activity', 'Start Time', 'Finish Time', 'Decision'];
  const rowLabels = activities.map((a) => a.id);

  const getMatrix = (decisions: string[]) => {
    return activities.map((a, i) => [
      a.id,
      a.start,
      a.end,
      decisions[i] ?? 'Pending',
    ]);
  };

  const decisions: string[] = Array(activities.length).fill('Pending');

  steps.push({
    kind: 'matrix',
    matrix: getMatrix(decisions),
    colLabels,
    rowLabels,
    action: 'init',
    description: `Activities sorted by Finish Time: ${activities.map((a) => `${a.id}[${a.start}-${a.end}]`).join(', ')}.`,
    stats: { totalActivities: activities.length, selectedCount: 0 },
    codeLine: 4,
  });

  // Always greedily select the first activity
  decisions[0] = 'ACCEPTED';
  let lastEnd = activities[0].end;

  steps.push({
    kind: 'matrix',
    matrix: getMatrix(decisions),
    colLabels,
    rowLabels,
    highlightedCells: [{ row: 0, col: 3, state: 'writing' }],
    action: 'select-first',
    description: `GREEDY CHOICE: Selected A1 (finishes earliest at time 3). Leaves max remaining time!`,
    stats: { selected: 'A1', finishTime: 3, totalSelected: 1 },
    codeLine: 5,
  });

  for (let i = 1; i < activities.length; i++) {
    const act = activities[i];
    const isCompatible = act.start >= lastEnd;

    steps.push({
      kind: 'matrix',
      matrix: getMatrix(decisions),
      colLabels,
      rowLabels,
      highlightedCells: [
        { row: i, col: 1, state: 'reading' },
        { row: i, col: 3, state: 'highlighted' },
      ],
      action: 'compare',
      description: `Testing ${act.id}: Start time (${act.start}) vs Last finish time (${lastEnd}). ${isCompatible ? `${act.start} >= ${lastEnd} ➔ Compatible!` : `${act.start} < ${lastEnd} ➔ Conflict!`}`,
      stats: { currentAct: act.id, actStart: act.start, lastFinish: lastEnd },
      codeLine: 8,
    });

    if (isCompatible) {
      decisions[i] = 'ACCEPTED';
      lastEnd = act.end;

      steps.push({
        kind: 'matrix',
        matrix: getMatrix(decisions),
        colLabels,
        rowLabels,
        highlightedCells: [{ row: i, col: 3, state: 'writing' }],
        action: 'accept',
        description: `ACCEPTED ${act.id}: No time overlap. New last finish time = ${lastEnd}.`,
        stats: { accepted: act.id, newFinish: lastEnd },
        codeLine: 10,
      });
    } else {
      decisions[i] = 'REJECTED';
      steps.push({
        kind: 'matrix',
        matrix: getMatrix(decisions),
        colLabels,
        rowLabels,
        highlightedCells: [{ row: i, col: 3, state: 'reading' }],
        action: 'reject',
        description: `REJECTED ${act.id}: Conflicts with previously scheduled activity (starts at ${act.start} before ${lastEnd}).`,
        stats: { rejected: act.id },
        codeLine: 8,
      });
    }
  }

  const selectedCount = decisions.filter((d) => d === 'ACCEPTED').length;
  steps.push({
    kind: 'matrix',
    matrix: getMatrix(decisions),
    colLabels,
    rowLabels,
    action: 'complete',
    description: `Greedy selection complete! Maximum compatible activities scheduled: ${selectedCount} out of ${activities.length}.`,
    stats: { totalSelected: selectedCount, optimal: true },
    codeLine: 12,
  });

  return steps;
}
