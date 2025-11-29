"use server";

import { authorizedFetch } from "./api-client";
import { revalidateBlogAndRedirect } from "./utils";

export async function createCategoryAction(formData: FormData) {
  const payload = {
    name: formData.get("name")?.toString() ?? "",
    slug: formData.get("slug")?.toString() ?? "",
    description: formData.get("description")?.toString() || undefined,
  };

  await authorizedFetch("/blog/categories", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  revalidateBlogAndRedirect("category");
}

export async function updateCategoryAction(id: string, formData: FormData) {
  const payload = {
    name: formData.get("name")?.toString(),
    slug: formData.get("slug")?.toString(),
    description: formData.get("description")?.toString() || undefined,
  };

  await authorizedFetch(`/blog/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  revalidateBlogAndRedirect("category");
}

export async function deleteCategoryAction(id: string) {
  await authorizedFetch(`/blog/categories/${id}`, {
    method: "DELETE",
  });

  revalidateBlogAndRedirect("category-deleted");
}

