import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import App from "../App.js";
import * as serviceWorker from "../serviceWorker";
import { IndexComponent } from "../index.component";

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
  return {
    register: jest.fn(),
  };
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
    require("../index");
    expect(ReactDOM.render).toHaveBeenCalledTimes(1);
    expect(ReactDOM.render).toHaveBeenCalledWith(<IndexComponent />, div);
    expect(serviceWorker.register).toHaveBeenCalledTimes(1);
  });

  it("should render the main application components without crashing", () => {
    const actualDom = jest.requireActual("react-dom");
    actualDom.render(<IndexComponent />, document.getElementById("root"));
    expect(I18nextProvider).toHaveBeenCalledTimes(1);
    expect(App).toHaveBeenCalledTimes(1);
  });
});
