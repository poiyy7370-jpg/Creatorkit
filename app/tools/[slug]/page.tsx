import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tools } from "@/lib/tools";
import AdSlot from "@/components/AdSlot";
import WordCounter from "@/components/tools/WordCounter";
import CharacterCounter from "@/components/tools/CharacterCounter";
import HashtagGenerator from "@/components/tools/HashtagGenerator";
import TitleGenerator from "@/components/tools/TitleGenerator";
import DescriptionGenerator from "@/components/tools/DescriptionGenerator";
import BioGenerator from "@/components/tools/BioGenerator";
import ImageCompressor from "@/components/tools/ImageCompressor";
import ImageResizer from "@/components/tools/ImageResizer";
import QrGenerator from "@/components/tools/QrGenerator";
import ThumbnailResizer from "@/components/tools/ThumbnailResizer";
import ThumbnailMaker from "@/components/tools/ThumbnailMaker";
import VideoToShorts from "@/components/video/VideoToShorts";
import AIPhotoEnhancer from "@/components/tools/AIPhotoEnhancer";

const map: Record<string, () => JSX.Element> = {
  "word-counter": WordCounter,
  "character-counter": CharacterCounter,
  "hashtag-generator": HashtagGenerator,
  "youtube-title-generator": TitleGenerator,
  "youtube-description-generator": DescriptionGenerator,
  "instagram-bio-generator": BioGenerator,
  "image-compressor": ImageCompressor,
  "image-resizer": ImageResizer,
  "qr-code-generator": QrGenerator,
  "youtube-thumbnail-resizer": ThumbnailResizer,
  "thumbnail-maker": ThumbnailMaker,
  "long-video-to-shorts": VideoToShorts,
  "ai-photo-enhancer": AIPhotoEnhancer,
};

export const dynamicParams = false;

export const generateStaticParams = () =>
  tools.map((t) => ({ slug: t.slug }));

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const t = tools.find((x) => x.slug === params.slug);
  if (!t) return {};

  return {
    title: t.name,
    description: t.description,
    alternates: { canonical: `/tools/${t.slug}` },
    openGraph: { title: t.name, description: t.description },
  };
}

export default function ToolPage({
  params,
}: {
  params: { slug: string };
}) {
  const t = tools.find((x) => x.slug === params.slug);
  const C = map[params.slug];

  if (!t || !C) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold">{t.name}</h1>
      <p className="mt-2 mb-6 text-slate-600 dark:text-slate-400">
        {t.description}
      </p>
      <C />
      <AdSlot id={`ad-${t.slug}`} />
    </article>
  );
}