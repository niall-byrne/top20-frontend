import getTopAlbums, { buildUrl } from "./lastfm.api";

// setup fetch mock
const mockFetchResponse = {};
const mockFetchStatus = 200;
const mockFetchPromise = {
  json: () => mockFetchResponse,
  status: mockFetchStatus,
};
jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

describe("Manage Environment", () => {
  beforeEach(() => {
    process.env.REACT_APP_LASTFM_KEY = "secretkey";
  });

  afterEach(() => {
    delete process.env.REACT_APP_LASTFM_KEY;
  });

  describe("Check buildUrl", () => {
    it("assembles the url correctly", () => {
      const api = buildUrl("niall-byrne", process.env.REACT_APP_LASTFM_KEY);
      expect(api).toBe(
        "https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=niall-byrne&api_key=secretkey&format=json"
      );
    });
  });

  describe("Check getTopAlbums api success", () => {
    it("getTopAlbums calls fetch as expected", async () => {
      const result = await getTopAlbums("niall-byrne");
      expect(result.data).toEqual({});
      expect(result.status).toStrictEqual(200);
      expect(fetch.mock.calls.length).toBe(1);
      expect(fetch.mock.calls[0]).toEqual([
        "https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=niall-byrne&api_key=secretkey&format=json",
      ]);
    });

    describe("Check getTopAlbums api failure", () => {
      it("getTopAlbums calls fetch as expected", async () => {
        const result = await getTopAlbums("niall-byrne");
        expect(result.data).toStrictEqual({});
        expect(result.status).toStrictEqual(200);
        expect(fetch.mock.calls.length).toBe(2);
        expect(fetch.mock.calls[0]).toEqual([
          "https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=niall-byrne&api_key=secretkey&format=json",
        ]);
      });
    });
  });
});
