/**
 * Matriz inicial de validação comercial do MVP — pares mapa→eixo.
 *
 * O mecanismo (par de dimensões, mapScore = média das necessidades do
 * par, mapa com maior mapScore) está fechado tecnicamente em
 * docs/SCORING_MATRIX.md §8. Os PARES em si continuam
 * `[PENDENTE · JERUSKA]` naquele documento (§8.1) — a psicóloga é quem
 * decide quais dimensões compõem cada mapa. A tabela abaixo é a
 * associação inicial usada só para viabilizar uma demonstração
 * comercial com os quatro mapas alcançáveis; será substituída quando a
 * Jeruska validar os pares definitivos.
 *
 * Restrições estruturais respeitadas (validadas em engine.test.ts):
 * cada mapa tem exatamente duas dimensões distintas; os quatro pares
 * são únicos entre si.
 */

import type { Dimension } from "@/config/quiz/mvp/dimensions";

export type MapaId =
  | "casa-refugio"
  | "casa-de-reencontro"
  | "casa-dos-vinculos"
  | "casa-em-renovacao";

/** Ordem canônica fixa dos quatro mapas (docs/SCORING_MATRIX.md §1). */
export const MAPAS_CANONICOS: MapaId[] = [
  "casa-refugio",
  "casa-de-reencontro",
  "casa-dos-vinculos",
  "casa-em-renovacao",
];

export const MVP_MAPA_NOME: Record<MapaId, string> = {
  "casa-refugio": "Casa-Refúgio",
  "casa-de-reencontro": "Casa de Reencontro",
  "casa-dos-vinculos": "Casa dos Vínculos",
  "casa-em-renovacao": "Casa em Renovação",
};

/** Par de dimensões (eixoDoMapa) por mapa — matriz inicial do MVP. */
export const MVP_MAPA_PARES: Record<MapaId, [Dimension, Dimension]> = {
  "casa-refugio": ["autocuidado", "limites"],
  "casa-de-reencontro": ["acolhimento", "vinculos"],
  "casa-dos-vinculos": ["vinculos", "reciprocidade"],
  "casa-em-renovacao": ["movimento", "reciprocidade"],
};
