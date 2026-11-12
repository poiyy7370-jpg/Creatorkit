export type Tool = { slug: string; name: string; category: "YouTube" | "Instagram" | "Image" | "Text" | "AI"; description: string; popular?: boolean; added: string };
export const tools: Tool[] = [
  { slug: "word-counter", name: "Word Counter", category: "Text", description: "Count words, sentences, paragraphs and reading time.", popular: true, added: "2026-11-12" },
  { slug: "character-counter", name: "Character Counter", category: "Text", description: "Check characters against limits for YouTube, Instagram, X and more.", popular: true, added: "2026-11-12" },
  { slug: "hashtag-generator", name: "Hashtag Generator", category: "Instagram", description: "Turn a topic into relevant, copy-ready hashtags.", popular: true, added: "2026-11-12" },
  { slug: "youtube-title-generator", name: "YouTube Title Generator", category: "YouTube", description: "Get title ideas from proven formats for your topic.", popular: true, added: "2026-11-12" },
];
export const categories = ["YouTube", "Instagram", "Image", "Text", "AI"] as const;
export const site = { name: "CreatorKit", tagline: "Free Tools. Smarter Creation.", url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000" };
