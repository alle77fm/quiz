/**
 * Conteúdo exibível da Tela 0 (Fase 1A).
 *
 * Todo texto aqui é PROVISÓRIO — redigido para permitir a implementação
 * visual antes da redação final da psicóloga (ver docs/FINAL_SEQUENCE.md
 * §2.8 e docs/CONTENT_KIT.md). Nenhum destes textos deve ser tratado como
 * aprovado. Nenhum componente pode ter texto exibível hardcoded — tudo
 * vem daqui.
 */

export const tela0Content = {
  titulo: {
    valor: "Casa com Alma",
    status: "PROVISORIO" as const,
  },
  subtitulo: {
    valor: "Um percurso de quinze perguntas pelos ambientes de uma casa.",
    status: "PROVISORIO" as const,
  },
  estrutural: {
    valor: "15 perguntas",
    status: "PROVISORIO" as const,
  },
  escopo: {
    valor:
      "Isto não é um teste psicológico, não produz diagnóstico e não substitui avaliação profissional.",
    status: "PROVISORIO" as const,
  },
  transparencia: {
    valor:
      "Suas respostas são processadas para montar o resultado. Nada é armazenado antes da etapa final. No fim, você decide se quer guardar o resultado e se quer receber contato.",
    status: "PROVISORIO" as const,
  },
  cta: {
    valor: "Entrar na experiência",
    status: "PROVISORIO" as const,
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
