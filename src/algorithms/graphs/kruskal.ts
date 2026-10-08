import type { GraphStep, AlgorithmMetadata } from '../types';
import { cloneNodes, cloneEdges } from './graphData';

export const kruskalMetadata: AlgorithmMetadata = {
  id: 'kruskal',
  name: "Kruskal's Minimum Spanning Tree",
  category: 'graphs',
  visualizationType: 'graph',
  difficulty: 'Intermediate',
  prerequisites: ['Graphs', 'Disjoint Set Union (DSU / Union-Find)', 'Sorting', 'Cycle Detection'],
  timeComplexity: {
    best: 'O(E log E)',
    average: 'O(E log E)',
    worst: 'O(E log E) [Sorting Edges]',
  },
  spaceComplexity: 'O(V + E) [DSU parent and rank arrays]',
  description:
    'A greedy algorithm that finds a Minimum Spanning Tree by sorting all graph edges in non-decreasing order of weight and adding them one-by-one, skipping any edge that would create a cycle (using Disjoint Set Union).',
  keyIdea:
    'Edge-growing greedy approach. Sort all edges globally. Pick the lowest weight edge: if its endpoints belong to different connected components, merge them; otherwise discard to avoid cycles.',
  whenToUse: [
    'Sparse graphs with many vertices but relatively few edges (E << V^2).',
    'Cluster analysis and minimum-cost spanning network layouts.',
    'When edges are already presorted or can be sorted rapidly.',
  ],
  limitations: [
    'Sorting all E edges can be slower than Prim on very dense graphs where E ≈ V^2.',
    'Requires an efficient Union-Find data structure with path compression.',
  ],
  sourceCode: {
    c: `// Kruskal's Algorithm in C
int find(int parent[], int i) {
    if (parent[i] == i) return i;
    return parent[i] = find(parent, parent[i]); // Path compression
}

void unionSets(int parent[], int rank[], int x, int y) {
    int rootX = find(parent, x), rootY = find(parent, y);
    if (rank[rootX] < rank[rootY]) parent[rootX] = rootY;
    else if (rank[rootX] > rank[rootY]) parent[rootY] = rootX;
    else { parent[rootY] = rootX; rank[rootX]++; }
}

void kruskal(Edge edges[], int V, int E) {
    qsort(edges, E, sizeof(Edge), compare);
    int parent[V], rank[V];
    // Iterate sorted edges and add if find(u) != find(v)...
}`,
    typescript: `// Kruskal's in TypeScript
function kruskal(edges: Edge[], numVertices: number) {
  edges.sort((a, b) => a.weight - b.weight);
  const dsu = new DSU(numVertices);
  const mst: Edge[] = [];
  for (const e of edges) {
    if (dsu.union(e.u, e.v)) mst.push(e);
  }
  return mst;
}`,
  },
};

export function simulateKruskal(): GraphStep[] {
  const nodes = cloneNodes();
  const edges = cloneEdges();
  const steps: GraphStep[] = [];

  // Sort edges by weight ascending
  const sortedEdges = [...edges].sort((a, b) => (a.weight ?? 0) - (b.weight ?? 0));

  // Disjoint Set Union
  const parent: Record<string, string> = {};
  nodes.forEach((n) => (parent[n.id] = n.id));

  function find(i: string): string {
    if (parent[i] === i) return i;
    parent[i] = find(parent[i]);
    return parent[i];
  }

  function union(i: string, j: string): boolean {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI === rootJ) return false;
    parent[rootI] = rootJ;
    return true;
  }

  const mstEdges: { from: string; to: string }[] = [];
  let totalWeight = 0;

  steps.push({
    kind: 'graph',
    nodes: cloneNodes(nodes),
    edges: cloneEdges(edges),
    action: 'start',
    description: `Sorted all ${edges.length} edges by weight: [${sortedEdges
      .map((e) => `${e.from}-${e.to}(${e.weight})`)
      .join(', ')}]. Each vertex starts in its own disjoint set.`,
    stats: { totalEdges: edges.length, totalWeight: 0 },
    codeLine: 16,
  });

  for (const edge of sortedEdges) {
    const origEdge = edges.find((e) => e.from === edge.from && e.to === edge.to);
    if (origEdge) origEdge.state = 'considering';

    const rootU = find(edge.from);
    const rootV = find(edge.to);

    steps.push({
      kind: 'graph',
      nodes: cloneNodes(nodes),
      edges: cloneEdges(edges),
      action: 'check-edge',
      description: `Testing edge (${edge.from} ➔ ${edge.to}, weight: ${edge.weight}): root(${edge.from}) = ${rootU}, root(${edge.to}) = ${rootV}.`,
      stats: { edge: `${edge.from}-${edge.to}`, weight: edge.weight },
      codeLine: 20,
    });

    if (rootU !== rootV) {
      union(edge.from, edge.to);
      if (origEdge) origEdge.state = 'included';
      mstEdges.push({ from: edge.from, to: edge.to });
      totalWeight += edge.weight ?? 0;

      const uNode = nodes.find((n) => n.id === edge.from);
      const vNode = nodes.find((n) => n.id === edge.to);
      if (uNode) uNode.state = 'visited';
      if (vNode) vNode.state = 'visited';

      steps.push({
        kind: 'graph',
        nodes: cloneNodes(nodes),
        edges: cloneEdges(edges),
        mstEdges: [...mstEdges],
        action: 'include-edge',
        description: `ACCEPTED: (${edge.from} ➔ ${edge.to}) connects disjoint components! Merged sets. Total weight = ${totalWeight}.`,
        stats: { totalWeight, mstEdgeCount: mstEdges.length },
        codeLine: 21,
      });

      if (mstEdges.length === nodes.length - 1) break;
    } else {
      if (origEdge) origEdge.state = 'discarded';
      steps.push({
        kind: 'graph',
        nodes: cloneNodes(nodes),
        edges: cloneEdges(edges),
        mstEdges: [...mstEdges],
        action: 'discard-cycle',
        description: `DISCARDED: (${edge.from} ➔ ${edge.to}) would form a CYCLE! Both endpoints are already in component ${rootU}.`,
        stats: { totalWeight, rejected: `${edge.from}-${edge.to}` },
        codeLine: 22,
      });
    }
  }

  steps.push({
    kind: 'graph',
    nodes: cloneNodes(nodes),
    edges: cloneEdges(edges),
    mstEdges: [...mstEdges],
    action: 'complete',
    description: `Kruskal's MST complete! Selected ${mstEdges.length} edges. Optimal spanning tree cost = ${totalWeight}.`,
    stats: { totalWeight, mstEdges: mstEdges.length, isOptimal: true },
    codeLine: 24,
  });

  return steps;
}
