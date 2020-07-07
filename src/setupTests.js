// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { messages } from "./configuration/messages";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  ns: ["translation"],
  defaultNS: "translation",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: { ...messages },
});

global.i18n = i18n;
