import type { GraphStep, AlgorithmMetadata } from '../types';
import { cloneNodes, cloneEdges } from './graphData';

export const primMetadata: AlgorithmMetadata = {
  id: 'prim',
  name: "Prim's Minimum Spanning Tree",
  category: 'graphs',
  visualizationType: 'graph',
  difficulty: 'Intermediate',
  prerequisites: ['Graphs', 'Spanning Trees', 'Greedy Strategy', 'Min-Heap / Cuts'],
  timeComplexity: {
    best: 'O((V + E) log V)',
    average: 'O((V + E) log V)',
    worst: 'O(V^2)',
  },
  spaceComplexity: 'O(V) [Key and InMST Arrays]',
  description:
    'A greedy algorithm that finds a Minimum Spanning Tree for a weighted undirected graph. Grows a single tree from an arbitrary starting vertex by always picking the cheapest edge connecting the tree to an outside vertex.',
  keyIdea:
    'Vertex-growing greedy approach. Divide vertices into visited (in tree) and unvisited. At each step, cross the cut using the smallest weight edge available.',
  whenToUse: [
    'Designing physical distribution networks with minimal cable/pipe cost (telecom fiber, water pipelines, electricity grid).',
    'Cluster analysis and approximation algorithms for NP-hard problems (Traveling Salesperson).',
    'Circuit design and wire routing on microchips.',
  ],
  limitations: [
    'Requires an undirected connected graph.',
    'Dense graphs benefit from Prim, while sparse graphs are often faster with Kruskal.',
  ],
  sourceCode: {
    c: `// Prim's Algorithm in C
void primMST(int graph[V][V]) {
    int parent[V], key[V], inMST[V] = {0};
    for (int i = 0; i < V; i++) key[i] = INT_MAX;
    key[0] = 0; parent[0] = -1;

    for (int count = 0; count < V - 1; count++) {
        int u = minKey(key, inMST);
        inMST[u] = 1;

        for (int v = 0; v < V; v++) {
            if (graph[u][v] && !inMST[v] && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v];
            }
        }
    }
}`,
    typescript: `// Prim's in TypeScript
function prim(nodes: string[], edges: { from: string; to: string; weight: number }[]) {
  const inMST = new Set<string>(['A']);
  const mstEdges: typeof edges = [];
  while (inMST.size < nodes.length) {
    // Find min edge connecting inMST to outside...
  }
  return mstEdges;
}`,
  },
};

export function simulatePrim(): GraphStep[] {
  const nodes = cloneNodes();
  const edges = cloneEdges();
  const steps: GraphStep[] = [];

  const inMST: string[] = ['A'];
  let totalWeight = 0;
  const mstEdges: { from: string; to: string }[] = [];

  nodes[0].state = 'visited';

  steps.push({
    kind: 'graph',
    nodes: cloneNodes(nodes),
    edges: cloneEdges(edges),
    activeNodeId: 'A',
    visitedNodes: [...inMST],
    mstEdges: [...mstEdges],
    action: 'start',
    description: "Starting Prim's MST from initial seed vertex A.",
    stats: { totalWeight: 0, mstSize: 1 },
    codeLine: 5,
  });

  while (inMST.length < nodes.length) {
    // Find smallest edge crossing cut (one end in inMST, one outside)
    let bestEdgeIndex = -1;
    let minWeight = Infinity;
    let nextVertex = '';

    for (let i = 0; i < edges.length; i++) {
      const e = edges[i];
      const hasU = inMST.includes(e.from);
      const hasV = inMST.includes(e.to);

      if ((hasU && !hasV) || (!hasU && hasV)) {
        if ((e.weight ?? Infinity) < minWeight) {
          minWeight = e.weight!;
          bestEdgeIndex = i;
          nextVertex = hasU ? e.to : e.from;
        }
      }
    }

    if (bestEdgeIndex === -1) break;

    const chosenEdge = edges[bestEdgeIndex];
    chosenEdge.state = 'included';
    inMST.push(nextVertex);
    totalWeight += minWeight;
    mstEdges.push({ from: chosenEdge.from, to: chosenEdge.to });

    const nextNode = nodes.find((n) => n.id === nextVertex);
    if (nextNode) nextNode.state = 'visited';

    steps.push({
      kind: 'graph',
      nodes: cloneNodes(nodes),
      edges: cloneEdges(edges),
      activeNodeId: nextVertex,
      visitedNodes: [...inMST],
      mstEdges: [...mstEdges],
      action: 'add-edge',
      description: `GREEDY CUT SELECTION: Selected lightest crossing edge (${chosenEdge.from} ➔ ${chosenEdge.to}, weight: ${minWeight}). Added vertex ${nextVertex} to MST.`,
      stats: { totalWeight, added: nextVertex, edgeWeight: minWeight },
      codeLine: 12,
    });
  }

  steps.push({
    kind: 'graph',
    nodes: cloneNodes(nodes),
    edges: cloneEdges(edges),
    visitedNodes: [...inMST],
    mstEdges: [...mstEdges],
    action: 'complete',
    description: `Prim's MST successfully formed! ${nodes.length - 1} edges connecting all ${nodes.length} vertices. Total MST Cost = ${totalWeight}.`,
    stats: { totalWeight, isSpanning: true },
    codeLine: 18,
  });

  return steps;
}
