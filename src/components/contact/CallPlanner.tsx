"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import { fill, type Dictionary } from "@/i18n/dictionaries";
import { mailtoHref, siteConfig, whatsappHref } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const SLOTS = ["9:00", "10:30", "14:00", "15:30", "17:00"] as const;
/** Días hacia adelante que se pueden proponer */
const WINDOW_DAYS = 30;

interface CallPlannerProps {
  lang: Locale;
  t: Dictionary["contact"]["planner"];
}

/** Fecha de hoy en Ecuador como Date local a medianoche (independiente del visitante). */
function todayInEcuador(): Date {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: siteConfig.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const [y, m, d] = parts.split("-").map(Number);
  return new Date(y!, m! - 1, d!);
}

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/**
 * La pieza interactiva de la página: el visitante elige día y hora y el botón
 * arma un mensaje de WhatsApp (o un email) ya escrito con esa propuesta.
 * Lunes a viernes, desde mañana y hasta 30 días. Sin JS queda el enlace
 * directo a WhatsApp.
 */
export function CallPlanner({ lang, t }: CallPlannerProps) {
  const [today, setToday] = useState<Date | null>(null);
  const [monthOffset, setMonthOffset] = useState(0);
  const [day, setDay] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => setToday(todayInEcuador()), []);

  const locale = lang === "es" ? "es-EC" : "en-US";
  const monthFmt = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  });
  const dayFmt = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const view = useMemo(() => {
    if (!today) return null;
    const first = new Date(
      today.getFullYear(),
      today.getMonth() + monthOffset,
      1,
    );
    const last = new Date(
      today.getFullYear(),
      today.getMonth() + monthOffset + 1,
      0,
    );
    const limit = new Date(today);
    limit.setDate(limit.getDate() + WINDOW_DAYS);
    const lead = (first.getDay() + 6) % 7; // lunes = 0
    const cells: (Date | null)[] = Array.from({ length: lead }, () => null);
    for (let d = 1; d <= last.getDate(); d++) {
      cells.push(new Date(first.getFullYear(), first.getMonth(), d));
    }
    const isOpen = (date: Date) => {
      const wd = date.getDay();
      return wd !== 0 && wd !== 6 && date > today && date <= limit;
    };
    return {
      first,
      cells,
      isOpen,
      hasNext: limit >= new Date(first.getFullYear(), first.getMonth() + 1, 1),
    };
  }, [today, monthOffset]);

  const dayLabel = day ? dayFmt.format(day) : "";
  const ready = !!day && !!time;
  const values = { day: dayLabel, time: time ?? "" };
  const waHref = ready ? whatsappHref(fill(t.message, values)) : whatsappHref();
  const mailHref = ready
    ? mailtoHref(fill(t.emailSubject, values), fill(t.message, values))
    : mailtoHref();

  return (
    <div className="bg-tone flex flex-col gap-6 p-5 md:p-8">
      <div>
        <h2 className="type-title font-medium">{t.title}</h2>
        <p className="text-soft">{t.sub}</p>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="font-medium first-letter:uppercase" aria-live="polite">
            {view ? monthFmt.format(view.first) : " "}
          </p>
          <div className="flex">
            <button
              type="button"
              aria-label={t.prevMonth}
              disabled={monthOffset === 0}
              onClick={() => setMonthOffset((m) => m - 1)}
              className="hover:bg-tone-2 disabled:text-faint flex h-11 w-11 items-center justify-center disabled:hover:bg-transparent"
            >
              ←
            </button>
            <button
              type="button"
              aria-label={t.nextMonth}
              disabled={!view?.hasNext}
              onClick={() => setMonthOffset((m) => m + 1)}
              className="hover:bg-tone-2 disabled:text-faint flex h-11 w-11 items-center justify-center disabled:hover:bg-transparent"
            >
              →
            </button>
          </div>
        </div>

        <p className="sr-only">{t.pickDay}</p>
        <div className="mt-3 grid grid-cols-7 gap-1.5" aria-hidden="true">
          {t.weekdays.map((w, i) => (
            <span key={i} className="text-soft text-center text-[13px]">
              {w}
            </span>
          ))}
        </div>
        <div className="mt-2 grid min-h-[286px] grid-cols-7 gap-1.5 md:min-h-[318px]">
          {view?.cells.map((date, i) =>
            date ? (
              <button
                key={date.toISOString()}
                type="button"
                disabled={!view.isOpen(date)}
                aria-pressed={day ? sameDay(day, date) : false}
                aria-label={dayFmt.format(date)}
                onClick={() => setDay(date)}
                className={cn(
                  "flex h-11 items-center justify-center font-medium tabular-nums transition-colors duration-150 md:h-12",
                  "disabled:text-faint disabled:font-normal",
                  view.isOpen(date) && "bg-bg hover:bg-tone-2",
                  day &&
                    sameDay(day, date) &&
                    "bg-ink text-on-ink hover:bg-ink",
                )}
              >
                {date.getDate()}
              </button>
            ) : (
              <span key={`empty-${i}`} />
            ),
          )}
        </div>
      </div>

      <fieldset>
        <legend className="mb-3">{t.pickTime}</legend>
        <div className="flex flex-wrap gap-2">
          {SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              aria-pressed={time === slot}
              onClick={() => setTime(slot)}
              className={cn(
                "min-h-11 px-4 font-medium tabular-nums transition-colors duration-150",
                time === slot ? "bg-accent text-ink" : "bg-bg hover:bg-tone-2",
              )}
            >
              {slot}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col items-center gap-2">
        <ButtonLink href={waHref} variant="ink" className="w-full">
          {ready ? fill(t.confirm, values) : t.confirmEmpty}
        </ButtonLink>
        <ButtonLink href={mailHref} variant="link">
          {t.byEmail}
        </ButtonLink>
      </div>
    </div>
  );
}
