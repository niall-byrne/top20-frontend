import React from "react";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";

import i18n from "./configuration/localization";
import "./index.css";
import App from "./App";

export const IndexComponent = () => (
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
