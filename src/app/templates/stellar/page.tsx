import Link from "next/link";
import { fallbackLandingConfig, loadLandingData } from "@/lib/landing-data";
import { formatDate } from "@/lib/format";

export const revalidate = 60;
export { generateLandingMetadata as generateMetadata } from "@/lib/landing-data";

export default async function StellarTemplate() {
  const { config, posts } = await loadLandingData();
  const hero = config.hero ?? fallbackLandingConfig.hero!;

  return (
    <main className="min-h-screen bg-[#050418] text-slate-50">
      <div className="relative mx-auto flex max-w-5xl flex-col gap-12 px-6 py-12">
        <div className="absolute inset-x-0 top-10 -z-10 h-72 rounded-full bg-indigo-500/30 blur-[120px]" />
        <header className="rounded-3xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-indigo-200">
                {config.brand?.companyName ?? "Landing CMS"}
              </p>
              <p className="text-sm text-slate-300">
                {config.brand?.tagline ?? "Premium template – Stellar"}
              </p>
            </div>
            <nav className="flex flex-wrap gap-4 text-xs text-slate-200">
              {config.navigation.slice(0, 4).map((link) => (
                <Link key={link.id} href={link.url || "#"} className="opacity-80 hover:opacity-100">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <section className="grid gap-10 rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/80 to-indigo-900/70 p-10 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            {hero.eyebrow && <span className="pill">{hero.eyebrow}</span>}
            <h1 className="text-4xl font-semibold text-white">{hero.heading}</h1>
            <p className="text-lg text-slate-200">{hero.subheading}</p>
            <div className="flex flex-wrap gap-4">
              {hero.primaryCtaLabel && hero.primaryCtaUrl && (
                <Link
                  href={hero.primaryCtaUrl}
                  className="rounded-full bg-white px-6 py-3 font-semibold text-slate-900 shadow-xl"
                >
                  {hero.primaryCtaLabel}
                </Link>
              )}
              {hero.secondaryCtaLabel && hero.secondaryCtaUrl && (
                <Link
                  href={hero.secondaryCtaUrl}
                  className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white"
                >
                  {hero.secondaryCtaLabel}
                </Link>
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <ul className="space-y-4 text-sm text-slate-200">
              <li>✔︎ Site Config: hero, CTA, navigasi, testimonial.</li>
              <li>✔︎ Blog module dengan status + SEO metadata.</li>
              <li>✔︎ Endpoint SEO: metadata, sitemap, RSS.</li>
              <li>✔︎ JWT auth memastikan hanya admin yang bisa menulis data.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {config.features.slice(0, 3).map((feature) => (
            <div key={feature.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-3xl">{feature.icon ?? "✦"}</p>
              <h3 className="mt-3 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-slate-300">{feature.description}</p>
            </div>
          ))}
        </section>

        {posts.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Blog terbaru</h2>
              <Link href="/blog" className="text-sm text-indigo-200">
                Semua artikel →
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {posts.map((post) => (
                <article key={post.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {formatDate(post.publishedAt ?? post.createdAt)}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
                  <p className="text-sm text-slate-300 line-clamp-3">{post.excerpt}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

