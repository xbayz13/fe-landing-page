import {
  createFeatureAction,
  deleteFeatureAction,
  updateFeatureAction,
} from "@/lib/admin";
import type { Feature } from "@/lib/types";
import {
  AdminCard,
  InputField,
  TextareaField,
  SaveButton,
} from "../admin-form-fields";

type FeatureSectionProps = {
  features: Feature[];
};

export function FeatureSection({ features }: FeatureSectionProps) {
  const sorted = [...features].sort(
    (a, b) => (a.highlightOrder ?? 0) - (b.highlightOrder ?? 0),
  );

  return (
    <div className="space-y-8">
      <AdminCard title="Tambah fitur">
        <form action={createFeatureAction} className="space-y-4 text-sm">
          <InputField label="Judul" name="title" required />
          <TextareaField label="Deskripsi" name="description" required />
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField label="Icon (emoji / class)" name="icon" />
            <InputField
              label="Urutan highlight"
              name="highlightOrder"
              type="number"
              defaultValue={sorted.length}
            />
          </div>
          <InputField label="Pillar" name="pillar" />
          <SaveButton label="Tambah fitur" />
        </form>
      </AdminCard>

      <div className="grid gap-6">
        {sorted.length === 0 && (
          <p className="text-sm text-slate-400">
            Belum ada fitur. Tambahkan minimal tiga fitur agar landing page
            terlihat lengkap.
          </p>
        )}
        {sorted.map((feature) => (
          <AdminCard key={feature.id} title={feature.title}>
            <form
              action={updateFeatureAction.bind(null, feature.id)}
              className="space-y-4 text-sm"
            >
              <InputField
                label="Judul"
                name="title"
                defaultValue={feature.title}
                required
              />
              <TextareaField
                label="Deskripsi"
                name="description"
                defaultValue={feature.description}
                required
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Icon"
                  name="icon"
                  defaultValue={feature.icon ?? ""}
                />
                <InputField
                  label="Urutan highlight"
                  name="highlightOrder"
                  type="number"
                  defaultValue={feature.highlightOrder ?? 0}
                />
              </div>
              <InputField
                label="Pillar"
                name="pillar"
                defaultValue={feature.pillar ?? ""}
              />
              <SaveButton label="Perbarui fitur" />
            </form>
            <form
              action={deleteFeatureAction.bind(null, feature.id)}
              className="mt-4"
            >
              <button
                type="submit"
                className="w-full rounded-full border border-red-400/50 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
              >
                Hapus fitur
              </button>
            </form>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}

