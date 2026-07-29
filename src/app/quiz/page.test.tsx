import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QuizFlow } from "./QuizFlow";
import {
  DEMO_Q01,
  DEMO_Q12A,
  DEMO_Q12B,
  DEMO_QUESTIONS_FIM,
  DEMO_QUESTIONS_MEIO,
  DEMO_TOTAL_PERGUNTAS,
} from "@/config/quiz/v1/homologacao/demo-questions";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

function answer(label: string) {
  fireEvent.click(screen.getByRole("radio", { name: label }));
}

/** Responde q01 e as 10 perguntas seguintes (q02–q11), chegando à 12ª
 * pergunta (posição de q12a/q12b). */
function chegarEmQ12(opcaoQ01Label: string) {
  answer(opcaoQ01Label);
  for (const questao of DEMO_QUESTIONS_MEIO) {
    answer(questao.opcoes[0].label);
  }
}

describe("/quiz — fluxo navegável (estrutura de homologação)", () => {
  it("inicia na primeira pergunta, com barra de progresso visível", () => {
    render(<QuizFlow />);
    expect(
      screen.getByRole("heading", { level: 1, name: DEMO_Q01.texto }),
    ).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("responder a primeira pergunta avança para a segunda", () => {
    render(<QuizFlow />);
    answer(DEMO_Q01.opcoes[0].label);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: DEMO_QUESTIONS_MEIO[0].texto,
      }),
    ).toBeInTheDocument();
  });

  it("voltar na primeira pergunta navega para a home", () => {
    render(<QuizFlow />);
    fireEvent.click(screen.getByRole("button", { name: "Voltar" }));
    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("voltar após responder a primeira pergunta retorna a ela", () => {
    render(<QuizFlow />);
    answer(DEMO_Q01.opcoes[0].label);
    fireEvent.click(screen.getByRole("button", { name: "Voltar" }));

    expect(
      screen.getByRole("heading", { level: 1, name: DEMO_Q01.texto }),
    ).toBeInTheDocument();
  });

  it('q01 = "Vivo só" direciona para q12a', () => {
    render(<QuizFlow />);
    const opcaoSo = DEMO_Q01.opcoes.find((o) => o.perfilMoradia === "sozinha")!;
    chegarEmQ12(opcaoSo.label);

    expect(
      screen.getByRole("heading", { level: 1, name: DEMO_Q12A.texto }),
    ).toBeInTheDocument();
  });

  it("q01 = uma opção de morar acompanhado direciona para q12b", () => {
    render(<QuizFlow />);
    const opcaoAcompanhada = DEMO_Q01.opcoes.find(
      (o) => o.perfilMoradia === "acompanhada",
    )!;
    chegarEmQ12(opcaoAcompanhada.label);

    expect(
      screen.getByRole("heading", { level: 1, name: DEMO_Q12B.texto }),
    ).toBeInTheDocument();
  });

  it("nunca as duas variantes de q12 aparecem no mesmo percurso", () => {
    render(<QuizFlow />);
    const opcaoSo = DEMO_Q01.opcoes.find((o) => o.perfilMoradia === "sozinha")!;
    chegarEmQ12(opcaoSo.label);

    expect(
      screen.queryByRole("heading", { level: 1, name: DEMO_Q12B.texto }),
    ).not.toBeInTheDocument();
  });

  it("voltar até q01 e trocar a resposta recalcula o caminho (q12a → q12b)", () => {
    render(<QuizFlow />);
    const opcaoSo = DEMO_Q01.opcoes.find((o) => o.perfilMoradia === "sozinha")!;
    const opcaoAcompanhada = DEMO_Q01.opcoes.find(
      (o) => o.perfilMoradia === "acompanhada",
    )!;

    chegarEmQ12(opcaoSo.label);
    expect(
      screen.getByRole("heading", { level: 1, name: DEMO_Q12A.texto }),
    ).toBeInTheDocument();

    // volta 11 vezes: de q12 até q01
    for (let i = 0; i < 11; i += 1) {
      fireEvent.click(screen.getByRole("button", { name: "Voltar" }));
    }
    expect(
      screen.getByRole("heading", { level: 1, name: DEMO_Q01.texto }),
    ).toBeInTheDocument();

    chegarEmQ12(opcaoAcompanhada.label);
    expect(
      screen.getByRole("heading", { level: 1, name: DEMO_Q12B.texto }),
    ).toBeInTheDocument();
  });

  it("cada caminho possível soma exatamente 15 perguntas", () => {
    // 1 (q01) + 10 (q02–q11) + 1 (q12a OU q12b) + 3 (q13–q15) = 15
    const total = 1 + DEMO_QUESTIONS_MEIO.length + 1 + DEMO_QUESTIONS_FIM.length;
    expect(total).toBe(15);
    expect(DEMO_TOTAL_PERGUNTAS).toBe(15);
  });

  it("nenhuma pergunta fica sem alternativas", () => {
    const todas = [
      DEMO_Q01,
      ...DEMO_QUESTIONS_MEIO,
      DEMO_Q12A,
      DEMO_Q12B,
      ...DEMO_QUESTIONS_FIM,
    ];
    expect(todas).toHaveLength(16); // 15 perguntas + 1 variante extra de q12
    for (const questao of todas) {
      expect(questao.opcoes.length).toBeGreaterThan(0);
    }
  });

  it("nenhum rótulo de demonstração aparece na experiência", () => {
    render(<QuizFlow />);
    const texto = (document.body.textContent ?? "").toLowerCase();
    expect(texto).not.toMatch(/demonstrat|homologa|placeholder|provis[oó]rio|pendente/);
  });
});

describe("q05 e q14 — alternativas corrigidas", () => {
  it('q05 não usa mais a escala genérica de frequência ("Sim, sempre")', () => {
    const q05 = DEMO_QUESTIONS_MEIO.find((q) => q.id === "q05")!;
    const labels = q05.opcoes.map((o) => o.label);
    expect(labels).not.toContain("Sim, sempre");
  });

  it("q05 usa uma escala de estado/conforto compatível com 'como você se sente'", () => {
    const q05 = DEMO_QUESTIONS_MEIO.find((q) => q.id === "q05")!;
    const labels = q05.opcoes.map((o) => o.label);
    expect(labels).toEqual([
      "Muito à vontade",
      "Na maior parte do tempo, confortável",
      "Um pouco desconfortável",
      "Frequentemente desconfortável",
    ]);
  });

  it("q14 cobre espaço, objeto, assunto e ausência de evitação, sem misturar frequência", () => {
    const q14 = DEMO_QUESTIONS_FIM.find((q) => q.id === "q14")!;
    const labels = q14.opcoes.map((o) => o.label);
    expect(labels).toEqual([
      "Evito principalmente um espaço",
      "Evito principalmente um objeto",
      "Evito principalmente um assunto",
      "Não percebo algo que evite",
    ]);
    expect(labels).not.toContain("Às vezes");
  });
});
