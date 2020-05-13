// Renders an Error Message conditionally
// Controlled by the 'error' property of the UserContext

import React, { useContext } from "react";
import UserTypes from "../../providers/user/user.actions";
import { UserContext } from "../../providers/user/user.provider";
import { ErrorContainer, CenteredContainer } from "./error.styles";
import CustomButton from "../button/button.component";
import { withRouter } from "react-router-dom";
import Billboard from "../billboard/billboard.component";
import Routes from "../../configuration/routes";

export const messages = {
  ErrorMessage: "Unable to load this user's data ...",
  ErrorButtonMessage: "Try Again",
};

const WithError = (WrappedComponent) => {
  const CustomError = ({ history, ...otherProps }) => {
    const { userProperties, dispatch } = useContext(UserContext);
    let componentWillUnmount = false;

    React.useEffect(() => {
      return () => {
        dispatch({ type: UserTypes.ResetState });
      };
    }, [componentWillUnmount, dispatch]);

    const handleClick = (e) => {
      history.push(Routes.search);
      componentWillUnmount = true;
    };

    return (
      <div>
        {userProperties.error ? (
          <Billboard>
            <ErrorContainer data-testid="Error1">
              <div>{messages.ErrorMessage}</div>
              <CenteredContainer>
                <CustomButton
                  action={handleClick}
                  type="button"
                  testid="Error2"
                  text={messages.ErrorButtonMessage}
                />
              </CenteredContainer>
            </ErrorContainer>
          </Billboard>
        ) : (
          <WrappedComponent {...otherProps} />
        )}
      </div>
    );
  };
  return withRouter(CustomError);
};

export default WithError;
