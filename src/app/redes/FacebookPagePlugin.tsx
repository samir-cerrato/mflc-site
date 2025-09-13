"use client";

import * as React from "react";

export default function FacebookPagePlugin({ href }: { href: string }) {
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(680); // desktop default

  React.useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const compute = () => {
      const w = el.clientWidth;
      // Pick a sensible height per width so the post isn’t cut off
      let h = 680;
      if (w < 360) h = 420;
      else if (w < 420) h = 500;
      else if (w < 520) h = 560;
      else if (w < 640) h = 600;
      else h = 680;
      setHeight(h);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const src = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    href
  )}&tabs=timeline&width=500&height=${height}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;

  return (
    <div
      ref={boxRef}
      className="mx-auto w-full max-w-[560px] rounded-2xl overflow-hidden leading-none"
    >
      <iframe
        title="Facebook Page Plugin"
        src={src}
        className="block w-full align-top"
        style={{ border: "none", overflow: "hidden", width: "100%", height }}
        scrolling="no"
        frameBorder={0}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      />
    </div>
  );
}
