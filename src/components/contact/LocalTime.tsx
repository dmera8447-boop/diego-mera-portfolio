"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

/** Hora actual en Ecuador; se actualiza cada 30 s. */
export function LocalTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-EC", {
      timeZone: siteConfig.timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return <span className="tabular-nums">{now ?? "--:--"}</span>;
}
