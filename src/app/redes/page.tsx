// src/app/redes/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ExternalLink, Facebook, Instagram, Youtube } from "lucide-react";
import FacebookPagePlugin from "./FacebookPagePlugin";

export const metadata: Metadata = {
  alternates: { canonical: "/redes" },
  title: "Redes Sociales",
  description: "Encuentra y sigue todas nuestras redes sociales.",
};

const FACEBOOK_PAGE = "https://www.facebook.com/ministeriofamiliarlacosecha";
const INSTAGRAM_PROFILE = "https://www.instagram.com/lacosechayonkers";
const YOUTUBE_CHANNEL = "https://www.youtube.com/@MFLCYONKERS";
const YT_LATEST_VIDEO_ID = "Z4g-T-bHypA";

export default function RedesPage() {
  return (
    <main className="bg-yellow-100 min-h-screen">
      <section className="mx-auto max-w-5xl px-4 py-10 space-y-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Redes Sociales
          </h1>
          <p className="mt-3 text-2xl md:text-3xl text-gray-700">
            Síguenos para ver noticias, eventos y transmisiones en vivo.
          </p>
        </header>

        {/* Quick link cards */}
        <section className="grid gap-6 sm:grid-cols-2">
          <SocialCard
            label="Facebook"
            href={FACEBOOK_PAGE}
            Icon={Facebook}
            description="Eventos, fotos y transmisiones."
          />
          <SocialCard
            label="Instagram"
            href={INSTAGRAM_PROFILE}
            Icon={Instagram}
            description="Historias y momentos de comunidad."
          />
          <SocialCard
            label="YouTube"
            href={YOUTUBE_CHANNEL}
            Icon={Youtube}
            description="Predicaciones y videos."
          />
        </section>

        {/* Embeds */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* Facebook */}
          <article className="rounded-3xl border border-yellow-400 bg-white shadow">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-3">
              <h2 className="text-2xl font-semibold">Facebook</h2>
              <Link
                href={FACEBOOK_PAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline"
              >
                Abrir Facebook <ExternalLink className="h-4 w-4" />
              </Link>
            </div>

            {/* Content */}
            <div className="px-4 md:px-6 pb-6">
              {/* Centered, responsive max-widths; rounded clip; no baseline gap */}
              <div className="mx-auto w-full max-w-[340px] sm:max-w-[480px] md:max-w-[560px] rounded-2xl overflow-hidden leading-none">
                <iframe
                  title="Facebook Page Plugin"
                  // Use a smaller height on mobile so you don't get a big empty bottom area.
                  // (The plugin doesn’t support CSS media queries for height, so we pick a good compromise.)
                  src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                    FACEBOOK_PAGE
                  )}&tabs=timeline&width=500&height=560&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false`}
                  className="block w-full align-top"
                  style={{
                    border: "none",
                    overflow: "hidden",
                    width: "100%",
                    height: 560,
                  }}
                  scrolling="no"
                  frameBorder={0}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
            </div>
          </article>

          {/* YouTube (unchanged) */}
          <article className="rounded-3xl border border-yellow-400 bg-white p-6 shadow">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-semibold">YouTube</h2>
              <div className="flex items-center gap-4">
                <Link
                  href={`${YOUTUBE_CHANNEL}?sub_confirmation=1`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-red-600 px-3 py-1.5 text-white text-sm font-semibold hover:bg-red-700"
                >
                  Suscribirse
                </Link>
                <Link
                  href={YOUTUBE_CHANNEL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline"
                >
                  Abrir canal <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${YT_LATEST_VIDEO_ID}?modestbranding=1&rel=0&playsinline=1`}
                title="YouTube"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </article>
        </section>

        {/* Instagram (LightWidget) */}
        <section className="rounded-3xl border border-yellow-400 bg-white shadow">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-3">
            <h2 className="text-2xl font-semibold">Instagram</h2>
            <Link
              href={INSTAGRAM_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline"
            >
              Abrir Instagram <ExternalLink className="h-4 w-4" />
            </Link>
          </div>

          {/* Content */}
          <div className="px-4 md:px-6 pb-6">
            {/* Centered, responsive max-widths; rounded clip; no baseline gap */}
            <div className="mx-auto w-full max-w-[360px] sm:max-w-[700px] md:max-w-[900px] rounded-2xl overflow-hidden leading-none">
              <Script
                src="https://cdn.lightwidget.com/widgets/lightwidget.js"
                strategy="afterInteractive"
              />
              <iframe
                title="Instagram de MFLC Yonkers"
                src="https://cdn.lightwidget.com/widgets/b8f5246c8229571395df22eeb33b1301.html"
                className="lightwidget-widget block w-full align-top"
                style={{ border: 0, overflow: "hidden" }}
                scrolling="no"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function SocialCard({
  label,
  href,
  Icon,
  description,
}: {
  label: string;
  href: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-3xl border border-yellow-400 bg-white p-6 shadow transition hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      aria-label={`Abrir ${label} en una nueva pestaña`}
    >
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-yellow-100 p-3">
          <Icon className="h-7 w-7 text-yellow-900" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{label}</h2>
          <p className="text-neutral-700 text-sm">{description}</p>
          <p className="mt-1 text-neutral-600 text-xs break-all group-hover:underline">
            {href}
          </p>
        </div>
        <ExternalLink className="h-5 w-5 text-neutral-500 group-hover:text-neutral-700" />
      </div>
    </Link>
  );
}
