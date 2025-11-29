import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

export function AdminCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function InputField(
  props: InputHTMLAttributes<HTMLInputElement> & { label: string },
) {
  const { label, ...rest } = props;
  return (
    <label className="flex flex-col gap-2 text-slate-200">
      <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {label}
        {props.required && <span className="text-red-400"> *</span>}
      </span>
      <input
        {...rest}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-indigo-400 focus:bg-white/10"
      />
    </label>
  );
}

export function TextareaField(
  props: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string },
) {
  const { label, ...rest } = props;
  return (
    <label className="flex flex-col gap-2 text-slate-200">
      <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {label}
        {props.required && <span className="text-red-400"> *</span>}
      </span>
      <textarea
        {...rest}
        className="min-h-[100px] rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-indigo-400 focus:bg-white/10"
      />
    </label>
  );
}

export function SelectField(
  props: SelectHTMLAttributes<HTMLSelectElement> & { label: string },
) {
  const { label, children, ...rest } = props;
  return (
    <label className="flex flex-col gap-2 text-slate-200">
      <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {label}
        {props.required && <span className="text-red-400"> *</span>}
      </span>
      <select
        {...rest}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-indigo-400 focus:bg-white/10"
      >
        {children}
      </select>
    </label>
  );
}

export function CheckboxField(
  props: InputHTMLAttributes<HTMLInputElement> & { label: string },
) {
  const { label, ...rest } = props;
  return (
    <label className="flex items-center gap-3 text-slate-200">
      <input
        type="checkbox"
        {...rest}
        className="h-4 w-4 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-indigo-500"
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}

export function SaveButton({ label = "Simpan perubahan" }: { label?: string }) {
  return (
    <button
      type="submit"
      className="w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
    >
      {label}
    </button>
  );
}

export function DeleteButton({
  action,
  label = "Hapus",
}: {
  action: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={action}
      className="w-full rounded-full border border-red-400/50 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
    >
      {label}
    </button>
  );
}

