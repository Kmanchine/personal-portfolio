import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MdxContent } from "@/components/mdx-content";
import { NewspaperRule } from "@/components/newspaper/newspaper-rule";
import { NewspaperShell } from "@/components/newspaper/newspaper-shell";
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

function ProjectFallback() {
  return (
    <NewspaperShell>
      <p className="font-serif text-sm italic text-ink/60">Loading edition…</p>
    </NewspaperShell>
  );
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <Suspense fallback={<ProjectFallback />}>
      <ProjectPageContent params={params} />
    </Suspense>
  );
}

async function ProjectPageContent({ params }: ProjectPageProps) {
  const { slug } = await params;

  let project: ReturnType<typeof getProjectBySlug>;
  try {
    project = getProjectBySlug(slug);
  } catch {
    notFound();
  }

  const { meta, content } = project;

  return (
    <NewspaperShell>
      <article className="space-y-8">
        <Link
          href="/projects"
          className="font-serif text-sm uppercase tracking-wider text-ink/60 hover:text-ink hover:underline"
        >
          ← Project dispatch
        </Link>

        <header className="space-y-3 text-center">
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-ink/55">
            {meta.type}
            {meta.period ? ` · ${meta.period}` : ""}
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight">
            {meta.title}
          </h1>
          <p className="mx-auto max-w-[min(48rem,85%)] text-lg italic text-ink/80">
            {meta.summary}
          </p>
          {meta.stack?.length ? (
            <p className="font-serif text-sm text-ink/60">
              {meta.stack.join(" · ")}
            </p>
          ) : null}
          <NewspaperRule className="mx-auto mt-4 max-w-lg" thick />
        </header>

        <div className="newspaper-columns newspaper-columns-2 mx-auto w-full text-base leading-relaxed [&_a]:underline [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_p]:mb-4">
          <MdxContent source={content} />
        </div>
      </article>
    </NewspaperShell>
  );
}
