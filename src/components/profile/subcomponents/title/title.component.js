import React from "react";
import { useTranslation } from "react-i18next";

import { TitleDiv } from "./title.styles";
import messages from "../../../../configuration/messages";

const Title = ({ titleHeight, count }) => {
  const { t } = useTranslation();
  return (
    <TitleDiv titleHeight={titleHeight}>
      <span>
        {count > 0 ? t(messages.MainTitle) : t(messages.MainTitleEmpty)}
      </span>
    </TitleDiv>
  );
};

export default Title;
