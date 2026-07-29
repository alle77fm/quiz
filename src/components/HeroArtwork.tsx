import Image from "next/image";
import { BrandLockup } from "@/components/BrandLockup";

type HeroArtworkProps = {
  marca: string;
  assinatura: string;
};

/**
 * Fotografia da casa (porta entreaberta, luz quente) como plano de fundo
 * emocional principal da Tela 0.
 *
 * Desktop: plano de fundo em tela cheia, atrás do bloco de texto, com
 * gradiente de proteção à esquerda.
 * Mobile: marca em um cabeçalho próprio, seguida pela fotografia; o
 * conteúdo textual principal fica abaixo, em painel sólido.
 */
export function HeroArtwork({ marca, assinatura }: HeroArtworkProps) {
  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 hidden lg:block">
        <Image
          src="/hero-desktop.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/25" />
      </div>

      <div className="w-full bg-ink lg:hidden">
        <div className="flex justify-center border-b border-cream/10 px-6 py-5">
          <BrandLockup marca={marca} assinatura={assinatura} align="center" />
        </div>

        <div className="relative h-[38vh] min-h-[260px] max-h-[330px] w-full overflow-hidden">
          <Image
            src="/hero-mobile.png"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_38%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-ink" />
        </div>
      </div>
    </>
  );
}
