import React, { useContext, useEffect } from "react";
import { render, cleanup } from "@testing-library/react";
import UserProvider, { UserContext } from "../../providers/user/user.provider";

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
    expect(Object.keys(received).length).toBe(4);
    // Examine the user state object
    expect(received.userName).toBe("");
    expect(received.setUserName).toBeInstanceOf(Function);
    // Examine the dispatch object
    expect(received.dispatch).toBeInstanceOf(Function);
    // Ensure the UserProperties Reducer is Attached
    expect(received.userProperties).toBeTruthy();
  });
});

describe("Mutate the Inital Provider State", () => {
  let received;
  beforeEach(() => {
    received = [];
  });

  it("should mutate userName as expected", () => {
    const TestHook = () => {
      const { setUserName, userName } = useContext(UserContext);
      useEffect(() => {
        setUserName("hello");
        received.push(userName);
      }, [setUserName, userName]);
      return <div></div>;
    };

    render(
      <UserProvider>
        <TestHook />
      </UserProvider>
    );

    expect(received[0]).toBe("");
    expect(received[1]).toBe("hello");
    expect(received.length).toBe(2);
  });
});
