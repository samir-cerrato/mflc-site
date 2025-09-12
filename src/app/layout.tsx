// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SchemaOrg from "./SchemaOrg";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mflcyonkers.com"),
  title: {
    default: "Ministerio Familiar La Cosecha – Yonkers, NY",
    template: "%s | MFLC Yonkers",
  },
  description:
    "Iglesia cristiana en Yonkers, NY. Servicios: viernes 7:30 PM, sábado 7:00 PM y domingo 2:30 PM. ¡Todos son bienvenidos!",
  keywords: [
    "MFLC Yonkers",
    "Ministerio Familiar La Cosecha",
    "iglesia en Yonkers",
    "La Cosecha Yonkers",
  ],
  openGraph: {
    type: "website",
    url: "https://www.mflcyonkers.com/",
    siteName: "MFLC Yonkers",
    title: "Ministerio Familiar La Cosecha – Yonkers, NY",
    description:
      "Iglesia cristiana en Yonkers, NY. Conoce nuestros horarios y participa.",
    images: [{ url: "/logo.PNG", width: 1200, height: 630 }], // swap to /og-cover.jpg when ready
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ministerio Familiar La Cosecha – Yonkers, NY",
    description: "Iglesia cristiana en Yonkers, NY. ¡Te esperamos!",
    images: ["/logo.PNG"], // swap to /og-cover.jpg when ready
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-yellow-50`}
      >
        <Navbar />
        <SchemaOrg />
        {children}
      </body>
    </html>
  );
}
