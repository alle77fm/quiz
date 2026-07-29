import type { Intencao } from "@/components/quiz/IntentionScreen";

const INTENCAO_LABEL: Record<Intencao, string> = {
  explorando: "explorando",
  considerando: "considerando terapia",
  pronto_para_conversar: "pronta para conversar",
};

type ResultScreenProps = {
  nome: string;
  mapa: string;
  forca: string;
  atencao: string;
  complementar: string;
  intencao: Intencao | null;
  onContinue: () => void;
};

/**
 * Tela 7 — Resultado. Estrutura de homologação: os textos abaixo de
 * cada bloco são neutros e estruturais, não conteúdo aprovado pela
 * Jeruska (docs/REPORT_COMPOSER.md ainda não implementado). O
 * isolamento entre homologação e conteúdo oficial vive no código
 * (ver src/config/quiz/v1/homologacao/), não na tela — nada aqui se
 * anuncia como demonstração para quem está participando.
 */
export function ResultScreen({
  nome,
  mapa,
  forca,
  atencao,
  complementar,
  intencao,
  onContinue,
}: ResultScreenProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber">
          Seu mapa
        </p>
        <h1 className="font-display text-2xl font-extrabold leading-tight text-cream sm:text-3xl">
          {nome ? `${nome}, seu mapa` : "Seu mapa"}: {mapa}
        </h1>
        {intencao && (
          <p className="mt-1 text-sm text-muted">
            Você chega até aqui {INTENCAO_LABEL[intencao]}.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="rounded-xl border border-cream/15 bg-cream/[0.03] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber">
            Força predominante — {forca}
          </p>
          <p className="mt-1 text-sm text-muted">
            Um espaço para observar o que aparece com mais presença no seu
            percurso.
          </p>
        </div>

        <div className="rounded-xl border border-cream/15 bg-cream/[0.03] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber">
            Ponto de atenção — {atencao}
          </p>
          <p className="mt-1 text-sm text-muted">
            Um tema que talvez valha observar com mais cuidado agora.
          </p>
        </div>

        <div className="rounded-xl border border-cream/15 bg-cream/[0.03] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber">
            Dimensão complementar — {complementar}
          </p>
          <p className="mt-1 text-sm text-muted">
            Um outro ângulo do seu percurso, complementar ao anterior.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="min-h-12 rounded-xl bg-olive px-8 text-base font-semibold text-cream transition-colors hover:bg-olive-deep"
      >
        Deixar um feedback
      </button>
    </div>
  );
}
