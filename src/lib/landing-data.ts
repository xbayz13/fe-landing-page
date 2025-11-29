import type { Metadata } from "next";
import {
  fetchBlogPosts,
  fetchLandingConfig,
  fetchSeoMetadata,
} from "./api";
import type { LandingConfig } from "./types";

export const fallbackLandingConfig: LandingConfig = {
  brand: {
    companyName: "Landing CMS",
    tagline: "One workspace for marketing teams",
  },
  hero: {
    eyebrow: "Platform",
    heading: "Kelola landing page + blog dalam hitungan menit",
    subheading:
      "Atur hero, navigasi, CTA, dan artikel tanpa menunggu tim engineering. Semua data rapi lewat NestJS API.",
    primaryCtaLabel: "Coba demo",
    primaryCtaUrl: "#contact",
    secondaryCtaLabel: "Lihat fitur",
    secondaryCtaUrl: "#features",
  },
  navigation: [],
  features: [],
  testimonials: [],
  callsToAction: [],
  footerLinks: [],
};

export async function generateLandingMetadata(): Promise<Metadata> {
  try {
    const metadata = await fetchSeoMetadata();
    return {
      title: metadata.title,
      description: metadata.description,
      openGraph: {
        title: metadata.title,
        description: metadata.description,
        url: metadata.url,
        images: metadata.image ? [{ url: metadata.image }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: metadata.title,
        description: metadata.description,
        images: metadata.image ? [metadata.image] : undefined,
      },
    };
  } catch {
    return {
      title: "Landing Page CMS",
      description: "Frontend Next.js yang terhubung ke NestJS CMS.",
    };
  }
}

export async function loadLandingData() {
  try {
    const [config, posts] = await Promise.all([
      fetchLandingConfig(),
      fetchBlogPosts(3),
    ]);
    return { config, posts };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Falling back to static content:", error);
    }
    return { config: fallbackLandingConfig, posts: [] };
  }
}

