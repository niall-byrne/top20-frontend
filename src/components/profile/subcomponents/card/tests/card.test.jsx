import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Card, { messages } from "../card.component";

// { title, number, size, image }

describe("Check the Card Component Renders Without Crashing", () => {
  afterEach(cleanup);

  let utils;
  let state;
  let setup = [
    { size: "150", title: "hello", number: "1", image: "./images/lastfm.png" },
    { size: "150", title: "hello", number: "2", image: "./images/lastfm.png" },
  ];

  beforeEach(() => {
    state = setup.shift();
    utils = render(
      <Card
        size={state.size}
        title={state.title}
        number={state.number}
        image={state.image}
      />
    );
  });

  it("should present a card front with the expected properties", () => {
    const cardImage = utils.getByAltText(state.title);
    expect(cardImage).toBeTruthy();
    expect(cardImage.getAttribute("src")).toBe(state.image);
    expect(utils.getByTestId("CardNumber")).toBeTruthy();
  });

  it("should flip the card when clicked and add the flipped class for css rendering", () => {
    const cardBody = utils.getByTestId("FlipCard");
    expect(cardBody).not.toHaveClass("flipped");
    fireEvent.click(cardBody);
    expect(cardBody).toHaveClass("flipped");
  });
});
