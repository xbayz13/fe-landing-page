"use server";

import { authorizedFetch } from "./api-client";
import { revalidateAndRedirect } from "./utils";

export async function createNavigationAction(formData: FormData) {
  const payload = {
    label: formData.get("label")?.toString() ?? "",
    url: formData.get("url")?.toString() ?? "",
    position: formData.get("position")
      ? Number(formData.get("position"))
      : 0,
    isPrimary: formData.get("isPrimary") === "true",
    isExternal: formData.get("isExternal") === "true",
  };

  await authorizedFetch("/site-config/navigation", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  revalidateAndRedirect("navigation");
}

export async function updateNavigationAction(
  id: string,
  formData: FormData,
) {
  const payload = {
    label: formData.get("label")?.toString(),
    url: formData.get("url")?.toString(),
    position: formData.get("position")
      ? Number(formData.get("position"))
      : undefined,
    isPrimary:
      formData.get("isPrimary") !== null
        ? formData.get("isPrimary") === "true"
        : undefined,
    isExternal:
      formData.get("isExternal") !== null
        ? formData.get("isExternal") === "true"
        : undefined,
  };

  await authorizedFetch(`/site-config/navigation/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  revalidateAndRedirect("navigation");
}

export async function deleteNavigationAction(id: string) {
  await authorizedFetch(`/site-config/navigation/${id}`, {
    method: "DELETE",
  });

  revalidateAndRedirect("navigation-deleted");
}

