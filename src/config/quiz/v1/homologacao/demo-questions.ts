/**
 * DADOS EXCLUSIVOS DE HOMOLOGAÇÃO — não é a configuração oficial.
 *
 * Este arquivo existe só para viabilizar a navegação do quiz antes da
 * matriz oficial da Jeruska. A configuração oficial (ainda incompleta)
 * vive em `src/config/quiz/v1/questions.ts` — quando ela estiver
 * completa, este arquivo deixa de ser importado e pode ser removido.
 *
 * O TEXTO das 15 perguntas e o nome dos cômodos são os já aprovados em
 * docs/QUIZ_CONTENT.md (seção 5.6 da especificação original) — não
 * foram inventados aqui. Os enunciados de q12a/q12b também refletem a
 * pergunta aprovada, apenas ajustados ao contexto de cada variante.
 *
 * As ALTERNATIVAS abaixo (labels) são estrutura de homologação, não
 * conteúdo final da psicóloga — serão substituídas integralmente pela
 * matriz oficial (docs/SCORING_MATRIX.md, docs/QUIZ_CONTENT.md) antes
 * do lançamento. Os PESOS que cada alternativa carrega para o motor de
 * demonstração comercial vivem à parte, em
 * `src/config/quiz/mvp/weights.ts` — este arquivo aqui nunca declara
 * peso, só navegação (id, texto, cômodo, label).
 *
 * Nenhum destes textos deve aparecer marcado como aprovado em nenhum
 * outro lugar do código.
 */

export type DemoOption = {
  id: string;
  label: string;
  /** Presente apenas nas alternativas de q01 — usado para decidir a
   * bifurcação estrutural q12a/q12b (docs/QUIZ_CONTENT.md §6). */
  perfilMoradia?: "sozinha" | "acompanhada";
};

export type DemoQuestion = {
  id: string;
  comodo: string;
  texto: string;
  opcoes: DemoOption[];
};

const escalaPadrao: DemoOption[] = [
  { id: "sempre", label: "Sim, sempre" },
  { id: "maioria", label: "Na maioria das vezes" },
  { id: "as-vezes", label: "Às vezes" },
  { id: "quase-nunca", label: "Quase nunca" },
];

export const DEMO_Q01: DemoQuestion = {
  id: "q01",
  comodo: "Contexto",
  texto: "Com quem você mora atualmente?",
  opcoes: [
    { id: "so", label: "Vivo só", perfilMoradia: "sozinha" },
    { id: "parceiro", label: "Vivo com parceiro ou parceira", perfilMoradia: "acompanhada" },
    { id: "familia", label: "Vivo com família", perfilMoradia: "acompanhada" },
    { id: "outras", label: "Vivo com outras pessoas", perfilMoradia: "acompanhada" },
  ],
};

