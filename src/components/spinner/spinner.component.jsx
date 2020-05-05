import React from "react";
import { UserContext } from "../../providers/user/user.provider";
import { LoaderContainer } from "./spinner.styles";

const WithSpinner = (WrappedComponent) => {
  const Spinner = ({ ...otherProps }) => {
    const { userProperties } = React.useContext(UserContext);
    return (
      <div>
        {!userProperties.ready ? (
          <LoaderContainer data-testid="Spinner1">
            <div className="loader">Loading...</div>
          </LoaderContainer>
        ) : (
          <WrappedComponent {...otherProps} />
        )}
      </div>
    );
  };
  return Spinner;
};

export default WithSpinner;
