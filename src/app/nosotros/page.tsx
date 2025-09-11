// src/app/nosotros/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import GalleryCarousel from "@/components/GalleryCarousel";

export const metadata: Metadata = {
  title: "Nosotros | Ministerio Familiar La Cosecha",
  description: "Conoce nuestra misión, visión y liderazgo.",
};

export default function NosotrosPage() {
  return (
    <main className="bg-yellow-100 min-h-screen">
      {/* HERO BANNER (full width under navbar) */}
      <section className="relative w-full">
        <div className="relative h-[280px] sm:h-[340px] md:h-[420px] lg:h-[520px] xl:h-[580px] overflow-hidden">
          {/* Mobile image */}
          <Image
            src="/about-us-mobile.png"
            alt="Imagen de cabecera (móvil)"
            fill
            sizes="100vw"
            className="object-cover object-center block md:hidden"
            priority
          />
          {/* Desktop/tablet image */}
          <Image
            src="/about-us.jpg"
            alt="Imagen de cabecera (desktop)"
            fill
            sizes="100vw"
            className="object-cover md:object-[42%_92%] hidden md:block"
            /* no priority here to avoid preloading both */
          />

          {/* Overlay + title (stays the same) */}
          <div className="absolute inset-0 flex items-end justify-center pb-8 md:pb-14">
            <h1 className="text-white text-center text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] translate-y-3 sm:translate-y-3">
              Quiénes Somos
            </h1>
          </div>
        </div>
      </section>

      {/* ======= ABOUT LAYOUT (8 boxes) ======= */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        {/* Row 1: [1: Video placeholder] [2: Misión] [3: Visión] */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Box 1: YouTube placeholder (16:9) */}
          <article className="rounded-2xl border border-yellow-200 bg-white/60 p-0 overflow-hidden">
            <div className="relative w-full">
              {/* 16:9 ratio via padding-top trick */}
              <div className="relative w-full pt-[56.25%] bg-black/5">
                <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-yellow-100 to-yellow-200 text-black">
                  <div className="text-center p-4">
                    <div className="text-lg font-semibold">
                      Video (placeholder)
                    </div>
                    <p className="text-sm text-black/80">
                      Aquí irá tu video de YouTube. <br />
                      (Pegaremos el iframe cuando lo tengas.)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Box 2: Misión */}
          <article className="rounded-2xl border border-yellow-200 bg-white/60 p-6">
            <h2 className="text-2xl font-semibold">Misión</h2>
            <p className="mt-3 text-gray-700">
              [Escribe aquí la declaración de misión. Mantén 2–4 frases claras y
              centradas en Jesucristo, discipulado y servicio a la comunidad.]
            </p>
          </article>

          {/* Box 3: Visión */}
          <article className="rounded-2xl border border-yellow-200 bg-white/60 p-6">
            <h2 className="text-2xl font-semibold">Visión</h2>
            <p className="mt-3 text-gray-700">
              [Escribe aquí la declaración de visión. 2–4 frases sobre el futuro
              deseado, unidad de la iglesia y transformación de la
              ciudad/familias.]
            </p>
          </article>
        </section>

        {/* Row 2: [4: Pastor img] [5: Pastor bio] [6: Pastora img] [7: Pastora bio] */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Box 4: Pastor image placeholder (3:4-ish) */}
          <div className="rounded-2xl border border-yellow-200 bg-white/60 overflow-hidden">
            <div className="relative w-full pt-[133%] bg-gradient-to-br from-yellow-100 to-yellow-300">
              <div className="absolute inset-0 grid place-items-center text-black/70 italic">
                Foto Pastor (placeholder)
              </div>
            </div>
          </div>

          {/* Box 5: Pastor bio */}
          <article className="rounded-2xl border border-yellow-200 bg-white/60 p-6">
            <h3 className="text-xl font-semibold">Pr. [Nombre del Pastor]</h3>
            <p className="mt-3 text-gray-700">
              [Biografía breve: años de ministerio, áreas de énfasis (enseñanza,
              familias, jóvenes), formación, y una frase de corazón pastoral.]
            </p>
            <p className="mt-2 text-gray-700">
              [Añade 1–2 datos humanos (familia, hobbies, servicio
              comunitario).]
            </p>
          </article>

          {/* Box 6: Pastora image placeholder (3:4-ish) */}
          <div className="rounded-2xl border border-yellow-200 bg-white/60 overflow-hidden">
            <div className="relative w-full pt-[133%] bg-gradient-to-br from-yellow-100 to-yellow-300">
              <div className="absolute inset-0 grid place-items-center text-black/70 italic">
                Foto Pastora (placeholder)
              </div>
            </div>
          </div>

          {/* Box 7: Pastora bio */}
          <article className="rounded-2xl border border-yellow-200 bg-white/60 p-6">
            <h3 className="text-xl font-semibold">
              Pra. [Nombre de la Pastora]
            </h3>
            <p className="mt-3 text-gray-700">
              [Biografía breve: años de ministerio, áreas de énfasis, dones, y
              visión para la iglesia/comunidad.]
            </p>
            <p className="mt-2 text-gray-700">
              [Añade 1–2 datos personales: familia, estudios, pasiones.]
            </p>
          </article>
        </section>

        {/* Row 3: [8: Gallery] */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Galería</h2>
          <div className="rounded-2xl border border-yellow-200 bg-white/60 p-0">
            {/* Pass items when you have real photos; captions appear over the image */}
            <GalleryCarousel
              items={[
                // When ready, replace with: { src: "/galeria/01.jpg", alt: "Bautismos en agosto", caption: "Bautismos – Agosto" },
                { caption: "Ejemplo: Bautismos – Agosto (placeholder)" },
                { caption: "Ejemplo: Servicio de Adoración (placeholder)" },
                { caption: "Ejemplo: Día de Comunidad (placeholder)" },
              ]}
              intervalMs={30000}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
