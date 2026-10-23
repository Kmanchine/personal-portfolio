type NewspaperRuleProps = {
  className?: string;
  thick?: boolean;
};

export function NewspaperRule({ className = "", thick }: NewspaperRuleProps) {
  return (
    <hr
      className={`border-0 border-t border-ink/25 ${thick ? "border-t-2 border-ink" : ""} ${className}`}
    />
  );
}
