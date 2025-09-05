// this is the banner image under the nav bar

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen bg-white">
      {/* Mobile image (stretched to remove padding) */}
      <Image
        src="/thumbnail_with_bgc.png"
        alt="Hero background mobile"
        fill
        priority
        className="object-fill object-center md:hidden"
        sizes="100vw"
      />

      {/* Desktop image (also stretched) */}
      <Image
        src="/thumbnail.png"
        alt="Hero background desktop"
        fill
        priority
        className="hidden md:block object-fill object-center"
        sizes="100vw"
      />
    </section>
  );
}
