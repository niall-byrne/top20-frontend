import React from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { UserContext } from "../../providers/user/user.provider";
import { AnalyticsContext } from "../../providers/analytics/analytics.provider";
import { AnalyticsActions } from "../../providers/analytics/analytics.actions";

import {
  ErrorDiv,
  FormDiv,
  FormLabel,
  FormInput,
  FormButton,
  FormInputGroup,
} from "./form.search.styles";
import { validateSubmit, validateChange } from "./form.search.validators";
import CustomButton from "../button/button.component";

const FormSearch = ({ history }) => {
  const fieldUsername = React.createRef();
  const { userProperties } = React.useContext(UserContext);
  const { event } = React.useContext(AnalyticsContext);
  const [errorMsg, setErrorMsg] = React.useState();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    doSubmit(fieldUsername.current.value);
  };

  const doSubmit = (value) => {
    const result = validateSubmit(value, setErrorMsg);
    if (result) {
      event(AnalyticsActions.Search);
      history.push(`/${encodeURIComponent(value)}`);
    }
  };

  const handleKeyDown = (e) => {
    switch (e.keyCode) {
      case 13:
        doSubmit(fieldUsername.current.value);
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

  return (
    <FormDiv>
      <div>
        <form onKeyDown={handleKeyDown} onSubmit={handleSubmit}>
          <FormInputGroup>
            <FormLabel htmlFor="username">
              {t("FormLastFMUsernameLabelMessage")}
              {":"}
            </FormLabel>
            <FormInput
              autoFocus
              id="username"
              ref={fieldUsername}
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
              text={t("FormLastFMButtonMessage")}
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

export default withRouter(FormSearch);
