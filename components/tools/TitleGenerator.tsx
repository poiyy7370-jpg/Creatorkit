"use client";
import { useState } from "react";
import CopyButton from "./CopyButton";
const cap = (s: string) => s.replace(/\b\w/g, c => c.toUpperCase());
const formats = [
  (t: string) => `How to ${t}: A Beginner’s Guide`, (t: string) => `${cap(t)}: 7 Mistakes to Avoid`,
  (t: string) => `I Tried ${t} for 30 Days. Here’s What Happened`, (t: string) => `The Easiest Way to ${t}`,
  (t: string) => `${cap(t)} in 2026: What Actually Works`, (t: string) => `Stop Doing ${t} Wrong`,
  (t: string) => `${cap(t)} Explained in 10 Minutes`, (t: string) => `5 ${cap(t)} Tips I Wish I Knew Sooner`,
];
export default function TitleGenerator() {
  const [topic, setTopic] = useState(""); const [out, setOut] = useState<string[]>([]); const [err, setErr] = useState("");
  const go = () => { const t = topic.trim().toLowerCase(); if (t.length < 3) { setErr("Enter a topic of at least 3 characters."); setOut([]); return; } setErr(""); setOut(formats.map(f => f(t))); };
  return (<div>
    <label htmlFor="tt" className="mb-1 block text-sm font-medium">Video topic</label>
    <input id="tt" className="input" value={topic} onChange={e => setTopic(e.target.value)} onKeyDown={e => e.key === "Enter" && go()} placeholder="grow a youtube channel" />
    <button className="btn mt-3" onClick={go}>Generate titles</button>
    {err && <p role="alert" className="mt-3 text-sm text-red-600">{err}</p>}
    <ul className="mt-5 space-y-2">{out.map(o => <li key={o} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-800"><span>{o} <span className="text-xs text-slate-400">({o.length}/100)</span></span><CopyButton text={o} /></li>)}</ul>
    {out.length > 0 && <p className="mt-3 text-xs">These are templates. Edit them so the title matches what your video actually delivers.</p>}
  </div>);
}
