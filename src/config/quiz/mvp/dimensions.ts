/**
 * Matriz inicial de validação comercial do MVP — dimensões.
 *
 * As seis dimensões e sua ordem canônica vêm de docs/SCORING_MATRIX.md
 * §1 (fechado tecnicamente). As definições completas de cada dimensão
 * ainda aguardam ratificação da psicóloga (mesmo documento, §1.1) —
 * nada aqui é conteúdo clínico, apenas o rótulo estrutural usado pelo
 * motor para calcular variação real entre percursos.
 */

export type Dimension =
  | "acolhimento"
  | "limites"
  | "autocuidado"
  | "vinculos"
  | "reciprocidade"
  | "movimento";

/** Ordem canônica fixa — critério de desempate de último recurso em
 * todo o motor (docs/SCORING_MATRIX.md §1). */
export const DIMENSOES_CANONICAS: Dimension[] = [
  "acolhimento",
  "limites",
  "autocuidado",
  "vinculos",
  "reciprocidade",
  "movimento",
];

export const DIMENSAO_LABEL: Record<Dimension, string> = {
  acolhimento: "Acolhimento",
  limites: "Limites",
  autocuidado: "Autocuidado",
  vinculos: "Vínculos",
  reciprocidade: "Reciprocidade",
  movimento: "Movimento",
};
