import React from "react";
import { TitleDiv } from "./title.styles";

export const messages = {
  Title: "Select an album for details.",
};

const Title = ({ TitleHeight }) => {
  return <TitleDiv TitleHeight={TitleHeight}>{messages.Title}</TitleDiv>;
};

export default Title;
