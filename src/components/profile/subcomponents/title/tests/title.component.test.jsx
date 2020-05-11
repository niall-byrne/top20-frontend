import React from "react";
import { render, cleanup } from "@testing-library/react";
import Title, { messages } from "../title.component";

describe("Check the Title Component Renders Without Crashing", () => {
  afterEach(cleanup);

  let utils;
  beforeEach(() => {
    utils = render(<Title titleHeight="40px" />);
  });

  it("should contain the expected test", () => {
    expect(utils.getByText(messages.Title)).toBeTruthy();
  });
});
