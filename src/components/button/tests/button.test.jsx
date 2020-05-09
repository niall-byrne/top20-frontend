import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import CustomButton from "../button.component";

const click = jest.fn();

const TestHooks = [
  () => (
    <div>
      <CustomButton testid="test1" />
    </div>
  ),
  () => (
    <div>
      <CustomButton type="submit" testid="test2" />
    </div>
  ),
  () => {
    return (
      <div>
        <CustomButton type="submit" testid="test3" action={click} />
      </div>
    );
  },
];

describe("Check Button Rendering", () => {
  let utils;
  let Hook;
  beforeEach(() => {
    click.mockReset();
    Hook = TestHooks.shift();
    utils = render(<Hook />);
  });

  afterEach(cleanup);

  it("renders button with the expected testid", () => {
    const button = utils.getByTestId("test1");
    expect(button).toBeTruthy();
  });

  it("renders submit with the expected testid", () => {
    const button = utils.getByTestId("test2");
    expect(button).toBeTruthy();
  });

  it("renders submit with the expected testid", () => {
    const button = utils.getByTestId("test3");
    expect(button).toBeTruthy();
    expect(click.mock.calls.length).toBe(0);
    fireEvent.click(button);
    expect(click.mock.calls.length).toBe(1);
  });
});
