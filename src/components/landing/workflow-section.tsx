export function WorkflowSection() {
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

