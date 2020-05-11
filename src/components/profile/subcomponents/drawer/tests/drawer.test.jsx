import React from "react";
import { render, cleanup } from "@testing-library/react";
import Drawer, { messages } from "../drawer.component";

describe("Check the Drawer Component Renders Without Crashing", () => {
  afterEach(cleanup);

  let utils;
  beforeEach(() => {
    utils = render(<Drawer drawerHeight="33vh" navBarHeight="40px" />);
  });

  it("should contain the expected test", () => {
    expect(utils.getByText(messages.DrawerTitle)).toBeTruthy();
  });
});
