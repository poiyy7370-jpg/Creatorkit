"use client";

import { useEffect, useRef, useState } from "react";

const presets = {
  YouTube: { width: 1280, height: 720 },
  Facebook: { width: 1200, height: 630 },
  Instagram: { width: 1080, height: 1080 },
  TikTok: { width: 1080, height: 1920 },
};

type Platform = keyof typeof presets;

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
  const [format, setFormat] = useState<"image/png" | "image/jpeg">("image/png");
  const [error, setError] = useState("");

  const { width, height } = presets[platform];

  useEffect(() => {
    if (photo) {
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
        drawCanvas();
      };
      img.src = photo;
    } else {
      imageRef.current = null;
      drawCanvas();
    }
  }, [photo]);

  useEffect(() => {
    drawCanvas();
  }, [platform, headline, subtitle, textColor, bgColor, fontSize]);

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
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);

      ctx.fillStyle = "rgba(0,0,0,0.38)";
      ctx.fillRect(0, 0, w, h);
    }

    const centerY = h * 0.52;
    const maxWidth = w * 0.88;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = textColor;
    ctx.shadowColor = "rgba(0,0,0,0.65)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.font = `900 ${fontSize}px Arial`;

    const words = headline.split(" ");
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

    const lineHeight = fontSize * 1.15;
    const totalHeight = lines.length * lineHeight;
    const startY = centerY - totalHeight / 2;

    lines.forEach((item, index) => {
      ctx.fillText(item, w / 2, startY + index * lineHeight, maxWidth);
    });

    if (subtitle.trim()) {
      ctx.font = `bold ${Math.max(24, fontSize * 0.34)}px Arial`;
      ctx.fillText(
        subtitle,
        w / 2,
        startY + totalHeight + fontSize * 0.55,
        maxWidth
      );
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
    reader.onload = () => setPhoto(reader.result as string);
    reader.onerror = () => setError("Could not read this image.");
    reader.readAsDataURL(file);
  }

  function downloadThumbnail() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
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
    }, format, 0.92);
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

      <div className="space-y-2">
        <h3 className="font-semibold">Live preview</h3>
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

      <button className="btn w-full" onClick={downloadThumbnail}>
        Download Thumbnail
      </button>
    </div>
  );
}