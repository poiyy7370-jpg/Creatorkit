"use client";
import { useEffect, useState, type ChangeEvent } from "react";
export const OK_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_BYTES = 25 * 1024 * 1024;
export const fmtBytes = (n: number) => n < 1024 ? `${n} B` : n < 1048576 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1048576).toFixed(2)} MB`;
export const toBlob = (c: HTMLCanvasElement, type: string, q?: number) =>
  new Promise<Blob>((res, rej) => c.toBlob(b => (b ? res(b) : rej(new Error("This browser could not encode that format."))), type, q));
export const extOf = (type: string) => (type === "image/jpeg" ? "jpg" : type.split("/")[1]);
export function downloadBlob(b: Blob, name: string) {
  const u = URL.createObjectURL(b); const a = document.createElement("a");
  a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 1000);
}
export function useImageFile() {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [src, setSrc] = useState(""); const [err, setErr] = useState("");
  useEffect(() => () => { if (src) URL.revokeObjectURL(src); }, [src]);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; setErr("");
    if (!f) return;
    if (!OK_TYPES.includes(f.type)) { setErr("Unsupported file. Choose a JPG, PNG or WebP image."); return; }
    if (f.size > MAX_BYTES) { setErr("File is larger than 25 MB. Choose a smaller image."); return; }
    const url = URL.createObjectURL(f); const i = new Image();
    i.onload = () => { setFile(f); setImg(i); setSrc(url); };
    i.onerror = () => { URL.revokeObjectURL(url); setErr("This image could not be read. It may be corrupted."); };
    i.src = url;
  };
  return { file, img, src, err, onChange };
}
