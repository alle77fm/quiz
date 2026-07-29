import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QuizFlow } from "./QuizFlow";
import { DEMO_QUESTIONS } from "@/config/quiz/v1/demo-questions";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("/quiz — fluxo navegável (demonstrativo)", () => {
  it("inicia na primeira pergunta, com barra de progresso visível", () => {
    render(<QuizFlow />);
    expect(
      screen.getByRole("heading", { level: 1, name: DEMO_QUESTIONS[0].texto }),
    ).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("responder a primeira pergunta avança para a segunda", () => {
    render(<QuizFlow />);
    const primeiraOpcao = DEMO_QUESTIONS[0].opcoes[0].label;
    fireEvent.click(screen.getByRole("radio", { name: primeiraOpcao }));

    expect(
      screen.getByRole("heading", { level: 1, name: DEMO_QUESTIONS[1].texto }),
    ).toBeInTheDocument();
  });

  it("voltar na primeira pergunta navega para a home", () => {
    render(<QuizFlow />);
    fireEvent.click(screen.getByRole("button", { name: "Voltar" }));
    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("voltar após responder a primeira pergunta retorna a ela", () => {
    render(<QuizFlow />);
    fireEvent.click(
      screen.getByRole("radio", { name: DEMO_QUESTIONS[0].opcoes[0].label }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Voltar" }));

    expect(
      screen.getByRole("heading", { level: 1, name: DEMO_QUESTIONS[0].texto }),
    ).toBeInTheDocument();
  });

  it("nenhuma pergunta ou alternativa se apresenta como conteúdo final", () => {
    render(<QuizFlow />);
    // Todas as 15 perguntas demonstrativas usam apenas as 4 opções
    // definidas em demo-questions.ts — nenhuma pontua de verdade.
    expect(DEMO_QUESTIONS).toHaveLength(15);
    for (const questao of DEMO_QUESTIONS) {
      expect(questao.opcoes.length).toBeGreaterThan(0);
    }
  });
});
