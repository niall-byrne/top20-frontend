import React from "react";
import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import Assets from "../../../configuration/assets";
import messages from "../../../configuration/messages";
import { HomePage } from "../../../configuration/lastfm";
import Routes from "../../../configuration/routes";

import Header from "../header.component";
import { UserContext } from "../../../providers/user/user.provider";
import {
  testUserWithoutImage,
  testUser,
  noUser,
  userError,
  userBeforeFetch,
} from "../../../test.fixtures/lastfm.user.fixture";

// Translate as English
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => {
      return key;
    },
  }),
}));

describe("The Header Should Render Without Crashing", () => {
  let history;
  let utils;

  const matches = {
    root: {
      path: Routes.search,
      url: Routes.search,
      isExact: true,
      params: {},
    },
    name: {
      path: Routes.profile,
      url: "/niall-byrne",
      isExact: false,
      params: { userName: "niall-byrne" },
    },
    contact: {
      path: Routes.contact,
      url: Routes.contact,
      isExact: true,
      params: {},
    },
  };

  let setup = [
    {
      state: noUser,
      path: Routes.search,
      match: matches.search,
    },
    {
      state: noUser,
      path: Routes.search,
      match: matches.search,
    },
    {
      state: noUser,
      path: Routes.search,
      match: matches.search,
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

  const checkImage = (alt, link, src) => {
    if (link) {
      const renderedLink = utils
        .getByAltText(alt)
        .parentElement.getAttribute("href");
      expect(link).toBe(renderedLink);
    }
    const renderedSrc = utils.getByAltText(alt).getAttribute("src");
    expect(src).toBe(renderedSrc);
  };

  describe("When on The Root Page", () => {
    it("renders without a user", () => {
      checkImage(messages.HeaderAltLastFM, HomePage, Assets.LastFMLogo);
      expect(utils.getByText(messages.HeaderPromptUser)).toBeTruthy();
      checkImage(messages.HeaderAltContact, null, Assets.ContactLogo);
      checkImage(messages.HeaderAltSearch, null, Assets.SearchLogo);
    });
  });

  describe("When on The Root Page", () => {
    it("when the contact link is clicked it modifies the history", () => {
      expect(history.length).toBe(1);
      const contactDiv = utils.getByAltText(messages.HeaderAltContact)
        .parentElement;
      fireEvent.click(contactDiv);
      expect(history.length).toBe(2);
      expect(utils.getByText(messages.HeaderTop20)).toBeTruthy();
      expect(history.location.pathname).toBe(Routes.contact);
    });
  });

  describe("When on The Root Page", () => {
    it("when the search link is clicked it modifies the history", () => {
      expect(history.length).toBe(1);
      const searchDiv = utils.getByAltText(messages.HeaderAltSearch)
        .parentElement;
      fireEvent.click(searchDiv);
      expect(history.length).toBe(2);
      expect(utils.getByText(messages.HeaderPromptUser)).toBeTruthy();
      expect(history.location.pathname).toBe(Routes.search);
    });
  });

  describe("When on the Contact Page", () => {
    it("renders the header as expectd", () => {
      checkImage(messages.HeaderAltLastFM, HomePage, Assets.LastFMLogo);
      checkImage(messages.HeaderAltContact, null, Assets.ContactLogo);
      checkImage(messages.HeaderAltSearch, null, Assets.SearchLogo);
      expect(utils.getByText(messages.HeaderTop20)).toBeTruthy();
    });
  });

  describe("When on a User Page, with an error", () => {
    it("renders the error message", () => {
      checkImage(messages.HeaderAltLastFM, HomePage, Assets.LastFMLogo);
      checkImage(messages.HeaderAltContact, null, Assets.ContactLogo);
      checkImage(messages.HeaderAltSearch, null, Assets.SearchLogo);
      expect(utils.getByText(messages.HeaderNoUser)).toBeTruthy();
    });
  });

  describe("When on a User Page, that is loading", () => {
    it("renders the error message", () => {
      checkImage(messages.HeaderAltLastFM, HomePage, Assets.LastFMLogo);
      checkImage(messages.HeaderAltContact, null, Assets.ContactLogo);
      checkImage(messages.HeaderAltSearch, null, Assets.SearchLogo);
      waitFor(() =>
        expect(utils.getByText(messages.HeaderLoadingUser)).toBeTruthy()
      );
    });
  });

  describe("When on a User Page that is loaded", () => {
    it("renders with a user", () => {
      checkImage(
        messages.HeaderAltAvatar,
        testUser.userProperties.profileUrl,
        testUser.userProperties.imageUrl
      );
      checkImage(messages.HeaderAltContact, null, Assets.ContactLogo);
      checkImage(messages.HeaderAltSearch, null, Assets.SearchLogo);
      expect(utils.getByText(testUser.userProperties.userName)).toBeTruthy();
    });
  });

  describe("When on a User Page, who has no image", () => {
    it("renders with a user", () => {
      checkImage(
        messages.HeaderAltAvatar,
        testUser.userProperties.profileUrl,
        Assets.LastFMLogo
      );
      checkImage(messages.HeaderAltContact, null, Assets.ContactLogo);
      checkImage(messages.HeaderAltSearch, null, Assets.SearchLogo);
      expect(utils.getByText(testUser.userProperties.userName)).toBeTruthy();
    });
  });
});
