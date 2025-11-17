import React, { useMemo, useState, useEffect } from "react";
import { upsertEntryForDate, isoDay, db } from "../data/db";
import { useLiveQuery } from "dexie-react-hooks";
import { Mood } from "../types";

const PRESET_TAGS = ["examen", "sueño", "trabajo", "familia", "amigos"];

export default function MoodForm() {
  const today = useMemo(() => isoDay(), []);
  const existing = useLiveQuery(() => db.entries.where("date").equals(today).first(), [today]);

  const [mood, setMood] = useState<Mood>(3);
  const [note, setNote] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (existing) {
      setMood(existing.mood);
      setNote(existing.note ?? "");
      setTags(existing.tags ?? []);
    }
  }, [existing]);

  const toggleTag = (t: string) =>
    setTags((curr) => (curr.includes(t) ? curr.filter((x) => x !== t) : [...curr, t]));

  async function save() {
    await upsertEntryForDate({ date: today, mood, note, tags });
    alert("Guardado ✅");
  }

  const showNudge = !existing;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold">Registro de hoy ({today})</h2>

      {showNudge && (
        <div className="p-3 border rounded">
          ¿Aún no has registrado hoy? Te llevará <b>30 segundos</b>.
        </div>
      )}

      <div>
        <p className="mb-2">¿Cómo te sientes?</p>
        <div className="flex gap-2 text-2xl">
          {[1,2,3,4,5].map((m) => (
            <button
              key={m}
              onClick={() => setMood(m as Mood)}
              aria-pressed={mood === m}
              className={`border rounded px-3 py-2 ${mood===m ? "border-black" : "border-gray-300"}`}
              title={`Ánimo ${m}`}
            >
              {["😣","😕","😐","🙂","😄"][m-1]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2">Etiquetas rápidas</p>
        <div className="flex flex-wrap gap-2">
          {PRESET_TAGS.map((t) => (
            <button
              key={t}
              onClick={() => toggleTag(t)}
              className={`px-3 py-1 rounded border ${tags.includes(t)? "border-black" : "border-gray-300"}`}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-1" htmlFor="note">Nota (opcional)</label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="w-full border rounded p-2"
          placeholder="Algo breve que quieras recordar…"
        />
      </div>

      <button onClick={save} className="px-4 py-2 border rounded">
        Guardar
      </button>
    </div>
  );
}
