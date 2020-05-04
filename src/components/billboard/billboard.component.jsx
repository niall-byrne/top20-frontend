import React from "react";
import { CenterDiv, ProfileDiv } from "./billboard.styles";

const WithBillboard = (WrappedComponent) => {
  const Billboard = ({ ...otherProps }) => {
    return (
      <CenterDiv>
        <ProfileDiv>
          <WrappedComponent {...otherProps} />
        </ProfileDiv>
      </CenterDiv>
    );
  };
  return Billboard;
};

export default WithBillboard;
