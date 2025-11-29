import Link from "next/link";
import type { LandingConfig } from "@/lib/types";

interface PrimaryCtaProps {
  config: LandingConfig;
}

export function PrimaryCta({ config }: PrimaryCtaProps) {
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

