"use server";

import { headers } from "next/headers";
import { createContactSchema, readContactForm, toFieldErrors, type FieldErrors } from "@/lib/contact-schema";
import { deliverContactMessage } from "@/lib/contact-delivery";
import { clientIp, createFormToken, rateLimit, verifyFormToken, verifyTurnstile } from "@/lib/form-guard";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export type ContactErrorReason =
  | "not_configured"
  | "provider_error"
  | "verification_failed"
  | "too_fast"
  | "expired"
  | "rate_limited";

export type ContactResult =
  | { status: "success" }
  | { status: "invalid"; errors: FieldErrors }
  | { status: "error"; reason: ContactErrorReason };

/** Called by the form when it loads. See src/lib/form-guard.ts. */
export async function issueFormToken(): Promise<string> {
  try {
    return createFormToken();
  } catch (err) {
    console.error("[contact] Could not issue a form token:", err);
    return "";
  }
}

export async function submitContact(formData: FormData): Promise<ContactResult> {
  // Honeypot: real people never see or fill this field. Pretend it worked.
  const trap = formData.get("website");
  if (typeof trap === "string" && trap.length > 0) {
    return { status: "success" };
  }

  // 1. Signed token and timing.
  let token: ReturnType<typeof verifyFormToken>;
  try {
    token = verifyFormToken(formData.get("formToken"));
  } catch (err) {
    console.error("[contact] Could not verify the form token:", err);
    return { status: "error", reason: "verification_failed" };
  }
  if (token === "too_fast") return { status: "error", reason: "too_fast" };
  if (token === "expired") return { status: "error", reason: "expired" };
  if (token !== "ok") return { status: "error", reason: "verification_failed" };

  // 2. Rate limit per visitor.
  const ip = clientIp(await headers());
  if (!rateLimit(ip)) return { status: "error", reason: "rate_limited" };

  // 3. Human check (only when Turnstile keys are configured).
  if (!(await verifyTurnstile(formData.get("cf-turnstile-response"), ip))) {
    return { status: "error", reason: "verification_failed" };
  }

  // 4. Validate the fields.
  const locale: Locale = formData.get("locale") === "es" ? "es" : "en";
  const schema = createContactSchema(getDictionary(locale).form.validation);
  const parsed = schema.safeParse(readContactForm(formData));
  if (!parsed.success) {
    return { status: "invalid", errors: toFieldErrors(parsed.error) };
  }

  // 5. Deliver.
  const result = await deliverContactMessage(parsed.data, locale);
  if (!result.ok) return { status: "error", reason: result.reason };
  return { status: "success" };
}
