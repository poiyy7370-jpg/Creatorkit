import ToolSearch from "@/components/ToolSearch";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="relative isolate overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-br from-slate-950 via-[#100b24] to-purple-950 px-5 py-16 text-center shadow-2xl sm:px-10 sm:py-24">
        <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl" />

        <div className="absolute left-5 top-16 hidden rotate-[-12deg] rounded-2xl border border-white/10 bg-white/10 p-4 text-5xl shadow-xl sm:block">
          ▶️
        </div>
        <div className="absolute bottom-28 left-10 hidden rotate-12 rounded-2xl border border-white/10 bg-white/10 p-4 text-5xl shadow-xl sm:block">
          📸
        </div>
        <div className="absolute right-5 top-16 hidden rotate-12 rounded-2xl border border-white/10 bg-white/10 p-4 text-5xl shadow-xl sm:block">
          🎵
        </div>
        <div className="absolute bottom-28 right-10 hidden rotate-[-10deg] rounded-2xl border border-white/10 bg-white/10 p-4 text-5xl shadow-xl sm:block">
          🎬
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-2 text-sm font-semibold text-amber-300">
            ✨ Your All-in-One Creator Toolkit
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Everything Creators Need in
            <span className="block bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              One Place
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-xl">
            Free tools for YouTube, Instagram and TikTok.
            Many tools run directly in your browser, with no sign-up required.
          </p>

          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-amber-400/40 bg-black/40 p-2 shadow-lg shadow-purple-900/30">
            <ToolSearch />
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["⚡", "100% Free", "No Sign-Up"],
              ["🛡️", "Privacy-Friendly", "Browser Processing"],
              ["🚀", "Browser-Based", "Simple Workflows"],
              ["❤️", "Made for Creators", "Creative Tools"],
            ].map(([icon, title, subtitle]) => (
              <div
                key={title}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-5 backdrop-blur-sm"
              >
                <div className="text-3xl">{icon}</div>
                <h3 className="mt-2 text-sm font-bold text-white">
                  {title}
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  {subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="pop">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">
              Explore CreatorKit
            </p>
            <h2
              id="pop"
              className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white"
            >
              All Creator Tools
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Everything you need to create, edit and grow.
            </p>
          </div>

          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-600 dark:text-amber-400">
            {tools.length} Tools Available
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <ToolCard key={t.slug} t={t} />
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-amber-400/20 bg-slate-900 p-7 sm:p-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-400">
            About Our Platform
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-white">
            Why Choose CreatorKit?
          </h2>

          <p className="mt-5 leading-8 text-slate-300">
            CreatorKit is a collection of practical digital tools for
            content creators, social media marketers and online businesses.
            Our goal is to make everyday creative tasks easier through
            simple, accessible browser-based experiences.
          </p>

          <h3 className="mt-7 text-xl font-bold text-white">
            Tools for Different Creative Tasks
          </h3>
          <p className="mt-3 leading-8 text-slate-300">
            You can count words and characters, generate social media
            hashtags and video descriptions, create thumbnails, resize
            images, compress files and generate QR codes. Video and image
            tools also provide options for editing and preparing visual
            content.
          </p>

          <h3 className="mt-7 text-xl font-bold text-white">
            Simple Browser-Based Workflows
          </h3>
          <p className="mt-3 leading-8 text-slate-300">
            Select a tool, provide the required text or file, adjust the
            available settings and generate your result. Many file tools
            process content locally in your browser. Processing time
            depends on the file size and your device.
          </p>

          <h3 className="mt-7 text-xl font-bold text-white">
            Free and Accessible
          </h3>
          <p className="mt-3 leading-8 text-slate-300">
            CreatorKit aims to make useful digital features accessible
            without requiring users to create an account. We continue
            improving the platform to make its tools easier to understand
            and use.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/about"
              className="font-semibold text-amber-400 hover:text-amber-300"
            >
              Learn More About Us →
            </a>
            <a
              href="/contact"
              className="font-semibold text-amber-400 hover:text-amber-300"
            >
              Contact CreatorKit →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}