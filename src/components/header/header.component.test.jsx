import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

import Header, { fallBackAvatar, messages } from "./header.component";

import { UserContext } from "../../providers/user/user.provider";
import {
  testUserWithoutImage,
  testUser,
  noUser,
  userError,
  userBeforeFetch,
} from "../../test.fixtures/user.fixture";

describe("The Header Should Render Without Crashing", () => {
  let history;
  let utils;

  const matches = {
    root: { path: "/", url: "/", isExact: true, params: {} },
    name: {
      path: "/:userName",
      url: "/niall-byrne",
      isExact: false,
      params: { userName: "niall-byrne" },
    },
  };

  let setup = [
    {
      state: noUser,
      path: "/",
      match: matches.root,
    },
    {
      state: userError,
      path: "/niall-byrne",
      match: matches.name,
    },
    {
      state: userBeforeFetch,
      path: "/niall-byrne",
      match: matches.name,
    },
    {
      state: testUser,
      path: "/niall-byrne",
      match: matches.name,
    },
    {
      state: testUserWithoutImage,
      path: "/niall-byrne",
      match: matches.name,
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
          <Header match={currentTest.match} />
        </UserContext.Provider>
      </Router>
    );
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
      expect(utils.getByText(messages.promptUser)).toBeInTheDocument();
    });
  });

  describe("When on a User Page, with an error", () => {
    it("renders the error message", () => {
      const link = utils
        .getByAltText("last.fm")
        .parentElement.getAttribute("href");
      const src = utils.getByAltText("last.fm").getAttribute("src");
      expect(link).toBe("https://last.fm");
      expect(src).toBe(fallBackAvatar);
      expect(utils.getByText(messages.noUser)).toBeInTheDocument();
    });
  });

  describe("When on a User Page, that is loading", () => {
    it("renders the error message", () => {
      const link = utils
        .getByAltText("last.fm")
        .parentElement.getAttribute("href");
      const src = utils.getByAltText("last.fm").getAttribute("src");
      expect(link).toBe("https://last.fm");
      expect(src).toBe(fallBackAvatar);
      expect(utils.getByText(messages.loadingUser)).toBeInTheDocument();
    });
  });

  describe("When on a User Page that is loaded", () => {
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
