"use client";

import { useEffect, useRef, useState } from "react";
import { useImageFile, toBlob, downloadBlob } from "./imageUtils";

type Mode = "hd" | "hdr" | "3d" | "normal";

export default function AIPhotoEnhancer() {
  const { file, img, src, err, onChange } = useImageFile();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mode, setMode] = useState<Mode>("hd");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(110);
  const [saturation, setSaturation] = useState(110);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let b = brightness;
    let c = contrast;
    let s = saturation;

    if (mode === "hd") {
      c += 10;
      s += 5;
    } else if (mode === "hdr") {
      b += 5;
      c += 25;
      s += 20;
    } else if (mode === "3d") {
      c += 20;
      s += 25;
    }

    ctx.filter = `brightness(${b}%) contrast(${c}%) saturate(${s}%)`;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.filter = "none";

    if (mode === "3d") {
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = 0.08;
      ctx.drawImage(img, 3, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    }
  }, [img, mode, brightness, contrast, saturation]);

   const download = async (format: "png" | "jpg") => {
  const canvas = canvasRef.current;
  if (!canvas || !file) return;

  try {
    setMessage("Preparing your enhanced photo...");

    const mimeType = format === "png" ? "image/png" : "image/jpeg";
    const blob = await toBlob(canvas, mimeType);

    downloadBlob(
      blob,
      `${file.name.replace(/\.[^/.]+$/, "")}-enhanced.${format}`
    );

    setMessage(`Your enhanced photo is ready in ${format.toUpperCase()} format!`);
  } catch {
    setMessage("Could not download the image. Please try again.");
  }
};

  const reset = () => {
    setMode("hd");
    setBrightness(100);
    setContrast(110);
    setSaturation(110);
    setMessage("");
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-dashed p-6 text-center">
        <label className="block cursor-pointer">
          <span className="text-lg font-semibold">
            Upload your photo
          </span>
          <span className="mt-2 block text-sm text-slate-500">
            JPG, PNG or WebP · Maximum 25 MB
          </span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => {
              onChange(e);
              setMessage("");
            }}
            className="mt-4 block w-full text-sm"
          />
        </label>
      </div>

      {err && (
        <p role="alert" className="text-sm text-red-600">{err}</p>
      )}

      {img && (
        <>
          <div className="space-y-3">
            <h3 className="font-semibold">Choose enhancement style</h3>

            <div className="grid grid-cols-2 gap-2">
              {([
                ["hd", "HD Style"],
                ["hdr", "HDR Style"],
                ["3d", "3D Style"],
                ["normal", "Original"],
              ] as [Mode, string][]).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMode(value)}
                  className={`rounded-lg border p-3 text-sm font-medium ${
                    mode === value
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-xl border p-4">
            <h3 className="font-semibold">Adjust your photo</h3>

            <label className="block text-sm">
              Brightness: {brightness}%
              <input
                type="range"
                min="50"
                max="150"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="mt-2 w-full"
              />
            </label>

            <label className="block text-sm">
              Contrast: {contrast}%
              <input
                type="range"
                min="50"
                max="200"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="mt-2 w-full"
              />
            </label>

            <label className="block text-sm">
              Saturation: {saturation}%
              <input
                type="range"
                min="0"
                max="200"
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className="mt-2 w-full"
              />
            </label>

            <button
              type="button"
              onClick={reset}
              className="rounded-lg border px-4 py-2 text-sm"
            >
              Reset adjustments
            </button>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Enhanced photo preview</h3>

            <canvas
              ref={canvasRef}
              className="h-auto w-full rounded-lg border bg-slate-100"
            />

            <p className="text-xs text-slate-500">
              Original image: {img.naturalWidth} × {img.naturalHeight}px
            </p>

           <div className="grid grid-cols-2 gap-3">
  <button
    type="button"
    onClick={() => download("png")}
    className="btn w-full"
  >
    Download PNG
  </button>

  <button
    type="button"
    onClick={() => download("jpg")}
    className="btn w-full"
  >
    Download JPG
  </button>
</div>

            {message && (
              <p className="text-sm text-green-600">{message}</p>
            )}
          </div>
        </>
      )}

      <p className="text-xs text-slate-500">
        Your photo is processed locally in your browser. These are
        visual adjustments, not AI-powered resolution enhancement.
      </p>
    </div>
  );
}
