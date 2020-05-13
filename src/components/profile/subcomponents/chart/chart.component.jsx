import React, { useState } from "react";
import { ChartDiv, ChartBox, NoListensDiv } from "./chart.styles";
import Card from "../card/card.component";
import Assets from "../../../../configuration/assets";

export const messages = {
  ChartNoListens:
    "Hey, you should really listen to some music to get the most out of this.",
};
export const cardSize = 100;

const Chart = ({
  navBarHeight,
  titleHeight,
  drawerHeight,
  data,
  count,
  setFocus,
}) => {
  const [flipped, setFlipped] = useState(null);
  const albums = data.data.topalbums.album.slice(0, 20);

  const handleFlip = (event) => {
    if (flipped) {
      flipped.classList.remove("flipped");
    }
    if (flipped !== event.currentTarget) {
      setFlipped(event.currentTarget);
      event.currentTarget.classList.add("flipped");
      setFocus(event.currentTarget.getAttribute("data-index"));
    } else {
      setFlipped(null);
      setFocus(null);
    }
  };

  if (count > 0)
    return (
      <ChartDiv
        NavBarHeight={navBarHeight}
        TitleHeight={titleHeight}
        DrawerHeight={drawerHeight}
      >
        <ChartBox width={(cardSize + 5) * 10}>
          {albums.map((album, index) => (
            <Card
              title={album.name}
              number={index + 1}
              key={index + 1}
              image={album.image[2]["#text"]}
              size={cardSize}
              flipper={handleFlip}
            />
          ))}
        </ChartBox>
      </ChartDiv>
    );
  return (
    <NoListensDiv
      NavBarHeight={navBarHeight}
      TitleHeight={titleHeight}
      DrawerHeight={drawerHeight}
    >
      <img alt={messages.ChartNoListens} src={Assets.Cans} />
    </NoListensDiv>
  );
};

export default Chart;
