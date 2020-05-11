import React from "react";
import { TitleDiv } from "./title.styles";

export const messages = {
  Title: "Select an album for details.",
};

const Title = ({ titleHeight }) => {
  return <TitleDiv titleHeight={titleHeight}>{messages.Title}</TitleDiv>;
};

export default Title;
