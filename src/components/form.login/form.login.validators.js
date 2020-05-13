// Validators for the Login Form
import { messages } from "./form.login.component";

export const validateSubmit = (data, reject) => {
  if (data.length < 1) {
    reject(messages.FormUserNameMissingValidation);
    return false;
  }
  return true;
};

export const validateChange = (data, reject) => {
  return true;
};
