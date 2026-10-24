"use client";

import { useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  contactKinds,
  contactSchema,
  type ContactErrorCode,
  type ContactInput,
} from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

/**
 * Formulario de contacto.
 * - Validación cliente + servidor con el mismo schema Zod (lib/contact-schema);
 *   los errores llegan como códigos y se traducen con el diccionario.
 * - Tipo de consulta (full-time / freelance / otro) como radios con forma de chip.
 * - Honeypot oculto fuera de pantalla.
 * - Estados idle / loading / success / error con live region y foco al resultado.
 */
export function ContactForm({ t }: { t: Dictionary["contact"]["form"] }) {
  const [state, setState] = useState<FormState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [mocked, setMocked] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      kind: "job",
      name: "",
      email: "",
      company: "",
      message: "",
      website: "",
    },
  });
  const kind = watch("kind");

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
      };
      if (!res.ok || !json.ok) {
        setServerError(t.failed);
        setState("error");
      } else {
        setMocked(!!json.mocked);
        setState("success");
        reset();
      }
    } catch {
      setServerError(t.offline);
      setState("error");
    } finally {
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  };

  const errorText = (msg?: string) =>
    msg ? (t.errors[msg as ContactErrorCode] ?? msg) : null;
  const busy = isSubmitting || state === "loading";
  const input =
    "w-full bg-tone px-4 py-3.5 outline-none transition-colors duration-150 placeholder:text-soft hover:bg-tone-2 focus:outline-2 focus:-outline-offset-2 focus:outline-ink";
  const invalid = "outline-2 -outline-offset-2 outline-error";

  const field = (
    name: "name" | "email" | "company",
    label: string,
    type: string,
    autoComplete: string,
  ) => {
    const err = errorText(errors[name]?.message);
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-${name}`}>{label}</label>
        <input
          id={`${id}-${name}`}
          type={type}
          autoComplete={autoComplete}
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? `${id}-${name}-err` : undefined}
          className={cn(input, err && invalid)}
          {...register(name)}
        />
        {err ? (
          <p id={`${id}-${name}-err`} className="text-error">
            {err}
          </p>
        ) : null}
      </div>
    );
  };

  const messageErr = errorText(errors.message?.message);

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      aria-busy={busy}
      className="relative flex flex-col gap-5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor={`${id}-website`}>{t.honeypot}</label>
        <input
          id={`${id}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <fieldset>
        <legend className="mb-3">{t.kindLabel}</legend>
        <div className="flex flex-wrap gap-2">
          {contactKinds.map((k) => (
            <label
              key={k}
              className={cn(
                "inline-flex min-h-11 cursor-pointer items-center px-4 font-medium transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2",
                kind === k ? "bg-ink text-on-ink" : "bg-tone hover:bg-tone-2",
              )}
            >
              <input
                type="radio"
                value={k}
                className="sr-only"
                {...register("kind")}
              />
              {t.kinds[k]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-3">
        {field("name", t.name, "text", "name")}
        {field("email", t.email, "email", "email")}
      </div>
      {field("company", t.company, "text", "organization")}

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-message`}>{t.message}</label>
        <textarea
          id={`${id}-message`}
          rows={5}
          placeholder={t.messagePlaceholder}
          aria-invalid={messageErr ? true : undefined}
          aria-describedby={messageErr ? `${id}-message-err` : undefined}
          className={cn(input, "resize-y", messageErr && invalid)}
          {...register("message")}
        />
        {messageErr ? (
          <p id={`${id}-message-err`} className="text-error">
            {messageErr}
          </p>
        ) : null}
      </div>

      <div>
        <button
          type="submit"
          disabled={busy}
          className="bg-accent text-ink hover:bg-ink hover:text-on-ink inline-flex min-h-12 w-full items-center justify-center px-6 py-3 font-medium transition-colors duration-150 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {busy ? t.sending : t.submit}
        </button>
      </div>

      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="focus:outline-none"
      >
        {state === "success" ? (
          <p className="bg-tone p-4">
            {t.success}
            {mocked ? (
              <span className="text-soft mt-2 block">{t.mocked}</span>
            ) : null}
          </p>
        ) : null}
        {state === "error" ? (
          <p role="alert" className="bg-tone text-error p-4">
            {serverError ?? t.failed}
          </p>
        ) : null}
      </div>
    </form>
  );
}
