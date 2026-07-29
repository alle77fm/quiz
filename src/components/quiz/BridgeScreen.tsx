type BridgeScreenProps = {
  onReflect: () => void;
  onTalk: () => void;
};

/**
 * Tela 4 — Ponte para a terapia. Dois caminhos igualmente legítimos
 * (docs/FINAL_SEQUENCE.md §8) — nenhum dos dois é descrito como déficit.
 */
export function BridgeScreen({ onReflect, onTalk }: BridgeScreenProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-extrabold leading-tight text-cream sm:text-3xl">
        Dois caminhos possíveis a partir daqui
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={onReflect}
          className="flex flex-col items-start gap-2 rounded-xl border border-cream/15 bg-cream/[0.03] p-5 text-left transition-colors hover:border-gold/50"
        >
          <span className="font-display font-bold text-cream">
            Refletir no seu tempo
          </span>
          <span className="text-sm text-muted">
            Guardar o mapa e voltar a ele quando fizer sentido para você.
          </span>
        </button>

        <button
          type="button"
          onClick={onTalk}
          className="flex flex-col items-start gap-2 rounded-xl border border-gold/40 bg-gold/[0.06] p-5 text-left transition-colors hover:border-gold"
        >
          <span className="font-display font-bold text-cream">
            Conversar com a Jeruska
          </span>
          <span className="text-sm text-muted">
            Autorizar contato para uma conversa sobre o que apareceu aqui.
          </span>
        </button>
      </div>
    </div>
  );
}
