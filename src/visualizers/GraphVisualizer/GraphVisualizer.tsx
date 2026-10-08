import React from 'react';
import type { GraphStep } from '../../algorithms/types';

interface GraphVisualizerProps {
  step: GraphStep;
}

export const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ step }) => {
  const { nodes, edges, activeNodeId, queueOrStack, visitedNodes = [], action, stats } = step;

  // Map nodes to coordinates lookup
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 16px',
        width: '100%',
        minHeight: '400px',
      }}
    >
      {/* Top Banner: Action & Auxiliary Structures */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '20px',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            padding: '5px 14px',
            borderRadius: '6px',
            background: 'rgba(236, 72, 153, 0.08)',
            border: '1px solid rgba(236, 72, 153, 0.25)',
            color: '#f472b6',
            fontSize: '0.8rem',
            fontWeight: 600,
            fontFamily: 'var(--font-mono, monospace)',
            letterSpacing: '0.06em',
          }}
        >
          OP // {action ? action.toUpperCase() : 'STEP'}
        </div>

        {queueOrStack && queueOrStack.length > 0 && (
          <div
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: '#1e293b',
              border: '1px solid #334155',
              fontSize: '0.85rem',
              color: '#94a3b8',
              display: 'flex',
              gap: '6px',
              alignItems: 'center',
            }}
          >
            <span>Active Collection:</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {queueOrStack.map((item, idx) => (
                <span
                  key={idx}
                  style={{
                    background: '#0284c7',
                    color: '#fff',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    fontWeight: 700,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {visitedNodes.length > 0 && (
          <div
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: '#1e293b',
              border: '1px solid #334155',
              fontSize: '0.85rem',
              color: '#94a3b8',
              display: 'flex',
              gap: '6px',
              alignItems: 'center',
            }}
          >
            <span>Visited:</span>
            <span style={{ color: '#4ade80', fontWeight: 700 }}>
              [{visitedNodes.join(', ')}]
            </span>
          </div>
        )}
      </div>

      {/* SVG Graph View */}
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          height: '320px',
          position: 'relative',
          background: 'rgba(15, 23, 42, 0.6)',
          borderRadius: '12px',
          border: '1px solid #334155',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 650 300"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          {/* Edges */}
          {edges.map((e, idx) => {
            const u = nodeMap.get(e.from);
            const v = nodeMap.get(e.to);
            if (!u || !v || u.x === undefined || u.y === undefined || v.x === undefined || v.y === undefined) return null;

            let stroke = '#475569';
            let strokeWidth = 2;

            if (e.state === 'included') {
              stroke = '#22c55e';
              strokeWidth = 4;
            } else if (e.state === 'considering') {
              stroke = '#f59e0b';
              strokeWidth = 3;
            } else if (e.state === 'discarded') {
              stroke = '#ef4444';
              strokeWidth = 1.5;
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
                  strokeLinecap="round"
                />
                {e.weight !== undefined && (
                  <g>
                    <rect
                      x={midX - 10}
                      y={midY - 9}
                      width={20}
                      height={18}
                      rx={4}
                      fill="#0f172a"
                      stroke="#334155"
                      strokeWidth={1}
                    />
                    <text
                      x={midX}
                      y={midY + 4}
                      fill="#94a3b8"
                      fontSize="11"
                      fontWeight="bold"
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

            let fill = '#1e293b';
            let stroke = '#64748b';
            let strokeWidth = 2;

            if (isCurrent) {
              fill = '#0284c7';
              stroke = '#38bdf8';
              strokeWidth = 3;
            } else if (isVisiting) {
              fill = '#d97706';
              stroke = '#fbbf24';
              strokeWidth = 3;
            } else if (isVisited) {
              fill = '#15803d';
              stroke = '#4ade80';
              strokeWidth = 2.5;
            }

            return (
              <g key={n.id}>
                {isCurrent && (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={26}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    opacity={0.6}
                  />
                )}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={20}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  style={{ transition: 'all 0.25s ease' }}
                />
                <text
                  x={n.x}
                  y={n.y + 5}
                  fill="#ffffff"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {n.label}
                </text>
                {n.distance !== undefined && (
                  <text
                    x={n.x}
                    y={n.y - 25}
                    fill="#38bdf8"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    dist: {n.distance === Infinity ? '∞' : n.distance}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Live Distance or MST Summary */}
      {stats && stats.totalWeight !== undefined && (
        <div style={{ marginTop: '16px', color: '#4ade80', fontSize: '0.9rem', fontWeight: 600 }}>
          Total MST Weight: {stats.totalWeight}
        </div>
      )}
    </div>
  );
};
