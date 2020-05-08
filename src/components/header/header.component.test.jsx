import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import Header, { fallBackAvatar } from "./header.component";

import { UserContext } from "../../providers/user/user.provider";
import {
  testUserWithoutImage,
  testUser,
  noUser,
} from "../../test.fixtures/user.fixture";

describe("The Header Should Render Without Crashing", () => {
  let history;
  let utils;
  let initial = [testUserWithoutImage, testUser, noUser];
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
      expect(src).toBe(fallBackAvatar);
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
      expect(
        utils.getByText(testUser.userProperties.userName)
      ).toBeInTheDocument();
    });
  });

  describe("When on a User Page, who has no image", () => {
    it("renders with a user", () => {
      const link = utils
        .getByAltText("Avatar")
        .parentElement.getAttribute("href");
      const src = utils.getByAltText("Avatar").getAttribute("src");
      expect(link).toBe(testUser.userProperties.profileUrl);
      expect(src).toBe(fallBackAvatar);
      expect(
        utils.getByText(testUser.userProperties.userName)
      ).toBeInTheDocument();
    });
  });
});
