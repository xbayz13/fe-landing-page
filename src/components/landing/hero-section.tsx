import Link from "next/link";
import { fallbackLandingConfig } from "@/lib/landing-data";
import type { LandingConfig } from "@/lib/types";

interface HeroSectionProps {
  config: LandingConfig;
}

export function HeroSection({ config }: HeroSectionProps) {
  const hero = config.hero ?? fallbackLandingConfig.hero!;

  return (
    <section className="card-surface relative overflow-hidden px-6 py-12 md:px-12 md:py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          {hero.eyebrow && <span className="pill">{hero.eyebrow}</span>}
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            {hero.heading}
          </h1>
          <p className="text-lg text-slate-200">{hero.subheading}</p>
          <div className="flex flex-wrap gap-4">
            {hero.primaryCtaLabel && hero.primaryCtaUrl && (
              <Link
                href={hero.primaryCtaUrl}
                className="rounded-full bg-gradient-to-r from-indigo-400 to-sky-300 px-6 py-3 font-semibold text-slate-900 shadow-xl transition hover:-translate-y-0.5"
              >
                {hero.primaryCtaLabel}
              </Link>
            )}
            {hero.secondaryCtaLabel && hero.secondaryCtaUrl && (
              <Link
                href={hero.secondaryCtaUrl}
                className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition hover:border-white/70"
              >
                {hero.secondaryCtaLabel}
              </Link>
            )}
          </div>
          <ul className="mt-2 grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              CMS siap pakai untuk hero, CTA, testimoni, navigasi.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Blog terintegrasi dengan status, SEO, dan kategori.
            </li>
          </ul>
        </div>
        {hero.mediaUrl ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero.mediaUrl}
              alt="Hero visual"
              className="h-full w-full rounded-[32px] border border-white/10 object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4 rounded-[32px] border border-white/10 bg-white/5 p-6">
            <p className="pill">Live preview</p>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-inner">
              <p className="text-sm text-slate-400">
                "Kita bisa menyiapkan hero baru dalam <strong>5 menit</strong>.
                Semua copy tersimpan di NestJS CMS sehingga tim growth tinggal
                publish ulang landing page Next.js."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-slate-800" />
                <div>
                  <p className="font-semibold text-white">Product Marketing</p>
                  <p className="text-xs text-slate-400">ACME Labs</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

