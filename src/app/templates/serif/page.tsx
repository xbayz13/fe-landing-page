import Link from "next/link";
import { fallbackLandingConfig, loadLandingData } from "@/lib/landing-data";
import { formatDate } from "@/lib/format";

export const revalidate = 60;
export { generateLandingMetadata as generateMetadata } from "@/lib/landing-data";

export default async function SerifTemplate() {
  const { config, posts } = await loadLandingData();
  const hero = config.hero ?? fallbackLandingConfig.hero!;

  return (
    <main className="min-h-screen bg-[#f8f5f0] text-[#1b1f2f]">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-10">
        <header className="flex flex-col gap-2 border-b border-[#d8d2c8] pb-4">
          <p className="text-xs tracking-[0.35em] text-[#a38d6d]">
            {config.brand?.companyName ?? "Landing CMS"}
          </p>
          <h1 className="text-4xl font-serif font-semibold">
            {config.brand?.tagline ?? "Serif template"}
          </h1>
          <nav className="flex flex-wrap gap-4 text-sm text-[#726c60]">
            {config.navigation.slice(0, 5).map((link) => (
              <Link key={link.id} href={link.url || "#"} className="hover:text-[#1b1f2f]">
                {link.label}
              </Link>
            ))}
          </nav>
        </header>

        <section className="grid gap-10 rounded-[32px] border border-[#e8e1d6] bg-white p-10 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <p className="text-sm uppercase tracking-[0.35em] text-[#a38d6d]">
              {hero.eyebrow ?? "Showcase"}
            </p>
            <h2 className="text-5xl font-serif font-semibold leading-tight">{hero.heading}</h2>
            <p className="text-lg text-[#635b4e]">{hero.subheading}</p>
            <div className="flex flex-wrap gap-4">
              {hero.primaryCtaLabel && hero.primaryCtaUrl && (
                <Link
                  href={hero.primaryCtaUrl}
                  className="rounded-full bg-[#1b1f2f] px-6 py-3 text-sm font-semibold text-[#f8f5f0]"
                >
                  {hero.primaryCtaLabel}
                </Link>
              )}
              {hero.secondaryCtaLabel && hero.secondaryCtaUrl && (
                <Link
                  href={hero.secondaryCtaUrl}
                  className="rounded-full border border-[#d8d2c8] px-6 py-3 text-sm font-semibold text-[#1b1f2f]"
                >
                  {hero.secondaryCtaLabel}
                </Link>
              )}
            </div>
          </div>
          <div className="rounded-3xl border border-[#e8e1d6] bg-[#fefaf4] p-6">
            <ul className="space-y-3 text-sm text-[#5c5245]">
              <li>– CMS NestJS menyimpan hero, CTA, testimoni, footer.</li>
              <li>– Blog posts dilengkapi status, slug unik, SEO metadata.</li>
              <li>– Endpoint SEO siap untuk sitemap & RSS.</li>
              <li>– API key guard memastikan hanya admin yang bisa mutasi.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {config.features.slice(0, 3).map((feature) => (
            <article key={feature.id} className="rounded-3xl border border-[#e8e1d6] bg-white p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-[#a38d6d]">
                {feature.pillar ?? "Feature"}
              </p>
              <h3 className="mt-3 text-xl font-serif font-semibold">{feature.title}</h3>
              <p className="text-sm text-[#5c5245]">{feature.description}</p>
            </article>
          ))}
        </section>

        {posts.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-semibold">Tulisan terbaru</h2>
              <Link href="/blog" className="text-sm text-[#a38d6d]">
                Semua artikel →
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {posts.map((post) => (
                <article key={post.id} className="rounded-3xl border border-[#e8e1d6] bg-white p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#a38d6d]">
                    {formatDate(post.publishedAt ?? post.createdAt)}
                  </p>
                  <h3 className="mt-2 text-xl font-serif font-semibold text-[#1b1f2f]">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#5c5245]">{post.excerpt}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

