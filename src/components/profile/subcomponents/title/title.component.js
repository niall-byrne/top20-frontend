import React from "react";
import { useTranslation } from "react-i18next";

import { TitleDiv } from "./title.styles";

const Title = ({ titleHeight, count }) => {
  const { t } = useTranslation();
  return (
    <TitleDiv titleHeight={titleHeight}>
      <span>{count > 0 ? t("MainTitle") : t("MainTitleEmpty")}</span>
    </TitleDiv>
  );
};

export default Title;
