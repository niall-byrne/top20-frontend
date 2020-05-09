import React from "react";
import { render, cleanup, act, waitFor } from "@testing-library/react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

import ProfileContainer from "../profile.container";
import { UserContext } from "../../../providers/user/user.provider";

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
    history.push("/");
    utils = render(
      <Router history={history}>
        <UserContext.Provider value={userBeforeFetchReady}>
          <ProfileContainer />
        </UserContext.Provider>
      </Router>
    );
  });

  it("should be wrapped in the billboard components, but no dispatch", async (done) => {
    expect(utils.getByTestId("billboard1")).toBeTruthy();
    expect(utils.getByTestId("billboard2")).toBeTruthy();
    await waitFor(() => expect(dispatchMock).toHaveBeenCalledTimes(0));
    done();
  });
});

describe("Check Profile Data Fetching", () => {
  let history;
  let utils;
  let initial = [
    userBeforeFetchReady,
    userBeforeFetch,
    userBeforeFetch,
    userBeforeFetch,
  ];
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

  afterEach(cleanup);

  it("when ready is false, a dispatch is made to fetch the user data", async (done) => {
    await waitFor(() => expect(dispatchMock).toHaveBeenCalledTimes(1));
    const call = dispatchMock.mock.calls[0][0];
    expect(call.userName).toBe(providerState.userProperties.userName);
    expect(call.type).toBe("StartFetchUser");
    expect(call.func).toBeInstanceOf(Function);
    expect(call.func.name).toBe("fetchProfile");
    expect(call.success).toBeInstanceOf(Function);
    expect(call.success.name).toBe("success");
    expect(call.failure).toBeInstanceOf(Function);
    expect(call.failure.name).toBe("failure");
    done();
  });

  it("the success callback should dispatch correctly", async (done) => {
    await waitFor(() => expect(dispatchMock).toHaveBeenCalledTimes(1));
    // Grab The Success Callback
    const call = dispatchMock.mock.calls[0][0];
    call.success({ content: "Data" });
    // Success
    await waitFor(() => expect(dispatchMock).toHaveBeenCalledTimes(2));
    expect(dispatchMock.mock.calls.length).toBe(2);
    const callback = dispatchMock.mock.calls[1][0];
    expect(callback).toEqual({
      type: "SuccessFetchUser",
      userName: "niall-byrne",
      data: "Data",
    });
    done();
  });

  it("the failure callback should dispatch correctly", async (done) => {
    await waitFor(() => expect(dispatchMock).toHaveBeenCalledTimes(1));
    // Grab The Failure Callback
    const call = dispatchMock.mock.calls[0][0];
    call.failure({ userName: "niall-byrne" });
    // Failure
    await waitFor(() => expect(dispatchMock).toHaveBeenCalledTimes(2));
    expect(dispatchMock.mock.calls.length).toBe(2);
    const callback = dispatchMock.mock.calls[1][0];
    expect(callback).toEqual({
      type: "FailureFetchUser",
      userName: "niall-byrne",
    });
    done();
  });

  it("when ready is true, no dispatch is made", async (done) => {
    expect(dispatchMock.mock.calls.length).toBe(0);
    done();
  });
});
