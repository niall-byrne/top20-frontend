import React from "react";
import { Card, CardFront, CardTitle, CardBack, CardText } from "./card.styles";

const FlipCard = ({ title, number, size, image, flipper }) => {
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
