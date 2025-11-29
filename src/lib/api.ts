import type {
  BlogPost,
  BlogAuthor,
  BlogCategory,
  LandingConfig,
  SeoMetadata,
} from "./types";
import { apiClient } from "./api-client";

// Backward compatibility: Re-export using new API client abstraction
export async function fetchLandingConfig() {
  return apiClient.get<LandingConfig>("/site-config", {
    revalidateSeconds: 120,
  });
}

export async function fetchBlogPosts(limit = 3) {
  const search = new URLSearchParams({
    status: "published",
    page: "1",
    limit: String(limit),
  });
  const { data } = await apiClient.get<{ data: BlogPost[] }>(
    `/blog/posts?${search.toString()}`,
    { revalidateSeconds: 60 },
  );
  return data;
}

export async function fetchSeoMetadata(postSlug?: string) {
  const query = postSlug ? `?postSlug=${postSlug}` : "";
  return apiClient.get<SeoMetadata>(`/seo/metadata${query}`, {
    revalidateSeconds: 60,
  });
}

// Blog data for admin
export async function fetchAllBlogPosts(params?: {
  status?: string;
  page?: number;
  limit?: number;
}) {
  const search = new URLSearchParams();
  if (params?.status) search.set("status", params.status);
  if (params?.page) search.set("page", String(params.page));
  if (params?.limit) search.set("limit", String(params.limit));
  const query = search.toString();
  return apiClient.get<{
    data: BlogPost[];
    meta: { page: number; limit: number; total: number; totalPages: number };
  }>(`/blog/posts${query ? `?${query}` : ""}`, { revalidateSeconds: 30 });
}

export async function fetchBlogPost(idOrSlug: string) {
  return apiClient.get<BlogPost>(`/blog/posts/${idOrSlug}`, {
    revalidateSeconds: 60,
  });
}

export async function fetchAllAuthors() {
  return apiClient.get<BlogAuthor[]>("/blog/authors", {
    revalidateSeconds: 120,
  });
}

export async function fetchAllCategories() {
  return apiClient.get<BlogCategory[]>("/blog/categories", {
    revalidateSeconds: 120,
  });
}
