import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import App from "../App.js";
import * as serviceWorker from "../serviceWorker";

jest.mock("../serviceWorker", () => ({
  __esModule: true,
  register: jest.fn(),
}));
jest.mock("react-dom", () => ({ render: jest.fn() }));
jest.mock("react-i18next");
jest.mock("../App.js");

App.mockImplementation(() => <div>MockApp</div>);
I18nextProvider.mockImplementation(({ children }) => children);
serviceWorker.register.mockImplementation(() => {
  register: jest.fn();
});

describe("Check Main Rendering", () => {
  beforeEach(() => {
    App.mockClear();
    I18nextProvider.mockClear();
    serviceWorker.register.mockClear();
  });

  it("should call render on the index object, and register the service worker as expected", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    const { Index } = require("../index.js");
    expect(ReactDOM.render).toHaveBeenCalledTimes(1);
    expect(ReactDOM.render).toHaveBeenCalledWith(<Index />, div);
    expect(serviceWorker.register).toHaveBeenCalledTimes(1);
  });

  it("should render the main application components without crashing", () => {
    jest.unmock("react-dom");
    const { render, cleanup, waitFor } = require("@testing-library/react");
    const { Index } = require("../index.js");
    const utils = render(<Index />);
    expect(I18nextProvider).toHaveBeenCalledTimes(1);
    expect(utils.getByText("MockApp")).toBeTruthy();
  });
});
