## Landing Page Frontend (Next.js)

Next.js 16 (App Router) frontend untuk menampilkan marketing site dan halaman admin sederhana yang terhubung ke API NestJS CMS.

### Menjalankan secara lokal

```bash
cd nextjs
npm install
cp env.example .env.local  # sesuaikan API base URL & ADMIN_API_KEY
npm run dev                # jalankan di port default 3000
```

- `NEXT_PUBLIC_API_BASE_URL` default ke `http://localhost:3000/api` (URL NestJS).
- `ADMIN_API_KEY` harus sama dengan nilai di backend agar aksi admin bisa dieksekusi.

### Struktur Halaman

- `/` – Landing page publik dengan hero, fitur, workflow, blog highlight, testimonials, CTA, dan contact section.
- `/admin` – Dashboard sederhana untuk mengedit Brand dan Hero menggunakan Next.js Server Actions.
- `/templates/stellar`, `/templates/pulse`, `/templates/serif` – tiga varian UI yang mengonsumsi data CMS yang sama (modern gradient, minimal white, serif editorial).

Landing page memanfaatkan ISR (`revalidate = 60`), sehingga update dari CMS akan muncul maksimal 1 menit kemudian. Saat API tidak tersedia, halaman akan fallback ke konten statis sehingga build tetap aman.

### Admin Actions

Form pada `/admin` menembak endpoint NestJS:

- `PUT /site-config/brand`
- `PUT /site-config/hero`

Setiap aksi akan me-revalidate halaman `/` dan `/admin`. Tidak ada JavaScript client-side tambahan, sehingga nilai `ADMIN_API_KEY` tidak pernah bocor ke browser.

### Build & Deploy

```bash
npm run lint
npm run build
npm run start
```

Deploy ke platform pilihan (Vercel/Netlify/Render). Pastikan environment variable (`NEXT_PUBLIC_API_BASE_URL`, `ADMIN_API_KEY`) terset di server target.
