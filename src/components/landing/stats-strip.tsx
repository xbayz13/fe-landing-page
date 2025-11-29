export function StatsStrip() {
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

