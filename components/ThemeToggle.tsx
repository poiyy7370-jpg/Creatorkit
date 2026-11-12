"use client";
export default function ThemeToggle() {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try { localStorage.theme = dark ? "dark" : "light"; } catch {}
  };
  return <button onClick={toggle} className="btn-ghost !px-3 !py-1" aria-label="Toggle light or dark mode">Theme</button>;
}
