import React from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { UserContext } from "../../providers/user/user.provider";
import {
  ErrorDiv,
  FormDiv,
  FormLabel,
  FormInput,
  FormButton,
  FormInputGroup,
} from "./form.login.styles";
import { validateSubmit, validateChange } from "./form.login.validators";
import CustomButton from "../button/button.component";
import messages from "../../configuration/messages";

const FormLogin = ({ history }) => {
  const { userProperties } = React.useContext(UserContext);
  const [errorMsg, setErrorMsg] = React.useState();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    doSubmit(document.querySelector('input[name="username"]').value);
  };

  const doSubmit = (value) => {
    const result = validateSubmit(value, setErrorMsg);
    if (result) {
      history.push(`/${encodeURIComponent(value)}`);
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
    validateChange(value, setErrorMsg);
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
            <FormLabel>{t(messages.FormLastFMUsernameLabelMessage)}</FormLabel>
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
              text={t(messages.FormLastFMButtonMessage)}
            />
          </FormButton>
        </form>
        {errorMsg ? (
          <ErrorDiv data-testid="error">{t(errorMsg)}</ErrorDiv>
        ) : (
          <div></div>
        )}
      </div>
    </FormDiv>
  );
};

export default withRouter(FormLogin);
