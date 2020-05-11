import React, { useState } from "react";
import { Card, CardFront, CardTitle, CardBack, CardText } from "./card.styles";

export const messages = {
  Front: "Front",
  Back: "Back",
};

const FlipCard = ({ title, number, size, image, flipper }) => {
  const [flip, setFlip] = useState(null);
  return (
    <div>
      <Card
        data-index={number - 1}
        data-testid="FlipCard"
        TileHeight={size}
        onClick={flipper}
      >
        <CardFront>
          <CardTitle>
            <img alt={title} src={image} />
          </CardTitle>
        </CardFront>
        <CardBack>
          <CardText>
            <span data-testid="CardNumber">{number}</span>
          </CardText>
        </CardBack>
      </Card>
    </div>
  );
};

export default FlipCard;
