import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import Drawer, {
  messages,
  LocalImages,
  DrawerDelay,
} from "../drawer.component";

import { mockApiData } from "../../../../../test.fixtures/api.fixture";

describe("Check the Drawer Component Renders Without Crashing", () => {
  afterEach(cleanup);

  let utils;
  const albums = mockApiData.topalbums.album.slice(0, 20);
  const setup = ["0", "0", "1"];
  let index;
  beforeEach(() => {
    index = setup.shift();
    utils = render(
      <Drawer
        drawerHeight="33vh"
        navBarHeight="40px"
        data={{ data: mockApiData }}
        focus={false}
      />
    );
  });

  it("should contain the expected title text", () => {
    expect(utils.getByText(messages.DrawerTitle)).toBeTruthy();
  });

  it("clicking on an card should open the drawer revealing the image, listens and name of the album", async (done) => {
    utils.rerender(
      <Drawer
        drawerHeight="33vh"
        navBarHeight="40px"
        data={{ data: mockApiData }}
        focus={index}
      />
    );
    // Wait for the drawer to open by listening for the artist name
    await waitFor(() => {
      expect(utils.getAllByText(albums[index].artist.name)).toBeTruthy();
      expect(utils.getAllByText(albums[index].name)).toBeTruthy();
      const lastfmImage = utils.getByAltText("last.fm");
      expect(lastfmImage.getAttribute("src")).toBe(LocalImages.LastFM);
      const lastfmlink = lastfmImage.parentElement.getAttribute("href");
      expect(lastfmlink).toBe(albums[index].url);
      const albumImage = utils.getByAltText(albums[index].name);
      expect(albumImage.getAttribute("src")).toBe(
        albums[index].image[3]["#text"]
      );
      expect(
        utils.getByText(`${albums[index].playcount} listens`)
      ).toBeTruthy();
    });
    done();
  });

  it("clicking on two successive cards, should only show the lastest card's info", async (done) => {
    utils.rerender(
      <Drawer
        drawerHeight="33vh"
        navBarHeight="40px"
        data={{ data: mockApiData }}
        focus={10}
      />
    );
    // Create a delay to allow useEffect to render with it's built in delay
    setInterval(() => {
      utils.rerender(
        <Drawer
          drawerHeight="33vh"
          navBarHeight="40px"
          data={{ data: mockApiData }}
          focus={index}
        />
      );
    }, DrawerDelay * 2);
    // Wait for the drawer to open by listening for the artist name
    await waitFor(() => {
      expect(utils.getAllByText(albums[index].artist.name)).toBeTruthy();
      expect(utils.getAllByText(albums[index].name)).toBeTruthy();
      const lastfmImage = utils.getByAltText("last.fm");
      expect(lastfmImage.getAttribute("src")).toBe(LocalImages.LastFM);
      const lastfmlink = lastfmImage.parentElement.getAttribute("href");
      expect(lastfmlink).toBe(albums[index].url);
      const albumImage = utils.getByAltText(albums[index].name);
      expect(albumImage.getAttribute("src")).toBe(
        albums[index].image[3]["#text"]
      );
      expect(
        utils.getByText(`${albums[index].playcount} listens`)
      ).toBeTruthy();
    });
    done();
  });
});
