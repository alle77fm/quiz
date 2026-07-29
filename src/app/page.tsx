import { BrandLockup } from "@/components/BrandLockup";
import { HeroArtwork } from "@/components/HeroArtwork";
import { JourneyBadge } from "@/components/JourneyBadge";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { SiteFooter } from "@/components/SiteFooter";
import { TransparencyNote } from "@/components/TransparencyNote";
import { tela0Content } from "@/config/quiz/v1/content";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-ink">
      <HeroArtwork
        marca={tela0Content.marca.valor}
        assinatura={tela0Content.assinatura.valor}
      />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-6 px-6 pb-12 pt-4 sm:px-10 lg:gap-8 lg:px-16 lg:py-20">
        <div className="hidden lg:flex">
          <BrandLockup
            marca={tela0Content.marca.valor}
            assinatura={tela0Content.assinatura.valor}
          />
        </div>

        <div className="flex flex-col items-start gap-5 lg:max-w-xl lg:gap-6">
          <div className="lg:order-3">
            <JourneyBadge label={tela0Content.estrutural.valor} />
          </div>

          <div className="lg:order-4">
            <TransparencyNote text={tela0Content.transparencia.valor} />
          </div>

          <div className="flex w-full flex-col items-start gap-3 pt-1 sm:w-auto lg:order-5">
            <PrimaryCTA href="/quiz" label={tela0Content.cta.valor} />
            <p className="text-sm text-muted">
              {tela0Content.ctaAuxiliar.valor}
            </p>
          </div>

          <h1 className="max-w-[18ch] text-[2.35rem] font-semibold leading-[1.07] tracking-[-0.045em] text-cream sm:text-[2.75rem] lg:order-1 lg:max-w-[17ch] lg:text-[3.25rem] lg:leading-[1.06]">
            {tela0Content.headline.valor}
            <br />
            {tela0Content.headline.valorLinha2}
          </h1>

          <p className="max-w-[42rem] text-base leading-relaxed text-muted sm:text-lg lg:order-2 lg:max-w-[34rem]">
            {tela0Content.descricao.valor}
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
