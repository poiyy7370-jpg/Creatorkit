"use client";

import { useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

type Highlight = {
  start: number;
  score: number;
};

type ShortOutput = {
  name: string;
  url: string;
  start: number;
};

export default function VideoToShorts() {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const outputUrls = useRef<string[]>([]);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [duration, setDuration] = useState("30");
  const [shortCount, setShortCount] = useState("3");
  const [videoDuration, setVideoDuration] = useState(0);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [outputs, setOutputs] = useState<ShortOutput[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      outputUrls.current.forEach((url) => URL.revokeObjectURL(url));
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const clearOutputs = () => {
    outputUrls.current.forEach((url) => URL.revokeObjectURL(url));
    outputUrls.current = [];
    setOutputs([]);
  };

  const loadFFmpeg = async () => {
    if (ffmpegRef.current?.loaded) {
      return ffmpegRef.current;
    }

    const ffmpeg = new FFmpeg();

    ffmpeg.on("progress", ({ progress }) => {
      setProgress(Math.min(100, Math.round(progress * 100)));
    });

    setStatus("Loading video processor...");

    const baseURL =
      "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd";

    await ffmpeg.load({
      coreURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.js`,
        "text/javascript"
      ),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });

    ffmpegRef.current = ffmpeg;
    return ffmpeg;
  };

  const handleFile = (selected: File | null) => {
    setError("");
    setStatus("");
    setHighlights([]);
    setVideoDuration(0);
    clearOutputs();

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
    }

    if (!selected) {
      setFile(null);
      return;
    }

    if (!selected.type.startsWith("video/")) {
      setFile(null);
      setError("Please choose a valid video file.");
      return;
    }

    if (selected.size > 500 * 1024 * 1024) {
      setFile(null);
      setError("Please choose a video smaller than 500 MB.");
      return;
    }

    setFile(selected);

    const url = URL.createObjectURL(selected);
    setPreviewUrl(url);

    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      setVideoDuration(video.duration);
    };

    video.onerror = () => {
      setError("Could not read this video. Try another file.");
    };

    video.src = url;
  };

  // Extract a small image sample from a video frame.
  const captureFrame = (
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) => {
    context.drawImage(video, 0, 0, 64, 36);
    return context.getImageData(0, 0, 64, 36).data;
  };

  // Detect visual scene changes across the entire video.
  const analyzeHighlights = async () => {
    if (!file || !videoDuration) return;

    const clipDuration = Number(duration);
    const wanted = Number(shortCount);

    if (videoDuration < clipDuration) {
      setError("Your video is shorter than the selected clip duration.");
      return;
    }

    setLoading(true);
    setError("");
    setStatus("Analyzing scenes across your video...");
    setProgress(0);
    setHighlights([]);
    clearOutputs();

    const url = URL.createObjectURL(file);
    const video = document.createElement("video");

    try {
      video.preload = "auto";
      video.muted = true;
      video.playsInline = true;
      video.src = url;

      await new Promise<void>((resolve, reject) => {
        video.onloadedmetadata = () => resolve();
        video.onerror = () => reject(
          new Error("Could not load video for analysis.")
        );
      });

      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 36;

      const context = canvas.getContext("2d", {
        willReadFrequently: true,
      });

      if (!context) {
        throw new Error("Your browser does not support video analysis.");
      }

      // Limit analysis to approximately 300 samples.
      const interval = Math.max(1, videoDuration / 300);
      const sampleCount = Math.floor(videoDuration / interval);

      let previousFrame: Uint8ClampedArray | null = null;
      const scores: { time: number; score: number }[] = [];

      for (let i = 0; i <= sampleCount; i++) {
        const time = Math.min(i * interval, videoDuration - 0.05);

        if (Math.abs(video.currentTime - time) > 0.04) {
          await new Promise<void>((resolve, reject) => {
            const onSeeked = () => {
              cleanup();
              resolve();
            };

            const onError = () => {
              cleanup();
              reject(new Error("Unable to analyze a video frame."));
            };

            const cleanup = () => {
              video.removeEventListener("seeked", onSeeked);
              video.removeEventListener("error", onError);
            };

            video.addEventListener("seeked", onSeeked, { once: true });
            video.addEventListener("error", onError, { once: true });
            video.currentTime = time;
          });
        }

        const currentFrame = captureFrame(video, canvas, context);

        if (previousFrame) {
          let difference = 0;

          for (let p = 0; p < currentFrame.length; p += 4) {
            difference +=
              Math.abs(currentFrame[p] - previousFrame[p]) +
              Math.abs(currentFrame[p + 1] - previousFrame[p + 1]) +
              Math.abs(currentFrame[p + 2] - previousFrame[p + 2]);
          }

          const score =
            difference / ((currentFrame.length / 4) * 3 * 255);

          scores.push({ time, score });
        }

        previousFrame = new Uint8ClampedArray(currentFrame);

        setProgress(Math.round((i / sampleCount) * 100));
      }

      // Find strong scene-change candidates.
      const average =
        scores.reduce((sum, item) => sum + item.score, 0) /
        Math.max(scores.length, 1);

      const variance =
        scores.reduce(
          (sum, item) => sum + Math.pow(item.score - average, 2),
          0
        ) / Math.max(scores.length, 1);

      const threshold = Math.max(
        0.12,
        average + Math.sqrt(variance) * 0.5
      );

      const peaks = scores
        .filter((item, index) => {
          const before = scores[index - 1]?.score ?? 0;
          const after = scores[index + 1]?.score ?? 0;

          return (
            item.score >= threshold &&
            item.score >= before &&
            item.score >= after
          );
        })
        .sort((a, b) => b.score - a.score);

      const maxStart = Math.max(0, videoDuration - clipDuration);

      const selected: Highlight[] = [];

      for (const peak of peaks) {
        const start = Math.max(
          0,
          Math.min(maxStart, peak.time - clipDuration * 0.35)
        );

        const separated = selected.every(
          (item) => Math.abs(item.start - start) >= clipDuration * 0.8
        );

        if (separated) {
          selected.push({
            start,
            score: peak.score,
          });
        }

        if (selected.length >= wanted) break;
      }

      // If there are not enough scene changes, use evenly spaced clips.
      if (selected.length < wanted) {
        const slots = wanted;
        const spacing = maxStart / Math.max(slots - 1, 1);

        for (let i = 0; i < slots; i++) {
          const start = slots === 1 ? maxStart / 2 : spacing * i;

          const exists = selected.some(
            (item) => Math.abs(item.start - start) < clipDuration * 0.6
          );

          if (!exists) {
            selected.push({ start, score: 0 });
          }
        }
      }

      selected.sort((a, b) => a.start - b.start);

      setHighlights(selected.slice(0, wanted));
      setProgress(100);
      setStatus(
        `${Math.min(selected.length, wanted)} possible highlights found!`
      );
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Video analysis failed."
      );
      setStatus("");
    } finally {
      video.pause();
      URL.revokeObjectURL(url);
      setLoading(false);
    }
  };

  // Convert all selected highlights into vertical Shorts.
  const createShorts = async () => {
    if (!file || highlights.length === 0) return;

    setLoading(true);
    setError("");
    setStatus("Preparing your Shorts...");
    setProgress(0);
    clearOutputs();

    try {
      const ffmpeg = await loadFFmpeg();

      const inputName = "input-video";
      await ffmpeg.writeFile(inputName, await fetchFile(file));

      const created: ShortOutput[] = [];

      for (let i = 0; i < highlights.length; i++) {
        const item = highlights[i];
        const outputName = `creator-short-${i + 1}.mp4`;

        setStatus(`Creating Short ${i + 1} of ${highlights.length}...`);

        const result = await ffmpeg.exec([
          "-ss", String(item.start),
          "-i", inputName,
          "-t", duration,
          "-vf",
          "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920",
          "-c:v", "libx264",
          "-preset", "ultrafast",
          "-crf", "28",
          "-c:a", "aac",
          "-b:a", "128k",
          "-movflags", "+faststart",
          "-y",
          outputName,
        ]);

        if (result !== 0) {
          throw new Error(`Could not create Short ${i + 1}.`);
        }

        const data = await ffmpeg.readFile(outputName);

        if (typeof data === "string") {
          throw new Error("Could not read converted video.");
        }

        const blob = new Blob(
          [new Uint8Array(data).buffer as ArrayBuffer],
          { type: "video/mp4" }
        );

        const outputUrl = URL.createObjectURL(blob);
        outputUrls.current.push(outputUrl);

        created.push({
          name: `CreatorKit-Short-${i + 1}.mp4`,
          url: outputUrl,
          start: item.start,
        });

        setProgress(
          Math.round(((i + 1) / highlights.length) * 100)
        );
      }

      setOutputs(created);
      setStatus("All your Shorts are ready!");
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Video conversion failed."
      );
      setStatus("");
    } finally {
      setLoading(false);
    }
  };

  const download = (item: ShortOutput) => {
    const a = document.createElement("a");
    a.href = item.url;
    a.download = item.name;
    a.click();
  };

  const downloadAll = () => {
    outputs.forEach((item, index) => {
      setTimeout(() => download(item), index * 500);
    });
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-dashed p-6 text-center">
        <label className="block cursor-pointer">
          <span className="text-lg font-semibold">
            Upload your long video
          </span>

          <span className="mt-2 block text-sm text-slate-500">
            MP4, MOV or WebM · Maximum 500 MB
          </span>

          <input
            type="file"
            accept="video/*"
            className="mt-4 block w-full text-sm"
            onChange={(e) =>
              handleFile(e.target.files?.[0] ?? null)
            }
          />
        </label>
      </div>

      {file && previewUrl && (
        <div className="space-y-4 rounded-xl border p-4">
          <p className="break-all text-sm font-medium">
            {file.name}
          </p>

          <video
            src={previewUrl}
            controls
            className="max-h-64 w-full rounded-lg bg-black"
          />

          <p className="text-xs text-slate-500">
            Video length: {videoDuration.toFixed(1)} seconds
          </p>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Short duration
            </label>

            <select
              className="input"
              value={duration}
              disabled={loading}
              onChange={(e) => {
                setDuration(e.target.value);
                setHighlights([]);
                clearOutputs();
              }}
            >
              <option value="15">15 seconds</option>
              <option value="30">30 seconds</option>
              <option value="60">1 minute</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Number of Shorts
            </label>

            <select
              className="input"
              value={shortCount}
              disabled={loading}
              onChange={(e) => {
                setShortCount(e.target.value);
                setHighlights([]);
                clearOutputs();
              }}
            >
              <option value="1">1 Short</option>
              <option value="3">3 Shorts</option>
              <option value="5">5 Shorts</option>
            </select>
          </div>

          <button
            className="btn w-full"
            onClick={analyzeHighlights}
            disabled={
              loading ||
              !videoDuration ||
              videoDuration < Number(duration)
            }
          >
            {loading ? "Please wait..." : "Find Best Moments"}
          </button>
        </div>
      )}

      {loading && (
        <div className="space-y-2">
          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-sm text-slate-500">
            {status} {progress}%
          </p>
        </div>
      )}

      {highlights.length > 0 && !outputs.length && (
        <div className="space-y-3 rounded-xl border p-4">
          <h3 className="font-semibold">
            Suggested Highlights
          </h3>

          <p className="text-sm text-slate-500">
            These moments were selected using visual scene changes.
            Review them before creating your Shorts.
          </p>

          {highlights.map((item, index) => (
            <div
              key={`${item.start}-${index}`}
              className="flex items-center justify-between rounded-lg bg-slate-100 p-3 text-sm text-slate-800"
            >
              <span>
                Short {index + 1}: {item.start.toFixed(1)}s
              </span>

              <span className="text-xs">
                {item.score > 0
                  ? "Scene change"
                  : "Suggested moment"}
              </span>
            </div>
          ))}

          <button
            className="btn w-full"
            onClick={createShorts}
            disabled={loading}
          >
            Create {highlights.length} Shorts
          </button>
        </div>
      )}

      {status && !loading && (
        <p className="text-sm text-green-600">{status}</p>
      )}

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      {outputs.length > 0 && (
        <div className="space-y-4 rounded-xl border p-4">
          <h3 className="font-semibold">
            Your Shorts Are Ready!
          </h3>

          {outputs.map((item, index) => (
            <div key={item.name} className="space-y-2">
              <p className="text-sm font-medium">
                Short {index + 1}
              </p>

              <video
                src={item.url}
                controls
                className="mx-auto max-h-[500px] rounded-lg bg-black"
              />

              <button
                className="btn w-full"
                onClick={() => download(item)}
              >
                Download Short {index + 1}
              </button>
            </div>
          ))}

          <button
            className="btn w-full"
            onClick={downloadAll}
          >
            Download All Shorts
          </button>
        </div>
      )}

      <p className="text-xs text-slate-500">
        Video analysis and processing happen in your browser.
        Your video is not uploaded to CreatorKit. Results and
        processing speed depend on your device.
      </p>
    </div>
  );
}