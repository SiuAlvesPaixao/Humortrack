import React from "react";

type Item = { icon: string; title: string; desc: string };

const items: Item[] = [
  {
    icon: "😭",
    title: "1 — Tormenta",
    desc:
      "Me siento desbordado/a: tristeza, ansiedad o rabia. Hoy toca frenar, pedir apoyo y cuidarme sin exigirme nada.",
  },
  {
    icon: "😟",
    title: "2 — Bajo",
    desc:
      "Estoy decaído/a o irritable. Me cuesta arrancar y concentrarme. Necesito algo sencillo: aire, agua, descanso.",
  },
  {
    icon: "😐",
    title: "3 — Neutro",
    desc:
      "Estoy estable. No es un gran día ni un mal día. Puedo sostener lo que venga y hacer lo importante sin prisa.",
  },
  {
    icon: "🙂",
    title: "4 — Ligero",
    desc:
      "Me siento bien: hay calma y pequeñas alegrías. Avanzo con claridad, me organizo y agradezco lo que sí hay.",
  },
  {
    icon: "😁",
    title: "5 — En alto",
    desc:
      "Energía alta y buen ánimo. Me siento conectado/a y con ganas de compartir. Un día para celebrar y cargar reservas.",
  },
];

export default function MoodLegend() {
  return (
    <section className="legend">
      {items.map((it) => (
        <article key={it.title} className="legend-item">
          <div className="legend-emoji" aria-hidden>{it.icon}</div>
          <div>
            <h4 className="legend-title">{it.title}</h4>
            <p className="legend-desc">{it.desc}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
