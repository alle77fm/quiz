/**
 * DADOS EXCLUSIVOS DE HOMOLOGAÇÃO — não é o motor oficial do relatório.
 *
 * A estrutura das 12 seções abaixo segue docs/REPORT_COMPOSER.md §2/§10
 * (cardinalidade e ordem de montagem fechadas). O TEXTO de cada seção,
 * porém, é estrutural e transparente: não afirma ter sido calculado a
 * partir de pesos ou pares de dimensão reais, porque o motor de
 * pontuação (docs/SCORING_MATRIX.md) ainda não existe. Nada aqui deve
 * ser tratado como redação da psicóloga nem como relatório final.
 *
 * Quando o motor oficial e o conteúdo aprovado por Jeruska estiverem
 * prontos, este arquivo deixa de ser importado por ReportScreen — ver
 * nota de substituição em cada função abaixo.
 */

import type { DemoQuestion } from "@/config/quiz/v1/homologacao/demo-questions";

export type PerfilMoradia = "sozinha" | "acompanhada";

export type EcoHomologacao = {
  comodo: string;
  texto: string;
};

/** Only true while the official scoring engine is not wired in — flips
 * to false (and the transparency note disappears) once it is. */
export const HOMOLOGACAO_ATIVA = true;

export const REPORT_NOTA_TRANSPARENCIA =
  "Esta visualização apresenta a estrutura que receberá seu relatório personalizado, escrito pela psicóloga responsável. Os textos abaixo ainda não derivam de um cálculo real das suas respostas.";

export function textoAbertura(nome: string): string {
  return nome
    ? `${nome}, este é o espaço reservado para o seu relatório.`
    : "Este é o espaço reservado para o seu relatório.";
}

export function textoMapa(mapa: string): string {
  return `Na versão final, este bloco vai apresentar o que o mapa "${mapa}" significa no seu percurso.`;
}

export function textoForca(dimensao: string): string {
  return `Na versão final, este espaço vai reunir os temas de ${dimensao} que apareceram com mais presença no seu percurso.`;
}

export function textoAtencao(dimensao: string): string {
  return `Na versão final, este espaço vai trazer o que observar com mais cuidado em ${dimensao}.`;
}

export function textoComplementar(dimensao: string): string {
  return `Na versão final, este espaço vai trazer um outro ângulo do seu percurso, em ${dimensao}, complementar aos anteriores.`;
}

const TEXTO_CONTEXTO_MORADIA: Record<PerfilMoradia, string> = {
  sozinha:
    "Na versão final, este espaço vai considerar o que significa, no seu percurso, viver só.",
  acompanhada:
    "Na versão final, este espaço vai considerar o que significa, no seu percurso, dividir a casa com outras pessoas.",
};

export function textoContextoMoradia(perfil: PerfilMoradia): string {
  return TEXTO_CONTEXTO_MORADIA[perfil];
}

/** Ecos de homologação: reflexo direto das próprias respostas da
 * participante (não interpretação clínica) — até 3, seguindo a ordem de
 * prioridade abaixo, pulando perguntas não respondidas. */
const ORDEM_PRIORIDADE_ECO = ["q02", "q07", "q15"] as const;

export function construirEcosHomologacao(
  respostas: Record<string, string>,
  perguntas: DemoQuestion[],
): EcoHomologacao[] {
  const ecos: EcoHomologacao[] = [];
  for (const questaoId of ORDEM_PRIORIDADE_ECO) {
    const questao = perguntas.find((p) => p.id === questaoId);
    const respostaId = respostas[questaoId];
    if (!questao || !respostaId) continue;
    const opcao = questao.opcoes.find((o) => o.id === respostaId);
    if (!opcao) continue;
    ecos.push({
      comodo: questao.comodo,
      texto: `Em ${questao.comodo}, você respondeu: "${opcao.label}".`,
    });
  }
  return ecos.slice(0, 3);
}

export function textoRotina(dimensao: string): string {
  return `Na versão final, este espaço vai descrever como ${dimensao} aparece no seu dia a dia.`;
}

export const REPORT_DIRECAO_TEXTO =
  "Na versão final, este espaço vai indicar um próximo passo possível, a partir do que você trouxe.";

export type Intencao = "explorando" | "considerando" | "pronto_para_conversar";

const TEXTO_CONVITE: Record<Intencao, string> = {
  explorando:
    "Na versão final, este espaço vai te convidar a continuar explorando, no seu tempo.",
  considerando:
    "Na versão final, este espaço vai te convidar a considerar uma conversa com a psicóloga responsável.",
  pronto_para_conversar:
    "Na versão final, este espaço vai te convidar diretamente a conversar com a psicóloga responsável.",
};

export function textoConvite(intencao: Intencao | null): string {
  if (!intencao) return TEXTO_CONVITE.explorando;
  return TEXTO_CONVITE[intencao];
}

export const REPORT_AVISO_ESCOPO =
  "Este conteúdo é estrutural e não constitui diagnóstico, tratamento ou orientação psicológica. Ele não substitui avaliação profissional.";
