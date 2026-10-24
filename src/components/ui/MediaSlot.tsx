import Image from "next/image";
import { LottieCover } from "@/components/work/LottieCover";
import { cn } from "@/lib/utils";

interface MediaSlotProps {
  /** Texto alternativo / etiqueta del espacio mientras no hay imagen */
  label: string;
  /** Segunda línea del placeholder, p.ej. "Imagen pendiente" */
  note?: string;
  lottie?: string;
  /** Imagen real; solo se usa si `ready` es true */
  image?: string;
  ready?: boolean;
  /** Clase de proporción, p.ej. "aspect-[2/1]" */
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Espacio de imagen del sitio: Lottie si el caso tiene animación, captura
 * real si ya existe, o un bloque de tono con su etiqueta mientras tanto.
 * Esquinas rectas y sin borde: la superficie se separa por tono.
 */
export function MediaSlot({
  label,
  note,
  lottie,
  image,
  ready = false,
  className,
  sizes = "100vw",
  priority = false,
}: MediaSlotProps) {
  return (
    <div className={cn("bg-tone relative w-full overflow-hidden", className)}>
      {lottie ? (
        <LottieCover
          src={lottie}
          alt={label}
          sizes={sizes}
          priority={priority}
        />
      ) : ready && image ? (
        <Image
          src={image}
          alt={label}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={label}
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-4 text-center"
        >
          <span className="text-soft font-medium">{label}</span>
          {note ? <span className="text-soft">{note}</span> : null}
        </div>
      )}
    </div>
  );
}
