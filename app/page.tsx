import ToolSearch from "@/components/ToolSearch";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools";
export default function Home() {
  return (
    <>
      <section className="py-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Everything Creators Need in One Place</h1>
        <p className="mx-auto mt-4 mb-8 max-w-xl text-slate-600 dark:text-slate-400">Free tools for YouTube, Instagram and TikTok. They run in your browser, with no sign-up.</p>
        <ToolSearch />
      </section>
      <section aria-labelledby="pop"><h2 id="pop" className="mb-4 text-2xl font-bold">All creator tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{tools.map(t => <ToolCard key={t.slug} t={t} />)}</div>
      </section>
    </>
  );
}
