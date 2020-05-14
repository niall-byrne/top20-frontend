// Renders a Spinner Animation during Asyncronous Tasks
// Controlled by the 'ready' property of the UserContext

import React from "react";
import { useTranslation } from "react-i18next";

import { UserContext } from "../../providers/user/user.provider";
import { LoaderContainer } from "./spinner.styles";
import Billboard from "../billboard/billboard.component";
import messages from "../../configuration/messages";

export const Spinner = () => {
  const { t } = useTranslation();
  return (
    <Billboard>
      <LoaderContainer data-testid="Spinner1">
        <div className="loader">{t(messages.SpinnerMessage)}</div>
      </LoaderContainer>
    </Billboard>
  );
};

const WithSpinner = (WrappedComponent) => {
  const SpinnerContainer = ({ ...otherProps }) => {
    const { userProperties } = React.useContext(UserContext);
    return (
      <div>
        {!userProperties.ready ? (
          <Spinner />
        ) : (
          <WrappedComponent {...otherProps} />
        )}
      </div>
    );
  };
  return SpinnerContainer;
};

export default WithSpinner;
