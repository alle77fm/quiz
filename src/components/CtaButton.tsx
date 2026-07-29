import Link from "next/link";

type CtaButtonProps = {
  href: string;
  label: string;
};

export function CtaButton({ href, label }: CtaButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-gold px-8 py-3 text-base font-semibold text-ink transition-colors hover:bg-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      {label}
    </Link>
  );
}
