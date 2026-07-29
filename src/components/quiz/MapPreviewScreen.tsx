type MapPreviewScreenProps = {
  mapa: string;
  onContinue: () => void;
};

export function MapPreviewScreen({ mapa, onContinue }: MapPreviewScreenProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber">
        Seu mapa (exemplo ilustrativo)
      </p>
      <h1 className="font-display text-3xl font-extrabold text-cream sm:text-4xl">
        {mapa}
      </h1>
      <p className="max-w-sm text-muted">
        Aqui entrará uma frase breve sobre este mapa — texto final ainda
        pendente da psicóloga.
      </p>
      <button
        type="button"
        onClick={onContinue}
        className="min-h-12 rounded-xl bg-olive px-8 text-base font-semibold text-cream transition-colors hover:bg-olive-deep"
      >
        Continuar
      </button>
    </div>
  );
}
