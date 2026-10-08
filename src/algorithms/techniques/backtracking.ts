import type { MatrixStep, MatrixCellState, AlgorithmMetadata } from '../types';

export const backtrackingMetadata: AlgorithmMetadata = {
  id: 'backtracking',
  name: 'Backtracking (4-Queens Puzzle)',
  category: 'techniques',
  visualizationType: 'matrix',
  difficulty: 'Intermediate',
  prerequisites: ['Recursion', 'State Space Tree', 'Constraint Pruning'],
  timeComplexity: {
    best: 'O(1)',
    average: 'O(N!) [Pruned search space]',
    worst: 'O(N!)',
  },
  spaceComplexity: 'O(N) [Board and Call Stack]',
  description:
    'A refined brute-force technique that builds candidates incrementally, pruning whole subtrees of possibilities ("backtracking") as soon as a constraint is violated.',
  keyIdea:
    'Try, check constraints, recurse. If a dead end is reached, undo the previous move (backtrack) and try the next alternative candidate.',
  whenToUse: [
    'N-Queens puzzle and Sudoku solvers.',
    'Subset Sum, Permutations, and Combinations generation.',
    'Knight’s Tour and Hamiltonian Path discovery.',
  ],
  limitations: [
    'Exponential worst-case complexity without effective constraint pruning.',
    'Deep state trees require careful state cleanup during backtracks.',
  ],
  sourceCode: {
    c: `// N-Queens (Backtracking) in C
#define N 4
bool isSafe(int board[N][N], int row, int col) {
    for (int i = 0; i < col; i++) if (board[row][i]) return false;
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j]) return false;
    for (int i = row, j = col; j >= 0 && i < N; i++, j--) if (board[i][j]) return false;
    return true;
}

bool solveNQ(int board[N][N], int col) {
    if (col >= N) return true; // All queens placed
    for (int i = 0; i < N; i++) {
        if (isSafe(board, i, col)) {
            board[i][col] = 1;
            if (solveNQ(board, col + 1)) return true;
            board[i][col] = 0; // Backtrack!
        }
    }
    return false;
}`,
    typescript: `// N-Queens in TypeScript
function solveNQueens(n: number) {
  const board = Array.from({ length: n }, () => Array(n).fill('.'));
  // Recursive backtracking function...
}`,
  },
};

export function simulateBacktracking(): MatrixStep[] {
  const N = 4;
  const board: string[][] = Array.from({ length: N }, () => Array(N).fill('·'));
  const steps: MatrixStep[] = [];
  const stack: string[] = [];

  const rowLabels = ['Row 0', 'Row 1', 'Row 2', 'Row 3'];
  const colLabels = ['Col 0', 'Col 1', 'Col 2', 'Col 3'];

  const getSnapshot = () => board.map((r) => [...r]);

  steps.push({
    kind: 'matrix',
    matrix: getSnapshot(),
    rowLabels,
    colLabels,
    currentCallStack: [...stack],
    action: 'start',
    description: 'Starting 4-Queens Backtracking. Goal: Place 4 non-attacking Queens on 4x4 board.',
    stats: { queensPlaced: 0, boardSize: N },
    codeLine: 11,
  });

  function isSafe(row: number, col: number): boolean {
    // Check horizontal left
    for (let j = 0; j < col; j++) {
      if (board[row][j] === '♛') return false;
    }
    // Check upper left diagonal
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === '♛') return false;
    }
    // Check lower left diagonal
    for (let i = row, j = col; i < N && j >= 0; i++, j--) {
      if (board[i][j] === '♛') return false;
    }
    return true;
  }

  function solve(col: number): boolean {
    if (col >= N) {
      steps.push({
        kind: 'matrix',
        matrix: getSnapshot(),
        rowLabels,
        colLabels,
        currentCallStack: [...stack],
        action: 'solved',
        description: 'SUCCESS! All 4 Queens placed in mutually safe configurations.',
        stats: { queensPlaced: 4, solved: true },
        codeLine: 12,
      });
      return true;
    }

    stack.push(`placeCol(${col})`);

    for (let row = 0; row < N; row++) {
      const safe = isSafe(row, col);

      const inspectCell: MatrixCellState[] = [{ row, col, state: safe ? 'writing' : 'reading' }];

      steps.push({
        kind: 'matrix',
        matrix: getSnapshot(),
        rowLabels,
        colLabels,
        highlightedCells: inspectCell,
        currentCallStack: [...stack],
        action: 'test-cell',
        description: `Testing Queen at (${row}, ${col}). ${safe ? 'No diagonal/row conflicts. Safe!' : 'Conflict detected with existing Queen! Cannot place here.'}`,
        stats: { row, col, safe },
        codeLine: 14,
      });

      if (safe) {
        board[row][col] = '♛';
        steps.push({
          kind: 'matrix',
          matrix: getSnapshot(),
          rowLabels,
          colLabels,
          highlightedCells: [{ row, col, state: 'writing' }],
          currentCallStack: [...stack],
          action: 'place-queen',
          description: `Placed ♛ at (${row}, ${col}). Recursing to place Queen in Column ${col + 1}.`,
          stats: { placedAt: `[${row},${col}]` },
          codeLine: 15,
        });

        if (solve(col + 1)) return true;

        // Backtrack
        board[row][col] = '·';
        steps.push({
          kind: 'matrix',
          matrix: getSnapshot(),
          rowLabels,
          colLabels,
          highlightedCells: [{ row, col, state: 'highlighted' }],
          currentCallStack: [...stack],
          action: 'backtrack',
          description: `BACKTRACK: Dead end in Column ${col + 1}. Removed ♛ from (${row}, ${col}) and trying next row.`,
          stats: { removedFrom: `[${row},${col}]` },
          codeLine: 17,
        });
      }
    }

    stack.pop();
    return false;
  }

  solve(0);
  return steps;
}
