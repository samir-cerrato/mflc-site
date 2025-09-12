// src/app/visit/page.tsx
import Link from "next/link";
import { MapPin, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import CopyAddressButton from "./CopyAddressButton";

export const metadata: Metadata = {
  alternates: { canonical: "/visit" },
  title: "Visítanos",
  description: "Conoce nuestra iglesia, horarios y preguntas.",
};

const ADDRESS_TEXT = "191 North Broadway, Yonkers, NY 10701";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS_TEXT
)}`;
const EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS_TEXT
)}&output=embed`;
const FACEBOOK_URL = "https://www.facebook.com/ministeriofamiliarlacosecha";
const YOUTUBE_URL = "https://www.youtube.com/@MFLCYONKERS";
const ZELLE_URL = "https://www.zellepay.com/";

type QA = { q: string; a: ReactNode };
const FAQ: QA[] = [
  {
    q: "¿Debo ser miembro para asistir?",
    a: "No. Todos son bienvenidos—ven tal como eres.",
  },
  {
    q: "¿Qué me pongo?",
    a: "Ven cómodo y modesto; no hay código de vestimenta.",
  },
  {
    q: "¿Cuál es la duración del servicio? ¿Qué puedo esperar del servicio?",
    a: "Aproximadamente 90–120 minutos. Incluye alabanza y oración, la palabra de ofrenda y un mensaje bíblico práctico. Al final hay ministración de oración y un rico protemplo.",
  },
  {
    q: "¿Puedo venir con niños?",
    a: "¡Claro! Los niños son bienvenidos en el templo. Los sábados hay clases para niños de 5–14 años durante el culto.",
  },
  {
    q: "¿Transmiten en vivo o suben los mensajes?",
    a: (
      <>
        Sí, transmitimos y subimos nuestras predicaciones en{" "}
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-yellow-700"
        >
          Facebook
        </a>{" "}
        y{" "}
        <a
          href={YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-yellow-700"
        >
          YouTube
        </a>
        .
      </>
    ),
  },
  {
    q: "¿Cómo puedo pedir oración?",
    a: (
      <>
        Llámanos al{" "}
        <a href="tel:+19142586720" className="underline hover:text-yellow-700">
          (914) 258-6720
        </a>
        , o mándanos un DM en redes, o completa el formulario{" "}
        <Link href="/contact" className="underline hover:text-yellow-700">
          aquí
        </Link>
        .
      </>
    ),
  },
  {
    q: "¿Cómo llego en transporte público?",
    a: (
      <>
        Líneas 6, 25 o 30 con paradas en North Broadway y Ashburton Ave, o línea
        78 con paradas en Palisade Ave y Ashburton Ave. Ver rutas en Google Maps
        desde{" "}
        <a href="#mapa" className="underline hover:text-yellow-700">
          el mapa arriba
        </a>
        .
      </>
    ),
  },
  {
    q: "¿Cómo puedo dar/ofrendar?",
    a: (
      <>
        En persona o por{" "}
        <a
          href={ZELLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-yellow-700"
        >
          Zelle
        </a>{" "}
        al{" "}
        <a href="tel:+19142586720" className="underline hover:text-yellow-700">
          (914) 258-6720
        </a>{" "}
        y escribe una pequeña nota diciendo para qué sirve (ej.: diezmos,
        protemplo, etc.). ¡Gracias por apoyar la obra!
      </>
    ),
  },
];

const SERVICES = [
  { title: "Discipulado (Martes)", time: "7:30 pm" },
  { title: "Servicio (Viernes)", time: "7:30 pm" },
  { title: "Vigilia (último viernes del mes)", time: "11:00 pm" },
  { title: "Oración (Sábado)", time: "9:00 am" },
  { title: "Servicio (Sábado)", time: "7:00 pm" },
  { title: "Servicio (Domingo)", time: "2:30 pm" },
];

export default function VisitPage() {
  const leftCol = SERVICES.slice(0, 3);
  const rightCol = SERVICES.slice(3, 6);

  return (
    <main className="mx-auto w-full max-w-screen-2xl px-3 md:px-6 py-10">
      {/* Heading */}
      <header className="mb-8 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Visítanos
        </h1>
        <p className="mt-3 text-xl md:text-3xl text-neutral-700">
          Si buscas un lugar para adorar, vives cerca o conoces a alguien que
          anhela la presencia de Dios, te esperamos con los brazos abiertos en{" "}
          <Link href="/nosotros">
            <span className="font-semibold underline hover:text-yellow-700">
              Ministerio Familiar La Cosecha
            </span>
          </Link>
          . Si tienes preguntas o inquietudes,{" "}
          <Link href="/contact" className="underline hover:text-yellow-700">
            contáctanos
          </Link>
          .
        </p>
      </header>

      {/* MAPA */}
      <section
        id="mapa"
        className="relative rounded-3xl border border-yellow-400 bg-yellow-100 shadow"
      >
        <div className="aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-3xl">
          <iframe
            src={EMBED_URL}
            className="h-full w-full"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title={`Mapa de ${ADDRESS_TEXT}`}
          />
        </div>

        <div
          className="pointer-events-none absolute right-2 top-2 rounded-lg bg-white/90 px-3 py-2 shadow-lg
                     md:right-3 md:top-3 md:rounded-2xl md:px-5 md:py-3"
        >
          <div className="text-sm md:text-lg font-semibold leading-tight">
            Mapa interactivo
          </div>
        </div>
      </section>

      {/* Dirección + Horarios */}
      <section className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 items-stretch">
        {/* Dirección */}
        <div className="flex flex-col justify-center rounded-3xl border border-yellow-400 bg-white p-6 md:p-8 shadow text-center h-full">
          <div>
            <h2 className="mb-3 text-2xl md:text-3xl font-bold">Dirección</h2>
            <address className="not-italic text-xl md:text-2xl leading-relaxed mt-2">
              <span className="block font-bold text-xl md:text-2xl">
                191 North Broadway
              </span>
              <span className="block text-lg md:text-xl">
                Yonkers, NY 10701
              </span>
            </address>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-300 px-5 py-3 text-base md:text-lg font-medium hover:bg-yellow-400"
              aria-label="Abrir dirección en Google Maps"
            >
              <MapPin className="h-5 w-5" />
              Cómo llegar
              <ExternalLink className="h-4 w-4" />
            </Link>

            {/* Client child for clipboard */}
            <CopyAddressButton address={ADDRESS_TEXT} />
          </div>
        </div>

        {/* Horarios */}
        <div className="rounded-3xl border border-yellow-400 bg-white p-6 md:p-8 shadow text-center h-full">
          <h2 className="mb-3 text-2xl md:text-3xl font-bold">
            Horarios de servicio
          </h2>

          <div className="mx-auto grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-6">
            <ul className="space-y-4 text-lg md:text-xl">
              {leftCol.map((s, idx) => (
                <li key={idx} className="leading-tight">
                  <span className="block font-semibold">{s.title}</span>
                  <span>{s.time}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-4 text-lg md:text-xl">
              {rightCol.map((s, idx) => (
                <li key={idx} className="leading-tight">
                  <span className="block font-semibold">{s.title}</span>
                  <span>{s.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-10 rounded-3xl border border-yellow-400 bg-white p-6 md:p-8 shadow">
        <h2 className="mb-4 text-2xl md:text-3xl font-bold text-center">
          Preguntas frecuentes
        </h2>

        <div className="w-full space-y-3">
          {FAQ.map((item, i) => {
            const bg = i % 2 === 0 ? "bg-yellow-50" : "bg-yellow-100";
            return (
              <details key={i} className={`group ${bg} rounded-xl px-4 py-3`}>
                <summary className="flex cursor-pointer list-none items-center justify-between">
                  <span className="text-base md:text-lg font-medium">
                    {String(i + 1).padStart(2, "0")}. {item.q}
                  </span>
                  <span className="ml-4 text-sm text-neutral-500 transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-2 text-neutral-700">{item.a}</p>
              </details>
            );
          })}
        </div>
      </section>
    </main>
  );
}
