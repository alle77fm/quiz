type BackButtonProps = {
  onClick: () => void;
  label?: string;
};

export function BackButton({ onClick, label = "Voltar" }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:bg-cream/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
    >
      <span aria-hidden="true">←</span>
    </button>
  );
}
