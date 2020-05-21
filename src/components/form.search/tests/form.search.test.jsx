import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import FormSearch from "../form.search.component";
import { UserContext } from "../../../providers/user/user.provider";
import { AnalyticsContext } from "../../../providers/analytics/analytics.provider";
import { AnalyticsActions } from "../../../providers/analytics/analytics.actions";

import { testUser, noUser } from "../../../test.fixtures/lastfm.user.fixture";
import Routes from "../../../configuration/routes";
import messages from "../../../configuration/messages";

// Translate as English
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => {
      return key;
    },
  }),
}));

const mockEvent = jest.fn();
const mockAnalyticsSettings = { event: mockEvent, initialized: true };

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
    history = createMemoryHistory({ initialEntries: [currentTest.path] });
    mockEvent.mockClear();
    utils = render(
      <Router history={history}>
        <UserContext.Provider value={currentTest.state}>
          <AnalyticsContext.Provider value={mockAnalyticsSettings}>
            <FormSearch />
          </AnalyticsContext.Provider>
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
        utils.getByText(messages.FormLastFMUsernameLabelMessage + ":")
      ).toBeInTheDocument();
      expect(
        utils.getByText(messages.FormLastFMButtonMessage)
      ).toBeInTheDocument();
      expect(mockEvent).toHaveBeenCalledTimes(0);
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
        utils.getByText(messages.FormLastFMUsernameLabelMessage + ":")
      ).toBeInTheDocument();
      expect(
        utils.getByText(messages.FormLastFMButtonMessage)
      ).toBeInTheDocument();
      expect(mockEvent).toHaveBeenCalledTimes(0);
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
    mockEvent.mockClear();
    utils = render(
      <Router history={history}>
        <UserContext.Provider value={currentTest.state}>
          <AnalyticsContext.Provider value={mockAnalyticsSettings}>
            <FormSearch />
          </AnalyticsContext.Provider>
        </UserContext.Provider>
      </Router>
    );
  });
  afterEach(cleanup);

  it("should handle entered data correctly (no errors)", () => {
    const input = utils.getByTestId("username");
    fireEvent.change(input, { target: { value: "username" } });
    expect(input.value).toBe("username");
    expect(mockEvent).toHaveBeenCalledTimes(0);
  });

  it("should handle submitted data correctly (click) (no errors)", () => {
    expect(history.length).toBe(1);
    const input = utils.getByTestId("username");
    const submit = utils.getByTestId("submit");
    expect(input.value).toBe("niall-byrne");
    fireEvent.click(submit);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe("/niall-byrne");
    expect(mockEvent).toHaveBeenCalledTimes(1);
    expect(mockEvent).toHaveBeenCalledWith(AnalyticsActions.Search);
  });

  it("should handle submitted data correctly (enter) (no errors)", () => {
    expect(history.length).toBe(1);
    const input = utils.getByTestId("username");
    const submit = utils.getByTestId("submit");
    expect(input.value).toBe("niall-byrne");
    fireEvent.keyDown(submit, { key: "enter", keyCode: 13 });
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe("/niall-byrne");
    expect(mockEvent).toHaveBeenCalledTimes(1);
    expect(mockEvent).toHaveBeenCalledWith(AnalyticsActions.Search);
  });

  it("should not submit data if another key is pressed", () => {
    expect(history.length).toBe(1);
    const input = utils.getByTestId("username");
    const submit = utils.getByTestId("submit");
    expect(input.value).toBe("niall-byrne");
    fireEvent.keyDown(submit, { key: "a", keyCode: 65 });
    expect(history.length).toBe(1);
    expect(mockEvent).toHaveBeenCalledTimes(0);
  });

  it("should handle submitted data correctly (with errors)", () => {
    expect(history.length).toBe(1);
    const input = utils.getByTestId("username");
    const submit = utils.getByTestId("submit");
    expect(input.value).toBe("");
    fireEvent.click(submit);
    expect(history.length).toBe(1);
    expect(utils.getByTestId("error")).toBeTruthy();
    expect(mockEvent).toHaveBeenCalledTimes(0);
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
    expect(mockEvent).toHaveBeenCalledTimes(0);
  });
});
