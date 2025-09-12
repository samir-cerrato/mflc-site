// src/app/page.tsx
import AnnouncementBar from "@/components/AnnouncementBar";
import Hero from "@/components/Hero";
import InfoPanel from "@/components/InfoPanel";
import VerseOfTheDay from "@/components/VerseOfTheDay";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Ministerio Familiar La Cosecha – Yonkers, NY",
  description:
    "Iglesia cristiana en Yonkers, NY. Servicios: viernes 7:30 PM, sábado 7:00 PM y domingo 2:30 PM.",
};

export default function Page() {
  return (
    <>
      <AnnouncementBar />
      <Hero />

      {/* Mobile: stacked; Desktop: equal-width, equal-height columns */}
      <div className="px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          <section id="eventos" className="min-w-0 flex-1">
            <InfoPanel />
          </section>

          <section id="votd" className="min-w-0 flex-1">
            {/* wrapper lets child fill the column height */}
            <div className="h-full">
              <VerseOfTheDay />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
