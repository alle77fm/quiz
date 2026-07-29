import type { Intencao } from "@/components/quiz/IntentionScreen";
import type { ScoreSnapshot } from "@/config/quiz/mvp/engine";
import { nomeMapa, textoMapa } from "@/config/quiz/mvp/report-content";
import type { MapaId } from "@/config/quiz/mvp/mapas";
import { DIMENSAO_LABEL } from "@/config/quiz/mvp/dimensions";
import {
  ctaConvite,
  textoAbertura,
  textoAtencao,
  textoChegada,
  textoComplementar,
  textoContextoMoradia,
  textoConvite,
  textoDirecao,
  textoForca,
  textoReflexao,
  textoRotina,
  TEXTO_AVISO_ESCOPO,
  type PerfilMoradia,
} from "@/config/quiz/mvp/report-content";
import type { EcoPersonalizado } from "@/config/quiz/mvp/ecos";

type ReportScreenProps = {
  nome: string;
  mapaId: MapaId;
  score: ScoreSnapshot;
  contextoMoradia: PerfilMoradia;
  ecos: EcoPersonalizado[];
  q15Label?: string;
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
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber">
        <span aria-hidden="true" className="text-[10px] text-gold">
          ◆
        </span>
        {eyebrow}
      </p>
      <div className="mt-2 text-base leading-relaxed text-cream/90">
        {children}
      </div>
    </section>
  );
}

function EcoDestaque({ eco }: { eco: EcoPersonalizado }) {
  return (
    <div className="rounded-r-lg border-l-2 border-gold bg-cream/[0.03] py-2 pl-4 pr-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber">
        {eco.comodo}
      </p>
      <p className="mt-1 text-base italic leading-relaxed text-cream/90">
        {eco.texto.charAt(0).toUpperCase() + eco.texto.slice(1)}.
      </p>
    </div>
  );
}

/**
 * Relatório do MVP — estrutura completa das 12 famílias de bloco de
 * docs/REPORT_COMPOSER.md §2/§10, com conteúdo derivado do
 * `ScoreSnapshot` real (src/config/quiz/mvp/engine.ts): mapa, força,
 * atenção, complementar e ecos variam de fato conforme as respostas.
 * A REDAÇÃO de cada bloco é matriz inicial do MVP, não a redação
 * definitiva da psicóloga (ver comentários em
 * src/config/quiz/mvp/report-content.ts).
 */
export function ReportScreen({
  nome,
  mapaId,
  score,
  contextoMoradia,
  ecos,
  q15Label,
  intencao,
  onContinue,
}: ReportScreenProps) {
  const { forcaPredominante, pontoDeAtencao, dimensaoComplementar } = score;

  return (
    <div className="flex flex-col gap-8 pb-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber">
          Seu relatório
        </p>
        <h1 className="mt-1 font-display text-2xl font-extrabold leading-tight text-cream sm:text-3xl">
          {textoAbertura(nome)}
        </h1>
        <p className="mt-1 text-sm text-muted">{textoChegada(intencao)}</p>
      </div>

      <Secao eyebrow={`Seu mapa — ${nomeMapa(mapaId)}`}>
        <p>{textoMapa(mapaId)}</p>
      </Secao>

      {ecos[0] && <EcoDestaque eco={ecos[0]} />}

      <Secao eyebrow={`Força predominante — ${DIMENSAO_LABEL[forcaPredominante]}`}>
        <p>{textoForca(forcaPredominante)}</p>
      </Secao>

      <Secao eyebrow={`Ponto de atenção — ${DIMENSAO_LABEL[pontoDeAtencao]}`}>
        <p>{textoAtencao(pontoDeAtencao)}</p>
      </Secao>

      <Secao eyebrow={`Dimensão complementar — ${DIMENSAO_LABEL[dimensaoComplementar]}`}>
        <p>{textoComplementar(dimensaoComplementar)}</p>
      </Secao>

      {ecos[1] && <EcoDestaque eco={ecos[1]} />}

      <Secao eyebrow="Contexto de moradia">
        <p>{textoContextoMoradia(contextoMoradia)}</p>
      </Secao>

      {ecos[2] && <EcoDestaque eco={ecos[2]} />}

      <Secao eyebrow="Como aparece na rotina">
        <p>{textoRotina(forcaPredominante)}</p>
      </Secao>

      <Secao eyebrow="Direção e encerramento">
        <p>{textoDirecao(q15Label)}</p>
      </Secao>

      <Secao eyebrow="Uma pergunta para levar com você">
        <p>{textoReflexao(pontoDeAtencao)}</p>
      </Secao>

      <Secao eyebrow="Convite">
        <p>{textoConvite(intencao)}</p>
        <button
          type="button"
          onClick={onContinue}
          className="mt-4 min-h-12 w-full rounded-xl bg-gold px-8 text-base font-semibold text-ink transition-colors hover:bg-amber sm:w-auto"
        >
          {ctaConvite(intencao)}
        </button>
      </Secao>

      <Secao eyebrow="Aviso de escopo">
        <p>{TEXTO_AVISO_ESCOPO}</p>
      </Secao>

      <div className="flex flex-col items-start gap-4 border-t border-cream/10 pt-6">
        <p className="text-sm text-muted">Jeruska Maciel · Psicóloga</p>
        <button
          type="button"
          onClick={onContinue}
          className="min-h-12 rounded-xl bg-olive px-8 text-base font-semibold text-cream transition-colors hover:bg-olive-deep"
        >
          Deixar um feedback
        </button>
      </div>
    </div>
  );
}
