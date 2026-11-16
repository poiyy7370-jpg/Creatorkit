import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about CreatorKit, a digital tools platform by MZ Digital Marketing, offering practical tools for creators and marketers.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-16 text-slate-200">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-amber-400">
            About CreatorKit
          </p>

          <h1 className="mb-5 text-4xl font-extrabold text-white sm:text-5xl">
            Tools That Make{" "}
            <span className="gold-text">Creating Easier</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-400">
            CreatorKit provides simple and useful digital tools to help
            creators, marketers and businesses work smarter and save time.
          </p>
        </div>

        <section className="mb-10 rounded-2xl border border-amber-400/20 bg-slate-900 p-7">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Who We Are
          </h2>
          <p className="leading-8 text-slate-300">
            CreatorKit is a digital tools platform developed to make
            everyday creative and online tasks easier. Our goal is to
            provide accessible, easy-to-use tools for content creators,
            social media marketers and digital professionals.
          </p>
        </section>

        <section className="mb-10 rounded-2xl border border-amber-400/20 bg-slate-900 p-7">
          <h2 className="mb-4 text-2xl font-bold text-white">
            What We Offer
          </h2>
          <ul className="space-y-3 leading-7 text-slate-300">
            <li>• YouTube thumbnail resizing and creation tools</li>
            <li>• AI photo enhancement tools</li>
            <li>• Video-to-shorts conversion tools</li>
            <li>• Helpful tools for content creators and marketers</li>
          </ul>
        </section>

        <section className="mb-10 rounded-2xl border border-amber-400/20 bg-slate-900 p-7">
          <h2 className="mb-4 text-2xl font-bold text-white">
            How CreatorKit Works
          </h2>
          <p className="mb-4 leading-8 text-slate-300">
            CreatorKit offers browser-based tools designed to simplify
            common creative and digital tasks. Users can select a tool,
            upload or enter the required content, adjust available
            settings and generate results directly through the website.
          </p>
          <p className="mb-4 leading-8 text-slate-300">
            Many of our tools process files locally in the browser,
            helping users work without creating an account or uploading
            files to our servers. Some features may rely on third-party
            technologies to provide their functionality.
          </p>
          <p className="leading-8 text-slate-300">
            We continuously work to improve our tools, usability and
            website experience based on user needs and feedback.
          </p>
        </section>

        <section className="mb-10 rounded-2xl border border-amber-400/20 bg-slate-900 p-7">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Our Mission
          </h2>
          <p className="leading-8 text-slate-300">
            Our mission is to make useful digital technology more
            accessible by building practical tools with a simple
            and user-friendly experience.
          </p>
        </section>

        <section className="mb-10 rounded-2xl border border-purple-500/30 bg-slate-900 p-7 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">
            A Product by MZ Digital Marketing
          </h2>
          <p className="mb-2 text-amber-400">
            Technology & Digital Solutions
          </p>
          <p className="text-slate-400">
            Building digital solutions for a smarter online experience.
          </p>
        </section>

        <div className="text-center">
          <Link href="/tools" className="btn">
            Explore Our Tools
          </Link>
        </div>
      </div>
    </main>
  );
}