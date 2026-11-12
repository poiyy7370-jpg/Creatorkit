import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/tools";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – ${site.tagline}`, template: `%s | ${site.name}` },
  description: "Free browser-based tools for YouTubers, Instagram users, TikTok creators and bloggers. No sign-up.",
  openGraph: { siteName: site.name, type: "website" },
};
const nav = [["Home", "/"], ["All Tools", "/tools"]];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.theme==='dark'||(!localStorage.theme&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}` }} /></head>
      <body>
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
            <Link href="/" className="text-lg font-bold bg-gradient-to-r from-brand to-brand-violet bg-clip-text text-transparent">CreatorKit</Link>
            <nav aria-label="Main" className="flex items-center gap-4 text-sm font-medium">
              {nav.map(([l, h]) => <Link key={h} href={h} className="hover:text-brand">{l}</Link>)}
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-slate-800">
          © {new Date().getFullYear()} CreatorKit · Free Tools. Smarter Creation.
        </footer>
      </body>
    </html>
  );
}
