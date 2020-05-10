import React from "react";
import { CenterDiv, ProfileDiv } from "./billboard.styles";

// Base Billboard
const Billboard = ({ children }) => {
  return (
    <CenterDiv data-testid="billboard1">
      <ProfileDiv data-testid="billboard2">{children}</ProfileDiv>
    </CenterDiv>
  );
};

// Billboard Encapsulation Function
export const withBillboard = (WrappedComponent) => {
  const Encapsulated = ({ ...otherProps }) => {
    return (
      <Billboard>
        <WrappedComponent {...otherProps} />
      </Billboard>
    );
  };
  return Encapsulated;
};

export default Billboard;
