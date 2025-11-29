import {
  createPostAction,
  deletePostAction,
  updatePostAction,
} from "@/lib/admin";
import type { BlogAuthor, BlogCategory, BlogPost } from "@/lib/types";
import {
  AdminCard,
  InputField,
  SelectField,
  TextareaField,
  SaveButton,
} from "../admin-form-fields";

type PostsSectionProps = {
  posts: BlogPost[];
  authors: BlogAuthor[];
  categories: BlogCategory[];
};

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

export function PostsSection({
  posts,
  authors,
  categories,
}: PostsSectionProps) {
  const sorted = [...posts].sort((a, b) =>
    (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""),
  );

  return (
    <div className="space-y-10">
      <AdminCard title="Tulis artikel baru">
        <PostForm
          action={createPostAction}
          authors={authors}
          categories={categories}
        />
      </AdminCard>

      <div className="grid gap-6">
        {sorted.length === 0 && (
          <p className="text-sm text-slate-400">
            Belum ada artikel. Tulis artikel pertama agar blog Anda aktif.
          </p>
        )}
        {sorted.map((post) => (
          <AdminCard
            key={post.id}
            title={`${post.title} • ${post.status.toUpperCase()}`}
          >
            <PostForm
              action={updatePostAction.bind(null, post.id)}
              authors={authors}
              categories={categories}
              defaultValue={post}
            />
            <form
              action={deletePostAction.bind(null, post.id)}
              className="mt-4"
            >
              <button
                type="submit"
                className="w-full rounded-full border border-red-400/50 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
              >
                Hapus artikel
              </button>
            </form>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}

type PostFormProps = {
  action: (formData: FormData) => Promise<void>;
  authors: BlogAuthor[];
  categories: BlogCategory[];
  defaultValue?: BlogPost;
};

function PostForm({ action, authors, categories, defaultValue }: PostFormProps) {
  return (
    <form action={action} className="space-y-4 text-sm">
      <InputField
        label="Judul"
        name="title"
        defaultValue={defaultValue?.title ?? ""}
        required
      />
      <InputField
        label="Slug"
        name="slug"
        defaultValue={defaultValue?.slug ?? ""}
        required
      />
      <TextareaField
        label="Excerpt"
        name="excerpt"
        defaultValue={defaultValue?.excerpt ?? ""}
      />
      <TextareaField
        label="Konten"
        name="content"
        defaultValue={defaultValue?.content ?? ""}
        required
      />
      <div className="grid gap-4 md:grid-cols-2">
        <InputField
          label="Cover image URL"
          name="coverImageUrl"
          defaultValue={defaultValue?.coverImageUrl ?? ""}
        />
        <SelectField
          label="Status"
          name="status"
          defaultValue={defaultValue?.status ?? "draft"}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <InputField
          label="Published at"
          name="publishedAt"
          type="datetime-local"
          defaultValue={formatDateTimeLocal(defaultValue?.publishedAt)}
        />
        <InputField
          label="Reading time (minutes)"
          name="readingTimeMinutes"
          type="number"
          min={1}
          defaultValue={
            defaultValue?.readingTimeMinutes
              ? String(defaultValue.readingTimeMinutes)
              : ""
          }
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <SelectField
          label="Author"
          name="authorId"
          defaultValue={defaultValue?.author?.id ?? ""}
        >
          <option value="">Tanpa author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </SelectField>
        <SelectField
          label="Category"
          name="categoryId"
          defaultValue={defaultValue?.category?.id ?? ""}
        >
          <option value="">Tanpa kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </SelectField>
      </div>
      <InputField
        label="SEO title"
        name="seoTitle"
        defaultValue={defaultValue?.seoTitle ?? ""}
      />
      <TextareaField
        label="SEO description"
        name="seoDescription"
        defaultValue={defaultValue?.seoDescription ?? ""}
      />
      <SaveButton label={defaultValue ? "Perbarui artikel" : "Publikasikan"} />
    </form>
  );
}

function formatDateTimeLocal(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
}

