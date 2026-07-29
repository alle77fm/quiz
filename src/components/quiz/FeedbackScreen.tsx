"use client";

import { useState } from "react";
import Link from "next/link";

export function FeedbackScreen() {
  const [nota, setNota] = useState<number | null>(null);
  const [enviado, setEnviado] = useState(false);

  if (enviado) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="font-display text-2xl font-extrabold text-cream">
          Obrigado.
        </h1>
        <p className="text-muted">Seu feedback foi registrado (demonstração).</p>
        <Link href="/" className="text-sm text-amber underline underline-offset-4">
          Voltar ao início
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setEnviado(true);
      }}
      className="flex flex-col gap-6"
    >
      <h1 className="font-display text-2xl font-extrabold leading-tight text-cream sm:text-3xl">
        O que você achou desta experiência?
      </h1>

      <div className="flex justify-between gap-2" role="radiogroup" aria-label="Nota de 1 a 5">
        {[1, 2, 3, 4, 5].map((valor) => (
          <button
            key={valor}
            type="button"
            role="radio"
            aria-checked={nota === valor}
            onClick={() => setNota(valor)}
            className={`min-h-12 flex-1 rounded-xl border text-base font-semibold transition-colors ${
              nota === valor
                ? "border-gold bg-gold text-ink"
                : "border-cream/15 bg-cream/[0.03] text-cream hover:border-gold/50"
            }`}
          >
            {valor}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="comentario" className="text-sm font-medium text-muted">
          Comentário (opcional)
        </label>
        <textarea
          id="comentario"
          maxLength={500}
          rows={3}
          className="rounded-xl border border-cream/15 bg-cream/[0.03] px-4 py-3 text-base text-cream outline-none focus:border-gold/60"
        />
      </div>

      <button
        type="submit"
        disabled={nota === null}
        className="min-h-12 rounded-xl bg-olive px-8 text-base font-semibold text-cream transition-colors hover:bg-olive-deep disabled:opacity-50"
      >
        Enviar feedback
      </button>
    </form>
  );
}
