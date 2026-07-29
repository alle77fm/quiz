/**
 * Composição editorial em CSS puro: porta entreaberta, luz de janela,
 * profundidade arquitetônica. Nenhuma imagem externa, nenhuma foto.
 * Puramente decorativa — oculta de tecnologia assistiva.
 */
export function EditorialVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative isolate aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-ink via-ink-soft to-ink sm:aspect-auto sm:h-full sm:min-h-[420px]"
    >
      {/* profundidade de fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_15%,rgba(201,162,75,0.16),transparent_60%)]" />

      {/* janela recebendo luz */}
      <div className="absolute right-[14%] top-[12%] h-[34%] w-[22%] rounded-sm border border-gold-soft/25 bg-gradient-to-b from-gold-soft/25 via-gold/10 to-transparent shadow-[0_0_60px_18px_rgba(230,211,160,0.10)] motion-safe:animate-[pulse_7s_ease-in-out_infinite]" />
      <div className="absolute right-[14%] top-[12%] h-[34%] w-[22%] border-l border-gold-soft/20" />

      {/* porta entreaberta */}
      <div className="absolute bottom-0 left-[18%] h-[72%] w-[30%] rounded-t-[3rem] bg-gradient-to-b from-ink-soft/80 to-ink/95 shadow-[inset_0_0_0_1px_rgba(201,162,75,0.18)]" />
      <div className="absolute bottom-0 left-[18%] h-[72%] w-[6%] bg-gradient-to-r from-gold-soft/30 via-gold/10 to-transparent" />

      {/* formas arquitetônicas — linhas finas */}
      <div className="absolute inset-x-[10%] bottom-[8%] h-px bg-gold-deep/25" />
      <div className="absolute bottom-[8%] left-[10%] h-[26%] w-px bg-gold-deep/20" />
      <div className="absolute bottom-[8%] right-[10%] h-[40%] w-px bg-gold-deep/20" />
    </div>
  );
}
