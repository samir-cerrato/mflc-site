// src/components/Hero.tsx
"use client";

import Image from "next/image";
import React from "react";

export default function Hero() {
  const scrollTo = (id: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative w-full max-w-[100vw] h-[100svh] bg-yellow-50 overflow-hidden">
      {/* Mobile image (no crop, can stretch) */}
      <Image
        src="/thumbnail2026_with_bgc.png"
        alt="Fondo del héroe (móvil)"
        fill
        priority
        className="block md:hidden object-fill object-center bg-yellow-50"
        sizes="(max-width: 767px) 100vw, 0px"
      />

      {/* Desktop image (no crop, can stretch) */}
      <Image
        src="/thumbnail2026.png"
        alt="Fondo del héroe (escritorio)"
        fill
        priority
        className="hidden md:block object-fill object-center bg-yellow-50"
        sizes="(max-width: 767px) 0px, 100vw"
      />

      {/* ===== Mobile: WELCOME TEXTBOX (top) ===== */}
      <div className="absolute inset-x-0 top-20 sm:top-24 z-10 md:hidden px-4">
        <div
          className="mx-auto max-w-md rounded-2xl border border-yellow-600/30
                        bg-white/45 backdrop-blur-md p-4 shadow-lg text-black"
        >
          <h1 className="text-2xl font-extrabold tracking-tight text-center">
            Bienvenidos a <span className="whitespace-nowrap">La Cosecha</span>
          </h1>
          <p className="mt-2 text-lg leading-snug">
            Somos una <strong>Iglesia Cristiana</strong> en{" "}
            <strong>Yonkers, NY</strong>. En{" "}
            <strong>Ministerio Familiar La Cosecha</strong> amamos a Dios y a
            las familias, y te invitamos a adorar con nosotros, crecer en la fe
            y servir a nuestra ciudad.
          </p>
        </div>
      </div>

      {/* ===== Mobile: BUTTONS (moved up a bit) ===== */}
      <div className="absolute inset-x-0 bottom-16 sm:bottom-20 z-10 md:hidden px-4">
        <div className="mx-auto flex max-w-md flex-col gap-4 items-stretch">
          <a
            href="#eventos"
            onClick={(e) => scrollTo("eventos", e)}
            className="inline-block rounded-3xl bg-yellow-400 hover:bg-yellow-500
                       border border-yellow-600/40 shadow-xl text-black font-extrabold tracking-tight
                       text-2xl px-8 py-4 text-center transition"
          >
            Ver Eventos
          </a>
          <a
            href="#votd"
            onClick={(e) => scrollTo("votd", e)}
            className="inline-block rounded-3xl bg-yellow-400 hover:bg-yellow-500
                       border border-yellow-600/40 shadow-xl text-black font-extrabold tracking-tight
                       text-2xl px-8 py-4 text-center transition"
          >
            Versículo del Día
          </a>
        </div>
      </div>

      {/* ===== Desktop: TEXTBOX + BUTTONS ===== */}
      <div className="relative z-10 hidden h-full w-full md:block">
        <div className="absolute top-1/2 -translate-y-1/2 left-[8%] lg:left-[10%] xl:left-[12%] 2xl:left-[14%]">
          {/* Textbox (semi-transparent, blurred) */}
          <div
            className="w-[min(42ch,36vw)] rounded-2xl border border-yellow-600/30
                          bg-white/40 backdrop-blur-sm p-6 shadow-xl text-black"
          >
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-center">
              Bienvenidos a La Cosecha
            </h1>
            <p className="mt-3 text-xl lg:text-2xl leading-snug">
              Somos una <strong>Iglesia Cristiana</strong> en{" "}
              <strong>Yonkers, NY</strong>. En{" "}
              <strong>Ministerio Familiar La Cosecha</strong> amamos a Dios y a
              las familias, y te invitamos a adorar con nosotros, crecer en la
              fe y servir a nuestra ciudad.
            </p>
          </div>

          {/* Buttons below the textbox */}
          <div className="mt-5 flex flex-col gap-4">
            <a
              href="#eventos"
              onClick={(e) => scrollTo("eventos", e)}
              className="inline-block whitespace-nowrap rounded-3xl
                         bg-yellow-400 hover:bg-yellow-500 border border-yellow-600/40 shadow-lg
                         text-black font-extrabold tracking-tight
                         text-3xl md:text-4xl px-10 py-6 min-w-[16rem] transition text-center"
            >
              Ver Eventos
            </a>
            <a
              href="#votd"
              onClick={(e) => scrollTo("votd", e)}
              className="inline-block whitespace-nowrap rounded-3xl
                         bg-yellow-400 hover:bg-yellow-500 border border-yellow-600/40 shadow-lg
                         text-black font-extrabold tracking-tight
                         text-3xl md:text-4xl px-10 py-6 min-w-[16rem] transition text-center"
            >
              Versículo del Día
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
