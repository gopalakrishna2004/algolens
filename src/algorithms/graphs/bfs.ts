import type { GraphStep, AlgorithmMetadata } from '../types';
import { cloneNodes, cloneEdges } from './graphData';

export const bfsMetadata: AlgorithmMetadata = {
  id: 'bfs',
  name: 'Breadth-First Search (BFS)',
  category: 'graphs',
  visualizationType: 'graph',
  difficulty: 'Beginner',
  prerequisites: ['Graphs', 'Queues (FIFO)', 'Adjacency List'],
  timeComplexity: {
    best: 'O(V + E)',
    average: 'O(V + E)',
    worst: 'O(V + E)',
  },
  spaceComplexity: 'O(V) [Queue and Visited Array]',
  description:
    'Explores graph vertices layer by layer radiating outwards from the starting vertex. Uses a FIFO Queue to ensure all neighbors at distance k are processed before vertices at distance k+1.',
  keyIdea:
    'Queue-based level-order traversal. Guarantees the shortest path (in terms of minimum number of edges) on unweighted graphs.',
  whenToUse: [
    'Finding the shortest path in unweighted networks or game grids (mazes).',
    'Broadcasting packets in peer-to-peer networks and web crawlers.',
    'Finding connected components and cycle detection in undirected graphs.',
  ],
  limitations: [
    'Memory-intensive on wide graphs (stores all vertices of current frontier in memory).',
    'Does not calculate true shortest path on graphs with varying edge weights (use Dijkstra instead).',
  ],
  sourceCode: {
    c: `// BFS in C
void bfs(int start, int n, int adj[][MAX]) {
    int visited[MAX] = {0};
    int queue[MAX], front = 0, rear = 0;

    visited[start] = 1;
    queue[rear++] = start;

    while (front < rear) {
        int u = queue[front++];
        printf("%d ", u);

        for (int v = 0; v < n; v++) {
            if (adj[u][v] && !visited[v]) {
                visited[v] = 1;
                queue[rear++] = v;
            }
        }
    }
}`,
    typescript: `// BFS in TypeScript
function bfs(start: string, adj: Map<string, string[]>): string[] {
  const visited = new Set<string>([start]);
  const queue = [start];
  const order: string[] = [];

  while (queue.length > 0) {
    const u = queue.shift()!;
    order.push(u);
    for (const v of adj.get(u) || []) {
      if (!visited.has(v)) {
        visited.add(v);
        queue.push(v);
      }
    }
  }
  return order;
}`,
  },
};

export function simulateBFS(): GraphStep[] {
  const nodes = cloneNodes();
  const edges = cloneEdges();
  const steps: GraphStep[] = [];

  // Build adjacency lookup
  const adj: Record<string, string[]> = {
    A: ['B', 'C'],
    B: ['A', 'C', 'D'],
    C: ['A', 'B', 'E'],
    D: ['B', 'E', 'F'],
    E: ['C', 'D', 'F'],
    F: ['D', 'E'],
  };

  const queue: string[] = ['A'];
  const visited: string[] = ['A'];

  nodes[0].state = 'visiting';

  steps.push({
    kind: 'graph',
    nodes: cloneNodes(nodes),
    edges: cloneEdges(edges),
    activeNodeId: 'A',
    queueOrStack: [...queue],
    visitedNodes: [...visited],
    action: 'start',
    description: 'Starting BFS from source vertex A. Added A to Queue and marked visited.',
    stats: { visitedCount: 1, queueSize: 1 },
    codeLine: 6,
  });

  while (queue.length > 0) {
    const curr = queue.shift()!;
    const currNode = nodes.find((n) => n.id === curr);
    if (currNode) currNode.state = 'current';

    steps.push({
      kind: 'graph',
      nodes: cloneNodes(nodes),
      edges: cloneEdges(edges),
      activeNodeId: curr,
      queueOrStack: [...queue],
      visitedNodes: [...visited],
      action: 'dequeue',
      description: `DEQUEUE(${curr}): Processing vertex ${curr} from front of line. Inspecting adjacent neighbors.`,
      stats: { current: curr, queueSize: queue.length },
      codeLine: 10,
    });

    const neighbors = adj[curr] || [];
    for (const nbr of neighbors) {
      if (!visited.includes(nbr)) {
        visited.push(nbr);
        queue.push(nbr);

        const nbrNode = nodes.find((n) => n.id === nbr);
        if (nbrNode) nbrNode.state = 'visiting';

        const activeEdge = edges.find(
          (e) => (e.from === curr && e.to === nbr) || (e.from === nbr && e.to === curr)
        );
        if (activeEdge) activeEdge.state = 'included';

        steps.push({
          kind: 'graph',
          nodes: cloneNodes(nodes),
          edges: cloneEdges(edges),
          activeNodeId: curr,
          queueOrStack: [...queue],
          visitedNodes: [...visited],
          action: 'enqueue-neighbor',
          description: `Discovered unvisited neighbor ${nbr}! Enqueued to frontier and highlighted traversal edge.`,
          stats: { discovered: nbr, queueSize: queue.length },
          codeLine: 15,
        });
      }
    }

    if (currNode) currNode.state = 'visited';
  }

  steps.push({
    kind: 'graph',
    nodes: cloneNodes(nodes),
    edges: cloneEdges(edges),
    visitedNodes: [...visited],
    action: 'complete',
    description: `BFS traversal finished! All reachable vertices visited in level order: [${visited.join(', ')}].`,
    stats: { visitedCount: visited.length },
    codeLine: 20,
  });

  return steps;
}
