import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/header/header.component";
import Login from "./components/login/login.component";
import { default as Profile } from "./components/profile/profile.container";
import UserProvider from "./providers/user/user.provider";

function App() {
  return (
    <div>
      <UserProvider>
        <div className="flexbox">
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/:userName" component={Profile} />
            </Switch>
          </div>
        </div>
      </UserProvider>
    </div>
  );
}

export default App;
