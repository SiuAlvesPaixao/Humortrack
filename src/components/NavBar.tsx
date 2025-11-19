import React from "react";
type View = "registro" | "graficos" | "exportar";

export default function NavBar({
  view,
  onNavigate,
}: { view: View; onNavigate: (v: View) => void }) {
  const Item = ({ id, label }: { id: View; label: string }) => (
    <button className="nav-btn" onClick={() => onNavigate(id)} aria-current={view === id ? "page" : undefined}>
      {label}
    </button>
  );

  return (
    <header className="app-nav">
      <div className="container app-nav-inner">
        <h1 className="brand">HumorTracker</h1>
        <nav className="nav-group">
          <Item id="registro" label="Registro" />
          <Item id="graficos" label="Gráficos" />
          <Item id="exportar" label="Exportar" />
        </nav>
      </div>
    </header>
  );
}
