"use server";

import { authorizedFetch } from "./api-client";
import { revalidateAndRedirect } from "./utils";

export async function createFooterLinkAction(formData: FormData) {
  const payload = {
    label: formData.get("label")?.toString() ?? "",
    url: formData.get("url")?.toString() ?? "",
    groupName: formData.get("groupName")?.toString() || undefined,
    position: parseNumber(formData.get("position")),
  };

  await authorizedFetch("/site-config/footer-links", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  revalidateAndRedirect("footer");
}

export async function updateFooterLinkAction(id: string, formData: FormData) {
  const payload = {
    label: formData.get("label")?.toString(),
    url: formData.get("url")?.toString(),
    groupName: formData.get("groupName")?.toString() || undefined,
    position: parseNumber(formData.get("position")),
  };

  await authorizedFetch(`/site-config/footer-links/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  revalidateAndRedirect("footer");
}

export async function deleteFooterLinkAction(id: string) {
  await authorizedFetch(`/site-config/footer-links/${id}`, {
    method: "DELETE",
  });

  revalidateAndRedirect("footer-deleted");
}

function parseNumber(value: FormDataEntryValue | null) {
  if (value === null || value === "") {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

