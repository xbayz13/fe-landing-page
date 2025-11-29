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
  highlightOrder?: number;
  pillar?: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  company?: string;
  avatarUrl?: string;
  featured?: boolean;
};

export type CallToActionBlock = {
  id: string;
  heading: string;
  body?: string;
  eyebrow?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  variant?: "solid" | "outline" | "ghost";
};

export type FooterLink = {
  id: string;
  label: string;
  url: string;
  groupName: string;
  position?: number;
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
  bio?: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
};

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImageUrl?: string;
  status: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  readingTimeMinutes?: number;
  seoTitle?: string;
  seoDescription?: string;
  author?: BlogAuthor;
  category?: BlogCategory;
};

export type SeoMetadata = {
  title: string;
  description: string;
  url: string;
  image?: string;
  type: "website" | "article";
};

