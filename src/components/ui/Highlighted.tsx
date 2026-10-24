interface HighlightedProps {
  text: string;
  /** Frases que van en tinta completa; el resto queda en tinta suave */
  phrases: readonly string[];
}

/** Texto en tinta suave con las frases clave en tinta completa (para escanear). */
export function Highlighted({ text, phrases }: HighlightedProps) {
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return (
    <>
      {parts.map((part, i) =>
        phrases.includes(part) ? (
          <strong key={i} className="text-ink font-normal">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}
