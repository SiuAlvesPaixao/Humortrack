import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
// Si tu módulo existe, lo seguimos usando; si devuelve vacío, activamos demo
import { leerUltimosDias } from "../data/registros";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  BarElement
);

// ---------- Tipos y utilidades ----------
type Registro = {
  fecha: string;                 // YYYY-MM-DD
  nivel: 1 | 2 | 3 | 4 | 5;      // normalizado (o valorHumor)
  etiquetas?: string[];
};

// Lunes como inicio de semana (ISO)
function startOfIsoWeek(dateStr: string) {
  const d = new Date(dateStr);
  const day = (d.getDay() + 6) % 7; // 0..6 con lunes=0
  d.setDate(d.getDate() - day);
  return d.toISOString().slice(0, 10);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function rand(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

// Genera una serie realista de N días (no guarda nada)
function generarDemo(dias = 30): Registro[] {
  const hoy = new Date();
  const out: Registro[] = [];

  for (let i = dias - 1; i >= 0; i--) {
    const d = new Date(hoy);
    d.setDate(hoy.getDate() - i);
    const fecha = d.toISOString().slice(0, 10);

    const esFinde = d.getDay() === 0 || d.getDay() === 6;
    const enExamenes = i >= 12 && i <= 16; // ventanita de bajón
    let base =
      3 + (esFinde ? 0.5 : 0) + (enExamenes ? -1 : 0) + rand(-0.6, 0.6);
    const nivel = clamp(Math.round(base), 1, 5) as 1 | 2 | 3 | 4 | 5;

    const etiquetas: string[] = [];
    if (esFinde && Math.random() < 0.6) etiquetas.push("Familia");
    if (!esFinde && Math.random() < 0.7) etiquetas.push("Trabajo");
    if (enExamenes && Math.random() < 0.8) etiquetas.push("Estudios");
    if (Math.random() < 0.4) etiquetas.push("Sueño");
    if (Math.random() < 0.5) etiquetas.push("Ejercicio");
    if (Math.random() < 0.3) etiquetas.push("Relaciones sociales");

    out.push({ fecha, nivel, etiquetas: [...new Set(etiquetas)] });
  }
  return out;
}

// A partir de la serie, devuelve [{weekStart, avg}]
function mediasSemanalesDesde(data: Registro[]) {
  const map = new Map<string, number[]>();
  for (const r of data) {
    const k = startOfIsoWeek(r.fecha);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(r.nivel);
  }
  return [...map.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([weekStart, arr]) => ({
      weekStart,
      avg: arr.reduce((s, x) => s + x, 0) / arr.length,
    }));
}

function contarEtiquetasDesde(data: Registro[]) {
  const map = new Map<string, number>();
  for (const r of data) for (const t of r.etiquetas ?? [])
    map.set(t, (map.get(t) ?? 0) + 1);
  return [...map.entries()].sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));
}

// ---------- Componente ----------
export default function Analytics() {
  const [days, setDays] = React.useState<30 | 90 | 365>(30);
  const [refresh, setRefresh] = React.useState(0);

  // 1) Intentamos leer tus datos reales
  const fromStore = React.useMemo(() => {
    try {
      // leerUltimosDias puede devolver [{fecha, nivel}] o [{fecha, valorHumor}]
      const arr: any[] = (leerUltimosDias as any)?.(days) ?? [];
      return arr.map((r) => ({
        fecha: r.fecha,
        nivel: (r.nivel ?? r.valorHumor ?? 3) as 1 | 2 | 3 | 4 | 5,
        etiquetas: r.etiquetas ?? r.tags ?? [],
      })) as Registro[];
    } catch {
      return [] as Registro[];
    }
  }, [days, refresh]);

  // 2) Si no hay datos reales, usamos demo en memoria
  const serie = React.useMemo<Registro[]>(
    () => (fromStore.length ? fromStore : generarDemo(30)),
    [fromStore]
  );

  const weekly = React.useMemo(() => mediasSemanalesDesde(serie), [serie]);
  const tags = React.useMemo(() => contarEtiquetasDesde(serie), [serie]);

  // 3) Botón para guardar demo en localStorage (por si quieres que persista)
  const guardarDemoEnLocal = () => {
    const demo = generarDemo(30).map((r) => ({
      ...r,
      valorHumor: r.nivel, // compatibilidad con tu almacenamiento
    }));
    localStorage.setItem("registrosHumor", JSON.stringify(demo));
    setRefresh((x) => x + 1);
    setDays(30);
  };

  const vaciarDemo = () => {
    localStorage.removeItem("registrosHumor");
    setRefresh((x) => x + 1);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      {/* Acciones */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
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
            onClick={guardarDemoEnLocal}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #c7d2fe",
              background: "#eef2ff",
              fontWeight: 700,
            }}
            title="Guardar 30 días de datos simulados"
          >
            Cargar demo (guardar)
          </button>
          <button
            onClick={vaciarDemo}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              background: "#fff",
              fontWeight: 600,
            }}
            title="Eliminar datos guardados"
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
            labels: serie.map((r) => r.fecha),
            datasets: [
              { label: "Ánimo", data: serie.map((r) => r.nivel), tension: 0.3 },
            ],
          }}
        />
      </section>

      {/* Media semanal */}
      <section style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 8 }}>Media semanal</h3>
        <Bar
          data={{
            labels: weekly.map((w) => w.weekStart),
            datasets: [
              {
                label: "Media",
                data: weekly.map((w) => Number(w.avg.toFixed(2))),
              },
            ],
          }}
        />
      </section>

      {/* Uso de etiquetas */}
      <section>
        <h3 style={{ marginBottom: 8 }}>Etiquetas más usadas</h3>
        <Bar
          data={{
            labels: tags.map((t) => t.tag),
            datasets: [{ label: "Veces", data: tags.map((t) => t.count) }],
          }}
        />
      </section>
    </div>
  );
}
