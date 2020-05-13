import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/header/header.component";
import Login from "./components/login/login.component";
import { default as Profile } from "./components/profile/profile.container";
import Contact from "./components/contact/contact.component";
import UserProvider from "./providers/user/user.provider";
import Routes from "./configuration/routes";

function App() {
  return (
    <div>
      <UserProvider>
        <div className="flexbox">
          <div>
            <Header />
            <Switch>
              <Route exact path={Routes.contact} component={Contact} />
              <Route exact path={Routes.search} component={Login} />
              <Route path={Routes.profile} component={Profile} />
            </Switch>
          </div>
        </div>
      </UserProvider>
    </div>
  );
}

export default App;
