import React from "react";
import { ButtonContainer } from "./button.styles";

const CustomButton = ({ testid, type = "button", text, action }) => {
  return (
    <ButtonContainer>
      {action ? (
        <button data-testid={testid} type={type} onClick={action}>
          {text}
        </button>
      ) : (
        <button data-testid={testid} type={type}>
          {text}
        </button>
      )}
    </ButtonContainer>
  );
};

export default CustomButton;
