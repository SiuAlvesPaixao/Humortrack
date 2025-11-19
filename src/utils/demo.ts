// src/utils/demo.ts
// Genera 30 días de registros realistas y los guarda en localStorage
// Ajusta la clave si tu almacenamiento usa otra distinta.
const KEY = "registrosHumor";

type Registro = {
  fecha: string;            // YYYY-MM-DD
  valorHumor: 1 | 2 | 3 | 4 | 5;
  nota: string;
  etiquetas: string[];
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function rand(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

export function cargarDemo30Dias() {
  const hoy = new Date();
  const registros: Registro[] = [];

  const etiquetas = ["Sueño", "Ejercicio", "Trabajo", "Estudios", "Relaciones sociales", "Familia"];
  const notas = [
    "Buen foco por la mañana.",
    "Mucho trabajo, poca energía.",
    "Salí a caminar y me despejé.",
    "Noche regular de sueño.",
    "Día social y con risas.",
    "Exámenes cerca, algo de estrés.",
    "Me organicé y todo fluyó mejor."
  ];

  for (let i = 29; i >= 0; i--) {
    const d = new Date(hoy);
    d.setDate(hoy.getDate() - i);
    const fecha = d.toISOString().slice(0, 10);

    // Patrón realista:
    // - Fin de semana suele subir (+0.5)
    // - "Semana de exámenes" (hace ~2 semanas): baja (-1)
    // - Ruido suave ±0.6
    const esFinDe = d.getDay() === 0 || d.getDay() === 6;
    const enExamenes = i >= 12 && i <= 16; // ajusta ventana si quieres
    let base = 3 + (esFinDe ? 0.5 : 0) + (enExamenes ? -1 : 0) + (rand(-0.6, 0.6));
    const valorHumor = clamp(Math.round(base), 1, 5) as 1 | 2 | 3 | 4 | 5;

    // Etiquetas coherentes con el día
    const pick: string[] = [];
    if (esFinDe && Math.random() < 0.6) pick.push("Familia");
    if (!esFinDe && Math.random() < 0.7) pick.push("Trabajo");
    if (enExamenes && Math.random() < 0.8) pick.push("Estudios");
    if (Math.random() < 0.4) pick.push("Sueño");
    if (Math.random() < 0.5) pick.push("Ejercicio");
    if (Math.random() < 0.3) pick.push("Relaciones sociales");

    const nota = notas[Math.floor(rand(0, notas.length))];

    registros.push({ fecha, valorHumor, nota, etiquetas: [...new Set(pick)] });
  }

  // Sobrescribimos el histórico con la demo (upsert por fecha)
  localStorage.setItem(KEY, JSON.stringify(registros));
}

export function limpiarDemo() {
  localStorage.removeItem(KEY);
}
