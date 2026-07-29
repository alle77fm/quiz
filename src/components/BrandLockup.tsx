import { Logo } from "@/components/Logo";

type BrandLockupProps = {
  marca: string;
  assinatura: string;
  align?: "left" | "center";
  compact?: boolean;
};

export function BrandLockup({
  marca,
  assinatura,
  align = "left",
  compact = false,
}: BrandLockupProps) {
  return (
    <div
      className={`flex flex-col ${compact ? "gap-1" : "gap-1.5"} ${align === "center" ? "items-center text-center" : "items-start text-left"}`}
    >
      <Logo className={compact ? "h-7 w-auto" : "h-10 w-auto sm:h-11"} />
      <p
        className={`font-display font-bold tracking-[-0.03em] text-cream ${compact ? "text-base" : "text-xl sm:text-2xl"}`}
      >
        {marca}
      </p>
      <p
        className={`font-medium tracking-[0.04em] text-muted ${compact ? "text-[11px] leading-snug" : "text-xs leading-relaxed sm:text-sm"}`}
      >
        {assinatura}
      </p>
    </div>
  );
}
