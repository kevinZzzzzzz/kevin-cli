import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation_en from "./translation/en.json";
import translation_zh from "./translation/zh.json";

const resources = {
  en: {
    translation: translation_en,
  },
  zh: {
    translation: translation_zh,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "zh",
    fallbackLng: "zh",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
