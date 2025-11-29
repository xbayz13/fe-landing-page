import {
  createCtaAction,
  deleteCtaAction,
  updateCtaAction,
} from "@/lib/admin";
import type { CallToActionBlock } from "@/lib/types";
import {
  AdminCard,
  InputField,
  TextareaField,
  SaveButton,
  SelectField,
} from "../admin-form-fields";

type CtaSectionProps = {
  blocks: CallToActionBlock[];
};

const variants = [
  { value: "solid", label: "Solid" },
  { value: "outline", label: "Outline" },
  { value: "ghost", label: "Ghost" },
];

export function CtaSection({ blocks }: CtaSectionProps) {
  return (
    <div className="space-y-8">
      <AdminCard title="Tambah CTA block">
        <form action={createCtaAction} className="space-y-4 text-sm">
          <InputField label="Heading" name="heading" required />
          <TextareaField label="Body" name="body" />
          <InputField label="Eyebrow" name="eyebrow" />
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField label="Button label" name="buttonLabel" />
            <InputField label="Button URL" name="buttonUrl" />
          </div>
          <SelectField label="Variant" name="variant" defaultValue="solid">
            {variants.map((variant) => (
              <option key={variant.value} value={variant.value}>
                {variant.label}
              </option>
            ))}
          </SelectField>
          <SaveButton label="Tambah CTA" />
        </form>
      </AdminCard>

      <div className="grid gap-6">
        {blocks.length === 0 && (
          <p className="text-sm text-slate-400">
            Tambahkan CTA block untuk menonjolkan call-to-action penting pada
            landing page.
          </p>
        )}
        {blocks.map((block) => (
          <AdminCard key={block.id} title={block.heading}>
            <form
              action={updateCtaAction.bind(null, block.id)}
              className="space-y-4 text-sm"
            >
              <InputField
                label="Heading"
                name="heading"
                defaultValue={block.heading}
                required
              />
              <TextareaField
                label="Body"
                name="body"
                defaultValue={block.body ?? ""}
              />
              <InputField
                label="Eyebrow"
                name="eyebrow"
                defaultValue={block.eyebrow ?? ""}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Button label"
                  name="buttonLabel"
                  defaultValue={block.buttonLabel ?? ""}
                />
                <InputField
                  label="Button URL"
                  name="buttonUrl"
                  defaultValue={block.buttonUrl ?? ""}
                />
              </div>
              <SelectField
                label="Variant"
                name="variant"
                defaultValue={block.variant ?? "solid"}
              >
                {variants.map((variant) => (
                  <option key={variant.value} value={variant.value}>
                    {variant.label}
                  </option>
                ))}
              </SelectField>
              <SaveButton label="Perbarui CTA" />
            </form>
            <form
              action={deleteCtaAction.bind(null, block.id)}
              className="mt-4"
            >
              <button
                type="submit"
                className="w-full rounded-full border border-red-400/50 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
              >
                Hapus CTA
              </button>
            </form>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}

