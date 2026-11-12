import Link from "next/link";
import type { Tool } from "@/lib/tools";
export default function ToolCard({ t }: { t: Tool }) {
  return (
    <Link href={`/tools/${t.slug}`} className="block rounded-xl border border-slate-200 p-5 hover:border-brand dark:border-slate-800">
      <p className="text-xs text-brand">{t.category}</p>
      <h3 className="mt-1 font-semibold">{t.name}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t.description}</p>
    </Link>
  );
}
