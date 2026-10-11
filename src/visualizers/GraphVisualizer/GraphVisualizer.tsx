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
          OP // {action ? action.toUpperCase() : 'GRAPH STEP'}
        </div>

        {queueOrStack && queueOrStack.length > 0 && (
          <div className="graph-aux-collection">
            <span>FRONTIER //</span>
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
            <span>VISITED //</span>
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
            {/* Subtle laboratory grid pattern */}
            <pattern id="graph-lab-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="0.8" fill="rgba(255, 255, 255, 0.12)" />
            </pattern>
            {/* Glow filter for active/mst edges */}
            <filter id="edge-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid background */}
          <rect width="650" height="320" fill="url(#graph-lab-grid)" />

          {/* Edges */}
          {edges.map((e, idx) => {
            const u = nodeMap.get(e.from);
            const v = nodeMap.get(e.to);
            if (!u || !v || u.x === undefined || u.y === undefined || v.x === undefined || v.y === undefined) return null;

            let stroke = '#27344c';
            let strokeWidth = 2.5;
            let strokeDasharray = undefined;
            let filter = undefined;

            if (e.state === 'included') {
              stroke = '#3dd99e';
              strokeWidth = 3.5;
              filter = 'url(#edge-glow)';
            } else if (e.state === 'considering') {
              stroke = '#f5b544';
              strokeWidth = 3;
              filter = 'url(#edge-glow)';
            } else if (e.state === 'discarded') {
              stroke = '#334155';
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
                  filter={filter}
                />
                {e.weight !== undefined && (
                  <g>
                    <rect
                      x={midX - 12}
                      y={midY - 10}
                      width={24}
                      height={20}
                      rx={5}
                      fill="#0c1018"
                      stroke={e.state === 'included' ? '#3dd99e' : '#27344c'}
                      strokeWidth={1.5}
                    />
                    <text
                      x={midX}
                      y={midY + 4}
                      fill={e.state === 'included' ? '#3dd99e' : '#94a3b8'}
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

            let fill = '#121824';
            let stroke = '#27344c';
            let strokeWidth = 2;
            let textFill = '#f0f4fc';

            if (isCurrent) {
              fill = '#0a2540';
              stroke = '#5ce1e6';
              strokeWidth = 3;
              textFill = '#ffffff';
            } else if (isVisiting) {
              fill = '#382510';
              stroke = '#f5b544';
              strokeWidth = 2.5;
              textFill = '#ffffff';
            } else if (isVisited) {
              fill = '#0d2818';
              stroke = '#3dd99e';
              strokeWidth = 2.5;
              textFill = '#ffffff';
            }

            return (
              <g key={n.id}>
                {/* Active radar halo ring */}
                {isCurrent && (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={28}
                    fill="none"
                    stroke="#5ce1e6"
                    strokeWidth={1.5}
                    strokeDasharray="3 3"
                    opacity={0.7}
                  />
                )}
                {/* Node main beacon */}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={21}
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
                  fontSize="13"
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
                      height={15}
                      rx={3}
                      fill="#0c1018"
                      stroke="#5ce1e6"
                      strokeWidth={1}
                    />
                    <text
                      x={n.x}
                      y={n.y - 23}
                      fill="#5ce1e6"
                      fontSize="9"
                      fontWeight="700"
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
          <span>MST TOTAL WEIGHT //</span>
          <strong>{stats.totalWeight}</strong>
        </div>
      )}
    </div>
  );
};
