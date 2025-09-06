//this is covering the verse of the day, which sits to the right of the events panel

"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

/* ---------- Time helpers (America/New_York) ---------- */
function nyNow() {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = fmt.format(new Date()).split(/[,\s:]/);
  const [date, hh, mm, ss] = [parts[0], parts[2], parts[3], parts[4]];
  const [yyyy, MM, dd] = date.split("-").map(Number);
  return new Date(yyyy, MM - 1, dd, Number(hh), Number(mm), Number(ss));
}
function msUntilNextMidnightNY() {
  const now = nyNow();
  const next = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0
  );
  return Math.max(1, next.getTime() - now.getTime());
}
function todayImageIndex(): number {
  const now = nyNow();
  const yyyymmdd = Number(
    `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
      now.getDate()
    ).padStart(2, "0")}`
  );
  return (yyyymmdd % 31) + 1; // 1..31
}

/* ---------- Types ---------- */
type Votd = { reference: string; text: string };

export default function VerseOfTheDay() {
  const [data, setData] = useState<Votd | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Daily image index (auto-rotates at midnight)
  const [imgIndex, setImgIndex] = useState<number>(() => todayImageIndex());
  const bgUrl = useMemo(() => `/image${imgIndex}.jpeg`, [imgIndex]);

  // Hydration-safe base URL (same approach as InfoPanel)
  const [baseUrl, setBaseUrl] = useState("");
  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);
  const shareUrl = useMemo(
    () => (baseUrl ? `${baseUrl}${bgUrl}` : ""),
    [baseUrl, bgUrl]
  );

  // Fetch verse
  async function fetchVerse() {
    try {
      setLoading(true);
      setErr(null);
      const res = await fetch("/api/votd", { cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setData({ reference: json.reference, text: json.text });
    } catch {
      setErr("No se pudo cargar el versículo. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchVerse();
  }, []);

  // Flip at midnight ET (keeps verse & image in sync daily)
  useEffect(() => {
    const ms = msUntilNextMidnightNY();
    const timer = setTimeout(() => {
      setImgIndex(todayImageIndex());
      fetchVerse();
      const nextTimer = setInterval(() => {
        setImgIndex(todayImageIndex());
        fetchVerse();
      }, 24 * 60 * 60 * 1000);
      (window as any).__votdInterval = nextTimer;
    }, ms);
    return () => {
      clearTimeout(timer);
      if ((window as any).__votdInterval)
        clearInterval((window as any).__votdInterval);
    };
  }, []);

  /* ---------- Download: capture WHOLE panel (bg + title + verse), exclude share row ---------- */
  const captureRef = useRef<HTMLElement | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  async function downloadCard() {
    if (isSharing) return; // guard against double taps
    setIsSharing(true);

    const node = captureRef.current;
    if (!node) {
      setIsSharing(false);
      return;
    }

    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#000",
        // exclude the share row (has data-exclude-capture="true")
        filter: (n) =>
          !(n instanceof HTMLElement && n.dataset?.excludeCapture === "true"),
      });

      // Build a File for native share
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const now = nyNow();
      const fileName = `versiculo-${now.getFullYear()}-${String(
        now.getMonth() + 1
      ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}.png`;
      const file = new File([blob], fileName, { type: "image/png" });

      // Prefer native share (mobile → Save Image to Photos)
      // @ts-ignore (older TS libs)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Versículo del día",
          text: data ? `${data.reference}` : undefined,
        });
        return;
      }

      // Fallback: download / open
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      // iOS Safari: open new tab so user can long-press → Save Image
      if (/iP(ad|hone|od)/.test(navigator.userAgent))
        window.open(dataUrl, "_blank");
    } catch (err: any) {
      // User canceled share → ignore
      if (err?.name === "AbortError") return;
      // A previous share still active → ignore
      if (err?.name === "InvalidStateError") return;
      console.error("share/download failed:", err);
      alert("No se pudo compartir/descargar la imagen.");
    } finally {
      setTimeout(() => setIsSharing(false), 200); // tiny delay to avoid immediate re-tap
    }
  }

  // SMS share
  const sendSMS = async () => {
    if (!shareUrl) return;
    const body = encodeURIComponent(`Te comparto este versículo: ${shareUrl}`);
    const smsUrl = `sms:?&body=${body}`;
    try {
      window.location.href = smsUrl;
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Enlace copiado (SMS no disponible).");
      } catch {
        alert("No se pudo compartir. Copia el enlace manualmente.");
      }
    }
  };

  return (
    // ref ON SECTION so the capture includes the background + title + centered verse card.
    <section
      ref={captureRef}
      className="relative rounded-2xl overflow-hidden border shadow-sm h-full"
    >
      {/* Background covers ENTIRE panel */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${bgUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/70" />

      {/* Foreground layout = full height column */}
      <div className="relative z-[1] flex h-full flex-col">
        {/* Title */}
        <div className="pt-4 md:pt-6 px-4">
          <h2
            className="text-center font-extrabold underline underline-offset-8 text-white
                         text-3xl md:text-5xl lg:text-6xl tracking-tight"
          >
            Versículo del día
          </h2>
        </div>

        {/* Center the verse box in the available space */}
        <div className="flex-1 px-4 py-4 md:px-6 md:py-6 flex items-center justify-center">
          <div className="max-w-4xl w-full">
            <div className="mx-auto rounded-xl border border-white/15 bg-black/50 backdrop-blur-md text-white p-5 md:p-6 lg:p-7">
              {loading && <p className="text-center">Cargando…</p>}
              {err && <p className="text-center text-red-200">{err}</p>}
              {data && (
                <>
                  {/* Larger verse text */}
                  <p className="whitespace-pre-line leading-relaxed text-2xl md:text-3xl lg:text-4xl">
                    {data.text}
                  </p>
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="text-xs px-2 py-1 rounded bg-white/15 border border-white/20">
                      RVR1909
                    </span>
                    <span className="italic text-sm md:text-base">
                      {data.reference}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom area: centered label + icons; excluded from image capture */}
        <div className="px-4 pb-4 md:px-6 md:pb-6" data-exclude-capture="true">
          <p className="text-sm text-neutral-200 text-center">Comparte ahora</p>

          {shareUrl ? (
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
                  `Te comparto este versículo: ${shareUrl}`
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
                  "Versículo del día"
                )}&body=${encodeURIComponent(
                  `Te comparto este versículo: ${shareUrl}`
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

              {/* SMS */}
              <button
                onClick={sendSMS}
                title="Enviar por SMS"
                className="h-10 w-10 rounded-full border bg-white grid place-items-center hover:bg-neutral-50"
              >
                <Image src="/two-links.png" alt="SMS" width={22} height={22} />
              </button>

              {/* Download — your icon; disabled while sharing to avoid InvalidStateError */}
              <button
                onClick={downloadCard}
                title="Descargar imagen"
                disabled={isSharing}
                className={`h-10 w-10 rounded-full border bg-white grid place-items-center hover:bg-neutral-50 ${
                  isSharing ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Image
                  src="/download.svg"
                  alt="Descargar"
                  width={22}
                  height={22}
                />
              </button>
            </div>
          ) : (
            <div className="h-10" />
          )}
        </div>
      </div>
    </section>
  );
}
