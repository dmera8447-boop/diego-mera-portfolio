import { z } from "zod";

/**
 * Schema del formulario de contacto.
 * Usado por react-hook-form (cliente) y la API route (servidor) → fuente única.
 * Los mensajes de error son códigos; el cliente los traduce con el diccionario.
 *
 * El campo `website` es un honeypot: invisible para humanos, atractivo para bots.
 * Si llega con valor, lo tratamos como spam y silenciosamente devolvemos OK.
 */
export const contactKinds = ["job", "freelance", "other"] as const;
export type ContactKind = (typeof contactKinds)[number];

export const contactSchema = z.object({
  kind: z.enum(contactKinds),
  name: z.string().trim().min(2, "name_short").max(80, "name_long"),
  email: z.string().trim().email("email_invalid").max(160, "email_long"),
  company: z.string().trim().max(120, "company_long").optional(),
  message: z.string().trim().min(10, "message_short").max(2000, "message_long"),
  /** Honeypot — debe quedar vacío. */
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactErrorCode =
  | "name_short"
  | "name_long"
  | "email_invalid"
  | "email_long"
  | "company_long"
  | "message_short"
  | "message_long";
