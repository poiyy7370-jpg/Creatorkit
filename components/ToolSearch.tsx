"use client";

import { useState } from "react";
import Link from "next/link";
import { tools } from "@/lib/tools";

export default function ToolSearch() {
  const [q, setQ] = useState("");

  const r = q.trim()
    ? tools.filter((t) =>
        (t.name + t.description + t.category)
          .toLowerCase()
          .includes(q.toLowerCase())
      )
    : [];

  return (
    <div className="mx-auto max-w-xl">
      <label htmlFor="s" className="sr-only">
        Search tools
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-amber-400">
          ⌕
        </span>

        <input
          id="s"
          className="w-full rounded-xl border border-amber-400/40 bg-slate-950/90 py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 shadow-lg transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
          placeholder="Search tools, e.g. hashtags..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {q.trim() && (
        <ul className="mt-2 max-h-64 overflow-y-auto rounded-xl border border-amber-400/30 bg-slate-950 text-left shadow-2xl">
          {r.length ? (
            r.map((t) => (
              <li key={t.slug}>
                <Link
                  className="block border-b border-white/5 px-4 py-3 text-sm text-slate-200 transition-colors last:border-0 hover:bg-purple-900/30 hover:text-amber-300"
                  href={`/tools/${t.slug}`}
                >
                  {t.name}
                </Link>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-sm text-slate-400">
              No tools match “{q}”.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
