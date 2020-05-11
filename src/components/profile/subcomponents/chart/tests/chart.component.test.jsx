import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Chart from "../chart.component";

import {
  mockApiData,
  mockApiData5,
  mockApiData0,
} from "../../../../../test.fixtures/api.fixture";

describe("Given a chart with some valid album data", () => {
  afterEach(cleanup);

  let utils;
  let initialState;
  let albums;
  let setup = [
    { data: mockApiData5 },
    { data: mockApiData },
    { data: mockApiData0 },
  ];

  beforeEach(() => {
    initialState = setup.shift();
    albums = initialState.data.topalbums.album.slice(0, 20);
    utils = render(
      <Chart
        navBarHeight="100px"
        titleHeight="100px"
        drawerHeight="100px"
        data={initialState}
      />
    );
  });

  it("should render a maximum of 20 albums", () => {
    const cards = utils.queryAllByTestId("FlipCard");
    expect(cards.length).toBe(albums.length);
  });

  it("should render the expected albums without crashing", () => {
    const cards = utils.queryAllByTestId("FlipCard");
    expect(cards.length).toBe(20);
    expect(initialState.data.topalbums.album.length).toBe(50);
  });

  it("should render a dialogue when there are no albums at all", () => {
    const cards = utils.queryAllByTestId("FlipCard");
    expect(cards.length).toBe(0);
  });
});

describe("Given a rendered chart", () => {
  afterEach(cleanup);

  let utils;
  beforeEach(() => {
    utils = render(
      <Chart
        navBarHeight="100px"
        titleHeight="100px"
        drawerHeight="100px"
        data={{ data: mockApiData }}
      />
    );
  });

  it("clicking on an element should toggle the flipped class name", () => {
    const cards = utils.queryAllByTestId("FlipCard");
    expect(cards[0].className.includes("flipped")).toBeFalsy();
    fireEvent.click(cards[0]);
    expect(cards[0].className.includes("flipped")).toBeTruthy();
    fireEvent.click(cards[0]);
    expect(cards[0].className.includes("flipped")).toBeFalsy();
  });

  it("clicking on a card, and then an adjacent card should flip one at a time", () => {
    const cards = utils.queryAllByTestId("FlipCard");
    expect(cards[0].className.includes("flipped")).toBeFalsy();
    fireEvent.click(cards[0]);
    expect(cards[0].className.includes("flipped")).toBeTruthy();
    fireEvent.click(cards[1]);
    expect(cards[0].className.includes("flipped")).toBeFalsy();
    expect(cards[1].className.includes("flipped")).toBeTruthy();
    fireEvent.click(cards[1]);
    expect(cards[1].className.includes("flipped")).toBeFalsy();
  });
});
