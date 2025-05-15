// app/layout.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Инженерная сантехника в Москве | Santexnikov",
  description: "Профессиональные решения для водоснабжения, отопления и инженерной сантехники в Москве и области.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Инженерная сантехника в Москве | Santexnikov",
    description: "Профессиональные решения для водоснабжения, отопления и инженерной сантехники в Москве и области.",
    url: "https://santexnikov.ru",
    siteName: "Santexnikov",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Инженерная сантехника в Москве | Santexnikov",
    description: "Профессиональные решения для водоснабжения, отопления и инженерной сантехники в Москве и области.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        {/* SEO meta */}
        <meta name="google-site-verification" content="Fqbiv7jZRZqiqy5dZIzYo7pY16KbDMdDqAptD1kMQig" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="alternate" href="https://santexnikov.ru/" hrefLang="ru" />

        {/* Фавиконы */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className="d-flex flex-column min-vh-100">
        <Header />
        <main className="container-fluid flex-grow-1 px-4 pt-5 mt-5">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
