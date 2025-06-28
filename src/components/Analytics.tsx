"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function gaEvent(action: string, params: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
}

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-95HT1F7YCB", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-95HT1F7YCB" strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', 'G-95HT1F7YCB', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
