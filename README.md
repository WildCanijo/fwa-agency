# FWD Studio — website

Marketing site for FWD Studio, an independent digital studio. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Before launch

| What | Where |
| --- | --- |
| Real business email (shown on the site) | `src/config/site.ts` → `email` |
| Real domain (canonical URLs, Open Graph) | `NEXT_PUBLIC_SITE_URL` env var, or `site.url` |
| Contact form delivery | Add your Resend key to `RESEND_API_KEY` in `.env.local` (see Contact form below) |
| Concept projects → real case studies | `src/components/home/work.tsx` (`projects` array) |
| "Taking on new projects" label in the hero | `hero.meta` in `src/i18n/dictionaries.ts` (both languages) |

### Contact form

Messages go to `CONTACT_TO_EMAIL` (set in `.env.local`) through [Resend](https://resend.com).

**Setup (about 5 minutes):**
1. Sign up at resend.com **with the same email as `CONTACT_TO_EMAIL`**.
2. Create an API key (API Keys → Create) and paste it into `RESEND_API_KEY` in `.env.local`.
3. Restart the dev server. Submit the form; the email arrives from `onboarding@resend.dev`, and replying goes straight to the visitor.

`onboarding@resend.dev` can only deliver to your own Resend account email, which is all a contact form needs. To send from your own address, verify a domain in Resend and change `CONTACT_FROM_EMAIL`.

When you deploy, add the same variables in your hosting provider's settings.

**Protection** (`src/lib/form-guard.ts`):
- Signed form token (HMAC with `CONTACT_FORM_SECRET`). Forged or missing tokens are rejected.
- Timing: submissions under 3 seconds after load, or with a token over 2 hours old, are rejected.
- Rate limit: 5 messages per visitor every 10 minutes (in memory, per server).
- Hidden honeypot field for bots.
- Next.js rejects server action calls from other origins.
- Optional Cloudflare Turnstile human check: set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.

Validation runs in the browser and again on the server (`src/lib/contact-action.ts`, schema in `src/lib/contact-schema.ts`). The form only shows success when the email provider accepted the message.

## Languages

The site is in English and Spanish:

| Page | English | Spanish |
| --- | --- | --- |
| Home | `/` | `/es` |
| Contact | `/contact` | `/es/contacto` |

- All copy lives in `src/i18n/dictionaries.ts`, one object per language. Change text there, not in the components.
- URLs per page are in `src/i18n/config.ts` (`paths`).
- Each language has its own root layout (`src/app/(en)` and `src/app/(es)`), so `<html lang>` is correct for each one. Switching language is a full page load.
- The EN / ES switch in the nav links to the same page in the other language. Pages declare `hreflang` alternates, and the sitemap lists both languages.
- Contact form errors are translated. Enquiries are always delivered in English, with a "Site language" line.
- Unknown URLs show a bilingual 404 (`src/app/global-not-found.tsx`, which needs the `experimental.globalNotFound` flag in `next.config.ts`).

## Structure

```
src/
  app/(en), app/(es)    English and Spanish routes, each with its own root layout
  app/                  icon, robots, sitemap, bilingual 404
  i18n/                 languages, URL paths, all page copy
  config/site.ts        site-wide settings (name, owner, email, domain)
  components/
    ui/                 21st.dev components, adapted (halftone footer, scramble link)
    home/               homepage sections
    work/               device frames and illustrated concept screens
    contact/            contact form
    layout/             nav, footer, wordmark, grid guides
    motion/             Reveal, Magnetic, Parallax
  lib/                  form schema, delivery, utils
```

## Design system

Tokens live at the top of `src/app/globals.css`: background `#0B0B0B` / `#121212`, text `#F3F1EC`, muted `#929292`, accent `#FF5A36`, hairline borders `rgba(255,255,255,0.12)`. Type: Inter Tight (display and body) and JetBrains Mono (labels, metadata).

All motion respects `prefers-reduced-motion`. The canvases (hero field and footer) pause when off-screen.

### 21st.dev components

- **Halftone Wordmark Footer** by @kedhareswer: the canvas engine is unchanged. It was adapted to read Next.js font variables, use `next/link` for internal links, and respect reduced motion on back-to-top.
- **Scramble Link Button** by @hyperiux: used for nav links and CTAs. It now renders `next/link`, announces its label once to screen readers, and accepts an icon element so server components can use it.
