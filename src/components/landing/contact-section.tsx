import type { LandingConfig } from "@/lib/types";

interface ContactSectionProps {
  config: LandingConfig;
}

export function ContactSection({ config }: ContactSectionProps) {
  const brandName = config.brand?.companyName ?? "Landing CMS";
  const tagline = config.brand?.tagline ?? "One workspace for marketing teams";

  return (
    <section
      id="contact"
      className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:grid-cols-2"
    >
      <div className="flex flex-col gap-4">
        <span className="pill">Hubungi kami</span>
        <h2 className="text-3xl font-semibold text-white">
          Konsultasi gratis dengan tim {brandName}
        </h2>
        <p className="text-slate-300">
          {tagline}. Ceritakan tantangan tim konten Anda. Kami bantu mapping
          kebutuhan API NestJS + Next.js supaya marketing punya UX yang
          sederhana.
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          <li>✓ Audit struktur hero, CTA, blog, testimoni</li>
          <li>✓ Rekomendasi workflow approval</li>
          <li>✓ Demo integrasi Next.js secara live</li>
        </ul>
      </div>
      <form className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur">
        <label className="block text-sm text-slate-200">
          Nama
          <input
            type="text"
            placeholder="Nama lengkap"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-white outline-none focus:border-indigo-300"
          />
        </label>
        <label className="mt-4 block text-sm text-slate-200">
          Email kerja
          <input
            type="email"
            placeholder="name@company.com"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-white outline-none focus:border-indigo-300"
          />
        </label>
        <label className="mt-4 block text-sm text-slate-200">
          Ceritakan kebutuhanmu
          <textarea
            rows={3}
            placeholder="Kami ingin mempublish landing page regional tanpa dev..."
            className="mt-2 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-white outline-none focus:border-indigo-300"
          />
        </label>
        <button
          type="button"
          className="mt-5 w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-xl transition hover:-translate-y-0.5"
        >
          Kirim pesan
        </button>
        <p className="mt-3 text-center text-xs text-slate-400">
          Kami akan balas dalam 1x24 jam.
        </p>
      </form>
    </section>
  );
}

