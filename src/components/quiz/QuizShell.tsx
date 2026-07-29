import type { ReactNode } from "react";
import { BackButton } from "@/components/quiz/BackButton";
import { ProgressBar } from "@/components/quiz/ProgressBar";

type QuizShellProps = {
  onBack?: () => void;
  progressPercent?: number;
  /** Telas de conteúdo longo (ex.: relatório) usam largura de leitura
   * maior e não centralizam verticalmente — o conteúdo rola normalmente. */
  wide?: boolean;
  children: ReactNode;
};

/**
 * Casco compartilhado por toda tela do fluxo do quiz: cabeçalho com
 * voltar + barra de progresso (quando aplicável) e área de conteúdo
 * centralizada. Mantém o mesmo registro visual dark/gold da home.
 */
export function QuizShell({ onBack, progressPercent, wide, children }: QuizShellProps) {
  return (
    <div className="flex min-h-[100svh] flex-col bg-ink text-cream">
      <header className="flex items-center gap-4 px-5 pb-3 pt-4 sm:px-8">
        {onBack ? (
          <BackButton onClick={onBack} />
        ) : (
          <div className="h-10 w-10" aria-hidden="true" />
        )}
        <div className="flex-1">
          {progressPercent !== undefined && (
            <ProgressBar percent={progressPercent} />
          )}
        </div>
      </header>

      <main
        className={`flex flex-1 flex-col px-5 pb-8 pt-6 sm:px-8 sm:pt-10 lg:pt-8 ${
          wide ? "" : "lg:justify-center"
        }`}
      >
        <div
          className={`mx-auto flex w-full flex-col gap-5 ${
            wide ? "max-w-[820px] gap-8" : "max-w-lg"
          }`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
