import React from "react";
import { render, cleanup } from "@testing-library/react";
import Title from "../title.component";
import messages from "../../../../../configuration/messages";

// Translate as English
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => {
      return key;
    },
  }),
}));

describe("Check the Title Component Renders Without Crashing", () => {
  afterEach(cleanup);

  let utils;
  let initialState;
  const setup = [0, 10];
  beforeEach(() => {
    initialState = setup.shift();
    utils = render(<Title titleHeight="40px" count={initialState} />);
  });

  it("should contain the empty message", () => {
    expect(utils.getByText(messages.MainTitleEmpty)).toBeTruthy();
  });

  it("should contain the title message", () => {
    expect(utils.getByText(messages.MainTitle)).toBeTruthy();
  });
});
