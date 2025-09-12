"use client";
import Script from "next/script";

export default function SchemaOrg() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        // Make the church also an Organization so Google can use the Logo rich result
        "@type": ["Organization", "Church"],
        "@id": "https://www.mflcyonkers.com/#org",
        name: "Ministerio Familiar La Cosecha",
        alternateName: "MFLC Yonkers",
        url: "https://www.mflcyonkers.com/",
        logo: {
          "@type": "ImageObject",
          url: "https://www.mflcyonkers.com/logo.PNG",
        },
        image: "https://www.mflcyonkers.com/logo.PNG",
        sameAs: [
          "https://www.facebook.com/ministeriofamiliarlacosecha",
          "https://www.instagram.com/lacosechayonkers",
          "https://www.youtube.com/@MFLCYONKERS",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "191 North Broadway",
          addressLocality: "Yonkers",
          addressRegion: "NY",
          postalCode: "10701",
          addressCountry: "US",
        },
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
      },
      {
        // Put inLanguage on the WebSite (it's a CreativeWork)
        "@type": "WebSite",
        "@id": "https://www.mflcyonkers.com/#website",
        url: "https://www.mflcyonkers.com/",
        name: "MFLC Yonkers",
        inLanguage: ["es", "en"],
        publisher: { "@id": "https://www.mflcyonkers.com/#org" },
      },
    ],
  };

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
