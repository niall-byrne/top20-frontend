import React from "react";
import { render, cleanup } from "@testing-library/react";
import Login from "./login.component";
import FormLogin from "../form.login/form.login.component";

jest.mock("../form.login/form.login.component");
const mockFormLogin = FormLogin.mockImplementation(() => (
  <div>MockComponent</div>
));

describe("Check Login", () => {
  afterEach(cleanup);

  it("should be wrapped in the billboard components", () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId("billboard1")).toBeTruthy();
    expect(getByTestId("billboard2")).toBeTruthy();
    expect(mockFormLogin.mock.calls.length).toBe(1);
  });
});
