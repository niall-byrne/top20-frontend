import React from "react";
import { render, cleanup } from "@testing-library/react";
import Search from "../search.component";
import FormSearch from "../../form.search/form.search.component";

jest.mock("../../form.search/form.search.component");

describe("Check the Login Component Renders Without Crashing", () => {
  afterEach(cleanup);

  beforeEach(() => {
    FormSearch.mockImplementation(() => <div>MockComponent</div>);
  });

  it("should be wrapped in the billboard components", () => {
    const { getByTestId } = render(<Search />);
    expect(getByTestId("billboard1")).toBeTruthy();
    expect(getByTestId("billboard2")).toBeTruthy();
    expect(FormSearch.mock.calls.length).toBe(1);
  });
});
