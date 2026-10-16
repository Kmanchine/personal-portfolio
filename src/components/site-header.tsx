import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          Portfolio
        </Link>
        <nav className="flex gap-5 text-sm text-zinc-600 dark:text-zinc-400">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-zinc-950 dark:hover:text-zinc-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
