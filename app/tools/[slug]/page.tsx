import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tools } from "@/lib/tools";
import AdSlot from "@/components/AdSlot";
import WordCounter from "@/components/tools/WordCounter";
import CharacterCounter from "@/components/tools/CharacterCounter";
import HashtagGenerator from "@/components/tools/HashtagGenerator";
import TitleGenerator from "@/components/tools/TitleGenerator";

const map: Record<string, () => JSX.Element> = {
  "word-counter": WordCounter, "character-counter": CharacterCounter,
  "hashtag-generator": HashtagGenerator, "youtube-title-generator": TitleGenerator,
};
export const dynamicParams = false;
export const generateStaticParams = () => tools.map(t => ({ slug: t.slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const t = tools.find(x => x.slug === params.slug);
  if (!t) return {};
  return { title: t.name, description: t.description, alternates: { canonical: `/tools/${t.slug}` }, openGraph: { title: t.name, description: t.description } };
}
export default function ToolPage({ params }: { params: { slug: string } }) {
  const t = tools.find(x => x.slug === params.slug); const C = map[params.slug];
  if (!t || !C) notFound();
  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold">{t.name}</h1>
      <p className="mt-2 mb-6 text-slate-600 dark:text-slate-400">{t.description}</p>
      <C />
      <AdSlot id={`ad-${t.slug}`} />
    </article>
  );
}
