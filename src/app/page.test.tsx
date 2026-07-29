import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";
import { tela0Content } from "@/config/quiz/v1/content";

describe("Tela 0 — Entrada da experiência (redesign dark/gold)", () => {
  it("renderiza exatamente um h1, com o headline reflexivo", () => {
    render(<Home />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(tela0Content.headline.valor);
    expect(headings[0]).toHaveTextContent(tela0Content.headline.valorLinha2);
  });

  it("apresenta a marca e a assinatura (uma vez por breakpoint)", () => {
    render(<Home />);
    // A marca aparece duas vezes no DOM (bloco desktop + overlay mobile),
    // uma delas sempre oculta via CSS por breakpoint — não duplicada
    // visualmente.
    expect(screen.getAllByText(tela0Content.marca.valor).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText(tela0Content.assinatura.valor).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("apresenta o CTA e ele aponta para /quiz", () => {
    render(<Home />);
    const cta = screen.getByRole("link", { name: new RegExp(tela0Content.cta.valor) });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/quiz");
  });

  it("mantém o CTA antes da headline no fluxo do conteúdo mobile", () => {
    render(<Home />);
    const cta = screen.getByRole("link", {
      name: new RegExp(tela0Content.cta.valor),
    });
    const headline = screen.getByRole("heading", { level: 1 });

    expect(
      cta.compareDocumentPosition(headline) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("apresenta a frase auxiliar abaixo do CTA", () => {
    render(<Home />);
    expect(screen.getByText(tela0Content.ctaAuxiliar.valor)).toBeInTheDocument();
  });

  it("apresenta a nota de transparência, incluindo o aviso de escopo", () => {
    render(<Home />);
    expect(
      screen.getByText(tela0Content.transparencia.valor),
    ).toBeInTheDocument();
    expect(tela0Content.transparencia.valor.toLowerCase()).toContain(
      "teste psicológico",
    );
  });

  it('apresenta "15 perguntas" no DOM, sem estimativa de duração', () => {
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
