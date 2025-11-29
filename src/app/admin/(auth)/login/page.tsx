import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_AUTH_COOKIE } from "@/lib/auth/cookies";
import { LoginForm } from "./login-form";

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_AUTH_COOKIE);
  if (token) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-slate-50">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-indigo-200">
            Admin Login
          </p>
          <h1 className="text-2xl font-semibold">Masuk ke Dashboard</h1>
          <p className="text-sm text-slate-300">
            Gunakan kredensial superadmin atau user lain yang memiliki akses
            mutasi data.
          </p>
        </div>
        <LoginForm />
        <div className="text-center text-xs text-slate-400">
          <p>
            Lupa password? Hubungi tim backend untuk reset manual (password
            disimpan dalam bentuk hash).
          </p>
          <Link href="/" className="text-indigo-200 underline">
            ← Kembali ke landing page
          </Link>
        </div>
      </div>
    </div>
  );
}

