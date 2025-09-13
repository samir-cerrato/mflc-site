"use client";

import Image from "next/image";
import * as React from "react";

type GalleryItem = string | { src: string; alt?: string };

export default function GalleryCarousel({
  items,
  intervalMs = 20000, // 20s default
}: {
  items: GalleryItem[];
  intervalMs?: number;
}) {
  // Stable, deterministic list
  const normalized = React.useMemo(
    () =>
      items.map((it, idx) =>
        typeof it === "string"
          ? { src: it, alt: `Galería ${idx + 1}` }
          : { alt: `Galería ${idx + 1}`, ...it }
      ),
    [items]
  );

  const [idx, setIdx] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  // Direction-aware transitions
  const prevIdxRef = React.useRef(0);
  const direction = idx >= prevIdxRef.current ? 1 : -1;
  React.useEffect(() => {
    prevIdxRef.current = idx;
  }, [idx]);

  // Auto-advance (pause in lightbox)
  React.useEffect(() => {
    if (normalized.length === 0 || open) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1 < normalized.length ? i + 1 : 0));
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, normalized.length, open]);

  const current = normalized[idx] ?? normalized[0];

  function next() {
    setIdx((i) => (i + 1 < normalized.length ? i + 1 : 0));
  }
  function prev() {
    setIdx((i) => (i - 1 >= 0 ? i - 1 : normalized.length - 1));
  }

  // Keyboard in lightbox
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = orig;
    };
  }, [open]);

  // Touch swipe in lightbox
  const touchStartX = React.useRef<number | null>(null);
  const touchDx = React.useRef(0);
  const SWIPE = 48;
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDx.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    touchDx.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (touchDx.current > SWIPE) prev();
    else if (touchDx.current < -SWIPE) next();
    touchStartX.current = null;
    touchDx.current = 0;
  };

  // Slide/fade transition tokens
  const slideBase =
    "absolute inset-0 transition-all duration-500 ease-out will-change-transform will-change-opacity";
  const enterFromTokens =
    direction === 1
      ? ["translate-x-6", "opacity-0"]
      : ["-translate-x-6", "opacity-0"];
  const enterToTokens = ["translate-x-0", "opacity-100"];

  const onEnterTransition = (imgEl: HTMLImageElement | null | undefined) => {
    if (!imgEl || !imgEl.parentElement) return;
    const list = imgEl.parentElement.classList;
    list.remove(...enterFromTokens);
    list.add(...enterToTokens);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      {/* Panel viewport: show FULL image (object-contain) */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-black">
        <button
          type="button"
          aria-label="Abrir imagen en pantalla completa"
          className="absolute inset-0 h-full w-full"
          onClick={() => setOpen(true)}
        >
          <div
            key={current.src}
            className={`${slideBase} ${enterFromTokens.join(" ")}`}
          >
            <Image
              src={current.src}
              alt={current.alt || "Galería"}
              fill
              sizes="100vw"
              className="object-contain" // << full image in panel
              onLoadingComplete={(img) => {
                requestAnimationFrame(() => onEnterTransition(img));
              }}
            />
          </div>
        </button>
      </div>

      {/* LIGHTBOX */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Galería en pantalla completa"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          {/* Prev */}
          <button
            type="button"
            onClick={prev}
            aria-label="Imagen anterior"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/15 hover:bg-white/25 p-3"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={next}
            aria-label="Imagen siguiente"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/15 hover:bg-white/25 p-3"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
            className="absolute top-3 right-3 md:top-6 md:right-6 rounded-full bg-white/15 hover:bg-white/25 p-3"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Image area (full image) with swipe */}
          <div
            className="relative w-[92vw] h-[86vh] select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              key={current.src}
              className={`${slideBase} ${enterFromTokens.join(" ")}`}
            >
              <Image
                src={current.src}
                alt={current.alt || "Galería"}
                fill
                sizes="100vw"
                className="object-contain"
                onLoadingComplete={(img) => {
                  requestAnimationFrame(() => onEnterTransition(img));
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
