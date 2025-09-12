import { z } from "zod";

const TOPICS = [
  "oracion",
  "consejeria",
  "mas-info",
  "sugerencia",
  "otro",
] as const;
const METHODS = ["phone", "email", "visit"] as const;

export const contactSchema = z
  .object({
    name: z.string().min(2, "Por favor escribe tu nombre."),

    // ✅ Use { message } instead of { required_error }
    topic: z.enum(TOPICS, { message: "Selecciona un tema." }),

    // ✅ Same here
    contactMethod: z.enum(METHODS, {
      message: "Selecciona un método de contacto.",
    }),

    // Phone
    countryCode: z.string().optional(),
    phone: z
      .string()
      .trim()
      .optional()
      .refine((v) => !v || /^[\d\s()+-]{6,20}$/.test(v), "Teléfono inválido."),

    // Email
    email: z
      .string()
      .trim()
      .email("Correo inválido.")
      .optional()
      .or(z.literal("")),

    // House-visit address
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),

    message: z
      .string()
      .min(10, "Cuéntanos un poco más, por favor (mín. 10 caracteres)."),

    // Honeypot
    website: z.string().max(0, "Bot detectado."),
  })
  .superRefine((data, ctx) => {
    if (data.contactMethod === "phone") {
      if (!data.phone?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message: "Incluye tu número de teléfono.",
        });
      }
      if (!data.countryCode?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["countryCode"],
          message: "Selecciona el código internacional.",
        });
      }
    }

    if (data.contactMethod === "email") {
      if (!data.email?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: "Incluye tu correo electrónico.",
        });
      }
    }

    if (data.contactMethod === "visit") {
      if (!data.addressLine1 || !data.city || !data.state || !data.postalCode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["addressLine1"],
          message:
            "Incluye la dirección completa (calle, ciudad, estado/provincia y código postal).",
        });
      }
    }
  });

export type ContactFormData = z.infer<typeof contactSchema>;
