"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function revalidateAndRedirect(
  successParam: string,
  paths: string[] = ["/", "/admin"],
) {
  await Promise.all(paths.map(async (path) => revalidatePath(path)));
  redirect(`/admin?success=${successParam}`);
}

export async function revalidateBlogAndRedirect(successParam: string) {
  await Promise.all([
    revalidatePath("/admin"),
    revalidatePath("/blog"),
    revalidatePath("/"),
  ]);
  redirect(`/admin?success=${successParam}`);
}

