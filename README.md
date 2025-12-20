# 🧠 Information Ecosystem

A brain-inspired graph system that models information from multiple applications (Trello, Notion, Gmail) as interconnected entities. Uses Hebbian learning to strengthen pathways between frequently co-occurring entities, enabling pattern detection and workflow automation.

## Core Concept

**Entities are nodes. Events are signals.**

We don't model events as nodes—we model the *information itself*: cards, boards, lists, members, documents. Events (like "card moved" or "attachment added") tell us which entities exist and how they relate, creating and strengthening edges in the graph.

```
Events from Trello webhook
         ↓
   Extract entities (cards, lists, members, attachments)
         ↓
   Create/strengthen edges between co-occurring entities
         ↓
   Hebbian learning: frequently connected entities = strong pathways
         ↓
   Pattern detection → Workflow automation
```

## Current Status

**MVP Visualization Complete** — Interactive graph showing Trello entities extracted from real webhook data.

![Graph Preview](docs/preview.png)

### Features
- ✅ React Flow graph visualization
- ✅ Circular nodes colored by entity type (board, list, card, member, attachment)
- ✅ Click nodes to see metadata in detail panel
- ✅ Real Trello data (10 events → 10 entities, 12 relationships)
- ✅ Pulse animation on selection
- ✅ Legend for entity types and relationships

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Project Structure

```
├── app/
│   ├── page.tsx        # Main page with graph
│   └── globals.css     # Styling
├── components/
│   └── GraphView.tsx   # React Flow visualization + detail panel
├── data/
│   └── mockGraph.ts    # Trello entities from webhook events
└── docs/
    └── research-analysis.md  # Full design document
```

## Design Decisions

| Decision | Choice |
|----------|--------|
| **Primary Nodes** | Entities (not events) |
| **ID Strategy** | `source:type:id` — unique ID = unique node |
| **Graph Library** | React Flow (reactflow ^11.x) |
| **Framework** | Next.js 14 |
| **Initial Integrations** | Trello + Notion |
| **Interface Priority** | Visual graph first, AI agent later |

## Roadmap

1. ✅ **Phase 1:** Core visualization with Trello data
2. 🔲 **Phase 2:** Notion integration + cross-app entity resolution
3. 🔲 **Phase 3:** Hebbian learning engine (edge weight updates, decay)
4. 🔲 **Phase 4:** Pattern detection (frequent subgraph mining)
5. 🔲 **Phase 5:** Workflow generation (n8n JSON output)
6. 🔲 **Phase 6:** AI agent for natural language queries

## Documentation

See [docs/research-analysis.md](docs/research-analysis.md) for the full design document including:
- Entity/edge type definitions
- Hebbian learning algorithm
- Temporal decay (synaptic pruning)
- Pattern detection approach
- Technology stack rationale

## License

MIT
