import styled from "styled-components";

export const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  span {
    text-align: center;
  }
`;

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  text-align: center;

  div:last-child {
    padding-left: 20px;
  }
`;

export const LoadingIO = styled.div`
  padding-top: 10px;
  font-size: 0.7em;
`;
