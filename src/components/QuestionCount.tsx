type QuestionCountProps = {
  label: string;
};

export function QuestionCount({ label }: QuestionCountProps) {
  return (
    <p className="inline-flex w-fit items-center gap-2 rounded-full border border-gold-deep/40 bg-gold-soft/30 px-4 py-1.5 text-sm font-medium tracking-wide text-ink">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-deep" />
      {label}
    </p>
  );
}
