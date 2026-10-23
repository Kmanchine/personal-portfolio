import type { Profile } from "@/types/content.types";

export const profile: Profile = {
  name: "Denis Suljevic",
  headline: "Software developer",
  homeTagline: "Full-stack work, filed under clarity and craft",
  homeDeck:
    "TypeScript and React in production · content-driven sites · automation that stays boring on purpose",
  location: "Europe",
  about:
    "I build web applications and the tooling around them: typed front ends, predictable APIs, and deploy paths you can explain in one sentence. I care about readable code, honest error handling, and interfaces that do not waste people's time. Recent work spans App Router sites, MDX-backed content, self-hosted CI, and Dockerized releases. Open to teams that value maintainability over heroics—replace company names and dates in this file as you refine the edition.",
  skills: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "REST APIs",
    "Docker",
    "GitHub Actions",
    "PostgreSQL",
    "Tailwind CSS",
    "MDX",
    "Linux",
  ],
  focusAreas: [
    "Product-minded engineering—ship, measure, iterate without theatrics.",
    "Content as code: MDX, frontmatter, static generation where it fits.",
    "Ops-lite: self-hosted runners, containers, env-driven configuration.",
    "Accessibility and performance as defaults, not audit surprises.",
  ],
  experience: [
    {
      role: "Software developer",
      company: "Product & engineering teams",
      period: "2022 — Present",
      highlights: [
        "Delivered customer-facing features in React/Next.js with shared design language and typed data layers.",
        "Integrated third-party services (auth, email, analytics) with clear failure modes and observability hooks.",
        "Reduced release friction via automated builds, container images, and documented runbooks.",
      ],
    },
    {
      role: "Full-stack contributor",
      company: "Web & internal tools",
      period: "2019 — 2022",
      highlights: [
        "Maintained legacy modules while introducing TypeScript and incremental refactors.",
        "Built internal dashboards and APIs used daily by non-engineering staff.",
        "Partnered on code review norms, linting, and CI checks adopted team-wide.",
      ],
    },
  ],
  social: [
    { label: "LinkedIn", href: "https://linkedin.com/in/your-handle" },
    { label: "GitHub", href: "https://github.com/Kmanchine" },
    { label: "Email", href: "mailto:you@example.com" },
  ],
};
