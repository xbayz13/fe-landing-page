import {
  createNavigationAction,
  deleteNavigationAction,
  updateNavigationAction,
} from "@/lib/admin";
import type { NavigationLink } from "@/lib/types";
import {
  AdminCard,
  CheckboxField,
  InputField,
  SaveButton,
} from "../admin-form-fields";

type NavigationSectionProps = {
  links: NavigationLink[];
};

export function NavigationSection({ links }: NavigationSectionProps) {
  const sortedLinks = [...links].sort((a, b) => a.position - b.position);

  return (
    <div className="space-y-8">
      <AdminCard title="Tambah navigation link">
        <form action={createNavigationAction} className="space-y-4 text-sm">
          <InputField label="Label" name="label" required />
          <InputField label="URL" name="url" required />
          <InputField
            label="Posisi"
            name="position"
            type="number"
            min={0}
            defaultValue={sortedLinks.length}
          />
          <div className="flex flex-wrap gap-4">
            <div>
              <input type="hidden" name="isPrimary" value="false" />
              <CheckboxField name="isPrimary" value="true" label="Primary CTA" />
            </div>
            <div>
              <input type="hidden" name="isExternal" value="false" />
              <CheckboxField
                name="isExternal"
                value="true"
                label="Buka tab baru (external)"
              />
            </div>
          </div>
          <SaveButton label="Tambah link" />
        </form>
      </AdminCard>

      <div className="grid gap-6">
        {sortedLinks.length === 0 && (
          <p className="text-sm text-slate-400">
            Belum ada navigation link. Tambahkan melalui form di atas.
          </p>
        )}
        {sortedLinks.map((link) => (
          <AdminCard
            key={link.id}
            title={`${link.label} (posisi ${link.position})`}
          >
            <form
              action={updateNavigationAction.bind(null, link.id)}
              className="space-y-4 text-sm"
            >
              <InputField
                label="Label"
                name="label"
                defaultValue={link.label}
                required
              />
              <InputField
                label="URL"
                name="url"
                defaultValue={link.url}
                required
              />
              <InputField
                label="Posisi"
                name="position"
                type="number"
                min={0}
                defaultValue={link.position}
              />
              <div className="flex flex-wrap gap-4">
                <div>
                  <input type="hidden" name="isPrimary" value="false" />
                  <CheckboxField
                    name="isPrimary"
                    value="true"
                    label="Primary CTA"
                    defaultChecked={link.isPrimary}
                  />
                </div>
                <div>
                  <input type="hidden" name="isExternal" value="false" />
                  <CheckboxField
                    name="isExternal"
                    value="true"
                    label="Buka tab baru (external)"
                    defaultChecked={link.isExternal}
                  />
                </div>
              </div>
              <SaveButton label="Perbarui link" />
            </form>
            <form
              action={deleteNavigationAction.bind(null, link.id)}
              className="mt-4"
            >
              <button
                type="submit"
                className="w-full rounded-full border border-red-400/50 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
              >
                Hapus link
              </button>
            </form>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}

