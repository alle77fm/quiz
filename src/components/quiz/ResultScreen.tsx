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
  respondidas: number;
  total: number;
  intencao: Intencao | null;
  onContinue: () => void;
};

/**
 * Tela 7 — Resultado (demonstrativo). Estrutura apenas: cada bloco de
 * texto se autodescreve como exemplo, para não se passar por conteúdo
 * final da psicóloga (docs/REPORT_COMPOSER.md ainda não implementado).
 */
export function ResultScreen({
  nome,
  mapa,
  forca,
  atencao,
  complementar,
  respondidas,
  total,
  intencao,
  onContinue,
}: ResultScreenProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber">
          Resultado demonstrativo · {respondidas}/{total} respostas
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
            Bloco de exemplo. No relatório final, este espaço traz uma
            reflexão personalizada sobre esta força, escrita pela Jeruska.
          </p>
        </div>

        <div className="rounded-xl border border-cream/15 bg-cream/[0.03] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber">
            Ponto de atenção — {atencao}
          </p>
          <p className="mt-1 text-sm text-muted">
            Bloco de exemplo. No relatório final, este espaço traz uma
            reflexão sobre o que pode merecer mais atenção agora.
          </p>
        </div>

        <div className="rounded-xl border border-cream/15 bg-cream/[0.03] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber">
            Dimensão complementar — {complementar}
          </p>
          <p className="mt-1 text-sm text-muted">
            Bloco de exemplo. No relatório final, este espaço complementa a
            leitura anterior sem repeti-la.
          </p>
        </div>
      </div>

      <p className="text-xs text-muted">
        Este resultado é uma demonstração de estrutura — nenhum conteúdo
        aqui foi escrito pela psicóloga.
      </p>

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
