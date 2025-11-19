import React from "react";
import { leerUltimosDias, mediasSemanales, contarEtiquetas } from "../data/registros";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, BarElement
} from "chart.js";
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, BarElement);

export default function Analytics() {
  const [days, setDays] = React.useState<30|90|365>(30);
  const dataSel = React.useMemo(() => leerUltimosDias(days), [days]);
  const weekly = React.useMemo(() => mediasSemanales(dataSel), [dataSel]);
  const tags = React.useMemo(() => contarEtiquetas(dataSel), [dataSel]);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      {/* selector de rango */}
      <div style={{ marginBottom: 16 }}>
        {[30,90,365].map(n=>(
          <button key={n}
            onClick={()=>setDays(n as 30|90|365)}
            style={{
              padding:"6px 10px", borderRadius:8, border:"1px solid #e5e7eb",
              background: days===n ? "#e9efff" : "white", fontWeight:600, marginRight:8
            }}>
            {n} días
          </button>
        ))}
      </div>

      {/* Tendencia */}
      <section style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 8 }}>Tendencia (1–5)</h3>
        <Line data={{
          labels: dataSel.map(r=>r.fecha),
          datasets: [{ label: "Ánimo", data: dataSel.map(r=>r.nivel), tension: 0.3 }]
        }}/>
      </section>

      {/* Media semanal */}
      <section style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 8 }}>Media semanal</h3>
        <Bar data={{
          labels: weekly.map(w=>w.weekStart),
          datasets: [{ label: "Media", data: weekly.map(w=>Number(w.avg.toFixed(2))) }]
        }}/>
      </section>

      {/* Uso de etiquetas */}
      <section>
        <h3 style={{ marginBottom: 8 }}>Etiquetas más usadas</h3>
        <Bar data={{
          labels: tags.map(t=>t.tag),
          datasets: [{ label: "Veces", data: tags.map(t=>t.count) }]
        }}/>
      </section>
    </div>
  );
}
