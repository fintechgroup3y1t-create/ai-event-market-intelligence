export function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="mb-4">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wider text-ai-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
    </div>
  );
}
