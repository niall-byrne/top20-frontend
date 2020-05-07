import React from "react";
import { render, cleanup } from "@testing-library/react";
import WithError, { ErrorMessage } from "./error.component";

import { UserContext } from "../../providers/user/user.provider";
import { noUserError, userError } from "../../test.fixtures/user.fixture";

const TestHook = () => <div>TestComponent</div>;

describe("Check Error Rendering", () => {
  let utils;
  let initial = [userError, noUserError];
  beforeEach(() => {
    const TestHookWithSpinner = WithError(TestHook);
    utils = render(
      <UserContext.Provider value={initial.pop()}>
        <TestHookWithSpinner />
      </UserContext.Provider>
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
  });
});
