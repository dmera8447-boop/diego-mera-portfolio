import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { InView } from "@/components/ui/InView";

export function Numbers({ t }: { t: Dictionary["home"]["numbers"] }) {
  return (
    <section aria-labelledby="numbers-title" className="px-edge pt-section">
      <InView>
        <h2 id="numbers-title" className="type-h2 reveal">
          {t.title}
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:mt-16 md:grid-cols-4 md:gap-8">
          {t.items.map((item, i) => (
            <li
              key={item.value}
              className="reveal"
              style={{ "--i": i + 1 } as CSSProperties}
            >
              <p className="type-h2 font-medium tabular-nums">{item.value}</p>
              <p className="mt-2 max-w-[30ch] md:mt-4">{item.label}</p>
            </li>
          ))}
        </ul>
      </InView>
    </section>
  );
}
