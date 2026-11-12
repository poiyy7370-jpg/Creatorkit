"use client";
import { useState } from "react";
import CopyButton from "./CopyButton";
const styles: Record<string, ((n: string, k: string) => string)[]> = {
  Professional: [(n, k) => `${k} specialist | Helping clients get results\n📩 Contact for work`, (n, k) => `${n ? n + " | " : ""}${k} professional\nPractical insights, shared weekly`],
  Business: [(n, k) => `${n || "We"} help you with ${k}\n✔ Quality you can rely on\n👇 Start here`, (n, k) => `${k} made simple\nOrders and enquiries: link below`],
  Creator: [(n, k) => `Creating ${k} content ✨\nNew posts every week\n🎥 Latest video below`, (n, k) => `${n ? n + " • " : ""}${k} creator\nLearning in public, sharing everything`],
  Funny: [(n, k) => `Professional ${k} enthusiast. Amateur at everything else 😅`, (n, k) => `${k} is my love language (and my excuse for everything)`],
  Personal: [(n, k) => `${n ? n + ". " : ""}Into ${k}, good coffee and long walks ☕`, (n, k) => `Just a person who loves ${k}. Say hi 👋`],
};
export default function BioGenerator() {
  const [style, setStyle] = useState("Creator"); const [niche, setNiche] = useState(""); const [name, setName] = useState("");
  const [out, setOut] = useState<string[]>([]); const [err, setErr] = useState("");
  const go = () => {
    const k = niche.trim(); if (k.length < 2) { setErr("Enter your niche, for example travel or fitness."); setOut([]); return; }
    setErr(""); setOut(styles[style].map(f => f(name.trim(), k)).filter(b => b.length <= 150));
    if (!styles[style].some(f => f(name.trim(), k).length <= 150)) setErr("Your name and niche make every bio longer than 150 characters. Shorten them.");
  };
  return (<div className="space-y-3">
    <label className="block text-sm font-medium">Style<select className="input mt-1" value={style} onChange={e => setStyle(e.target.value)}>{Object.keys(styles).map(s => <option key={s}>{s}</option>)}</select></label>
    <label className="block text-sm font-medium">Niche<input className="input mt-1" value={niche} onChange={e => setNiche(e.target.value)} placeholder="travel photography" /></label>
    <label className="block text-sm font-medium">Name or brand (optional)<input className="input mt-1" value={name} onChange={e => setName(e.target.value)} /></label>
    <button className="btn" onClick={go}>Generate bios</button>
    {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
    <ul className="space-y-2">{out.map(b => <li key={b} className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-800"><span className="whitespace-pre-line">{b}<span className="block text-xs text-slate-400">{b.length}/150</span></span><CopyButton text={b} /></li>)}</ul>
  </div>);
}
