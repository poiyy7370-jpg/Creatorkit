import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how CreatorKit handles information, files, cookies and privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen px-5 py-16 text-slate-200">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-amber-400">
            Your Privacy Matters
          </p>
          <h1 className="mb-5 text-4xl font-extrabold text-white sm:text-5xl">
            Privacy <span className="gold-text">Policy</span>
          </h1>
          <p className="text-slate-400">
            Last updated: November 14, 2026
          </p>
        </div>

        <section className="mb-8 rounded-2xl border border-amber-400/20 bg-slate-900 p-7">
          <h2 className="mb-4 text-2xl font-bold text-white">Introduction</h2>
          <p className="leading-8 text-slate-300">
            Welcome to CreatorKit, a product by MZ Digital Marketing.
            We respect your privacy and aim to be transparent about how
            information is handled when you use our website and tools.
          </p>
        </section>

        <section className="mb-8 rounded-2xl border border-amber-400/20 bg-slate-900 p-7">
          <h2 className="mb-4 text-2xl font-bold text-white">Information We Handle</h2>
          <p className="leading-8 text-slate-300">
            You can use many CreatorKit tools without creating an account.
            Our website hosting provider may process technical information
            such as IP address, browser type and device information when
            you visit the website, depending on its services and settings.
          </p>
        </section>

        <section className="mb-8 rounded-2xl border border-amber-400/20 bg-slate-900 p-7">
          <h2 className="mb-4 text-2xl font-bold text-white">Image and Video Processing</h2>
          <p className="mb-4 leading-8 text-slate-300">
            Our current AI Photo Enhancer uses browser-based image processing.
            Selected images are processed locally in your browser and are
            not uploaded to CreatorKit by this tool.
          </p>
          <p className="leading-8 text-slate-300">
            Our Video to Shorts tool uses FFmpeg WebAssembly to process
            selected videos in your browser. Videos are not uploaded to
            CreatorKit by this tool. The video processor files are loaded
            from a third-party CDN, which may receive standard technical
            connection information.
          </p>
        </section>

        <section className="mb-8 rounded-2xl border border-amber-400/20 bg-slate-900 p-7">
          <h2 className="mb-4 text-2xl font-bold text-white">Cookies and Advertising</h2>
          <p className="mb-4 leading-8 text-slate-300">
            Our website may use cookies or similar technologies for
            essential website functions and to improve the user experience.
          </p>
          <p className="leading-8 text-slate-300">
            If third-party advertising services such as Google AdSense
            are enabled, advertising partners may use cookies to show
            advertisements, measure performance or personalize ads
            according to their policies and applicable settings.
          </p>
        </section>

        <section className="mb-8 rounded-2xl border border-amber-400/20 bg-slate-900 p-7">
          <h2 className="mb-4 text-2xl font-bold text-white">Third-Party Services</h2>
          <p className="leading-8 text-slate-300">
            CreatorKit may use third-party services for hosting, content
            delivery and other website functions. These providers may
            process technical information under their own privacy policies.
            We encourage users to review those policies when using
            third-party services.
          </p>
        </section>

        <section className="mb-8 rounded-2xl border border-amber-400/20 bg-slate-900 p-7">
          <h2 className="mb-4 text-2xl font-bold text-white">Data Security</h2>
          <p className="leading-8 text-slate-300">
            We aim to use reasonable measures to protect our website and
            the information handled through it. However, no internet
            transmission or electronic storage method can be guaranteed
            to be completely secure.
          </p>
        </section>

        <section className="mb-8 rounded-2xl border border-amber-400/20 bg-slate-900 p-7">
          <h2 className="mb-4 text-2xl font-bold text-white">Children's Privacy</h2>
          <p className="leading-8 text-slate-300">
            CreatorKit is not intentionally designed to collect personal
            information from children. Parents or guardians who believe
            a child has provided personal information may contact us.
          </p>
        </section>

        <section className="mb-8 rounded-2xl border border-amber-400/20 bg-slate-900 p-7">
          <h2 className="mb-4 text-2xl font-bold text-white">Changes to This Policy</h2>
          <p className="leading-8 text-slate-300">
            We may update this Privacy Policy when our services or
            practices change. Any updated version will be published
            on this page with a revised update date.
          </p>
        </section>

        <section className="mb-8 rounded-2xl border border-purple-500/30 bg-slate-900 p-7">
          <h2 className="mb-4 text-2xl font-bold text-white">Contact</h2>
          <p className="leading-8 text-slate-300">
            CreatorKit is a product by MZ Digital Marketing.
            Official contact details will be published on our
            Contact Us page when available.
          </p>
          <Link href="/contact" className="mt-4 inline-block text-amber-400 hover:underline">
            Visit Contact Us
          </Link>
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