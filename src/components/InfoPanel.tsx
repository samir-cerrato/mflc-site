// src/components/InfoPanel.tsx
// Left panel for events (pairs with VerseOfTheDay on the right)

"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  X as Close,
} from "lucide-react";
import { Panel, PanelBody } from "@/components/Panel";

/* ======================================================================
   GALLERY IMAGES
   (Keep extras commented-out; arrows/autoplay appear if >1)
====================================================================== */
const EVENTS = [
  "/anniversary_invite.jpg",
  // "/image21.jpeg",
  // "/image22.jpeg",
];

/* ======================================================================
   MANUAL FEATURED (MM/DD/YYYY) — YOU CONTROL THESE
====================================================================== */
type Occurrence = {
  title: string;
  date: string; // e.g. "09/14/2025"
  time: string; // e.g. "2:30 PM" or "19:30"
  endTime?: string;
};

type FeaturedMeta = {
  title: string;
  address: string;
  mapsQuery: string;
  description: string;
  occurrences: Occurrence[];
};

const FEATURED_META: FeaturedMeta[] = [
  {
    title: "14º Aniversario",
    address: "191 North Broadway, Yonkers, NY 10701",
    mapsQuery: "191 North Broadway, Yonkers, NY 10701",
    description:
      "Celebra con nosotros el aniversario de nuestro ministerio con alabanza, palabra y compañerismo. ¡Todos son bienvenidos!",
    occurrences: [
      { title: "Aniversario (Día 1)", date: "09/12/2025", time: "7:30 PM" },
      { title: "Aniversario (Día 2)", date: "09/13/2025", time: "7:00 PM" },
      { title: "Aniversario (Día 3)", date: "09/14/2025", time: "2:30 PM" },
    ],
  },
];

/* ======================================================================
   DATE/TIME HELPERS
====================================================================== */
const MONTHS_ES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
const MONTHS_ES_SHORT = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sept",
  "oct",
  "nov",
  "dic",
];
const WEEKDAY_ES_SHORT = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function parseMDY(mdy: string) {
  const [m, d, y] = mdy.split("/").map((s) => parseInt(s.trim(), 10));
  if (!m || !d || !y) throw new Error(`Fecha inválida: ${mdy}`);
  return { y, m, d };
}

function parseTimeFlexible(t: string) {
  const s = t.trim().toLowerCase();
  const ampmMatch = s.match(/\s?(am|pm)$/);
  const ampm = ampmMatch ? (ampmMatch[1] as "am" | "pm") : null;
  const core = ampm ? s.replace(/\s?(am|pm)$/, "").trim() : s;
  const [hhStr, mmStr] = core.split(":");
  let hh = parseInt(hhStr, 10);
  const mm = mmStr ? parseInt(mmStr, 10) : 0;
  if (Number.isNaN(hh) || Number.isNaN(mm))
    throw new Error(`Hora inválida: ${t}`);
  if (ampm === "pm" && hh < 12) hh += 12;
  if (ampm === "am" && hh === 12) hh = 0;
  return { hh, mm };
}

function weekdayIndex(y: number, m: number, d: number) {
  // Zeller’s congruence (0=Sun..6=Sat)
  if (m < 3) {
    m += 12;
    y -= 1;
  }
  const K = y % 100;
  const J = Math.floor(y / 100);
  const h =
    (d +
      Math.floor((13 * (m + 1)) / 5) +
      K +
      Math.floor(K / 4) +
      Math.floor(J / 4) +
      5 * J) %
    7;
  return (h + 6) % 7;
}

/* Pretty 12-hour time like 7:30pm */
function formatTime12h(date: Date) {
  const h24 = date.getHours();
  const h12 = h24 % 12 || 12;
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ampm = h24 >= 12 ? "pm" : "am";
  return `${h12}:${mm}${ampm}`;
}

