import React from "react";
import { render, cleanup } from "@testing-library/react";
import Login from "../login.component";
import FormLogin from "../../form.login/form.login.component";

jest.mock("../../form.login/form.login.component");

describe("Check the Login Component Renders Without Crashing", () => {
  afterEach(cleanup);

  beforeEach(() => {
    FormLogin.mockImplementation(() => <div>MockComponent</div>);
  });

  it("should be wrapped in the billboard components", () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId("billboard1")).toBeTruthy();
    expect(getByTestId("billboard2")).toBeTruthy();
    expect(FormLogin.mock.calls.length).toBe(1);
  });
});
