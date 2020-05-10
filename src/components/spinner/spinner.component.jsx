// Renders a Spinner Animation during Asyncronous Tasks
// Controlled by the 'ready' property of the UserContext

import React from "react";
import { UserContext } from "../../providers/user/user.provider";
import { LoaderContainer } from "./spinner.styles";
import Billboard from "../billboard/billboard.component";

export const messages = {
  SpinnerMessage: "Loading...",
};

const WithSpinner = (WrappedComponent) => {
  const SpinnerContainer = ({ ...otherProps }) => {
    const { userProperties } = React.useContext(UserContext);
    return (
      <div>
        {!userProperties.ready ? (
          <Billboard>
            <LoaderContainer data-testid="Spinner1">
              <div className="loader">{messages.SpinnerMessage}</div>
            </LoaderContainer>
          </Billboard>
        ) : (
          <WrappedComponent {...otherProps} />
        )}
      </div>
    );
  };
  return SpinnerContainer;
};

export default WithSpinner;
