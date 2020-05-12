import React from "react";
import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Assets from "../../../configuration/assets";
import { HomePage } from "../../../configuration/lastfm";
import Routes from "../../../configuration/routes";

import Header, { messages } from "../header.component";

import { UserContext } from "../../../providers/user/user.provider";
import {
  testUserWithoutImage,
  testUser,
  noUser,
  userError,
  userBeforeFetch,
} from "../../../test.fixtures/lastfm.user.fixture";

describe("The Header Should Render Without Crashing", () => {
  let history;
  let utils;

  const matches = {
    root: { path: Routes.root, url: Routes.root, isExact: true, params: {} },
    name: {
      path: Routes.profile,
      url: "/niall-byrne",
      isExact: false,
      params: { userName: "niall-byrne" },
    },
    contact: {
      path: Routes.contact,
      url: "/home/contact",
      isExact: true,
      params: {},
    },
  };

  let setup = [
    {
      state: noUser,
      path: Routes.root,
      match: matches.root,
    },
    {
      state: noUser,
      path: Routes.root,
      match: matches.root,
    },
    {
      state: noUser,
      path: Routes.contact,
      match: matches.contact,
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
    history = createMemoryHistory({ initialEntries: [currentTest.path] });
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
        .getByAltText(messages.HeaderAltLastFM)
        .parentElement.getAttribute("href");
      const src = utils
        .getByAltText(messages.HeaderAltLastFM)
        .getAttribute("src");
      expect(link).toBe(HomePage);
      expect(src).toBe(Assets.LastFMLogo);
      expect(utils.getByText(messages.HeaderPromptUser)).toBeInTheDocument();
      // Contact is present
      expect(utils.getByText(messages.HeaderContact)).toBeTruthy();
    });
  });

  describe("When on The Root Page", () => {
    it("when the contact link is clicked it modifies the history", () => {
      expect(history.length).toBe(1);
      const contactLink = utils.getByText(messages.HeaderContact);
      fireEvent.click(contactLink);
      expect(history.length).toBe(2);
      expect(utils.getByText(messages.HeaderTop20)).toBeInTheDocument();
    });
  });

  describe("When on the Contact Page", () => {
    it("renders the header as expectd", () => {
      const link = utils
        .getByAltText(messages.HeaderAltLastFM)
        .parentElement.getAttribute("href");
      const src = utils
        .getByAltText(messages.HeaderAltLastFM)
        .getAttribute("src");
      expect(link).toBe(HomePage);
      expect(src).toBe(Assets.LastFMLogo);
      expect(utils.getByText(messages.HeaderTop20)).toBeInTheDocument();
      // Contact is present
      expect(utils.getByText(messages.HeaderContact)).toBeTruthy();
    });
  });

  describe("When on a User Page, with an error", () => {
    it("renders the error message", () => {
      const link = utils
        .getByAltText(messages.HeaderAltLastFM)
        .parentElement.getAttribute("href");
      const src = utils
        .getByAltText(messages.HeaderAltLastFM)
        .getAttribute("src");
      expect(link).toBe(HomePage);
      expect(src).toBe(Assets.LastFMLogo);
      expect(utils.getByText(messages.HeaderNoUser)).toBeTruthy();
      // Contact is present
      expect(utils.getByText(messages.HeaderContact)).toBeTruthy();
    });
  });

  describe("When on a User Page, that is loading", () => {
    it("renders the error message", () => {
      const link = utils
        .getByAltText(messages.HeaderAltLastFM)
        .parentElement.getAttribute("href");
      const src = utils.getByAltText("last.fm").getAttribute("src");
      expect(link).toBe(HomePage);
      expect(src).toBe(Assets.LastFMLogo);
      waitFor(() =>
        expect(utils.getByText(messages.HeaderLoadingUser)).toBeTruthy()
      );
      // Contact is present
      expect(utils.getByText(messages.HeaderContact)).toBeTruthy();
    });
  });

  describe("When on a User Page that is loaded", () => {
    it("renders with a user", () => {
      const link = utils
        .getByAltText(messages.HeaderAltAvatar)
        .parentElement.getAttribute("href");
      const src = utils
        .getByAltText(messages.HeaderAltAvatar)
        .getAttribute("src");
      expect(link).toBe(testUser.userProperties.profileUrl);
      expect(src).toBe(testUser.userProperties.imageUrl);
      expect(
        utils.getByText(testUser.userProperties.userName)
      ).toBeInTheDocument();
      // Contact is present
      expect(utils.getByText(messages.HeaderContact)).toBeTruthy();
    });
  });

  describe("When on a User Page, who has no image", () => {
    it("renders with a user", () => {
      const link = utils
        .getByAltText(messages.HeaderAltAvatar)
        .parentElement.getAttribute("href");
      const src = utils
        .getByAltText(messages.HeaderAltAvatar)
        .getAttribute("src");
      expect(link).toBe(testUser.userProperties.profileUrl);
      expect(src).toBe(Assets.LastFMLogo);
      expect(
        utils.getByText(testUser.userProperties.userName)
      ).toBeInTheDocument();
      // Contact is present
      expect(utils.getByText(messages.HeaderContact)).toBeTruthy();
    });
  });
});
