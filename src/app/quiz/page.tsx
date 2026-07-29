import type { Metadata } from "next";
import { QuizFlow } from "@/app/quiz/QuizFlow";

export const metadata: Metadata = {
  title: "Casa com Alma — percurso",
};

export default function QuizPage() {
  return <QuizFlow />;
}
