/**
 * Dados DEMONSTRATIVOS para viabilizar a navegação do quiz antes da
 * matriz oficial da Jeruska.
 *
 * O TEXTO das 15 perguntas e o nome dos cômodos são os já aprovados em
 * docs/QUIZ_CONTENT.md (seção 5.6 da especificação original) — não
 * foram inventados aqui.
 *
 * As ALTERNATIVAS abaixo são estrutura de demonstração, não conteúdo
 * final: não têm peso, não pontuam para nenhuma dimensão, e não devem
 * ser tratadas como redação da psicóloga. Serão substituídas
 * integralmente pela matriz oficial (docs/SCORING_MATRIX.md,
 * docs/QUIZ_CONTENT.md) antes do lançamento.
 */

export type DemoOption = {
  id: string;
  label: string;
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

export const DEMO_QUESTIONS: DemoQuestion[] = [
  {
    id: "q01",
    comodo: "Contexto",
    texto: "Com quem você mora atualmente?",
    opcoes: [
      { id: "so", label: "Vivo só" },
      { id: "parceiro", label: "Vivo com parceiro(a)" },
      { id: "familia", label: "Vivo com família" },
      { id: "outras", label: "Vivo com outras pessoas" },
    ],
  },
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
    opcoes: escalaPadrao,
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
  {
    id: "q12",
    comodo: "Quarto",
    texto: "Como percebe a proximidade emocional em sua vida?",
    opcoes: [
      { id: "muito-proxima", label: "Muito próxima" },
      { id: "razoavel", label: "Razoavelmente próxima" },
      { id: "distante", label: "Distante" },
      { id: "muito-distante", label: "Muito distante" },
    ],
  },
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
    opcoes: [
      { id: "espaco", label: "Sim, um espaço" },
      { id: "assunto", label: "Sim, um assunto" },
      { id: "as-vezes", label: "Às vezes" },
      { id: "nao", label: "Não" },
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

/** Nomes de mapa já fechados em docs/SCORING_MATRIX.md §1 — apenas o
 * identificador estrutural, sem descrição de conteúdo. */
export const DEMO_MAPA_PRINCIPAL = "Casa-Refúgio";

export const DEMO_DIMENSOES = {
  forca: "Acolhimento",
  atencao: "Movimento",
  complementar: "Vínculos",
} as const;
