"use client";
import { useEffect, useState } from "react";
import { useImageFile, toBlob, fmtBytes, downloadBlob, extOf } from "./imageUtils";
export default function ImageResizer() {
  const { file, img, err, onChange } = useImageFile();
  const [w, setW] = useState(""); const [h, setH] = useState(""); const [lock, setLock] = useState(true);
  const [out, setOut] = useState<{ blob: Blob; url: string } | null>(null); const [msg, setMsg] = useState("");
  useEffect(() => { if (img) { setW(String(img.naturalWidth)); setH(String(img.naturalHeight)); setOut(null); } }, [img]);
  const ratio = img ? img.naturalWidth / img.naturalHeight : 1;
  const setWidth = (v: string) => { setW(v); if (lock && +v > 0) setH(String(Math.round(+v / ratio))); };
  const setHeight = (v: string) => { setH(v); if (lock && +v > 0) setW(String(Math.round(+v * ratio))); };
  const run = async () => {
    setMsg(""); const nw = Math.round(+w), nh = Math.round(+h);
    if (!img || !file) return;
    if (!(nw >= 1 && nh >= 1) || nw > 8000 || nh > 8000) { setMsg("Enter a width and height between 1 and 8000 pixels."); return; }
    try {
      const c = document.createElement("canvas"); c.width = nw; c.height = nh; const x = c.getContext("2d")!;
      x.imageSmoothingQuality = "high"; if (file.type === "image/jpeg") { x.fillStyle = "#fff"; x.fillRect(0, 0, nw, nh); }
      x.drawImage(img, 0, 0, nw, nh); const blob = await toBlob(c, file.type, 0.92);
      setOut(o => { if (o) URL.revokeObjectURL(o.url); return { blob, url: URL.createObjectURL(blob) }; });
    } catch (e) { setMsg((e as Error).message); }
  };
  return (<div>
    <label htmlFor="f" className="mb-1 block text-sm font-medium">Choose a JPG, PNG or WebP image</label>
    <input id="f" type="file" accept="image/jpeg,image/png,image/webp" onChange={onChange} className="input" />
    {err && <p role="alert" className="mt-3 text-sm text-red-600">{err}</p>}
    {img && file && <div className="mt-5 space-y-4">
      <p className="text-sm">Original: {img.naturalWidth}×{img.naturalHeight}px, {fmtBytes(file.size)}</p>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm">Width (px)<input className="input mt-1" inputMode="numeric" value={w} onChange={e => setWidth(e.target.value)} /></label>
        <label className="text-sm">Height (px)<input className="input mt-1" inputMode="numeric" value={h} onChange={e => setHeight(e.target.value)} /></label>
      </div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={lock} onChange={e => setLock(e.target.checked)} />Keep aspect ratio</label>
      <button className="btn" onClick={run}>Resize image</button>
      {msg && <p role="alert" className="text-sm text-red-600">{msg}</p>}
      {out && <div className="space-y-3"><img src={out.url} alt="Resized preview" className="max-h-72 rounded border" /><p className="text-sm">Result: {Math.round(+w)}×{Math.round(+h)}px, {fmtBytes(out.blob.size)}</p>
        <button className="btn" onClick={() => downloadBlob(out.blob, `${file.name.replace(/\.[^.]+$/, "")}-${Math.round(+w)}x${Math.round(+h)}.${extOf(file.type)}`)}>Download</button></div>}
    </div>}
  </div>);
}
