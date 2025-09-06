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
    <section className="relative w-full h-screen bg-white overflow-hidden">
      {/* Mobile image */}
      <Image
        src="/thumbnail_with_bgc.png"
        alt="Fondo del héroe (móvil)"
        fill
        priority
        className="object-fill object-center md:hidden"
        sizes="100vw"
      />

      {/* Desktop image */}
      <Image
        src="/thumbnail.png"
        alt="Fondo del héroe (escritorio)"
        fill
        priority
        className="hidden md:block object-fill object-center"
        sizes="100vw"
      />

      {/* ===== Mobile buttons: centered, dropped lower under the announcement bar ===== */}
      <div className="absolute inset-x-0 top-24 sm:top-28 z-10 flex justify-center md:hidden pointer-events-none">
        <div className="flex flex-col gap-4 items-center pointer-events-auto">
          <a
            href="#eventos"
            onClick={(e) => scrollTo("eventos", e)}
            className="inline-block rounded-3xl bg-yellow-400 hover:bg-yellow-500
                       border border-yellow-600/40 shadow-xl
                       text-black font-extrabold tracking-tight
                       text-2xl px-8 py-4 sm:text-3xl sm:px-10 sm:py-5
                       min-w-[15rem] sm:min-w-[18rem] transition"
          >
            Ver Eventos
          </a>
          <a
            href="#votd"
            onClick={(e) => scrollTo("votd", e)}
            className="inline-block rounded-3xl bg-yellow-400 hover:bg-yellow-500
                       border border-yellow-600/40 shadow-xl
                       text-black font-extrabold tracking-tight
                       text-2xl px-8 py-4 sm:text-3xl sm:px-10 sm:py-5
                       min-w-[15rem] sm:min-w-[18rem] transition"
          >
            Versículo del Día
          </a>
        </div>
      </div>

      {/* ===== Desktop buttons: centered vertically, pushed left over the vase ===== */}
      <div className="relative z-10 h-full w-full pointer-events-none hidden md:block">
        <div className="absolute top-1/2 -translate-y-1/2 left-[10%] lg:left-[12%] xl:left-[14%] flex">
          <div className="flex flex-col gap-4 pointer-events-auto">
            <a
              href="#eventos"
              onClick={(e) => scrollTo("eventos", e)}
              className="inline-block whitespace-nowrap rounded-3xl
                         bg-yellow-400 hover:bg-yellow-500 border border-yellow-600/40 shadow-lg
                         text-black font-extrabold tracking-tight
                         text-3xl md:text-4xl lg:text-5xl
                         px-10 py-6 md:px-12 md:py-7 lg:px-14 lg:py-8
                         min-w-[16rem] transition"
            >
              Ver Eventos
            </a>
            <a
              href="#votd"
              onClick={(e) => scrollTo("votd", e)}
              className="inline-block whitespace-nowrap rounded-3xl
                         bg-yellow-400 hover:bg-yellow-500 border border-yellow-600/40 shadow-lg
                         text-black font-extrabold tracking-tight
                         text-3xl md:text-4xl lg:text-5xl
                         px-10 py-6 md:px-12 md:py-7 lg:px-14 lg:py-8
                         min-w-[16rem] transition"
            >
              Versículo del Día
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
