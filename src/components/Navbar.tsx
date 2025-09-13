// src/components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ChevronDown, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ✅ Put your real profiles here
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

  // Desktop dropdown state for Redes Sociales (split link + toggle)
  const [socialOpen, setSocialOpen] = useState(false);
  const socialRef = useRef<HTMLDivElement | null>(null);
  const socialMenuId = "menu-redes-sociales";

  // Close on click outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!socialRef.current?.contains(e.target as Node)) setSocialOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSocialOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

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

          {/* Redes Sociales: split link + chevron toggle */}
          <div
            ref={socialRef}
            className="relative"
            onMouseEnter={() => setSocialOpen(true)}
            onMouseLeave={() => setSocialOpen(false)}
          >
            <div className="flex items-center gap-1">
              {/* Parent LABEL navigates to an overview/anchor page (edit as needed) */}
              <Link href="/redes" className="hover:underline">
                Redes Sociales
              </Link>

              {/* Separate chevron button toggles the submenu */}
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={socialOpen}
                aria-controls={socialMenuId}
                className="inline-flex items-center rounded-md px-1 py-1 hover:bg-black/10"
                onClick={() => setSocialOpen((v) => !v)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSocialOpen(true);
                    // focus first item after open
                    setTimeout(() => {
                      document
                        .querySelector<HTMLAnchorElement>(
                          `#${socialMenuId} a[role="menuitem"]`
                        )
                        ?.focus();
                    }, 0);
                  }
                }}
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    socialOpen ? "rotate-180" : ""
                  }`}
                />
                <span className="sr-only">Abrir menú Redes Sociales</span>
              </button>
            </div>

            {/* Dropdown panel (opens on hover and toggle) */}
            <ul
              id={socialMenuId}
              role="menu"
              className={`absolute right-0 top-full z-50 mt-2 min-w-56 overflow-hidden rounded-xl border border-yellow-400 bg-yellow-100 shadow-lg ring-1 ring-black/5
                transition origin-top ${
                  socialOpen
                    ? "scale-100 opacity-100"
                    : "pointer-events-none scale-95 opacity-0"
                }`}
            >
              {/* Optional: duplicate overview link inside */}
              <li role="none">
                <Link
                  role="menuitem"
                  href="/redes"
                  className="flex items-center justify-between px-4 py-3 text-lg text-black hover:bg-yellow-200 focus:bg-yellow-200 focus:outline-none"
                  onClick={() => setSocialOpen(false)}
                >
                  Redes Sociales – Visión general
                </Link>
              </li>
              <li className="border-t border-yellow-200" role="none" />

              {SOCIAL_LINKS.map((s) => (
                <li key={s.label} role="none">
                  <a
                    role="menuitem"
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 text-lg text-black hover:bg-yellow-200 focus:bg-yellow-200 focus:outline-none"
                    aria-label={`Abrir ${s.label} en una nueva pestaña`}
                    onClick={() => setSocialOpen(false)}
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
          <Link href="/contact" className="hover:underline">
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

                {/* Optional: Overview link inside mobile submenu */}
                <ul className="mt-1 space-y-1 pl-4">
                  <li>
                    <Link
                      href="/redes"
                      className="block px-4 py-2 text-base hover:bg-yellow-200"
                      onClick={() => setMobileOpen(false)}
                    >
                      Redes Sociales – Visión general
                    </Link>
                  </li>
                  <li>
                    <hr className="border-yellow-200" />
                  </li>

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
                href="/contact"
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
