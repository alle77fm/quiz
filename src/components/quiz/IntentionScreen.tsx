export type Intencao = "explorando" | "considerando" | "pronto_para_conversar";

const OPCOES: { id: Intencao; label: string }[] = [
  { id: "explorando", label: "Estou apenas explorando" },
  { id: "considerando", label: "Estou considerando terapia" },
  { id: "pronto_para_conversar", label: "Estou disponível para conversar" },
];

type IntentionScreenProps = {
  onSelect: (intencao: Intencao) => void;
};

export function IntentionScreen({ onSelect }: IntentionScreenProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-extrabold leading-tight text-cream sm:text-3xl">
        Em relação a iniciar terapia, onde você está agora?
      </h1>

      <div className="flex flex-col gap-3" role="radiogroup" aria-label="Intenção em relação à terapia">
        {OPCOES.map((opcao) => (
          <button
            key={opcao.id}
            type="button"
            role="radio"
            aria-checked="false"
            onClick={() => onSelect(opcao.id)}
            className="w-full min-h-14 rounded-xl border border-cream/15 bg-cream/[0.03] px-5 py-4 text-left text-base font-medium text-cream transition-colors hover:border-gold/50 hover:bg-cream/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
          >
            {opcao.label}
          </button>
        ))}
      </div>
    </div>
  );
}
