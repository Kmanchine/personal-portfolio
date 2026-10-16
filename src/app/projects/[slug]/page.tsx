import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx-content";
import {
  getProjectBySlug,
  getProjectSlugs,
} from "@/lib/content/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  try {
    const { meta } = getProjectBySlug(slug);
    return { title: meta.title, description: meta.summary };
  } catch {
    return { title: "Project" };
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  let project: ReturnType<typeof getProjectBySlug>;
  try {
    project = getProjectBySlug(slug);
  } catch {
    notFound();
  }

  const { meta, content } = project;

  return (
    <article className="space-y-8 py-10">
      <Link
        href="/projects"
        className="text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50"
      >
        ← All projects
      </Link>

      <header className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-zinc-500">{meta.type}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{meta.title}</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">{meta.summary}</p>
        {meta.stack?.length ? (
          <p className="text-sm text-zinc-500">{meta.stack.join(" · ")}</p>
        ) : null}
      </header>

      <MdxContent source={content} />
    </article>
  );
}
