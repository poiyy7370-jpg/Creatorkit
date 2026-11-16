"use client";

import { useEffect, useRef, useState } from "react";

const presets = {
  YouTube: { width: 1280, height: 720 },
  Facebook: { width: 1200, height: 630 },
  Instagram: { width: 1080, height: 1080 },
  TikTok: { width: 1080, height: 1920 },
};

type Platform = keyof typeof presets;
type Effect =
  | "original"
  | "cinematic"
  | "hdr"
  | "vintage"
  | "bw"
  | "vibrant";

const effects: { value: Effect; label: string }[] = [
  { value: "original", label: "Original" },
  { value: "cinematic", label: "Cinematic" },
  { value: "hdr", label: "HDR" },
  { value: "vintage", label: "Vintage" },
  { value: "bw", label: "Black & White" },
  { value: "vibrant", label: "Vibrant" },
];

const filters: Record<Effect, string> = {
  original: "none",
  cinematic: "contrast(1.3) saturate(1.25) brightness(0.92)",
  hdr: "contrast(1.55) saturate(1.35) brightness(1.08)",
  vintage: "sepia(0.55) contrast(1.15) saturate(0.8)",
  bw: "grayscale(1) contrast(1.3)",
  vibrant: "saturate(1.8) contrast(1.15)",
};

