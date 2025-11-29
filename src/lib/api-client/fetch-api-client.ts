import type { ApiClient, RequestOptions } from "./interface";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";

/**
 * Fetch-based implementation of ApiClient
 * Uses Next.js fetch with ISR support
 */
export class FetchApiClient implements ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("GET", path, undefined, options);
  }

  async post<T>(
    path: string,
    data: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>("POST", path, data, options);
  }

  async put<T>(
    path: string,
    data: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>("PUT", path, data, options);
  }

  async patch<T>(
    path: string,
    data: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>("PATCH", path, data, options);
  }

  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("DELETE", path, undefined, options);
  }

  private async request<T>(
    method: string,
    path: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    const url = `${this.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
    const { revalidateSeconds = 60, headers = {} } = options ?? {};

    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      next: {
        revalidate: revalidateSeconds,
      },
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(
        `API request failed: ${method} ${url} - ${response.status} ${response.statusText}`,
      );
    }

    return (await response.json()) as T;
  }
}

