import React from "react";
import { render, cleanup } from "@testing-library/react";
import UserProvider, { UserContext } from "../user.provider";

describe("Check the Inital Provider State", () => {
  afterEach(cleanup);

  it("should have the expected default values", () => {
    let received = {};
    render(
      <UserProvider>
        <UserContext.Consumer>
          {(state) => (
            <div>
              {Object.keys(state).forEach(function (key) {
                received[key] = state[key];
              })}
            </div>
          )}
        </UserContext.Consumer>
      </UserProvider>
    );
    // Examine the Top Level State
    expect(Object.keys(received).length).toBe(2);
    expect(received.dispatch).toBeInstanceOf(Function);
    // Ensure the UserProperties Reducer is Attached
    expect(received.userProperties).toBeTruthy();
  });
});
