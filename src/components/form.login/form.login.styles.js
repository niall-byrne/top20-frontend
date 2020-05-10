import styled from "styled-components";

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
  margin-bottom: 10px;
`;

export const FormInput = styled.input`
  padding-right: 20px;
  font-size: 1.2em;
  margin-bottom: 10px;
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
`;

export const FormInputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;
