import Link from "next/link";
import type { ProjectMeta } from "@/types/content.types";

type ProjectArticleProps = {
  project: ProjectMeta;
};

export function ProjectArticle({ project }: ProjectArticleProps) {
  return (
    <article className="flex flex-col border-b border-ink/20 pb-4 last:border-b-0 md:border-b-0 md:pb-0">
      {project.period ? (
        <p className="font-serif text-xs uppercase tracking-widest text-ink/55">
          {project.period}
        </p>
      ) : null}
      <h2 className="font-display mt-1 text-lg font-bold leading-snug">
        <Link
          href={`/projects/${project.slug}`}
          className="hover:underline underline-offset-2"
        >
          {project.title}
        </Link>
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ink/85">{project.summary}</p>
      {project.stack?.length ? (
        <p className="mt-3 font-serif text-xs italic text-ink/60">
          {project.stack.join(" · ")}
        </p>
      ) : null}
      <Link
        href={`/projects/${project.slug}`}
        className="mt-auto pt-3 text-xs uppercase tracking-wider text-ink/70 hover:text-ink hover:underline"
      >
        Read full story →
      </Link>
    </article>
  );
}
