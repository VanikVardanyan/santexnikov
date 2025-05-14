import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "СанТехников",
  description: "Профессиональные решения для водоснабжения, отопления и инженерной сантехники",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "СанТехников",
    description: "Профессиональные решения для водоснабжения, отопления и инженерной сантехники",
    url: "https://ТВОЙ_ДОМЕН", // 👉 тут вставь свой домен
    siteName: "СанТехников",
    images: [
      {
        url: "/og-image.png", // 👉 положи красивую картинку сюда
        width: 1200,
        height: 630,
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "СанТехников",
    description: "Профессиональные решения для водоснабжения, отопления и инженерной сантехники",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        {/* Дополнительные иконки */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-96x96.png" />
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
