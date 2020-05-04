import React from "react";
import { render, cleanup } from "@testing-library/react";
import Header from "./header.component";
import { UserContext } from "../../providers/user/user.provider";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const testUser = {
  userName: "niall-byrne",
  imageUrl:
    "https://www.gravatar.com/avatar/1fb821f534ddff07eb74482127a00ebd?d=retro&r=g&s=100",
  profileUrl: "https://www.last.fm/user/niall-byrne",
  ready: true,
};

const noUser = {
  userName: null,
  imageUrl: null,
  profileUrl: null,
  ready: false,
};

describe("The Header Should Work On Root", () => {
  let history;
  beforeEach(() => {
    history = createMemoryHistory();
  });

  afterEach(cleanup);

  describe("renders correctly on the root page", () => {
    beforeEach(() => {
      history.push("/");
    });

    test("Renders without a user", () => {
      const { getByText, getByAltText } = render(
        <Router history={history}>
          <UserContext.Provider value={noUser}>
            <Header />
          </UserContext.Provider>
        </Router>
      );
      const link = getByAltText("last.fm").parentElement.getAttribute("href");
      const src = getByAltText("last.fm").getAttribute("src");
      expect(link).toBe("https://last.fm");
      expect(src).toBe("./images/lastfm.png");
      expect(getByText("Specify your last.fm username")).toBeInTheDocument();
    });
  });

  describe("renders correctly on a user page", () => {
    beforeEach(() => {
      history.push("/niall-byrne");
    });

    test("Renders with a user", () => {
      const { getByText, getByAltText } = render(
        <Router history={history}>
          <UserContext.Provider value={testUser}>
            <Header />
          </UserContext.Provider>
        </Router>
      );
      const link = getByAltText("Avatar").parentElement.getAttribute("href");
      const src = getByAltText("Avatar").getAttribute("src");
      expect(link).toBe(testUser.profileUrl);
      expect(src).toBe(testUser.imageUrl);
      expect(getByText(testUser.userName)).toBeInTheDocument();
    });
  });
});
