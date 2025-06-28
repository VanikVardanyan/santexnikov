// app/layout.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "../components/Footer";
import Script from "next/script";

const GTM_ID = "GTM-PTQPDQ7X";

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
        <Script id="gtm-init" strategy="afterInteractive">
          {`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
    j.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}'+dl;
    f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `}
        </Script>
      </head>
      <body className="d-flex flex-column min-vh-100">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Header />
        <main className="container-fluid flex-grow-1 px-4 pt-5 mt-5">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
