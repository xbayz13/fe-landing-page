## Landing Page Frontend (Next.js)

Next.js 16 (App Router) frontend untuk menampilkan marketing site dan halaman admin sederhana yang terhubung ke API NestJS CMS.

### Menjalankan secara lokal

```bash
cd nextjs
npm install
cp env.example .env.local  # sesuaikan API base URL
npm run dev                # jalankan di port default 3000
```

- `NEXT_PUBLIC_API_BASE_URL` default ke `http://localhost:3000/api` (URL NestJS).

### Struktur Halaman

- `/` – Landing page publik dengan hero, fitur, workflow, blog highlight, testimonials, CTA, dan contact section.
- `/admin` – Dashboard komplit untuk mengelola semua modul CMS (Brand, Hero, Navigation, Features, Testimonials, CTA, Footer links, serta Blog Posts/Authors/Categories).
- `/templates/stellar`, `/templates/pulse`, `/templates/serif` – tiga varian UI yang mengonsumsi data CMS yang sama (modern gradient, minimal white, serif editorial).

Landing page memanfaatkan ISR (`revalidate = 60`), sehingga update dari CMS akan muncul maksimal 1 menit kemudian. Saat API tidak tersedia, halaman akan fallback ke konten statis sehingga build tetap aman.

### Modul Admin (Server Actions + JWT)

- Login via `/admin/login` dengan kredensial superadmin (atau user lain yang Anda buat di backend).
- Server Actions menyimpan JWT dalam HttpOnly cookie (`admin_token`) dan menyertakan header `Authorization: Bearer <token>` ketika memanggil API NestJS.
- Setiap submit akan me-revalidate halaman terkait (landing page dan blog).

| Modul | Endpoint Backend |
|-------|------------------|
| Brand | `PUT /site-config/brand` |
| Hero | `PUT /site-config/hero` |
| Navigation | `POST/PUT/DELETE /site-config/navigation` |
| Features | `POST/PUT/DELETE /site-config/features` |
| Testimonials | `POST/PUT/DELETE /site-config/testimonials` |
| CTA Blocks | `POST/PUT/DELETE /site-config/cta-blocks` |
| Footer Links | `POST/PUT/DELETE /site-config/footer-links` |
| Blog Posts | `POST/PATCH/DELETE /blog/posts` |
| Blog Authors | `POST/PATCH/DELETE /blog/authors` |
| Blog Categories | `POST/PATCH/DELETE /blog/categories` |

Tidak ada JavaScript client-side tambahan sehingga token hanya tersimpan di cookie HttpOnly (tidak dapat diakses dari browser).

### Build & Deploy

```bash
npm run lint
npm run build
npm run start
```

Deploy ke platform pilihan (Vercel/Netlify/Render). Pastikan environment variable `NEXT_PUBLIC_API_BASE_URL` terset di server target.
