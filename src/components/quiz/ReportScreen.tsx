import type { Intencao } from "@/components/quiz/IntentionScreen";
import {
  HOMOLOGACAO_ATIVA,
  REPORT_AVISO_ESCOPO,
  REPORT_DIRECAO_TEXTO,
  REPORT_NOTA_TRANSPARENCIA,
  textoAbertura,
  textoAtencao,
  textoComplementar,
  textoContextoMoradia,
  textoConvite,
  textoForca,
  textoMapa,
  textoRotina,
  type EcoHomologacao,
  type PerfilMoradia,
} from "@/config/quiz/v1/homologacao/report-homologacao";

type ReportScreenProps = {
  nome: string;
  mapa: string;
  forca: string;
  atencao: string;
  complementar: string;
  contextoMoradia: PerfilMoradia;
  ecos: EcoHomologacao[];
  intencao: Intencao | null;
  onContinue: () => void;
};

function Secao({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-cream/10 pt-6 first:border-t-0 first:pt-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber">
        {eyebrow}
      </p>
      <div className="mt-2 text-base leading-relaxed text-cream/90">
        {children}
      </div>
    </section>
  );
}

/**
 * Relatório de homologação — estrutura completa das 12 seções fechadas
 * em docs/REPORT_COMPOSER.md §2/§10, com textos transparentes (não
 * afirmam derivar de um cálculo real, porque o motor oficial de
 * pontuação ainda não existe). Rola verticalmente: não é uma tela de
 * resumo de 3 cards, é o espaço reservado para o relatório completo.
 */
export function ReportScreen({
  nome,
  mapa,
  forca,
  atencao,
  complementar,
  contextoMoradia,
  ecos,
  intencao,
  onContinue,
}: ReportScreenProps) {
  return (
    <div className="flex flex-col gap-8 pb-4">
      {HOMOLOGACAO_ATIVA && (
        <p className="rounded-lg border border-cream/10 bg-cream/[0.03] px-4 py-3 text-xs leading-relaxed text-muted">
          {REPORT_NOTA_TRANSPARENCIA}
        </p>
      )}

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber">
          Seu relatório
        </p>
        <h1 className="mt-1 font-display text-2xl font-extrabold leading-tight text-cream sm:text-3xl">
          {textoAbertura(nome)}
        </h1>
      </div>

      <Secao eyebrow={`Seu mapa — ${mapa}`}>
        <p>{textoMapa(mapa)}</p>
      </Secao>

      {ecos[0] && (
        <Secao eyebrow={`Um momento do seu percurso — ${ecos[0].comodo}`}>
          <p>{ecos[0].texto}</p>
        </Secao>
      )}

      <Secao eyebrow={`Força predominante — ${forca}`}>
        <p>{textoForca(forca)}</p>
      </Secao>

      <Secao eyebrow={`Ponto de atenção — ${atencao}`}>
        <p>{textoAtencao(atencao)}</p>
      </Secao>

      <Secao eyebrow={`Dimensão complementar — ${complementar}`}>
        <p>{textoComplementar(complementar)}</p>
      </Secao>

      {ecos[1] && (
        <Secao eyebrow={`Um outro momento — ${ecos[1].comodo}`}>
          <p>{ecos[1].texto}</p>
        </Secao>
      )}

      <Secao eyebrow="Contexto de moradia">
        <p>{textoContextoMoradia(contextoMoradia)}</p>
      </Secao>

      {ecos[2] && (
        <Secao eyebrow={`Mais um momento — ${ecos[2].comodo}`}>
          <p>{ecos[2].texto}</p>
        </Secao>
      )}

      <Secao eyebrow="Como aparece na rotina">
        <p>{textoRotina(forca)}</p>
      </Secao>

      <Secao eyebrow="Direção e encerramento">
        <p>{REPORT_DIRECAO_TEXTO}</p>
      </Secao>

      <Secao eyebrow="Convite">
        <p>{textoConvite(intencao)}</p>
      </Secao>

      <Secao eyebrow="Aviso de escopo">
        <p>{REPORT_AVISO_ESCOPO}</p>
      </Secao>

      <button
        type="button"
        onClick={onContinue}
        className="min-h-12 self-start rounded-xl bg-olive px-8 text-base font-semibold text-cream transition-colors hover:bg-olive-deep"
      >
        Deixar um feedback
      </button>
    </div>
  );
}
