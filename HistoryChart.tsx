import React, { useMemo } from "react";
import { db } from "../data/db";
import { useLiveQuery } from "dexie-react-hooks";
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend,
} from "chart.js";
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function HistoryChart() {
  const entries = useLiveQuery(() => db.entries.orderBy("date").toArray(), []) ?? [];

  const last30 = useMemo(() => {
    const cutoff = dayjs().subtract(30, "day");
    return entries.filter(e => dayjs(e.date).isAfter(cutoff)).sort((a,b)=>a.date.localeCompare(b.date));
  }, [entries]);

  const data = {
    labels: last30.map(e => e.date),
    datasets: [{ label: "Ánimo (1–5)", data: last30.map(e => e.mood), tension: 0.3 }]
  };

  const avgWeek = (() => {
    const weeks = new Map<string, number[]>();
    for (const e of last30) {
      const key = dayjs(e.date).startOf("week").format("YYYY-[W]WW");
      if (!weeks.has(key)) weeks.set(key, []);
      weeks.get(key)!.push(e.mood);
    }
    const items = [...weeks.entries()].map(([k, arr]) => ({ k, avg: arr.reduce((a,b)=>a+b,0)/arr.length }));
    return items.map(x => `${x.k}: ${x.avg.toFixed(2)}`).join(" • ");
  })();

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold">Historial (últimos 30 días)</h2>
      <Line data={data} />
      <p className="text-sm">Medias semanales: {avgWeek || "—"}</p>
    </div>
  );
}
