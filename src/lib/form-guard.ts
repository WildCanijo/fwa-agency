import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Checks that a contact form submission came from a real visitor on this site.
 *
 * 1. Signed form token. The page asks the server for a token when the form
 *    loads. It's an HMAC signature of the time it was issued, made with
 *    CONTACT_FORM_SECRET. Forged, tampered or missing tokens are rejected.
 * 2. Timing. Submissions less than 3 seconds after the form loaded, or with a
 *    token older than 2 hours, are rejected. Bots tend to submit instantly.
 * 3. Rate limit. At most 5 submissions per visitor (IP) every 10 minutes.
 * 4. Cloudflare Turnstile (optional). A human check that runs when
 *    NEXT_PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY are both set.
 *
 * Next.js also rejects server action requests whose Origin doesn't match the
 * site's host, so other websites can't post to this form.
 */

const MIN_AGE_MS = 3_000;
const MAX_AGE_MS = 2 * 60 * 60 * 1000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function secret() {
  const value = process.env.CONTACT_FORM_SECRET;
  if (value && value.length >= 32) return value;
  if (process.env.NODE_ENV === "production") {
    // Without a secret, tokens can't be trusted: refuse every submission.
    throw new Error("CONTACT_FORM_SECRET is missing or shorter than 32 characters.");
  }
  // Local development only.
  return "dev-only-secret-do-not-use-in-production-0000";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createFormToken(now = Date.now()) {
  const issued = String(now);
  return `${issued}.${sign(issued)}`;
}

export type TokenCheck = "ok" | "invalid" | "too_fast" | "expired";

export function verifyFormToken(token: unknown, now = Date.now()): TokenCheck {
  if (typeof token !== "string") return "invalid";
  const [issued, signature] = token.split(".");
  if (!issued || !signature || !/^\d+$/.test(issued)) return "invalid";

  const expected = Buffer.from(sign(issued));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return "invalid";

  const age = now - Number(issued);
  if (age < MIN_AGE_MS) return "too_fast";
  if (age > MAX_AGE_MS) return "expired";
  return "ok";
}

// In-memory rate limit. Good for a single server. On serverless hosting each
// instance keeps its own count, so treat it as a speed bump; Turnstile is the
// stronger check there.
const hits = new Map<string, number[]>();

export function rateLimit(key: string, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  // Keep the map from growing without bound.
  if (hits.size > 5_000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
    }
  }
  return true;
}

export function turnstileEnabled() {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstile(token: unknown, ip?: string) {
  if (!turnstileEnabled()) return true;
  if (typeof token !== "string" || !token) return false;
  try {
    const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY!, response: token });
    if (ip) body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      cache: "no-store",
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[contact] Turnstile verification failed:", err);
    return false;
  }
}

/** Best-effort visitor IP from proxy headers. */
export function clientIp(h: Headers) {
  return (
    h.get("cf-connecting-ip") ??
    h.get("x-real-ip") ??
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
