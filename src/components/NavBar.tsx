import React from "react";
type View = "registro" | "graficos" | "exportar";

export default function NavBar({
  view,
  onNavigate,
}: { view: View; onNavigate: (v: View) => void }) {
  const Item = ({ id, label }: { id: View; label: string }) => (
    <button
      className="nav-btn"
      onClick={() => onNavigate(id)}
      aria-current={view === id ? "page" : undefined}
    >
      {label}
    </button>
  );

  return (
    <header className="app-nav">
      {/* ⬇️ layout en columna, centrado y con gap */}
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "12px 0",
        }}
      >
        {/* ⬇️ logo centrado */}
        <h1
          className="brand"
          style={{
            margin: 0,
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: ".2px",
            textAlign: "center",
          }}
        >
          HumorTracker(:(
        </h1>

        {/* ⬇️ menú centrado */}
        <nav
          className="nav-group"
          style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}
        >
          <Item id="registro" label="Registro" />
          <Item id="graficos" label="Gráficos" />
          <Item id="exportar" label="Exportar" />
        </nav>
      </div>
    </header>
  );
}
