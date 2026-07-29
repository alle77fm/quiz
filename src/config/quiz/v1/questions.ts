/**
 * CONFIGURAÇÃO OFICIAL — INCOMPLETA. NÃO É IMPORTADA POR NENHUMA TELA.
 *
 * Este é o destino final do conteúdo aprovado pela Jeruska, quando a
 * matriz oficial (docs/SCORING_MATRIX.md, docs/QUIZ_CONTENT.md) estiver
 * pronta. Até lá, o quiz roda inteiramente sobre dados de homologação
 * em `src/config/quiz/v1/homologacao/demo-questions.ts` — este arquivo
 * aqui não alimenta nenhuma tela.
 *
 * Os TEXTOS das perguntas abaixo já são os aprovados
 * (docs/QUIZ_CONTENT.md §5.6) — podem ficar. As ALTERNATIVAS
 * (`opcoes`) estão deliberadamente vazias: pesos, labels e
 * `reportEcho` são `[PENDENTE · JERUSKA]` e não devem ser preenchidos
 * aqui por quem não for a psicóloga responsável.
 *
 * Quando a matriz oficial estiver pronta:
 *   1. preencher `opcoes` de cada pergunta com o conteúdo aprovado;
 *   2. trocar a importação em `src/app/quiz/QuizFlow.tsx` de
 *      `homologacao/demo-questions` para este arquivo;
 *   3. remover a pasta `homologacao/`.
 */

export type OfficialOption = {
  id: string;
  label: string;
  reportEcho: string | null;
  weights: Partial<Record<string, number>>;
  eligibleForEcho: boolean;
};

export type OfficialQuestion = {
  id: string;
  comodo: string;
  texto: string;
  /** [PENDENTE · JERUSKA] — vazio até a matriz oficial ser aprovada. */
  opcoes: OfficialOption[];
};

export const OFFICIAL_QUESTIONS: OfficialQuestion[] = [
  { id: "q01", comodo: "Contexto", texto: "Com quem você mora atualmente?", opcoes: [] },
  { id: "q02", comodo: "Contexto", texto: "Ao chegar em casa, qual sensação aparece primeiro?", opcoes: [] },
  { id: "q03", comodo: "Porta de entrada", texto: "Você consegue deixar as preocupações do lado de fora?", opcoes: [] },
  { id: "q04", comodo: "Porta de entrada", texto: "Sente que seu espaço e seus limites são respeitados?", opcoes: [] },
  { id: "q05", comodo: "Sala", texto: "Como você se sente nos momentos de convivência?", opcoes: [] },
  { id: "q06", comodo: "Sala", texto: "Quando algo incomoda, como as pessoas costumam lidar?", opcoes: [] },
  { id: "q07", comodo: "Sala", texto: "Você sente que pode falar e ser realmente ouvido?", opcoes: [] },
  { id: "q08", comodo: "Cozinha", texto: "As responsabilidades da casa são divididas de forma equilibrada?", opcoes: [] },
  { id: "q09", comodo: "Cozinha", texto: "O que mais parece estar faltando na rotina da casa?", opcoes: [] },
  { id: "q10", comodo: "Quarto", texto: "Seu quarto permite que você realmente descanse?", opcoes: [] },
  { id: "q11", comodo: "Quarto", texto: "Você consegue parar sem sentir culpa?", opcoes: [] },
  // q12a/q12b: enunciados próprios ainda [PENDENTE · JERUSKA] (docs/QUIZ_CONTENT.md §2).
  { id: "q12a", comodo: "Quarto", texto: "", opcoes: [] },
  { id: "q12b", comodo: "Quarto", texto: "", opcoes: [] },
  { id: "q13", comodo: "Espaço pessoal", texto: "Você encontra tempo e espaço para cuidar de si?", opcoes: [] },
  { id: "q14", comodo: "Espaço pessoal", texto: "Existe algum espaço, objeto ou assunto da casa que você evita?", opcoes: [] },
  { id: "q15", comodo: "Janela", texto: "O que você gostaria de sentir mais dentro de sua casa e dentro de você?", opcoes: [] },
];
