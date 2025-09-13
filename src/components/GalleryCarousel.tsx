// src/components/GalleryCarousel.tsx
"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

type GalleryItem = { src: string; alt?: string };

export default function GalleryCarousel({
  items,
  intervalMs = 20000, // auto-advance every 20s
}: {
  items: GalleryItem[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % items.length),
    [items.length]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + items.length) % items.length),
    [items.length]
  );

  // Auto-advance (paused while lightbox is open or if only one image)
  useEffect(() => {
    if (isOpen || items.length <= 1) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(next, Math.max(1000, intervalMs));
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [next, intervalMs, isOpen, items.length]);

  // Keyboard: ←/→ navigate; Esc closes lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, isOpen]);

  // Fade transition control
  useEffect(() => setLoaded(false), [index]);

  const current = items[index];

  return (
    <div className="relative w-full">
      {/* PANEL VIEW */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl bg-black">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt ?? `Galería ${index + 1}`}
          fill
          sizes="100vw"
          className={`object-contain transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          // ⬇️ Next 15: use onLoad (onLoadingComplete is deprecated)
          onLoad={() => setLoaded(true)}
          priority={false}
        />

        {/* Open fullscreen */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir imagen a pantalla completa"
          className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
        >
          <Maximize2 className="h-5 w-5" />
        </button>

        {/* Panel arrows */}
        {items.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Anterior"
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/90"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOpen(false)}
        >
          {/* Close */}
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Lightbox image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-[90vh] w-[94vw]">
              <Image
                key={`full-${current.src}`}
                src={current.src}
                alt={current.alt ?? `Galería ${index + 1}`}
                fill
                sizes="100vw"
                className={`object-contain transition-opacity duration-300 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setLoaded(true)}
              />
            </div>

            {/* Lightbox arrows */}
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Anterior"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white hover:bg-white/30"
                >
                  <ChevronLeft className="h-7 w-7" />
                </button>
                <button
                  type="button"
                  aria-label="Siguiente"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white hover:bg-white/30"
                >
                  <ChevronRight className="h-7 w-7" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
