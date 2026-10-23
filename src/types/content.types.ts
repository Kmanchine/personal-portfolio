export type ProjectType = "work" | "personal" | "oss";

export type ProjectFrontmatter = {
  title: string;
  summary: string;
  type: ProjectType;
  stack?: string[];
  period?: string;
  featured?: boolean;
};

export type ProjectMeta = ProjectFrontmatter & {
  slug: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  headline: string;
  /** Shown on the anonymous front page instead of name/headline when set. */
  homeTagline?: string;
  /** Subhead under the tagline on the front page. */
  homeDeck?: string;
  location?: string;
  about: string;
  /** Short beats for the front page (e.g. focus areas). */
  focusAreas?: string[];
  skills: string[];
  experience: {
    role: string;
    company: string;
    period: string;
    highlights: string[];
  }[];
  social: SocialLink[];
};
