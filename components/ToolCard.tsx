import Link from "next/link";
import type { Tool } from "@/lib/tools";

export default function ToolCard({ t }: { t: Tool }) {
  return (
    <Link
      href={`/tools/${t.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-slate-900 via-[#100d20] to-slate-950 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-xl hover:shadow-purple-900/30"
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-purple-600/10 blur-2xl transition-all group-hover:bg-purple-500/25" />

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-400">
            {t.category}
          </span>

          <span className="text-xl text-amber-400 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>

        <h3 className="text-lg font-bold text-white transition-colors group-hover:text-amber-300">
          {t.name}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {t.description}
        </p>

        <div className="mt-5 text-xs font-bold uppercase tracking-wider text-purple-400 group-hover:text-amber-400">
          Open Tool →
        </div>
      </div>
    </Link>
  );
}
