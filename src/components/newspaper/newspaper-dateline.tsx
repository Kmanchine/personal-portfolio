"use client";

import { useEffect, useState } from "react";

export function NewspaperDateline() {
  const [line, setLine] = useState<string | null>(null);

  useEffect(() => {
    setLine(
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date()),
    );
  }, []);

  return (
    <p className="text-center font-serif text-xs uppercase tracking-[0.35em] text-ink/70">
      {line ?? "\u00a0"}
    </p>
  );
}
