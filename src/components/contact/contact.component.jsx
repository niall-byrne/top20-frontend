import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import Billboard from "../billboard/billboard.component";
import {
  ContactContainer,
  CenteredContainer,
  LoadingIO,
} from "./contact.styles";
import CustomButton from "../button/button.component";
import Assets from "../../configuration/assets";
import UserTypes from "../../providers/user/user.actions";
import { UserContext } from "../../providers/user/user.provider";
import { withRouter } from "react-router-dom";
import Routes from "../../configuration/routes";
import messages from "../../configuration/messages";

const Contact = ({ history, ...otherProps }) => {
  const { dispatch } = useContext(UserContext);
  let componentWillUnmount = false;
  const { t } = useTranslation();

  React.useEffect(() => {
    return () => {
      dispatch({
        type: UserTypes.ResetState,
      });
    };
  }, [componentWillUnmount, dispatch]);

  const handleClick1 = (e) => {
    componentWillUnmount = true;
    history.push(Routes.search);
  };

  const handleClick2 = (e) => {
    window.open(Assets.ContactPage, "_blank");
  };

  return (
    <div>
      <Billboard>
        <ContactContainer data-testid="Contact1">
          <h2>{t(messages.ContactTitle)}</h2>
          <div>{t(messages.ContactMessage1)}</div>
          <div>{t(messages.ContactMessage2)}</div>
          <CenteredContainer>
            <CustomButton
              action={handleClick1}
              type="button"
              testid="Contact2"
              text={t(messages.ContactButtonMessage1)}
            />
            <CustomButton
              action={handleClick2}
              type="button"
              testid="Contact3"
              text={t(messages.ContactButtonMessage2)}
            />
          </CenteredContainer>
          <LoadingIO>
            {t(messages.ContactCredit1)}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={Assets.IconCredLink}
            >
              {t(messages.ContactCredit2)}
            </a>
            {t(messages.ContactCredit3)}
          </LoadingIO>
        </ContactContainer>
      </Billboard>
    </div>
  );
};

export default withRouter(Contact);
