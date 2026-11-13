import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/tools";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Free browser-based tools for YouTubers, Instagram users, TikTok creators and bloggers. No sign-up.",
  openGraph: { siteName: site.name, type: "website" },
};

const nav = [["Home", "/"], ["All Tools", "/tools"]];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.theme==='dark'||(!localStorage.theme&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>

      <body className="bg-[#07070d] text-slate-200">
        <header className="sticky top-0 z-50 border-b border-amber-400/20 bg-[#07070d]/95 shadow-lg shadow-purple-950/20 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
            <Link href="/" className="group flex items-center gap-3">
              <Image
                src="/mz-logo.png"
                alt="MZ Digital Marketing Logo"
                width={100}
                height={100}
                className="h-12 w-12 object-contain transition-transform group-hover:scale-105"
                priority
              />

              <div className="flex flex-col">
                <span className="bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-lg font-extrabold leading-tight text-transparent">
                  CreatorKit
                </span>
                <span className="text-[9px] font-bold tracking-[1.5px] text-slate-400">
                  BY MZ DIGITAL MARKETING
                </span>
              </div>
            </Link>

            <nav
              aria-label="Main"
              className="flex items-center gap-3 text-sm font-semibold sm:gap-6"
            >
              {nav.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="transition-colors hover:text-amber-400"
                >
                  {label}
                </Link>
              ))}
              <ThemeToggle />
            </nav>
          </div>
        </header>

        <main className="mx-auto min-h-[70vh] max-w-6xl px-4 py-10">
          {children}
        </main>

        <footer className="border-t border-amber-400/20 bg-[#050509]">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <div className="flex items-center gap-3">
                  <Image
                    src="/mz-logo.png"
                    alt="MZ Digital Marketing Logo"
                    width={100}
                    height={100}
                    className="h-12 w-12 object-contain"
                  />
                  <div>
                    <h2 className="text-lg font-extrabold text-amber-400">
                      CreatorKit
                    </h2>
                    <p className="text-xs text-slate-400">
                      A product by MZ Digital Marketing
                    </p>
                  </div>
                </div>

                <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
                  Powerful, simple and free tools to help creators
                  create better content and grow online.
                </p>
              </div>

              <div className="sm:text-right">
                <h3 className="font-bold text-white">Quick Links</h3>
                <div className="mt-4 flex gap-5 text-sm text-slate-400 sm:justify-end">
                  <Link href="/" className="hover:text-amber-400">
                    Home
                  </Link>
                  <Link href="/tools" className="hover:text-amber-400">
                    All Tools
                  </Link>
                </div>
                <p className="mt-5 text-xs tracking-wider text-purple-400">
                  TECHNOLOGY & DIGITAL SOLUTIONS
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
              © {new Date().getFullYear()} CreatorKit · Free Tools.
              Smarter Creation.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}