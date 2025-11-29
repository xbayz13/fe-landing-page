import { FetchApiClient } from "./fetch-api-client";
import type { ApiClient } from "./interface";

/**
 * Factory function to create ApiClient instance
 * Can be extended to support different implementations (mock, graphql, etc.)
 */
export function createApiClient(baseUrl?: string): ApiClient {
  return new FetchApiClient(baseUrl);
}

// Default singleton instance
const defaultClient = createApiClient();
export { defaultClient as apiClient };

// Re-export types
export type { ApiClient, RequestOptions } from "./interface";

