import React from "react";
import MoodForm from "./components/MoodForm";
import HistoryChart from "./components/HistoryChart";
import { exportCsv } from "./utils/exportCsv";

export default function App() {
  const [view, setView] = React.useState<"hoy" | "historial">("hoy");
  return (
    <div className="min-h-screen">
      <header className="p-4 border-b flex items-center gap-3">
        <h1 className="font-bold">HumorTracker</h1>
        <nav className="flex gap-2">
          <button onClick={() => setView("hoy")}>Hoy</button>
          <button onClick={() => setView("historial")}>Historial</button>
        </nav>
        <div className="ml-auto">
          <button onClick={exportCsv}>Exportar CSV</button>
        </div>
      </header>
      <main>{view === "hoy" ? <MoodForm /> : <HistoryChart />}</main>
    </div>
  );
}
