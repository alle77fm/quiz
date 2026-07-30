/**
 * Matriz inicial de validação comercial do MVP — pesos por alternativa.
 *
 * Isolada de `src/config/quiz/v1/homologacao/demo-questions.ts` de
 * propósito: aquele arquivo só resolve navegação (qual pergunta/opção
 * aparece); este arquivo é o único lugar onde peso vira número. As seis
 * definições de dimensão já são aprovadas pela Jeruska
 * (docs/SCORING_MATRIX.md §1.1) — o que continua pendente aqui é a
 * tabela pergunta→dimensão completa e os pesos concretos em si, ambos
 * ainda não aprovados por ela. Este é o motor inicial que permite uma
 * demonstração comercial com variação real, substituível peça por peça
 * quando a matriz oficial chegar.
 *
 * Faixa fechada: -2 a 2 (docs/SCORING_MATRIX.md §3). q01 conta para o
 * score (mesma fonte, §5); q15 nunca conta (usado só para a direção do
 * relatório). q12a e q12b compartilham a mesma tabela de peso — só uma
 * das duas é respondida por percurso.
 *
 * q02 (principal acolhimento / secundária autocuidado) e q03 (principal
 * limites / secundária autocuidado) seguem a classificação já recebida.
 * As demais são matriz inicial própria, coerente com o enunciado de
 * cada pergunta, aguardando calibração.
 */

import type { Dimension } from "@/config/quiz/mvp/dimensions";

export type PesosOpcao = Partial<Record<Dimension, number>>;
export type PesosPergunta = Record<string, PesosOpcao>;

export const MVP_PESOS: Record<string, PesosPergunta> = {
  q01: {
    so: { vinculos: 0, reciprocidade: 0 },
    parceiro: { vinculos: 2, reciprocidade: 1 },
    familia: { vinculos: 1, reciprocidade: 1 },
    outras: { vinculos: 1, reciprocidade: 0 },
  },
  q02: {
    alivio: { acolhimento: 2, autocuidado: 1 },
    cansaco: { acolhimento: -1, autocuidado: -2 },
    indiferenca: { acolhimento: -2, autocuidado: 0 },
    agitacao: { acolhimento: -1, autocuidado: -1 },
  },
  q03: {
    sempre: { limites: 2, autocuidado: 1 },
    maioria: { limites: 1, autocuidado: 1 },
    "as-vezes": { limites: -1, autocuidado: 0 },
    "quase-nunca": { limites: -2, autocuidado: -1 },
  },
  q04: {
    sempre: { limites: 2, vinculos: 1 },
    maioria: { limites: 1, vinculos: 1 },
    "as-vezes": { limites: -1, vinculos: 0 },
    "quase-nunca": { limites: -2, vinculos: -1 },
  },
  q05: {
    "muito-a-vontade": { vinculos: 2, reciprocidade: 1 },
    "confortavel-maior-parte": { vinculos: 1, reciprocidade: 1 },
    "pouco-desconfortavel": { vinculos: -1, reciprocidade: 0 },
    "frequentemente-desconfortavel": { vinculos: -2, reciprocidade: -1 },
  },
  q06: {
    conversam: { reciprocidade: 2, limites: 1 },
    evitam: { reciprocidade: -1, limites: -1 },
    discutem: { reciprocidade: 1, limites: -1 },
    sozinho: { reciprocidade: -2, limites: 0 },
  },
  q07: {
    sempre: { reciprocidade: 2, acolhimento: 1 },
    maioria: { reciprocidade: 1, acolhimento: 1 },
    "as-vezes": { reciprocidade: -1, acolhimento: 0 },
    "quase-nunca": { reciprocidade: -2, acolhimento: -1 },
  },
  q08: {
    sempre: { reciprocidade: 2, acolhimento: 1 },
    maioria: { reciprocidade: 1, acolhimento: 1 },
    "as-vezes": { reciprocidade: -1, acolhimento: 0 },
    "quase-nunca": { reciprocidade: -2, acolhimento: -1 },
  },
  q09: {
    tempo: { movimento: 0, autocuidado: -2 },
    conversa: { movimento: 1, autocuidado: -1 },
    silencio: { movimento: -1, autocuidado: -1 },
    ajuda: { movimento: 1, autocuidado: -2 },
  },
  q10: {
    sempre: { autocuidado: 2, acolhimento: 1 },
    maioria: { autocuidado: 1, acolhimento: 1 },
    "as-vezes": { autocuidado: -1, acolhimento: 0 },
    "quase-nunca": { autocuidado: -2, acolhimento: -1 },
  },
  q11: {
    sempre: { autocuidado: 2, limites: 1 },
    maioria: { autocuidado: 1, limites: 1 },
    "as-vezes": { autocuidado: -1, limites: 0 },
    "quase-nunca": { autocuidado: -2, limites: -1 },
  },
  q12a: {
    "muito-proxima": { vinculos: 2, movimento: 1 },
    razoavel: { vinculos: 1, movimento: 0 },
    distante: { vinculos: -1, movimento: -1 },
    "muito-distante": { vinculos: -2, movimento: -1 },
  },
  q12b: {
    "muito-proxima": { vinculos: 2, movimento: 1 },
    razoavel: { vinculos: 1, movimento: 0 },
    distante: { vinculos: -1, movimento: -1 },
    "muito-distante": { vinculos: -2, movimento: -1 },
  },
  q13: {
    sempre: { autocuidado: 2, movimento: 1 },
    maioria: { autocuidado: 1, movimento: 1 },
    "as-vezes": { autocuidado: -1, movimento: 0 },
    "quase-nunca": { autocuidado: -2, movimento: -1 },
  },
  q14: {
    espaco: { limites: -1, movimento: -1 },
    objeto: { limites: -1, movimento: -1 },
    assunto: { limites: -2, movimento: -1 },
    nenhum: { limites: 2, movimento: 1 },
  },
};

/** q15 nunca pontua (docs/SCORING_MATRIX.md §5) — usado só para a
 * direção do relatório. Listado aqui apenas para deixar a exclusão
 * explícita e testável, não implícita por omissão. */
export const PERGUNTAS_SEM_PONTUACAO = ["q15"] as const;
