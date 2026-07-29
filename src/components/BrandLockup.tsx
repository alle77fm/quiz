import { Logo } from "@/components/Logo";

type BrandLockupProps = {
  marca: string;
  assinatura: string;
  align?: "left" | "center";
};

export function BrandLockup({
  marca,
  assinatura,
  align = "left",
}: BrandLockupProps) {
  return (
    <div
      className={`flex flex-col gap-1.5 ${align === "center" ? "items-center text-center" : "items-start text-left"}`}
    >
      <Logo className="h-10 w-auto sm:h-11" />
      <p className="text-xl font-semibold tracking-[-0.035em] text-cream sm:text-2xl">
        {marca}
      </p>
      <p className="text-xs font-medium leading-relaxed tracking-[0.04em] text-muted sm:text-sm">
        {assinatura}
      </p>
    </div>
  );
}
