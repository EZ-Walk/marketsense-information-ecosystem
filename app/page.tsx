import GraphView from "../components/GraphView";

export default function Home() {
  return (
    <main className="page-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div>
            <h1 className="header-title">
              <span className="icon">🧠</span>
              Information Ecosystem
            </h1>
            <p className="header-subtitle">
              Trello entities extracted from 10 webhook events • Click nodes to explore
            </p>
          </div>
          <div className="header-stats">
            <div className="header-badge">
              <span className="badge-icon">T</span>
              <span>Trello Connected</span>
            </div>
            <div className="header-divider" />
            <div className="header-badge">
              <span className="status-indicator">●</span>
              <span>10 entities • 12 relationships</span>
            </div>
          </div>
        </div>
      </header>

      {/* Graph View */}
      <div className="graph-container">
        <GraphView />
      </div>
    </main>
  );
}
