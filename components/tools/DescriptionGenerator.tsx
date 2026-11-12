"use client";
import { useState } from "react";
import CopyButton from "./CopyButton";
const tag = (s: string) => "#" + s.toLowerCase().replace(/[^a-z0-9]/g, "");
export default function DescriptionGenerator() {
  const [topic, setTopic] = useState(""); const [kw, setKw] = useState(""); const [details, setDetails] = useState(""); const [channel, setChannel] = useState("");
  const [out, setOut] = useState(""); const [err, setErr] = useState("");
  const go = () => {
    const t = topic.trim(); const keys = kw.split(",").map(s => s.trim()).filter(Boolean);
    if (t.length < 3) { setErr("Enter your video topic (at least 3 characters)."); setOut(""); return; }
    setErr("");
    const tags = [...new Set([t, ...keys].map(tag).filter(x => x.length > 1))].slice(0, 5).join(" ");
    const parts = [
      `In this video, you’ll learn about ${t}${keys[0] ? `, including ${keys.slice(0, 3).join(", ")}` : ""}.`,
      details.trim(),
      `If this helped, like the video and subscribe${channel.trim() ? ` to ${channel.trim()}` : ""} for more. Tell me in the comments what you want covered next.`,
      keys.length ? `Topics covered: ${keys.join(", ")}.` : "",
      tags,
    ].filter(Boolean);
    setOut(parts.join("\n\n"));
  };
  return (<div className="space-y-3">
    <label className="block text-sm font-medium">Video topic<input className="input mt-1" value={topic} onChange={e => setTopic(e.target.value)} /></label>
    <label className="block text-sm font-medium">Keywords (comma separated)<input className="input mt-1" value={kw} onChange={e => setKw(e.target.value)} placeholder="youtube growth, thumbnails" /></label>
    <label className="block text-sm font-medium">Video details (optional)<textarea className="input mt-1 h-24" value={details} onChange={e => setDetails(e.target.value)} /></label>
    <label className="block text-sm font-medium">Channel name (optional)<input className="input mt-1" value={channel} onChange={e => setChannel(e.target.value)} /></label>
    <button className="btn" onClick={go}>Generate description</button>
    {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
    {out && <div><pre className="whitespace-pre-wrap rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-800">{out}</pre><div className="mt-2 flex items-center gap-3"><CopyButton text={out} /><span className="text-xs">{out.length}/5000 characters. Add timestamps and links before publishing.</span></div></div>}
  </div>);
}
