// Renders an Error Message conditionally
// Controlled by the 'error' property of the UserContext

import React, { useContext } from "react";
import UserTypes from "../../providers/user/user.actions";
import { UserContext } from "../../providers/user/user.provider";
import { ErrorContainer, CenteredContainer } from "./error.styles";
import CustomButton from "../button/button.component";
import { withRouter } from "react-router-dom";

export const ErrorMessage = "Unable to load this user's data ...";

const WithError = (WrappedComponent) => {
  const CustomError = ({ history, ...otherProps }) => {
    const { userProperties, dispatch } = useContext(UserContext);
    let componentWillUnmount = false;

    React.useEffect(() => {
      return () => {
        dispatch({ type: UserTypes.ToggleError });
      };
    }, [componentWillUnmount, dispatch]);

    const handleClick = (e) => {
      componentWillUnmount = true;
      history.push("/");
    };

    return (
      <div>
        {userProperties.error ? (
          <ErrorContainer data-testid="Error1">
            <div>{ErrorMessage}</div>
            <CenteredContainer>
              <CustomButton
                action={handleClick}
                type="button"
                testid="Error2"
                text="Try Again"
              />
            </CenteredContainer>
          </ErrorContainer>
        ) : (
          <WrappedComponent {...otherProps} />
        )}
      </div>
    );
  };
  return withRouter(CustomError);
};

export default WithError;
