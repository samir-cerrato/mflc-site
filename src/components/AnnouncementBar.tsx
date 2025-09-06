//this is the moving announcement bar at the top of the page below nav bar

"use client";

export default function AnnouncementBar() {
  const text = (
    <>
      ¡Bienvenido a la casa del Señor! Que la gracia y la bendición de Dios
      estén contigo. Has llegado a un lugar donde juntos buscamos fortalecer
      nuestra fe, compartir Su Palabra y servir con amor.{" "}
      <em className="italic">
        'Pero yo y mi casa serviremos al Señor.' Josué 24:15
      </em>
    </>
  );

  // Bigger number = slower scroll
  const duration = "36s";

  return (
    <div className="bg-yellow-100 text-black overflow-hidden m-0 p-0 leading-none">
      <div className="wrap">
        <div className="track py-6" style={{ ["--duration" as any]: duration }}>
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
