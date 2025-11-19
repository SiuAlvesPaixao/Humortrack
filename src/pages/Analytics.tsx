import React from "react";
import MoodTrendChart from "../components/charts/MoodTrendChart";
import WeeklyAverageChart from "../components/charts/WeeklyAverageChart";
import TagBreakdownChart from "../components/charts/TagBreakdownChart";

export default function Analytics() {
  const [days, setDays] = React.useState<30 | 90 | 365>(30);

  const Btn = ({ n }: { n: 30 | 90 | 365 }) => (
    <button
      onClick={() => setDays(n)}
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
  );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <Btn n={30} />
        <Btn n={90} />
        <Btn n={365} />
      </div>

      <div style={{ display: "grid", gap: 24 }}>
        <MoodTrendChart days={days} />
        <WeeklyAverageChart days={days} />
        <TagBreakdownChart days={days} />
      </div>
    </div>
  );
}
