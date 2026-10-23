import Link from "next/link";
import { profile } from "../../content/profile";
import { NewspaperRule } from "@/components/newspaper/newspaper-rule";
import { NewspaperShell } from "@/components/newspaper/newspaper-shell";

export default function Home() {
  const lead = profile.homeTagline ?? profile.headline;

  return (
    <NewspaperShell>
      <div className="space-y-8">
        <header className="text-center">
          <p className="font-serif text-xs uppercase tracking-[0.25em] text-ink/60">
            Special report
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {lead}
          </h2>
          {profile.homeDeck ? (
            <p className="mx-auto mt-4 max-w-3xl font-serif text-base italic leading-relaxed text-ink/75">
              {profile.homeDeck}
            </p>
          ) : null}
          <NewspaperRule className="mx-auto mt-6 max-w-xs" />
        </header>

        <section className="newspaper-columns newspaper-columns-2 gap-8">
          <div className="break-inside-avoid space-y-3">
            <h3 className="font-display border-b border-ink/20 pb-1 text-xl font-semibold">
              From the editor
            </h3>
            <p className="text-base leading-relaxed first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:leading-none">
              {profile.about}
            </p>
          </div>

          <div className="space-y-6 break-inside-avoid">
            <div className="space-y-3">
              <h3 className="font-display border-b border-ink/20 pb-1 text-xl font-semibold">
                Technologies
              </h3>
              <p className="text-sm uppercase leading-loose tracking-wide text-ink/90">
                {profile.skills.join(" · ")}
              </p>
            </div>

            {profile.focusAreas?.length ? (
              <div className="space-y-3">
                <h3 className="font-display border-b border-ink/20 pb-1 text-xl font-semibold">
                  Beats
                </h3>
                <ul className="space-y-2 text-sm leading-relaxed">
                  {profile.focusAreas.map((line) => (
                    <li key={line} className="border-l-2 border-ink/25 pl-3">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>

        <NewspaperRule thick />

        <section className="space-y-6">
          <h3 className="font-display text-center text-2xl font-bold uppercase tracking-wide">
            Experience
          </h3>
          <div className="space-y-8">
            {profile.experience.map((job) => (
              <article
                key={`${job.company}-${job.role}`}
                className="border-b border-ink/15 pb-6 last:border-0"
              >
                <h4 className="font-display text-xl font-semibold">{job.role}</h4>
                <p className="mt-1 font-serif text-sm italic text-ink/70">
                  {job.company} — {job.period}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                  {job.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <NewspaperRule />

        <p className="text-center font-serif text-sm">
          Case studies and builds appear in{" "}
          <Link href="/projects" className="underline underline-offset-2 hover:text-ink/70">
            Project dispatch
          </Link>
          . Correspondence via the{" "}
          <Link href="/contact" className="underline underline-offset-2 hover:text-ink/70">
            desk
          </Link>
          .
        </p>
      </div>
    </NewspaperShell>
  );
}
