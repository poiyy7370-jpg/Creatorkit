"use client";

import { useEffect, useRef, useState } from "react";
import { useImageFile, toBlob, downloadBlob } from "./imageUtils";

type CropMode = "original" | "square" | "landscape" | "portrait";

export default function AIPhotoEnhancer() {
  const { file, img, src, err, onChange } = useImageFile();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(110);
  const [saturation, setSaturation] = useState(110);
  const [warmth, setWarmth] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState<CropMode>("original");
  const [showOriginal, setShowOriginal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rotated = document.createElement("canvas");
    const rotatedCtx = rotated.getContext("2d");
    if (!rotatedCtx) return;

    const angle = ((rotation % 360) + 360) % 360;
    const radians = (angle * Math.PI) / 180;

    rotated.width =
      angle === 90 || angle === 270
        ? img.naturalHeight
        : img.naturalWidth;

    rotated.height =
      angle === 90 || angle === 270
        ? img.naturalWidth
        : img.naturalHeight;

    rotatedCtx.translate(rotated.width / 2, rotated.height / 2);
    rotatedCtx.rotate(radians);
    rotatedCtx.drawImage(
      img,
      -img.naturalWidth / 2,
      -img.naturalHeight / 2
    );

    let cropWidth = rotated.width;
    let cropHeight = rotated.height;

    const targetRatio =
      crop === "square"
        ? 1
        : crop === "landscape"
          ? 16 / 9
          : crop === "portrait"
            ? 4 / 5
            : null;

    if (targetRatio) {
      const currentRatio = cropWidth / cropHeight;

      if (currentRatio > targetRatio) {
        cropWidth = cropHeight * targetRatio;
      } else {
        cropHeight = cropWidth / targetRatio;
      }
    }

    const cropX = (rotated.width - cropWidth) / 2;
    const cropY = (rotated.height - cropHeight) / 2;

    canvas.width = Math.max(1, Math.round(cropWidth));
    canvas.height = Math.max(1, Math.round(cropHeight));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.filter = `
      brightness(${brightness}%)
      contrast(${contrast}%)
      saturate(${saturation}%)
      sepia(${warmth}%)
    `;

    ctx.drawImage(
      rotated,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.filter = "none";
  }, [img, brightness, contrast, saturation, warmth, rotation, crop]);

  const autoEnhance = () => {
    if (!img) return;

    try {
      const sample = document.createElement("canvas");
      sample.width = 64;
      sample.height = 64;

      const ctx = sample.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, 64, 64);

      const pixels = ctx.getImageData(0, 0, 64, 64).data;
      let total = 0;
      let count = 0;

      for (let i = 0; i < pixels.length; i += 4) {
        const luminance =
          0.299 * pixels[i] +
          0.587 * pixels[i + 1] +
          0.114 * pixels[i + 2];

        total += luminance;
        count++;
      }

      const average = total / count;
      const suggestedBrightness = Math.max(
        85,
        Math.min(120, Math.round((128 / Math.max(average, 1)) * 100))
      );

      setBrightness(suggestedBrightness);
      setContrast(115);
      setSaturation(115);
      setWarmth(0);
      setMessage("Auto Enhance applied! You can adjust the settings further.");
    } catch {
      setMessage("Auto Enhance could not process this image.");
    }
  };

  const rotateLeft = () => {
    setRotation((value) => (value - 90 + 360) % 360);
  };

  const rotateRight = () => {
    setRotation((value) => (value + 90) % 360);
  };

  const reset = () => {
    setBrightness(100);
    setContrast(110);
    setSaturation(110);
    setWarmth(0);
    setRotation(0);
    setCrop("original");
    setShowOriginal(false);
    setMessage("");
  };

  const download = async (format: "png" | "jpg") => {
    const canvas = canvasRef.current;
    if (!canvas || !file) return;

    try {
      setMessage("Preparing your enhanced photo...");

      const mimeType =
        format === "png" ? "image/png" : "image/jpeg";

      const blob = await toBlob(canvas, mimeType);

      downloadBlob(
        blob,
        `${file.name.replace(/\.[^/.]+$/, "")}-enhanced.${format}`
      );

      setMessage(
        `Your enhanced photo is ready in ${format.toUpperCase()} format!`
      );
    } catch {
      setMessage("Could not download the image. Please try again.");
    }
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
              setShowOriginal(false);
            }}
            className="mt-4 block w-full text-sm"
          />
        </label>
      </div>

      {err && (
        <p role="alert" className="text-sm text-red-600">
          {err}
        </p>
      )}

      {img && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={autoEnhance}
              className="btn w-full"
            >
              ✨ Auto Enhance
            </button>

            <button
              type="button"
              onClick={reset}
              className="rounded-lg border px-4 py-2 text-sm font-medium"
            >
              Reset All
            </button>
          </div>

          <div className="space-y-3 rounded-xl border p-4">
            <h3 className="font-semibold">Rotate Photo</h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={rotateLeft}
                className="rounded-lg border p-3 text-sm"
              >
                ↶ Rotate Left
              </button>

              <button
                type="button"
                onClick={rotateRight}
                className="rounded-lg border p-3 text-sm"
              >
                ↷ Rotate Right
              </button>
            </div>
          </div>

          <div className="space-y-3 rounded-xl border p-4">
            <h3 className="font-semibold">Crop Photo</h3>

            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value as CropMode)}
              className="w-full rounded-lg border bg-transparent p-3 text-sm"
            >
              <option value="original">Original Ratio</option>
              <option value="square">Square (1:1)</option>
              <option value="landscape">Landscape (16:9)</option>
              <option value="portrait">Portrait (4:5)</option>
            </select>

            <p className="text-xs text-slate-500">
              Cropping is centered automatically. Original image remains unchanged.
            </p>
          </div>

          <div className="space-y-4 rounded-xl border p-4">
            <h3 className="font-semibold">Advanced Photo Editing</h3>

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

            <label className="block text-sm">
              Warmth: {warmth}%
              <input
                type="range"
                min="0"
                max="100"
                value={warmth}
                onChange={(e) => setWarmth(Number(e.target.value))}
                className="mt-2 w-full"
              />
            </label>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold">Photo Preview</h3>

              <button
                type="button"
                onClick={() => setShowOriginal((value) => !value)}
                className="rounded-lg border px-3 py-2 text-sm"
              >
                {showOriginal ? "Show Enhanced" : "Compare Original"}
              </button>
            </div>

            {showOriginal ? (
              <img
                src={src}
                alt="Original uploaded photo"
                className="h-auto w-full rounded-lg border bg-slate-100"
              />
            ) : (
              <canvas
                ref={canvasRef}
                className="h-auto w-full rounded-lg border bg-slate-100"
              />
            )}

            <p className="text-xs text-slate-500">
              Original: {img.naturalWidth} × {img.naturalHeight}px
              {!showOriginal && canvasRef.current && (
                <>
                  {" "}· Edited: {canvasRef.current.width} × {canvasRef.current.height}px
                </>
              )}
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
              <p role="status" className="text-sm text-green-600">
                {message}
              </p>
            )}
          </div>
        </>
      )}

      <p className="text-xs text-slate-500">
        Your photo is processed locally in your browser. Auto Enhance
        uses basic image analysis and visual adjustments. It does not
        use an AI model or create missing image details.
      </p>
    </div>
  );
}