type WaxSealProps = {
  size?: number;
  className?: string;
};

/** Wax seal disc with Material Symbol forward_to_inbox (see layout stylesheet). */
export function WaxSeal({ size = 76, className = "" }: WaxSealProps) {
  const iconSize = Math.round(size * 0.42);
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-[#e85a5a] via-[#c41e3a] to-[#8b1530] shadow-md ring-2 ring-[#6b0f24]/40 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span
        className="material-symbols-outlined text-[#f5d0d0]"
        style={{
          fontSize: iconSize,
          fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 40",
        }}
      >
        forward_to_inbox
      </span>
    </div>
  );
}
