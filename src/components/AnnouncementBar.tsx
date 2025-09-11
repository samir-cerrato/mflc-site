// this is the moving announcement bar at the top of the page below nav bar
"use client";

import type { CSSProperties } from "react";

export default function AnnouncementBar() {
  const text = (
    <>
      ¡Bienvenido a la casa del Señor! Que la gracia y la bendición de Dios
      estén contigo. Has llegado a un lugar donde juntos buscamos fortalecer
      nuestra fe, compartir Su Palabra y servir con amor.{" "}
      <em className="italic">
        &lsquo;Pero yo y mi casa serviremos al Señor.&rsquo; Josué 24:15
      </em>
    </>
  );

  // Bigger number = slower scroll
  const duration = "36s";

  // Type-safe CSS variable (no `any`)
  const trackStyle: CSSProperties & Record<"--duration", string> = {
    "--duration": duration,
  };

  return (
    <div className="bg-yellow-100 text-black overflow-hidden m-0 p-0 leading-none">
      <div className="wrap">
        <div className="track py-6" style={trackStyle}>
          <div className="copy">
            <span className="px-8 text-2xl font-semibold">{text}</span>
          </div>
          <div className="copy" aria-hidden="true">
            <span className="px-8 text-2xl font-semibold">{text}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .wrap {
          overflow: hidden;
        }
        .track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marquee var(--duration) linear infinite;
        }
        .copy {
          display: flex;
          align-items: center;
          white-space: nowrap;
        }
        .bg-white:hover .track {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .track {
            animation-play-state: paused;
          }
        }
      `}</style>
    </div>
  );
}
