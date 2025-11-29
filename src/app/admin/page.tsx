import {
  fetchAllAuthors,
  fetchAllBlogPosts,
  fetchAllCategories,
  fetchLandingConfig,
} from "@/lib/api";
import type {
  BlogAuthor,
  BlogCategory,
  BlogPost,
  LandingConfig,
} from "@/lib/types";
import {
  AuthorsSection,
  BrandSection,
  CategoriesSection,
  CtaSection,
  FeatureSection,
  FooterSection,
  HeroSection,
  NavigationSection,
  PostsSection,
  TestimonialSection,
} from "@/components/admin/sections";
import { isBlogTab, ADMIN_TABS, type AdminTabId } from "./tabs";

export const dynamic = "force-dynamic";

const fallbackConfig: LandingConfig = {
  brand: {
    companyName: "Landing CMS",
    tagline: "Fallback mode",
  },
  hero: {
    heading: "Isi hero dari dashboard ini",
    subheading: "Saat API tidak tersedia, gunakan fallback copy.",
  },
  navigation: [],
  features: [],
  testimonials: [],
  callsToAction: [],
  footerLinks: [],
};

type AdminPageProps = {
  searchParams?: {
    tab?: string;
  };
};

type BlogResource = {
  posts: BlogPost[];
  authors: BlogAuthor[];
  categories: BlogCategory[];
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const activeTab = resolveTabId(searchParams?.tab);
  const config = await fetchLandingConfig().catch(() => fallbackConfig);
  const blogResources = isBlogTab(activeTab)
    ? await loadBlogResources()
    : null;

  return (
    <div className="space-y-6">
      {renderSection({
        tab: activeTab,
        config,
        blogResources,
      })}
    </div>
  );
}

function resolveTabId(candidate?: string): AdminTabId {
  const tab = candidate?.toLowerCase();
  return ADMIN_TABS.find((item) => item.id === tab)?.id ?? "brand";
}

async function loadBlogResources(): Promise<BlogResource> {
  try {
    const [{ data: posts }, authors, categories] = await Promise.all([
      fetchAllBlogPosts({ limit: 25 }),
      fetchAllAuthors(),
      fetchAllCategories(),
    ]);
    return { posts, authors, categories };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Failed to fetch blog resources", error);
    }
    return { posts: [], authors: [], categories: [] };
  }
}

function renderSection({
  tab,
  config,
  blogResources,
}: {
  tab: AdminTabId;
  config: LandingConfig;
  blogResources: BlogResource | null;
}) {
  switch (tab) {
    case "brand":
      return <BrandSection brand={config.brand} />;
    case "hero":
      return <HeroSection hero={config.hero} />;
    case "navigation":
      return <NavigationSection links={config.navigation} />;
    case "features":
      return <FeatureSection features={config.features} />;
    case "testimonials":
      return <TestimonialSection testimonials={config.testimonials} />;
    case "cta":
      return <CtaSection blocks={config.callsToAction} />;
    case "footer":
      return <FooterSection links={config.footerLinks} />;
    case "posts":
      return (
        <PostsSection
          posts={blogResources?.posts ?? []}
          authors={blogResources?.authors ?? []}
          categories={blogResources?.categories ?? []}
        />
      );
    case "authors":
      return <AuthorsSection authors={blogResources?.authors ?? []} />;
    case "categories":
      return <CategoriesSection categories={blogResources?.categories ?? []} />;
    default:
      return <BrandSection brand={config.brand} />;
  }
}

