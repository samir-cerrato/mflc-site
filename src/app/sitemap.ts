import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.mflcyonkers.com";
  const routes = ["", "/nosotros", "/visit", "/contacto"]; // add more as needed
  const now = new Date();

  return routes.map((path, i) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : Math.max(0.5, 0.7 - i * 0.05),
  }));
}
