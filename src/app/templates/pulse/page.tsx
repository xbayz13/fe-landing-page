import Link from "next/link";
import { fallbackLandingConfig, loadLandingData } from "@/lib/landing-data";

export const revalidate = 60;
export { generateLandingMetadata as generateMetadata } from "@/lib/landing-data";

export default async function PulseTemplate() {
  const { config, posts } = await loadLandingData();
  const hero = config.hero ?? fallbackLandingConfig.hero!;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              {config.brand?.companyName ?? "Landing CMS"}
            </p>
            <p className="text-sm text-slate-500">
              {config.brand?.tagline ?? "Pulse template"}
            </p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm text-slate-600">
            {config.navigation.slice(0, 5).map((link) => (
              <Link key={link.id} href={link.url || "#"} className="hover:text-slate-900">
                {link.label}
              </Link>
            ))}
          </nav>
        </header>

        <section className="grid gap-12 md:grid-cols-[3fr_2fr]">
          <div className="space-y-6">
            <span className="rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold tracking-[0.2em] text-slate-600">
              {hero.eyebrow ?? "CMS"}
            </span>
            <h1 className="text-5xl font-semibold leading-tight">{hero.heading}</h1>
            <p className="text-lg text-slate-600">{hero.subheading}</p>
            <div className="flex flex-wrap gap-4">
              {hero.primaryCtaLabel && hero.primaryCtaUrl && (
                <Link
                  href={hero.primaryCtaUrl}
                  className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
                >
                  {hero.primaryCtaLabel}
                </Link>
              )}
              {hero.secondaryCtaLabel && hero.secondaryCtaUrl && (
                <Link
                  href={hero.secondaryCtaUrl}
                  className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900"
                >
                  {hero.secondaryCtaLabel}
                </Link>
              )}
            </div>
            <div className="grid gap-3 text-sm text-slate-500 sm:grid-cols-2">
              <p>✓ Site config modul untuk hero, CTA, navigasi, footer</p>
              <p>✓ Blog posts dengan status, slug unik, SEO metadata</p>
              <p>✓ Endpoint sitemap + RSS siap konsumsi</p>
              <p>✓ JWT auth untuk melindungi rute mutasi</p>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
            <h3 className="text-xl font-semibold text-slate-900">Data Ringkas</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>{config.features.length} fitur utama</li>
              <li>{config.testimonials.length} testimoni aktif</li>
              <li>{posts.length} artikel terbaru</li>
              <li>
                CTA: {config.callsToAction[0]?.heading ?? "Belum diatur"}
              </li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {config.features.slice(0, 3).map((feature) => (
            <div key={feature.id} className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
              <p className="text-sm font-semibold text-slate-500">{feature.pillar ?? "Fitur"}</p>
              <h3 className="mt-3 text-xl font-semibold">{feature.title}</h3>
              <p className="text-sm text-slate-500">{feature.description}</p>
            </div>
          ))}
        </section>

        {config.testimonials.length > 0 && (
          <section className="grid gap-6 md:grid-cols-2">
            {config.testimonials.slice(0, 2).map((testimonial) => (
              <figure key={testimonial.id} className="rounded-3xl border border-slate-100 bg-white p-6 shadow">
                <p className="text-lg text-slate-900">“{testimonial.quote}”</p>
                <figcaption className="mt-4 text-sm text-slate-500">
                  <span className="font-semibold text-slate-900">
                    {testimonial.authorName}
                  </span>
                  {testimonial.authorRole && ` · ${testimonial.authorRole}`}
                  {testimonial.company && ` @ ${testimonial.company}`}
                </figcaption>
              </figure>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

