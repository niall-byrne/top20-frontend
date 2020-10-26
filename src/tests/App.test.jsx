import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Spinner } from "../components/spinner/spinner.component";
import Header from "../components/header/header.component";
import Search from "../components/search/search.component";
import Contact from "../components/contact/contact.component";
import ProfileContainer from "../components/profile/profile.container";
import AnalyticsProvider from "../providers/analytics/analytics.provider";

import Routes from "../configuration/routes";
import App from "../App.js";

jest.mock("../components/spinner/spinner.component");
jest.mock("../components/header/header.component");
jest.mock("../components/search/search.component");
jest.mock("../components/contact/contact.component");
jest.mock("../components/profile/profile.container");
jest.mock("../providers/analytics/analytics.provider");

Spinner.mockImplementation(() => <div>MockSpinner</div>);
Header.mockImplementation(() => <div>MockHeader</div>);
Search.mockImplementation(() => <div>MockSearch</div>);
Contact.mockImplementation(() => <div>MockContact</div>);
AnalyticsProvider.mockImplementation(({ children }) => <div>{children}</div>);
ProfileContainer.mockImplementation(() => <div>MockProfileContainer</div>);

describe("Check Routing", () => {
  let tests = [
    { path: Routes.search },
    { path: Routes.contact },
    { path: "/niall-byrne" },
  ];
  let currentTest;

  beforeEach(() => {
    Spinner.mockClear();
    Header.mockClear();
    Search.mockClear();
    Contact.mockClear();
    AnalyticsProvider.mockClear();
    ProfileContainer.mockClear();
    currentTest = tests.shift();
    render(
      <MemoryRouter initialEntries={[currentTest.path]}>
        <App />
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  it("should render the header and search components on the search page", async () => {
    expect(AnalyticsProvider).toHaveBeenCalledTimes(1);
    expect(Spinner.mock.calls.length).toBe(1);

    expect(currentTest.path).toBe(Routes.search);
    await waitFor(() => expect(Header.mock.calls.length).toBe(1));
    expect(Search.mock.calls.length).toBe(1);
    expect(Contact.mock.calls.length).toBe(0);
    expect(ProfileContainer.mock.calls.length).toBe(0);
  });

  it("should render the header and contact components on the contact page", async () => {
    expect(AnalyticsProvider).toHaveBeenCalledTimes(1);
    expect(Spinner.mock.calls.length).toBe(1);

    expect(currentTest.path).toBe(Routes.contact);
    await waitFor(() => expect(Header.mock.calls.length).toBe(1));
    expect(Search.mock.calls.length).toBe(0);
    expect(Contact.mock.calls.length).toBe(1);
    expect(ProfileContainer.mock.calls.length).toBe(0);
  });

  it("should render the header and profile components on the profile page", async () => {
    expect(AnalyticsProvider).toHaveBeenCalledTimes(1);
    expect(Spinner.mock.calls.length).toBe(1);

    expect(currentTest.path).toBe("/niall-byrne");
    await waitFor(() => expect(Header.mock.calls.length).toBe(1));
    expect(Search.mock.calls.length).toBe(0);
    expect(Contact.mock.calls.length).toBe(0);
    expect(ProfileContainer.mock.calls.length).toBe(1);
  });
});
