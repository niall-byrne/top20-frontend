import styled from "styled-components";

const common = (props) => `
  height: calc(
    100vh - ${props.NavBarHeight} - ${props.TitleHeight} -
      ${props.DrawerHeight} - 6px
  );
  display: flex;
  align-items: baseline;
  justify-content: center;
`;

export const ChartDiv = styled.div`
  ${(props) => common(props)}
  overflow: scroll;
`;

export const NoListensDiv = styled.div`
  ${(props) => common(props)}
  align-items: center;
  span {
    text-align: center;
  }
`;

export const ChartBox = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1px;
  max-width: ${(props) => props.width}px;
`;
