import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import CookieConsent from "react-cookie-consent";
import { useTranslation } from "react-i18next";

import UserProvider from "./providers/user/user.provider";
import AnalyticsProvider from "./providers/analytics/analytics.provider";

import Routes from "./configuration/routes";
import messages from "./configuration/messages";

import { Spinner } from "./components/spinner/spinner.component";
const Header = lazy(() => import("./components/header/header.component"));
const Search = lazy(() => import("./components/search/search.component"));
const Contact = lazy(() => import("./components/contact/contact.component"));
const Profile = lazy(() => import("./components/profile/profile.container"));

function App() {
  const { t } = useTranslation();

  return (
    <div>
      <UserProvider>
        <AnalyticsProvider>
          <div className="flexbox">
            <div>
              <Suspense fallback={<Spinner />}>
                <Header />
                <CookieConsent>{t(messages.CookieMessage)}</CookieConsent>
                <Switch>
                  <Route exact path={Routes.contact} component={Contact} />
                  <Route exact path={Routes.search} component={Search} />
                  <Route path={Routes.profile} component={Profile} />
                </Switch>
              </Suspense>
            </div>
          </div>
        </AnalyticsProvider>
      </UserProvider>
    </div>
  );
}

export default App;
