import { UserReducer, InitialState } from "../user.reducer";
import UserActions from "../user.actions";
import { GenerateUserLink } from "../../../configuration/lastfm";

describe("Check The Reducer Functionality", () => {
  let received;
  beforeEach(() => {
    received = {};
  });

  it("should have the expected default values", () => {
    const received = UserReducer(InitialState, { type: "NoAction" });
    expect(Object.keys(received).length).toBe(6);
    expect(received.userName).toBe("");
    expect(received.data).toBe(null);
    expect(received.error).toBe(false);
    expect(received.imageUrl).toBe(null);
    expect(received.profileUrl).toBe(null);
    expect(received.ready).toBe(false);
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

  it("handles ToggleError correctly", () => {
    // toggle on
    received = UserReducer(InitialState, {
      type: UserActions.ToggleError,
    });
    expect(received.error).toBe(true);
    // toggle off
    received = UserReducer(received, {
      type: UserActions.ToggleError,
    });
    expect(received.error).toBe(false);
  });

  it("handles StartFetchUser correctly", () => {
    const mockAsync = jest.fn();
    const mockPayload = { mock: "data" };
    const received = UserReducer(InitialState, {
      type: UserActions.StartFetchUser,
      func: mockAsync,
      payload: mockPayload,
    });
    expect(received).toEqual(InitialState);
    expect(mockAsync.mock.calls.length).toBe(1);
    expect(mockAsync.mock.calls[0]).toEqual([
      InitialState,
      {
        type: UserActions.StartFetchUser,
        func: mockAsync,
        payload: mockPayload,
      },
    ]);
  });

  it("handles SuccessFetchUser correctly", () => {
    const received = UserReducer(InitialState, {
      type: UserActions.SuccessFetchUser,
      userName: "someguy",
      data: { image: "someimage" },
    });
    expect(received.profileUrl).toBe(GenerateUserLink("someguy"));
    expect(received.imageUrl).toBe("someimage");
    expect(received.userName).toBe("someguy");
    expect(received.data).toStrictEqual({ image: "someimage" });
    expect(received.error).toBe(false);
    expect(received.ready).toBe(true);
  });

  it("handles FailureFetchUser correctly", () => {
    const received = UserReducer(InitialState, {
      type: UserActions.FailureFetchUser,
      userName: "someguy",
    });
    expect(received.profileUrl).toBe(null);
    expect(received.imageUrl).toBe(null);
    expect(received.userName).toBe("someguy");
    expect(received.data).toBe(null);
    expect(received.error).toBe(true);
    expect(received.ready).toBe(false);
  });
});
