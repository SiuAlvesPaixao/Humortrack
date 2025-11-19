import React from "react";
import { Bar } from "react-chartjs-2";
import { db } from "../../data/db";
import { useLiveQuery } from "dexie-react-hooks";
import { filterByDays, weeklyAverages } from "../../data/stats";
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function WeeklyAverageChart({ days }: { days: number }) {
  const entries = useLiveQuery(() => db.entries.orderBy("date").toArray(), []) ?? [];
  const sel = filterByDays(entries, days);
  const weeks = weeklyAverages(sel);

  const data = {
    labels: weeks.map((w) => w.weekStart),
    datasets: [{ label: "Media semanal", data: weeks.map((w) => Number(w.avg.toFixed(2))) }],
  };

  return (
    <div>
      <h3 style={{ marginBottom: 8 }}>Media semanal</h3>
      <Bar data={data} />
    </div>
  );
}
