import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with CreatorKit for questions, feedback and support.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen px-5 py-16 text-slate-200">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-amber-400">
            Get in Touch
          </p>

          <h1 className="mb-5 text-4xl font-extrabold text-white sm:text-5xl">
            Contact <span className="gold-text">Us</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-400">
            Have a question, suggestion or need help with CreatorKit?
            We would love to hear from you.
          </p>
        </div>

        <section className="mb-8 rounded-2xl border border-amber-400/20 bg-slate-900 p-8">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Contact CreatorKit
          </h2>

          <p className="mb-4 leading-8 text-slate-300">
            For questions, feedback, technical support or business
            inquiries, contact us through our official email:
          </p>

          <a
            href="mailto:creatorkit.support@gmail.com"
            className="break-all font-semibold text-amber-400 hover:text-amber-300"
          >
            creatorkit.support@gmail.com
          </a>

          <p className="mt-5 text-sm text-slate-400">
            We will do our best to respond to your message.
          </p>
        </section>

        <section className="mb-8 rounded-2xl border border-purple-500/30 bg-slate-900 p-8">
          <h2 className="mb-3 text-2xl font-bold text-white">
            Business Information
          </h2>

          <p className="mb-2 text-amber-400">
            MZ Digital Marketing
          </p>

          <p className="text-slate-400">
            Technology & Digital Solutions
          </p>

          <p className="mt-4 leading-7 text-slate-300">
            CreatorKit is a product by MZ Digital Marketing,
            developed to provide useful and accessible digital tools.
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
