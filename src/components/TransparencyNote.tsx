type TransparencyNoteProps = {
  text: string;
};

export function TransparencyNote({ text }: TransparencyNoteProps) {
  return (
    <p className="max-w-prose border-l-2 border-gold-deep/50 pl-4 text-sm leading-relaxed text-ink-soft">
      {text}
    </p>
  );
}
