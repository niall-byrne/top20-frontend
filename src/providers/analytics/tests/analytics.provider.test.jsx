import ReactGA from "react-ga";
import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import AnalyticsProvider, { AnalyticsContext } from "../analytics.provider";

jest.mock("react-ga");
const originalEnvironment = process.env;

describe("Manage Environment", () => {
  let received = {};
  let history;
  let setup = [
    { code: "", NODE_ENV: "test", changePage: false },
    { code: "", NODE_ENV: "test", changePage: false },
    { code: "SOMEVALUE", NODE_ENV: "test", changePage: false },
    { code: "SOMEVALUE", NODE_ENV: "production", changePage: false },
    { code: "SOMEVALUE", NODE_ENV: "production", changePage: false },
    { code: "SOMEVALUE", NODE_ENV: "production", changePage: true },
    { code: "SOMEVALUE", NODE_ENV: "production", changePage: false },
  ];
  let currentTest;
  beforeEach(() => {
    currentTest = setup.shift();
    process.env.REACT_APP_UA_CODE = currentTest.code;
    process.env.NODE_ENV = currentTest.NODE_ENV;
    ReactGA.initialize.mockClear();
    ReactGA.event.mockClear();
    ReactGA.set.mockClear();
    ReactGA.pageview.mockClear();
    history = createMemoryHistory();
    render(
      <Router history={history}>
        <AnalyticsProvider>
          <AnalyticsContext.Consumer>
            {(state) => (
              <div>
                {Object.keys(state).forEach(function (key) {
                  received[key] = state[key];
                })}
              </div>
            )}
          </AnalyticsContext.Consumer>
        </AnalyticsProvider>
      </Router>
    );
    if (currentTest.changePage) {
      history.push("/");
    }
  });
  afterEach(cleanup);
  afterAll(() => {
    process.env = originalEnvironment;
  });

  it("when no analytics value is present it should not initialize ReactGA", () => {
    expect(Object.keys(received).length).toBe(2);
    expect(received.event).toBeInstanceOf(Function);
    expect(received.initialized).toBeFalsy();
    expect(ReactGA.initialize).toHaveBeenCalledTimes(0);
    received.event("FAKE_EVENT");
    expect(ReactGA.event).toHaveBeenCalledTimes(0);
  });

  it("when no analytics value is present it should not post events", () => {
    received.event("FAKE_EVENT");
    expect(ReactGA.event).toHaveBeenCalledTimes(0);
  });

  it("when an analytics value is present it should initialize ReactGA", () => {
    expect(Object.keys(received).length).toBe(2);
    expect(received.event).toBeInstanceOf(Function);
    expect(received.initialized).toBeTruthy();
    expect(ReactGA.initialize).toHaveBeenCalledTimes(1);
    expect(ReactGA.initialize).toHaveBeenCalledWith(
      process.env.REACT_APP_UA_CODE,
      { debug: true }
    );
  });

  it("when an analytics value is present, and it's production, it should initialize ReactGA without logging", () => {
    expect(Object.keys(received).length).toBe(2);
    expect(received.event).toBeInstanceOf(Function);
    expect(received.initialized).toBeTruthy();
    expect(ReactGA.initialize).toHaveBeenCalledTimes(1);
    expect(ReactGA.initialize).toHaveBeenCalledWith(
      process.env.REACT_APP_UA_CODE,
      { debug: false }
    );
  });

  it("when an analytics value is present it should post events", () => {
    received.event("FAKE_EVENT");
    expect(ReactGA.event).toHaveBeenCalledTimes(1);
    expect(ReactGA.event).toHaveBeenCalledWith("FAKE_EVENT");
  });

  it("when an analytics value is present it should post routes on route changes", () => {
    expect(ReactGA.set).toHaveBeenCalledTimes(1);
    expect(ReactGA.set).toHaveBeenCalledWith({ page: "/" });
    expect(ReactGA.pageview).toHaveBeenCalledTimes(1);
    expect(ReactGA.pageview).toHaveBeenCalledWith("/");
  });

  it("when an analytics value is present it should only post routes on an actual change", () => {
    expect(ReactGA.set).toHaveBeenCalledTimes(0);
    expect(ReactGA.pageview).toHaveBeenCalledTimes(0);
  });
});
