// src/app/SchemaOrg.tsx
"use client";
import Script from "next/script";

export default function SchemaOrg() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: "Ministerio Familiar La Cosecha",
    alternateName: "MFLC Yonkers",
    url: "https://www.mflcyonkers.com/",
    image: "https://www.mflcyonkers.com/og-cover.jpg",
    logo: "https://www.mflcyonkers.com/logo.PNG",
    address: {
      "@type": "PostalAddress",
      streetAddress: "191 North Broadway",
      addressLocality: "Yonkers",
      addressRegion: "NY",
      postalCode: "10701",
      addressCountry: "US",
    },
    sameAs: [
      "https://www.facebook.com/ministeriofamiliarlacosecha",
      "https://www.instagram.com/lacosechayonkers",
      "https://www.youtube.com/@MFLCYONKERS",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "19:30",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "19:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "14:30",
        closes: "16:30",
      },
    ],
    inLanguage: ["es", "en"],
  };

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
