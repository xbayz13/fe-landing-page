"use client";

import { useFormState } from "react-dom";
import { loginAction, type LoginState } from "@/lib/auth/actions";

const initialState: LoginState = {
  error: undefined,
};

export function LoginForm() {
  const [state, formAction] = useFormState<LoginState, FormData>(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4 text-sm text-slate-900">
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-slate-300">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/80 px-4 py-2 text-slate-900 outline-none focus:border-indigo-300"
        />
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-slate-300">
          Password
        </label>
        <input
          type="password"
          name="password"
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/80 px-4 py-2 text-slate-900 outline-none focus:border-indigo-300"
        />
      </div>
      {state?.error && (
        <p className="text-sm text-red-300" role="alert">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        className="w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5"
      >
        Masuk
      </button>
    </form>
  );
}

