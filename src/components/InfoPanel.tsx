// this is for the panels below the image. the left one is for events and the right one is for the verse of the day

"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// add more events this way
const EVENTS = ["/anniversary_invite.jpg"];

export default function InfoPanel() {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const hasMany = EVENTS.length > 1;

  // Auto-advance every 10s if multiple
  useEffect(() => {
    if (!hasMany) return;
    const t = setInterval(() => setI((n) => (n + 1) % EVENTS.length), 10000);
    return () => clearInterval(t);
  }, [hasMany]);

  // Lightbox keyboard controls
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft")
        setI((n) => (n - 1 + EVENTS.length) % EVENTS.length);
      if (e.key === "ArrowRight") setI((n) => (n + 1) % EVENTS.length);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  const img = EVENTS[i];
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://example.com";
  const shareUrl = useMemo(() => `${origin}${img}`, [origin, img]);

  // Direct SMS share (fallback to clipboard if not supported)
  const sendSMS = async () => {
    const body = encodeURIComponent(`Te comparto esta invitación: ${shareUrl}`);
    const smsUrl = `sms:?&body=${body}`;
    try {
      window.location.href = smsUrl;
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Enlace copiado (SMS no disponible en este dispositivo).");
      } catch {
        alert("No se pudo compartir. Intenta copiar el enlace manualmente.");
      }
    }
  };

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-6 md:grid-cols-2 md:pr-24">
        {/* Left panel */}
        <div className="rounded-2xl border shadow-sm p-6 bg-yellow-50 flex flex-col items-center">
          <h2 className="text-center text-5xl font-extrabold underline underline-offset-8 text-black">
            Eventos
          </h2>

          {/* Carousel (single spot) */}
          <div className="mt-6 relative w-full h-[640px] overflow-hidden rounded-xl">
            <div
              className="flex h-full transition-transform duration-700"
              style={{ transform: `translateX(-${i * 100}%)` }}
            >
              {EVENTS.map((src, idx) => (
                <button
                  key={src}
                  onClick={() => setOpen(true)}
                  className="relative w-full shrink-0 h-full"
                  title={`Evento ${idx + 1}`}
                >
                  <Image
                    src={src}
                    alt={`Evento ${idx + 1}`}
                    fill
                    className="object-contain"
                  />
                </button>
              ))}
            </div>

            {/* Manual arrows */}
            {hasMany && (
              <>
                <button
                  aria-label="Anterior"
                  onClick={() =>
                    setI((n) => (n - 1 + EVENTS.length) % EVENTS.length)
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-black shadow hover:bg-white"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  aria-label="Siguiente"
                  onClick={() => setI((n) => (n + 1) % EVENTS.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-black shadow hover:bg-white"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Dots */}
          {hasMany && (
            <div className="mt-3 flex items-center justify-center gap-2">
              {EVENTS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Ir a evento ${idx + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === idx ? "bg-black" : "bg-black/30 hover:bg-black/50"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Share row */}
          <p className="mt-8 text-sm text-neutral-700">Comparte ahora</p>
          <div className="mt-2 flex items-center justify-center gap-4">
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              className="h-10 w-10 rounded-full border bg-white grid place-items-center hover:bg-neutral-50"
            >
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={22}
                height={22}
              />
            </a>

            {/* Instagram (info) */}
            <button
              onClick={() =>
                alert(
                  "Instagram no permite compartir enlaces directamente; comparte la imagen desde tu app o usa el botón de compartir del sistema."
                )
              }
              title="Instagram"
              className="h-10 w-10 rounded-full border bg-white grid place-items-center hover:bg-neutral-50"
            >
              <Image
                src="/instagram.svg"
                alt="Instagram"
                width={22}
                height={22}
              />
            </button>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Te comparto esta invitación: ${shareUrl}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
              className="h-10 w-10 rounded-full border bg-white grid place-items-center hover:bg-neutral-50"
            >
              <Image
                src="/whatsapp.svg"
                alt="WhatsApp"
                width={22}
                height={22}
              />
            </a>

            {/* Email */}
            <a
              href={`mailto:?subject=${encodeURIComponent(
                "Invitación a nuestro evento"
              )}&body=${encodeURIComponent(
                `Te comparto esta invitación: ${shareUrl}`
              )}`}
              title="Email"
              className="h-10 w-10 rounded-full border bg-white grid place-items-center hover:bg-neutral-50"
            >
              <Image
                src="/mailboxdotorg.svg"
                alt="Email"
                width={22}
                height={22}
              />
            </a>

            {/* Two-links → directly send SMS with current image */}
            <button
              onClick={sendSMS}
              title="Enviar por SMS"
              className="h-10 w-10 rounded-full border bg-white grid place-items-center hover:bg-neutral-50"
            >
              <Image src="/two-links.png" alt="SMS" width={22} height={22} />
            </button>
          </div>
        </div>

        {/* Right column reserved for Versículo del Día (later) */}
        <div />
      </div>

      {/* Fullscreen lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/85 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-[95vw] max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={img}
              alt="Evento"
              width={1800}
              height={2400}
              className="max-w-[90vw] max-h-[85vh] object-contain"
            />
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute -right-3 -top-3 bg-white text-black rounded-full px-3 py-1 text-sm font-bold shadow"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
