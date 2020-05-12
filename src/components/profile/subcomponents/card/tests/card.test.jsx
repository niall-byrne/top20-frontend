import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Card from "../card.component";

describe("Check the Card Component Renders Without Crashing", () => {
  afterEach(cleanup);

  const mockFlipper = jest.fn();
  let utils;
  let state;
  let setup = [
    {
      size: "150",
      title: "hello",
      number: "1",
      image: "./images/lastfm.png",
    },
    {
      size: "150",
      title: "hello",
      number: "2",
      image: "./images/lastfm.png",
    },
  ];

  beforeEach(() => {
    mockFlipper.mockReset();
    state = setup.shift();
    utils = render(
      <Card
        size={state.size}
        title={state.title}
        number={state.number}
        image={state.image}
        flipper={mockFlipper}
      />
    );
  });

  it("should present a card front with the expected properties", () => {
    const cardImage = utils.getByAltText(state.title);
    expect(cardImage).toBeTruthy();
    expect(cardImage.getAttribute("src")).toBe(state.image);
    expect(utils.getByTestId("CardNumber")).toBeTruthy();
    expect(mockFlipper.mock.calls.length).toBe(0);
    expect(utils.getByTestId("FlipCard").getAttribute("data-index")).toBe("0");
  });

  it("should flip the card when clicked and add the flipped class for css rendering", () => {
    expect(mockFlipper.mock.calls.length).toBe(0);
    const cardBody = utils.getByTestId("FlipCard");
    fireEvent.click(cardBody);
    expect(mockFlipper.mock.calls.length).toBe(1);
  });
});
