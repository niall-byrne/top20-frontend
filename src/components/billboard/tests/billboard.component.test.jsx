import React from "react";
import { render, cleanup } from "@testing-library/react";
import WithBillboard from "../billboard.component";

const TestHook = () => <div>TestComponent</div>;

describe("Check Spinner Rendering", () => {
  let utils;
  beforeEach(() => {
    const TestHookWithBillboard = WithBillboard(TestHook);
    utils = render(<TestHookWithBillboard />);
  });

  afterEach(cleanup);

  it("renders encapsulated in the billboard", () => {
    expect(utils.getByTestId("billboard1")).toBeTruthy();
    expect(utils.getByTestId("billboard2")).toBeTruthy();
    expect(utils.queryByText("TestComponent")).toBeTruthy();
  });
});
