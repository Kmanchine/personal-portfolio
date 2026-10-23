import { LetterContact } from "@/components/contact/letter-contact";
import { NewspaperShell } from "@/components/newspaper/newspaper-shell";

export default function ContactPage() {
  return (
    <NewspaperShell bare>
      <div className="space-y-4 text-center">
        <h2 className="font-display text-3xl font-bold">Correspondence desk</h2>
        <p className="mx-auto max-w-[min(42rem,90%)] font-serif text-sm italic text-ink/70">
          Send a letter by post. Open the envelope, write your note, and we will
          deliver it securely.
        </p>
        <LetterContact />
      </div>
    </NewspaperShell>
  );
}
