import React, { useContext } from "react";
import Billboard from "../billboard/billboard.component";
import { ContactContainer, CenteredContainer } from "./contact.styles";
import CustomButton from "../button/button.component";
import Assets from "../../configuration/assets";
import UserTypes from "../../providers/user/user.actions";
import { UserContext } from "../../providers/user/user.provider";
import { withRouter } from "react-router-dom";
import Routes from "../../configuration/routes";

export const messages = {
  ContactMessage: "Please Get In Touch If You Like What You See",
  ContactButtonMessage1: "Contact Me",
  ContactButtonMessage2: "Return Home",
};

const Contact = ({ history, ...otherProps }) => {
  const { dispatch } = useContext(UserContext);
  let componentWillUnmount = false;

  const handleClick1 = (e) => {
    window.open(Assets.ContactPage, "_blank");
  };

  React.useEffect(() => {
    return () => {
      dispatch({
        type: UserTypes.ResetState,
      });
    };
  }, [componentWillUnmount, dispatch]);

  const handleClick2 = (e) => {
    componentWillUnmount = true;
    history.push(Routes.root);
  };

  return (
    <div>
      <Billboard>
        <ContactContainer data-testid="Contact1">
          <div>{messages.ContactMessage}</div>
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
        </ContactContainer>
      </Billboard>
    </div>
  );
};

export default withRouter(Contact);
