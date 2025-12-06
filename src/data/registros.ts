import dayjs from "dayjs";

export type Registro = {
  fecha: string;
  nivel: 1|2|3|4|5;
  etiquetas: string[];
  nota?: string;
};

const KEY = "registros-humor"; // IMPORTANTE: mismo que almacenamiento.ts

export function leerTodos(): Registro[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    
    // Convertir de nuestro formato (valorHumor) al formato que espera (nivel)
    return arr
      .filter((x: any) => x && x.fecha && (x.valorHumor || x.nivel))
      .map((x: any) => ({
        fecha: x.fecha,
        nivel: x.valorHumor || x.nivel,
        etiquetas: x.etiquetas || [],
        nota: x.nota
      }))
      .sort((a, b) => a.fecha.localeCompare(b.fecha));
  } catch { return []; }
}

export function guardar(reg: Registro) {
  if (typeof window === "undefined") return;
  const todos = leerTodos();
  const i = todos.findIndex(x => x.fecha === reg.fecha);
  
  // Convertir al formato valorHumor
  const registroGuardar = {
    fecha: reg.fecha,
    valorHumor: reg.nivel,
    nota: reg.nota || '',
    etiquetas: reg.etiquetas
  };
  
  if (i >= 0) {
    todos[i] = reg;
  } else {
    todos.push(reg);
  }
  
  const datosGuardar = todos.map(r => ({
    fecha: r.fecha,
    valorHumor: r.nivel,
    nota: r.nota || '',
    etiquetas: r.etiquetas
  }));
  
  localStorage.setItem(KEY, JSON.stringify(datosGuardar));
}

export function leerUltimosDias(dias: number): Registro[] {
  const cutoff = dayjs().subtract(dias, "day");
  return leerTodos()
    .filter(r => dayjs(r.fecha).isAfter(cutoff))
    .sort((a,b) => a.fecha.localeCompare(b.fecha));
}

export function mediasSemanales(regs: Registro[]) {
  const map = new Map<string, number[]>();
  for (const r of regs) {
    const d = dayjs(r.fecha);
    const monday = d.subtract((d.day() + 6) % 7, "day").format("YYYY-MM-DD");
    if (!map.has(monday)) map.set(monday, []);
    map.get(monday)!.push(r.nivel);
  }
  return [...map.entries()]
    .sort((a,b)=>a[0].localeCompare(b[0]))
    .map(([weekStart, vals]) => ({
      weekStart,
      avg: vals.reduce((s,x)=>s+x,0)/vals.length
    }));
}

export function contarEtiquetas(regs: Registro[]) {
  const map = new Map<string, number>();
  for (const r of regs) for (const t of r.etiquetas ?? [])
    map.set(t, (map.get(t) ?? 0) + 1);
  return [...map.entries()].sort((a,b)=>b[1]-a[1]).map(([tag,count])=>({tag,count}));
}
