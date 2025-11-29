"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export function revalidateAndRedirect(
  successParam: string,
  paths: string[] = ["/", "/admin"],
) {
  paths.forEach((path) => revalidatePath(path));
  redirect(`/admin?success=${successParam}`);
}

export function revalidateBlogAndRedirect(successParam: string) {
  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect(`/admin?success=${successParam}`);
}

