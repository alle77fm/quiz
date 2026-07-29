"use client";

import { useEffect } from "react";

type ProcessingScreenProps = {
  onDone: () => void;
  delayMs?: number;
};

/**
 * Tela 1 — Processamento. Única animação do fluxo (docs/FINAL_SEQUENCE.md
 * §5). O resultado (aqui, demonstrativo) já está pronto antes desta tela
 * começar — nenhuma chamada de rede acontece durante a espera.
 */
export function ProcessingScreen({ onDone, delayMs = 2200 }: ProcessingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, delayMs);
    return () => clearTimeout(timer);
  }, [onDone, delayMs]);

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div
        aria-hidden="true"
        className="h-12 w-12 animate-spin rounded-full border-2 border-cream/15 border-t-gold motion-reduce:animate-none"
      />
      <p className="text-lg text-muted">Preparando o seu mapa…</p>
      <button
        type="button"
        onClick={onDone}
        className="text-sm text-amber underline underline-offset-4"
      >
        Continuar
      </button>
    </div>
  );
}
