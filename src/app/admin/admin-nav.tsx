"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ADMIN_TABS } from "./tabs";

export function AdminNav() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "brand";

  return (
    <nav className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
      {ADMIN_TABS.map((item) => (
        <Link
          key={item.id}
          href={`/admin?tab=${item.id}`}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            activeTab === item.id
              ? "bg-white text-slate-900"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

