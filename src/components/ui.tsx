import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { Priority, Status } from "@/lib/types";

export function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }) {
  const styles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    ghost: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100",
    danger: "border border-red-300 bg-white text-red-600 hover:bg-red-50",
  }[variant];
  return (
    <button
      {...props}
      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition disabled:opacity-50 ${styles} ${className}`}
    />
  );
}

export const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200";

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

const STATUS_COLORS: Record<Status, string> = {
  Idea: "bg-slate-100 text-slate-700",
  Scripting: "bg-blue-100 text-blue-700",
  Voiceover: "bg-violet-100 text-violet-700",
  Animation: "bg-pink-100 text-pink-700",
  Editing: "bg-amber-100 text-amber-800",
  Scheduled: "bg-cyan-100 text-cyan-800",
  Published: "bg-emerald-100 text-emerald-800",
};
export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[status]}`}>
      {status}
    </span>
  );
}

const PRIORITY_COLORS: Record<Priority, string> = {
  Low: "text-slate-500",
  Medium: "text-amber-600",
  High: "text-red-600",
};
export function PriorityLabel({ priority }: { priority: Priority }) {
  return <span className={`text-xs font-semibold ${PRIORITY_COLORS[priority]}`}>● {priority}</span>;
}

export function Loading() {
  return <p className="text-sm text-slate-500">Loading…</p>;
}
