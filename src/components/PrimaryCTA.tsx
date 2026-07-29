import Link from "next/link";

type PrimaryCTAProps = {
  href: string;
  label: string;
};

export function PrimaryCTA({ href, label }: PrimaryCTAProps) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-gold/35 bg-olive px-7 py-3 text-[0.95rem] font-semibold tracking-[-0.01em] text-cream shadow-[0_12px_32px_-14px_rgba(0,0,0,0.85)] transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-olive-deep hover:shadow-[0_16px_36px_-14px_rgba(0,0,0,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber sm:w-fit"
    >
      {label}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
      >
        →
      </span>
    </Link>
  );
}
