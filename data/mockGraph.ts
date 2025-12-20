import { Node, Edge } from 'reactflow';

// =============================================================================
// TRELLO ENTITY TYPES
// =============================================================================

export type TrelloEntityType = 'board' | 'list' | 'card' | 'member' | 'attachment';

export interface TrelloEntityData {
  label: string;
  entityType: TrelloEntityType;
  source: 'trello';
  trelloId: string;
  
  // Entity-specific properties
  url?: string;
  shortLink?: string;
  idShort?: number;
  username?: string;
  avatarUrl?: string;
  fileName?: string;
  fileUrl?: string;
  
  // Timestamps from events that informed this node
  lastSeen: string;
  eventCount: number;
  
  // Raw metadata for detail panel
  raw?: Record<string, unknown>;
}

// =============================================================================
// NODE STYLING
// =============================================================================

const baseNodeStyle = {
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center' as const,
  fontSize: '11px',
  fontWeight: 500,
  border: '2px solid',
  cursor: 'pointer',
};

const nodeStyles: Record<TrelloEntityType, React.CSSProperties> = {
  board: {
    ...baseNodeStyle,
    width: 100,
    height: 100,
    background: 'linear-gradient(135deg, #0079bf 0%, #026aa7 100%)',
    borderColor: '#004a75',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 600,
  },
  list: {
    ...baseNodeStyle,
    width: 80,
    height: 80,
    background: 'linear-gradient(135deg, #5ba4cf 0%, #298fca 100%)',
    borderColor: '#1a6fb0',
    color: '#fff',
  },
  card: {
    ...baseNodeStyle,
    width: 70,
    height: 70,
    background: 'linear-gradient(135deg, #ffffff 0%, #f4f5f7 100%)',
    borderColor: '#dfe1e6',
    color: '#172b4d',
  },
  member: {
    ...baseNodeStyle,
    width: 60,
    height: 60,
    background: 'linear-gradient(135deg, #ff7452 0%, #ff5630 100%)',
    borderColor: '#de350b',
    color: '#fff',
  },
  attachment: {
    ...baseNodeStyle,
    width: 55,
    height: 55,
    background: 'linear-gradient(135deg, #36b37e 0%, #00875a 100%)',
    borderColor: '#006644',
    color: '#fff',
    fontSize: '10px',
  },
};

// =============================================================================
// ENTITY NODES (extracted from 10 Trello events)
// =============================================================================

