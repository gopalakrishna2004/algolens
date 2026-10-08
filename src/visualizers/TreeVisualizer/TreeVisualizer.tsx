import React from 'react';
import type { TreeStep, VisualTreeNode } from '../../algorithms/types';

interface TreeVisualizerProps {
  step: TreeStep;
}

export const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ step }) => {
  const { nodes, rootId, activeNodeId, visitedNodeIds = [], traversalOrder, heapArray } = step;

  const renderNode = (nodeId?: string): React.ReactNode => {
    if (!nodeId || !nodes[nodeId]) {
      return (
        <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#475569', fontSize: '0.7rem' }}>/</span>
        </div>
      );
    }

    const node: VisualTreeNode = nodes[nodeId];
    const isActive = node.id === activeNodeId || node.state === 'comparing';
    const isSwapping = node.state === 'swapping';
    const isVisited = visitedNodeIds.includes(node.id) || node.state === 'visited';

    let bg = '#1e293b';
    let border = '#475569';
    let textColor = '#f8fafc';

    if (isActive) {
      bg = 'linear-gradient(135deg, #0284c7, #38bdf8)';
      border = '#38bdf8';
    } else if (isSwapping) {
      bg = 'linear-gradient(135deg, #ea580c, #f97316)';
      border = '#fb923c';
    } else if (isVisited) {
      bg = 'linear-gradient(135deg, #15803d, #22c55e)';
      border = '#4ade80';
    }

    const hasChildren = node.leftId || node.rightId;

    return (
      <div
        key={node.id}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 6px',
        }}
      >
        {/* Node Circle */}
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: bg,
            border: `2px solid ${border}`,
            color: textColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '1.05rem',
            boxShadow: isActive ? '0 0 16px rgba(56, 189, 248, 0.6)' : '0 2px 6px rgba(0,0,0,0.35)',
            transition: 'all 0.2s ease',
          }}
        >
          {node.value}
        </div>

        {/* Children branch connector */}
        {hasChildren && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '4px',
            }}
          >
            <div style={{ width: '2px', height: '14px', background: '#475569' }} />
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: '12px',
                borderTop: '1px solid #475569',
                paddingTop: '6px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '0.65rem', color: '#64748b' }}>L</span>
                {renderNode(node.leftId)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '0.65rem', color: '#64748b' }}>R</span>
                {renderNode(node.rightId)}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 16px',
        width: '100%',
        minHeight: '380px',
        overflowX: 'auto',
      }}
    >
      {/* Traversal Order Banner if active */}
      {traversalOrder && traversalOrder.length > 0 && (
        <div
          style={{
            marginBottom: '20px',
            padding: '8px 18px',
            borderRadius: '8px',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ color: '#4ade80', fontSize: '0.85rem', fontWeight: 600 }}>
            Traversal Output:
          </span>
          <div style={{ display: 'flex', gap: '6px' }}>
            {traversalOrder.map((val, idx) => (
              <span
                key={idx}
                style={{
                  background: '#1e293b',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
              >
                {val}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tree Visualization */}
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', minHeight: '200px' }}>
        {rootId ? renderNode(rootId) : <div style={{ color: '#64748b' }}>Empty Tree</div>}
      </div>

      {/* Underlying Heap Array Representation if applicable */}
      {heapArray && heapArray.length > 0 && (
        <div
          style={{
            marginTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
          }}
        >
          <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>
            Underlying Flat Array Representation:
          </span>
          <div
            style={{
              display: 'flex',
              gap: '6px',
              padding: '8px',
              borderRadius: '8px',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid #334155',
            }}
          >
            {heapArray.map((val, idx) => {
              const isRoot = idx === 0;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '6px',
                      background: isRoot ? '#0284c7' : '#1e293b',
                      border: isRoot ? '1.5px solid #38bdf8' : '1px solid #475569',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                    }}
                  >
                    {val}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>[{idx}]</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
