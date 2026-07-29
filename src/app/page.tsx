import { CtaButton } from "@/components/CtaButton";
import { EditorialVisual } from "@/components/EditorialVisual";
import { Logo } from "@/components/Logo";
import { QuestionCount } from "@/components/QuestionCount";
import { ScopeNotice } from "@/components/ScopeNotice";
import { SiteFooter } from "@/components/SiteFooter";
import { TransparencyNote } from "@/components/TransparencyNote";
import { tela0Content } from "@/config/quiz/v1/content";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:flex-row lg:items-center lg:gap-16 lg:py-20">
        <section className="flex flex-col items-start gap-4 lg:w-1/2 lg:gap-5">
          <Logo />

          <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
            {tela0Content.titulo.valor}
          </h1>

          <p className="max-w-prose text-lg leading-relaxed text-ink-soft">
            {tela0Content.subtitulo.valor}
          </p>

          <QuestionCount label={tela0Content.estrutural.valor} />

          <ScopeNotice text={tela0Content.escopo.valor} />

          <TransparencyNote text={tela0Content.transparencia.valor} />

          <div className="pt-2">
            <CtaButton href="/quiz" label={tela0Content.cta.valor} />
          </div>
        </section>

        <section className="lg:w-1/2">
          <EditorialVisual />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
