# Panduan Ekstensi Admin Dashboard

Dashboard `/admin` kini sudah mencakup semua modul utama (brand, hero, navigation, features, testimonials, CTA, footer, blog posts/authors/categories). Dokumen ini tetap dipertahankan sebagai panduan apabila Anda ingin menambah modul baru atau memodifikasi pola yang ada.

## Struktur Admin Actions yang Tersedia

### Site Configuration
- `updateBrandAction` ✅ (sudah ada di UI)
- `updateHeroAction` ✅ (sudah ada di UI)
- `createNavigationAction`, `updateNavigationAction`, `deleteNavigationAction`
- `createFeatureAction`, `updateFeatureAction`, `deleteFeatureAction`
- `createTestimonialAction`, `updateTestimonialAction`, `deleteTestimonialAction`
- `createCtaAction`, `updateCtaAction`, `deleteCtaAction`
- `createFooterLinkAction`, `updateFooterLinkAction`, `deleteFooterLinkAction`

### Blog Management
- `createPostAction`, `updatePostAction`, `deletePostAction`
- `createAuthorAction`, `updateAuthorAction`, `deleteAuthorAction`
- `createCategoryAction`, `updateCategoryAction`, `deleteCategoryAction`

## Pola Implementasi

Gunakan komponen dari `src/components/admin/admin-form-fields.tsx`:
- `AdminCard` - Container untuk form
- `InputField`, `TextareaField`, `SelectField` - Form inputs
- `SaveButton`, `DeleteButton` - Action buttons

## Contoh: Menambahkan Navigation Section

```tsx
// Di src/app/admin/page.tsx

import { createNavigationAction, updateNavigationAction, deleteNavigationAction } from "@/lib/admin-actions";

function NavigationSection({ config }: { config: LandingConfig }) {
  return (
    <div className="space-y-6">
      <AdminCard title="Add Navigation Link">
        <form action={createNavigationAction} className="space-y-4">
          <InputField label="Label" name="label" required />
          <InputField label="URL" name="url" required />
          <InputField label="Position" name="position" type="number" defaultValue="0" />
          <CheckboxField label="Primary CTA" name="isPrimary" value="true" />
          <CheckboxField label="External Link" name="isExternal" value="true" />
          <SaveButton label="Add Navigation Link" />
        </form>
      </AdminCard>
      
      {config.navigation.map((link) => (
        <AdminCard key={link.id} title={`Edit: ${link.label}`}>
          <form action={updateNavigationAction.bind(null, link.id)}>
            {/* form fields */}
            <SaveButton label="Update" />
          </form>
          <form action={deleteNavigationAction.bind(null, link.id)}>
            <DeleteButton action={() => {}} />
          </form>
        </AdminCard>
      ))}
    </div>
  );
}
```

## Menggunakan Tab Navigation

Layout admin sudah menggunakan `AdminNav` component yang menggunakan query params `?tab=...`. 
Anda bisa menambahkan section yang ditampilkan berdasarkan query param:

```tsx
// Di src/app/admin/page.tsx
export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const tab = params.tab || "brand";
  
  // Render section berdasarkan tab
  if (tab === "navigation") {
    return <NavigationSection config={config} />;
  }
  // ... sections lainnya
}
```

## Fetch Data Tambahan

Untuk Blog sections, fetch data tambahan:

```tsx
import { fetchAllBlogPosts, fetchAllAuthors, fetchAllCategories } from "@/lib/api";

const [postsData, authors, categories] = await Promise.all([
  fetchAllBlogPosts({ limit: 100 }),
  fetchAllAuthors(),
  fetchAllCategories(),
]);
```

## Catatan

- Semua actions sudah redirect dengan `?success=...` query param
- Actions akan revalidate path yang relevan secara otomatis
- Gunakan `bind(null, id)` untuk pass ID ke action yang membutuhkan parameter

