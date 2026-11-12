"use client";
import { useEffect, useState } from "react";
import { useImageFile, toBlob, fmtBytes, downloadBlob, extOf } from "./imageUtils";
export default function ImageCompressor() {
  const { file, img, src, err, onChange } = useImageFile();
  const [q, setQ] = useState(75); const [fmt, setFmt] = useState("image/webp");
  const [out, setOut] = useState<{ blob: Blob; url: string } | null>(null); const [msg, setMsg] = useState("");
  useEffect(() => {
    if (!img) return; let dead = false; setMsg("");
    (async () => {
      try {
        const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
        const x = c.getContext("2d")!; if (fmt === "image/jpeg") { x.fillStyle = "#fff"; x.fillRect(0, 0, c.width, c.height); }
        x.drawImage(img, 0, 0); const blob = await toBlob(c, fmt, q / 100);
        if (!dead) setOut(o => { if (o) URL.revokeObjectURL(o.url); return { blob, url: URL.createObjectURL(blob) }; });
      } catch (e) { if (!dead) setMsg((e as Error).message); }
    })();
    return () => { dead = true; };
  }, [img, q, fmt]);
  const pct = file && out ? Math.round((1 - out.blob.size / file.size) * 100) : 0;
  return (<div>
    <label htmlFor="f" className="mb-1 block text-sm font-medium">Choose a JPG, PNG or WebP image (max 25 MB)</label>
    <input id="f" type="file" accept="image/jpeg,image/png,image/webp" onChange={onChange} className="input" />
    {err && <p role="alert" className="mt-3 text-sm text-red-600">{err}</p>}
    {img && file && <div className="mt-5 space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">Quality: {q}%<input type="range" min={10} max={95} value={q} onChange={e => setQ(+e.target.value)} className="w-full" /></label>
        <label className="text-sm">Output format<select className="input mt-1" value={fmt} onChange={e => setFmt(e.target.value)}><option value="image/webp">WebP (smallest)</option><option value="image/jpeg">JPG</option></select></label>
      </div>
      {msg && <p role="alert" className="text-sm text-red-600">{msg}</p>}
      {out && <>
        <p className="text-sm">Original {fmtBytes(file.size)} → compressed {fmtBytes(out.blob.size)}. {pct >= 0 ? `${pct}% smaller.` : `${-pct}% larger. Lower the quality or try WebP.`}</p>
        <div className="grid gap-3 sm:grid-cols-2"><figure><figcaption className="text-xs">Original</figcaption><img src={src} alt="Original" className="max-h-64 rounded border" /></figure><figure><figcaption className="text-xs">Compressed</figcaption><img src={out.url} alt="Compressed" className="max-h-64 rounded border" /></figure></div>
        <button className="btn" onClick={() => downloadBlob(out.blob, `${file.name.replace(/\.[^.]+$/, "")}-compressed.${extOf(fmt)}`)}>Download</button>
      </>}
    </div>}
    <p className="mt-4 text-xs text-slate-500">Images are processed in your browser and never uploaded. Transparent PNGs get a white background when saved as JPG.</p>
  </div>);
}
