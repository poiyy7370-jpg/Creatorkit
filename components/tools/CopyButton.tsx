"use client";
import { useState } from "react";
export default function CopyButton({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return <button className="btn-ghost" disabled={!text} onClick={async () => { try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); } catch { alert("Copy failed. Select the text and copy manually."); } }}>{ok ? "Copied" : "Copy"}</button>;
}
