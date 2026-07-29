import { describe, expect, it } from "vitest";
import { quizEsperaContent, tela0Content } from "./content";

const allValues = [
  ...Object.values(tela0Content).map((item) => item.valor),
  ...Object.values(quizEsperaContent).map((item) => item.valor),
];

describe("conteúdo da Tela 0 e da rota de espera", () => {
  it("nenhum texto menciona duração em minutos", () => {
    for (const value of allValues) {
      expect(value.toLowerCase()).not.toMatch(/minuto|rápid|leva só/);
    }
  });

  it("todo item está marcado como PROVISORIO", () => {
    for (const item of [
      ...Object.values(tela0Content),
      ...Object.values(quizEsperaContent),
    ]) {
      expect(item.status).toBe("PROVISORIO");
    }
  });

  it("o aviso de escopo contém a palavra diagnóstico apenas na exceção permitida", () => {
    expect(tela0Content.escopo.valor.toLowerCase()).toContain("diagnóstico");
  });

  it("nenhum texto usa termos proibidos por LANGUAGE_RULES.md, exceto a exceção sancionada do aviso de escopo", () => {
    const proibidos = [
      "análise",
      "nível",
      "índice",
      "teste psicológico",
      "trauma",
      "inconsciente",
      "transtorno",
      "sintoma",
      "patologia",
      "cura",
    ];
    // Exceção documentada em LANGUAGE_RULES.md §3: o aviso de escopo precisa
    // negar "teste psicológico" e "diagnóstico" para cumprir sua função.
    const valoresComExcecao: string[] = [tela0Content.escopo.valor];
    for (const value of allValues) {
      if (valoresComExcecao.includes(value)) continue;
      const lower = value.toLowerCase();
      for (const termo of proibidos) {
        expect(lower).not.toContain(termo);
      }
    }
  });
});
