import { describe, expect, it } from "vitest";
import { calcularResultado } from "@/config/quiz/mvp/engine";
import { MAPAS_CANONICOS, MVP_MAPA_PARES } from "@/config/quiz/mvp/mapas";
import { DIMENSOES_CANONICAS } from "@/config/quiz/mvp/dimensions";

const IDS = [
  "q01",
  "q02",
  "q03",
  "q04",
  "q05",
  "q06",
  "q07",
  "q08",
  "q09",
  "q10",
  "q11",
  "q12a",
  "q13",
  "q14",
];

/** Quatro percursos completos, um por mapa alcançável — cada um
 * escolhido para deixar o par de dimensões daquele mapa (eixoDoMapa)
 * consistentemente baixo e as demais dimensões altas. */
const PERCURSO_CASA_REFUGIO: Record<string, string> = {
  q01: "so",
  q02: "indiferenca",
  q03: "quase-nunca",
  q04: "quase-nunca",
  q05: "muito-a-vontade",
  q06: "conversam",
  q07: "sempre",
  q08: "sempre",
  q09: "silencio",
  q10: "quase-nunca",
  q11: "quase-nunca",
  q12a: "muito-proxima",
  q13: "quase-nunca",
  q14: "assunto",
};

const PERCURSO_CASA_DE_REENCONTRO: Record<string, string> = {
  q01: "so",
  q02: "indiferenca",
  q03: "sempre",
  q04: "quase-nunca",
  q05: "frequentemente-desconfortavel",
  q06: "conversam",
  q07: "quase-nunca",
  q08: "quase-nunca",
  q09: "silencio",
  q10: "quase-nunca",
  q11: "sempre",
  q12a: "muito-distante",
  q13: "sempre",
  q14: "nenhum",
};

const PERCURSO_CASA_DOS_VINCULOS: Record<string, string> = {
  q01: "so",
  q02: "alivio",
  q03: "sempre",
  q04: "quase-nunca",
  q05: "frequentemente-desconfortavel",
  q06: "sozinho",
  q07: "quase-nunca",
  q08: "quase-nunca",
  q09: "silencio",
  q10: "sempre",
  q11: "sempre",
  q12a: "muito-distante",
  q13: "sempre",
  q14: "nenhum",
};

const PERCURSO_CASA_EM_RENOVACAO: Record<string, string> = {
  q01: "parceiro",
  q02: "alivio",
  q03: "sempre",
  q04: "sempre",
  q05: "muito-a-vontade",
  q06: "sozinho",
  q07: "quase-nunca",
  q08: "quase-nunca",
  q09: "tempo",
  q10: "sempre",
  q11: "sempre",
  q12a: "muito-distante",
  q13: "quase-nunca",
  q14: "assunto",
};

describe("motor MVP — mapa por par de dimensões (docs/SCORING_MATRIX.md §8)", () => {
  it("os quatro mapas são todos alcançáveis", () => {
    expect(calcularResultado(PERCURSO_CASA_REFUGIO, IDS).mapaPrincipal).toBe(
      "casa-refugio",
    );
    expect(
      calcularResultado(PERCURSO_CASA_DE_REENCONTRO, IDS).mapaPrincipal,
    ).toBe("casa-de-reencontro");
    expect(
      calcularResultado(PERCURSO_CASA_DOS_VINCULOS, IDS).mapaPrincipal,
    ).toBe("casa-dos-vinculos");
    expect(
      calcularResultado(PERCURSO_CASA_EM_RENOVACAO, IDS).mapaPrincipal,
    ).toBe("casa-em-renovacao");
  });

  it("a mesma entrada produz sempre o mesmo resultado (determinismo)", () => {
    const a = calcularResultado(PERCURSO_CASA_REFUGIO, IDS);
    const b = calcularResultado(PERCURSO_CASA_REFUGIO, IDS);
    expect(a).toEqual(b);
  });

  it("mudar uma resposta muda os scores", () => {
    const original = calcularResultado(PERCURSO_CASA_REFUGIO, IDS);
    const alterado = calcularResultado(
      { ...PERCURSO_CASA_REFUGIO, q10: "sempre" },
      IDS,
    );
    expect(alterado.scores.autocuidado.normalizado).not.toBe(
      original.scores.autocuidado.normalizado,
    );
  });

  it("mudar respostas relevantes muda o mapa principal", () => {
    const refugio = calcularResultado(PERCURSO_CASA_REFUGIO, IDS).mapaPrincipal;
    const renovacao = calcularResultado(
      PERCURSO_CASA_EM_RENOVACAO,
      IDS,
    ).mapaPrincipal;
    expect(refugio).not.toBe(renovacao);
  });

  it("força predominante é sempre diferente do ponto de atenção", () => {
    for (const percurso of [
      PERCURSO_CASA_REFUGIO,
      PERCURSO_CASA_DE_REENCONTRO,
      PERCURSO_CASA_DOS_VINCULOS,
      PERCURSO_CASA_EM_RENOVACAO,
    ]) {
      const r = calcularResultado(percurso, IDS);
      expect(r.forcaPredominante).not.toBe(r.pontoDeAtencao);
    }
  });

  it("dimensão complementar nunca coincide com força, atenção ou eixo do mapa", () => {
    for (const percurso of [
      PERCURSO_CASA_REFUGIO,
      PERCURSO_CASA_DE_REENCONTRO,
      PERCURSO_CASA_DOS_VINCULOS,
      PERCURSO_CASA_EM_RENOVACAO,
    ]) {
      const r = calcularResultado(percurso, IDS);
      expect(r.dimensaoComplementar).not.toBe(r.forcaPredominante);
      expect(r.dimensaoComplementar).not.toBe(r.pontoDeAtencao);
      expect(r.eixoDoMapa).not.toContain(r.dimensaoComplementar);
    }
  });
});

