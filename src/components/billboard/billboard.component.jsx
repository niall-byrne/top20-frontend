import React from "react";
import { CenterDiv, ProfileDiv } from "./billboard.styles";

const withBillboard = (WrappedComponent) => {
  const Billboard = ({ ...otherProps }) => {
    return (
      <CenterDiv data-testid="billboard1">
        <ProfileDiv data-testid="billboard2">
          <WrappedComponent {...otherProps} />
        </ProfileDiv>
      </CenterDiv>
    );
  };
  return Billboard;
};

export default withBillboard;
