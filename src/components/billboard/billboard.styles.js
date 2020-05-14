import styled from "styled-components";

export const CenterDiv = styled.div`
  background-color: white;
  align-items: center;
  justify-items: center;
  display: grid;
  grid-template-columns: 100vw;
  grid-template-rows: calc(100vh - 50px);
  margin-top: 50px;
  border: 3px;
`;

export const ProfileDiv = styled.div`
  background-color: #c0c0c0;
  width: 100vw;
  max-width: 600px;
  min-height: 175px;
  height: calc(40vh);
  display: flex;
  align-items: center;
  justify-content: center;
`;
