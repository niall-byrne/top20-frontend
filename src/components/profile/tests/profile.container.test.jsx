import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

import ProfileContainer from "../profile.container";
import UserProvider, {
  UserContext,
} from "../../../providers/user/user.provider";

import {
  dispatchMock,
  userBeforeFetch,
  userBeforeFetchReady,
} from "../../../test.fixtures/user.fixture";

describe("Check the Profile Container Component Renders Without Crashing", () => {
  afterEach(cleanup);
  let history;
  let utils;
  beforeEach(() => {
    history = createMemoryHistory();
    utils = render(
      <Router history={history}>
        <UserProvider>
          <ProfileContainer />
        </UserProvider>
      </Router>
    );
    history.push("/");
  });

  it("should be wrapped in the billboard components", () => {
    expect(utils.getByTestId("billboard1")).toBeTruthy();
    expect(utils.getByTestId("billboard2")).toBeTruthy();
  });
});

describe("Check Profile Data Fetching", () => {
  afterEach(cleanup);
  let history;
  let utils;
  let initial = [userBeforeFetchReady, userBeforeFetch];
  let providerState;
  beforeEach(() => {
    dispatchMock.mockReset();
    providerState = initial.pop();
    history = createMemoryHistory();
    history.push(`/${providerState.userProperties.userName}`);
    utils = render(
      <Router history={history}>
        <UserContext.Provider value={providerState}>
          <Route path="/:userName" component={ProfileContainer} />
        </UserContext.Provider>
      </Router>
    );
  });

  it("when ready is false, a dispatch is made to fetch the user data", () => {
    expect(dispatchMock.mock.calls.length).toBe(1);
    const call = dispatchMock.mock.calls[0][0];
    expect(call.userName).toBe(providerState.userProperties.userName);
    expect(call.type).toBe("StartFetchUser");
    expect(call.func).toBeInstanceOf(Function);
    expect(call.success).toBeInstanceOf(Function);
    expect(call.failure).toBeInstanceOf(Function);
  });

  it("when ready is true, no dispatch is made", () => {
    expect(dispatchMock.mock.calls.length).toBe(0);
  });
});
