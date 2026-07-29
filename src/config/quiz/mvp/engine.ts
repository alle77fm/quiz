/**
 * Matriz inicial de validação comercial do MVP — motor de cálculo.
 *
 * Implementa o mecanismo fechado tecnicamente em docs/SCORING_MATRIX.md
 * (§5 score bruto, §6 normalização, §8 mapa principal por par de
 * dimensões, §9 força/atenção, §10 complementar). Determinístico: mesma
 * entrada produz sempre o mesmo `ScoreSnapshot`; sem aleatoriedade, sem
 * `Date`, sem dependência de ordem de iteração de objeto — todo
 * desempate usa a ordem canônica fixa das dimensões/mapas.
 *
 * Os PESOS (weights.ts) e os PARES de mapa (mapas.ts) são conteúdo
 * inicial do MVP, não a matriz definitiva da psicóloga — só o mecanismo
 * abaixo é considerado fechado.
 */

import { DIMENSOES_CANONICAS, type Dimension } from "@/config/quiz/mvp/dimensions";
import { MAPAS_CANONICOS, MVP_MAPA_PARES, type MapaId } from "@/config/quiz/mvp/mapas";
import { MVP_PESOS } from "@/config/quiz/mvp/weights";

export type ScoreSnapshot = {
  scores: Record<
    Dimension,
    { bruto: number; minimoTeorico: number; maximoTeorico: number; normalizado: number }
  >;
  eixoDoMapa: [Dimension, Dimension];
  mapaPrincipal: MapaId;
  forcaPredominante: Dimension;
  pontoDeAtencao: Dimension;
  dimensaoComplementar: Dimension;
};

function necessidade(normalizado: number): number {
  return 100 - normalizado;
}

/**
 * Calcula o `ScoreSnapshot` a partir das respostas de um percurso.
 * `perguntasRespondidas` é a lista de ids de pergunta efetivamente
 * exibidas nesse percurso (inclui q01 e a variante de q12 exibida,
 * exclui q15 — docs/SCORING_MATRIX.md §5).
 */
export function calcularResultado(
  respostas: Record<string, string>,
  perguntasRespondidas: string[],
): ScoreSnapshot {
  const scores = {} as ScoreSnapshot["scores"];

  for (const dimensao of DIMENSOES_CANONICAS) {
    let bruto = 0;
    let minimoTeorico = 0;
    let maximoTeorico = 0;

    for (const perguntaId of perguntasRespondidas) {
      const pesosPergunta = MVP_PESOS[perguntaId];
      if (!pesosPergunta) continue;

      const respostaId = respostas[perguntaId];
      const pesoResposta = respostaId ? pesosPergunta[respostaId]?.[dimensao] ?? 0 : 0;
      bruto += pesoResposta;

      const valoresPossiveis = Object.values(pesosPergunta).map((o) => o[dimensao] ?? 0);
      minimoTeorico += Math.min(...valoresPossiveis);
      maximoTeorico += Math.max(...valoresPossiveis);
    }

    const normalizado =
      maximoTeorico === minimoTeorico
        ? 50
        : ((bruto - minimoTeorico) / (maximoTeorico - minimoTeorico)) * 100;

    scores[dimensao] = { bruto, minimoTeorico, maximoTeorico, normalizado };
  }

  // Mapa principal — maior mapScore, com desempate em 3 passos + ordem canônica.
  let mapaPrincipal: MapaId = MAPAS_CANONICOS[0];
  let melhorMapScore = -Infinity;
  let melhorMin = -Infinity;
  let melhorMax = -Infinity;

  for (const mapaId of MAPAS_CANONICOS) {
    const [eixo1, eixo2] = MVP_MAPA_PARES[mapaId];
    const nec1 = necessidade(scores[eixo1].normalizado);
    const nec2 = necessidade(scores[eixo2].normalizado);
    const mapScore = (nec1 + nec2) / 2;
    const minPar = Math.min(nec1, nec2);
    const maxPar = Math.max(nec1, nec2);

    if (
      mapScore > melhorMapScore ||
      (mapScore === melhorMapScore && minPar > melhorMin) ||
      (mapScore === melhorMapScore && minPar === melhorMin && maxPar > melhorMax)
    ) {
      mapaPrincipal = mapaId;
      melhorMapScore = mapScore;
      melhorMin = minPar;
      melhorMax = maxPar;
    }
  }

  const eixoDoMapa = MVP_MAPA_PARES[mapaPrincipal];

  // Força predominante — maior normalizado, ordem canônica no empate.
  let forcaPredominante: Dimension = DIMENSOES_CANONICAS[0];
  let melhorForca = -Infinity;
  for (const dimensao of DIMENSOES_CANONICAS) {
    if (scores[dimensao].normalizado > melhorForca) {
      melhorForca = scores[dimensao].normalizado;
      forcaPredominante = dimensao;
    }
  }

  // Ponto de atenção — menor normalizado, excluindo a força.
  let pontoDeAtencao: Dimension = DIMENSOES_CANONICAS.find((d) => d !== forcaPredominante)!;
  let piorAtencao = Infinity;
  for (const dimensao of DIMENSOES_CANONICAS) {
    if (dimensao === forcaPredominante) continue;
    if (scores[dimensao].normalizado < piorAtencao) {
      piorAtencao = scores[dimensao].normalizado;
      pontoDeAtencao = dimensao;
    }
  }

  // Complementar — maior necessidade entre as candidatas, excluindo
  // eixoDoMapa, força e atenção.
  const excluidas = new Set<Dimension>([...eixoDoMapa, forcaPredominante, pontoDeAtencao]);
  const candidatas = DIMENSOES_CANONICAS.filter((d) => !excluidas.has(d));
  let dimensaoComplementar: Dimension = candidatas[0];
  let melhorNecessidade = -Infinity;
  for (const dimensao of candidatas) {
    const nec = necessidade(scores[dimensao].normalizado);
    if (nec > melhorNecessidade) {
      melhorNecessidade = nec;
      dimensaoComplementar = dimensao;
    }
  }

  return {
    scores,
    eixoDoMapa,
    mapaPrincipal,
    forcaPredominante,
    pontoDeAtencao,
    dimensaoComplementar,
  };
}
