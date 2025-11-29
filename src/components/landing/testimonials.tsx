import type { LandingConfig } from "@/lib/types";

interface TestimonialsProps {
  config: LandingConfig;
}

export function Testimonials({ config }: TestimonialsProps) {
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
            <p className="text-lg text-slate-100">"{testimonial.quote}"</p>
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

