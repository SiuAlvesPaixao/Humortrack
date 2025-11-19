import React from "react";

export default function MoodLegend() {
  const items = [
    {
      icon: "😭",
      title: "1 — Tormenta",
      desc:
        "Desbordado/a: tristeza, ansiedad o rabia.",
    },
    {
      icon: "😟",
      title: "2 — Bajo",
      desc:
        "Decaimiento o irritabilidad. Me cuesta arrancar.",
    },
    {
      icon: "😐",
      title: "3 — Neutro",
      desc:
        "Estable. No es gran día ni mal día.",
    },
    {
      icon: "🙂",
      title: "4 — Ligero",
      desc:
        "Bienestar suave. Calma y pequeñas alegrías.",
    },
    {
      icon: "😁",
      title: "5 — En alto",
      desc:
        "Energía y conexión. Ganas de compartir.",
    },
  ];

  return (
    <section
      style={{
        marginTop: 12,
        display: "grid",
        gap: 12,
        gridTemplateColumns: "1fr",
      }}
      data-testid="mood-legend"
    >
      {items.map((it) => (
        <article
          key={it.title}
          style={{
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            padding: "12px 14px",
            border: "1px solid #eef2f7",
            borderRadius: 12,
            background: "#fff",
          }}
        >
          <div style={{ fontSize: 24, lineHeight: 1, paddingTop: 2 }} aria-hidden>
            {it.icon}
          </div>
          <div>
            <h4 style={{ margin: "0 0 4px", fontWeight: 700 }}>{it.title}</h4>
            <p style={{ margin: 0, color: "#475569" }}>{it.desc}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
