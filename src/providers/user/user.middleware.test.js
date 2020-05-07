import UserActions from "./user.actions";
import withMiddleware from "./user.middleware";
import withReducerLogger from "../../util/reducer.logger";

jest.mock("../../util/reducer.logger");

const mockReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

describe("Check The Reducer Middlware", () => {
  let received;
  let testReducer;
  let initialState;
  beforeEach(() => {
    received = {};
    withReducerLogger.mockReset();
    withReducerLogger.mockImplementation((dispatch) => dispatch);
    testReducer = withMiddleware(mockReducer, "mockReducer");
  });

  it("handles pass through correctly without interception", () => {
    initialState = { key: "value" };
    received = testReducer(initialState, {
      type: "BogusAction1",
    });
    expect(received).toStrictEqual(initialState);
  });

  it("applies the logging middleware correctly", () => {
    received = testReducer(
      {},
      {
        type: "BogusAction2",
      }
    );
    expect(withReducerLogger.mock.calls.length).toBe(1);
    expect(withReducerLogger.mock.calls[0]).toEqual([
      mockReducer,
      "mockReducer",
    ]);
  });

  it("intercepts the StartFetchUser type", () => {
    const mockAsync = jest.fn();
    const mockPayload = { mock: "data" };
    initialState = { keys: "value" };

    received = testReducer(initialState, {
      type: UserActions.StartFetchUser,
      func: mockAsync,
      payload: mockPayload,
    });
    expect(withReducerLogger.mock.calls.length).toBe(1);
    expect(withReducerLogger.mock.calls[0]).toEqual([
      mockReducer,
      "mockReducer",
    ]);
    expect(mockAsync.mock.calls.length).toBe(1);
    expect(mockAsync.mock.calls[0]).toEqual([
      initialState,
      {
        type: UserActions.StartFetchUser,
        func: mockAsync,
        payload: mockPayload,
      },
    ]);
  });
});
