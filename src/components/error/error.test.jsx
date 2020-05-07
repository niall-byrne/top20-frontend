import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import WithError, { ErrorMessage } from "./error.component";
import { UserContext } from "../../providers/user/user.provider";
import {
  dispatchMock,
  noUserError,
  userError,
} from "../../test.fixtures/user.fixture";

const TestHook = () => <div>TestComponent</div>;

describe("Check Error Rendering", () => {
  let utils;
  let history;
  let initial = [userError, userError, noUserError];

  beforeEach(() => {
    dispatchMock.mockReset();
    history = createMemoryHistory();
    const TestHookWithSpinner = WithError(TestHook);
    utils = render(
      <Router history={history}>
        <UserContext.Provider value={initial.pop()}>
          <TestHookWithSpinner />
        </UserContext.Provider>
      </Router>
    );
  });

  afterEach(cleanup);

  it("renders without an error message when no error is present", () => {
    expect(utils.queryByText(ErrorMessage)).toBeNull();
    expect(utils.queryByTestId("Error1")).toBeNull();
  });

  it("renders with an error message when an error is present", () => {
    expect(utils.getByText(ErrorMessage)).toBeTruthy();
    expect(utils.getByTestId("Error1")).toBeTruthy();
    expect(utils.getByTestId("Error2")).toBeTruthy();
  });

  it("Test Click Event on Button", () => {
    expect(history.length).toBe(1);
    fireEvent.click(utils.getByTestId("Error2"));
    expect(dispatchMock.mock.calls.length).toBe(1);
    expect(dispatchMock.mock.calls[0][0]).toStrictEqual({ type: "ClearError" });
    expect(history.length).toBe(2);
  });
});
