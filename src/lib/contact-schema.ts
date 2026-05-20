import { z } from "zod";

/**
 * Schema del formulario de contacto.
 * Usado por react-hook-form (cliente) y la API route (servidor) → fuente única.
 *
 * El campo `website` es un honeypot: invisible para humanos, atractivo para bots.
 * Si llega con valor, lo tratamos como spam y silenciosamente devolvemos OK.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nombre demasiado corto.")
    .max(80, "Máximo 80 caracteres."),
  email: z
    .string()
    .trim()
    .email("Introduce un email válido.")
    .max(160, "Máximo 160 caracteres."),
  subject: z
    .string()
    .trim()
    .min(2, "Asunto demasiado corto.")
    .max(120, "Máximo 120 caracteres."),
  message: z
    .string()
    .trim()
    .min(10, "Cuéntame un poco más (mínimo 10 caracteres).")
    .max(2000, "Máximo 2000 caracteres."),
  /**
   * Honeypot — debe quedar vacío.
   * El schema lo deja pasar como string libre; el servidor inspecciona
   * el valor y devuelve 200 silencioso si vino con contenido (bot).
   */
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
