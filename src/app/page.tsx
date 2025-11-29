import Link from "next/link";
import { fallbackLandingConfig, loadLandingData } from "@/lib/landing-data";
import type { BlogPost, LandingConfig } from "@/lib/types";

export const revalidate = 60;
export { generateLandingMetadata as generateMetadata } from "@/lib/landing-data";

export default async function HomePage() {
  const { config, posts } = await loadLandingData();

  return (
    <div id="top" className="min-h-screen">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-8 sm:py-12 md:gap-24">
        <SiteHeader config={config} />
        <HeroSection config={config} />
        <StatsStrip />
        <FeatureGrid config={config} />
        <WorkflowSection />
        <BlogHighlights posts={posts} brand={config.brand} />
        <Testimonials config={config} />
        <PrimaryCta config={config} />
        <ContactSection config={config} />
      </div>
      <SiteFooter config={config} />
    </div>
  );
}

function SiteHeader({ config }: { config: LandingConfig }) {
  const brandName = config.brand?.companyName ?? "Landing CMS";
  const tagline = config.brand?.tagline ?? "Launch bold experiences";
  const navigation = [...config.navigation].sort((a, b) => a.position - b.position);
  const primaryLink =
    navigation.find((link) => link.isPrimary) ??
    (config.callsToAction[0]
      ? {
          id: "cta-nav",
          label: config.callsToAction[0].buttonLabel ?? "Contact",
          url: config.callsToAction[0].buttonUrl ?? "#contact",
          isExternal: false,
        }
      : undefined);

  return (
    <header className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-2xl">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
          {brandName}
        </p>
        <p className="text-sm text-slate-300">{tagline}</p>
      </div>
      <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-200">
        {navigation.map((link) => (
          <Link
            key={link.id}
            href={link.url || "#"}
            target={link.isExternal ? "_blank" : undefined}
            className="rounded-full px-3 py-1 text-slate-200 transition hover:bg-white/10"
          >
            {link.label}
          </Link>
        ))}
        {primaryLink && (
          <Link
            href={primaryLink.url ?? "#"}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5"
          >
            {primaryLink.label}
          </Link>
        )}
      </nav>
    </header>
  );
}

function HeroSection({ config }: { config: LandingConfig }) {
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
                “Kita bisa menyiapkan hero baru dalam <strong>5 menit</strong>.
                Semua copy tersimpan di NestJS CMS sehingga tim growth tinggal
                publish ulang landing page Next.js.”
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

function StatsStrip() {
  const stats = [
    { metric: "2x lebih cepat", detail: "update landing page" },
    { metric: "15+ blok", detail: "komponen siap pakai" },
    { metric: "SEO siap", detail: "metadata + sitemap otomatis" },
    { metric: "Full headless", detail: "Next.js + NestJS" },
  ];

  return (
    <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-slate-300 sm:grid-cols-2 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.metric} className="flex flex-col gap-1">
          <span className="text-base font-semibold text-white">
            {stat.metric}
          </span>
          <span>{stat.detail}</span>
        </div>
      ))}
    </section>
  );
}

function FeatureGrid({ config }: { config: LandingConfig }) {
  const features =
    config.features.length > 0
      ? config.features.slice(0, 4)
      : [
          {
            id: "feature-1",
            title: "Brand controls",
            description: "Kelola warna, logo, dan tipografi dari satu tempat.",
            icon: "🎨",
          },
          {
            id: "feature-2",
            title: "Blog workflow",
            description:
              "Status artikel, SEO metadata, dan relasi kategori siap pakai.",
            icon: "📰",
          },
          {
            id: "feature-3",
            title: "Sections reusable",
            description: "Hero, CTA, testimoni cukup diubah lewat dashboard.",
            icon: "🧩",
          },
          {
            id: "feature-4",
            title: "Headless-friendly",
            description:
              "Expose JSON untuk Next.js, mobile app, atau channel lainnya.",
            icon: "🔌",
          },
        ];

  return (
    <section id="features" className="grid gap-6 md:grid-cols-2">
      {features.map((feature) => (
        <div key={feature.id} className="card-surface p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-2xl">
            {feature.icon ?? "✦"}
          </div>
          <h3 className="mt-6 text-xl font-semibold text-white">
            {feature.title}
          </h3>
          <p className="mt-3 text-slate-300">{feature.description}</p>
        </div>
      ))}
    </section>
  );
}

