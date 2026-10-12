import React from 'react';
import type { GraphStep } from '../../algorithms/types';
import './GraphVisualizer.css';

interface GraphVisualizerProps {
  step: GraphStep;
}

export const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ step }) => {
  const { nodes, edges, activeNodeId, queueOrStack, visitedNodes = [], action, stats } = step;

  // Map nodes to coordinates lookup
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <div className="graph-stage">
      {/* Top Banner: Action & Auxiliary Structures */}
      <div className="graph-telemetry-strip">
        <div className="graph-op-tag">
          {action ? action : 'Graph Operation'}
        </div>

        {queueOrStack && queueOrStack.length > 0 && (
          <div className="graph-aux-collection">
            <span>Frontier:</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {queueOrStack.map((item, idx) => (
                <span key={idx} className="graph-aux-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {visitedNodes.length > 0 && (
          <div className="graph-visited-summary">
            <span>Visited:</span>
            <strong>[{visitedNodes.join(', ')}]</strong>
          </div>
        )}
      </div>

      {/* Wide SVG Graph Viewport */}
      <div className="graph-viewport-frame">
        <svg
          viewBox="0 0 650 320"
          className="graph-svg-canvas"
        >
          <defs>
            {/* Subtle paper dot grid */}
            <pattern id="graph-lab-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="0.8" fill="var(--border-subtle)" />
            </pattern>
          </defs>

          {/* Grid background */}
          <rect width="650" height="320" fill="var(--bg-canvas)" />
          <rect width="650" height="320" fill="url(#graph-lab-grid)" />

          {/* Edges */}
          {edges.map((e, idx) => {
            const u = nodeMap.get(e.from);
            const v = nodeMap.get(e.to);
            if (!u || !v || u.x === undefined || u.y === undefined || v.x === undefined || v.y === undefined) return null;

            let stroke = 'var(--border-strong)';
            let strokeWidth = 2;
            let strokeDasharray = undefined;

            if (e.state === 'included') {
              stroke = 'var(--accent-emerald)';
              strokeWidth = 3.5;
            } else if (e.state === 'considering') {
              stroke = 'var(--accent-amber)';
              strokeWidth = 3;
            } else if (e.state === 'discarded') {
              stroke = 'var(--border-subtle)';
              strokeWidth = 1.5;
              strokeDasharray = '4 4';
            }

            const midX = (u.x + v.x) / 2;
            const midY = (u.y + v.y) / 2;

            return (
              <g key={idx}>
                <line
                  x1={u.x}
                  y1={u.y}
                  x2={v.x}
                  y2={v.y}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeLinecap="round"
                />
                {e.weight !== undefined && (
                  <g>
                    <rect
                      x={midX - 12}
                      y={midY - 10}
                      width={24}
                      height={20}
                      rx={4}
                      fill="var(--bg-surface)"
                      stroke={e.state === 'included' ? 'var(--accent-emerald)' : 'var(--border-medium)'}
                      strokeWidth={1.5}
                    />
                    <text
                      x={midX}
                      y={midY + 4}
                      fill={e.state === 'included' ? 'var(--accent-emerald)' : 'var(--text-primary)'}
                      fontSize="11"
                      fontWeight="700"
                      fontFamily="var(--font-mono, monospace)"
                      textAnchor="middle"
                    >
                      {e.weight}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((n) => {
            if (n.x === undefined || n.y === undefined) return null;

            const isCurrent = n.id === activeNodeId || n.state === 'current';
            const isVisiting = n.state === 'visiting';
            const isVisited = n.state === 'visited';

            let fill = 'var(--bg-surface)';
            let stroke = 'var(--border-strong)';
            let strokeWidth = 2;
            let textFill = 'var(--text-primary)';

            if (isCurrent) {
              fill = 'var(--tint-terracotta-bg)';
              stroke = 'var(--accent-terracotta)';
              strokeWidth = 3;
              textFill = 'var(--tint-terracotta-text)';
            } else if (isVisiting) {
              fill = 'var(--tint-amber-bg)';
              stroke = 'var(--accent-amber)';
              strokeWidth = 2.5;
              textFill = 'var(--tint-amber-text)';
            } else if (isVisited) {
              fill = 'var(--tint-emerald-bg)';
              stroke = 'var(--accent-emerald)';
              strokeWidth = 2.5;
              textFill = 'var(--tint-emerald-text)';
            }

            return (
              <g key={n.id}>
                {/* Active radar halo ring */}
                {isCurrent && (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={32}
                    fill="none"
                    stroke="var(--accent-terracotta)"
                    strokeWidth={1.5}
                    strokeDasharray="3 3"
                    opacity={0.6}
                  />
                )}
                {/* Node main beacon */}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={24}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  style={{ transition: 'all 0.22s ease' }}
                />
                {/* Node ID label */}
                <text
                  x={n.x}
                  y={n.y + 5}
                  fill={textFill}
                  fontSize="14"
                  fontWeight="700"
                  fontFamily="var(--font-mono, monospace)"
                  textAnchor="middle"
                >
                  {n.label}
                </text>
                {/* Distance tag if applicable */}
                {n.distance !== undefined && (
                  <g>
                    <rect
                      x={n.x - 22}
                      y={n.y - 34}
                      width={44}
                      height={16}
                      rx={3}
                      fill="#ffffff"
                      stroke="#0369a1"
                      strokeWidth={1}
                    />
                    <text
                      x={n.x}
                      y={n.y - 22}
                      fill="#0369a1"
                      fontSize="9"
                      fontWeight="600"
                      fontFamily="var(--font-mono, monospace)"
                      textAnchor="middle"
                    >
                      {n.distance === Infinity ? 'd: ∞' : `d: ${n.distance}`}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Live Distance or MST Summary */}
      {stats && stats.totalWeight !== undefined && (
        <div className="graph-stat-footer">
          <span>MST Total Weight:</span>
          <strong>{stats.totalWeight}</strong>
        </div>
      )}
    </div>
  );
};
