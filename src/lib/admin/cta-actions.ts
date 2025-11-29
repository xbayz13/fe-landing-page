"use server";

import { authorizedFetch } from "./api-client";
import { revalidateAndRedirect } from "./utils";

export async function createCtaAction(formData: FormData) {
  const payload = {
    heading: formData.get("heading")?.toString() ?? "",
    body: formData.get("body")?.toString() ?? "",
    buttonLabel: formData.get("buttonLabel")?.toString() || undefined,
    buttonUrl: formData.get("buttonUrl")?.toString() || undefined,
    eyebrow: formData.get("eyebrow")?.toString() || undefined,
    variant: formData.get("variant")?.toString() || undefined,
  };

  await authorizedFetch("/site-config/cta-blocks", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  revalidateAndRedirect("cta");
}

export async function updateCtaAction(id: string, formData: FormData) {
  const payload = {
    heading: formData.get("heading")?.toString(),
    body: formData.get("body")?.toString(),
    buttonLabel: formData.get("buttonLabel")?.toString() || undefined,
    buttonUrl: formData.get("buttonUrl")?.toString() || undefined,
    eyebrow: formData.get("eyebrow")?.toString() || undefined,
    variant: formData.get("variant")?.toString() || undefined,
  };

  await authorizedFetch(`/site-config/cta-blocks/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  revalidateAndRedirect("cta");
}

export async function deleteCtaAction(id: string) {
  await authorizedFetch(`/site-config/cta-blocks/${id}`, {
    method: "DELETE",
  });

  revalidateAndRedirect("cta-deleted");
}

