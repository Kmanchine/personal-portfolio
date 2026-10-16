import { profile } from "../../../content/profile";

export default function ContactPage() {
  return (
    <div className="space-y-8 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Update links in <code className="text-sm">content/profile.ts</code>.
        </p>
      </div>

      <ul className="space-y-3">
        {profile.social.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-lg font-medium underline-offset-4 hover:underline"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
