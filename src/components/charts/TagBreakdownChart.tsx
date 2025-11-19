import React from "react";
import { Bar } from "react-chartjs-2";
import { db } from "../../data/db";
import { useLiveQuery } from "dexie-react-hooks";
import { filterByDays, tagCounts } from "../../data/stats";
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function TagBreakdownChart({ days }: { days: number }) {
  const entries = useLiveQuery(() => db.entries.orderBy("date").toArray(), []) ?? [];
  const sel = filterByDays(entries, days);
  const list = tagCounts(sel);

  const data = {
    labels: list.map((x) => x.tag),
    datasets: [{ label: "Veces usadas", data: list.map((x) => x.count) }],
  };

  return (
    <div>
      <h3 style={{ marginBottom: 8 }}>Etiquetas más usadas</h3>
      <Bar data={data} />
    </div>
  );
}
