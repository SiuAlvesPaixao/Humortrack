import React from "react";
import { leerUltimosDias, mediasSemanales, contarEtiquetas } from "../data/registros";
import { cargarDemo30Dias, limpiarDemo } from "../utils/demo";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, BarElement
} from "chart.js";
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, BarElement);

export default function Analytics() {
  const [days, setDays] = React.useState<30 | 90 | 365>(30);
  const [refresh, setRefresh] = React.useState(0); // para re-calcular tras cargar/limpiar demo

  const dataSelRaw = React.useMemo(() => leerUltimosDias(days), [days, refresh]);

  // Normaliza: si no hay r.nivel, usa r.valorHumor
  const dataSel = React.useMemo(
    () => dataSelRaw.map((r: any) => ({ ...r, nivel: r.nivel ?? r.valorHumor })),
    [dataSelRaw]
  );

  const weekly = React.useMemo(() => mediasSemanales(dataSel), [dataSel]);
  const tags = React.useMemo(() => contarEtiquetas(dataSel), [dataSel]);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      {/* Cabecera de acciones */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          {[30, 90, 365].map((n) => (
            <button
              key={n}
              onClick={() => setDays(n as 30 | 90 | 365)}
              style={{
                padding: "6px 10px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                background: days === n ? "#e9efff" : "white",
                fontWeight: 600,
                marginRight: 8,
              }}
            >
              {n} días
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => { cargarDemo30Dias(); setRefresh((r) => r + 1); setDays(30); }}
            style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #c7d2fe", background: "#eef2ff", fontWeight: 700 }}
            title="Cargar 30 días de datos simulados"
          >
            Cargar demo (30 días)
          </button>
          <button
            onClick={() => { limpiarDemo(); setRefresh((r) => r + 1); }}
            style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#fff", fontWeight: 600 }}
            title="Eliminar datos de demo"
          >
            Vaciar demo
          </button>
        </div>
      </div>

      {/* Tendencia */}
      <section style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 8 }}>Tendencia (1–5)</h3>
        <Line
          data={{
            labels: dataSel.map((r: any) => r.fecha),
            datasets: [{ label: "Ánimo", data: dataSel.map((r: any) => r.nivel), tension: 0.3 }],
          }}
        />
      </section>

      {/* Media semanal */}
      <section style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 8 }}>Media semanal</h3>
        <Bar
          data={{
            labels: weekly.map((w: any) => w.weekStart),
            datasets: [{ label: "Media", data: weekly.map((w: any) => Number(w.avg.toFixed(2))) }],
          }}
        />
      </section>

      {/* Uso de etiquetas */}
      <section>
        <h3 style={{ marginBottom: 8 }}>Etiquetas más usadas</h3>
        <Bar
          data={{
            labels: tags.map((t: any) => t.tag),
            datasets: [{ label: "Veces", data: tags.map((t: any) => t.count) }],
          }}
        />
      </section>
    </div>
  );
}
