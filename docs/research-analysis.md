# Information Ecosystem — Design Document

> **Last Updated:** December 2024  
> **Status:** Active Development — MVP visualization complete

---

## Executive Summary

The Information Ecosystem is a **brain-inspired graph system** that models information from multiple applications (Trello, Notion, Gmail, etc.) as interconnected entities. An AI agent uses this graph to understand workflows, detect patterns, and generate automations.

**Core Insight:** We model the *information itself* (entities), not the events. Events are signals that tell us where information exists and how entities relate to each other.

---

## 🧠 Core Philosophy

### Entities vs Events

| Concept | Role | Example |
|---------|------|---------|
| **Entity Nodes** | The actual information | Cards, boards, lists, members, attachments, documents |
| **Events** | Signals that create/strengthen edges | "Card moved", "attachment added", "due date set" |

**Key Decision:** Events are NOT nodes. They inform the graph by:
1. Revealing which entities exist
2. Creating edges between entities
3. Strengthening edges through repeated co-occurrence (Hebbian learning)

### Explicit ID-Based Mapping

**Decision:** Each unique ID from a source application = one unique node.

- `trello:card:abc123` and `trello:card:def456` are separate nodes even if they have the same name
- No conceptual merging or deduplication (for now)
- This keeps the model simple and auditable

Future: Pluggable entity resolution for fuzzy matching across apps.

---

## Architecture

### Entity Types (Current: Trello)

```typescript
type TrelloEntityType = 
  | 'board'      // Container for lists
  | 'list'       // Container for cards (e.g., "New Project", "Internal Review")
  | 'card'       // Work items / tasks
  | 'member'     // People who perform actions
  | 'attachment' // Files attached to cards
```

### Node Structure

```typescript
interface EntityNode {
  // Identity
  id: string;                    // Format: "{source}:{type}:{sourceId}"
  entityType: TrelloEntityType;
  source: 'trello' | 'notion' | 'gmail' | 'google_drive';
  sourceId: string;              // Original ID from the app
  
  // Content
  label: string;                 // Display name
  url?: string;                  // Link back to source
  metadata: Record<string, any>; // App-specific properties
  
  // Event tracking (for Hebbian learning)
  lastSeen: Date;                // Most recent event involving this entity
  eventCount: number;            // Total events observed
}
```

### Edge Types

```typescript
type EdgeType =
  // Structural relationships
  | 'contains'        // Board → List, List → Card
  | 'has_attachment'  // Card → Attachment
  
  // Actor relationships
  | 'updated_by'      // Entity → Member (who performed action)
  | 'created_by'      // Entity → Member
  | 'assigned_to'     // Card → Member
  
  // Temporal/Causal (inferred from co-occurring events)
  | 'preceded_by'     // A typically happens before B
  | 'triggers'        // A causes B to happen
  
  // Semantic (future: AI-derived)
  | 'similar_to'      // Embedding similarity
  | 'part_of'         // Concept grouping
```

### Edge Structure

```typescript
interface EntityEdge {
  id: string;
  source: string;      // Node ID
  target: string;      // Node ID
  type: EdgeType;
  
  // Hebbian learning properties
  weight: number;      // 0.0 - 1.0, strengthens with use
  baseWeight: number;  // Decay floor
  coActivationCount: number;
  
  // Metadata
  lastActivated: Date;
  context?: string;    // What event created/strengthened this edge
}
```

---

## Brain-Inspired Learning

### Hebbian Learning ("Neurons that fire together wire together")

When events show entities interacting, strengthen their connection:

```typescript
// When we see: "Olivia moved card X to list Y"
// We strengthen edges: card→list, member→card

function onEventIngested(event: TrelloEvent) {
  const entities = extractEntities(event);
  
  for (const [entityA, entityB] of pairs(entities)) {
    const edge = findOrCreateEdge(entityA, entityB);
    
    // Hebbian update: strengthen connection
    edge.weight = Math.min(1.0, edge.weight + learningRate * (1 - edge.weight));
    edge.coActivationCount++;
    edge.lastActivated = new Date();
  }
}
```

### Temporal Decay (Synaptic Pruning)

Unused connections weaken over time:

```typescript
// Exponential decay: W(t) = W₀ × e^(-λt)
function decayWeight(edge: EntityEdge, now: Date): number {
  const timeSinceActivation = now.getTime() - edge.lastActivated.getTime();
  const lambda = Math.LN2 / HALF_LIFE;
  return Math.max(edge.baseWeight, edge.weight * Math.exp(-lambda * timeSinceActivation));
}
```

### Pathway Reinforcement

When a workflow is deployed from a detected pattern, dramatically strengthen that pathway:

```typescript
function reinforceWorkflowPathway(workflow: Workflow) {
  for (const edge of workflow.pathwayEdges) {
    edge.weight = Math.min(1.0, edge.weight * 2.0);
    edge.baseWeight = Math.min(0.5, edge.baseWeight * 1.5); // More resistant to decay
  }
}
```

