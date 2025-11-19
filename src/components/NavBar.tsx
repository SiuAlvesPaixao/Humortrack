import React from "react";

type View = "registro" | "graficos" | "exportar";

export default function NavBar({
  view,
  onNavigate,
}: {
  view: View;
  onNavigate: (v: View) => void;
}) {
  const Item = ({ id, label }: { id: View; label: string }) => (
    <button
      onClick={() => onNavigate(id)}
      aria-current={view === id ? "page" : undefined}
      style={{
        padding: "8px 12px",
        borderRadius: 10,
        border: "1px solid #e5e7eb",
        background: view === id ? "#e9efff" : "white",
        fontWeight: 600,
      }}
    >
      {label}
    </button>
  );

  return (
    <header
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        padding: 16,
        borderBottom: "1px solid #eef2f7",
        background: "white",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <h1 style={{ fontSize: 20, marginRight: 8 }}>HumorTracker</h1>
      <nav style={{ display: "flex", gap: 8 }}>
        <Item id="registro" label="Registro" />
        <Item id="graficos" label="Gráficos" />
        <Item id="exportar" label="Exportar" />
      </nav>
    </header>
  );
}
