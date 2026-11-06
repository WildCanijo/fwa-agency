import "server-only";
import type { ContactInput } from "@/lib/contact-schema";
import { site } from "@/config/site";

/**
 * INTEGRATION POINT — where contact form messages get delivered.
 *
 * Out of the box this sends email through Resend (https://resend.com) using
 * its REST API, with no extra packages. Set these in .env.local / your host:
 *
 *   RESEND_API_KEY=re_...                      (required)
 *   CONTACT_TO_EMAIL=you@yourdomain.com        (optional, defaults to site.email)
 *   CONTACT_FROM_EMAIL=site@yourdomain.com     (optional, defaults to onboarding@resend.dev)
 *
 * The sender's display name is always site.name ("Romano Web"), whatever name
 * CONTACT_FROM_EMAIL carries, so a rename never needs a settings change.
 *
 * Using Resend without your own domain: sign up at resend.com with the same
 * email as CONTACT_TO_EMAIL and send from "onboarding@resend.dev". Resend lets
 * that test sender deliver only to your own account email, which is all a
 * contact form needs. Verify a domain later to send from your own address.
 *
 * To use another provider (Postmark, SendGrid, a CRM, a Slack webhook...),
 * replace the body of `deliverContactMessage`. Return { ok: true } only when the
 * message really was accepted, so the form never claims a message was sent
 * when it wasn't.
 */

/** "Name <a@b.com>" or "a@b.com" → "a@b.com". Falls back to Resend's test sender. */
function senderAddress(value?: string) {
  const match = value?.match(/<([^>]+)>/);
  const address = (match ? match[1] : value)?.trim();
  return address && address.includes("@") ? address : "onboarding@resend.dev";
}

export type DeliveryResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "provider_error" };

export async function deliverContactMessage(
  data: ContactInput,
  locale: "en" | "es" = "en",
): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = `${site.name} <${senderAddress(process.env.CONTACT_FROM_EMAIL)}>`;

  if (!apiKey) {
    console.warn(
      "[contact] Form submitted but RESEND_API_KEY is not set, so nothing was sent (see src/lib/contact-delivery.ts).",
    );
    return { ok: false, reason: "not_configured" };
  }

  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "—"}`,
    `Project type: ${data.projectType}`,
    `Budget: ${data.budget || "—"}`,
    `Site language: ${locale === "es" ? "Spanish" : "English"}`,
    "",
    data.message,
  ];

  // Everything the visitor typed is escaped before it goes into HTML.
  const esc = (v: string) =>
    v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company || "—"],
    ["Project type", data.projectType],
    ["Budget", data.budget || "—"],
    ["Site language", locale === "es" ? "Spanish" : "English"],
  ];
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111;line-height:1.5">
<p style="margin:0 0 16px;font-size:12px;letter-spacing:2px;color:#ff5a36">ROMANO WEB — NEW ENQUIRY</p>
<table style="border-collapse:collapse;margin-bottom:20px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#777">${k}</td><td style="padding:4px 0"><strong>${esc(v)}</strong></td></tr>`,
    )
    .join("")}</table>
<p style="margin:0 0 6px;color:#777">Message</p>
<p style="margin:0;white-space:pre-wrap">${esc(data.message)}</p>
<p style="margin:24px 0 0;font-size:12px;color:#999">Reply to this email to answer ${esc(data.name)} directly.</p>
</div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `New project enquiry — ${data.name} (${data.projectType})`,
        text: lines.join("\n"),
        html,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[contact] Email provider rejected the message:", res.status, await res.text());
      return { ok: false, reason: "provider_error" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] Could not reach the email provider:", err);
    return { ok: false, reason: "provider_error" };
  }
}
