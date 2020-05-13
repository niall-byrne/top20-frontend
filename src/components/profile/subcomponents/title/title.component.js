import React from "react";
import { TitleDiv } from "./title.styles";
import messages from "../../../../configuration/messages";

const Title = ({ titleHeight, count }) => {
  return (
    <TitleDiv titleHeight={titleHeight}>
      <span>{count > 0 ? messages.MainTitle : messages.MainTitleEmpty}</span>
    </TitleDiv>
  );
};

export default Title;
