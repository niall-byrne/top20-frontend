import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import Routes from "../../../configuration/routes";
import Contact from "../contact.component";
import { UserContext } from "../../../providers/user/user.provider";
import UserTypes from "../../../providers/user/user.actions";
import {
  dispatchMock,
  userError,
} from "../../../test.fixtures/lastfm.user.fixture";
import Assets from "../../../configuration/assets";
import messages from "../../../configuration/messages";

describe("Check Error Rendering", () => {
  let utils;
  let history;
  let state;
  const originalGlobalOpen = global.open;
  let mockOpen;
  let setup = [userError, userError, userError, userError];

  beforeEach(() => {
    dispatchMock.mockReset();
    state = setup.shift();
    history = createMemoryHistory({ initialEntries: [Routes.contact] });
    mockOpen = jest.fn();
    global.open = mockOpen;
    utils = render(
      <Router history={history}>
        <UserContext.Provider value={state}>
          <Contact />
        </UserContext.Provider>
      </Router>
    );
  });

  afterEach(cleanup);
  afterAll(() => {
    global.open = originalGlobalOpen;
  });

  it("renders with expected elements", () => {
    expect(utils.getByText(messages.ContactTitle)).toBeTruthy();
    expect(utils.getByText(messages.ContactMessage1)).toBeTruthy();
    expect(utils.getByText(messages.ContactMessage2)).toBeTruthy();
    expect(utils.getByText(messages.ContactCredit2)).toBeTruthy();
    const creditText = utils.getByText(messages.ContactCredit2).parentElement;
    expect(creditText.childNodes[0].textContent).toBe(messages.ContactCredit1);
    expect(creditText.childNodes[1].textContent).toBe(messages.ContactCredit2);
    expect(creditText.childNodes[2].textContent).toBe(messages.ContactCredit3);
    expect(utils.getByTestId("Contact1")).toBeTruthy();
    const link = utils.getByText(messages.ContactCredit2);
    expect(link.getAttribute("href")).toBe(Assets.IconCredLink);
  });

  it("responds to the home button press by changing the page", () => {
    expect(history.length).toBe(1);
    fireEvent.click(utils.getByTestId("Contact2"));
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe(Routes.search);
  });

  it("responds to the contact button by calling window.open", () => {
    fireEvent.click(utils.getByTestId("Contact3"));
    expect(mockOpen.mock.calls.length).toBe(1);
    expect(mockOpen.mock.calls[0]).toEqual([Assets.ContactPage, "_blank"]);
  });

  it("calls the toggle error dispatch on cleanup", () => {
    utils.unmount();
    expect(dispatchMock.mock.calls.length).toBe(1);
    expect(dispatchMock.mock.calls[0][0]).toStrictEqual({
      type: UserTypes.ResetState,
    });
  });
});
