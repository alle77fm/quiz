"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QuizShell } from "@/components/quiz/QuizShell";
import { QuestionScreen } from "@/components/quiz/QuestionScreen";
import { ProcessingScreen } from "@/components/quiz/ProcessingScreen";
import { MapPreviewScreen } from "@/components/quiz/MapPreviewScreen";
import { IntentionScreen, type Intencao } from "@/components/quiz/IntentionScreen";
import { BridgeScreen } from "@/components/quiz/BridgeScreen";
import { MapReadyScreen } from "@/components/quiz/MapReadyScreen";
import { CaptureScreen, type CaptureData } from "@/components/quiz/CaptureScreen";
import { ResultScreen } from "@/components/quiz/ResultScreen";
import { FeedbackScreen } from "@/components/quiz/FeedbackScreen";
import {
  DEMO_DIMENSOES,
  DEMO_MAPA_PRINCIPAL,
  DEMO_Q01,
  DEMO_Q12A,
  DEMO_Q12B,
  DEMO_QUESTIONS_FIM,
  DEMO_QUESTIONS_MEIO,
  DEMO_TOTAL_PERGUNTAS,
  type DemoQuestion,
} from "@/config/quiz/v1/homologacao/demo-questions";

const ULTIMO_INDICE_PERGUNTA = DEMO_TOTAL_PERGUNTAS - 1; // 0-14
const INDICE_Q12 = 11; // 12ª pergunta (q01=0 ... q11=10, q12=11, q13..q15=12-14)

/**
 * Resolve qual pergunta aparece em cada posição do percurso (0-14).
 *
 * A posição 11 (a 12ª pergunta) é a única dinâmica: depende da resposta
 * já dada a q01. Recalculada a cada render a partir de `respostas` — se
 * a participante voltar até q01 e escolher outra opção, a próxima vez
 * que passar pela posição 11 verá a outra variante automaticamente.
 */
function resolveQuestionAt(
  index: number,
  respostas: Record<string, string>,
): DemoQuestion {
  if (index === 0) return DEMO_Q01;
  if (index < INDICE_Q12) return DEMO_QUESTIONS_MEIO[index - 1];
  if (index === INDICE_Q12) {
    const respostaQ01 = respostas[DEMO_Q01.id];
    const opcao = DEMO_Q01.opcoes.find((o) => o.id === respostaQ01);
    return opcao?.perfilMoradia === "sozinha" ? DEMO_Q12A : DEMO_Q12B;
  }
  return DEMO_QUESTIONS_FIM[index - INDICE_Q12 - 1];
}

type Step =
  | { kind: "question"; index: number }
  | { kind: "processing" }
  | { kind: "map-preview" }
  | { kind: "intention" }
  | { kind: "bridge" }
  | { kind: "map-ready" }
  | { kind: "capture" }
  | { kind: "result" }
  | { kind: "feedback" };

type TelaFinal = Exclude<Step["kind"], "question">;

const TELAS_FINAIS: TelaFinal[] = [
  "processing",
  "map-preview",
  "intention",
  "bridge",
  "map-ready",
  "capture",
  "result",
  "feedback",
];

function stepAt(stepIndex: number): Step {
  if (stepIndex <= ULTIMO_INDICE_PERGUNTA) {
    return { kind: "question", index: stepIndex };
  }
  const posAposPerguntas = stepIndex - (ULTIMO_INDICE_PERGUNTA + 1);
  const kind = TELAS_FINAIS[posAposPerguntas] ?? "feedback";
  return { kind };
}

const TOTAL_STEPS = ULTIMO_INDICE_PERGUNTA + 1 + 8; // 15 perguntas + 8 telas
const CAPTURE_STEP_INDEX = ULTIMO_INDICE_PERGUNTA + 1 + 5; // processing,map-preview,intention,bridge,map-ready,capture

/**
 * Máquina de estado do fluxo do quiz — inteiramente client-side, sem
 * rede e sem persistência real (demonstração de navegação/UX). Nenhum
 * conteúdo aqui pontua de verdade: ver docs/SCORING_MATRIX.md para o
 * motor oficial, ainda não implementado nesta fase.
 */
export function QuizFlow() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [intencao, setIntencao] = useState<Intencao | null>(null);
  const [captura, setCaptura] = useState<CaptureData | null>(null);

  const step = stepAt(stepIndex);

  const goNext = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, TOTAL_STEPS - 1));
  }, []);

  const goBack = useCallback(() => {
    if (stepIndex === 0) {
      router.push("/");
      return;
    }
    setStepIndex((i) => Math.max(i - 1, 0));
  }, [stepIndex, router]);

  const progressPercent = useMemo(() => {
    if (stepIndex > CAPTURE_STEP_INDEX) return undefined;
    return ((stepIndex + 1) / (CAPTURE_STEP_INDEX + 1)) * 100;
  }, [stepIndex]);

  const showBack = step.kind !== "result" && step.kind !== "feedback";

  const shell = (children: React.ReactNode) => (
    <QuizShell onBack={showBack ? goBack : undefined} progressPercent={progressPercent}>
      {children}
    </QuizShell>
  );

  switch (step.kind) {
    case "question": {
      const questao = resolveQuestionAt(step.index, respostas);
      return shell(
        <QuestionScreen
          key={questao.id}
          question={questao}
          numero={step.index + 1}
          total={DEMO_TOTAL_PERGUNTAS}
          onAnswer={(opcaoId) => {
            setRespostas((prev) => ({ ...prev, [questao.id]: opcaoId }));
            goNext();
          }}
        />,
      );
    }
    case "processing":
      return shell(<ProcessingScreen onDone={goNext} />);
    case "map-preview":
      return shell(
        <MapPreviewScreen mapa={DEMO_MAPA_PRINCIPAL} onContinue={goNext} />,
      );
    case "intention":
      return shell(
        <IntentionScreen
          onSelect={(valor) => {
            setIntencao(valor);
            goNext();
          }}
        />,
      );
    case "bridge":
      return shell(<BridgeScreen onReflect={goNext} onTalk={goNext} />);
    case "map-ready":
      return shell(<MapReadyScreen onContinue={goNext} />);
    case "capture":
      return shell(<CaptureScreen onSubmit={(data) => {
        setCaptura(data);
        goNext();
      }} />);
    case "result":
      return shell(
        <ResultScreen
          nome={captura?.nome ?? ""}
          mapa={DEMO_MAPA_PRINCIPAL}
          forca={DEMO_DIMENSOES.forca}
          atencao={DEMO_DIMENSOES.atencao}
          complementar={DEMO_DIMENSOES.complementar}
          intencao={intencao}
          onContinue={goNext}
        />,
      );
    case "feedback":
      return shell(<FeedbackScreen />);
    default:
      return null;
  }
}
