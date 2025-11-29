import type { LandingConfig } from "@/lib/types";

interface FeatureGridProps {
  config: LandingConfig;
}

export function FeatureGrid({ config }: FeatureGridProps) {
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

