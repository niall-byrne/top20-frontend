import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import WithError, { messages } from "../error.component";
import { UserContext } from "../../../providers/user/user.provider";
import UserTypes from "../../../providers/user/user.actions";
import {
  dispatchMock,
  noUserError,
  userError,
} from "../../../test.fixtures/lastfm.user.fixture";
import Routes from "../../../configuration/routes";

const TestHook = () => <div>TestComponent</div>;

describe("Check Error Rendering", () => {
  let utils;
  let history;
  let state;
  let setup = [noUserError, userError, userError, userError];

  beforeEach(() => {
    dispatchMock.mockReset();
    state = setup.shift();
    history = createMemoryHistory();
    const TestHookWithSpinner = WithError(TestHook);
    utils = render(
      <Router history={history}>
        <UserContext.Provider value={state}>
          <TestHookWithSpinner />
        </UserContext.Provider>
      </Router>
    );
  });

  afterEach(cleanup);

  it("renders without an error message when no error is present", () => {
    expect(utils.queryByText(messages.ErrorMessage)).toBeNull();
    expect(utils.queryByTestId("Error1")).toBeNull();
  });

  it("renders with an error message when an error is present", () => {
    expect(utils.getByText(messages.ErrorMessage)).toBeTruthy();
    expect(utils.getByTestId("Error1")).toBeTruthy();
    expect(utils.getByTestId("Error2")).toBeTruthy();
  });

  it("responds to a button press by changing the page", () => {
    expect(history.length).toBe(1);
    fireEvent.click(utils.getByTestId("Error2"));
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe(Routes.search);
  });

  it("calls the toggle error dispatch on cleanup", () => {
    utils.unmount();
    expect(dispatchMock.mock.calls.length).toBe(1);
    expect(dispatchMock.mock.calls[0][0]).toStrictEqual({
      type: UserTypes.ResetState,
    });
  });
});
