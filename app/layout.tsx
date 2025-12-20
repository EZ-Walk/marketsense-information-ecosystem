import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MarketSense Information Ecosystem",
  description: "Graph-based view of interconnected information nodes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="page-shell">
        <header
          style={{
            padding: "1rem 1.5rem",
            borderBottom: "1px solid #1f2a40",
            background: "#0d1627",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                MarketSense Information Ecosystem
              </div>
              <div style={{ color: "#9bb0d3", fontSize: "0.9rem" }}>
                Brain-inspired graph of interconnected work across apps
              </div>
            </div>
          </div>
        </header>
        <main className="content">{children}</main>
      </body>
    </html>
  );
}

