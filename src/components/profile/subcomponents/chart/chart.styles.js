import styled from "styled-components";

// Props:
// NavBarHeight
// TitleHeight
// DrawerHeight
export const ChartDiv = styled.div`
  height: calc(
    100vh - ${(props) => props.NavBarHeight} - ${(props) => props.TitleHeight} -
      ${(props) => props.DrawerHeight} - 6px
  );
  display: flex;
  align-items: baseline;
  justify-content: center;
  overflow: scroll;
`;

export const ChartBox = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1px;
  max-width: ${(props) => props.width}px;
`;
