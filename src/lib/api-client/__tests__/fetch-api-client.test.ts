import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { FetchApiClient } from "../fetch-api-client";

const createFetchResponse = (data: unknown) => ({
  ok: true,
  status: 200,
  statusText: "OK",
  json: async () => data,
});

describe("FetchApiClient", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    globalThis.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("melakukan GET request dengan base URL dan header default", async () => {
    const payload = { brand: null };
    fetchMock.mockResolvedValue(createFetchResponse(payload));
    const client = new FetchApiClient("https://api.example.com");

    const result = await client.get("/site-config");

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.com/site-config",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({ "Content-Type": "application/json" }),
        next: { revalidate: 60 },
      }),
    );
    expect(result).toEqual(payload);
  });

  it("mengirim body JSON dan custom revalidate ketika POST", async () => {
    const payload = { heading: "CTA" };
    fetchMock.mockResolvedValue(createFetchResponse(payload));
    const client = new FetchApiClient("https://api.example.com/");

    const result = await client.post("site-config/cta-blocks", payload, {
      revalidateSeconds: 5,
      headers: { Authorization: "Bearer token" },
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.com/site-config/cta-blocks",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(payload),
        headers: expect.objectContaining({
          Authorization: "Bearer token",
          "Content-Type": "application/json",
        }),
        next: { revalidate: 5 },
      }),
    );
    expect(result).toEqual(payload);
  });

  it("throw error ketika response tidak ok", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });
    const client = new FetchApiClient("https://api.example.com");

    await expect(client.get("/broken")).rejects.toThrow(
      /API request failed/i,
    );
  });
});

