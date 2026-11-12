import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools";
export const metadata: Metadata = { title: "All Tools", description: "Every free CreatorKit tool in one list.", alternates: { canonical: "/tools" } };
export default function All() {
  return <><h1 className="mb-6 text-3xl font-bold">All tools</h1><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{tools.map(t => <ToolCard key={t.slug} t={t} />)}</div></>;
}
