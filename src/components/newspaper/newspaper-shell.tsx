import type { ReactNode } from "react";
import { newspaperWidthClass } from "./newspaper-width";

type NewspaperShellProps = {
  children: ReactNode;
  className?: string;
  /** Skip inner sheet padding (e.g. contact scene). */
  bare?: boolean;
};

export function NewspaperShell({
  children,
  className = "",
  bare,
}: NewspaperShellProps) {
  return (
    <div
      className={`${newspaperWidthClass} py-6 ${className}`}
    >
      <div
        className={
          bare
            ? "min-h-[50vh]"
            : "border border-ink/20 bg-paper-sheet px-5 py-8 shadow-sm sm:px-8 sm:py-10"
        }
      >
        {children}
      </div>
    </div>
  );
}
