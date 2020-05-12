import React from "react";
import { UserContext } from "../../providers/user/user.provider";
import {
  ErrorDiv,
  FormDiv,
  FormLabel,
  FormInput,
  FormButton,
  FormInputGroup,
} from "./form.login.styles";
import CustomButton from "../button/button.component";
import { validateSubmit, validateChange } from "./form.login.validators";
import { withRouter } from "react-router-dom";

export const messages = {
  FormLastFMButtonMessage: "Show my Top20",
  FormLastFMUsernameLabelMessage: "last.fm username:",
  FormUserNameMissingValidation: "You require a name.",
};

const FormLogin = ({ history }) => {
  const { userProperties } = React.useContext(UserContext);
  const [userName, setUserName] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    doSubmit(document.querySelector('input[name="username"]').value);
  };

  const doSubmit = (value) => {
    const result = validateSubmit(value, setUserName, setErrorMsg);
    if (result) {
      history.push(`/${value}`);
    }
  };

  const handleKeyDown = (e) => {
    switch (e.keyCode) {
      case 13:
        handleSubmit(e);
        break;
      default:
        break;
    }
  };

  const handleChange = (value) => {
    if (errorMsg) {
      setErrorMsg(null);
    }
    validateChange(value, setUserName, setErrorMsg);
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <FormDiv>
      <div>
        <form onSubmit={handleSubmit}>
          <FormInputGroup>
            <FormLabel>{messages.FormLastFMUsernameLabelMessage}</FormLabel>
            <FormInput
              autoFocus
              name="username"
              type="username"
              data-testid="username"
              onChange={(e) => handleChange(e.currentTarget.value)}
              size={15}
              required
              defaultValue={userProperties.userName}
            />
          </FormInputGroup>
          <FormButton>
            <CustomButton
              type="submit"
              testid="submit"
              text={messages.FormLastFMButtonMessage}
            />
          </FormButton>
        </form>
        {errorMsg ? (
          <ErrorDiv data-testid="error">{errorMsg}</ErrorDiv>
        ) : (
          <div></div>
        )}
      </div>
    </FormDiv>
  );
};

export default withRouter(FormLogin);
