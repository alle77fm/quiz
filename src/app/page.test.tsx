import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";
import { tela0Content } from "@/config/quiz/v1/content";

describe("Tela 0 — Entrada da experiência", () => {
  it("renderiza exatamente um h1", () => {
    render(<Home />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(tela0Content.titulo.valor);
  });

  it("apresenta o CTA e ele aponta para /quiz", () => {
    render(<Home />);
    const cta = screen.getByRole("link", { name: tela0Content.cta.valor });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/quiz");
  });

  it("apresenta o aviso de escopo no DOM", () => {
    render(<Home />);
    expect(screen.getByText(tela0Content.escopo.valor)).toBeInTheDocument();
  });

  it("apresenta a nota de transparência no DOM", () => {
    render(<Home />);
    expect(
      screen.getByText(tela0Content.transparencia.valor),
    ).toBeInTheDocument();
  });

  it('apresenta "15 perguntas" no DOM', () => {
    render(<Home />);
    expect(screen.getByText("15 perguntas")).toBeInTheDocument();
  });

  it('não contém a palavra "minuto" em nenhum texto da interface', () => {
    render(<Home />);
    const text = document.body.textContent ?? "";
    expect(text.toLowerCase()).not.toMatch(/minuto/);
  });

  it("não apresenta nenhuma seleção de gênero", () => {
    render(<Home />);
    const text = (document.body.textContent ?? "").toLowerCase();
    expect(text).not.toMatch(/sou (homem|mulher)/);
    expect(screen.queryAllByRole("radio")).toHaveLength(0);
    expect(screen.queryAllByRole("checkbox")).toHaveLength(0);
    expect(document.querySelectorAll('input[type="radio"]')).toHaveLength(0);
  });

  it("não apresenta caixa de marcar ou elemento de consentimento", () => {
    render(<Home />);
    expect(document.querySelectorAll('input[type="checkbox"]')).toHaveLength(
      0,
    );
  });

  it("mantém uma única região principal com o conteúdo", () => {
    render(<Home />);
    const main = screen.getByRole("main");
    expect(within(main).getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
