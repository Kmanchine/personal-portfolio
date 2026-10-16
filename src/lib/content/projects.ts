import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ProjectFrontmatter, ProjectMeta } from "@/types/content.types";

const projectsDirectory = path.join(process.cwd(), "content", "projects");

function parseProjectFile(slug: string): ProjectMeta {
  const filePath = path.join(projectsDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { data } = matter(source);
  const frontmatter = data as ProjectFrontmatter;

  return { slug, ...frontmatter };
}

export function getProjectSlugs(): string[] {
  return fs
    .readdirSync(projectsDirectory)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}

export function getAllProjects(): ProjectMeta[] {
  return getProjectSlugs()
    .map(parseProjectFile)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getProjectBySlug(slug: string): {
  meta: ProjectMeta;
  content: string;
} {
  const filePath = path.join(projectsDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = data as ProjectFrontmatter;

  return {
    meta: { slug, ...frontmatter },
    content,
  };
}
