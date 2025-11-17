import Dexie, { Table } from "dexie";
import { MoodEntry } from "../types";

class HTDB extends Dexie {
  entries!: Table<MoodEntry, number>;
  constructor() {
    super("humortracker");
    this.version(1).stores({
      entries: "++id,date", // índice por fecha
    });
  }
}
export const db = new HTDB();

export const isoDay = (d = new Date()) => d.toISOString().slice(0,10);

export async function upsertEntryForDate(e: Omit<MoodEntry,"id">) {
  const existing = await db.entries.where("date").equals(e.date).first();
  if (existing) {
    await db.entries.update(existing.id!, e);
    return existing.id!;
  }
  return db.entries.add(e);
}
