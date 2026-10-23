import type { Profile } from "@/types/content.types";

export const profile: Profile = {
  name: "Denis Suljevic",
  headline: "Software developer",
  homeTagline: "Building reliable web systems with clarity and care",
  location: "Your location",
  about:
    "Short intro about what you build and what you are looking for. Edit this in content/profile.ts.",
  skills: ["TypeScript", "React", "Next.js", "Node.js"],
  experience: [
    {
      role: "Your role",
      company: "Company name",
      period: "2022 — Present",
      highlights: [
        "Outcome-focused bullet (no confidential details).",
        "Another highlight with stack or responsibility.",
      ],
    },
  ],
  social: [
    { label: "LinkedIn", href: "https://linkedin.com/in/your-handle" },
    { label: "GitHub", href: "https://github.com/Kmanchine" },
    { label: "Email", href: "mailto:you@example.com" },
  ],
};
