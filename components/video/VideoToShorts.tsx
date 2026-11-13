"use client";

import { useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export default function VideoToShorts() {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState("30");
  const [start, setStart] = useState("0");
  const [videoDuration, setVideoDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (output) URL.revokeObjectURL(output);
    };
  }, [output]);

  const loadFFmpeg = async () => {
    if (ffmpegRef.current?.loaded) return ffmpegRef.current;

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
    setOutput("");
    setVideoDuration(0);
    setStart("0");

    if (!selected) {
      setFile(null);
      return;
    }

    if (!selected.type.startsWith("video/")) {
      setError("Please choose a valid video file.");
      return;
    }

    if (selected.size > 500 * 1024 * 1024) {
      setError("Please choose a video smaller than 500 MB.");
      return;
    }

    setFile(selected);

    const url = URL.createObjectURL(selected);
    const video = document.createElement("video");

    video.preload = "metadata";
    video.onloadedmetadata = () => {
      setVideoDuration(video.duration);
      URL.revokeObjectURL(url);
    };
    video.onerror = () => {
      setError("Could not read this video. Try another file.");
      URL.revokeObjectURL(url);
    };
    video.src = url;
  };

  const createShort = async () => {
    if (!file) return;

    const startTime = Number(start);
    const clipDuration = Number(duration);

    if (
      !Number.isFinite(startTime) ||
      startTime < 0 ||
      startTime + clipDuration > videoDuration
    ) {
      setError("Please select a valid start time and clip duration.");
      return;
    }

    setLoading(true);
    setError("");
    setOutput("");
    setProgress(0);

    try {
      const ffmpeg = await loadFFmpeg();

      const inputName = "input-video";
      const outputName = "creator-short.mp4";

      setStatus("Preparing your video...");

      await ffmpeg.writeFile(inputName, await fetchFile(file));

      setStatus("Creating your vertical video...");

      const result = await ffmpeg.exec([
        "-ss", String(startTime),
        "-i", inputName,
        "-t", String(clipDuration),
        "-vf", "scale=-2:1920,crop=1080:1920",
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
        throw new Error("Video conversion failed. Try another video.");
      }

      const data = await ffmpeg.readFile(outputName);

      if (typeof data === "string") {
        throw new Error("Could not read the converted video.");
      }

      const blob = new Blob([new Uint8Array(data).buffer as ArrayBuffer], { type: "video/mp4" });

      setOutput(URL.createObjectURL(blob));
      setProgress(100);
      setStatus("Your short video is ready!");
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Something went wrong."
      );
      setStatus("");
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!output) return;

    const a = document.createElement("a");
    a.href = output;
    a.download = "creatorkit-short.mp4";
    a.click();
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
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      {file && (
        <div className="space-y-4 rounded-xl border p-4">
          <p className="break-all text-sm font-medium">{file.name}</p>

          <video
            src={URL.createObjectURL(file)}
            controls
            className="max-h-64 w-full rounded-lg bg-black"
          />

          <div>
            <label className="mb-1 block text-sm font-medium">
              Clip duration
            </label>
            <select
              className="input"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="15">15 seconds</option>
              <option value="30">30 seconds</option>
              <option value="60">1 minute</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Start time (seconds)
            </label>
            <input
              className="input"
              type="number"
              min="0"
              max={Math.max(0, videoDuration - Number(duration))}
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
            <p className="mt-1 text-xs text-slate-500">
              Video length: {videoDuration.toFixed(1)} seconds
            </p>
          </div>

          <button
            className="btn w-full"
            onClick={createShort}
            disabled={loading || !videoDuration || videoDuration < Number(duration)}
          >
            {loading ? "Processing..." : "Create Vertical Short"}
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

      {status && !loading && (
        <p className="text-sm text-green-600">{status}</p>
      )}

      {error && (
        <p role="alert" className="text-sm text-red-600">{error}</p>
      )}

      {output && (
        <div className="space-y-3 rounded-xl border p-4">
          <h3 className="font-semibold">Your Short is Ready!</h3>
          <video
            src={output}
            controls
            className="mx-auto max-h-[500px] rounded-lg bg-black"
          />
          <button className="btn w-full" onClick={download}>
            Download MP4
          </button>
        </div>
      )}

      <p className="text-xs text-slate-500">
        Video processing happens in your browser. Your video is not uploaded
        to CreatorKit. Processing speed depends on your device.
      </p>
    </div>
  );
}