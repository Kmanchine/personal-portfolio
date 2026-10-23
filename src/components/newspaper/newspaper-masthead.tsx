import Link from "next/link";
import { NewspaperDateline } from "./newspaper-dateline";
import { NewspaperRule } from "./newspaper-rule";
import { newspaperWidthClass } from "./newspaper-width";

const nav = [
  { href: "/", label: "Front Page" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Correspondence" },
] as const;

const GAZETTE_TITLE = "Portfolio Gazette";

export function NewspaperMasthead() {
  return (
    <header className="border-b-2 border-ink bg-paper">
      <div className={`${newspaperWidthClass} pt-6`}>
        <NewspaperDateline />
        <Link href="/" className="mt-2 block text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {GAZETTE_TITLE}
          </h1>
        </Link>
        <p className="mt-1 text-center font-serif text-sm italic text-ink/75">
          Independent edition · Software &amp; craft
        </p>
        <NewspaperRule thick className="my-4" />
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 pb-4 font-serif text-sm uppercase tracking-widest">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink/80 underline-offset-4 hover:text-ink hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <NewspaperRule className="mb-0" />
      </div>
    </header>
  );
}
