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
  DEMO_QUESTIONS,
} from "@/config/quiz/v1/demo-questions";

const TOTAL_QUESTIONS = DEMO_QUESTIONS.length;

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

function buildSteps(): Step[] {
  const steps: Step[] = [];
  for (let i = 0; i < TOTAL_QUESTIONS; i += 1) {
    steps.push({ kind: "question", index: i });
  }
  steps.push({ kind: "processing" });
  steps.push({ kind: "map-preview" });
  steps.push({ kind: "intention" });
  steps.push({ kind: "bridge" });
  steps.push({ kind: "map-ready" });
  steps.push({ kind: "capture" });
  steps.push({ kind: "result" });
  steps.push({ kind: "feedback" });
  return steps;
}

const STEPS = buildSteps();
const CAPTURE_STEP_INDEX = STEPS.findIndex((s) => s.kind === "capture");

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

  const step = STEPS[stepIndex];

  const goNext = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
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
      const questao = DEMO_QUESTIONS[step.index];
      return shell(
        <QuestionScreen
          key={questao.id}
          question={questao}
          numero={step.index + 1}
          total={TOTAL_QUESTIONS}
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
          respondidas={Object.keys(respostas).length}
          total={TOTAL_QUESTIONS}
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
