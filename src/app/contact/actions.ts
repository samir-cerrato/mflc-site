"use server";

import { Resend } from "resend";
import { contactSchema } from "@/lib/validators/contact";

type State = { ok?: boolean; error?: string };

export async function submitContact(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const raw = {
      name: (formData.get("name") ?? "").toString(),
      topic: (formData.get("topic") ?? "").toString(),
      contactMethod: (formData.get("contactMethod") ?? "").toString(),

      countryCode: (formData.get("countryCode") ?? "").toString(),
      phone: (formData.get("phone") ?? "").toString(),

      email: (formData.get("email") ?? "").toString(),

      addressLine1: (formData.get("addressLine1") ?? "").toString(),
      addressLine2: (formData.get("addressLine2") ?? "").toString(),
      city: (formData.get("city") ?? "").toString(),
      state: (formData.get("state") ?? "").toString(),
      postalCode: (formData.get("postalCode") ?? "").toString(),
      country: (formData.get("country") ?? "").toString(),

      message: (formData.get("message") ?? "").toString(),
      website: (formData.get("website") ?? "").toString(), // honeypot
    };

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message || "Datos inválidos.";
      return { ok: false, error: msg };
    }

    const {
      name,
      topic,
      contactMethod,
      countryCode,
      phone,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      message,
    } = parsed.data;

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO = process.env.CONTACT_TO_EMAIL;
    const FROM = process.env.CONTACT_FROM_EMAIL;

    if (!RESEND_API_KEY || !TO || !FROM) {
      return {
        ok: false,
        error: "Falta configuración del correo en el servidor.",
      };
    }

    const resend = new Resend(RESEND_API_KEY);

    const topicLabel = {
      oracion: "Petición de Oración",
      consejeria: "Consejería",
      "mas-info": "Más Información",
      sugerencia: "Sugerencia",
      otro: "Otro",
    }[topic];

    const methodLabel = {
      phone: "Llamada telefónica",
      email: "Correo electrónico",
      visit: "Visita a casa",
    }[contactMethod];

    // ✅ Include phone if provided (even if method isn't "phone")
    const fullPhone = phone ? `${countryCode || ""} ${phone}`.trim() : "";

    // ✅ Include address if *any* address field is provided (not only for "visit")
    const addressParts = [
      addressLine1,
      addressLine2,
      [city, state].filter(Boolean).join(", "),
      postalCode,
      country,
    ].filter((v) => v && v.toString().trim().length > 0);
    const addressBlock = addressParts.length ? addressParts.join("\n") : "";

    const text = [
      `Nuevo mensaje del formulario de contacto`,
      `Nombre: ${name}`,
      `Tema: ${topicLabel}`,
      `Método de contacto: ${methodLabel}`,
      `Correo: ${email || "—"}`,
      `Teléfono: ${fullPhone || "—"}`,
      addressBlock ? `\nDirección:\n${addressBlock}` : "",
      ``,
      `Mensaje:`,
      message,
    ]
      .filter(Boolean)
      .join("\n");

    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `Contacto MFLC: ${name} — ${topicLabel}`,
      text,
      replyTo: email || undefined,
    });

    return { ok: true };
  } catch (err) {
    console.error(err);
    return {
      ok: false,
      error: "No pudimos enviar el mensaje. Intenta de nuevo.",
    };
  }
}
