import type { GraphStep, AlgorithmMetadata } from '../types';
import { cloneNodes, cloneEdges } from './graphData';

export const dijkstraMetadata: AlgorithmMetadata = {
  id: 'dijkstra',
  name: "Dijkstra's Shortest Path",
  category: 'graphs',
  visualizationType: 'graph',
  difficulty: 'Intermediate',
  prerequisites: ['Graphs', 'Priority Queues / Min-Heap', 'Greedy Choice Property'],
  timeComplexity: {
    best: 'O((V + E) log V)',
    average: 'O((V + E) log V)',
    worst: 'O(V^2) [Matrix implementation]',
  },
  spaceComplexity: 'O(V) [Distances and Visited Table]',
  description:
    "Computes the single-source shortest path from a start vertex to all other vertices in a weighted graph with non-negative edge weights using a greedy priority strategy.",
  keyIdea:
    'Greedy relaxation. Always finalize the unvisited vertex with the smallest tentative distance, then relax its outgoing edges: if dist[u] + weight < dist[v], update dist[v].',
  whenToUse: [
    'GPS road navigation and map routing engines (Google Maps, OpenStreetMap).',
    'Network routing protocols (OSPF - Open Shortest Path First).',
    'Telecommunication bandwidth and latency routing.',
  ],
  limitations: [
    'FAILS if negative edge weights exist (use Bellman-Ford algorithm instead).',
    'Dense graphs without a min-heap have higher overhead O(V^2).',
  ],
  sourceCode: {
    c: `// Dijkstra in C
void dijkstra(int graph[V][V], int src) {
    int dist[V], visited[V] = {0};
    for (int i = 0; i < V; i++) dist[i] = INT_MAX;
    dist[src] = 0;

    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, visited);
        visited[u] = 1;

        for (int v = 0; v < V; v++) {
            if (!visited[v] && graph[u][v] && dist[u] != INT_MAX
                && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v]; // Relaxation
            }
        }
    }
}`,
    typescript: `// Dijkstra in TypeScript
function dijkstra(src: string, nodes: string[], edges: { from: string; to: string; weight: number }[]) {
  const dist: Record<string, number> = {};
  const visited = new Set<string>();
  nodes.forEach(n => dist[n] = Infinity);
  dist[src] = 0;

  for (let i = 0; i < nodes.length; i++) {
    const u = nodes.filter(n => !visited.has(n)).reduce((min, n) => dist[n] < dist[min] ? n : min, nodes[0]);
    visited.add(u);
    // Relax edges...
  }
  return dist;
}`,
  },
};

export function simulateDijkstra(): GraphStep[] {
  const nodes = cloneNodes();
  const edges = cloneEdges();
  const steps: GraphStep[] = [];

  const dist: Record<string, number> = {
    A: 0,
    B: Infinity,
    C: Infinity,
    D: Infinity,
    E: Infinity,
    F: Infinity,
  };

  nodes.forEach((n) => {
    n.distance = dist[n.id];
  });

  const visited: string[] = [];

  steps.push({
    kind: 'graph',
    nodes: cloneNodes(nodes),
    edges: cloneEdges(edges),
    activeNodeId: 'A',
    visitedNodes: [...visited],
    action: 'init',
    description: "Initialized Dijkstra from source 'A'. dist[A] = 0, all other distances = ∞.",
    stats: { current: 'A', distA: 0 },
    codeLine: 5,
  });

  while (visited.length < nodes.length) {
    // Select unvisited vertex with min distance
    let u = '';
    let minDist = Infinity;
    for (const n of nodes) {
      if (!visited.includes(n.id) && dist[n.id] < minDist) {
        minDist = dist[n.id];
        u = n.id;
      }
    }

    if (!u || minDist === Infinity) break;

    visited.push(u);
    const uNode = nodes.find((n) => n.id === u);
    if (uNode) uNode.state = 'current';

    steps.push({
      kind: 'graph',
      nodes: cloneNodes(nodes),
      edges: cloneEdges(edges),
      activeNodeId: u,
      visitedNodes: [...visited],
      action: 'select-min',
      description: `GREEDY SELECT: Finalized vertex ${u} with shortest tentative distance (${minDist}).`,
      stats: { selected: u, distance: minDist },
      codeLine: 8,
    });

    // Relax all edges from u
    const incidentEdges = edges.filter(
      (e) => (e.from === u || e.to === u) && (!visited.includes(e.from) || !visited.includes(e.to))
    );

    for (const edge of incidentEdges) {
      const v = edge.from === u ? edge.to : edge.from;
      if (visited.includes(v)) continue;

      const weight = edge.weight ?? 1;
      edge.state = 'considering';

      steps.push({
        kind: 'graph',
        nodes: cloneNodes(nodes),
        edges: cloneEdges(edges),
        activeNodeId: u,
        visitedNodes: [...visited],
        action: 'inspect-edge',
        description: `Inspecting edge (${u} ➔ ${v}, weight: ${weight}). Potential distance = ${dist[u]} + ${weight} = ${dist[u] + weight}. Current dist[${v}] = ${dist[v] === Infinity ? '∞' : dist[v]}.`,
        stats: { candidate: v, cost: dist[u] + weight },
        codeLine: 13,
      });

      if (dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
        const vNode = nodes.find((n) => n.id === v);
        if (vNode) {
          vNode.distance = dist[v];
          vNode.state = 'visiting';
        }
        edge.state = 'included';

        steps.push({
          kind: 'graph',
          nodes: cloneNodes(nodes),
          edges: cloneEdges(edges),
          activeNodeId: v,
          visitedNodes: [...visited],
          action: 'relax',
          description: `RELAXATION: Updated dist[${v}] = ${dist[v]} via edge (${u} ➔ ${v})!`,
          stats: { relaxed: v, newDist: dist[v] },
          codeLine: 14,
        });
      } else {
        edge.state = 'default';
      }
    }

    if (uNode) uNode.state = 'visited';
  }

  steps.push({
    kind: 'graph',
    nodes: cloneNodes(nodes),
    edges: cloneEdges(edges),
    visitedNodes: [...visited],
    action: 'complete',
    description: `Dijkstra complete! Shortest distances from A: ${Object.entries(dist)
      .map(([k, d]) => `${k}:${d}`)
      .join(', ')}.`,
    stats: { visitedCount: visited.length, finalized: true },
    codeLine: 17,
  });

  return steps;
}
