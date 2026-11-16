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

  const title = t.seoTitle;
  const description = t.metaDescription;
  const canonical = `https://creatorkit-three.vercel.app/tools/${t.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "CreatorKit",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
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

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-bold">
          About {t.name}
        </h2>

        <p className="text-slate-600 dark:text-slate-400">
          {t.content}
        </p>

        <h2 className="text-2xl font-bold">
          How to Use {t.name}
        </h2>

        <ol className="list-decimal space-y-2 pl-6 text-slate-600 dark:text-slate-400">
         {(t.howToUse ?? []).map((step, index) => (
  <li key={index}>{step}</li>
))}
        </ol>

        <h2 className="text-2xl font-bold">
          Frequently Asked Questions
        </h2>

       {(t.faqs ?? []).map((faq, index) => (
          <div key={index} className="border-b border-slate-200 py-4 dark:border-slate-700">
            <h3 className="font-semibold">{faq.question}</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              {faq.answer}
            </p>
          </div>
        ))}
      </section>
    </article>
  );
}