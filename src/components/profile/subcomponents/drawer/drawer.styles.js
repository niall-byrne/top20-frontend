import styled from "styled-components";

export const DrawerDiv = styled.div`
  margin-top: ${(props) => props.navBarHeight};
  height: ${(props) => props.drawerHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 2px);
`;

export const DrawerMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
