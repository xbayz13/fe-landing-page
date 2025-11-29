import Link from "next/link";
import type { LandingConfig } from "@/lib/types";

interface SiteHeaderProps {
  config: LandingConfig;
}

export function SiteHeader({ config }: SiteHeaderProps) {
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

