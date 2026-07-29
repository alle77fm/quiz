import type { DemoQuestion } from "@/config/quiz/v1/homologacao/demo-questions";

type QuestionScreenProps = {
  question: DemoQuestion;
  numero: number;
  total: number;
  onAnswer: (opcaoId: string) => void;
};

export function QuestionScreen({
  question,
  numero,
  total,
  onAnswer,
}: QuestionScreenProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber">
          {question.comodo} · {numero}/{total}
        </p>
        <h1 className="font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-cream sm:text-3xl">
          {question.texto}
        </h1>
      </div>

      <div className="flex flex-col gap-3" role="radiogroup" aria-label={question.texto}>
        {question.opcoes.map((opcao) => (
          <button
            key={opcao.id}
            type="button"
            role="radio"
            aria-checked="false"
            onClick={() => onAnswer(opcao.id)}
            className="w-full min-h-14 rounded-xl border border-cream/15 bg-cream/[0.03] px-5 py-4 text-left text-base font-medium text-cream transition-colors hover:border-gold/50 hover:bg-cream/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
          >
            {opcao.label}
          </button>
        ))}
      </div>
    </div>
  );
}
