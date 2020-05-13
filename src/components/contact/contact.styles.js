import styled from "styled-components";

export const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;

  div:last-child {
    padding-left: 20px;
  }
`;

export const LoadingIO = styled.div`
  padding-top: 10px;
  font-size: 0.7em;
`;
