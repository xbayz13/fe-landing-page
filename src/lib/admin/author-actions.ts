"use server";

import { authorizedFetch } from "./api-client";
import { revalidateBlogAndRedirect } from "./utils";

export async function createAuthorAction(formData: FormData) {
  const payload = {
    name: formData.get("name")?.toString() ?? "",
    title: formData.get("title")?.toString() || undefined,
    avatarUrl: formData.get("avatarUrl")?.toString() || undefined,
    bio: formData.get("bio")?.toString() || undefined,
    websiteUrl: formData.get("websiteUrl")?.toString() || undefined,
    linkedinUrl: formData.get("linkedinUrl")?.toString() || undefined,
    twitterUrl: formData.get("twitterUrl")?.toString() || undefined,
  };

  await authorizedFetch("/blog/authors", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  revalidateBlogAndRedirect("author");
}

export async function updateAuthorAction(id: string, formData: FormData) {
  const payload = {
    name: formData.get("name")?.toString(),
    title: formData.get("title")?.toString() || undefined,
    avatarUrl: formData.get("avatarUrl")?.toString() || undefined,
    bio: formData.get("bio")?.toString() || undefined,
    websiteUrl: formData.get("websiteUrl")?.toString() || undefined,
    linkedinUrl: formData.get("linkedinUrl")?.toString() || undefined,
    twitterUrl: formData.get("twitterUrl")?.toString() || undefined,
  };

  await authorizedFetch(`/blog/authors/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  revalidateBlogAndRedirect("author");
}

export async function deleteAuthorAction(id: string) {
  await authorizedFetch(`/blog/authors/${id}`, {
    method: "DELETE",
  });

  revalidateBlogAndRedirect("author-deleted");
}

