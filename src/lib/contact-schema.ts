import { z } from "zod";
import { budgetValues, projectTypeValues, type Dictionary } from "@/i18n/dictionaries";

type Messages = Dictionary["form"]["validation"];

// Shared by the browser (instant feedback) and the server (the real check).
// Error messages come from the page's language.
export function createContactSchema(m: Messages) {
  return z.object({
    name: z.string().trim().min(2, m.name).max(120, m.nameLong),
    email: z.string().trim().email(m.email).max(200, m.email),
    company: z.string().trim().max(160, m.company).optional().or(z.literal("")),
    projectType: z.enum(projectTypeValues, { error: m.projectType }),
    budget: z.enum(budgetValues).optional().or(z.literal("")),
    message: z.string().trim().min(20, m.messageShort).max(5000, m.messageLong),
  });
}

export type ContactInput = z.infer<ReturnType<typeof createContactSchema>>;
export type ContactField = keyof ContactInput;
export type FieldErrors = Partial<Record<ContactField, string>>;

export function readContactForm(formData: FormData) {
  const get = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" ? v : "";
  };
  return {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    projectType: get("projectType"),
    budget: get("budget"),
    message: get("message"),
  };
}

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
