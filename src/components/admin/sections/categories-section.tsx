import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from "@/lib/admin";
import type { BlogCategory } from "@/lib/types";
import {
  AdminCard,
  InputField,
  TextareaField,
  SaveButton,
} from "../admin-form-fields";

type CategoriesSectionProps = {
  categories: BlogCategory[];
};

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  const sorted = [...categories].sort((a, b) =>
    a.name.localeCompare(b.name, "id"),
  );

  return (
    <div className="space-y-8">
      <AdminCard title="Tambah kategori">
        <CategoryForm action={createCategoryAction} />
      </AdminCard>

      <div className="grid gap-6">
        {sorted.length === 0 && (
          <p className="text-sm text-slate-400">
            Belum ada kategori. Tambahkan kategori agar konten blog lebih
            terstruktur.
          </p>
        )}
        {sorted.map((category) => (
          <AdminCard key={category.id} title={category.name}>
            <CategoryForm
              action={updateCategoryAction.bind(null, category.id)}
              defaultValue={category}
            />
            <form
              action={deleteCategoryAction.bind(null, category.id)}
              className="mt-4"
            >
              <button
                type="submit"
                className="w-full rounded-full border border-red-400/50 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
              >
                Hapus kategori
              </button>
            </form>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}

type CategoryFormProps = {
  action: (formData: FormData) => Promise<void>;
  defaultValue?: BlogCategory;
};

function CategoryForm({ action, defaultValue }: CategoryFormProps) {
  return (
    <form action={action} className="space-y-4 text-sm">
      <InputField
        label="Nama"
        name="name"
        defaultValue={defaultValue?.name ?? ""}
        required
      />
      <InputField
        label="Slug"
        name="slug"
        defaultValue={defaultValue?.slug ?? ""}
        required
      />
      <TextareaField
        label="Deskripsi"
        name="description"
        defaultValue={defaultValue?.description ?? ""}
      />
      <SaveButton
        label={defaultValue ? "Perbarui kategori" : "Tambah kategori"}
      />
    </form>
  );
}

