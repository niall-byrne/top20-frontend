import styled from "styled-components";

export const TitleDiv = styled.div`
  height: ${(props) => props.TitleHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1px;
  width: calc(100vw - 2px);
`;