/** q02–q11, ordem fixa — nenhuma depende da resposta de q01. */
export const DEMO_QUESTIONS_MEIO: DemoQuestion[] = [
  {
    id: "q02",
    comodo: "Contexto",
    texto: "Ao chegar em casa, qual sensação aparece primeiro?",
    opcoes: [
      { id: "alivio", label: "Alívio" },
      { id: "cansaco", label: "Cansaço" },
      { id: "indiferenca", label: "Indiferença" },
      { id: "agitacao", label: "Agitação" },
    ],
  },
  {
    id: "q03",
    comodo: "Porta de entrada",
    texto: "Você consegue deixar as preocupações do lado de fora?",
    opcoes: escalaPadrao,
  },
  {
    id: "q04",
    comodo: "Porta de entrada",
    texto: "Sente que seu espaço e seus limites são respeitados?",
    opcoes: escalaPadrao,
  },
  {
    id: "q05",
    comodo: "Sala",
    texto: "Como você se sente nos momentos de convivência?",
    // Escala própria (não escalaPadrao): a pergunta pede um estado, não uma
    // frequência — reaproveitar a escala de frequência aqui respondia
    // gramaticalmente errado ao enunciado.
    opcoes: [
      { id: "muito-a-vontade", label: "Muito à vontade" },
      { id: "confortavel-maior-parte", label: "Na maior parte do tempo, confortável" },
      { id: "pouco-desconfortavel", label: "Um pouco desconfortável" },
      { id: "frequentemente-desconfortavel", label: "Frequentemente desconfortável" },
    ],
  },
  {
    id: "q06",
    comodo: "Sala",
    texto: "Quando algo incomoda, como as pessoas costumam lidar?",
    opcoes: [
      { id: "conversam", label: "Conversam abertamente" },
      { id: "evitam", label: "Evitam o assunto" },
      { id: "discutem", label: "Discutem até resolver" },
      { id: "sozinho", label: "Cada um lida sozinho" },
    ],
  },
  {
    id: "q07",
    comodo: "Sala",
    texto: "Você sente que pode falar e ser realmente ouvido?",
    opcoes: escalaPadrao,
  },
  {
    id: "q08",
    comodo: "Cozinha",
    texto: "As responsabilidades da casa são divididas de forma equilibrada?",
    opcoes: escalaPadrao,
  },
  {
    id: "q09",
    comodo: "Cozinha",
    texto: "O que mais parece estar faltando na rotina da casa?",
    opcoes: [
      { id: "tempo", label: "Mais tempo livre" },
      { id: "conversa", label: "Mais conversa" },
      { id: "silencio", label: "Mais silêncio" },
      { id: "ajuda", label: "Mais ajuda" },
    ],
  },
  {
    id: "q10",
    comodo: "Quarto",
    texto: "Seu quarto permite que você realmente descanse?",
    opcoes: escalaPadrao,
  },
  {
    id: "q11",
    comodo: "Quarto",
    texto: "Você consegue parar sem sentir culpa?",
    opcoes: escalaPadrao,
  },
];

/** Bifurcação estrutural real: apenas uma das duas aparece por percurso. */
export const DEMO_Q12A: DemoQuestion = {
  id: "q12a",
  comodo: "Quarto",
  texto: "Morando só, como você percebe a proximidade emocional na sua vida hoje?",
  opcoes: [
    { id: "muito-proxima", label: "Muito próxima" },
    { id: "razoavel", label: "Razoavelmente próxima" },
    { id: "distante", label: "Distante" },
    { id: "muito-distante", label: "Muito distante" },
  ],
};

export const DEMO_Q12B: DemoQuestion = {
  id: "q12b",
  comodo: "Quarto",
  texto: "Nas relações da sua casa, como percebe a proximidade emocional hoje?",
  opcoes: [
    { id: "muito-proxima", label: "Muito próxima" },
    { id: "razoavel", label: "Razoavelmente próxima" },
    { id: "distante", label: "Distante" },
    { id: "muito-distante", label: "Muito distante" },
  ],
};

/** q13–q15, ordem fixa. */
export const DEMO_QUESTIONS_FIM: DemoQuestion[] = [
  {
    id: "q13",
    comodo: "Espaço pessoal",
    texto: "Você encontra tempo e espaço para cuidar de si?",
    opcoes: escalaPadrao,
  },
  {
    id: "q14",
    comodo: "Espaço pessoal",
    texto: "Existe algum espaço, objeto ou assunto da casa que você evita?",
    // Escala corrigida: as quatro alternativas usam o mesmo critério
    // (categoria do que é evitado), sem misturar com frequência, e cobrem
    // as três categorias citadas no enunciado ("espaço, objeto ou
    // assunto") mais a ausência de evitação.
    opcoes: [
      { id: "espaco", label: "Evito principalmente um espaço" },
      { id: "objeto", label: "Evito principalmente um objeto" },
      { id: "assunto", label: "Evito principalmente um assunto" },
      { id: "nenhum", label: "Não percebo algo que evite" },
    ],
  },
  {
    id: "q15",
    comodo: "Janela",
    texto:
      "O que você gostaria de sentir mais dentro de sua casa e dentro de você?",
    opcoes: [
      { id: "paz", label: "Paz" },
      { id: "leveza", label: "Leveza" },
      { id: "uniao", label: "União" },
      { id: "seguranca", label: "Segurança" },
    ],
  },
];

export const DEMO_TOTAL_PERGUNTAS = 15;
