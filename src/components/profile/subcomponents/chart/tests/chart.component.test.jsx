import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Chart, { messages } from "../chart.component";

import {
  mockApiData,
  mockApiData5,
  mockApiData0,
} from "../../../../../test.fixtures/lastfm.api.fixture";

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
  let setFocus = jest.fn();

  beforeEach(() => {
    setFocus.mockReset();
    initialState = setup.shift();
    albums = initialState.data.topalbums.album.slice(0, 20);
    utils = render(
      <Chart
        navBarHeight="100px"
        titleHeight="100px"
        drawerHeight="100px"
        data={initialState}
        count={albums.length}
        setFocus={setFocus}
      />
    );
  });

  it("should render a maximum of 20 albums", () => {
    const cards = utils.queryAllByTestId("FlipCard");
    expect(cards.length).toBe(albums.length);
    expect(setFocus.mock.calls.length).toBe(0);
  });

  it("should render the expected albums without crashing", () => {
    const cards = utils.queryAllByTestId("FlipCard");
    expect(cards.length).toBe(20);
    expect(initialState.data.topalbums.album.length).toBe(50);
    expect(setFocus.mock.calls.length).toBe(0);
  });

  it("should render a dialogue when there are no albums at all", () => {
    const cards = utils.queryAllByTestId("FlipCard");
    expect(cards.length).toBe(0);
    expect(utils.getByText(messages.ChartNoListens)).toBeInTheDocument();
    expect(setFocus.mock.calls.length).toBe(0);
  });
});

describe("Given a rendered chart", () => {
  afterEach(cleanup);

  let utils;
  let setFocus = jest.fn();
  beforeEach(() => {
    setFocus.mockReset();
    const albums = mockApiData.topalbums.album.slice(0, 20);
    utils = render(
      <Chart
        navBarHeight="100px"
        titleHeight="100px"
        drawerHeight="100px"
        data={{ data: mockApiData }}
        count={albums.length}
        setFocus={setFocus}
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
    expect(setFocus.mock.calls.length).toBe(2);
    expect(setFocus.mock.calls[0][0]).toBe(cards[0].getAttribute("data-index"));
    expect(setFocus.mock.calls[1][0]).toBe(null);
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
    expect(setFocus.mock.calls.length).toBe(3);
    expect(setFocus.mock.calls[0][0]).toBe(cards[0].getAttribute("data-index"));
    expect(setFocus.mock.calls[1][0]).toBe(cards[1].getAttribute("data-index"));
    expect(setFocus.mock.calls[2][0]).toBe(null);
  });
});
