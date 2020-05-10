import styled from "styled-components";

// Props:
// NavBarHeight
// DrawerHeight
export const Drawer = styled.div`
  margin-top: ${(props) => props.NavBarHeight};
  height: ${(props) => props.DrawerHeight};
  display: flex;
  align-items: center;
  justify-items: center;
  width: calc(100vw - 2px);
`;

// Props:
// NavBarHeight
// TitleHeight
// DrawerHeight
export const Chart = styled.div`
  height: calc(
    100vh - ${(props) => props.NavBarHeight} - ${(props) => props.TitleHeight} -
      ${(props) => props.DrawerHeight} - 6px
  );
  display: flex;
  align-items: center;
  justify-items: center;
  width: calc(100vw - 2px);
`;
