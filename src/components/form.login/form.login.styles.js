import styled, { css } from "styled-components";

const buttonBehavior = css`
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);
  outline: 0;
`;

export const FormDiv = styled.div`
  background-color: #c0c0c0;
  min-width: 200px;
  width: 60vw;
  min-height: 150px;
  height: calc(40vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormLabel = styled.label`
  padding-right: 20px;
  font-size: 1.2em;
`;

export const FormInput = styled.input`
  padding-right: 20px;
  font-size: 1.2em;
`;

export const ErrorDiv = styled.div`
  padding-top: 10px;
  color: red;
  font-size: 1em;
  left: 50%;
  width: auto;
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  transform: translateX(-50%);
  position: fixed;
`;

export const FormButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;

  button {
    cursor: pointer;
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
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
