import {
  createFooterLinkAction,
  deleteFooterLinkAction,
  updateFooterLinkAction,
} from "@/lib/admin";
import type { FooterLink } from "@/lib/types";
import { AdminCard, InputField, SaveButton } from "../admin-form-fields";

type FooterSectionProps = {
  links: FooterLink[];
};

export function FooterSection({ links }: FooterSectionProps) {
  const sorted = [...links].sort((a, b) => {
    if (a.groupName === b.groupName) {
      return (a.position ?? 0) - (b.position ?? 0);
    }
    return a.groupName.localeCompare(b.groupName);
  });

  return (
    <div className="space-y-8">
      <AdminCard title="Tambah footer link">
        <form action={createFooterLinkAction} className="space-y-4 text-sm">
          <InputField label="Label" name="label" required />
          <InputField label="URL" name="url" required />
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField label="Group" name="groupName" required />
            <InputField
              label="Posisi"
              name="position"
              type="number"
              min={0}
              defaultValue={sorted.length}
            />
          </div>
          <SaveButton label="Tambah link" />
        </form>
      </AdminCard>

      <div className="grid gap-6">
        {sorted.length === 0 && (
          <p className="text-sm text-slate-400">
            Tambahkan link penting seperti kebijakan privasi, RSS, atau kontak.
          </p>
        )}
        {sorted.map((link) => (
          <AdminCard
            key={link.id}
            title={`${link.groupName} • ${link.label}`}
          >
            <form
              action={updateFooterLinkAction.bind(null, link.id)}
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
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Group"
                  name="groupName"
                  defaultValue={link.groupName}
                  required
                />
                <InputField
                  label="Posisi"
                  name="position"
                  type="number"
                  defaultValue={link.position ?? 0}
                />
              </div>
              <SaveButton label="Perbarui link" />
            </form>
            <form
              action={deleteFooterLinkAction.bind(null, link.id)}
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