export const nodes: Node<TrelloEntityData>[] = [
  // Board
  {
    id: 'trello:board:689ce1b0c9307ea4cb627687',
    type: 'default',
    position: { x: 400, y: 50 },
    data: {
      label: 'Olivia',
      entityType: 'board',
      source: 'trello',
      trelloId: '689ce1b0c9307ea4cb627687',
      url: 'https://trello.com/b/nNyXgjsa/olivia',
      shortLink: 'nNyXgjsa',
      lastSeen: '2025-12-20T04:12:39.481Z',
      eventCount: 10,
      raw: {
        idOrganization: '60fdabeeb8bdd3530a9d1f1e',
        permissionLevel: 'private',
      },
    },
    style: nodeStyles.board,
  },

  // Lists
  {
    id: 'trello:list:692dd1071ace4292310470f1',
    type: 'default',
    position: { x: 200, y: 200 },
    data: {
      label: 'New Project',
      entityType: 'list',
      source: 'trello',
      trelloId: '692dd1071ace4292310470f1',
      lastSeen: '2025-12-20T04:12:39.481Z',
      eventCount: 4,
    },
    style: nodeStyles.list,
  },
  {
    id: 'trello:list:689ce20b5a8aea92755dfef0',
    type: 'default',
    position: { x: 600, y: 200 },
    data: {
      label: 'Internal Review',
      entityType: 'list',
      source: 'trello',
      trelloId: '689ce20b5a8aea92755dfef0',
      lastSeen: '2025-12-19T23:10:42.941Z',
      eventCount: 6,
    },
    style: nodeStyles.list,
  },

  // Cards
  {
    id: 'trello:card:69445f38fd51b7cb16b4bf8b',
    type: 'default',
    position: { x: 100, y: 350 },
    data: {
      label: 'C360 Thumbnails',
      entityType: 'card',
      source: 'trello',
      trelloId: '69445f38fd51b7cb16b4bf8b',
      shortLink: 'I0sN93jq',
      idShort: 465,
      lastSeen: '2025-12-20T04:12:39.481Z',
      eventCount: 2,
      raw: {
        due: '2025-12-19T13:00:00.000Z',
        actions: ['added due date', 'removed due date'],
      },
    },
    style: nodeStyles.card,
  },
  {
    id: 'trello:card:6942fa2837f9e2949dc8d42f',
    type: 'default',
    position: { x: 300, y: 350 },
    data: {
      label: 'NY Geo Blog #384',
      entityType: 'card',
      source: 'trello',
      trelloId: '6942fa2837f9e2949dc8d42f',
      shortLink: 'tVUvANfc',
      idShort: 384,
      lastSeen: '2025-12-19T23:10:42.941Z',
      eventCount: 3,
      raw: {
        actions: ['moved to Internal Review', 'attachment added'],
      },
    },
    style: nodeStyles.card,
  },
  {
    id: 'trello:card:6942f9c481f2a2f60b11e71f',
    type: 'default',
    position: { x: 500, y: 350 },
    data: {
      label: 'NY Geo Blog #381',
      entityType: 'card',
      source: 'trello',
      trelloId: '6942f9c481f2a2f60b11e71f',
      shortLink: 'B8j8Q0qM',
      idShort: 381,
      lastSeen: '2025-12-19T22:49:29.335Z',
      eventCount: 3,
      raw: {
        actions: ['moved to Internal Review', 'attachment added'],
      },
    },
    style: nodeStyles.card,
  },
  {
    id: 'trello:card:6942f9bfb39c176aa6f892c3',
    type: 'default',
    position: { x: 700, y: 350 },
    data: {
      label: 'NY Geo Blog #379',
      entityType: 'card',
      source: 'trello',
      trelloId: '6942f9bfb39c176aa6f892c3',
      shortLink: 'ImeuETB3',
      idShort: 379,
      lastSeen: '2025-12-19T20:31:51.506Z',
      eventCount: 2,
      raw: {
        actions: ['moved to Internal Review'],
      },
    },
    style: nodeStyles.card,
  },

  // Member
  {
    id: 'trello:member:689f817644d49c78f58c78a8',
    type: 'default',
    position: { x: 400, y: 500 },
    data: {
      label: 'Olivia Shorter',
      entityType: 'member',
      source: 'trello',
      trelloId: '689f817644d49c78f58c78a8',
      username: 'oliviashorter',
      avatarUrl: 'https://trello-members.s3.amazonaws.com/689f817644d49c78f58c78a8/d818e260d6098e2d4e34187ab8fc21aa',
      lastSeen: '2025-12-20T04:12:39.481Z',
      eventCount: 10,
      raw: {
        initials: 'OS',
        fullName: 'Olivia Shorter',
      },
    },
    style: nodeStyles.member,
  },

  // Attachments
  {
    id: 'trello:attachment:6945db6b49734494238be32e',
    type: 'default',
    position: { x: 250, y: 480 },
    data: {
      label: 'Workforce Dev.docx',
      entityType: 'attachment',
      source: 'trello',
      trelloId: '6945db6b49734494238be32e',
      fileName: 'NY-GEO - Workforce Development & Training Opportunities.docx',
      fileUrl: 'https://trello.com/1/cards/6942fa2837f9e2949dc8d42f/attachments/6945db6b49734494238be32e/download/NY-GEO_-_Workforce_Development_%26_Training_Opportunities.docx',
      lastSeen: '2025-12-19T23:10:35.697Z',
      eventCount: 1,
    },
    style: nodeStyles.attachment,
  },
  {
    id: 'trello:attachment:6945d66536104700d4c8d01f',
    type: 'default',
    position: { x: 550, y: 480 },
    data: {
      label: 'Good News.docx',
      entityType: 'attachment',
      source: 'trello',
      trelloId: '6945d66536104700d4c8d01f',
      fileName: 'NY-GEO - Shares Member and Organizational Good News.docx',
      fileUrl: 'https://trello.com/1/cards/6942f9c481f2a2f60b11e71f/attachments/6945d66536104700d4c8d01f/download/NY-GEO_-_Shares_Member_and_Organizational_Good_News.docx',
      lastSeen: '2025-12-19T22:49:09.762Z',
      eventCount: 1,
    },
    style: nodeStyles.attachment,
  },
];

// =============================================================================
// EDGES (relationships derived from events)
// =============================================================================

