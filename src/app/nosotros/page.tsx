// src/app/nosotros/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import GalleryCarousel from "@/components/GalleryCarousel";

export const metadata: Metadata = {
  alternates: { canonical: "/nosotros" },
  title: "Nosotros",
  description: "Conoce nuestra visión, misión y liderazgo.",
};

export default function NosotrosPage() {
  return (
    <main className="bg-yellow-100 min-h-screen">
      {/* HERO BANNER (full width under navbar) */}
      <section className="relative w-full">
        <div className="relative h-[280px] sm:h-[340px] md:h-[420px] lg:h-[520px] xl:h-[580px] overflow-hidden">
          {/* Mobile image */}
          <Image
            src="/about-us-mobile.png"
            alt="Imagen de cabecera (móvil)"
            fill
            sizes="100vw"
            className="object-cover object-center block md:hidden"
            priority
          />
          {/* Desktop/tablet image */}
          <Image
            src="/about-us.jpg"
            alt="Imagen de cabecera (desktop)"
            fill
            sizes="100vw"
            className="object-cover md:object-[42%_92%] hidden md:block"
          />
          {/* Overlay + title */}
          <div className="absolute inset-0 flex items-end justify-center pb-8 md:pb-14">
            <h1 className="text-white text-center text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] translate-y-3 sm:translate-y-3">
              Quiénes Somos
            </h1>
          </div>
        </div>
      </section>

      {/* ======= ABOUT LAYOUT ======= */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        {/* Row 1: Box 1 (Video) — full width on its own row */}
        <section>
          {/* Box 1: YouTube embed */}
          <article className="rounded-2xl border border-yellow-200 bg-white/60 overflow-hidden">
            {/* Shorts are vertical, so use 9:16 on mobile; you can keep 16:9 on md+ if you want */}
            <div className="relative w-full aspect-[9/16] md:aspect-[16/9]">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube-nocookie.com/embed/AUHs8f5d2iE?modestbranding=1&rel=0&playsinline=1"
                title="MFLC Yonkers — 14 años en imágenes (Shorts)"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </article>
        </section>
        {/* Row 2: Box 2 (Misión) + Box 3 (Visión) — wider side-by-side */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Box 2: Misión */}
          <article className="rounded-2xl border border-yellow-200 bg-white/60 p-6">
            <h2 className="text-2xl font-semibold">Misión</h2>

            <div className="mt-3 text-gray-700 space-y-4">
              <p>
                El principal propósito de{" "}
                <strong>Ministerio Familiar La Cosecha</strong> es traer vidas a
                los pies de nuestro Señor Jesucristo y predicar su santo
                evangelio completo por todo el mundo. Lo hacemos por medio de
                diferentes ministerios misioneros y pastores que están
                dispuestos a darlo todo por causa del Evangelio, llevando las
                buenas nuevas de salvación a los lugares más remotos del mundo
                donde no se ha escuchado el maravilloso nombre de nuestro Señor
                Jesucristo.
              </p>

              <p>
                <strong>Ministerio Familiar La Cosecha</strong> y su pastor{" "}
                <strong>Maynor Cerrato</strong> han recibido, por palabra
                profética y confirmada varias veces por diferentes instrumentos
                del Señor (profetas, evangelistas y ministros del exterior), lo
                siguiente:
              </p>

              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  Que Dios envió a nuestro pastor como portavoz y líder de
                  nuestra congregación para realizar dicha misión juntamente con
                  su compañera.
                </li>
                <li>
                  Que como congregación, Dios nos ha llamado a vivir una vida de
                  consagración a Él, sin reservas.
                </li>
                <li>
                  Que como congregación debemos estar listos para el avivamiento
                  final que Dios traerá a la tierra.
                </li>
                <li>Establecer una escuela para líderes.</li>
                <li>
                  Establecer un centro de educación vocacional para nuevos
                  creyentes sin trabajo o sin destrezas.
                </li>
                <li>Establecer centros para cuidado de niños.</li>
                <li>
                  Establecer un ministerio o casa de restauración para adictos a
                  estupefacientes.
                </li>
                <li>
                  Construir el templo de{" "}
                  <strong>Ministerio Familiar La Cosecha</strong>.
                </li>
                <li>
                  Levantar congregaciones hijas de la nuestra, pastoreadas por
                  líderes graduados de la misma escuela de liderazgo.
                </li>
                <li>Y otras cosas más.</li>
              </ol>
            </div>
          </article>

          {/* Box 3: Visión */}
          <article className="rounded-2xl border border-yellow-200 bg-white/60 p-6">
            <h2 className="text-2xl font-semibold">Visión</h2>

            <div className="mt-3 text-gray-700 space-y-4">
              <p>
                Tener una relación íntima con nuestro Señor Jesucristo a través
                de <strong>SITA</strong>:
                <em> Sinceridad, Integridad, Transparencia y Amor</em>; y vivir
                en lealtad divina, moral y devocional al Padre, al Hijo y al
                Espíritu Santo.
              </p>

              <p>
                Anunciar las virtudes de Jesucristo patrocinando, orando y
                enviando a los misioneros y pastores que anuncian la paz y las
                buenas nuevas de salvación hasta el último rincón del mundo,
                practicando y viviendo la compasión, la misericordia, la fe y el
                amor.
              </p>

              <p>
                Proclamar a Cristo Jesús, hacer discípulos y levantar líderes
                para el Reino de Dios. Anunciar a Cristo Jesús como{" "}
                <strong>EL CAMINO, LA VERDAD Y LA VIDA</strong>, para traer a la
                gente a una vida de relación con Él; por medio de la oración, el
                ayuno, la vigilia y la enseñanza de la santa Palabra de Dios.
              </p>

              <p>
                Ser luz y sal de la tierra, guiando, exhortando e instruyendo al
                hombre en la santa doctrina de nuestro Señor Jesucristo —según
                la Biblia— mediante la dirección y el poder del Espíritu Santo.
                Para lograr nuestra misión en las ciudades del condado de
                Westchester, Putnam y las áreas alrededor, se propone lo
                siguiente:
              </p>

              {/* Lettered list A., B., C., ... */}
              <ol type="A" className="pl-6 space-y-2 list-inside">
                <li>
                  A. Orar sin cesar por nuestra ciudad, comunidades y el mundo
                  entero.
                </li>
                <li>
                  B. Levantar una escuela de líderes que sea capaz de llevar a
                  cabo la visión dada por Dios.
                </li>
                <li>
                  C. Fomentar un crecimiento espiritual y económico para
                  afrontar los requisitos de la misión.
                </li>
                <li>
                  D. Desarrollar estrategias para ganar nuestra ciudad para
                  Cristo.
                </li>
                <li>
                  E. Apoyar la visión con trabajo, esfuerzo y con mis finanzas.
                </li>
              </ol>
            </div>
          </article>
        </section>
        {/* ======= LEADERSHIP ======= */}
        {/* Row 3: Image (2 cols) + Bio (4 cols) pairs */}
        <section className="grid grid-cols-1 md:grid-cols-6 gap-6 items-start">
          {/* Box 4: Pastor image (3:4) */}
          <div className="rounded-2xl border border-yellow-200 bg-white/60 overflow-hidden self-start md:col-span-2">
            <div className="relative w-full pt-[133%]">
              <Image
                src="/pastor_photo.png"
                alt="Pastor Maynor Cerrato"
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Box 5: Pastor bio */}
          <article className="rounded-2xl border border-yellow-200 bg-white/60 p-6 md:col-span-4">
            <h3 className="text-xl font-semibold">
              Doctor Reverendo Pastor Maynor Cerrato
            </h3>
            <p className="mt-2 text-gray-700">
              Nací en San Pedro Sula Honduras. Soy el segundo hijo de 4
              hermanos. Desde la edad de 6 años le sirvo al señor. Emigre a los
              Estados Unidos a la edad de 19 años.
            </p>
            <p className="mt-2 text-gray-700">
              Al llegar al kindergarten conocí a la que el dia de hoy es mi
              esposa, la Pastora Norma Cerrato, con la cual hemos procreado 2
              hijos que le sirven al Señor Jesús, Laura y Samir Cerrato - mis
              grandes tesoros en mi vida.
            </p>
            <p className="mt-2 text-gray-700">
              Estudie una maestría en Conserjería Clinica Pastoral en la
              universidad Revelation 3:20 en Miami, Florida. Soy Pastor del
              Ministerio Familiar la Cosecha en Yonkers, NY.
            </p>
          </article>

          {/* Box 6: Pastora image (3:4) */}
          <div className="rounded-2xl border border-yellow-200 bg-white/60 overflow-hidden self-start md:col-span-2">
            <div className="relative w-full pt-[133%]">
              <Image
                src="/pastora_photo.JPG"
                alt="Pastora Norma Cerrato"
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Box 7: Pastora bio */}
          <article className="rounded-2xl border border-yellow-200 bg-white/60 p-6 md:col-span-4">
            <h3 className="text-xl font-semibold">Pastora Norma Cerrato</h3>
            <p className="mt-2 text-gray-700">
              Nací en Honduras en el mes de las flores, mayo. Soy la tercera
              hija del matrimonio de Esteban Amaya y Leonor Barahona. Estudié
              Secretaria Comercial en Honduras y obtuve un asociado en Teología
              en los Estados Unidos.
            </p>
            <p className="mt-2 text-gray-700">
              Estoy casada hace 28 años con un hombre maravilloso a quien
              conozco desde la infancia (kínder), y somos padres de Laura
              Génesis y Samir Isaac. He vivido 20 años en el condado del Bronx
              y, por 14 años, he servido al Dios Altísimo trabajando con la
              comunidad de Yonkers.
            </p>
          </article>
        </section>
        {/* Row 4: Box 8 (Gallery) */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Galería</h2>
          <div className="rounded-2xl border border-yellow-200 bg-white/60 p-0">
            <GalleryCarousel
              items={[
                { caption: "Ejemplo: Bautismos – Agosto (placeholder)" },
                { caption: "Ejemplo: Servicio de Adoración (placeholder)" },
                { caption: "Ejemplo: Día de Comunidad (placeholder)" },
              ]}
              intervalMs={30000}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
