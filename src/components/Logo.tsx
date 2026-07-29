import Image from "next/image";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "h-9 w-auto sm:h-10" }: LogoProps) {
  return (
    <Image
      src="/LogoPrincipal.png"
      alt=""
      width={99}
      height={70}
      priority
      className={className}
    />
  );
}
