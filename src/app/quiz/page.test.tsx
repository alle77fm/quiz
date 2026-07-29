import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import QuizEmEspera from "./page";
import { quizEsperaContent } from "@/config/quiz/v1/content";

describe("/quiz — tela de espera", () => {
  it("apresenta a mensagem de espera provisória", () => {
    render(<QuizEmEspera />);
    expect(
      screen.getByText(quizEsperaContent.espera.valor),
    ).toBeInTheDocument();
  });

  it("apresenta link de retorno para a Tela 0", () => {
    render(<QuizEmEspera />);
    const link = screen.getByRole("link", {
      name: quizEsperaContent.retorno.valor,
    });
    expect(link).toHaveAttribute("href", "/");
  });

  it("não apresenta nenhum esqueleto de pergunta ou alternativa", () => {
    render(<QuizEmEspera />);
    expect(document.querySelectorAll('input, button[type="submit"]')).toHaveLength(0);
  });
});