export const edges: Edge[] = [
  // Board → Lists (contains)
  {
    id: 'e-board-list-newproject',
    source: 'trello:board:689ce1b0c9307ea4cb627687',
    target: 'trello:list:692dd1071ace4292310470f1',
    type: 'smoothstep',
    style: { stroke: '#0079bf', strokeWidth: 2 },
    label: 'contains',
  },
  {
    id: 'e-board-list-review',
    source: 'trello:board:689ce1b0c9307ea4cb627687',
    target: 'trello:list:689ce20b5a8aea92755dfef0',
    type: 'smoothstep',
    style: { stroke: '#0079bf', strokeWidth: 2 },
    label: 'contains',
  },

  // List → Cards (current position based on most recent event)
  {
    id: 'e-list-card-c360',
    source: 'trello:list:692dd1071ace4292310470f1',
    target: 'trello:card:69445f38fd51b7cb16b4bf8b',
    type: 'smoothstep',
    style: { stroke: '#5ba4cf', strokeWidth: 1.5 },
  },
  {
    id: 'e-list-card-384',
    source: 'trello:list:689ce20b5a8aea92755dfef0',
    target: 'trello:card:6942fa2837f9e2949dc8d42f',
    type: 'smoothstep',
    style: { stroke: '#5ba4cf', strokeWidth: 1.5 },
  },
  {
    id: 'e-list-card-381',
    source: 'trello:list:689ce20b5a8aea92755dfef0',
    target: 'trello:card:6942f9c481f2a2f60b11e71f',
    type: 'smoothstep',
    style: { stroke: '#5ba4cf', strokeWidth: 1.5 },
  },
  {
    id: 'e-list-card-379',
    source: 'trello:list:689ce20b5a8aea92755dfef0',
    target: 'trello:card:6942f9bfb39c176aa6f892c3',
    type: 'smoothstep',
    style: { stroke: '#5ba4cf', strokeWidth: 1.5 },
  },

  // Member → Cards (performed actions)
  {
    id: 'e-member-card-c360',
    source: 'trello:member:689f817644d49c78f58c78a8',
    target: 'trello:card:69445f38fd51b7cb16b4bf8b',
    type: 'smoothstep',
    style: { stroke: '#ff5630', strokeWidth: 1, strokeDasharray: '4 2' },
    label: 'updated',
  },
  {
    id: 'e-member-card-384',
    source: 'trello:member:689f817644d49c78f58c78a8',
    target: 'trello:card:6942fa2837f9e2949dc8d42f',
    type: 'smoothstep',
    style: { stroke: '#ff5630', strokeWidth: 1, strokeDasharray: '4 2' },
    label: 'updated',
  },
  {
    id: 'e-member-card-381',
    source: 'trello:member:689f817644d49c78f58c78a8',
    target: 'trello:card:6942f9c481f2a2f60b11e71f',
    type: 'smoothstep',
    style: { stroke: '#ff5630', strokeWidth: 1, strokeDasharray: '4 2' },
    label: 'updated',
  },
  {
    id: 'e-member-card-379',
    source: 'trello:member:689f817644d49c78f58c78a8',
    target: 'trello:card:6942f9bfb39c176aa6f892c3',
    type: 'smoothstep',
    style: { stroke: '#ff5630', strokeWidth: 1, strokeDasharray: '4 2' },
    label: 'updated',
  },

  // Card → Attachments
  {
    id: 'e-card-attachment-384',
    source: 'trello:card:6942fa2837f9e2949dc8d42f',
    target: 'trello:attachment:6945db6b49734494238be32e',
    type: 'smoothstep',
    style: { stroke: '#36b37e', strokeWidth: 1.5 },
    label: 'has',
  },
  {
    id: 'e-card-attachment-381',
    source: 'trello:card:6942f9c481f2a2f60b11e71f',
    target: 'trello:attachment:6945d66536104700d4c8d01f',
    type: 'smoothstep',
    style: { stroke: '#36b37e', strokeWidth: 1.5 },
    label: 'has',
  },
];

// =============================================================================
// LEGEND DATA
// =============================================================================

export const legendItems = [
  { color: '#0079bf', label: 'Board', shape: 'circle' },
  { color: '#5ba4cf', label: 'List', shape: 'circle' },
  { color: '#f4f5f7', label: 'Card', shape: 'circle', border: '#dfe1e6' },
  { color: '#ff5630', label: 'Member', shape: 'circle' },
  { color: '#36b37e', label: 'Attachment', shape: 'circle' },
];

export const edgeLegendItems = [
  { style: 'solid', color: '#0079bf', label: 'Contains' },
  { style: 'solid', color: '#5ba4cf', label: 'In List' },
  { style: 'dashed', color: '#ff5630', label: 'Updated By' },
  { style: 'solid', color: '#36b37e', label: 'Has Attachment' },
];
