import styled, { css } from "styled-components";

export const Card = styled.article`
  position: relative;
  width: ${(props) => props.TileHeight}px;
  height: ${(props) => props.TileHeight}px;
  cursor: pointer;
  perspective: 1000px;
  margin: 2px;

  &:focus,
  &:hover {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.15);
  }

  &.flipped {
    & > div:first-of-type {
      // frontside of the card
      transition: all 0.25s ease-in-out;
      transform: perspective(1000px) rotateY(-180deg);
    }

    & > div:last-of-type {
      // backside of the card
      transform: perspective(1000px) rotateY(0deg);
    }
  }
`;

export const CardSide = css`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: all 0.5s ease-in-out;
`;

// Card side - front
export const CardFront = styled.div`
  ${CardSide};
  background-color: #c0c0c0;
  font-weight: bold;
  text-align: center;
  img {
    height: 100%;
    width: 100%;
  }
`;

// Card side - back
export const CardBack = styled.div`
  ${CardSide};
  background-color: #c0c0c0;
  font-weight: bold;
  text-align: center;
  transform: rotateY(-180deg);
`;

// Card content
export const CardTitle = styled.div`
  font-size: 1em;
`;

export const CardText = styled.div`
  font-size: 2em;
`;
