"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";

const SOCIAL_LINKS = [
  { href: "https://facebook.com/", label: "Facebook" },
  { href: "https://instagram.com/", label: "Instagram" },
  { href: "https://youtube.com/", label: "YouTube" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white text-black">
      {/* Row with left/right padding */}
      <div className="flex w-full items-center justify-between py-1 pl-6 pr-2 md:pr-6">
        {/* Left: Logo + Name + Slogan */}
        <Link href="/" className="flex items-center gap-3">
          {/* Bigger logo; ensure /public/logo.PNG exists */}
          <div className="relative h-24 w-24 shrink-0">
            <Image
              src="/logo.PNG"
              alt="Logo de Ministerio Familiar La Cosecha"
              fill
              sizes="125px"
              priority
              className="object-contain"
            />
          </div>

          {/* Church name + slogan stacked */}
          <div className="leading-tight">
            <div className="text-xl font-extrabold tracking-tight">
              Ministerio Familiar La Cosecha
            </div>
            <div className="text-sm text-neutral-600 italic">
              Sembrando Vida en la Familia
            </div>
          </div>
        </Link>

        {/* Right: Desktop Nav */}
        <nav className="hidden items-center gap-8 text-lg md:flex">
          <Link href="/" className="hover:underline">
            Inicio
          </Link>
          <Link href="/about" className="hover:underline">
            Nosotros
          </Link>

          {/* Redes Sociales dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSocialOpen(true)}
            onMouseLeave={() => setSocialOpen(false)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 hover:underline"
              aria-haspopup="menu"
              aria-expanded={socialOpen}
              onClick={() => setSocialOpen((o) => !o)}
            >
              Redes Sociales
              <ChevronDown className="h-4 w-4" />
            </button>

            {socialOpen && (
              <ul
                role="menu"
                className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg"
              >
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.label} role="none">
                    <a
                      role="menuitem"
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-2 text-sm text-black hover:bg-neutral-100"
                    >
                      {s.label}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
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
        <div className="border-t border-black/10 bg-white md:hidden">
          <ul className="space-y-2 py-3">
            <li>
              <Link
                href="/"
                className="block px-3 py-2 hover:bg-neutral-100"
                onClick={() => setMobileOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block px-3 py-2 hover:bg-neutral-100"
                onClick={() => setMobileOpen(false)}
              >
                Nosotros
              </Link>
            </li>

            {/* Redes Sociales on mobile */}
            <li>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 hover:bg-neutral-100">
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
                        className="block px-3 py-2 text-sm hover:bg-neutral-100"
                        onClick={() => setMobileOpen(false)}
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
                className="block px-3 py-2 hover:bg-neutral-100"
                onClick={() => setMobileOpen(false)}
              >
                Visítanos
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="block px-3 py-2 hover:bg-neutral-100"
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
