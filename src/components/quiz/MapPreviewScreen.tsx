type MapPreviewScreenProps = {
  mapa: string;
  onContinue: () => void;
};

/**
 * Tela 2 — Prévia do mapa. Frase abaixo do nome é estrutura de
 * homologação (não conteúdo final da Jeruska) — ver
 * src/config/quiz/v1/homologacao/.
 */
export function MapPreviewScreen({ mapa, onContinue }: MapPreviewScreenProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber">
        Seu mapa
      </p>
      <h1 className="font-display text-3xl font-extrabold text-cream sm:text-4xl">
        {mapa}
      </h1>
      <p className="max-w-sm text-muted">
        Este é o espaço que aparece com mais força no seu percurso.
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
