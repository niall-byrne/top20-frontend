import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import ProfileContainer from "../profile.container";
import UserProvider from "../../../providers/user/user.provider";

describe("Check the Profile Container Component Renders Without Crashing", () => {
  afterEach(cleanup);
  let history;
  let utils;
  let paths = ["/"];
  beforeEach(() => {
    history = createMemoryHistory();
    utils = render(
      <Router history={history}>
        <UserProvider>
          <ProfileContainer />
        </UserProvider>
      </Router>
    );
    history.push(paths.pop());
  });

  it("should be wrapped in the billboard components", () => {
    expect(utils.getByTestId("billboard1")).toBeTruthy();
    expect(utils.getByTestId("billboard2")).toBeTruthy();
  });
});

describe("Check Profile Data Fetching", () => {
  afterEach(cleanup);

  it("placeholder", () => {
    expect(true).toBe(false);
  });
});
