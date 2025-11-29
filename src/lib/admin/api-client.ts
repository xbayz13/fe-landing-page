"use server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

export async function authorizedFetch<T = unknown>(
  path: string,
  init: RequestInit,
): Promise<T> {
  if (!ADMIN_API_KEY) {
    throw new Error(
      "ADMIN_API_KEY belum diset di environment Next.js (server only)",
    );
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ADMIN_API_KEY,
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      `Gagal memanggil ${path}: ${response.status} ${response.statusText} - ${message}`,
    );
  }

  return response.json() as Promise<T>;
}

