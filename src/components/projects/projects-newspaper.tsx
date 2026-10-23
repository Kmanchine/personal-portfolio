"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ProjectMeta } from "@/types/content.types";
import { NewspaperRule } from "@/components/newspaper/newspaper-rule";
import { ProjectArticle } from "./project-article";

const PAGE_SIZE = 3;
const ULTRA_WIDE_QUERY = "(min-width: 1536px)";

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out.length ? out : [[]];
}

function ProjectSheet({
  projects,
  pageLabel,
}: {
  projects: ProjectMeta[];
  pageLabel: string;
}) {
  return (
    <div className="border border-ink/25 bg-paper-sheet px-5 py-6 shadow-sm sm:px-6">
      <p className="text-center font-serif text-xs uppercase tracking-[0.3em] text-ink/55">
        {pageLabel}
      </p>
      <NewspaperRule className="my-3" />
      <div className="grid gap-6 md:grid-cols-3 md:gap-4">
        {projects.map((project) => (
          <ProjectArticle key={project.slug} project={project} />
        ))}
      </div>
      {projects.length === 0 ? (
        <p className="py-8 text-center text-sm italic text-ink/50">No entries.</p>
      ) : null}
    </div>
  );
}

type ProjectsNewspaperProps = {
  projects: ProjectMeta[];
};

export function ProjectsNewspaper({ projects }: ProjectsNewspaperProps) {
  const pages = useMemo(() => chunk(projects, PAGE_SIZE), [projects]);
  const [pageIndex, setPageIndex] = useState(0);
  const [ultraWide, setUltraWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(ULTRA_WIDE_QUERY);
    const sync = () => setUltraWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const max = ultraWide
      ? Math.max(0, pages.length - 1)
      : Math.max(0, pages.length - 1);
    if (pageIndex > max) setPageIndex(max);
  }, [ultraWide, pageIndex, pages.length]);

  const step = ultraWide ? 2 : 1;
  const canPrev = pageIndex > 0;
  const canNext = ultraWide
    ? pageIndex + 2 < pages.length
    : pageIndex + 1 < pages.length;

  const goPrev = useCallback(() => {
    setPageIndex((i) => Math.max(0, i - step));
  }, [step]);

  const goNext = useCallback(() => {
    setPageIndex((i) => {
      if (ultraWide) return i + 2 < pages.length ? i + 2 : i;
      return i + 1 < pages.length ? i + 1 : i;
    });
  }, [ultraWide, pages.length]);

  const leftPage = pages[pageIndex] ?? [];
  const rightPage = ultraWide ? (pages[pageIndex + 1] ?? []) : null;

  return (
    <div className="space-y-6">
      <header className="text-center">
        <h2 className="font-display text-3xl font-bold">Project dispatch</h2>
        <p className="mt-2 font-serif text-sm italic text-ink/70">
          Case studies filed from the field
        </p>
      </header>

      <div
        className={
          ultraWide
            ? "grid grid-cols-1 gap-6 2xl:grid-cols-2"
            : "grid grid-cols-1"
        }
      >
        <ProjectSheet
          projects={leftPage}
          pageLabel={`Page ${pageIndex + 1}`}
        />
        {ultraWide ? (
          <ProjectSheet
            projects={rightPage ?? []}
            pageLabel={
              pageIndex + 2 <= pages.length
                ? `Page ${pageIndex + 2}`
                : "—"
            }
          />
        ) : null}
      </div>

      {pages.length > 1 || (ultraWide && pages.length > 2) ? (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/20 pt-4 font-serif text-sm">
          <button
            type="button"
            disabled={!canPrev}
            onClick={goPrev}
            className="uppercase tracking-wider disabled:opacity-35 hover:underline"
          >
            ← Previous edition
          </button>
          <span className="text-ink/60">
            {ultraWide
              ? `Spread ${Math.floor(pageIndex / 2) + 1}`
              : `Page ${pageIndex + 1} of ${pages.length}`}
          </span>
          <button
            type="button"
            disabled={!canNext}
            onClick={goNext}
            className="uppercase tracking-wider disabled:opacity-35 hover:underline"
          >
            Continued inside →
          </button>
        </div>
      ) : null}
    </div>
  );
}
