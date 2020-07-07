import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import CookieConsent from "react-cookie-consent";
import cookie from "cookie_js";

import { AnalyticsContext } from "../../providers/analytics/analytics.provider";

export const AnalyticsCookieName = "Top20CookieConsent";

const Consent = () => {
  const { setup } = useContext(AnalyticsContext);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (cookie.get(AnalyticsCookieName) === "true") {
      setup();
    }
  }, []); // eslint-disable-line

  if (cookie.get(AnalyticsCookieName) === "true") {
    return null;
  }

  return (
    <CookieConsent
      cookieName={AnalyticsCookieName}
      enableDeclineButton
      onAccept={setup}
      buttonText={t("CookieButtonText")}
    >
      {t("CookieMessage")}
    </CookieConsent>
  );
};

export default Consent;
