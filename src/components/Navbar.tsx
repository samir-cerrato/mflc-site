// src/components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";

// ✅ Put your real profiles here
// - Facebook pages look like: https://facebook.com/TU_PAGINA
// - Instagram users look like: https://instagram.com/TU_USUARIO
// - YouTube channel handle: https://youtube.com/@TU_CANAL  (or /channel/ID)
const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/ministeriofamiliarlacosecha",
    label: "Facebook",
  },
  { href: "https://www.instagram.com/lacosechayonkers", label: "Instagram" },
  { href: "https://www.youtube.com/@MFLCYONKERS", label: "YouTube" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full border-b bg-yellow-300 text-black">
      {/* Row with left/right padding */}
      <div className="flex w-full items-center justify-between py-3 pl-6 pr-6">
        {/* Left: Logo + Name + Slogan */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-24 w-24 shrink-0">
            <Image
              src="/logo.PNG"
              alt="Logo de Ministerio Familiar La Cosecha"
              fill
              sizes="96px"
              priority
              className="object-contain"
            />
          </div>

          <div className="leading-tight">
            <div className="text-4xl font-extrabold tracking-tight">
              Ministerio Familiar La Cosecha
            </div>
            <div className="text-lg text-neutral-700 italic">
              Sembrando Vida en la Familia
            </div>
          </div>
        </Link>

        {/* Right: Desktop Nav */}
        <nav className="hidden items-center gap-10 text-2xl md:flex">
          <Link href="/" className="hover:underline">
            Inicio
          </Link>

          <Link href="/nosotros" className="hover:underline">
            Nosotros
          </Link>

          {/* Redes Sociales dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="inline-flex items-center gap-1 hover:underline"
              aria-haspopup="menu"
              aria-expanded="false"
            >
              Redes Sociales
              <ChevronDown className="h-4 w-4" />
            </button>

            <ul
              role="menu"
              className="absolute right-0 top-full z-50 hidden min-w-56 overflow-hidden rounded-xl border border-yellow-400 bg-yellow-100 shadow-lg group-hover:block group-focus-within:block"
            >
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label} role="none">
                  <a
                    role="menuitem"
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 text-lg text-black hover:bg-yellow-200"
                    aria-label={`Abrir ${s.label} en una nueva pestaña`}
                  >
                    {s.label}
                    <ExternalLink className="h-5 w-5 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/visit" className="hover:underline">
            Visítanos
          </Link>
          <Link href="/contacto" className="hover:underline">
            Contáctanos
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          aria-label="Abrir menú"
          className="ml-auto p-2 md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {mobileOpen && (
        <div className="border-t border-yellow-400 bg-yellow-100 md:hidden">
          <ul className="space-y-2 py-3">
            <li>
              <Link
                href="/"
                className="block px-3 py-2 hover:bg-yellow-200"
                onClick={() => setMobileOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/nosotros"
                className="block px-3 py-2 hover:bg-yellow-200"
                onClick={() => setMobileOpen(false)}
              >
                Nosotros
              </Link>
            </li>

            {/* Redes Sociales on mobile */}
            <li>
              <details className="group [&>summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-base hover:bg-yellow-200">
                  <span>Redes Sociales</span>
                  <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                </summary>
                <ul className="mt-1 space-y-1 pl-4">
                  {SOCIAL_LINKS.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-base hover:bg-yellow-200"
                        onClick={() => setMobileOpen(false)}
                        aria-label={`Abrir ${s.label} en una nueva pestaña`}
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>

            <li>
              <Link
                href="/visit"
                className="block px-3 py-2 hover:bg-yellow-200"
                onClick={() => setMobileOpen(false)}
              >
                Visítanos
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="block px-3 py-2 hover:bg-yellow-200"
                onClick={() => setMobileOpen(false)}
              >
                Contáctanos
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
