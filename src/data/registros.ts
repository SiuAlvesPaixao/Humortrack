import dayjs from "dayjs";

export type Registro = {
  fecha: string;          // YYYY-MM-DD
  nivel: 1|2|3|4|5;
  etiquetas: string[];
  nota?: string;
};

const KEY = "registrosHumor";

export function leerTodos(): Registro[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    const arr: Registro[] = raw ? JSON.parse(raw) : [];
    return arr
      .filter(x => x && x.fecha && x.nivel)
      .sort((a,b) => a.fecha.localeCompare(b.fecha));
  } catch { return []; }
}

export function guardar(reg: Registro) {
  if (typeof window === "undefined") return;
  const todos = leerTodos();
  const i = todos.findIndex(x => x.fecha === reg.fecha);
  if (i >= 0) todos[i] = reg; else todos.push(reg);
  localStorage.setItem(KEY, JSON.stringify(todos));
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
