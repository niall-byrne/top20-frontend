// Renders an Error Message conditionally
// Controlled by the 'error' property of the UserContext

import React from "react";
import { UserContext } from "../../providers/user/user.provider";
import { ErrorContainer } from "./error.styles";

export const ErrorMessage = "Unable to load this user's data ...";

const WithError = (WrappedComponent) => {
  const CustomError = ({ ...otherProps }) => {
    const { userProperties } = React.useContext(UserContext);
    return (
      <div>
        {userProperties.error ? (
          <ErrorContainer data-testid="Error1">
            <div>{ErrorMessage}</div>
          </ErrorContainer>
        ) : (
          <WrappedComponent {...otherProps} />
        )}
      </div>
    );
  };
  return CustomError;
};

export default WithError;
