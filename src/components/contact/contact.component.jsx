import React, { useContext } from "react";
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
          <h2>Top 20 Chart Generator</h2>
          <div>{messages.ContactMessage1}</div>
          <div>{messages.ContactMessage2}</div>
          <CenteredContainer>
            <CustomButton
              action={handleClick1}
              type="button"
              testid="Contact2"
              text={messages.ContactButtonMessage1}
            />
            <CustomButton
              action={handleClick2}
              type="button"
              testid="Contact3"
              text={messages.ContactButtonMessage2}
            />
          </CenteredContainer>
          <LoadingIO>
            {messages.ContactCredit1}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={Assets.IconCredLink}
            >
              {messages.ContactCredit2}
            </a>
            {messages.ContactCredit3}
          </LoadingIO>
        </ContactContainer>
      </Billboard>
    </div>
  );
};

export default withRouter(Contact);
