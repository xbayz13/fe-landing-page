"use server";

import { revalidatePath } from "next/cache";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

async function authorizedFetch(path: string, init: RequestInit) {
  if (!ADMIN_API_KEY) {
    throw new Error(
      "ADMIN_API_KEY belum diset di environment Next.js (server only)",
    );
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ADMIN_API_KEY,
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      `Gagal memanggil ${path}: ${response.status} ${response.statusText} - ${message}`,
    );
  }
}

export async function updateBrandAction(formData: FormData) {
  const payload = {
    companyName: formData.get("companyName")?.toString() ?? "",
    tagline: formData.get("tagline")?.toString() || undefined,
    logoUrl: formData.get("logoUrl")?.toString() || undefined,
    primaryColor: formData.get("primaryColor")?.toString() || undefined,
    secondaryColor: formData.get("secondaryColor")?.toString() || undefined,
  };

  await authorizedFetch("/site-config/brand", {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateHeroAction(formData: FormData) {
  const payload = {
    eyebrow: formData.get("eyebrow")?.toString() || undefined,
    heading: formData.get("heading")?.toString() ?? "",
    subheading: formData.get("subheading")?.toString() || undefined,
    primaryCtaLabel: formData.get("primaryCtaLabel")?.toString() || undefined,
    primaryCtaUrl: formData.get("primaryCtaUrl")?.toString() || undefined,
    secondaryCtaLabel:
      formData.get("secondaryCtaLabel")?.toString() || undefined,
    secondaryCtaUrl:
      formData.get("secondaryCtaUrl")?.toString() || undefined,
    mediaUrl: formData.get("mediaUrl")?.toString() || undefined,
  };

  await authorizedFetch("/site-config/hero", {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

