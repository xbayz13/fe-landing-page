import Link from "next/link";
import { Suspense } from "react";
import { AdminNav } from "./admin-nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-indigo-200">
                Admin Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-semibold">CMS Management</h1>
              <p className="mt-2 text-sm text-slate-300">
                Kelola semua konten landing page dan blog dari sini
              </p>
            </div>
            <Link
              href="/"
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
            >
              ← Kembali ke Landing Page
            </Link>
          </div>
        </header>
        <Suspense fallback={<div className="border-b border-white/10 pb-4" />}>
          <AdminNav />
        </Suspense>
        <main className="mt-6">{children}</main>
      </div>
    </div>
  );
}

