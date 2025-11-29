import {
  createTestimonialAction,
  deleteTestimonialAction,
  updateTestimonialAction,
} from "@/lib/admin";
import type { Testimonial } from "@/lib/types";
import {
  AdminCard,
  InputField,
  TextareaField,
  SaveButton,
  CheckboxField,
} from "../admin-form-fields";

type TestimonialSectionProps = {
  testimonials: Testimonial[];
};

export function TestimonialSection({
  testimonials,
}: TestimonialSectionProps) {
  const sorted = [...testimonials].sort((a, b) =>
    (a.authorName ?? "").localeCompare(b.authorName ?? ""),
  );

  return (
    <div className="space-y-8">
      <AdminCard title="Tambah testimonial">
        <form action={createTestimonialAction} className="space-y-4 text-sm">
          <TextareaField label="Testimonial" name="quote" required />
          <InputField label="Nama" name="authorName" required />
          <InputField label="Peran" name="authorRole" />
          <InputField label="Perusahaan" name="company" />
          <InputField label="Avatar URL" name="avatarUrl" />
          <div>
            <input type="hidden" name="featured" value="false" />
            <CheckboxField
              name="featured"
              value="true"
              label="Tandai sebagai featured"
            />
          </div>
          <SaveButton label="Tambah testimonial" />
        </form>
      </AdminCard>

      <div className="grid gap-6">
        {sorted.length === 0 && (
          <p className="text-sm text-slate-400">
            Belum ada testimonial. Tambahkan social proof dari pelanggan atau
            investor Anda.
          </p>
        )}
        {sorted.map((testimonial) => (
          <AdminCard
            key={testimonial.id}
            title={`${testimonial.authorName}${testimonial.company ? ` • ${testimonial.company}` : ""}`}
          >
            <form
              action={updateTestimonialAction.bind(null, testimonial.id)}
              className="space-y-4 text-sm"
            >
              <TextareaField
                label="Testimonial"
                name="quote"
                defaultValue={testimonial.quote}
                required
              />
              <InputField
                label="Nama"
                name="authorName"
                defaultValue={testimonial.authorName}
                required
              />
              <InputField
                label="Peran"
                name="authorRole"
                defaultValue={testimonial.authorRole ?? ""}
              />
              <InputField
                label="Perusahaan"
                name="company"
                defaultValue={testimonial.company ?? ""}
              />
              <InputField
                label="Avatar URL"
                name="avatarUrl"
                defaultValue={testimonial.avatarUrl ?? ""}
              />
              <div>
                <input type="hidden" name="featured" value="false" />
                <CheckboxField
                  name="featured"
                  value="true"
                  label="Tandai sebagai featured"
                  defaultChecked={testimonial.featured}
                />
              </div>
              <SaveButton label="Perbarui testimonial" />
            </form>
            <form
              action={deleteTestimonialAction.bind(null, testimonial.id)}
              className="mt-4"
            >
              <button
                type="submit"
                className="w-full rounded-full border border-red-400/50 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
              >
                Hapus testimonial
              </button>
            </form>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}

