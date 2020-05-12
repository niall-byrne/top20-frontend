import React from "react";
import { render, cleanup, act, waitFor } from "@testing-library/react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

import Routes from "../../../configuration/routes";
import ProfileContainer from "../profile.container";
import Profile from "../profile.component";

import { UserContext } from "../../../providers/user/user.provider";
import { mockApiData } from "../../../test.fixtures/lastfm.api.fixture";

jest.mock("../profile.component");

import {
  dispatchMock,
  userBeforeFetch,
  userBeforeFetchReady,
  userBeforeFetchUrlEncodingNeeded,
} from "../../../test.fixtures/lastfm.user.fixture";

describe("Check the Profile Container Component Renders Without Crashing", () => {
  afterEach(cleanup);
  let history;
  let utils;
  let state;
  let setup = [userBeforeFetchReady, userBeforeFetch];
  beforeEach(() => {
    dispatchMock.mockReset();
    Profile.mockImplementation(() => <div>MockComponent</div>);
    state = setup.shift();
    history = createMemoryHistory();
    history.push(Routes.root);
    utils = render(
      <Router history={history}>
        <UserContext.Provider value={state}>
          <ProfileContainer data={mockApiData} />
        </UserContext.Provider>
      </Router>
    );
  });

  it("has ready state, so the profile should be rendered without any dispatch", async (done) => {
    expect(utils.queryByTestId("billboard1")).toBeFalsy();
    expect(utils.queryByTestId("billboard2")).toBeFalsy();
    await waitFor(() => expect(dispatchMock).toHaveBeenCalledTimes(0));
    done();
  });

  it("has not ready state, so the spinner should be rendered, on it's billboard", async (done) => {
    expect(utils.getByTestId("billboard1")).toBeTruthy();
    expect(utils.getByTestId("billboard2")).toBeTruthy();
    expect(utils.getByTestId("Spinner1")).toBeTruthy();
    await waitFor(() => expect(dispatchMock).toHaveBeenCalledTimes(1));
    done();
  });
});

describe("Check Profile Data Fetching", () => {
  let history;
  let utils;
  let state = [
    userBeforeFetch,
    userBeforeFetchUrlEncodingNeeded,
    userBeforeFetch,
    userBeforeFetch,
    userBeforeFetchReady,
  ];
  let providerState;
  beforeEach(() => {
    dispatchMock.mockReset();
    Profile.mockImplementation(() => <div>MockComponent</div>);
    providerState = state.shift();
    history = createMemoryHistory();
    history.push(
      `/${encodeURIComponent(providerState.userProperties.userName)}`
    );
    utils = render(
      <Router history={history}>
        <UserContext.Provider value={providerState}>
          <Route path="/:userName" component={ProfileContainer} />
        </UserContext.Provider>
      </Router>
    );
  });

  afterEach(cleanup);

  it("when ready is false, a dispatch is made to fetch the user data (clean username)", async (done) => {
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

  it("when ready is false, a dispatch is made to fetch the user data (url encoding needed)", async (done) => {
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
