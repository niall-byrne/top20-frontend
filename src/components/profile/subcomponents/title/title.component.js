import React from "react";
import { TitleDiv } from "./title.styles";

export const messages = {
  MainTitle: "Select an album for details.",
  MainTitleEmpty: "This user has no listening data!",
};

const Title = ({ titleHeight, count }) => {
  return (
    <TitleDiv titleHeight={titleHeight}>
      <span>{count > 0 ? messages.MainTitle : messages.MainTitleEmpty}</span>
    </TitleDiv>
  );
};

export default Title;
