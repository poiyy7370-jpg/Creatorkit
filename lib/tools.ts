export type Tool = {
  slug: string;
  name: string;
  category: "YouTube" | "Instagram" | "Image" | "Text" | "AI";
  description: string;
  popular?: boolean;
  added: string;
};

export const tools: Tool[] = [
  { slug: "word-counter", name: "Word Counter", category: "Text", description: "Count words, sentences, paragraphs and reading time.", popular: true, added: "2026-11-12" },
  { slug: "character-counter", name: "Character Counter", category: "Text", description: "Check characters against limits for YouTube, Instagram, and more.", popular: true, added: "2026-11-12" },
  { slug: "hashtag-generator", name: "Hashtag Generator", category: "Instagram", description: "Turn a topic into relevant, copy-ready hashtags.", popular: true, added: "2026-11-12" },
  { slug: "youtube-title-generator", name: "YouTube Title Generator", category: "YouTube", description: "Get title ideas from proven formats for your topic.", popular: true, added: "2026-11-12" },
  { slug: "youtube-description-generator", name: "YouTube Description Generator", category: "YouTube", description: "Build a structured description with keywords, hashtags and a call to action.", added: "2026-11-13" },
  { slug: "instagram-bio-generator", name: "Instagram Bio Generator", category: "Instagram", description: "Bio ideas in five styles, kept within Instagram's 150-character limit.", popular: true, added: "2026-11-13" },
  { slug: "image-compressor", name: "Image Compressor", category: "Image", description: "Shrink JPG, PNG and WebP files in your browser. Nothing is uploaded.", popular: true, added: "2026-11-13" },
  { slug: "image-resizer", name: "Image Resizer", category: "Image", description: "Resize to exact dimensions with optional aspect-ratio lock.", added: "2026-11-13" },
  { slug: "qr-code-generator", name: "QR Code Generator", category: "Image", description: "Make a QR code from any text or URL and download it as PNG.", added: "2026-11-13" },
  { slug: "youtube-thumbnail-resizer", name: "YouTube Thumbnail Resizer", category: "YouTube", description: "Convert any image to a 1280x720 thumbnail under YouTube's 2 MB limit.", added: "2026-11-13" },
  { slug: "thumbnail-maker", name: "All-in-One Thumbnail Maker", category: "Image", description: "Create custom thumbnails for YouTube, Facebook, Instagram and TikTok with photos, text and colors.", added: "2026-11-13" },
  { slug: "long-video-to-shorts", name: "Long Video to Shorts Converter", category: "AI", description: "Turn long videos into vertical 15, 30 or 60-second clips directly in your browser.", added: "2026-11-13" },
  { slug: "ai-photo-enhancer", name: "AI Photo Enhancer", category: "AI", description: "Enhance photos with HD-style, HDR-style, 3D-style effects and image adjustments.", added: "2026-11-13" },
];

export const categories = ["YouTube", "Instagram", "Image", "Text", "AI"] as const;

export const site = {
  name: "CreatorKit",
  tagline: "Free Tools. Smarter Creation.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};