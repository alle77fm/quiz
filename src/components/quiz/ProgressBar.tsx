type ProgressBarProps = {
  percent: number;
};

export function ProgressBar({ percent }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progresso do percurso"
      className="h-1.5 w-full overflow-hidden rounded-full bg-cream/10"
    >
      <div
        className="h-full rounded-full bg-gold transition-[width] duration-300 motion-reduce:transition-none"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
