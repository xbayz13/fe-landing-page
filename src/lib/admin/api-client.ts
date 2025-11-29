"use server";

import { cookies } from "next/headers";
import { ADMIN_AUTH_COOKIE } from "@/lib/auth/cookies";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";

export async function authorizedFetch<T = unknown>(
  path: string,
  init: RequestInit,
): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;

  if (!token) {
    throw new Error("NOT_AUTHENTICATED");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

