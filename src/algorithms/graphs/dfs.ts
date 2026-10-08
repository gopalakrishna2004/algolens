import type { GraphStep, AlgorithmMetadata } from '../types';
import { cloneNodes, cloneEdges } from './graphData';

export const dfsMetadata: AlgorithmMetadata = {
  id: 'dfs',
  name: 'Depth-First Search (DFS)',
  category: 'graphs',
  visualizationType: 'graph',
  difficulty: 'Beginner',
  prerequisites: ['Graphs', 'Recursion / Stacks (LIFO)', 'Backtracking'],
  timeComplexity: {
    best: 'O(V + E)',
    average: 'O(V + E)',
    worst: 'O(V + E)',
  },
  spaceComplexity: 'O(V) [Recursion Call Stack]',
  description:
    'Explores as far as possible along each branch before backtracking. Utilizes the system call stack or an explicit LIFO Stack to plunge down paths.',
  keyIdea:
    'Go deep before going wide. When a dead end or previously visited vertex is reached, backtrack to the most recent fork and explore alternate branches.',
  whenToUse: [
    'Topological Sorting in Directed Acyclic Graphs (build systems, course prerequisites).',
    'Finding strongly connected components (Kosaraju / Tarjan).',
    'Detecting cycles in graphs and solving maze search puzzles.',
  ],
  limitations: [
    'Does NOT guarantee the shortest path between two vertices.',
    'Risk of stack overflow on extremely deep graphs if recursion depth exceeds call stack limits.',
  ],
  sourceCode: {
    c: `// DFS in C
void dfs(int u, int n, int adj[][MAX], int visited[]) {
    visited[u] = 1;
    printf("%d ", u);

    for (int v = 0; v < n; v++) {
        if (adj[u][v] && !visited[v]) {
            dfs(v, n, adj, visited); // Recurse
        }
    }
}`,
    typescript: `// DFS in TypeScript
function dfs(u: string, adj: Map<string, string[]>, visited = new Set<string>()): string[] {
  visited.add(u);
  const result = [u];
  for (const v of adj.get(u) || []) {
    if (!visited.has(v)) {
      result.push(...dfs(v, adj, visited));
    }
  }
  return result;
}`,
  },
};

export function simulateDFS(): GraphStep[] {
  const nodes = cloneNodes();
  const edges = cloneEdges();
  const steps: GraphStep[] = [];

  const adj: Record<string, string[]> = {
    A: ['B', 'C'],
    B: ['D', 'C'],
    C: ['E'],
    D: ['E', 'F'],
    E: ['F'],
    F: [],
  };

  const stack: string[] = ['A'];
  const visited: string[] = [];

  steps.push({
    kind: 'graph',
    nodes: cloneNodes(nodes),
    edges: cloneEdges(edges),
    activeNodeId: 'A',
    queueOrStack: [...stack],
    visitedNodes: [...visited],
    action: 'start',
    description: 'Starting DFS from source vertex A. Pushing A to Call Stack.',
    stats: { visitedCount: 0, stackDepth: 1 },
    codeLine: 2,
  });

  function visit(curr: string) {
    visited.push(curr);
    const currNode = nodes.find((n) => n.id === curr);
    if (currNode) currNode.state = 'current';

    steps.push({
      kind: 'graph',
      nodes: cloneNodes(nodes),
      edges: cloneEdges(edges),
      activeNodeId: curr,
      queueOrStack: [...stack],
      visitedNodes: [...visited],
      action: 'visit',
      description: `DFS VISIT(${curr}): Marked vertex ${curr} as visited. Recursively exploring neighbors.`,
      stats: { current: curr, stackDepth: stack.length },
      codeLine: 3,
    });

    const neighbors = adj[curr] || [];
    for (const nbr of neighbors) {
      if (!visited.includes(nbr)) {
        stack.push(nbr);
        const edge = edges.find(
          (e) => (e.from === curr && e.to === nbr) || (e.from === nbr && e.to === curr)
        );
        if (edge) edge.state = 'included';

        steps.push({
          kind: 'graph',
          nodes: cloneNodes(nodes),
          edges: cloneEdges(edges),
          activeNodeId: curr,
          queueOrStack: [...stack],
          visitedNodes: [...visited],
          action: 'recurse',
          description: `Plunging deeper: Recursing down edge ${curr} ➔ ${nbr}.`,
          stats: { from: curr, to: nbr, stackDepth: stack.length },
          codeLine: 7,
        });

        visit(nbr);

        stack.pop();
        steps.push({
          kind: 'graph',
          nodes: cloneNodes(nodes),
          edges: cloneEdges(edges),
          activeNodeId: curr,
          queueOrStack: [...stack],
          visitedNodes: [...visited],
          action: 'backtrack',
          description: `Backtracked to vertex ${curr} after completing branch for ${nbr}.`,
          stats: { current: curr, stackDepth: stack.length },
          codeLine: 8,
        });
      }
    }

    if (currNode) currNode.state = 'visited';
  }

  visit('A');

  steps.push({
    kind: 'graph',
    nodes: cloneNodes(nodes),
    edges: cloneEdges(edges),
    visitedNodes: [...visited],
    action: 'complete',
    description: `DFS traversal complete! Visited sequence: [${visited.join(', ')}].`,
    stats: { visitedCount: visited.length },
    codeLine: 10,
  });

  return steps;
}
