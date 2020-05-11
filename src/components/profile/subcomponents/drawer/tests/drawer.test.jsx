import React from "react";
import { render, cleanup } from "@testing-library/react";
import Drawer, { messages } from "../drawer.component";

import { mockApiData } from "../../../../../test.fixtures/api.fixture";

describe("Check the Drawer Component Renders Without Crashing", () => {
  afterEach(cleanup);

  let utils;
  beforeEach(() => {
    utils = render(
      <Drawer
        drawerHeight="33vh"
        navBarHeight="40px"
        data={{ data: mockApiData }}
      />
    );
  });

  it("should contain the expected test", () => {
    expect(utils.getByText(messages.DrawerTitle)).toBeTruthy();
  });
});
