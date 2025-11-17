import { db } from "../data/db";
import Papa from "papaparse";

export async function exportCsv() {
  const entries = await db.entries.orderBy("date").toArray();
  const csv = Papa.unparse(entries, { quotes: true });
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "humortracker.csv";
  a.click();
  URL.revokeObjectURL(url);
}
