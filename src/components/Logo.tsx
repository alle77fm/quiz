import Image from "next/image";

export function Logo() {
  return (
    <Image
      src="/LogoPrincipal.png"
      alt="Casa com Alma"
      width={99}
      height={70}
      priority
      className="h-10 w-auto sm:h-12"
    />
  );
}
