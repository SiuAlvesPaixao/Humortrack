import { useState } from "react";
import RegistroHumor from "./components/RegistroHumor";
import NavBar from "./components/NavBar";
import Analytics from "./pages/Analytics";         // si aún no lo tienes, crea después
import { exportarCSV } from "./utils/exportCsv";   // idem

type View = "registro" | "graficos" | "exportar";

export default function App() {
  const [mensajeExito, setMensajeExito] = useState("");
  const [view, setView] = useState<View>("registro");

  const manejarGuardado = () => {
    setMensajeExito("✓ Registro guardado correctamente");
    setTimeout(() => setMensajeExito(""), 3000);
  };

  return (
    <div className="app-shell">
      <NavBar view={view} onNavigate={setView} />

      <main className="app-main">
        <div className="container" style={{ display: "grid", gap: 24 }}>
          {mensajeExito && <div className="banner-success">{mensajeExito}</div>}

          {view === "registro" && (
            <section className="card" style={{ maxWidth: 800, margin: "0 auto", width: "100%" }}>
              <RegistroHumor alGuardar={manejarGuardado} />
            </section>
          )}

          {view === "graficos" && (
            <section className="card" style={{ width: "100%" }}>
              <Analytics />
            </section>
          )}

          {view === "exportar" && (
            <section className="card" style={{ maxWidth: 720, margin: "0 auto", width: "100%" }}>
              <h2 style={{ marginTop: 0 }}>Exportar datos</h2>
              <p style={{ marginBottom: 16 }}>
                Descarga tu historial en CSV para compartirlo o guardarlo.
              </p>
              <button className="btn" onClick={exportarCSV}>Descargar CSV</button>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
