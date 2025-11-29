import { loadLandingData } from "@/lib/landing-data";
import {
  SiteHeader,
  HeroSection,
  StatsStrip,
  FeatureGrid,
  WorkflowSection,
  BlogHighlights,
  Testimonials,
  PrimaryCta,
  ContactSection,
  SiteFooter,
} from "@/components/landing";

export const revalidate = 60;
export { generateLandingMetadata as generateMetadata } from "@/lib/landing-data";

export default async function HomePage() {
  const { config, posts } = await loadLandingData();

  return (
    <div id="top" className="min-h-screen">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-8 sm:py-12 md:gap-24">
        <SiteHeader config={config} />
        <HeroSection config={config} />
        <StatsStrip />
        <FeatureGrid config={config} />
        <WorkflowSection />
        <BlogHighlights posts={posts} brand={config.brand} />
        <Testimonials config={config} />
        <PrimaryCta config={config} />
        <ContactSection config={config} />
      </div>
      <SiteFooter config={config} />
    </div>
  );
}