export default function ThumbnailMaker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [platform, setPlatform] = useState<Platform>("YouTube");
  const [photo, setPhoto] = useState("");
  const [headline, setHeadline] = useState("YOUR TITLE HERE");
  const [subtitle, setSubtitle] = useState("Make something amazing!");
  const [textColor, setTextColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#243b80");
  const [fontSize, setFontSize] = useState(76);
  const [effect, setEffect] = useState<Effect>("cinematic");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(115);
  const [saturation, setSaturation] = useState(120);
  const [blur, setBlur] = useState(0);
  const [overlay, setOverlay] = useState(38);
  const [outline, setOutline] = useState(true);
  const [glow, setGlow] = useState(false);
  const [shadow, setShadow] = useState(true);
  const [textStyle, setTextStyle] = useState("impact");
  const [format, setFormat] = useState<"image/png" | "image/jpeg">("image/png");
  const [error, setError] = useState("");

  const { width, height } = presets[platform];

  useEffect(() => {
    if (!photo) {
      imageRef.current = null;
      drawCanvas();
      return;
    }

    const img = new Image();

    img.onload = () => {
      imageRef.current = img;
      drawCanvas();
    };

    img.onerror = () => setError("Could not load this image.");
    img.src = photo;
  }, [photo]);

  useEffect(() => {
    drawCanvas();
  }, [
    platform,
    headline,
    subtitle,
    textColor,
    bgColor,
    fontSize,
    effect,
    brightness,
    contrast,
    saturation,
    blur,
    overlay,
    outline,
    glow,
    shadow,
    textStyle,
  ]);

  function drawCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = presets[platform].width;
    const h = presets[platform].height;

    canvas.width = w;
    canvas.height = h;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);

    const img = imageRef.current;

    if (img) {
      const scale = Math.max(w / img.width, h / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;

      ctx.save();
      ctx.filter = [
        filters[effect],
        `brightness(${brightness}%)`,
        `contrast(${contrast}%)`,
        `saturate(${saturation}%)`,
        `blur(${blur}px)`,
      ].join(" ");

      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
      ctx.restore();

      if (overlay > 0) {
        ctx.fillStyle = `rgba(0,0,0,${overlay / 100})`;
        ctx.fillRect(0, 0, w, h);
      }

      // Subtle cinematic color overlay.
      if (effect === "cinematic") {
        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, "rgba(0,35,70,0.15)");
        gradient.addColorStop(1, "rgba(255,100,20,0.12)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }
    }

    const centerY = h * 0.52;
    const maxWidth = w * 0.88;

    const fontFamily =
      textStyle === "classic"
        ? "Arial"
        : textStyle === "modern"
        ? "Trebuchet MS"
        : textStyle === "elegant"
        ? "Georgia"
        : "Impact, Arial Black, sans-serif";

    const weight = textStyle === "elegant" ? "bold" : "900";

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${weight} ${fontSize}px ${fontFamily}`;

    const words = headline.split(/\s+/).filter(Boolean);
    const lines: string[] = [];
    let line = "";

    words.forEach((word) => {
      const test = line ? `${line} ${word}` : word;

      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    });

    if (line) lines.push(line);

    const lineHeight = fontSize * 1.12;
    const totalHeight = lines.length * lineHeight;
    const subtitleSize = Math.max(24, fontSize * 0.34);
    const subtitleHeight = subtitle.trim() ? subtitleSize * 1.8 : 0;
    const totalBlock = totalHeight + subtitleHeight;
    const startY = centerY - totalBlock / 2;

    lines.forEach((item, index) => {
      const y = startY + index * lineHeight;

      ctx.lineJoin = "round";

      if (glow) {
        ctx.shadowColor = textColor;
        ctx.shadowBlur = 28;
      } else if (shadow) {
        ctx.shadowColor = "rgba(0,0,0,0.85)";
        ctx.shadowBlur = 16;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 6;
      }

      if (outline) {
        ctx.lineWidth = Math.max(5, fontSize * 0.075);
        ctx.strokeStyle = "#111111";
        ctx.strokeText(item, w / 2, y, maxWidth);
      }

      ctx.fillStyle = textColor;
      ctx.fillText(item, w / 2, y, maxWidth);

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    });

    if (subtitle.trim()) {
      const y = startY + totalHeight + subtitleSize * 0.8;

      ctx.font = `bold ${subtitleSize}px Arial`;
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";

      if (shadow) {
        ctx.shadowColor = "rgba(0,0,0,0.9)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 3;
      }

      ctx.fillText(subtitle, w / 2, y, maxWidth);
    }

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setError("Image must be smaller than 25 MB.");
      return;
    }

    setError("");

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result as string);
    };

    reader.onerror = () => {
      setError("Could not read this image.");
    };

    reader.readAsDataURL(file);
  }

  function downloadThumbnail() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError("Could not create your thumbnail.");
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `creatorkit-${platform.toLowerCase()}-thumbnail.${
          format === "image/png" ? "png" : "jpg"
        }`;

        link.click();
        URL.revokeObjectURL(url);
      },
      format,
      0.95
    );
  }

  function resetEffects() {
    setEffect("original");
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setBlur(0);
    setOverlay(0);
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold">
          Choose platform
        </label>
        <select
          className="input"
          value={platform}
          onChange={(e) => setPlatform(e.target.value as Platform)}
        >
          {Object.entries(presets).map(([name, size]) => (
            <option key={name} value={name}>
              {name} ({size.width} × {size.height})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Upload your photo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          className="input"
        />
        {error && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>

      <div className="space-y-3 rounded-xl border p-4">
        <h3 className="font-semibold">Photo Effects</h3>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {effects.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setEffect(item.value)}
              className={`rounded-lg border p-3 text-sm font-semibold ${
                effect === item.value
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {[
          { label: "Brightness", value: brightness, set: setBrightness, min: 50, max: 160 },
          { label: "Contrast", value: contrast, set: setContrast, min: 50, max: 180 },
          { label: "Saturation", value: saturation, set: setSaturation, min: 0, max: 200 },
          { label: "Background Blur", value: blur, set: setBlur, min: 0, max: 8 },
          { label: "Dark Overlay", value: overlay, set: setOverlay, min: 0, max: 80 },
        ].map((item) => (
          <div key={item.label}>
            <label className="mb-1 block text-sm font-medium">
              {item.label}: {item.value}
              {item.label === "Background Blur" ? "px" : "%"}
            </label>
            <input
              type="range"
              min={item.min}
              max={item.max}
              value={item.value}
              onChange={(e) => item.set(Number(e.target.value))}
              className="w-full"
            />
          </div>
        ))}

        <button
          type="button"
          className="w-full rounded-lg border p-2 text-sm font-semibold"
          onClick={resetEffects}
        >
          Reset Photo Effects
        </button>
      </div>

      <div className="space-y-3 rounded-xl border p-4">
        <h3 className="font-semibold">Professional Text Design</h3>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Main heading
          </label>
          <input
            className="input"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            maxLength={100}
            placeholder="Enter your title"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Subtitle
          </label>
          <input
            className="input"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            maxLength={120}
            placeholder="Optional subtitle"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Font style
          </label>
          <select
            className="input"
            value={textStyle}
            onChange={(e) => setTextStyle(e.target.value)}
          >
            <option value="impact">Bold Impact</option>
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="elegant">Elegant</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="text-sm font-semibold">
            Text color
            <input
              className="mt-2 block h-11 w-full"
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </label>

          <label className="text-sm font-semibold">
            Background color
            <input
              className="mt-2 block h-11 w-full"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Text size: {fontSize}px
          </label>
          <input
            type="range"
            min="30"
            max="130"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={outline}
              onChange={(e) => setOutline(e.target.checked)}
            />
            Text outline
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={shadow}
              onChange={(e) => setShadow(e.target.checked)}
            />
            Text shadow
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={glow}
              onChange={(e) => setGlow(e.target.checked)}
            />
            Text glow
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Live Preview</h3>
        <div className="overflow-hidden rounded-lg border bg-slate-100">
          <canvas
            ref={canvasRef}
            className="block h-auto w-full"
          />
        </div>
        <p className="text-xs text-slate-500">
          {width} × {height}px
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Download format
        </label>
        <select
          className="input"
          value={format}
          onChange={(e) =>
            setFormat(e.target.value as "image/png" | "image/jpeg")
          }
        >
          <option value="image/png">PNG</option>
          <option value="image/jpeg">JPG</option>
        </select>
      </div>

      <button
        className="btn w-full"
        onClick={downloadThumbnail}
      >
        Download Professional Thumbnail
      </button>
    </div>
  );
}