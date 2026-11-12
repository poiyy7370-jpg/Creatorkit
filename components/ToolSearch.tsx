"use client";
import { useState } from "react";
import Link from "next/link";
import { tools } from "@/lib/tools";
export default function ToolSearch() {
  const [q, setQ] = useState("");
  const r = q.trim() ? tools.filter(t => (t.name + t.description + t.category).toLowerCase().includes(q.toLowerCase())) : [];
  return (
    <div className="mx-auto max-w-xl">
      <label htmlFor="s" className="sr-only">Search tools</label>
      <input id="s" className="input !py-3" placeholder="Search tools, e.g. hashtags" value={q} onChange={e => setQ(e.target.value)} />
      {q.trim() && (
        <ul className="mt-2 rounded-lg border border-slate-200 bg-white text-left dark:border-slate-700 dark:bg-slate-900">
          {r.length ? r.map(t => <li key={t.slug}><Link className="block px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" href={`/tools/${t.slug}`}>{t.name}</Link></li>) : <li className="px-3 py-2 text-sm">No tools match “{q}”.</li>}
        </ul>
      )}
    </div>
  );
}
