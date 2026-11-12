"use client";
import { useState } from "react";
import CopyButton from "./CopyButton";
const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
export default function HashtagGenerator() {
  const [topic, setTopic] = useState(""); const [tags, setTags] = useState<string[]>([]); const [err, setErr] = useState("");
  const generate = () => {
    const w = clean(topic);
    if (!w.length) { setErr("Enter a topic first, for example “home workout routine”."); setTags([]); return; }
    setErr("");
    const set = new Set<string>();
    w.forEach(x => { if (x.length > 2) { set.add(x); set.add(x + "tips"); set.add(x + "community"); set.add(x + "daily"); } });
    set.add(w.join("")); if (w.length > 1) set.add(w.slice(0, 2).join(""));
    ["contentcreator", "reels", "viral", "explore", "creatorsoftiktok"].forEach(x => set.add(x));
    setTags([...set].slice(0, 30).map(x => "#" + x));
  };
  const text = tags.join(" ");
  return (<div>
    <label htmlFor="tp" className="mb-1 block text-sm font-medium">Topic or keywords</label>
    <input id="tp" className="input" value={topic} onChange={e => setTopic(e.target.value)} onKeyDown={e => e.key === "Enter" && generate()} placeholder="home workout routine" />
    <button className="btn mt-3" onClick={generate}>Generate hashtags</button>
    {err && <p role="alert" className="mt-3 text-sm text-red-600">{err}</p>}
    {tags.length > 0 && <div className="mt-5"><p className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-800">{text}</p><div className="mt-2 flex gap-2"><CopyButton text={text} /><span className="self-center text-xs">{tags.length} hashtags. Mix broad and niche tags and check they fit your post.</span></div></div>}
  </div>);
}
