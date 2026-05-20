"use client";

import { useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

/**
 * Formulario de contacto — fiel al markup de Stitch
 * (campos sin caja, solo border-b, label meta-code uppercase arriba).
 *
 * - Validación cliente + servidor con el mismo schema Zod (lib/contact-schema).
 * - react-hook-form para gestionar estado, errores y blur validation.
 * - Honeypot oculto fuera de pantalla (no aria, no tab, no autocomplete).
 * - Estados: idle / loading / success / error con live region accesible.
 * - aria-invalid + aria-describedby en cada campo con error.
 * - Foco al mensaje de estado tras enviar (success/error).
 */
export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [mocked, setMocked] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const formId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (data: ContactInput) => {
    setState("loading");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        mocked?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        setServerError(
          json.error ?? "No se pudo enviar el mensaje. Intenta de nuevo.",
        );
        setState("error");
      } else {
        setMocked(!!json.mocked);
        setState("success");
        reset();
      }
    } catch {
      setServerError("Sin conexión. Verifica tu red e inténtalo de nuevo.");
      setState("error");
    } finally {
      // Mueve el foco al mensaje de estado para lectores de pantalla.
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  };

  const inputBase =
    "bg-transparent border-0 border-b border-primary p-0 py-2 font-body-lg text-body-lg text-primary placeholder:text-surface-dim transition-none outline-none focus:border-b-2 focus:outline-none";
  const inputError = "border-error focus:border-error";

  const busy = isSubmitting || state === "loading";

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-gutter pt-margin-edge"
      aria-busy={busy}
    >
      {/* Honeypot — fuera de pantalla, fuera del tab, sin autocompletado */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor={`${formId}-website`}>Sitio web (no rellenar)</label>
        <input
          id={`${formId}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {/* NOMBRE */}
      <div className="flex flex-col">
        <label
          htmlFor={`${formId}-name`}
          className="mb-base font-meta-code text-meta-code uppercase text-meta-text"
        >
          Nombre
        </label>
        <input
          id={`${formId}-name`}
          type="text"
          autoComplete="name"
          placeholder="Tu nombre completo"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? `${formId}-name-err` : undefined}
          className={cn(inputBase, errors.name && inputError)}
          {...register("name")}
        />
        {errors.name && (
          <p
            id={`${formId}-name-err`}
            className="mt-2 font-meta-code text-meta-code uppercase text-error"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {/* EMAIL */}
      <div className="flex flex-col">
        <label
          htmlFor={`${formId}-email`}
          className="mb-base font-meta-code text-meta-code uppercase text-meta-text"
        >
          Email
        </label>
        <input
          id={`${formId}-email`}
          type="email"
          autoComplete="email"
          placeholder="tu@email.com"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${formId}-email-err` : undefined}
          className={cn(inputBase, errors.email && inputError)}
          {...register("email")}
        />
        {errors.email && (
          <p
            id={`${formId}-email-err`}
            className="mt-2 font-meta-code text-meta-code uppercase text-error"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* ASUNTO */}
      <div className="flex flex-col">
        <label
          htmlFor={`${formId}-subject`}
          className="mb-base font-meta-code text-meta-code uppercase text-meta-text"
        >
          Asunto
        </label>
        <input
          id={`${formId}-subject`}
          type="text"
          placeholder="Sobre qué quieres hablar"
          aria-invalid={errors.subject ? true : undefined}
          aria-describedby={errors.subject ? `${formId}-subject-err` : undefined}
          className={cn(inputBase, errors.subject && inputError)}
          {...register("subject")}
        />
        {errors.subject && (
          <p
            id={`${formId}-subject-err`}
            className="mt-2 font-meta-code text-meta-code uppercase text-error"
          >
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* MENSAJE */}
      <div className="flex flex-col">
        <label
          htmlFor={`${formId}-message`}
          className="mb-base font-meta-code text-meta-code uppercase text-meta-text"
        >
          Mensaje
        </label>
        <textarea
          id={`${formId}-message`}
          rows={5}
          placeholder="Cuéntame sobre el proyecto…"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${formId}-message-err` : undefined}
          className={cn(inputBase, "resize-none", errors.message && inputError)}
          {...register("message")}
        />
        {errors.message && (
          <p
            id={`${formId}-message-err`}
            className="mt-2 font-meta-code text-meta-code uppercase text-error"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      {/* SUBMIT */}
      <div className="pt-gutter">
        <button
          type="submit"
          disabled={busy}
          className="inline-block w-full border-2 border-primary bg-surface px-8 py-4 text-center font-meta-code text-meta-code uppercase text-primary transition-none hover:bg-primary hover:text-on-primary disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
        >
          {busy ? "Enviando…" : "Enviar mensaje"}
        </button>
      </div>

      {/* Estado / live region accesible */}
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-6 focus:outline-none"
      >
        {state === "success" && (
          <p className="border-2 border-primary bg-surface p-4 font-meta-code text-meta-code uppercase">
            ✓ Mensaje enviado. Te respondo pronto.
            {mocked && (
              <span className="mt-2 block normal-case text-meta-text">
                (Modo simulado: Resend no está configurado todavía. Mira la
                consola del servidor.)
              </span>
            )}
          </p>
        )}
        {state === "error" && (
          <p
            role="alert"
            className="border-2 border-error p-4 font-meta-code text-meta-code uppercase text-error"
          >
            {serverError ?? "No se pudo enviar el mensaje."}
          </p>
        )}
      </div>
    </form>
  );
}
