/**
 * API Client Interface
 * Abstraction for data fetching to enable better testability and flexibility
 */
export interface ApiClient {
  get<T>(path: string, options?: RequestOptions): Promise<T>;
  post<T>(path: string, data: unknown, options?: RequestOptions): Promise<T>;
  put<T>(path: string, data: unknown, options?: RequestOptions): Promise<T>;
  patch<T>(path: string, data: unknown, options?: RequestOptions): Promise<T>;
  delete<T>(path: string, options?: RequestOptions): Promise<T>;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  revalidateSeconds?: number;
}

