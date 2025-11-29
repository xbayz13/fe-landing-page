import Link from "next/link";
import type { LandingConfig } from "@/lib/types";

interface SiteFooterProps {
  config: LandingConfig;
}

type FooterLink = LandingConfig["footerLinks"][number];

export function SiteFooter({ config }: SiteFooterProps) {
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

  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

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
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-6">
        <a
          href={`${apiBaseUrl}/seo/sitemap.xml`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-400 transition hover:text-indigo-300"
        >
          Sitemap
        </a>
        <span className="text-xs text-slate-600">•</span>
        <a
          href={`${apiBaseUrl}/seo/rss.xml`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-400 transition hover:text-indigo-300"
        >
          RSS Feed
        </a>
      </div>
      <p className="mt-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {config.brand?.companyName ?? "Landing CMS"}
        . Crafted with NestJS + Next.js.
      </p>
    </footer>
  );
}

