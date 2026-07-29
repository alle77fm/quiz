type JourneyBadgeProps = {
  label: string;
};

export function JourneyBadge({ label }: JourneyBadgeProps) {
  return (
    <p className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/35 bg-cream/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-cream">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber" />
      {label}
    </p>
  );
}
