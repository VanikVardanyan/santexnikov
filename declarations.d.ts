// declarations.d.ts
declare module "bootstrap";
declare module "bootstrap/dist/js/bootstrap.bundle.min.js";

declare global {
  interface Window {
    dataLayer?: Record<string>[];
  }
}

export {};
