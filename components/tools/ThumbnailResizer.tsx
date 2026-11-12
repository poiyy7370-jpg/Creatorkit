"use client";
import { useState } from "react";
import { useImageFile, toBlob, fmtBytes, downloadBlob } from "./imageUtils";
const W = 1280, H = 720, LIMIT = 2 * 1024 * 1024;
export default function ThumbnailResizer() {
  const { file, img, err, onChange } = useImageFile();
  const [mode, setMode] = useState<"cover" | "contain">("cover");
  const [out, setOut] = useState<{ blob: Blob; url: string } | null>(null); const [msg, setMsg] = useState("");
  const run = async () => {
    if (!img || !file) return; setMsg("");
    try {
      const c = document.createElement("canvas"); c.width = W; c.height = H; const x = c.getContext("2d")!;
      x.fillStyle = "#000"; x.fillRect(0, 0, W, H); x.imageSmoothingQuality = "high";
      const s = (mode === "cover" ? Math.max : Math.min)(W / img.naturalWidth, H / img.naturalHeight);
      const dw = img.naturalWidth * s, dh = img.naturalHeight * s; x.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
      let blob = await toBlob(c, "image/jpeg", 0.92);
      for (const q of [0.85, 0.75, 0.6, 0.45]) { if (blob.size <= LIMIT) break; blob = await toBlob(c, "image/jpeg", q); }
      if (blob.size > LIMIT) setMsg("Could not get under 2 MB. Try a simpler image.");
      setOut(o => { if (o) URL.revokeObjectURL(o.url); return { blob, url: URL.createObjectURL(blob) }; });
    } catch (e) { setMsg((e as Error).message); }
  };
  return (<div>
    <label htmlFor="f" className="mb-1 block text-sm font-medium">Choose your thumbnail image</label>
    <input id="f" type="file" accept="image/jpeg,image/png,image/webp" onChange={onChange} className="input" />
    {err && <p role="alert" className="mt-3 text-sm text-red-600">{err}</p>}
    {img && file && <div className="mt-5 space-y-4">
      <p className="text-sm">Original: {img.naturalWidth}×{img.naturalHeight}px, {fmtBytes(file.size)}</p>
      <label className="text-sm">Fit method<select className="input mt-1" value={mode} onChange={e => setMode(e.target.value as "cover" | "contain")}><option value="cover">Fill 16:9 (crops edges)</option><option value="contain">Fit whole image (black bars)</option></select></label>
      <button className="btn" onClick={run}>Create 1280×720 thumbnail</button>
      {msg && <p role="alert" className="text-sm text-red-600">{msg}</p>}
      {out && <div className="space-y-3"><img src={out.url} alt="Thumbnail preview" className="w-full max-w-xl rounded border" style={{ aspectRatio: "16/9" }} /><p className="text-sm">1280×720px JPG, {fmtBytes(out.blob.size)} {out.blob.size <= LIMIT ? "(under YouTube’s 2 MB limit)" : ""}</p>
        <button className="btn" onClick={() => downloadBlob(out.blob, `${file.name.replace(/\.[^.]+$/, "")}-thumbnail-1280x720.jpg`)}>Download</button></div>}
    </div>}
  </div>);
}
