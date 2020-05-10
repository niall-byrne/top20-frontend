import React, { useState } from "react";
import { Card, CardFront, CardTitle, CardBack, CardText } from "./card.styles";

export const messages = {
  Front: "Front",
  Back: "Back",
};

const FlipCard = ({ title, number, size, image }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = (event) => {
    setFlipped(!flipped);
    event.currentTarget.classList.toggle("flipped");
  };

  return (
    <div>
      <Card data-testid="FlipCard" TileHeight={size} onClick={handleFlip}>
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
