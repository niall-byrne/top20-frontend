import React from "react";
import { render, cleanup } from "@testing-library/react";
import Header from "./header.component";

import { UserContext } from "../../providers/user/user.provider";
import { testUser, noUser } from "../../test.fixtures/user.fixture";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("The Header Should Render Without Crashing", () => {
  let history;
  let utils;
  let initial = [testUser, noUser];
  let paths = ["/niall-byrne", "/"];

  beforeEach(() => {
    history = createMemoryHistory();
    utils = render(
      <Router history={history}>
        <UserContext.Provider value={initial.pop()}>
          <Header />
        </UserContext.Provider>
      </Router>
    );
    history.push(paths.pop());
  });

  afterEach(cleanup);

  describe("When on The Root Page", () => {
    it("renders without a user", () => {
      const link = utils
        .getByAltText("last.fm")
        .parentElement.getAttribute("href");
      const src = utils.getByAltText("last.fm").getAttribute("src");
      expect(link).toBe("https://last.fm");
      expect(src).toBe("./images/lastfm.png");
      expect(
        utils.getByText("Specify your last.fm username")
      ).toBeInTheDocument();
    });
  });

  describe("When on a User Page", () => {
    it("renders with a user", () => {
      const link = utils
        .getByAltText("Avatar")
        .parentElement.getAttribute("href");
      const src = utils.getByAltText("Avatar").getAttribute("src");
      expect(link).toBe(testUser.userProperties.profileUrl);
      expect(src).toBe(testUser.userProperties.imageUrl);
      expect(utils.getByText(testUser.userName)).toBeInTheDocument();
    });
  });
});