function WorkflowSection() {
  const steps = [
    {
      title: "Brand & Layout",
      detail: "Set logo, warna, navigasi, hero, CTA dari modul Site Config.",
    },
    {
      title: "Konten Blog",
      detail: "Tulis artikel, atur slug, SEO metadata, dan jadwalkan publish.",
    },
    {
      title: "Preview",
      detail: "Next.js menarik data realtime via API, tampilkan preview aman.",
    },
    {
      title: "Go Live",
      detail:
        "Tekan publish dari CMS, frontend otomatis revalidate dengan ISR 60 detik.",
    },
  ];

  return (
    <section className="card-surface px-6 py-10 md:px-10" id="workflow">
      <div className="flex flex-col gap-3">
        <span className="pill">Alur kerja</span>
        <h2 className="text-3xl font-semibold text-white">
          UX dibuat supaya non-tech mudah bergerak
        </h2>
        <p className="text-slate-300">
          Setiap perubahan konten memiliki preview, validasi, serta fallback
          sehingga tim marketing percaya diri.
        </p>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="rounded-3xl border border-white/10 bg-slate-900/60 p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-sm font-semibold text-indigo-200">
              0{index + 1}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-slate-300">{step.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BlogHighlights({
  posts,
  brand,
}: {
  posts: BlogPost[];
  brand: LandingConfig["brand"];
}) {
  if (!posts.length) {
    return null;
  }

  return (
    <section id="blog" className="card-surface p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="pill">Blog</span>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Cerita terbaru dari {brand?.companyName ?? "kami"}
          </h2>
        </div>
        <Link
          href="/blog"
          className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Lihat semua
        </Link>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4 transition hover:border-indigo-400/60"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-200">
              {formatDate(post.publishedAt ?? post.createdAt)}
            </p>
            <h3 className="text-lg font-semibold text-white">{post.title}</h3>
            <p className="line-clamp-3 text-sm text-slate-300">
              {post.excerpt ?? "Baca cerita lengkapnya di blog kami."}
            </p>
            <div className="mt-auto flex items-center justify-between text-sm text-slate-400">
              <span>{post.author?.name ?? "Editorial Team"}</span>
              <span>→</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Testimonials({ config }: { config: LandingConfig }) {
  if (!config.testimonials.length) {
    return null;
  }

  return (
    <section className="card-surface p-8">
      <span className="pill">Testimonials</span>
      <h2 className="mt-3 text-3xl font-semibold text-white">
        Dibuat untuk tim marketing modern
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {config.testimonials.slice(0, 4).map((testimonial) => (
          <figure
            key={testimonial.id}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-6"
          >
            <p className="text-lg text-slate-100">“{testimonial.quote}”</p>
            <figcaption className="mt-4 text-sm text-slate-400">
              <span className="font-semibold text-white">
                {testimonial.authorName}
              </span>
              {testimonial.authorRole && ` · ${testimonial.authorRole}`}
              {testimonial.company && ` @ ${testimonial.company}`}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function PrimaryCta({ config }: { config: LandingConfig }) {
  const cta = config.callsToAction[0];
  if (!cta) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-8 py-12 shadow-2xl">
      {cta.eyebrow && (
        <p className="pill text-xs text-white/75">{cta.eyebrow}</p>
      )}
      <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white">{cta.heading}</h2>
          {cta.body && <p className="mt-2 text-white/80">{cta.body}</p>}
        </div>
        {cta.buttonLabel && cta.buttonUrl && (
          <Link
            href={cta.buttonUrl}
            className="inline-flex rounded-full bg-white px-6 py-3 font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5"
          >
            {cta.buttonLabel}
          </Link>
        )}
      </div>
    </section>
  );
}

function ContactSection({ config }: { config: LandingConfig }) {
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

function SiteFooter({ config }: { config: LandingConfig }) {
  const groupedLinks = config.footerLinks.reduce<Record<string, FooterLink[]>>(
    (acc, link) => {
      if (!acc[link.groupName]) {
        acc[link.groupName] = [];
      }
      acc[link.groupName].push(link);
      return acc;
    },
    {},
  );

  return (
    <footer className="mt-16 border-t border-white/10 bg-slate-900/40 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-200">
            {config.brand?.companyName ?? "Landing CMS"}
          </p>
          <p className="mt-2 text-slate-300">
            {config.brand?.tagline ??
              "CMS + landing page toolkit built with NestJS & Next.js."}
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {Object.entries(groupedLinks).map(([groupName, links]) => (
            <div key={groupName}>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-200">
                {groupName}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url}
                      className="transition hover:text-white"
                      target={link.url.startsWith("http") ? "_blank" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {config.brand?.companyName ?? "Landing CMS"}
        . Crafted with NestJS + Next.js.
      </p>
    </footer>
  );
}

type FooterLink = LandingConfig["footerLinks"][number];

function formatDate(input?: string) {
  if (!input) {
    return "Coming soon";
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(input));
}
