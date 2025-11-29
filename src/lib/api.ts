import { BlogPost, LandingConfig, SeoMetadata } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";

async function fetcher<T>(
  path: string,
  init?: RequestInit & { revalidateSeconds?: number },
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const { revalidateSeconds = 60, ...rest } = init ?? {};

  const response = await fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(rest?.headers ?? {}),
    },
    next: {
      revalidate: revalidateSeconds,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }

  return (await response.json()) as T;
}

export async function fetchLandingConfig() {
  return fetcher<LandingConfig>("/site-config", { revalidateSeconds: 120 });
}

export async function fetchBlogPosts(limit = 3) {
  const search = new URLSearchParams({
    status: "published",
    page: "1",
    limit: String(limit),
  });
  const { data } = await fetcher<{ data: BlogPost[] }>(
    `/blog/posts?${search.toString()}`,
    { revalidateSeconds: 60 },
  );
  return data;
}

export async function fetchSeoMetadata(postSlug?: string) {
  const query = postSlug ? `?postSlug=${postSlug}` : "";
  return fetcher<SeoMetadata>(`/seo/metadata${query}`, {
    revalidateSeconds: 60,
  });
}

