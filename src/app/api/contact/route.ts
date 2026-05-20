import { NextResponse, type NextRequest } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";

/** Valor placeholder del .env.local — se trata como "no configurado". */
const PLACEHOLDER_KEY = "aquí_va_mi_api_key";

export const runtime = "nodejs";

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() || "anonymous";
}

export async function POST(req: NextRequest) {
  // 1) Rate limit por IP
  const rl = rateLimit(clientIp(req));
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Demasiados intentos. Inténtalo más tarde." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
        },
      },
    );
  }

  // 2) Parsear y validar con Zod
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Cuerpo de la petición inválido." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Datos inválidos.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // 3) Honeypot — bot detectado → respuesta exitosa silenciosa
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true, mocked: true });
  }

  // 4) Modo simulado si Resend no está configurado
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const isConfigured =
    !!apiKey && apiKey !== PLACEHOLDER_KEY && apiKey.length > 0 && !!to;

  if (!isConfigured) {
    console.log("[CONTACT][MOCK] Resend no configurado. Mensaje recibido:", {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message.slice(0, 200),
    });
    return NextResponse.json({ ok: true, mocked: true });
  }

  // 5) Envío real vía Resend (import dinámico → no carga el SDK en mock mode)
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { data: result, error } = await resend.emails.send({
      // onboarding@resend.dev es el remitente de pruebas oficial de Resend.
      // Para producción, configura un dominio verificado y cámbialo.
      from: "Portafolio <onboarding@resend.dev>",
      to: [to!],
      replyTo: data.email,
      subject: `[Portafolio] ${data.subject}`,
      text:
        `De: ${data.name} <${data.email}>\n` +
        `Asunto: ${data.subject}\n\n` +
        `${data.message}`,
    });

    if (error) {
      console.error("[CONTACT] Resend error:", error);
      return NextResponse.json(
        { error: "No se pudo enviar el mensaje. Intenta de nuevo." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: result?.id });
  } catch (err) {
    console.error("[CONTACT] Excepción:", err);
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje. Intenta de nuevo." },
      { status: 502 },
    );
  }
}
