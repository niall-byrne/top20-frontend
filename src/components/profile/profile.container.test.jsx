import React from "react";
import { render, cleanup } from "@testing-library/react";
import ProfileContainer from "./profile.container";
import UserProvider from "../../providers/user/user.provider";

describe("Check the Profile Container Component Renders Without Crashing", () => {
  afterEach(cleanup);

  it("should be wrapped in the billboard components", () => {
    const { getByTestId } = render(
      <UserProvider>
        <ProfileContainer />
      </UserProvider>
    );
    expect(getByTestId("billboard1")).toBeTruthy();
    expect(getByTestId("billboard2")).toBeTruthy();
  });
});

describe("Check Profile Data Fetching", () => {
  afterEach(cleanup);

  it("placeholder", () => {
    expect(true).toBe(false);
  });
});
