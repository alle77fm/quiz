type MapReadyScreenProps = {
  onContinue: () => void;
};

export function MapReadyScreen({ onContinue }: MapReadyScreenProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h1 className="font-display text-2xl font-extrabold text-cream sm:text-3xl">
        Seu mapa está pronto
      </h1>
      <p className="max-w-sm text-muted">
        Para guardar o seu resultado e acessá-lo depois, precisamos de mais
        alguns dados.
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
