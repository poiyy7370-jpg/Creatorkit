export type Tool = {
  slug: string;
  name: string;
  category: "YouTube" | "Instagram" | "Image" | "Text" | "AI";
  description: string;
  seoTitle: string;
  metaDescription: string;
  popular?: boolean;
  added: string;
}
export const tools: Tool[] = [
  {
    slug: "word-counter",
    name: "Word Counter",
    category: "Text",
    description: "Count words, sentences, paragraphs and reading time.",
    seoTitle: "Free Word Counter Online – Count Words & Sentences | CreatorKit",
    metaDescription: "Count words, characters, sentences and paragraphs instantly with CreatorKit's free online word counter.",
    popular: true,
    added: "2026-11-12",
  },
  {
    slug: "character-counter",
    name: "Character Counter",
    category: "Text",
    description: "Check characters against limits for YouTube, Instagram, and more.",
    seoTitle: "Free Character Counter Online | CreatorKit",
    metaDescription: "Count characters, words and spaces instantly. Check text length for Instagram, YouTube and other platforms.",
    popular: true,
    added: "2026-11-12",
  },
  {
    slug: "hashtag-generator",
    name: "Hashtag Generator",
    category: "Instagram",
    description: "Turn a topic into relevant, copy-ready hashtags.",
    seoTitle: "Free Hashtag Generator for Instagram | CreatorKit",
    metaDescription: "Generate relevant Instagram hashtags for your topic. Copy ready-to-use hashtags with CreatorKit for free.",
    popular: true,
    added: "2026-11-12",
  },
  {
    slug: "youtube-title-generator",
    name: "YouTube Title Generator",
    category: "YouTube",
    description: "Get title ideas from proven formats for your topic.",
    seoTitle: "Free YouTube Title Generator | CreatorKit",
    metaDescription: "Create engaging YouTube title ideas for your videos with this free online YouTube title generator.",
    popular: true,
    added: "2026-11-12",
  },
  {
    slug: "youtube-description-generator",
    name: "YouTube Description Generator",
    category: "YouTube",
    description: "Build a structured description with keywords, hashtags and a call to action.",
    seoTitle: "Free YouTube Description Generator | CreatorKit",
    metaDescription: "Generate structured YouTube video descriptions with keywords, hashtags and calls to action for free.",
    added: "2026-11-13",
  },
  {
    slug: "instagram-bio-generator",
    name: "Instagram Bio Generator",
    category: "Instagram",
    description: "Bio ideas in five styles, kept within Instagram's 150-character limit.",
    seoTitle: "Free Instagram Bio Generator | CreatorKit",
    metaDescription: "Create creative Instagram bio ideas in different styles. Generate a profile bio that fits Instagram's character limit.",
    popular: true,
    added: "2026-11-13",
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    category: "Image",
    description: "Shrink JPG, PNG and WebP files in your browser. Nothing is uploaded.",
    seoTitle: "Free Online Image Compressor – JPG, PNG, WebP | CreatorKit",
    metaDescription: "Compress JPG, PNG and WebP images online for free. Reduce image file size directly in your browser.",
    popular: true,
    added: "2026-11-13",
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    category: "Image",
    description: "Resize to exact dimensions with optional aspect-ratio lock.",
    seoTitle: "Free Online Image Resizer – Resize Images | CreatorKit",
    metaDescription: "Resize images to custom width and height online. Keep the aspect ratio with CreatorKit's free image resizer.",
    added: "2026-11-13",
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    category: "Image",
    description: "Make a QR code from any text or URL and download it as PNG.",
    seoTitle: "Free QR Code Generator Online | CreatorKit",
    metaDescription: "Create QR codes from text or URLs and download them as PNG images using this free QR code generator.",
    added: "2026-11-13",
  },
  {
    slug: "youtube-thumbnail-resizer",
    name: "YouTube Thumbnail Resizer",
    category: "YouTube",
    description: "Convert any image to a 1280x720 thumbnail under YouTube's 2 MB limit.",
    seoTitle: "YouTube Thumbnail Resizer – 1280x720 | CreatorKit",
    metaDescription: "Resize images to YouTube's recommended 1280x720 thumbnail dimensions with this free online tool.",
    added: "2026-11-13",
  },
  {
    slug: "thumbnail-maker",
    name: "All-in-One Thumbnail Maker",
    category: "Image",
    description: "Create custom thumbnails for YouTube, Facebook, Instagram and TikTok with photos, text and colors.",
    seoTitle: "Free YouTube & Social Media Thumbnail Maker | CreatorKit",
    metaDescription: "Create custom thumbnails for YouTube, Facebook, Instagram and TikTok with photos, text and colors.",
    added: "2026-11-13",
  },
  {
    slug: "long-video-to-shorts",
    name: "Long Video to Shorts Converter",
    category: "AI",
    description: "Turn long videos into vertical 15, 30 or 60-second clips directly in your browser.",
    seoTitle: "Long Video to Shorts Converter Online | CreatorKit",
    metaDescription: "Convert long videos into vertical 15, 30 or 60-second clips directly in your browser with CreatorKit.",
    added: "2026-11-13",
  },
  {
    slug: "ai-photo-enhancer",
    name: "AI Photo Enhancer",
    category: "AI",
    description: "Enhance photos with HD-style, HDR-style, 3D-style effects and image adjustments.",
    seoTitle: "Free AI Photo Enhancer Online | CreatorKit",
    metaDescription: "Enhance photos online with HD-style, HDR-style and 3D-style effects using CreatorKit's photo enhancement tool.",
    added: "2026-11-13",
  },
];

export const categories = ["YouTube", "Instagram", "Image", "Text", "AI"] as const;

export const site = {
  name: "CreatorKit",
  tagline: "Free Tools. Smarter Creation.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};