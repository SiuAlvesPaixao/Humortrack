import { leerTodos } from "../data/registros";
import Papa from "papaparse";

export function exportarCSV() {
  const rows = leerTodos();
  const csv = Papa.unparse(rows, { quotes: true });
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "humortracker.csv"; a.click();
  URL.revokeObjectURL(url);
}
