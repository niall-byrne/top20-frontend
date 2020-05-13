import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import messages from "./messages";

const i18nConfig = {
  fallbackLng: "en",
  debug: false,
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
  react: {
    wait: true,
  },
};

i18n.use(LanguageDetector).init({
  resources: {
    en: {
      ...messages,
    },
  },
  ...i18nConfig,
});

export default i18n;
