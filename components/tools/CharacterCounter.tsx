"use client";
import { useState } from "react";
const limits: [string, number][] = [["YouTube title", 100], ["YouTube description", 5000], ["Instagram caption", 2200], ["Instagram bio", 150], ["X post", 280], ["TikTok caption", 2200]];
export default function CharacterCounter() {
  const [t, setT] = useState("");
  return (<div>
    <p className="mb-2 text-sm">Type your text to see how it fits each platform’s limit.</p>
    <textarea className="input h-40" value={t} onChange={e => setT(e.target.value)} aria-label="Text to count" />
    <p className="mt-2 text-sm">{t.length} characters ({t.replace(/\s/g, "").length} without spaces)</p>
    <ul className="mt-4 space-y-2">{limits.map(([n, l]) => { const over = t.length > l; return (
      <li key={n} className="text-sm"><div className="flex justify-between"><span>{n}</span><span className={over ? "font-semibold text-red-600" : ""}>{t.length}/{l}{over ? ` (${t.length - l} over)` : ""}</span></div>
      <div className="h-2 rounded bg-slate-200 dark:bg-slate-800"><div className={`h-2 rounded ${over ? "bg-red-500" : "bg-brand"}`} style={{ width: `${Math.min(100, (t.length / l) * 100)}%` }} /></div></li>); })}</ul>
  </div>);
}
