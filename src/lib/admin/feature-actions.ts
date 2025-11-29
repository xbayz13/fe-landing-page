"use server";

import { authorizedFetch } from "./api-client";
import { revalidateAndRedirect } from "./utils";

export async function createFeatureAction(formData: FormData) {
  const payload = {
    title: formData.get("title")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    icon: formData.get("icon")?.toString() || undefined,
    highlightOrder: formData.get("highlightOrder")
      ? Number(formData.get("highlightOrder"))
      : undefined,
  };

  await authorizedFetch("/site-config/features", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  revalidateAndRedirect("feature");
}

export async function updateFeatureAction(id: string, formData: FormData) {
  const payload = {
    title: formData.get("title")?.toString(),
    description: formData.get("description")?.toString(),
    icon: formData.get("icon")?.toString() || undefined,
    highlightOrder: formData.get("highlightOrder")
      ? Number(formData.get("highlightOrder"))
      : undefined,
  };

  await authorizedFetch(`/site-config/features/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  revalidateAndRedirect("feature");
}

export async function deleteFeatureAction(id: string) {
  await authorizedFetch(`/site-config/features/${id}`, {
    method: "DELETE",
  });

  revalidateAndRedirect("feature-deleted");
}

