"use client";
import { useState } from "react";
import QRCode from "qrcode";
export default function QrGenerator() {
  const [text, setText] = useState(""); const [size, setSize] = useState(300); const [url, setUrl] = useState(""); const [err, setErr] = useState("");
  const go = async () => {
    const t = text.trim(); setErr("");
    if (!t) { setErr("Enter some text or a URL first."); setUrl(""); return; }
    if (t.length > 1000) { setErr("Text is too long for a reliable QR code. Keep it under 1000 characters."); return; }
    try { setUrl(await QRCode.toDataURL(t, { width: size, margin: 2, errorCorrectionLevel: "M" })); }
    catch { setErr("Could not generate a QR code from that input."); setUrl(""); }
  };
  return (<div>
    <label htmlFor="q" className="mb-1 block text-sm font-medium">Text or URL</label>
    <textarea id="q" className="input h-24" value={text} onChange={e => setText(e.target.value)} placeholder="https://example.com" />
    <label className="mt-3 block text-sm">Size: {size}px<input type="range" min={128} max={1024} step={32} value={size} onChange={e => setSize(+e.target.value)} className="w-full" /></label>
    <button className="btn mt-3" onClick={go}>Generate QR code</button>
    {err && <p role="alert" className="mt-3 text-sm text-red-600">{err}</p>}
    {url && <div className="mt-5"><img src={url} alt="Generated QR code" width={Math.min(size, 320)} height={Math.min(size, 320)} className="rounded border bg-white" />
      <a className="btn mt-3" href={url} download="qr-code.png">Download PNG ({size}×{size})</a>
      <p className="mt-2 text-xs">Test the code with your phone before printing or publishing it.</p></div>}
  </div>);
}
