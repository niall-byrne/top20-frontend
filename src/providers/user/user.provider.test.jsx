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
    expect(received.userName).toBe("");
    expect(received.setUserName).toBeInstanceOf(Function);
    expect(received.imageUrl).toBe(null);
    expect(received.setImageUrl).toBeInstanceOf(Function);
    expect(received.profileUrl).toBe(null);
    expect(received.setProfileUrl).toBeInstanceOf(Function);
    expect(received.ready).toBe(false);
    expect(received.toggleReady).toBeInstanceOf(Function);
    expect(Object.keys(received).length).toBe(8);
  });
});

describe("Mutate the Inital Provider State", () => {
  let received;
  beforeEach(() => {
    received = [];
  });

  const TestHook = () => {
    const { toggleReady, ready } = useContext(UserContext);
    useEffect(() => {
      if (!ready) toggleReady();
      received.push(ready);
    }, [toggleReady]);
    return <div></div>;
  };

  it("should toggle the ready state appropriately", () => {
    render(
      <UserProvider>
        <TestHook />
      </UserProvider>
    );
    expect(received[0]).toBe(false);
    expect(received[1]).toBe(true);
    expect(received.length).toBe(2);
  });
});
