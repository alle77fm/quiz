import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { quizEsperaContent } from "@/config/quiz/v1/content";

export const metadata: Metadata = {
  title: "Casa com Alma — em preparação",
};

export default function QuizEmEspera() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-canvas px-6 py-10 text-center">
      <Logo />

      <p className="max-w-prose text-lg leading-relaxed text-ink-soft">
        {quizEsperaContent.espera.valor}
      </p>

      <Link
        href="/"
        className="text-sm font-medium text-ink underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        {quizEsperaContent.retorno.valor}
      </Link>
    </div>
  );
}
