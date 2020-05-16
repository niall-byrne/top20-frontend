// Renders an Error Message conditionally
// Controlled by the 'error' property of the UserContext

import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";

import UserTypes from "../../providers/user/user.actions";
import { UserContext } from "../../providers/user/user.provider";
import { ErrorContainer, CenteredContainer } from "./error.styles";
import CustomButton from "../button/button.component";
import Billboard from "../billboard/billboard.component";
import Routes from "../../configuration/routes";
import messages from "../../configuration/messages";

const WithError = (WrappedComponent) => {
  const CustomError = ({ history, ...otherProps }) => {
    const { userProperties, dispatch } = useContext(UserContext);
    const { t } = useTranslation();

    React.useEffect(() => {
      return () => {
        // Whenever this is unmounted clear the state
        dispatch({ type: UserTypes.ResetState });
      };
    }, []);

    const handleClick = (e) => {
      history.push(Routes.search);
    };

    return (
      <div>
        {userProperties.error ? (
          <Billboard>
            <ErrorContainer data-testid="Error1">
              <div>{t(messages.ErrorMessage)}</div>
              <CenteredContainer>
                <CustomButton
                  action={handleClick}
                  type="button"
                  testid="Error2"
                  text={t(messages.ErrorButtonMessage)}
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
