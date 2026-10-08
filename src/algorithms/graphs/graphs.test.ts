import { describe, it, expect } from 'vitest';
import { simulateBFS } from './bfs';
import { simulateDFS } from './dfs';
import { simulateDijkstra } from './dijkstra';
import { simulatePrim } from './prim';
import { simulateKruskal } from './kruskal';

describe('Chapter 5: Graphs', () => {
  it('simulates BFS traversing level by level using a queue', () => {
    const steps = simulateBFS();
    expect(steps.length).toBeGreaterThan(4);
    expect(steps.every((s) => s.kind === 'graph')).toBe(true);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.visitedNodes?.length).toBe(6);
    expect(lastStep.visitedNodes?.[0]).toBe('A');
  });

  it('simulates DFS traversing depth-first along paths', () => {
    const steps = simulateDFS();
    expect(steps.length).toBeGreaterThan(4);
    expect(steps.every((s) => s.kind === 'graph')).toBe(true);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.visitedNodes?.length).toBe(6);
    expect(lastStep.visitedNodes?.[0]).toBe('A');
  });

  it("simulates Dijkstra's single-source shortest path calculation", () => {
    const steps = simulateDijkstra();
    expect(steps.length).toBeGreaterThan(4);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.visitedNodes?.length).toBe(6);
  });

  it("simulates Prim's Minimum Spanning Tree cut expansion", () => {
    const steps = simulatePrim();
    expect(steps.length).toBeGreaterThan(4);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.mstEdges?.length).toBe(5); // 6 vertices -> 5 edges
    expect(lastStep.stats.totalWeight).toBeGreaterThan(0);
  });

  it("simulates Kruskal's Minimum Spanning Tree edge union-find", () => {
    const steps = simulateKruskal();
    expect(steps.length).toBeGreaterThan(4);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.mstEdges?.length).toBe(5);
    const hasDiscarded = steps.some((s) => s.action === 'discard-cycle');
    expect(hasDiscarded).toBe(true);
  });
});