describe("motor MVP — validação estrutural da tabela mapa→par", () => {
  it("cada mapa tem exatamente duas dimensões distintas no par", () => {
    for (const mapaId of MAPAS_CANONICOS) {
      const [d1, d2] = MVP_MAPA_PARES[mapaId];
      expect(d1).not.toBe(d2);
      expect(DIMENSOES_CANONICAS).toContain(d1);
      expect(DIMENSOES_CANONICAS).toContain(d2);
    }
  });

  it("os quatro pares são únicos entre si", () => {
    const paresComoConjunto = MAPAS_CANONICOS.map((mapaId) => {
      const [d1, d2] = MVP_MAPA_PARES[mapaId];
      return [d1, d2].sort().join("+");
    });
    expect(new Set(paresComoConjunto).size).toBe(paresComoConjunto.length);
  });

  it("nenhum mapa repete a mesma dimensão duas vezes (cardinalidade exata 2)", () => {
    for (const mapaId of MAPAS_CANONICOS) {
      const par = MVP_MAPA_PARES[mapaId];
      expect(par).toHaveLength(2);
      expect(new Set(par).size).toBe(2);
    }
  });
});

describe("motor MVP — cobertura mínima por dimensão", () => {
  it("cada dimensão recebe contribuição efetiva de no mínimo três perguntas, com diferença de cobertura no máximo 2", async () => {
    const { MVP_PESOS } = await import("@/config/quiz/mvp/weights");
    const contagens: number[] = [];
    for (const dimensao of DIMENSOES_CANONICAS) {
      let perguntasComVariacao = 0;
      for (const perguntaId of Object.keys(MVP_PESOS)) {
        const valores = Object.values(MVP_PESOS[perguntaId]).map(
          (o) => o[dimensao] ?? 0,
        );
        if (new Set(valores).size >= 2) perguntasComVariacao += 1;
      }
      expect(perguntasComVariacao).toBeGreaterThanOrEqual(3);
      contagens.push(perguntasComVariacao);
    }
    expect(Math.max(...contagens) - Math.min(...contagens)).toBeLessThanOrEqual(2);
  });
});

describe("nome, intenção e q15 não afetam o cálculo (isolamento de parâmetros)", () => {
  it("o nome da participante não entra no motor (não é parâmetro de calcularResultado)", () => {
    // O motor recebe apenas respostas + ids pontuáveis — nunca nome.
    const semNome = calcularResultado(PERCURSO_CASA_REFUGIO, IDS);
    const comMesmasRespostas = calcularResultado(
      { ...PERCURSO_CASA_REFUGIO },
      IDS,
    );
    expect(semNome).toEqual(comMesmasRespostas);
  });

  it("q15 nunca é lido pelo motor (não está na lista de ids pontuáveis)", () => {
    expect(IDS).not.toContain("q15");
    const comQ15 = calcularResultado(
      { ...PERCURSO_CASA_REFUGIO, q15: "paz" },
      IDS,
    );
    const semQ15 = calcularResultado(PERCURSO_CASA_REFUGIO, IDS);
    expect(comQ15).toEqual(semQ15);
  });
});
