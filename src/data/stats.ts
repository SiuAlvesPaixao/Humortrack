import dayjs from "dayjs";
import { MoodEntry } from "../types";

export function filterByDays(entries: MoodEntry[], days: number) {
  const cutoff = dayjs().subtract(days, "day");
  return entries
    .filter((e) => dayjs(e.date).isAfter(cutoff))
    .sort((a, b) => a.date.localeCompare(b.date));
}

// Lunes como inicio de semana sin plugins
function startOfIsoWeek(d: string) {
  const date = dayjs(d);
  const monday = date.subtract((date.day() + 6) % 7, "day");
  return monday.format("YYYY-MM-DD");
}

export function weeklyAverages(entries: MoodEntry[]) {
  const map = new Map<string, number[]>();
  for (const e of entries) {
    const k = startOfIsoWeek(e.date);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(e.mood);
  }
  return [...map.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([k, arr]) => ({ weekStart: k, avg: arr.reduce((s, x) => s + x, 0) / arr.length }));
}

export function tagCounts(entries: MoodEntry[]) {
  const counts = new Map<string, number>();
  for (const e of entries) for (const t of e.tags ?? []) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([tag, count]) => ({ tag, count }));
}
