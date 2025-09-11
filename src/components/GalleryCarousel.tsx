"use client";

import { useEffect, useState } from "react";

type Slide = {
  /** Optional image path (e.g., "/galeria/01.jpg"). If omitted, a placeholder block is shown. */
  src?: string;
  /** Describe the image for accessibility */
  alt?: string;
  /** Caption shown over/under the image */
  caption?: string;
};

export default function GalleryCarousel({
  items,
  intervalMs = 30000,
}: {
  items?: Slide[];
  intervalMs?: number;
}) {
  const fallbackSlides: Slide[] = [
    { caption: "Galería — imagen 1 (placeholder)" },
    { caption: "Galería — imagen 2 (placeholder)" },
    { caption: "Galería — imagen 3 (placeholder)" },
  ];

  const slides = items && items.length > 0 ? items : fallbackSlides;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [slides.length, intervalMs]);

  const go = (delta: number) =>
    setIndex((i) => (i + delta + slides.length) % slides.length);

  const current = slides[index];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      {/* Visual area */}
      <div className="relative h-64 md:h-80 lg:h-96 bg-gray-200">
        {current.src ? (
          // Using <img> to avoid build-time errors if files aren't present yet
          <img
            src={current.src}
            alt={current.alt ?? ""}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          // Placeholder block
          <div
            role="img"
            aria-label={current.alt ?? "Imagen de galería (placeholder)"}
            className="absolute inset-0 grid place-items-center bg-gradient-to-br from-yellow-100 to-yellow-300 text-black"
          >
            <span className="text-sm md:text-base italic">
              (Placeholder de imagen)
            </span>
          </div>
        )}

        {/* Bottom gradient + caption */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent p-4">
          <p className="text-white text-sm md:text-base" aria-live="polite">
            {current.caption ?? ""}
          </p>
        </div>

        {/* Controls */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Anterior"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Siguiente"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ir a la imagen ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full ${
                i === index ? "bg-white" : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
