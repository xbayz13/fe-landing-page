"use server";

import { authorizedFetch } from "./api-client";
import { revalidateAndRedirect } from "./utils";

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

  revalidateAndRedirect("hero");
}

