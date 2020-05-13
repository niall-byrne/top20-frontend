import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import FormLogin from "../form.login.component";

import { UserContext } from "../../../providers/user/user.provider";
import { testUser, noUser } from "../../../test.fixtures/lastfm.user.fixture";
import Routes from "../../../configuration/routes";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import messages from "../../../configuration/messages";

describe("The FormLogin Component Should Render Without Crashing", () => {
  let history;
  let utils;
  let setup = [
    {
      state: noUser,
      path: Routes.search,
    },
    {
      state: testUser,
      path: Routes.search,
    },
  ];
  let currentTest;

  beforeEach(() => {
    currentTest = setup.shift();
    history = createMemoryHistory();
    history.push(currentTest.path);
    utils = render(
      <Router history={history}>
        <UserContext.Provider value={currentTest.state}>
          <FormLogin />
        </UserContext.Provider>
      </Router>
    );
  });
  afterEach(cleanup);

  describe("When initialized with defaults", () => {
    it("when loading", () => {
      // Check the input field renders with correct initial value
      const input = utils.getByTestId("username");
      expect(input).toBeTruthy();
      expect(input.value).toBe("");
      // Check the other elements are present with correct text
      expect(utils.getByTestId("submit")).toBeTruthy();
      expect(
        utils.getByText(messages.FormLastFMUsernameLabelMessage)
      ).toBeInTheDocument();
      expect(
        utils.getByText(messages.FormLastFMButtonMessage)
      ).toBeInTheDocument();
    });
  });

  describe("When initialized with data", () => {
    it("when loading", () => {
      // Check the input field renders with correct initial value
      const input = utils.getByTestId("username");
      expect(input).toBeTruthy();
      expect(input.value).toBe("niall-byrne");
      // Check the other elements are present with correct text
      expect(utils.getByTestId("submit")).toBeTruthy();
      expect(
        utils.getByText(messages.FormLastFMUsernameLabelMessage)
      ).toBeInTheDocument();
      expect(
        utils.getByText(messages.FormLastFMButtonMessage)
      ).toBeInTheDocument();
    });
  });
});

describe("The FormLogin Component Should handle input correctly", () => {
  let history;
  let utils;
  let setup = [
    {
      state: noUser,
      path: Routes.search,
    },
    {
      state: testUser,
      path: Routes.search,
    },
    {
      state: testUser,
      path: Routes.search,
    },
    {
      state: testUser,
      path: Routes.search,
    },
    {
      state: noUser,
      path: Routes.search,
    },
    {
      state: noUser,
      path: Routes.search,
    },
  ];
  let currentTest;

  beforeEach(() => {
    currentTest = setup.shift();
    history = createMemoryHistory({ initialEntries: [currentTest.path] });
    utils = render(
      <Router history={history}>
        <UserContext.Provider value={currentTest.state}>
          <FormLogin />
        </UserContext.Provider>
      </Router>
    );
  });
  afterEach(cleanup);

  it("should handle entered data correctly (no errors)", () => {
    const input = utils.getByTestId("username");
    fireEvent.change(input, { target: { value: "username" } });
    expect(input.value).toBe("username");
  });

  it("should handle submitted data correctly (click) (no errors)", () => {
    expect(history.length).toBe(1);
    const input = utils.getByTestId("username");
    const submit = utils.getByTestId("submit");
    expect(input.value).toBe("niall-byrne");
    fireEvent.click(submit);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe("/niall-byrne");
  });

  it("should handle submitted data correctly (enter) (no errors)", () => {
    expect(history.length).toBe(1);
    const input = utils.getByTestId("username");
    const submit = utils.getByTestId("submit");
    expect(input.value).toBe("niall-byrne");
    fireEvent.keyDown(submit, { key: "enter", keyCode: 13 });
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe("/niall-byrne");
  });

  it("should not submit data if another key is pressed", () => {
    expect(history.length).toBe(1);
    const input = utils.getByTestId("username");
    const submit = utils.getByTestId("submit");
    expect(input.value).toBe("niall-byrne");
    fireEvent.keyDown(submit, { key: "a", keyCode: 65 });
    expect(history.length).toBe(1);
  });

  it("should handle submitted data correctly (with errors)", () => {
    expect(history.length).toBe(1);
    const input = utils.getByTestId("username");
    const submit = utils.getByTestId("submit");
    expect(input.value).toBe("");
    fireEvent.click(submit);
    expect(history.length).toBe(1);
    expect(utils.getByTestId("error")).toBeTruthy();
  });

  it("should clear the error message on new input", () => {
    expect(history.length).toBe(1);
    const input = utils.getByTestId("username");
    const submit = utils.getByTestId("submit");
    expect(input.value).toBe("");
    fireEvent.click(submit);
    expect(utils.getByTestId("error")).toBeTruthy();
    fireEvent.change(input, { target: { value: "username" } });
    expect(utils.queryByTestId("error")).toBeFalsy();
  });
});
