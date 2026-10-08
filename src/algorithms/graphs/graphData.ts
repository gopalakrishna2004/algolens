import type { VisualGraphNode, VisualGraphEdge } from '../types';

export const BASE_GRAPH_NODES: VisualGraphNode[] = [
  { id: 'A', label: 'A', x: 80, y: 150, state: 'unvisited' },
  { id: 'B', label: 'B', x: 220, y: 70, state: 'unvisited' },
  { id: 'C', label: 'C', x: 220, y: 230, state: 'unvisited' },
  { id: 'D', label: 'D', x: 420, y: 70, state: 'unvisited' },
  { id: 'E', label: 'E', x: 420, y: 230, state: 'unvisited' },
  { id: 'F', label: 'F', x: 560, y: 150, state: 'unvisited' },
];

export const BASE_GRAPH_EDGES: VisualGraphEdge[] = [
  { from: 'A', to: 'B', weight: 4, state: 'default' },
  { from: 'A', to: 'C', weight: 2, state: 'default' },
  { from: 'B', to: 'C', weight: 1, state: 'default' },
  { from: 'B', to: 'D', weight: 5, state: 'default' },
  { from: 'C', to: 'E', weight: 8, state: 'default' },
  { from: 'D', to: 'E', weight: 2, state: 'default' },
  { from: 'D', to: 'F', weight: 6, state: 'default' },
  { from: 'E', to: 'F', weight: 3, state: 'default' },
];

export function cloneNodes(nodes: VisualGraphNode[] = BASE_GRAPH_NODES): VisualGraphNode[] {
  return nodes.map((n) => ({ ...n }));
}

export function cloneEdges(edges: VisualGraphEdge[] = BASE_GRAPH_EDGES): VisualGraphEdge[] {
  return edges.map((e) => ({ ...e }));
}
