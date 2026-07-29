/**
 * Matriz inicial de validação comercial do MVP — ecos das respostas.
 *
 * Cada eco reformula o sentido da alternativa escolhida (nunca repete o
 * label literalmente) em segunda pessoa, mencionando o cômodo quando
 * ajuda a localizar a cena. Não é interpretação clínica: apenas devolve
 * à participante, com outras palavras, o que ela já indicou. `q01` não
 * gera eco (contexto, não conteúdo — mesma regra de
 * docs/QUIZ_CONTENT.md §4.1); `q15` também não, pois alimenta somente a
 * direção do relatório.
 */

import type { DemoQuestion } from "@/config/quiz/v1/homologacao/demo-questions";
import type { Dimension } from "@/config/quiz/mvp/dimensions";

type EcoTexto = Record<string, Record<string, string>>;

const ECOS_POR_PERGUNTA: EcoTexto = {
  q02: {
    alivio: "chegar em casa costuma trazer um alívio perceptível",
    cansaco: "chegar em casa costuma vir acompanhado de cansaço",
    indiferenca: "chegar em casa não costuma despertar uma sensação forte, num sentido ou no outro",
    agitacao: "chegar em casa costuma vir com uma certa agitação, ainda difícil de assentar",
  },
  q04: {
    sempre: "seu espaço e seus limites costumam ser respeitados",
    maioria: "na maior parte do tempo, seu espaço e seus limites são respeitados",
    "as-vezes": "o respeito ao seu espaço e aos seus limites varia bastante",
    "quase-nunca": "sentir seu espaço e seus limites respeitados ainda é raro",
  },
  q05: {
    "muito-a-vontade": "nos momentos de convivência, você costuma se sentir muito à vontade",
    "confortavel-maior-parte": "nos momentos de convivência, você costuma encontrar algum conforto, ainda que essa sensação possa variar",
    "pouco-desconfortavel": "nos momentos de convivência, um certo desconforto aparece com alguma frequência",
    "frequentemente-desconfortavel": "os momentos de convivência costumam trazer desconforto com frequência",
  },
  q06: {
    conversam: "quando algo incomoda, a conversa aberta costuma ser o caminho encontrado",
    evitam: "quando algo incomoda, o assunto costuma ser evitado",
    discutem: "quando algo incomoda, a discussão até resolver costuma ser o caminho encontrado",
    sozinho: "quando algo incomoda, cada um costuma lidar com isso sozinho",
  },
  q07: {
    sempre: "você costuma sentir que pode falar e ser realmente ouvido",
    maioria: "na maior parte do tempo, você sente que pode falar e ser ouvido",
    "as-vezes": "sentir que pode falar e ser realmente ouvido ainda varia",
    "quase-nunca": "sentir que pode falar e ser realmente ouvido ainda é raro",
  },
  q08: {
    sempre: "as responsabilidades da casa costumam ser divididas de forma equilibrada",
    maioria: "na maior parte do tempo, a divisão das responsabilidades da casa é equilibrada",
    "as-vezes": "o equilíbrio na divisão das responsabilidades da casa varia",
    "quase-nunca": "a divisão das responsabilidades da casa ainda não costuma ser equilibrada",
  },
  q09: {
    tempo: "no espaço pessoal, o que mais parece faltar é tempo livre",
    conversa: "no espaço pessoal, o que mais parece faltar é conversa",
    silencio: "no espaço pessoal, o que mais parece faltar é silêncio",
    ajuda: "no espaço pessoal, o que mais parece faltar é ajuda",
  },
  q10: {
    sempre: "seu quarto costuma permitir que você realmente descanse",
    maioria: "na maior parte do tempo, seu quarto permite algum descanso",
    "as-vezes": "descansar de verdade no seu quarto ainda varia",
    "quase-nunca": "descansar de verdade no seu quarto ainda é raro",
  },
  q11: {
    sempre: "você costuma conseguir parar sem sentir culpa",
    maioria: "na maior parte do tempo, você consegue parar sem culpa",
    "as-vezes": "parar sem sentir culpa ainda varia bastante",
    "quase-nunca": "parar sem sentir culpa ainda é raro",
  },
  q12a: {
    "muito-proxima": "mesmo morando só, a proximidade emocional com quem está por perto tem se mostrado forte",
    razoavel: "mesmo morando só, a proximidade emocional com quem está por perto é razoável",
    distante: "morando só, a proximidade emocional com quem está por perto tem parecido distante",
    "muito-distante": "morando só, a proximidade emocional com quem está por perto tem parecido bem distante",
  },
  q12b: {
    "muito-proxima": "nas relações da casa, a proximidade emocional tem se mostrado forte",
    razoavel: "nas relações da casa, a proximidade emocional é razoável",
    distante: "nas relações da casa, a proximidade emocional tem parecido distante",
    "muito-distante": "nas relações da casa, a proximidade emocional tem parecido bem distante",
  },
  q13: {
    sempre: "você costuma encontrar tempo e espaço para cuidar de si",
    maioria: "na maior parte do tempo, você encontra espaço para cuidar de si",
    "as-vezes": "encontrar tempo para cuidar de si ainda varia",
    "quase-nunca": "encontrar tempo para cuidar de si ainda é raro",
  },
  q14: {
    espaco: "existe um espaço da casa que costuma ser evitado",
    objeto: "existe um objeto da casa que costuma ser evitado",
    assunto: "existe um assunto da casa que costuma ser evitado",
    nenhum: "não parece haver espaço, objeto ou assunto que precise ser evitado",
  },
};

