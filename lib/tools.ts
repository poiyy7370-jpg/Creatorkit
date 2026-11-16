export type Tool = {
  slug: string;
  name: string;
  category: "YouTube" | "Instagram" | "Image" | "Text" | "AI";
  description: string;
  seoTitle: string;
  metaDescription: string;
  content?: string;
  howToUse?: string[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  popular?: boolean;
  added: string;
};

export const tools: Tool[] = [
  {
    slug: "word-counter",
    name: "Word Counter",
    category: "Text",
    description: "Count words, sentences, paragraphs and reading time.",
    seoTitle: "Free Word Counter Online – Count Words & Sentences | CreatorKit",
    metaDescription: "Count words, characters, sentences and paragraphs instantly with CreatorKit's free online word counter.",
    popular: true,
    content: "CreatorKit Word Counter is a free online tool that helps you count words, characters, sentences and paragraphs in your text. It also estimates reading time. It is useful for students, writers, bloggers and content creators. Simply type or paste your text to see instant results. Your text is processed directly in your browser.",
    howToUse: [
      "Open the Word Counter tool.",
      "Type or paste your text into the text area.",
      "View the total words, characters, sentences and paragraphs.",
      "Check the estimated reading time.",
      "Click Clear to start again."
    ],
    faqs: [
      {
        question: "Is CreatorKit Word Counter free?",
        answer: "Yes, you can use this tool for free without creating an account."
      },
      {
        question: "Does it count characters?",
        answer: "Yes, it counts characters along with words, sentences and paragraphs."
      },
      {
        question: "Can I use it for essays and articles?",
        answer: "Yes, it is useful for checking essays, articles and blog posts."
      },
      {
        question: "Is my text uploaded to a server?",
        answer: "The tool processes your text directly in your browser."
      }
    ],
    added: "2026-11-12",
  },
  {
    slug: "character-counter",
    name: "Character Counter",
    category: "Text",
    description: "Check characters against limits for YouTube, Instagram, and more.",
    seoTitle: "Free Character Counter Online | CreatorKit",
    metaDescription: "Count characters, words and spaces instantly. Check text length for Instagram, YouTube and other platforms.",
    content: "CreatorKit Character Counter is a free online tool for checking the length of your text. It helps you count characters, including spaces, and words so you can prepare text for social media profiles, captions, titles, descriptions and other content with character limits. Enter or paste your text and check its length instantly.",
    howToUse: [
      "Open the Character Counter tool.",
      "Type or paste your text into the text area.",
      "Check the total character count.",
      "Review the word count and other displayed statistics.",
      "Edit your text until it meets your required limit."
    ],
    faqs: [
      {
        question: "Is the Character Counter free?",
        answer: "Yes, CreatorKit provides this character counting tool for free."
      },
      {
        question: "Does it count spaces?",
        answer: "Yes, spaces are included in the character count."
      },
      {
        question: "Can I use it for social media captions?",
        answer: "Yes, you can check text length for captions, bios, titles and descriptions."
      },
      {
        question: "Do I need to install an app?",
        answer: "No, you can use the tool directly in your web browser."
      }
    ],
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
    content: "CreatorKit Hashtag Generator helps social media creators find hashtag ideas based on a topic or keyword. Hashtags can help organize content and make posts easier to discover through relevant searches. Enter a subject or keyword to generate hashtag suggestions that you can review and use in your social media posts.",
    howToUse: [
      "Open the Hashtag Generator.",
      "Enter your topic, niche or keyword.",
      "Generate hashtag suggestions.",
      "Review the suggested hashtags and choose relevant ones.",
      "Copy the hashtags and add them to your social media post."
    ],
    faqs: [
      {
        question: "Is this hashtag generator free?",
        answer: "Yes, you can generate hashtag ideas using CreatorKit for free."
      },
      {
        question: "Can I use these hashtags on Instagram?",
        answer: "Yes, you can use relevant suggestions in Instagram posts and captions."
      },
      {
        question: "Can hashtags help my posts reach more people?",
        answer: "Relevant hashtags can help categorize your content, but they do not guarantee more views or followers."
      },
      {
        question: "Should I use every generated hashtag?",
        answer: "No, choose hashtags that accurately describe your post and audience."
      }
    ],
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
    content: "CreatorKit YouTube Title Generator helps video creators brainstorm title ideas for their YouTube content. A clear and interesting title helps viewers understand what a video is about. Enter your video topic and explore different title suggestions. You can adapt the ideas to match your content, audience and channel style.",
    howToUse: [
      "Open the YouTube Title Generator.",
      "Enter your video topic or main keyword.",
      "Generate title ideas.",
      "Review the suggested titles and select a suitable option.",
      "Edit the title to accurately represent your video."
    ],
    faqs: [
      {
        question: "Is the YouTube Title Generator free?",
        answer: "Yes, CreatorKit lets you generate YouTube title ideas for free."
      },
      {
        question: "Can I use the generated titles on YouTube?",
        answer: "Yes, you can customize and use suitable title ideas for your videos."
      },
      {
        question: "Will these titles guarantee more views?",
        answer: "No title can guarantee views. Video quality, audience interest and relevance also matter."
      },
      {
        question: "Should I include keywords in my title?",
        answer: "Using relevant keywords naturally can help viewers understand your video's topic."
      }
    ],
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
    content: "CreatorKit YouTube Description Generator helps creators prepare organized descriptions for their videos. A useful description can explain the video topic, provide relevant information and guide viewers toward links or other content. Generate a starting draft using your topic and customize it with accurate details before publishing.",
    howToUse: [
      "Open the YouTube Description Generator.",
      "Enter your video topic and relevant details.",
      "Generate a description draft.",
      "Review the suggested keywords, hashtags and call to action.",
      "Customize and copy the description into your YouTube video."
    ],
    faqs: [
      {
        question: "Is this YouTube Description Generator free?",
        answer: "Yes, you can use CreatorKit to generate description drafts for free."
      },
      {
        question: "Can I add keywords to my description?",
        answer: "Yes, include relevant keywords naturally when preparing your video description."
      },
      {
        question: "Can I add links to my YouTube description?",
        answer: "Yes, you can add your website, social media and other relevant links when editing the final description."
      },
      {
        question: "Should I review generated descriptions?",
        answer: "Yes, always check the generated text and update it with accurate information about your video."
      }
    ],
    added: "2026-11-13",
  },
  {
    slug: "instagram-bio-generator",
    name: "Instagram Bio Generator",
    category: "Instagram",
    description: "Bio ideas in five styles, kept within Instagram's 150-character limit.",
    seoTitle: "Free Instagram Bio Generator | CreatorKit",
    metaDescription: "Create creative Instagram bio ideas in different styles. Generate a profile bio that fits Instagram's character limit.",
    content: "CreatorKit Instagram Bio Generator helps users create profile bio ideas for personal accounts, creators, influencers and businesses. A good bio introduces who you are and what your profile offers. Explore different writing styles and customize the result to reflect your personality, brand or interests.",
    howToUse: [
      "Open the Instagram Bio Generator.",
      "Enter your interests, profession or profile topic.",
      "Choose your preferred bio style.",
      "Generate bio suggestions.",
      "Review and copy a suitable bio to your Instagram profile."
    ],
    faqs: [
      {
        question: "Is the Instagram Bio Generator free?",
        answer: "Yes, CreatorKit offers free Instagram bio ideas."
      },
      {
        question: "Can I generate bios for business accounts?",
        answer: "Yes, you can create bio ideas for personal profiles, creators and businesses."
      },
      {
        question: "Can I customize the generated bio?",
        answer: "Yes, you can edit the suggestions to match your personality or brand."
      },
      {
        question: "What is Instagram's bio character limit?",
        answer: "Instagram bios have a 150-character limit. Check your final text before saving it to your profile."
      }
    ],
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
    content: "CreatorKit Image Compressor helps reduce the file size of images for websites, social media, email and everyday sharing. Smaller image files can make uploads easier and help reduce storage usage. Choose an image and adjust the available compression settings. Image processing takes place directly in your browser.",
    howToUse: [
      "Open the Image Compressor tool.",
      "Select or upload a JPG, PNG or WebP image.",
      "Choose the available compression settings.",
      "Process the image and review the result.",
      "Download the compressed image to your device."
    ],
    faqs: [
      {
        question: "Is the Image Compressor free?",
        answer: "Yes, you can compress supported images using CreatorKit for free."
      },
      {
        question: "Which image formats are supported?",
        answer: "The tool supports JPG, PNG and WebP images."
      },
      {
        question: "Will compression reduce image quality?",
        answer: "Depending on the compression settings, some image quality may change. Review the result before downloading."
      },
      {
        question: "Are my images uploaded to a server?",
        answer: "Image processing takes place directly in your browser, according to the tool's current functionality."
      }
    ],
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
    content: "CreatorKit Image Resizer is a free online tool for changing image dimensions. You can prepare images for websites, social media, presentations and other projects by choosing a custom width and height. The optional aspect-ratio lock helps maintain the original image proportions while resizing.",
    howToUse: [
      "Open the Image Resizer tool.",
      "Select an image from your device.",
      "Enter the desired width and height.",
      "Enable the aspect-ratio lock if you want to preserve image proportions.",
      "Apply the resize and download the result."
    ],
    faqs: [
      {
        question: "Is the Image Resizer free?",
        answer: "Yes, CreatorKit provides this image resizing tool for free."
      },
      {
        question: "Can I set custom image dimensions?",
        answer: "Yes, you can enter your preferred width and height."
      },
      {
        question: "What does aspect-ratio lock do?",
        answer: "It helps maintain the original proportions when you change image dimensions."
      },
      {
        question: "Can I resize images for social media?",
        answer: "Yes, you can enter dimensions suitable for your intended social media platform."
      }
    ],
    added: "2026-11-13",
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    category: "Image",
    description: "Make a QR code from any text or URL and download it as PNG.",
    seoTitle: "Free QR Code Generator Online | CreatorKit",
    metaDescription: "Create QR codes from text or URLs and download them as PNG images using this free QR code generator.",
    content: "CreatorKit QR Code Generator lets you turn text or website URLs into QR code images. QR codes make it easier for people to access a link or read information by scanning the code with a compatible device. Create a code for websites, contact information, promotions or other text-based uses and download it as a PNG image.",
    howToUse: [
      "Open the QR Code Generator.",
      "Enter a website URL or text.",
      "Generate your QR code.",
      "Review the generated code.",
      "Download the QR code as a PNG image."
    ],
    faqs: [
      {
        question: "Is the QR Code Generator free?",
        answer: "Yes, you can create QR codes with CreatorKit for free."
      },
      {
        question: "Can I create a QR code for a website?",
        answer: "Yes, enter your website URL to generate a QR code."
      },
      {
        question: "Can I download my QR code?",
        answer: "Yes, the tool lets you download the generated QR code as a PNG image."
      },
      {
        question: "Do QR codes expire?",
        answer: "A downloaded static QR code does not normally expire, but the website or destination it points to must remain available."
      }
    ],
    added: "2026-11-13",
  },
  {
    slug: "youtube-thumbnail-resizer",
    name: "YouTube Thumbnail Resizer",
    category: "YouTube",
    description: "Convert any image to a 1280x720 thumbnail under YouTube's 2 MB limit.",
    seoTitle: "YouTube Thumbnail Resizer – 1280x720 | CreatorKit",
    metaDescription: "Resize images to YouTube's recommended 1280x720 thumbnail dimensions with this free online tool.",
    content: "CreatorKit YouTube Thumbnail Resizer helps creators prepare images for YouTube video thumbnails. The tool is designed to resize images to the commonly recommended 1280 x 720 pixel dimensions. A properly sized thumbnail can help present your video clearly across devices. Review the final image and file size before uploading it to YouTube.",
    howToUse: [
      "Open the YouTube Thumbnail Resizer.",
      "Select an image from your device.",
      "Use the available resizing option to prepare a 1280 x 720 thumbnail.",
      "Review the resized image and its file size.",
      "Download the image and upload it to your YouTube video."
    ],
    faqs: [
      {
        question: "What is the recommended YouTube thumbnail size?",
        answer: "YouTube commonly recommends a thumbnail resolution of 1280 x 720 pixels."
      },
      {
        question: "Is this thumbnail resizer free?",
        answer: "Yes, you can resize thumbnails with CreatorKit for free."
      },
      {
        question: "Can I use my own photo?",
        answer: "Yes, you can select an image from your device and resize it."
      },
      {
        question: "Should my thumbnail file be under 2 MB?",
        answer: "YouTube's thumbnail upload requirements include a maximum file size of 2 MB for many supported image formats. Check YouTube's current requirements before uploading."
      }
    ],
    added: "2026-11-13",
  },
  {
    slug: "thumbnail-maker",
    name: "All-in-One Thumbnail Maker",
    category: "Image",
    description: "Create custom thumbnails for YouTube, Facebook, Instagram and TikTok with photos, text and colors.",
    seoTitle: "Free YouTube & Social Media Thumbnail Maker | CreatorKit",
    metaDescription: "Create custom thumbnails for YouTube, Facebook, Instagram and TikTok with photos, text and colors.",
    content: "CreatorKit All-in-One Thumbnail Maker helps content creators design custom thumbnails for video and social media content. You can combine photos, text and colors to create a visual design that matches your content. Use it to prepare thumbnail ideas for YouTube, Facebook, Instagram and TikTok, then review the final design before downloading.",
    howToUse: [
      "Open the Thumbnail Maker.",
      "Choose or upload a photo for your design.",
      "Add your preferred text and colors.",
      "Adjust the design to match your content and platform.",
      "Review and download your finished thumbnail."
    ],
    faqs: [
      {
        question: "Is the Thumbnail Maker free?",
        answer: "Yes, CreatorKit provides a free online thumbnail creation tool."
      },
      {
        question: "Can I create YouTube thumbnails?",
        answer: "Yes, you can create custom thumbnail designs for YouTube videos."
      },
      {
        question: "Can I add my own photos and text?",
        answer: "Yes, the tool supports adding photos and text to your thumbnail design."
      },
      {
        question: "Can I use thumbnails on other social media platforms?",
        answer: "Yes, you can create designs intended for Facebook, Instagram, TikTok and other content platforms."
      }
    ],
    added: "2026-11-13",
  },
  {
    slug: "long-video-to-shorts",
    name: "Long Video to Shorts Converter",
    category: "AI",
    description: "Turn long videos into vertical 15, 30 or 60-second clips directly in your browser.",
    seoTitle: "Long Video to Shorts Converter Online | CreatorKit",
    metaDescription: "Convert long videos into vertical 15, 30 or 60-second clips directly in your browser with CreatorKit.",
    content: "CreatorKit Long Video to Shorts Converter helps creators prepare shorter vertical video clips from longer videos. Short-form videos are commonly used on YouTube Shorts and other vertical video platforms. Select a source video, choose the available clip duration and process the video in your browser. Review the output before publishing it.",
    howToUse: [
      "Open the Long Video to Shorts Converter.",
      "Select a supported video file from your device.",
      "Choose your preferred clip duration: 15, 30 or 60 seconds.",
      "Select the video processing option and start conversion.",
      "Wait for the video processing to complete.",
      "Preview your converted vertical video clip.",
      "Download the finished video to your device."
    ],
    faqs: [
      {
        question: "Is the Video to Shorts Converter free?",
        answer: "Yes, CreatorKit offers this browser-based video conversion tool for free."
      },
      {
        question: "Can I create 15, 30 and 60-second clips?",
        answer: "The tool provides available duration options including 15, 30 and 60 seconds."
      },
      {
        question: "Does the tool process videos in the browser?",
        answer: "Yes, video processing is performed in your browser using FFmpeg WebAssembly."
      },
      {
        question: "Can I use the converted clips on YouTube Shorts?",
        answer: "You can prepare vertical clips for YouTube Shorts, but make sure your final video meets YouTube's current format and duration requirements."
      }
    ],
    added: "2026-11-13",
  },
  {
    slug: "ai-photo-enhancer",
    name: "AI Photo Enhancer",
    category: "AI",
    description: "Enhance photos with HD-style, HDR-style, 3D-style effects and image adjustments.",
    seoTitle: "Free AI Photo Enhancer Online | CreatorKit",
    metaDescription: "Enhance photos online with HD-style, HDR-style and 3D-style effects using CreatorKit's photo enhancement tool.",
    content: "CreatorKit AI Photo Enhancer provides photo adjustment options and visual effects to help improve the appearance of images. Explore HD-style, HDR-style and 3D-style effects, along with available image adjustments. You can use the tool to experiment with different looks for personal photos, social media posts and creative projects. Review the result before downloading it.",
    howToUse: [
      "Open the AI Photo Enhancer tool.",
      "Select a photo from your device.",
      "Choose an available enhancement style or adjustment.",
      "Preview the edited image and make further changes if needed.",
      "Download your enhanced photo."
    ],
    faqs: [
      {
        question: "Is CreatorKit AI Photo Enhancer free?",
        answer: "Yes, you can use the available photo enhancement features for free."
      },
      {
        question: "What enhancement styles are available?",
        answer: "The tool offers HD-style, HDR-style and 3D-style visual effects and image adjustments."
      },
      {
        question: "Can I use the tool for social media photos?",
        answer: "Yes, you can edit photos for social media posts and other creative projects."
      },
      {
        question: "Does this tool guarantee true AI upscaling?",
        answer: "The current tool provides visual effects and image adjustments. It should not be considered a dedicated AI resolution upscaler."
      }
    ],
    added: "2026-11-13",
  },
];

export const categories = ["YouTube", "Instagram", "Image", "Text", "AI"] as const;

export const site = {
  name: "CreatorKit",
  tagline: "Free Tools. Smarter Creation.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};