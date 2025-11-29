import { updateBrandAction } from "@/lib/admin";
import type { BrandSetting } from "@/lib/types";
import { AdminCard, InputField, SaveButton } from "../admin-form-fields";

type BrandSectionProps = {
  brand: BrandSetting | null;
};

export function BrandSection({ brand }: BrandSectionProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <AdminCard title="Brand identity">
        <form action={updateBrandAction} className="space-y-4 text-sm">
          <InputField
            label="Nama perusahaan"
            name="companyName"
            defaultValue={brand?.companyName ?? ""}
            required
          />
          <InputField
            label="Tagline"
            name="tagline"
            defaultValue={brand?.tagline ?? ""}
          />
          <InputField
            label="Logo URL"
            name="logoUrl"
            defaultValue={brand?.logoUrl ?? ""}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label="Warna primer (hex)"
              name="primaryColor"
              defaultValue={brand?.primaryColor ?? ""}
            />
            <InputField
              label="Warna sekunder (hex)"
              name="secondaryColor"
              defaultValue={brand?.secondaryColor ?? ""}
            />
          </div>
          <SaveButton />
        </form>
      </AdminCard>
    </div>
  );
}

