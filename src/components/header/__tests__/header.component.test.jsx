import React from "react";
import { render, cleanup } from "@testing-library/react";
import Header from "../header.component";
import CurrentUserContext from "../../../contexts/user/user.context";

afterEach(cleanup);

const testUser = {
  userName: "niall-byrne",
  imgUrl:
    "https://www.gravatar.com/avatar/1fb821f534ddff07eb74482127a00ebd?d=retro&r=g&s=100",
  profileUrl: "https://www.last.fm/user/niall-byrne",
};

const noUser = {
  userName: null,
  imgUrl: null,
  profileUrl: null,
};

test("Renders without a user", () => {
  const { container, getByText } = render(
    <CurrentUserContext.Provider value={noUser}>
      <Header />
    </CurrentUserContext.Provider>
  );
  expect(getByText("Not A Valid Search Term")).toBeInTheDocument();
});

test("Renders with a user", () => {
  const { container, getByText } = render(
    <CurrentUserContext.Provider value={testUser}>
      <Header />
    </CurrentUserContext.Provider>
  );
  expect(getByText("Not A Valid Search Term")).toBeInTheDocument();
});
