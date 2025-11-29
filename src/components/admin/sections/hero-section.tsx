import { updateHeroAction } from "@/lib/admin";
import type { HeroSection as HeroSectionType } from "@/lib/types";
import {
  AdminCard,
  InputField,
  TextareaField,
  SaveButton,
} from "../admin-form-fields";

type HeroSectionProps = {
  hero: HeroSectionType | null;
};

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <AdminCard title="Hero section">
      <form action={updateHeroAction} className="space-y-4 text-sm">
        <InputField
          label="Eyebrow"
          name="eyebrow"
          defaultValue={hero?.eyebrow ?? ""}
        />
        <InputField
          label="Heading"
          name="heading"
          defaultValue={hero?.heading ?? ""}
          required
        />
        <TextareaField
          label="Subheading"
          name="subheading"
          defaultValue={hero?.subheading ?? ""}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            label="Primary CTA label"
            name="primaryCtaLabel"
            defaultValue={hero?.primaryCtaLabel ?? ""}
          />
          <InputField
            label="Primary CTA URL"
            name="primaryCtaUrl"
            defaultValue={hero?.primaryCtaUrl ?? ""}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            label="Secondary CTA label"
            name="secondaryCtaLabel"
            defaultValue={hero?.secondaryCtaLabel ?? ""}
          />
          <InputField
            label="Secondary CTA URL"
            name="secondaryCtaUrl"
            defaultValue={hero?.secondaryCtaUrl ?? ""}
          />
        </div>
        <InputField
          label="Hero media URL"
          name="mediaUrl"
          defaultValue={hero?.mediaUrl ?? ""}
        />
        <SaveButton />
      </form>
    </AdminCard>
  );
}

