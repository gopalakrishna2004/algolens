import React from 'react';
import type { TreeStep, VisualTreeNode } from '../../algorithms/types';
import './TreeVisualizer.css';

interface TreeVisualizerProps {
  step: TreeStep;
}

export const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ step }) => {
  const { nodes, rootId, activeNodeId, visitedNodeIds = [], traversalOrder, heapArray } = step;

  const renderNode = (nodeId?: string): React.ReactNode => {
    if (!nodeId || !nodes[nodeId]) {
      return (
        <div className="tree-null-stub">
          <span>/</span>
        </div>
      );
    }

    const node: VisualTreeNode = nodes[nodeId];
    const isActive = node.id === activeNodeId || node.state === 'comparing';
    const isSwapping = node.state === 'swapping';
    const isVisited = visitedNodeIds.includes(node.id) || node.state === 'visited';

    let discClass = 'tree-node-disc';
    if (isActive) discClass += ' is-active';
    else if (isSwapping) discClass += ' is-swapping';
    else if (isVisited) discClass += ' is-visited';

    const hasChildren = node.leftId || node.rightId;

    return (
      <div key={node.id} className="tree-node-wrapper">
        {/* Node Circle */}
        <div className={discClass}>
          {node.value}
        </div>

        {/* Children branch connector */}
        {hasChildren && (
          <div className="tree-branch-system">
            <div className="tree-stem-vertical" />
            <div className="tree-children-row">
              <div className="tree-child-slot">
                <span className="tree-child-tag">L</span>
                {renderNode(node.leftId)}
              </div>
              <div className="tree-child-slot">
                <span className="tree-child-tag">R</span>
                {renderNode(node.rightId)}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="tree-stage">
      {/* Traversal Order Banner if active */}
      {traversalOrder && traversalOrder.length > 0 && (
        <div className="tree-traversal-ribbon">
          <span className="tree-traversal-label">
            Traversal Output Stream
          </span>
          <div className="tree-traversal-pills">
            {traversalOrder.map((val, idx) => (
              <span key={idx} className="tree-traversal-pill">
                <span className="seq-idx">{idx + 1}:</span>
                {val}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tree Visualization Canvas */}
      <div className="tree-canvas-container">
        {rootId ? renderNode(rootId) : <div className="tree-null-stub">Empty Tree</div>}
      </div>

      {/* Underlying Heap Array Representation if applicable */}
      {heapArray && heapArray.length > 0 && (
        <div className="tree-heap-section">
          <span className="tree-heap-label">
            Contiguous Memory / Flat Heap Buffer
          </span>
          <div className="tree-heap-row">
            {heapArray.map((val, idx) => {
              const isRoot = idx === 0;
              return (
                <div key={idx} className="tree-heap-item">
                  <div className={`tree-heap-cell ${isRoot ? 'is-root' : ''}`}>
                    {val}
                  </div>
                  <span className="tree-heap-idx">[{idx}]</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
