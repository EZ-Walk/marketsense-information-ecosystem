'use client';

import { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

import {
  nodes as initialNodes,
  edges as initialEdges,
  legendItems,
  edgeLegendItems,
  TrelloEntityData,
} from '@/data/mockGraph';

// =============================================================================
// DETAIL PANEL COMPONENT
// =============================================================================

interface DetailPanelProps {
  node: Node<TrelloEntityData> | null;
  onClose: () => void;
}

function DetailPanel({ node, onClose }: DetailPanelProps) {
  if (!node) {
    return (
      <div className="detail-empty">
        <div className="icon">🧠</div>
        <p>Click a node to explore its information</p>
      </div>
    );
  }

  const { data } = node;
  
  const entityColors: Record<string, string> = {
    board: '#0079bf',
    list: '#5ba4cf',
    card: '#dfe1e6',
    member: '#ff5630',
    attachment: '#36b37e',
  };

  const entityIcons: Record<string, string> = {
    board: '📋',
    list: '📁',
    card: '🎴',
    member: '👤',
    attachment: '📎',
  };

  const color = entityColors[data.entityType];

  return (
    <div className="detail-content animate-fadeIn">
      {/* Header */}
      <div className="detail-header">
        <div className="detail-header-info">
          <div
            className="detail-icon"
            style={{ 
              backgroundColor: color + '20',
              border: `2px solid ${color}`,
            }}
          >
            {entityIcons[data.entityType]}
          </div>
          <div>
            <h3 className="detail-title">{data.label}</h3>
            <span 
              className="detail-badge"
              style={{ 
                backgroundColor: color + '30',
                color: color,
              }}
            >
              {data.entityType}
            </span>
          </div>
        </div>
        <button onClick={onClose} className="detail-close">✕</button>
      </div>

      <div className="detail-divider" />

      {/* Entity Details */}
      <div>
        {/* Trello ID */}
        <div className="detail-field">
          <span className="detail-label">Trello ID</span>
          <p className="detail-value mono">{data.trelloId}</p>
        </div>

        {/* URL if available */}
        {data.url && (
          <div className="detail-field">
            <span className="detail-label">URL</span>
            <a href={data.url} target="_blank" rel="noopener noreferrer" className="detail-value detail-link">
              {data.url}
            </a>
          </div>
        )}

        {/* Short Link */}
        {data.shortLink && (
          <div className="detail-field">
            <span className="detail-label">Short Link</span>
            <p className="detail-value mono">{data.shortLink}</p>
          </div>
        )}

        {/* ID Short for cards */}
        {data.idShort && (
          <div className="detail-field">
            <span className="detail-label">Card #</span>
            <p className="detail-value">{data.idShort}</p>
          </div>
        )}

        {/* Username for members */}
        {data.username && (
          <div className="detail-field">
            <span className="detail-label">Username</span>
            <p className="detail-value">@{data.username}</p>
          </div>
        )}

        {/* Avatar for members */}
        {data.avatarUrl && (
          <div className="detail-field">
            <span className="detail-label">Avatar</span>
            <img src={data.avatarUrl} alt={data.label} className="detail-avatar" />
          </div>
        )}

        {/* File name for attachments */}
        {data.fileName && (
          <div className="detail-field">
            <span className="detail-label">File Name</span>
            <p className="detail-value">{data.fileName}</p>
          </div>
        )}

        {/* File URL for attachments */}
        {data.fileUrl && (
          <div className="detail-field">
            <span className="detail-label">Download</span>
            <a href={data.fileUrl} target="_blank" rel="noopener noreferrer" className="detail-value detail-link green">
              📥 Download File
            </a>
          </div>
        )}

        <div className="detail-divider" />

        {/* Event Metadata */}
        <div className="detail-grid">
          <div className="detail-field">
            <span className="detail-label">Events</span>
            <p className="detail-value" style={{ fontWeight: 600 }}>{data.eventCount}</p>
          </div>
          <div className="detail-field">
            <span className="detail-label">Last Seen</span>
            <p className="detail-value">{new Date(data.lastSeen).toLocaleString()}</p>
          </div>
        </div>

        {/* Raw data (expandable) */}
        {data.raw && Object.keys(data.raw).length > 0 && (
          <details className="detail-raw">
            <summary>Raw Metadata</summary>
            <pre>{JSON.stringify(data.raw, null, 2)}</pre>
          </details>
        )}
      </div>

      {/* Source Badge */}
      <div className="detail-source">
        <span className="source-icon">T</span>
        <span>Source: Trello</span>
      </div>
    </div>
  );
}

// =============================================================================
// LEGEND COMPONENT
// =============================================================================

function Legend() {
  return (
    <div className="legend">
      <div className="legend-title">Entities</div>
      <div className="legend-items">
        {legendItems.map((item) => (
          <div key={item.label} className="legend-item">
            <div
              className="legend-dot"
              style={{
                backgroundColor: item.color,
                border: item.border ? `1px solid ${item.border}` : undefined,
              }}
            />
            <span className="legend-label">{item.label}</span>
          </div>
        ))}
      </div>
      
      <div className="legend-title" style={{ marginTop: '0.75rem' }}>Relationships</div>
      <div className="legend-items">
        {edgeLegendItems.map((item) => (
          <div key={item.label} className="legend-item">
            <div
              className={`legend-line ${item.style === 'dashed' ? 'dashed' : ''}`}
              style={{
                backgroundColor: item.style !== 'dashed' ? item.color : undefined,
                borderColor: item.style === 'dashed' ? item.color : undefined,
              }}
            />
            <span className="legend-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// MAIN GRAPH VIEW COMPONENT
// =============================================================================

export default function GraphView() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<TrelloEntityData> | null>(null);

  // Handle node click with pulse effect
  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node<TrelloEntityData>) => {
      setSelectedNode(node);

      // Update node styles to show selection
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          style: {
            ...n.style,
            boxShadow:
              n.id === node.id
                ? '0 0 0 3px #6366f1, 0 0 20px rgba(99, 102, 241, 0.5)'
                : undefined,
            animation: n.id === node.id ? 'pulse 0.6s ease-out' : undefined,
          },
        }))
      );
    },
    [setNodes]
  );

  // Handle pane click to deselect
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        style: {
          ...n.style,
          boxShadow: undefined,
          animation: undefined,
        },
      }))
    );
  }, [setNodes]);

  const closeDetailPanel = useCallback(() => {
    setSelectedNode(null);
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        style: {
          ...n.style,
          boxShadow: undefined,
          animation: undefined,
        },
      }))
    );
  }, [setNodes]);

  return (
    <>
      {/* Graph Canvas */}
      <div className="graph-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={0.3}
          maxZoom={2}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#374151" />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              const data = node.data as TrelloEntityData;
              const colors: Record<string, string> = {
                board: '#0079bf',
                list: '#5ba4cf',
                card: '#9ca3af',
                member: '#ff5630',
                attachment: '#36b37e',
              };
              return colors[data.entityType] || '#6b7280';
            }}
            maskColor="rgba(0, 0, 0, 0.7)"
          />
          <Legend />
        </ReactFlow>
      </div>

      {/* Detail Panel */}
      <div className="detail-panel">
        <div className="detail-panel-header">
          <h2>Node Details</h2>
        </div>
        <DetailPanel node={selectedNode} onClose={closeDetailPanel} />
      </div>
    </>
  );
}
