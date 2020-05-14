import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";

//import Header from "./components/header/header.component";
import UserProvider from "./providers/user/user.provider";
import Routes from "./configuration/routes";
import i18n from "./configuration/localization";

import { Spinner } from "./components/spinner/spinner.component";
const Header = lazy(() => import("./components/header/header.component"));
const Search = lazy(() => import("./components/search/search.component"));
const Contact = lazy(() => import("./components/contact/contact.component"));
const Profile = lazy(() => import("./components/profile/profile.container"));

function App() {
  return (
    <div>
      <I18nextProvider i18n={i18n}>
        <UserProvider>
          <div className="flexbox">
            <div>
              <Suspense fallback={<Spinner />}>
                <Header />
                <Switch>
                  <Route exact path={Routes.contact} component={Contact} />
                  <Route exact path={Routes.search} component={Search} />
                  <Route path={Routes.profile} component={Profile} />
                </Switch>
              </Suspense>
            </div>
          </div>
        </UserProvider>
      </I18nextProvider>
    </div>
  );
}

export default App;
