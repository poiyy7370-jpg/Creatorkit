"use client";
import { useState } from "react";
export default function WordCounter() {
  const [t, setT] = useState("");
  const words = t.trim() ? t.trim().split(/\s+/).length : 0;
  const sentences = (t.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? []).filter(s => s.trim()).length;
  const paragraphs = t.split(/\n\s*\n/).filter(p => p.trim()).length;
  const stats: [string, string | number][] = [["Words", words], ["Characters", t.length], ["Sentences", sentences], ["Paragraphs", paragraphs], ["Reading time", `${Math.max(words ? 1 : 0, Math.ceil(words / 225))} min`]];
  return (<div>
    <p className="mb-2 text-sm">Paste or type your text. Counts update as you type.</p>
    <textarea className="input h-56" value={t} onChange={e => setT(e.target.value)} aria-label="Text to count" />
    <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">{stats.map(([k, v]) => <div key={k} className="rounded-lg border border-slate-200 p-3 dark:border-slate-800"><dt className="text-xs">{k}</dt><dd className="text-xl font-bold">{v}</dd></div>)}</dl>
    <button className="btn-ghost mt-4" onClick={() => setT("")}>Clear</button>
  </div>);
}
