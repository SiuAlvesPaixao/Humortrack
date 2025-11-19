import { useState } from "react";
import RegistroHumor from "./components/RegistroHumor";
import NavBar from "./components/NavBar";
import Analytics from "./pages/Analytics";
import { exportarCSV } from "./utils/exportCsv";

type View = "registro" | "graficos" | "exportar";

export default function App() {
  const [mensajeExito, setMensajeExito] = useState("");
  const [view, setView] = useState<View>("registro");

  const manejarGuardado = () => {
    setMensajeExito("✓ Registro guardado correctamente");
    setTimeout(() => setMensajeExito(""), 3000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", paddingBottom: 40 }}>
      <NavBar view={view} onNavigate={setView} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px" }}>
        {mensajeExito && (
          <div
            style={{
              background: "#d1fae5",
              color: "#065f46",
              padding: 16,
              borderRadius: 8,
              marginBottom: 24,
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {mensajeExito}
          </div>
        )}

        {view === "registro" && (
          <div style={{ background: "white", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.1)", padding: 32 }}>
            <RegistroHumor alGuardar={manejarGuardado} />
          </div>
        )}

        {view === "graficos" && <Analytics />}

        {view === "exportar" && (
          <div style={{ background: "white", borderRadius: 12, padding: 32 }}>
            <h2 style={{ marginBottom: 12 }}>Exportar datos</h2>
            <p style={{ marginBottom: 12 }}>
              Descarga tu historial en CSV para compartirlo con profesionales o guardarlo.
            </p>
            <button
              onClick={exportarCSV}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #2563eb",
                background: "#2563eb",
                color: "white",
                fontWeight: 700,
              }}
            >
              Descargar CSV
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
