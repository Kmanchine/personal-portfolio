import { getAllProjects } from "@/lib/content/projects";
import { ProjectsNewspaper } from "@/components/projects/projects-newspaper";
import { NewspaperShell } from "@/components/newspaper/newspaper-shell";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <NewspaperShell>
      <ProjectsNewspaper projects={projects} />
    </NewspaperShell>
  );
}
