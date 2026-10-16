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
  location?: string;
  about: string;
  skills: string[];
  experience: {
    role: string;
    company: string;
    period: string;
    highlights: string[];
  }[];
  social: SocialLink[];
};