/** Cada pergunta com eco tem uma dimensão principal — usada para
 * decidir quais ecos são mais relevantes para o resultado desta
 * participante (mesmas dimensões de weights.ts, coluna principal). */
const DIMENSAO_PRINCIPAL_POR_PERGUNTA: Record<string, Dimension> = {
  q02: "acolhimento",
  q04: "limites",
  q05: "vinculos",
  q06: "reciprocidade",
  q07: "reciprocidade",
  q08: "reciprocidade",
  q09: "movimento",
  q10: "autocuidado",
  q11: "autocuidado",
  q12a: "vinculos",
  q12b: "vinculos",
  q13: "autocuidado",
  q14: "limites",
};

export type EcoPersonalizado = { comodo: string; texto: string };

/**
 * Seleciona até 3 ecos, priorizando perguntas cuja dimensão principal
 * coincide com o eixo do mapa, a força predominante ou a dimensão
 * complementar do resultado — e, entre empatadas, cômodos distintos e
 * ordem crescente de id de pergunta (mesmo critério de desempate do
 * restante do motor).
 */
export function selecionarEcos(
  respostas: Record<string, string>,
  perguntas: DemoQuestion[],
  dimensoesRelevantes: Dimension[],
): EcoPersonalizado[] {
  const candidatos: { id: string; comodo: string; texto: string; prioridade: number }[] = [];

  for (const questao of perguntas) {
    const respostaId = respostas[questao.id];
    const textos = ECOS_POR_PERGUNTA[questao.id];
    const dimensaoPrincipal = DIMENSAO_PRINCIPAL_POR_PERGUNTA[questao.id];
    if (!respostaId || !textos || !dimensaoPrincipal) continue;
    const texto = textos[respostaId];
    if (!texto) continue;

    const indice = dimensoesRelevantes.indexOf(dimensaoPrincipal);
    if (indice === -1) continue;

    candidatos.push({ id: questao.id, comodo: questao.comodo, texto, prioridade: indice });
  }

  candidatos.sort((a, b) => a.prioridade - b.prioridade || a.id.localeCompare(b.id));

  const selecionados: EcoPersonalizado[] = [];
  const comodosUsados = new Set<string>();
  for (const candidato of candidatos) {
    if (selecionados.length >= 3) break;
    if (comodosUsados.has(candidato.comodo)) continue;
    selecionados.push({ comodo: candidato.comodo, texto: candidato.texto });
    comodosUsados.add(candidato.comodo);
  }

  // Se cômodos distintos não renderam 3 ecos, completa com o que sobrar.
  for (const candidato of candidatos) {
    if (selecionados.length >= 3) break;
    if (selecionados.some((e) => e.texto === candidato.texto)) continue;
    selecionados.push({ comodo: candidato.comodo, texto: candidato.texto });
  }

  return selecionados.slice(0, 3);
}
