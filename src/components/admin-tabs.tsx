"use client";

import { useState } from "react";

type Tab = {
  id: string;
  label: string;
};

const tabs: Tab[] = [
  { id: "brand", label: "Brand" },
  { id: "hero", label: "Hero" },
  { id: "navigation", label: "Navigation" },
  { id: "features", label: "Features" },
  { id: "testimonials", label: "Testimonials" },
  { id: "cta", label: "CTA Blocks" },
  { id: "footer", label: "Footer" },
  { id: "posts", label: "Blog Posts" },
  { id: "authors", label: "Authors" },
  { id: "categories", label: "Categories" },
];

export function AdminTabs({
  children,
  defaultTab = "brand",
}: {
  children: React.ReactNode;
  defaultTab?: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.id
                ? "bg-white text-slate-900"
                : "text-slate-300 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={activeTab === tab.id ? "block" : "hidden"}
          >
            {activeTab === tab.id && children}
          </div>
        ))}
      </div>
    </div>
  );
}

