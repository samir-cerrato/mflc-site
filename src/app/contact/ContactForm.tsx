"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";

type State = { ok?: boolean; error?: string };
type SubmitAction = (prevState: State, formData: FormData) => Promise<State>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-3 rounded-xl bg-yellow-600 text-white disabled:opacity-60 text-xl"
    >
      {pending ? "Enviando..." : "Enviar mensaje"}
    </button>
  );
}

const COUNTRY_CODES = [
  { code: "+1", label: "🇺🇸 +1 (USA)" },
  { code: "+52", label: "🇲🇽 +52 (México)" },
  { code: "+503", label: "🇸🇻 +503 (El Salvador)" },
  { code: "+504", label: "🇭🇳 +504 (Honduras)" },
  { code: "+505", label: "🇳🇮 +505 (Nicaragua)" },
  { code: "+506", label: "🇨🇷 +506 (Costa Rica)" },
  { code: "+507", label: "🇵🇦 +507 (Panamá)" },
  { code: "+57", label: "🇨🇴 +57 (Colombia)" },
  { code: "+58", label: "🇻🇪 +58 (Venezuela)" },
  { code: "+34", label: "🇪🇸 +34 (España)" },
  { code: "+51", label: "🇵🇪 +51 (Perú)" },
  { code: "+593", label: "🇪🇨 +593 (Ecuador)" },
  { code: "+502", label: "🇬🇹 +502 (Guatemala)" },
  { code: "+44", label: "🇬🇧 +44 (Reino Unido)" },
  { code: "+33", label: "🇫🇷 +33 (Francia)" },
];

export default function ContactForm({ action }: { action: SubmitAction }) {
  const [state, formAction] = React.useActionState<State, FormData>(action, {
    ok: undefined,
    error: undefined,
  });

  const [contactMethod, setContactMethod] = React.useState<
    "phone" | "email" | "visit" | ""
  >("");
  const [countryCode, setCountryCode] = React.useState("+1");

  // Refs for banners (keep your scroll-to logic if you added it)
  const successRef = React.useRef<HTMLDivElement>(null);
  const errorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (state.ok && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      successRef.current.focus({ preventScroll: true });
    }
  }, [state.ok]);
  React.useEffect(() => {
    if (state.error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      errorRef.current.focus({ preventScroll: true });
    }
  }, [state.error]);

  // Reset after success
  const formRef = React.useRef<HTMLFormElement>(null);
  React.useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      setContactMethod("");
      setCountryCode("+1");
    }
  }, [state.ok]);

  // Bigger, clearer inputs (lighter bg, dark text)
  const inputCls =
    "w-full rounded-md border-2 border-yellow-200 bg-white px-4 py-3 text-xl text-neutral-900 " +
    "placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400";

  return (
    // Wider + darker overall text
    <div className="max-w-5xl w-full text-[1.15rem] md:text-[1.2rem] text-neutral-900">
      {/* Alerts */}
      {state.ok ? (
        <div
          ref={successRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="mb-6 rounded-xl border border-green-300 bg-green-50 p-5 text-lg"
        >
          ¡Gracias! Hemos recibido tu mensaje y te contactaremos pronto.
        </div>
      ) : state.error ? (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          className="mb-6 rounded-xl border border-red-300 bg-red-50 p-5 text-lg"
        >
          {state.error}
        </div>
      ) : null}

      <form
        ref={formRef}
        action={formAction}
        className="space-y-7"
        aria-live="polite"
      >
        {/* Honeypot */}
        <div
          style={{ position: "absolute", left: "-5000px" }}
          aria-hidden="true"
        >
          <label>
            Website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        {/* Datos de contacto (bigger panel) */}
        <section className="rounded-2xl border border-yellow-300 bg-yellow-50 p-7 shadow-sm">
          <h2 className="text-2xl font-semibold mb-5">Datos de contacto</h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-base font-medium mb-1.5">
                Nombre completo *
              </label>
              <input
                name="name"
                required
                className={inputCls}
                placeholder="Tu nombre"
                autoComplete="name"
              />
            </div>

            <div>
              <label className="block text-base font-medium mb-1.5">
                Tema *
              </label>
              <select
                name="topic"
                required
                className={inputCls}
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="oracion">Petición de oración</option>
                <option value="consejeria">Consejería</option>
                <option value="mas-info">Más información</option>
                <option value="sugerencia">Sugerencia</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-base font-medium mb-1.5">
                Método de contacto *
              </label>
              <select
                name="contactMethod"
                required
                className={inputCls}
                value={contactMethod}
                onChange={(e) => setContactMethod(e.target.value as any)}
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="phone">Llamada telefónica</option>
                <option value="email">Correo electrónico</option>
                <option value="visit">Visita a casa</option>
              </select>
            </div>

            <div>
              <label className="block text-base font-medium mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                className={inputCls}
                placeholder="tucorreo@ejemplo.com"
                inputMode="email"
                autoComplete="email"
                required={contactMethod === "email"}
              />
              {contactMethod === "email" && (
                <p className="mt-1 text-sm text-neutral-700">
                  Obligatorio si eliges “Correo electrónico”.
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-[minmax(10rem,13rem)_1fr]">
            <div>
              <label className="block text-base font-medium mb-1.5">
                Código internacional
              </label>
              <select
                name="countryCode"
                className={inputCls}
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                required={contactMethod === "phone"}
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-base font-medium mb-1.5">
                Teléfono
              </label>
              <input
                name="phone"
                className={inputCls}
                placeholder="(914) 555-1234"
                inputMode="tel"
                autoComplete="tel"
                required={contactMethod === "phone"}
              />
              {contactMethod === "phone" && (
                <p className="mt-1 text-sm text-neutral-700">
                  Obligatorio si eliges “Llamada telefónica”.
                </p>
              )}
            </div>
          </div>

          {/* Dirección */}
          <div className="mt-6 grid gap-6">
            <div>
              <label className="block text-base font-medium mb-1.5">
                Calle y número
              </label>
              <input
                name="addressLine1"
                className={inputCls}
                placeholder="Ej.: 191 North Broadway"
                required={contactMethod === "visit"}
              />
            </div>
            <div>
              <label className="block text-base font-medium mb-1.5">
                Apto./Unidad (opcional)
              </label>
              <input
                name="addressLine2"
                className={inputCls}
                placeholder="Apto 3B"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-base font-medium mb-1.5">
                  Ciudad
                </label>
                <input
                  name="city"
                  className={inputCls}
                  required={contactMethod === "visit"}
                />
              </div>
              <div>
                <label className="block text-base font-medium mb-1.5">
                  Estado/Provincia
                </label>
                <input
                  name="state"
                  className={inputCls}
                  required={contactMethod === "visit"}
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-base font-medium mb-1.5">
                  Código postal
                </label>
                <input
                  name="postalCode"
                  className={inputCls}
                  required={contactMethod === "visit"}
                />
              </div>
              <div>
                <label className="block text-base font-medium mb-1.5">
                  País
                </label>
                <input name="country" className={inputCls} placeholder="USA" />
              </div>
            </div>
          </div>
        </section>

        {/* Mensaje (bigger panel) */}
        <section className="rounded-2xl border border-yellow-300 bg-yellow-50 p-7 shadow-sm">
          <h2 className="text-2xl font-semibold mb-5">Mensaje</h2>
          <label className="block text-base font-medium mb-1.5">
            ¿En qué podemos ayudarte? *
          </label>
          <textarea
            name="message"
            required
            rows={6}
            className={inputCls}
            placeholder="Oración, consejería, preguntas, sugerencias..."
          />
        </section>

        <SubmitButton />
      </form>
    </div>
  );
}
