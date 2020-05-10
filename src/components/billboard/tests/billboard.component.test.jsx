import React from "react";
import { render, cleanup } from "@testing-library/react";
import Billboard, { withBillboard } from "../billboard.component";

const TestHook = () => <div>TestComponent</div>;

describe("Check Billboard Encapsulation Rendering", () => {
  let utils;
  beforeEach(() => {
    const TestHookWithBillboard = withBillboard(TestHook);
    utils = render(<TestHookWithBillboard />);
  });

  afterEach(cleanup);

  it("renders encapsulated in the billboard", () => {
    expect(utils.getByTestId("billboard1")).toBeTruthy();
    expect(utils.getByTestId("billboard2")).toBeTruthy();
    expect(utils.queryByText("TestComponent")).toBeTruthy();
  });
});

describe("Check Base Billboard Rendering", () => {
  let utils;
  beforeEach(() => {
    utils = render(
      <Billboard>
        <TestHook />
      </Billboard>
    );
  });

  afterEach(cleanup);

  it("renders encapsulated in the billboard", () => {
    expect(utils.getByTestId("billboard1")).toBeTruthy();
    expect(utils.getByTestId("billboard2")).toBeTruthy();
    expect(utils.queryByText("TestComponent")).toBeTruthy();
  });
});
