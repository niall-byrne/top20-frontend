import React from "react";
import { render, cleanup } from "@testing-library/react";
import FormLogin from "./form.login.component";

import { UserContext } from "../../providers/user/user.provider";
import { testUser, noUser } from "../../test.fixtures/user.fixture";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("The FormLogin Component Should Render Without Crashing", () => {
  let history;
  let util;
  let initial = [testUser, noUser];

  beforeEach(() => {
    history = createMemoryHistory();
    history.push("/");
    util = render(
      <Router history={history}>
        <UserContext.Provider value={initial.pop()}>
          <FormLogin />
        </UserContext.Provider>
      </Router>
    );
  });
  afterEach(cleanup);

  describe("When initialized with defaults", () => {
    it("when loading", () => {
      // Check the input field renders with correct initial value
      const input = util.getByTestId("username");
      expect(input).toBeTruthy();
      expect(input.value).toBe("");
      // Check the other elements are present with correct text
      expect(util.getByTestId("submit")).toBeTruthy();
      expect(util.getByText("last.fm username:")).toBeInTheDocument();
      expect(util.getByText("Show my Top20")).toBeInTheDocument();
    });
  });

  describe("When initialized with data", () => {
    it("when loading", () => {
      // Check the input field renders with correct initial value
      const input = util.getByTestId("username");
      expect(input).toBeTruthy();
      expect(input.value).toBe("niall-byrne");
      // Check the other elements are present with correct text
      expect(util.getByTestId("submit")).toBeTruthy();
      expect(util.getByText("last.fm username:")).toBeInTheDocument();
      expect(util.getByText("Show my Top20")).toBeInTheDocument();
    });
  });
});
