import React, { useContext } from "react";
import Billboard from "../billboard/billboard.component";
import { ContactContainer, CenteredContainer } from "./contact.styles";
import CustomButton from "../button/button.component";

export const messages = {
  ContactMessage: "Please Get In Touch If You Like What You See",
  ContactButtonMessage: "Contact Me",
};

const Contact = ({ history, ...otherProps }) => {
  const handleClick = (e) => {
    history.push("/");
  };

  return (
    <div>
      <Billboard>
        <ContactContainer data-testid="Contact1">
          <div>{messages.ContactButtonMessage}</div>
          <CenteredContainer>
            <CustomButton
              action={handleClick}
              type="button"
              testid="Contact2"
              text={messages.ContactMessage}
            />
          </CenteredContainer>
        </ContactContainer>
      </Billboard>
    </div>
  );
};

export default Contact;
