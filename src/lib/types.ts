export type BrandSetting = {
  companyName: string;
  tagline?: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
};

export type HeroSection = {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  primaryCtaLabel?: string;
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  mediaUrl?: string;
};

export type NavigationLink = {
  id: string;
  label: string;
  url: string;
  position: number;
  isPrimary: boolean;
  isExternal: boolean;
};

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  pillar?: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  company?: string;
};

export type CallToActionBlock = {
  id: string;
  heading: string;
  body?: string;
  eyebrow?: string;
  buttonLabel?: string;
  buttonUrl?: string;
};

export type FooterLink = {
  id: string;
  label: string;
  url: string;
  groupName: string;
};

export type LandingConfig = {
  brand: BrandSetting | null;
  hero: HeroSection | null;
  navigation: NavigationLink[];
  features: Feature[];
  testimonials: Testimonial[];
  callsToAction: CallToActionBlock[];
  footerLinks: FooterLink[];
};

export type BlogAuthor = {
  id: string;
  name: string;
  title?: string;
  avatarUrl?: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImageUrl?: string;
  status: string;
  publishedAt?: string;
  createdAt?: string;
  author?: BlogAuthor;
};

export type SeoMetadata = {
  title: string;
  description: string;
  url: string;
  image?: string;
  type: "website" | "article";
};

