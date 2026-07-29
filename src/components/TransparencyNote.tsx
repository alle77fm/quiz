type TransparencyNoteProps = {
  text: string;
};

export function TransparencyNote({ text }: TransparencyNoteProps) {
  return (
    <p className="max-w-prose border-l border-gold/45 pl-4 text-xs leading-relaxed text-muted">
      {text}
    </p>
  );
}
