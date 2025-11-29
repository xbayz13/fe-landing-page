"use server";

import { authorizedFetch } from "./api-client";
import { revalidateBlogAndRedirect } from "./utils";

export async function createPostAction(formData: FormData) {
  const payload = {
    title: formData.get("title")?.toString() ?? "",
    slug: formData.get("slug")?.toString() ?? "",
    excerpt: formData.get("excerpt")?.toString() || undefined,
    content: formData.get("content")?.toString() ?? "",
    status: formData.get("status")?.toString() || "draft",
    publishedAt: formData.get("publishedAt")?.toString() || undefined,
    coverImageUrl: formData.get("coverImageUrl")?.toString() || undefined,
    readingTimeMinutes: parseNumber(formData.get("readingTimeMinutes")),
    seoTitle: formData.get("seoTitle")?.toString() || undefined,
    seoDescription: formData.get("seoDescription")?.toString() || undefined,
    authorId: formData.get("authorId")?.toString() || undefined,
    categoryId: formData.get("categoryId")?.toString() || undefined,
  };

  await authorizedFetch("/blog/posts", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  revalidateBlogAndRedirect("post");
}

export async function updatePostAction(id: string, formData: FormData) {
  const payload = {
    title: formData.get("title")?.toString(),
    slug: formData.get("slug")?.toString(),
    excerpt: formData.get("excerpt")?.toString() || undefined,
    content: formData.get("content")?.toString(),
    status: formData.get("status")?.toString() || undefined,
    publishedAt: formData.get("publishedAt")?.toString() || undefined,
    coverImageUrl: formData.get("coverImageUrl")?.toString() || undefined,
    readingTimeMinutes: parseNumber(formData.get("readingTimeMinutes")),
    seoTitle: formData.get("seoTitle")?.toString() || undefined,
    seoDescription: formData.get("seoDescription")?.toString() || undefined,
    authorId: formData.get("authorId")?.toString() || undefined,
    categoryId: formData.get("categoryId")?.toString() || undefined,
  };

  await authorizedFetch(`/blog/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  revalidateBlogAndRedirect("post");
}

export async function deletePostAction(id: string) {
  await authorizedFetch(`/blog/posts/${id}`, {
    method: "DELETE",
  });

  revalidateBlogAndRedirect("post-deleted");
}

function parseNumber(value: FormDataEntryValue | null) {
  if (!value) {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

