import type { ReactNode } from "react";

type EnvelopeBackProps = {
  onOpen?: () => void;
  disabled?: boolean;
  className?: string;
  stamp?: ReactNode;
};

/** Back of a sealed envelope — four flaps meet at center. */
export function EnvelopeBack({
  onOpen,
  disabled,
  className = "",
  stamp,
}: EnvelopeBackProps) {
  const inner = (
    <svg
      viewBox="0 0 320 200"
      className={`h-auto w-full max-w-[20rem] drop-shadow-md ${className}`}
      aria-hidden={!onOpen}
    >
      <rect
        x="4"
        y="4"
        width="312"
        height="192"
        rx="2"
        fill="#e8dcc8"
        stroke="#3d342a"
        strokeWidth="2"
      />
      <polygon points="4,4 160,100 4,196" fill="#ddd0bc" stroke="#3d342a" strokeWidth="1" />
      <polygon points="316,4 160,100 316,196" fill="#ddd0bc" stroke="#3d342a" strokeWidth="1" />
      <polygon points="4,196 160,100 316,196" fill="#d4c4a8" stroke="#3d342a" strokeWidth="1" />
      <polygon points="4,4 160,100 316,4" fill="#ebe0d0" stroke="#3d342a" strokeWidth="1" />
    </svg>
  );

  return (
    <div className="relative mx-auto w-full max-w-[20rem]">
      {onOpen ? (
        <button
          type="button"
          onClick={onOpen}
          disabled={disabled}
          className="relative block w-full disabled:cursor-default"
          aria-label="Open envelope"
        >
          {inner}
        </button>
      ) : (
        inner
      )}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {stamp}
      </div>
    </div>
  );
}
