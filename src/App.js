import React from "react";
import { Switch, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";

import Header from "./components/header/header.component";
import Search from "./components/search/search.component";
import { default as Profile } from "./components/profile/profile.container";
import Contact from "./components/contact/contact.component";
import UserProvider from "./providers/user/user.provider";
import Routes from "./configuration/routes";
import i18n from "./configuration/localization";

function App() {
  return (
    <div>
      <I18nextProvider i18n={i18n}>
        <UserProvider>
          <div className="flexbox">
            <div>
              <Header />
              <Switch>
                <Route exact path={Routes.contact} component={Contact} />
                <Route exact path={Routes.search} component={Search} />
                <Route path={Routes.profile} component={Profile} />
              </Switch>
            </div>
          </div>
        </UserProvider>
      </I18nextProvider>
    </div>
  );
}

export default App;