/* ======================================================================
   ADD TO CALENDAR (.ics)
====================================================================== */
function icsLocal(y: number, m: number, d: number, hh: number, mm: number) {
  return `${y}${pad(m)}${pad(d)}T${pad(hh)}${pad(mm)}00`;
}
function makeICS(meta: FeaturedMeta) {
  const uidBase = Math.random().toString(36).slice(2);
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MFLC//Eventos//ES",
  ];

  meta.occurrences.forEach((occ, idx) => {
    const { y, m, d } = parseMDY(occ.date);
    const { hh, mm } = parseTimeFlexible(occ.time);
    const startLocal = icsLocal(y, m, d, hh, mm);

    // Default end = +90min if endTime not specified
    let eh = hh,
      em = mm + 90;
    if (occ.endTime) {
      const et = parseTimeFlexible(occ.endTime);
      eh = et.hh;
      em = et.mm;
    } else if (em >= 60) {
      eh += Math.floor(em / 60);
      em = em % 60;
    }

    const endLocal = icsLocal(y, m, d, eh, em);

    lines.push(
      "BEGIN:VEVENT",
      `UID:${uidBase}-${idx}@mflc`,
      `SUMMARY:${occ.title} — ${meta.title}`,
      `DTSTART;TZID=America/New_York:${startLocal}`,
      `DTEND;TZID=America/New_York:${endLocal}`,
      `LOCATION:${meta.address}`,
      `DESCRIPTION:${meta.description.replace(/\n/g, "\\n")}`,
      "END:VEVENT"
    );
  });

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}
function downloadICS(meta: FeaturedMeta) {
  const ics = makeICS(meta);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${meta.title.replace(/\s+/g, "-").toLowerCase()}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

/* ======================================================================
   UPCOMING (AUTO): always next TWO from your rules
====================================================================== */
type SimpleUpcoming = { id: string; when: Date; title: string };

function nyTodayStart(): Date {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const [y, m, d] = fmt.format(new Date()).split("-").map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

function weekdayOnOrAfter(anchor: Date, weekday: number): Date {
  const a = new Date(
    anchor.getFullYear(),
    anchor.getMonth(),
    anchor.getDate(),
    0,
    0,
    0,
    0
  );
  const delta = (weekday - a.getDay() + 7) % 7;
  const d = new Date(a);
  d.setDate(a.getDate() + delta);
  return d;
}

function atTime(base: Date, hh: number, mm: number): Date {
  const d = new Date(base);
  d.setHours(hh, mm, 0, 0);
  return d;
}

function lastWeekdayOfMonth(year: number, month0: number, weekday: number) {
  const d = new Date(year, month0 + 1, 0);
  const diff = (d.getDay() - weekday + 7) % 7;
  d.setDate(d.getDate() - diff);
  return d;
}

function buildSchedule(anchor: Date, weeks = 10): SimpleUpcoming[] {
  const items: SimpleUpcoming[] = [];

  const firstTue = atTime(weekdayOnOrAfter(anchor, 2), 19, 30);
  const firstFri = atTime(weekdayOnOrAfter(anchor, 5), 19, 30);
  const firstSatMorning = atTime(weekdayOnOrAfter(anchor, 6), 9, 0);
  const firstSatEvening = atTime(weekdayOnOrAfter(anchor, 6), 19, 0);
  const firstSun = atTime(weekdayOnOrAfter(anchor, 0), 14, 30);

  const plusDays = (d: Date, days: number) => {
    const x = new Date(d);
    x.setDate(d.getDate() + days);
    return x;
  };

  for (let w = 0; w < weeks; w++) {
    items.push({
      id: `tue-${w}`,
      when: plusDays(firstTue, 7 * w),
      title: "Discipulado",
    });
    items.push({
      id: `fri-${w}`,
      when: plusDays(firstFri, 7 * w),
      title: "Servicio de Viernes",
    });
    items.push({
      id: `sat-am-${w}`,
      when: plusDays(firstSatMorning, 7 * w),
      title: "Oración",
    });
    items.push({
      id: `sat-pm-${w}`,
      when: plusDays(firstSatEvening, 7 * w),
      title: "Servicio de Sábado",
    });
    items.push({
      id: `sun-${w}`,
      when: plusDays(firstSun, 7 * w),
      title: "Servicio Dominical",
    });
  }

  for (let m = 0; m < 3; m++) {
    const y = anchor.getFullYear();
    const m0 = anchor.getMonth() + m;
    const lastFri = lastWeekdayOfMonth(y, m0, 5);
    const lastSat = lastWeekdayOfMonth(y, m0, 6);
    const vigilia = atTime(lastFri, 23, 0);
    const cena = atTime(lastSat, 19, 0);
    if (vigilia >= anchor)
      items.push({ id: `vigilia-${y}-${m0}`, when: vigilia, title: "Vigilia" });
    if (cena >= anchor)
      items.push({
        id: `cena-${y}-${m0}`,
        when: cena,
        title: "Cena del Señor",
      });
  }

  items.sort((a, b) => a.when.getTime() - b.when.getTime());
  const seen = new Set<string>();
  const unique: SimpleUpcoming[] = [];
  for (const it of items) {
    const key = `${it.title}-${it.when.toDateString()}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(it);
    }
  }
  return unique;
}

function nextTwo(): SimpleUpcoming[] {
  const anchor = nyTodayStart();
  return buildSchedule(anchor, 12)
    .filter((e) => e.when >= anchor)
    .slice(0, 2);
}

function fmtUpcoming(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mmShort = MONTHS_ES_SHORT[d.getMonth()];
  const wdShort = WEEKDAY_ES_SHORT[d.getDay()];
  return { dd, mmShort, wdShort, time: formatTime12h(d) };
}

/* ======================================================================
   SHARE / DOWNLOAD HELPERS
====================================================================== */
async function downloadImage(url: string, fileName = "evento.jpg") {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  } catch {
    window.open(url, "_blank");
  }
}

/* ======================================================================
   COMPONENT
====================================================================== */
export default function InfoPanel() {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);

  const hasMany = EVENTS.length > 1;
  const img = EVENTS[i] ?? "/placeholder.png";
  const meta = FEATURED_META[i] ?? FEATURED_META[0];

  const onNext = useCallback(() => setI((n) => (n + 1) % EVENTS.length), []);
  useEffect(() => {
    if (!hasMany || open) return;
    const id = setInterval(onNext, 20000);
    return () => clearInterval(id);
  }, [hasMany, open, onNext]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft")
        setI((n) => (n - 1 + EVENTS.length) % EVENTS.length);
      if (e.key === "ArrowRight") setI((n) => (n + 1) % EVENTS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const [baseUrl, setBaseUrl] = useState("");
  useEffect(() => setBaseUrl(window.location.origin), []);
  const shareUrl = useMemo(
    () => (baseUrl ? `${baseUrl}${img}` : ""),
    [baseUrl, img]
  );

  const [upcoming, setUpcoming] = useState<SimpleUpcoming[]>([]);
  useEffect(() => {
    const run = () => setUpcoming(nextTwo());
    run();
    const id = setInterval(run, 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Panel
      className="bg-yellow-100 dark:bg-yellow-100"
      cap={false}
      overflow="visible"
    >
      {/* Title: slightly smaller on lg to reduce height */}
      <div className="pt-1">
        <h2
          className="text-center font-extrabold underline underline-offset-8 text-black
                     text-3xl md:text-5xl lg:text-5xl tracking-tight"
        >
          Eventos
        </h2>
      </div>

      <PanelBody className="md:mt-4">
        {/* Featured: poster + details */}
        {/* KEY: items-start prevents stretching; poster gets self-start */}
        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* Poster */}
          <div
            className="relative w-full overflow-hidden rounded-xl cursor-zoom-in bg-yellow-100 self-start pb-4"
            onClick={() => setOpen(true)}
            title="Ver a pantalla completa"
          >
            {/* Backdrop fill (blurred) */}
            <Image
              src={img}
              alt=""
              fill
              className="object-cover blur-2xl scale-110 opacity-40 pointer-events-none"
              aria-hidden
            />
            {/* Foreground poster with fixed ratio */}+{" "}
            <div className="relative z-10 w-full aspect-[4/5]">
              <Image
                src={img}
                alt="Afiche del evento"
                fill
                className="object-contain"
              />
            </div>
            {hasMany && (
              <>
                <button
                  type="button"
                  aria-label="Anterior"
                  onClick={(e) => {
                    e.stopPropagation();
                    setI((n) => (n - 1 + EVENTS.length) % EVENTS.length);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-black shadow hover:bg-white z-30"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  aria-label="Siguiente"
                  onClick={(e) => {
                    e.stopPropagation();
                    setI((n) => (n + 1) % EVENTS.length);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-black shadow hover:bg-white z-30"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Details */}
          <div className="flex items-center">
            <div className="w-full space-y-5">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 text-center md:text-left">
                {meta.title}
              </h3>

              <ul className="space-y-3 text-neutral-900 text-lg md:text-xl">
                <li className="flex items-start gap-3">
                  <CalendarDays className="h-6 w-6 mt-0.5" />
                  <span className="leading-tight">
                    {meta.occurrences.length} fecha(s) programada(s)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 mt-0.5" />
                  <span className="leading-tight">
                    {meta.address}{" "}
                    <Link
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        meta.mapsQuery
                      )}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-blue-800 underline underline-offset-2 hover:text-blue-900 font-medium"
                    >
                      Cómo llegar
                    </Link>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-6 w-6 mt-0.5" />
                  <span className="leading-tight">
                    {meta.occurrences.map((o, idx) => {
                      const { y, m, d } = parseMDY(o.date);
                      const wd = WEEKDAY_ES_SHORT[weekdayIndex(y, m, d)];
                      const month = MONTHS_ES[m - 1];
                      return (
                        <span key={idx} className="block">
                          {o.title}: {wd}, {pad(d)} de {month} — {o.time}
                        </span>
                      );
                    })}
                  </span>
                </li>
              </ul>

              <p className="text-neutral-900 text-lg md:text-xl leading-relaxed">
                {meta.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => downloadICS(meta)}
                  className="px-5 py-3 rounded-lg border bg-white text-black font-semibold shadow hover:bg-neutral-50"
                  title="Agregar al calendario (.ics)"
                >
                  Agregar al calendario
                </button>

                <Link
                  href="/nosotros"
                  className="px-5 py-3 rounded-lg border bg-white text-black font-semibold shadow hover:bg-neutral-50 inline-flex items-center justify-center"
                  title="Conócenos"
                >
                  Conócenos
                </Link>
              </div>

              <div className="pt-3 border-t">
                <p className="text-sm text-neutral-900 text-center md:text-left">
                  Comparte ahora
                </p>
                {shareUrl ? (
                  <div className="mt-2 flex items-center justify-center md:justify-start gap-4">
                    {/* social icons unchanged */}
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
                    <button
                      onClick={async () => {
                        if (!shareUrl) return;
                        const body = encodeURIComponent(
                          `Te comparto esta invitación: ${shareUrl}`
                        );
                        const smsUrl = `sms:?&body=${body}`;
                        try {
                          window.location.href = smsUrl;
                        } catch {
                          try {
                            await navigator.clipboard.writeText(shareUrl);
                            alert("Enlace copiado (SMS no disponible).");
                          } catch {}
                        }
                      }}
                      title="Enviar por SMS"
                      className="h-10 w-10 rounded-full border bg-white grid place-items-center hover:bg-neutral-50"
                    >
                      <Image
                        src="/two-links.png"
                        alt="SMS"
                        width={22}
                        height={22}
                      />
                    </button>
                    <button
                      onClick={() =>
                        downloadImage(
                          shareUrl,
                          meta.title.replace(/\s+/g, "-").toLowerCase() + ".jpg"
                        )
                      }
                      title="Descargar imagen"
                      className="h-10 w-10 rounded-full border bg-white grid place-items-center hover:bg-neutral-50"
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
          </div>
        </div>

        {/* UPCOMING (NEXT TWO) — slightly less top margin */}
        {upcoming.length > 0 && (
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {upcoming.slice(0, 2).map((ev) => {
              const { dd, mmShort, wdShort, time } = fmtUpcoming(ev.when);
              return (
                <div
                  key={ev.id}
                  className="rounded-xl border bg-white p-4 shadow-sm flex items-center gap-4"
                >
                  <div className="text-center bg-yellow-100 rounded-md px-2 py-2 min-w-[56px]">
                    <div className="text-2xl font-extrabold leading-none text-black">
                      {dd}
                    </div>
                    <div className="uppercase text-[10px] tracking-wider text-black">
                      {mmShort}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-neutral-900 truncate">
                      {ev.title}
                    </p>
                    <p
                      className="text-sm text-neutral-800"
                      suppressHydrationWarning
                    >
                      {wdShort}, {dd} {mmShort} · {time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </PanelBody>

      {/* Fullscreen viewer */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            aria-label="Cerrar"
            onClick={() => setOpen(false)}
            className="absolute top-4 left-4 rounded-full bg-white/90 p-2 text-black shadow hover:bg-white z-50"
          >
            <Close className="h-6 w-6" />
          </button>

          {EVENTS.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Anterior"
                onClick={(e) => {
                  e.stopPropagation();
                  setI((n) => (n - 1 + EVENTS.length) % EVENTS.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-black shadow hover:bg-white z-50"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                aria-label="Siguiente"
                onClick={(e) => {
                  e.stopPropagation();
                  setI((n) => (n + 1) % EVENTS.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-black shadow hover:bg-white z-50"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}

          <div
            className="absolute inset-0 grid place-items-center p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image src={img} alt="Evento" fill className="object-contain" />
            </div>
          </div>
        </div>
      )}
    </Panel>
  );
}
