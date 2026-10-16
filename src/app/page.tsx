import { profile } from "../../content/profile";

export default function Home() {
  return (
    <div className="space-y-10 py-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">{profile.name}</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">{profile.headline}</p>
        {profile.location ? (
          <p className="text-sm text-zinc-500">{profile.location}</p>
        ) : null}
        <p className="max-w-2xl leading-7">{profile.about}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Skills</h2>
        <ul className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-zinc-200 px-3 py-1 text-sm dark:border-zinc-700"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Experience</h2>
        <ul className="space-y-6">
          {profile.experience.map((job) => (
            <li key={`${job.company}-${job.role}`} className="space-y-2">
              <div>
                <p className="font-medium">
                  {job.role} · {job.company}
                </p>
                <p className="text-sm text-zinc-500">{job.period}</p>
              </div>
              <ul className="list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
                {job.highlights.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
