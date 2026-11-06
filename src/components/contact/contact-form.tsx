"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, useTransition, type ReactNode } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { issueFormToken, submitContact, type ContactErrorReason } from "@/lib/contact-action";
import { Turnstile, type TurnstileHandle } from "@/components/contact/turnstile";
import {
  createContactSchema,
  readContactForm,
  toFieldErrors,
  type ContactField,
  type FieldErrors,
} from "@/lib/contact-schema";
import { budgetValues, projectTypeValues, type Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

type Status =
  | { kind: "idle" }
  | { kind: "success" }
  | { kind: "error"; reason: ContactErrorReason | "network" };

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Copy = Dictionary["form"];

export function ContactForm({ locale, t }: { locale: Locale; t: Copy }) {
  const schema = useMemo(() => createContactSchema(t.validation), [t.validation]);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [pending, startTransition] = useTransition();
  const [formToken, setFormToken] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);

  // A signed token proves the submission comes from this page (see src/lib/form-guard.ts).
  const refreshToken = useCallback(() => {
    issueFormToken()
      .then(setFormToken)
      .catch(() => setFormToken(""));
  }, []);
  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  const validateField = (field: ContactField) => {
    if (!formRef.current) return;
    const result = schema.safeParse(readContactForm(new FormData(formRef.current)));
    const all = result.success ? {} : toFieldErrors(result.error);
    setErrors((prev) => ({ ...prev, [field]: all[field] }));
  };

  const onBlur = (field: ContactField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const onChange = (field: ContactField) => {
    // Once a field has shown an error, re-check it as the user types.
    if (touched[field] || errors[field]) validateField(field);
  };

  const focusFirstError = (errs: FieldErrors) => {
    const first = (Object.keys(errs) as ContactField[])[0];
    if (!first || !formRef.current) return;
    formRef.current.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const parsed = schema.safeParse(readContactForm(formData));

    if (!parsed.success) {
      const errs = toFieldErrors(parsed.error);
      setErrors(errs);
      setTouched({ name: true, email: true, projectType: true, message: true, company: true, budget: true });
      focusFirstError(errs);
      return;
    }

    setErrors({});
    setStatus({ kind: "idle" });
    startTransition(async () => {
      try {
        const res = await submitContact(formData);
        if (res.status === "success") {
          setStatus({ kind: "success" });
          form.reset();
          setTouched({});
          refreshToken();
        } else if (res.status === "invalid") {
          setErrors(res.errors);
          focusFirstError(res.errors);
        } else {
          setStatus({ kind: "error", reason: res.reason });
          if (res.reason === "expired" || res.reason === "verification_failed") refreshToken();
        }
      } catch {
        setStatus({ kind: "error", reason: "network" });
      }
      // Turnstile tokens are single-use.
      turnstileRef.current?.reset();
      requestAnimationFrame(() => statusRef.current?.focus());
    });
  };

  if (status.kind === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-line bg-bg-2 p-8 outline-none md:p-12">
        <span className="flex size-12 items-center justify-center bg-accent text-bg">
          <Check aria-hidden="true" className="size-6" />
        </span>
        <h2 className="mt-8 text-[clamp(2rem,4vw,3rem)] leading-none font-bold tracking-[-0.04em] text-fg">
          {t.successTitle}
        </h2>
        <p className="mt-4 max-w-[44ch] text-[16px] leading-relaxed text-muted">{t.successBody}</p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="label-mono mt-8 text-fg underline decoration-line underline-offset-4 hover:decoration-accent"
        >
          {t.another}
        </button>
      </div>
    );
  }

  const errorMessages: Record<ContactErrorReason | "network", string> = {
    not_configured: t.errorNotConfigured,
    provider_error: t.errorProvider,
    network: t.errorNetwork,
    verification_failed: t.errorVerification,
    too_fast: t.errorTooFast,
    expired: t.errorExpired,
    rate_limited: t.errorRateLimited,
  };
  const errorText = status.kind === "error" ? errorMessages[status.reason] : "";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={pending} className="flex flex-col gap-8">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="formToken" value={formToken} />
      <p className="label-mono text-muted">
        {t.requiredBefore} <span className="text-accent">*</span> {t.requiredAfter}
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <Field label={t.name} name="name" required requiredSr={t.requiredSr} error={touched.name ? errors.name : undefined}>
          {(props) => (
            <input {...props} type="text" autoComplete="name" onBlur={() => onBlur("name")} onChange={() => onChange("name")} />
          )}
        </Field>
        <Field label={t.email} name="email" required requiredSr={t.requiredSr} error={touched.email ? errors.email : undefined}>
          {(props) => (
            <input
              {...props}
              type="email"
              inputMode="email"
              autoComplete="email"
              onBlur={() => onBlur("email")}
              onChange={() => onChange("email")}
            />
          )}
        </Field>
      </div>

      <Field
        label={t.company}
        name="company"
        hint={t.optional}
        requiredSr={t.requiredSr}
        error={touched.company ? errors.company : undefined}
      >
        {(props) => (
          <input
            {...props}
            type="text"
            autoComplete="organization"
            onBlur={() => onBlur("company")}
            onChange={() => onChange("company")}
          />
        )}
      </Field>

      <ChoiceGroup
        legend={t.projectType}
        name="projectType"
        values={projectTypeValues}
        labels={t.projectTypes}
        required
        requiredSr={t.requiredSr}
        error={touched.projectType ? errors.projectType : undefined}
        onChange={() => {
          setTouched((prev) => ({ ...prev, projectType: true }));
          validateField("projectType");
        }}
      />

      <ChoiceGroup
        legend={t.budget}
        name="budget"
        values={budgetValues}
        labels={t.budgets}
        hint={t.optional}
        requiredSr={t.requiredSr}
      />

      <Field
        label={t.message}
        name="message"
        required
        requiredSr={t.requiredSr}
        hint={t.messageHint}
        error={touched.message ? errors.message : undefined}
      >
        {(props) => (
          <textarea
            {...props}
            rows={6}
            onBlur={() => onBlur("message")}
            onChange={() => onChange("message")}
            className={cn(props.className, "min-h-40 resize-y py-3")}
          />
        )}
      </Field>

      {/* Honeypot for bots: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {turnstileSiteKey ? (
        <div className="flex flex-col gap-3">
          <span className="label-mono text-muted">{t.humanCheck}</span>
          <Turnstile ref={turnstileRef} siteKey={turnstileSiteKey} language={locale} />
        </div>
      ) : null}

      {status.kind === "error" ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="border border-accent/60 bg-accent/[0.06] p-5 text-[15px] leading-relaxed text-fg outline-none"
        >
          <p className="label-mono text-accent">{t.errorTitle}</p>
          <p className="mt-2">
            {errorText} {t.alsoEmail}{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-accent">
              {site.email}
            </a>
            .
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-6 border-t border-line pt-8">
        <button
          type="submit"
          disabled={pending}
          className="label-mono group inline-flex h-12 items-center gap-3 bg-accent px-6 text-[12px] font-medium text-bg transition-colors duration-300 hover:bg-fg disabled:cursor-progress disabled:opacity-70"
        >
          {pending ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
              {t.sending}
            </>
          ) : (
            <>
              {t.submit}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 motion-safe:group-hover:rotate-45"
              />
            </>
          )}
        </button>
        <span className="sr-only" aria-live="polite">
          {pending ? t.sendingSr : ""}
        </span>
      </div>
    </form>
  );
}

/* ---------------------------------------------------------------- */

const inputClass =
  "w-full border-0 border-b border-line bg-transparent px-0 pb-3 pt-1 text-[18px] text-fg placeholder:text-muted/60 transition-colors duration-300 hover:border-white/25 focus:border-accent focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-accent";

type FieldRenderProps = {
  id: string;
  name: string;
  required?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  className: string;
};

function RequiredMark({ sr }: { sr: string }) {
  return (
    <>
      <span className="text-accent" aria-hidden="true">
        *
      </span>
      <span className="sr-only">{sr}</span>
    </>
  );
}

function Field({
  label,
  name,
  required,
  requiredSr,
  hint,
  error,
  children,
}: {
  label: string;
  name: ContactField;
  required?: boolean;
  requiredSr: string;
  hint?: string;
  error?: string;
  children: (props: FieldRenderProps) => ReactNode;
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label-mono flex items-baseline gap-2 text-muted">
        <span className="text-fg">{label}</span>
        {required ? <RequiredMark sr={requiredSr} /> : null}
        {hint && !required ? <span id={hintId}>{hint}</span> : null}
      </label>
      {children({
        id,
        name,
        required,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
        className: inputClass,
      })}
      {hint && required ? (
        <span id={hintId} className="text-[13px] text-muted">
          {hint}
        </span>
      ) : null}
      {error ? (
        <span id={errorId} className="label-mono text-accent">
          {error}
        </span>
      ) : null}
    </div>
  );
}

function ChoiceGroup({
  legend,
  name,
  values,
  labels,
  required,
  requiredSr,
  hint,
  error,
  onChange,
}: {
  legend: string;
  name: ContactField;
  values: readonly string[];
  labels: readonly string[];
  required?: boolean;
  requiredSr: string;
  hint?: string;
  error?: string;
  onChange?: () => void;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="label-mono mb-4 flex items-baseline gap-2 text-muted">
        <span className="text-fg">{legend}</span>
        {required ? <RequiredMark sr={requiredSr} /> : null}
        {hint ? <span>{hint}</span> : null}
      </legend>
      <div className="flex flex-wrap gap-2">
        {values.map((value, i) => (
          <label key={value} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={value}
              required={required}
              onChange={onChange}
              className="peer absolute inset-0 cursor-pointer opacity-0"
            />
            <span
              className={cn(
                "label-mono flex h-10 items-center border px-4 text-[11px] text-muted transition-colors duration-200",
                "peer-hover:border-white/30 peer-hover:text-fg",
                "peer-checked:border-accent peer-checked:bg-accent peer-checked:text-bg",
                "peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
                error ? "border-accent/60" : "border-line",
              )}
            >
              {labels[i] ?? value}
            </span>
          </label>
        ))}
      </div>
      {error ? (
        <p id={errorId} className="label-mono mt-3 text-accent">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
