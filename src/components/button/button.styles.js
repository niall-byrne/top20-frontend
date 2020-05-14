import styled, { css } from "styled-components";

const buttonBehavior = css`
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);
  outline: 0;
`;

export const ButtonContainer = styled.div`
  button {
    cursor: pointer;
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1.2em;
    line-height: 1.5;
    border-radius: 0.25rem;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  button:active {
    ${buttonBehavior}
  }

  button:focus {
    ${buttonBehavior}
  }
`;
