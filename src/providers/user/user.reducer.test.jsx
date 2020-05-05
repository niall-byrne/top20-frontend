import { UserReducer, InitialState } from "./user.reducer";
import UserActions from "./user.actions";

describe("Check The Reducer Functionality", () => {
  let received;
  beforeEach(() => {
    received = {};
  });

  it("should have the expected default values", () => {
    const received = UserReducer(InitialState, { type: "NoAction" });
    expect(Object.keys(received).length).toBe(3);
    expect(received.ready).toBe(false);
    expect(received.imageUrl).toBe(null);
    expect(received.profileUrl).toBe(null);
  });

  it("handles ToggleReady correctly", () => {
    // toggle on
    received = UserReducer(InitialState, {
      type: UserActions.ToggleReady,
    });
    expect(received.ready).toBe(true);
    // toggle off
    received = UserReducer(received, {
      type: UserActions.ToggleReady,
    });
    expect(received.ready).toBe(false);
  });
});
