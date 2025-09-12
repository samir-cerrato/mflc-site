import ContactForm from "./ContactForm";
import { submitContact } from "./actions";
import Link from "next/link";

export const metadata = {
  title: "Contáctanos | MFLC Yonkers",
  description: "Envíanos un mensaje, petición de oración o sugerencia.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-3">
        Contáctanos
      </h1>
      <p className="text-2xl md:text-3xl text-gray-700 text-center mb-8">
        ¿Necesitas oración, consejería, o más información? Llena el formulario o
        utiliza los datos de contacto.
      </p>

      {/* Quick contact cards — larger text */}
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-5">
          <div className="text-lg font-semibold mb-1">Teléfono</div>
          <Link
            href="tel:+19142586720"
            className="text-2xl font-semibold text-blue-700 underline"
          >
            (914) 258-6720
          </Link>
          <p className="text-base text-gray-700 mt-2">Disponible 24/7</p>
        </div>
        <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-5">
          <div className="text-lg font-semibold mb-1">Correo</div>
          <Link
            href="mailto:mflcyonkers@gmail.com"
            className="text-2xl font-semibold text-blue-700 underline"
          >
            mflcyonkers@gmail.com
          </Link>
          <p className="text-base text-gray-700 mt-2">
            Te respondemos lo más pronto posible.
          </p>
        </div>
      </div>

      {/* Form */}
      <ContactForm action={submitContact} />
    </main>
  );
}
