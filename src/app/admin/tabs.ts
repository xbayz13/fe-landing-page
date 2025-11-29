export type AdminTabId =
  | "brand"
  | "hero"
  | "navigation"
  | "features"
  | "testimonials"
  | "cta"
  | "footer"
  | "posts"
  | "authors"
  | "categories";

export const ADMIN_TABS: { id: AdminTabId; label: string }[] = [
  { id: "brand", label: "Brand" },
  { id: "hero", label: "Hero" },
  { id: "navigation", label: "Navigation" },
  { id: "features", label: "Features" },
  { id: "testimonials", label: "Testimonials" },
  { id: "cta", label: "CTA Blocks" },
  { id: "footer", label: "Footer Links" },
  { id: "posts", label: "Blog Posts" },
  { id: "authors", label: "Authors" },
  { id: "categories", label: "Categories" },
];

export function isBlogTab(tab: AdminTabId) {
  return tab === "posts" || tab === "authors" || tab === "categories";
}

