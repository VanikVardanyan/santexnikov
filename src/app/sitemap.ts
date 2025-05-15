// app/sitemap.xml/route.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://santexnikov.ru/", lastModified: new Date() },
    { url: "https://santexnikov.ru/catalog", lastModified: new Date() },
    { url: "https://santexnikov.ru/contacts", lastModified: new Date() },
  ];
}
