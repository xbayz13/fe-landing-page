"use server";

import { authorizedFetch } from "./api-client";
import { revalidateAndRedirect } from "./utils";

export async function updateBrandAction(formData: FormData) {
  const payload = {
    companyName: formData.get("companyName")?.toString() ?? "",
    tagline: formData.get("tagline")?.toString() || undefined,
    logoUrl: formData.get("logoUrl")?.toString() || undefined,
    primaryColor: formData.get("primaryColor")?.toString() || undefined,
    secondaryColor: formData.get("secondaryColor")?.toString() || undefined,
  };

  await authorizedFetch("/site-config/brand", {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  revalidateAndRedirect("brand");
}

