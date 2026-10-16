import Link from "next/link";
import { getAllProjects } from "@/lib/content/projects";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="space-y-8 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Add a file under <code className="text-sm">content/projects/</code> to
          publish a new case study.
        </p>
      </div>

      <ul className="space-y-6">
        {projects.map((project) => (
          <li
            key={project.slug}
            className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <Link
                href={`/projects/${project.slug}`}
                className="text-lg font-medium hover:underline"
              >
                {project.title}
              </Link>
              {project.period ? (
                <span className="text-sm text-zinc-500">{project.period}</span>
              ) : null}
            </div>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">{project.summary}</p>
            {project.stack?.length ? (
              <p className="mt-3 text-sm text-zinc-500">
                {project.stack.join(" · ")}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