---

## Confirmed Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Primary Nodes** | Entities (not events) | Events are signals, information is what matters |
| **ID Strategy** | Explicit source:type:id mapping | Simple, auditable, no false merges |
| **Graph Visualization** | React Flow (reactflow ^11.x) | Mature, well-documented, React-native |
| **Styling** | Plain CSS | Simpler than Tailwind, fewer dependencies |
| **Framework** | Next.js 14 (App Router) | Modern React, good DX |
| **Temporal Windows** | Multi-scale (5m, 1h, 1d, 1w) | Captures both rapid and slow workflows |
| **Entity Matching** | Direct ID matching (MVP) | Start simple, add fuzzy matching later |
| **Suggestion Rate** | Tunable hyperparameter | User controls noise vs. coverage tradeoff |
| **Workflow Oversight** | Sandbox → Human Review → Activation | Safety-first automation |
| **Initial Integrations** | Trello + Notion | Test data available; Gmail later |
| **Interface Priority** | Visual graph first | See the ecosystem before querying it |
| **Workflow Format** | n8n JSON schema | Open source, 400+ integrations |

---

## Current Implementation

### Project Structure

```
marketsense-information-ecosystem/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main page with graph
│   └── globals.css     # Styling (plain CSS)
├── components/
│   └── GraphView.tsx   # React Flow visualization + detail panel
├── data/
│   └── mockGraph.ts    # Trello entities from 10 webhook events
├── docs/
│   └── research-analysis.md  # This document
└── package.json
```

### Dependencies

```json
{
  "dependencies": {
    "next": "^14.2.9",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "reactflow": "^11.11.4"
  }
}
```

### Running the App

```bash
npm install
npm run dev
# Open http://localhost:3000
```

### Current Features

- ✅ Graph visualization with React Flow
- ✅ Circular nodes colored by entity type
- ✅ Dotted canvas background
- ✅ Click nodes to see detail panel with metadata
- ✅ Pulse animation on selection
- ✅ Legend for entity types and relationships
- ✅ Real Trello data (10 webhook events → 10 entities, 12 edges)

---

## Data Model: Trello Test Data

From 10 Trello webhook events, we extracted:

**Entities:**
- 1 Board: "Olivia"
- 2 Lists: "New Project", "Internal Review"  
- 4 Cards: "C360 Thumbnails", "NY Geo Blog #379/381/384"
- 1 Member: "Olivia Shorter"
- 2 Attachments: "Workforce Dev.docx", "Good News.docx"

**Relationships:**
- Board → Lists (contains)
- Lists → Cards (current position)
- Member → Cards (updated_by)
- Cards → Attachments (has_attachment)

**Events Observed:**
- `updateCard` (due date added/removed, card moved, position changed)
- `addAttachmentToCard`

---

## Roadmap

### Phase 1: Core Visualization ✅
- [x] Next.js app with React Flow
- [x] Entity nodes from Trello webhook data
- [x] Detail panel on click
- [x] Legend and styling

### Phase 2: Notion Integration
- [ ] Add Notion connector
- [ ] Parse Notion webhook/API data into entities
- [ ] Cross-app entity resolution (by user ID)

### Phase 3: Hebbian Learning Engine
- [ ] Implement edge weight updates on event ingestion
- [ ] Add temporal decay (configurable half-life)
- [ ] Visualize edge weight as thickness/opacity

### Phase 4: Pattern Detection
- [ ] Frequent subgraph mining
- [ ] Detect repeatable workflows
- [ ] Confidence scoring

### Phase 5: Workflow Generation
- [ ] Convert patterns to n8n JSON
- [ ] Sandbox testing environment
- [ ] Human review UI

### Phase 6: AI Agent
- [ ] Natural language queries over graph
- [ ] LangGraphJS integration
- [ ] Chat interface

---

## Technology Stack (Full Vision)

| Layer | Technology | Status |
|-------|------------|--------|
| **Visualization** | React Flow | ✅ Implemented |
| **Framework** | Next.js 14 | ✅ Implemented |
| **Graph Database** | Neo4j | 🔮 Future |
| **Workflow Engine** | n8n | 🔮 Future |
| **AI Agent** | LangGraphJS | 🔮 Future |
| **Vector Embeddings** | OpenAI / local | 🔮 Future |

---

## References

- [React Flow Documentation](https://reactflow.dev/docs)
- [n8n Workflow JSON Schema](https://docs.n8n.io/)
- [Neo4j JavaScript Driver](https://neo4j.com/docs/javascript-manual/current/)
- [LangGraphJS](https://langchain-ai.github.io/langgraphjs/)
- [Hebbian Learning (Wikipedia)](https://en.wikipedia.org/wiki/Hebbian_theory)
