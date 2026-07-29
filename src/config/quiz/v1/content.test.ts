import { describe, expect, it } from "vitest";
import { quizEsperaContent, tela0Content } from "./content";

const allValues = [
  tela0Content.marca.valor,
  tela0Content.assinatura.valor,
  tela0Content.headline.valor,
  tela0Content.headline.valorLinha2,
  tela0Content.descricao.valor,
  tela0Content.estrutural.valor,
  tela0Content.transparencia.valor,
  tela0Content.cta.valor,
  tela0Content.ctaAuxiliar.valor,
  ...Object.values(quizEsperaContent).map((item) => item.valor),
];

describe("conteúdo da Tela 0 e da rota de espera", () => {
  it("nenhum texto menciona duração estimada", () => {
    for (const value of allValues) {
      expect(value.toLowerCase()).not.toMatch(/minuto|rápid|leva só/);
    }
  });

  it('o indicador estrutural é apenas "15 perguntas", sem estimativa de tempo', () => {
    expect(tela0Content.estrutural.valor).toBe("15 perguntas");
  });

  it("a copy da Tela 0 está marcada como APROVADO", () => {
    for (const item of [
      tela0Content.marca,
      tela0Content.assinatura,
      tela0Content.headline,
      tela0Content.descricao,
      tela0Content.estrutural,
      tela0Content.transparencia,
      tela0Content.cta,
      tela0Content.ctaAuxiliar,
    ]) {
      expect(item.status).toBe("APROVADO");
    }
  });

  it("a copy da rota de espera continua marcada como PROVISORIO", () => {
    for (const item of Object.values(quizEsperaContent)) {
      expect(item.status).toBe("PROVISORIO");
    }
  });

  it("a nota de transparência contém o aviso de escopo (exceção sancionada a 'teste psicológico')", () => {
    expect(tela0Content.transparencia.valor.toLowerCase()).toContain(
      "teste psicológico",
    );
  });

  it("nenhum texto usa termos proibidos por LANGUAGE_RULES.md, exceto a exceção sancionada da nota de transparência", () => {
    const proibidos = [
      "análise",
      "nível",
      "índice",
      "trauma",
      "inconsciente",
      "transtorno",
      "sintoma",
      "patologia",
      "cura",
    ];
    const valoresComExcecao: string[] = [tela0Content.transparencia.valor];
    for (const value of allValues) {
      if (valoresComExcecao.includes(value)) continue;
      const lower = value.toLowerCase();
      for (const termo of proibidos) {
        expect(lower).not.toContain(termo);
      }
    }
  });

  it("a descrição não enumera as dimensões internas de pontuação por nome", () => {
    const dimensoes = [
      "acolhimento",
      "limites",
      "autocuidado",
      "vínculos",
      "vinculos",
      "reciprocidade",
      "movimento",
    ];
    const lower = tela0Content.descricao.valor.toLowerCase();
    for (const dimensao of dimensoes) {
      expect(lower).not.toContain(dimensao);
    }
  });
});
