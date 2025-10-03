// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const base =
  typeof import.meta.env.BASE_URL === "string" ? import.meta.env.BASE_URL : "/";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "tr"],
    ns: ["common", "errors"],
    defaultNS: "common",
    load: "languageOnly",
    // debug: import.meta.env.DEV,
    backend: {
      loadPath: `${base}locales/{{lng}}/{{ns}}.json`,
    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator"],
      caches: ["cookie", "localStorage"],
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: true },
  });

export default i18n;
