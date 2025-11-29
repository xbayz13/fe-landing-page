import Link from "next/link";
import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { fetchLandingConfig } from "@/lib/api";
import type { LandingConfig } from "@/lib/types";
import { updateBrandAction, updateHeroAction } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

const fallbackConfig: LandingConfig = {
  brand: {
    companyName: "Landing CMS",
    tagline: "Fallback mode",
  },
  hero: {
    heading: "Isi hero dari dashboard ini",
    subheading: "Saat API tidak tersedia, gunakan fallback copy.",
  },
  navigation: [],
  features: [],
  testimonials: [],
  callsToAction: [],
  footerLinks: [],
};

export default async function AdminPage() {
  const config = await fetchLandingConfig().catch(() => fallbackConfig);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-6 py-12 text-slate-50">
      <header className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="pill">Admin</p>
        <h1 className="mt-3 text-3xl font-semibold">CMS Dashboard</h1>
        <p className="mt-2 text-slate-300">
          Update branding, hero, dan konten landing page secara real time.
          Endpoint yang dipanggil membutuhkan API key yang sama dengan backend
          NestJS. Pastikan variabel <code>ADMIN_API_KEY</code> terisi pada
          environment Next.js (server-side).
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 text-sm text-indigo-200"
        >
          ← Kembali ke landing page
        </Link>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <Card title="Brand identity">
          <form action={updateBrandAction} className="space-y-4 text-sm">
            <InputField
              label="Nama perusahaan"
              name="companyName"
              defaultValue={config.brand?.companyName ?? ""}
              required
            />
            <InputField
              label="Tagline"
              name="tagline"
              defaultValue={config.brand?.tagline ?? ""}
            />
            <InputField
              label="Logo URL"
              name="logoUrl"
              defaultValue={config.brand?.logoUrl ?? ""}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                label="Warna primer (hex)"
                name="primaryColor"
                defaultValue={config.brand?.primaryColor ?? ""}
              />
              <InputField
                label="Warna sekunder (hex)"
                name="secondaryColor"
                defaultValue={config.brand?.secondaryColor ?? ""}
              />
            </div>
            <SaveButton />
          </form>
        </Card>

        <Card title="Hero section">
          <form action={updateHeroAction} className="space-y-4 text-sm">
            <InputField
              label="Eyebrow"
              name="eyebrow"
              defaultValue={config.hero?.eyebrow ?? ""}
            />
            <InputField
              label="Heading"
              name="heading"
              defaultValue={config.hero?.heading ?? ""}
              required
            />
            <TextareaField
              label="Subheading"
              name="subheading"
              defaultValue={config.hero?.subheading ?? ""}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                label="Primary CTA label"
                name="primaryCtaLabel"
                defaultValue={config.hero?.primaryCtaLabel ?? ""}
              />
              <InputField
                label="Primary CTA URL"
                name="primaryCtaUrl"
                defaultValue={config.hero?.primaryCtaUrl ?? ""}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                label="Secondary CTA label"
                name="secondaryCtaLabel"
                defaultValue={config.hero?.secondaryCtaLabel ?? ""}
              />
              <InputField
                label="Secondary CTA URL"
                name="secondaryCtaUrl"
                defaultValue={config.hero?.secondaryCtaUrl ?? ""}
              />
            </div>
            <InputField
              label="Hero media URL"
              name="mediaUrl"
              defaultValue={config.hero?.mediaUrl ?? ""}
            />
            <SaveButton />
          </form>
        </Card>
      </section>

      <Card title="Petunjuk penggunaan">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-300">
          <li>
            Set environment Next.js:{" "}
            <code className="rounded bg-black/40 px-2">
              ADMIN_API_KEY=...
            </code>{" "}
            dan pastikan nilainya sama dengan NestJS.
          </li>
          <li>
            Deploy NestJS terlebih dahulu. Frontend akan fallback ke konten
            statis jika API tidak bisa dijangkau.
          </li>
          <li>
            Setelah menyimpan perubahan, halaman landing otomatis ter-revalidate
            maksimal 60 detik via ISR.
          </li>
        </ol>
      </Card>
    </main>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function InputField(
  props: InputHTMLAttributes<HTMLInputElement> & { label: string },
) {
  const { label, ...rest } = props;
  return (
    <label className="flex flex-col gap-2 text-slate-200">
      <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {label}
      </span>
      <input
        {...rest}
        className="rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-white outline-none focus:border-indigo-300"
      />
    </label>
  );
}

function TextareaField(
  props: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string },
) {
  const { label, ...rest } = props;
  return (
    <label className="flex flex-col gap-2 text-slate-200">
      <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {label}
      </span>
      <textarea
        {...rest}
        className="rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-white outline-none focus:border-indigo-300"
      />
    </label>
  );
}

function SaveButton() {
  return (
    <button
      type="submit"
      className="w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5"
    >
      Simpan perubahan
    </button>
  );
}

