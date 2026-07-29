type ScopeNoticeProps = {
  text: string;
};

export function ScopeNotice({ text }: ScopeNoticeProps) {
  return <p className="max-w-prose text-sm leading-relaxed text-ink-soft">{text}</p>;
}
