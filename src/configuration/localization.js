import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { messages } from "./messages";

const isNotProductionOrTest = () =>
  process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test";

const i18nConfig = {
  fallbackLng: "en",
  debug: isNotProductionOrTest(),
  ns: ["translation"],
  defaultNS: "translation",
  keySeparator: ".",
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
    ...messages,
  },
  ...i18nConfig,
});

export default i18n;
