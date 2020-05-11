import React, { useState } from "react";
import { ChartDiv, ChartBox } from "./chart.styles";
import Card from "../card/card.component";

export const messages = {};
export const cardSize = 100;

const Chart = ({ navBarHeight, titleHeight, drawerHeight, data }) => {
  const [flipped, setFlipped] = useState(null);
  const albums = data.data.topalbums.album.slice(0, 20);

  const handleFlip = (event) => {
    if (flipped) {
      flipped.classList.remove("flipped");
    }
    if (flipped !== event.currentTarget) {
      setFlipped(event.currentTarget);
      event.currentTarget.classList.add("flipped");
    } else {
      setFlipped(null);
    }
  };
  
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
};

export default Chart;
