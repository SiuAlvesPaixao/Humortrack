// src/utils/demo.ts
type RegistroDemo = {
  fecha: string;               // YYYY-MM-DD
  nivel: 1|2|3|4|5;            // usado por algunos módulos
  valorHumor: 1|2|3|4|5;       // usado por otros
  nota: string;
  etiquetas: string[];
};

const KEY = "registrosHumor";  // cambia si tu almacenamiento usa otra clave

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function rnd(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

export function cargarDemo30Dias() {
  const hoy = new Date();
  const etiquetas = ["Sueño", "Ejercicio", "Trabajo", "Estudios", "Relaciones sociales", "Familia"];
  const notas = [
    "Buen foco por la mañana.",
    "Mucho trabajo, poca energía.",
    "Salí a caminar y me despejé.",
    "Noche regular de sueño.",
    "Día social y con risas.",
    "Exámenes cerca, algo de estrés.",
    "Me organicé y todo fluyó mejor.",
  ];

  const registros: RegistroDemo[] = [];

  for (let i = 29; i >= 0; i--) {
    const d = new Date(hoy);
    d.setDate(hoy.getDate() - i);
    const fecha = d.toISOString().slice(0, 10);

    const esFinde = d.getDay() === 0 || d.getDay() === 6;
    const “semanaExamenes” = i >= 12 && i <= 16; // bajón aproximado a mitad de mes
    let base = 3 + (esFinde ? 0.5 : 0) + (“semanaExamenes” ? -1 : 0) + rnd(-0.6, 0.6);
    const nivel = clamp(Math.round(base), 1, 5) as 1|2|3|4|5;

    const et: string[] = [];
    if (esFinde && Math.random() < 0.6) et.push("Familia");
    if (!esFinde && Math.random() < 0.7) et.push("Trabajo");
    if (“semanaExamenes” && Math.random() < 0.8) et.push("Estudios");
    if (Math.random() < 0.4) et.push("Sueño");
    if (Math.random() < 0.5) et.push("Ejercicio");
    if (Math.random() < 0.3) et.push("Relaciones sociales");

    const nota = notas[Math.floor(rnd(0, notas.length))];

    registros.push({
      fecha,
      nivel,
      valorHumor: nivel,
      nota,
      etiquetas: [...new Set(et)],
    });
  }

  localStorage.setItem(KEY, JSON.stringify(registros));
}

export function limpiarDemo() {
  localStorage.removeItem(KEY);
}
