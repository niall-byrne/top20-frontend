// Wraps the Profile Component with conditional logic that handles:
// - withError
// - withSpinner
// - withRouter

import React from "react";
import { withRouter } from "react-router-dom";

import Profile from "./profile.component";
import withSpinner from "../spinner/spinner.component";
import withError from "../error/error.component";

import { fetchProfile } from "./profile.async";
import UserTypes from "../../providers/user/user.actions";
import { UserContext } from "../../providers/user/user.provider";
import { AnalyticsContext } from "../../providers/analytics/analytics.provider";
import { AnalyticsActions } from "../../providers/analytics/analytics.actions";

const ProfileContainer = ({ match }) => {
  const { userProperties, dispatch } = React.useContext(UserContext);
  let useEffectTriggered = false; // Facilitates Testing Callbacks
  const currentUser = decodeURIComponent(match.params.userName);
  const { event } = React.useContext(AnalyticsContext);

  React.useEffect(() => {
    const success = (data) => {
      dispatch({
        type: UserTypes.SuccessFetchUser,
        userName: currentUser,
        data: data.content,
      });
      event(AnalyticsActions.SuccessProfile);
    };

    const failure = (_) => {
      dispatch({
        type: UserTypes.FailureFetchUser,
        userName: currentUser,
      });
      event(AnalyticsActions.ErrorProfile);
    };

    const fetchUserDetails = () => {
      dispatch({
        userName: currentUser,
        type: UserTypes.StartFetchUser,
        func: fetchProfile,
        success,
        failure,
      });
    };

    if (!useEffectTriggered && !userProperties.ready) {
      fetchUserDetails();
    }
  }, []);

  return <WrappedSpinner data={userProperties} />;
};

const WrappedSpinner = withError(withSpinner(Profile));
const WrappedProfileContainer = withRouter(ProfileContainer);

export default WrappedProfileContainer;
