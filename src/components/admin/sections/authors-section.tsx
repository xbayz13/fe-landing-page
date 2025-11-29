import {
  createAuthorAction,
  deleteAuthorAction,
  updateAuthorAction,
} from "@/lib/admin";
import type { BlogAuthor } from "@/lib/types";
import {
  AdminCard,
  InputField,
  TextareaField,
  SaveButton,
} from "../admin-form-fields";

type AuthorsSectionProps = {
  authors: BlogAuthor[];
};

export function AuthorsSection({ authors }: AuthorsSectionProps) {
  const sorted = [...authors].sort((a, b) =>
    a.name.localeCompare(b.name, "id"),
  );

  return (
    <div className="space-y-8">
      <AdminCard title="Tambah author">
        <AuthorForm action={createAuthorAction} />
      </AdminCard>

      <div className="grid gap-6">
        {sorted.length === 0 && (
          <p className="text-sm text-slate-400">
            Tambahkan author agar penulis bisa ditampilkan pada blog post.
          </p>
        )}
        {sorted.map((author) => (
          <AdminCard key={author.id} title={author.name}>
            <AuthorForm
              action={updateAuthorAction.bind(null, author.id)}
              defaultValue={author}
            />
            <form
              action={deleteAuthorAction.bind(null, author.id)}
              className="mt-4"
            >
              <button
                type="submit"
                className="w-full rounded-full border border-red-400/50 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
              >
                Hapus author
              </button>
            </form>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}

type AuthorFormProps = {
  action: (formData: FormData) => Promise<void>;
  defaultValue?: BlogAuthor;
};

function AuthorForm({ action, defaultValue }: AuthorFormProps) {
  return (
    <form action={action} className="space-y-4 text-sm">
      <InputField
        label="Nama"
        name="name"
        defaultValue={defaultValue?.name ?? ""}
        required
      />
      <InputField
        label="Peran"
        name="title"
        defaultValue={defaultValue?.title ?? ""}
      />
      <InputField
        label="Avatar URL"
        name="avatarUrl"
        defaultValue={defaultValue?.avatarUrl ?? ""}
      />
      <TextareaField
        label="Bio"
        name="bio"
        defaultValue={defaultValue?.bio ?? ""}
      />
      <InputField
        label="Website"
        name="websiteUrl"
        defaultValue={defaultValue?.websiteUrl ?? ""}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <InputField
          label="LinkedIn"
          name="linkedinUrl"
          defaultValue={defaultValue?.linkedinUrl ?? ""}
        />
        <InputField
          label="Twitter / X"
          name="twitterUrl"
          defaultValue={defaultValue?.twitterUrl ?? ""}
        />
      </div>
      <SaveButton label={defaultValue ? "Perbarui author" : "Tambah author"} />
    </form>
  );
}

