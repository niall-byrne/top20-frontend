// Validators for the Login Form
import { messages } from "./form.login.component";

export const validateSubmit = (data, success, reject) => {
  if (data.length < 1) {
    reject(messages.FormUserNameMissingValidation);
    return false;
  }
  success(data);
  return true;
};

export const validateChange = (data, success, reject) => {
  success(data);
  return true;
};
