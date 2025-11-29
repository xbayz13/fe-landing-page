"use server";

import { authorizedFetch } from "./api-client";
import { revalidateAndRedirect } from "./utils";

export async function createTestimonialAction(formData: FormData) {
  const payload = {
    quote: formData.get("quote")?.toString() ?? "",
    authorName: formData.get("authorName")?.toString() ?? "",
    authorRole: formData.get("authorRole")?.toString() || undefined,
    company: formData.get("company")?.toString() || undefined,
    avatarUrl: formData.get("avatarUrl")?.toString() || undefined,
    featured: parseBoolean(formData.get("featured")),
  };

  await authorizedFetch("/site-config/testimonials", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  revalidateAndRedirect("testimonial");
}

export async function updateTestimonialAction(id: string, formData: FormData) {
  const payload = {
    quote: formData.get("quote")?.toString(),
    authorName: formData.get("authorName")?.toString(),
    authorRole: formData.get("authorRole")?.toString() || undefined,
    company: formData.get("company")?.toString() || undefined,
    avatarUrl: formData.get("avatarUrl")?.toString() || undefined,
    featured: parseBoolean(formData.get("featured")),
  };

  await authorizedFetch(`/site-config/testimonials/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  revalidateAndRedirect("testimonial");
}

export async function deleteTestimonialAction(id: string) {
  await authorizedFetch(`/site-config/testimonials/${id}`, {
    method: "DELETE",
  });

  revalidateAndRedirect("testimonial-deleted");
}

function parseBoolean(value: FormDataEntryValue | null) {
  if (value === null) {
    return undefined;
  }
  return value === "true" || value === "on";
}

