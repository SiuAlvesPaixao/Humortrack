import React from "react";
import { Line } from "react-chartjs-2";
import { db } from "../../data/db";
import { useLiveQuery } from "dexie-react-hooks";
import { filterByDays } from "../../data/stats";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function MoodTrendChart({ days }: { days: number }) {
  const entries = useLiveQuery(() => db.entries.orderBy("date").toArray(), []) ?? [];
  const dataSel = filterByDays(entries, days);

  const data = {
    labels: dataSel.map((e) => e.date),
    datasets: [
      {
        label: "Ánimo (1–5)",
        data: dataSel.map((e) => e.mood),
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      <h3 style={{ marginBottom: 8 }}>Tendencia últimos {days} días</h3>
      <Line data={data} />
    </div>
  );
}
