import UserActions from "../../../providers/user/user.actions";
import { fetchProfile, backend } from "../profile.async";

let mockFetchPromise;
let mockDispatch;
let success;
let failure;
let mockedFetch = jest.fn();
global.fetch = mockedFetch;

describe("When fetchProfile is used", () => {
  afterEach(() => mockedFetch.mockReset());
  beforeEach(() => {
    mockDispatch = jest.fn();
    mockedFetch.mockImplementation(() => mockFetchPromise);
  });

  it("should call fetch as expected", () => {
    success = jest.fn();
    failure = jest.fn();
    const state = {};
    const action = {
      userName: "SomeGuy",
      type: UserActions.StartFetchUser,
      func: fetchProfile,
      success,
      failure,
    };
    fetchProfile(state, action);
    expect(mockedFetch.mock.calls.length).toBe(1);
    const call = mockedFetch.mock.calls[0];
    expect(call[0]).toBe("http://localhost:5000/lastfm/");
    const options = call[1];
    expect(options).toEqual({
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      referrerPolicy: "same-origin",
      body: '{"username":"SomeGuy"}',
    });
  });

  it("should call the success callback as expected", async (done) => {
    mockedFetch.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
        status: 200,
      })
    );
    success = jest.fn();
    failure = jest.fn();
    const state = {};
    const action = {
      userName: "SomeGuy",
      type: UserActions.StartFetchUser,
      func: fetchProfile,
      success,
      failure,
    };
    await fetchProfile(state, action);
    expect(mockedFetch.mock.calls.length).toBe(1);
    expect(success.mock.calls.length).toBe(1);
    expect(failure.mock.calls.length).toBe(0);
    expect(success.mock.calls[0][0]).toEqual(state);
    done();
  });

  it("should call the failure callback as expected", async (done) => {
    mockedFetch.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
        status: 403,
      })
    );
    success = jest.fn();
    failure = jest.fn();
    const state = {};
    const action = {
      userName: "SomeGuy",
      type: UserActions.StartFetchUser,
      func: fetchProfile,
      success,
      failure,
    };
    await fetchProfile(state, action);
    expect(mockedFetch.mock.calls.length).toBe(1);
    expect(failure.mock.calls.length).toBe(1);
    expect(success.mock.calls.length).toBe(0);
    expect(failure.mock.calls[0][0]).toEqual(state);
    done();
  });

  it("should handle a server error", async (done) => {
    mockedFetch.mockImplementation(() => {
      throw "Server Error!";
    });
    success = jest.fn();
    failure = jest.fn();
    const state = {};
    const action = {
      userName: "SomeGuy",
      type: UserActions.StartFetchUser,
      func: fetchProfile,
      success,
      failure,
    };
    await fetchProfile(state, action);
    expect(mockedFetch.mock.calls.length).toBe(1);
    expect(failure.mock.calls.length).toBe(1);
    expect(success.mock.calls.length).toBe(0);
    expect(failure.mock.calls[0][0]).toEqual({ userName: "" });
    done();
  });
});

describe("Manage Environents", () => {
  let originalEnvironment = process.env;
  afterEach(() => {
    process.env = originalEnvironment;
  });
  beforeEach(() => {});

  it("uses the correct backend for the production environment", () => {
    process.env.ENV = "production";
    expect(backend()).toBe(process.env.REACT_APP_BACKEND_PROD);
  });

  it("uses the correct backend for the development environment", () => {
    process.env.ENV = "development";
    expect(backend()).toBe(process.env.REACT_APP_BACKEND_DEV);
  });
});
