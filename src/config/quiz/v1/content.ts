/**
 * Conteúdo exibível da Tela 0 (Fase 1A, redesign visual dark/gold).
 *
 * A copy da Tela 0 está aprovada. Nenhum componente pode ter texto
 * exibível hardcoded — tudo vem daqui.
 *
 * Divergências deliberadas em relação à copy sugerida no redesign,
 * para manter conformidade com docs/FINAL_SEQUENCE.md (não alterado
 * nesta tarefa):
 *  - "estrutural" não inclui estimativa de duração ("poucos minutos") —
 *    proibido em FINAL_SEQUENCE.md §2.5.
 *  - "descricao" evita enumerar as dimensões do percurso por nome
 *    (cuidado/vínculos/limites/etc.) — mantém o sentido emocional sem
 *    expor a estrutura interna de pontuação.
 *  - "transparencia" incorpora o aviso de escopo ("não é um teste
 *    psicológico"), exigido por FINAL_SEQUENCE.md §2.4 mas ausente da
 *    copy sugerida — dobrado ali por instrução explícita do próprio
 *    documento ("deve ficar contido... na nota de transparência").
 */

export const tela0Content = {
  marca: {
    valor: "Casa com Alma",
    status: "APROVADO" as const,
  },
  assinatura: {
    valor: "Um passeio pela sua casa. Um encontro com você.",
    status: "APROVADO" as const,
  },
  headline: {
    valor: "Sua casa guarda histórias.",
    valorLinha2: "Algumas delas também vivem dentro de você.",
    status: "APROVADO" as const,
  },
  descricao: {
    valor:
      "Percorra os ambientes que fazem parte da sua rotina e receba um mapa reflexivo sobre o que esse momento revela sobre você.",
    status: "APROVADO" as const,
  },
  estrutural: {
    valor: "15 perguntas",
    status: "APROVADO" as const,
  },
  transparencia: {
    valor:
      "Suas respostas serão processadas temporariamente para montar o seu mapa. Nada será armazenado antes da etapa final. Isto não é um teste psicológico nem substitui avaliação profissional.",
    status: "APROVADO" as const,
  },
  cta: {
    valor: "Entrar na experiência",
    status: "APROVADO" as const,
  },
  ctaAuxiliar: {
    valor: "Não existem respostas certas ou erradas.",
    status: "APROVADO" as const,
  },
} as const;

export const quizEsperaContent = {
  espera: {
    valor:
      "Esta etapa está sendo preparada para a próxima rodada de homologação.",
    status: "PROVISORIO" as const,
  },
  retorno: {
    valor: "Voltar ao início",
    status: "PROVISORIO" as const,
  },
} as const;
