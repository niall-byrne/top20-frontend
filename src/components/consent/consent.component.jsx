import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import CookieConsent from "react-cookie-consent";

import { AnalyticsContext } from "../../providers/analytics/analytics.provider";

import messages from "../../configuration/messages";

const Consent = () => {
  const { setup } = useContext(AnalyticsContext);
  const { t } = useTranslation();

  return (
    <CookieConsent
      enableDeclineButton
      onAccept={setup}
      buttonText={t(messages.CookieButtonText)}
    >
      {t(messages.CookieMessage)}
    </CookieConsent>
  );
};

export default Consent;
