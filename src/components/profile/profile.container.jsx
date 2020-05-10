// Wraps the Profile Component with:
// - withSpinner
// - withBillboard
// - withRouter

import React from "react";
import { withRouter } from "react-router-dom";

import Profile from "./profile.component";
import withSpinner from "../spinner/spinner.component";
import withError from "../error/error.component";

import { fetchProfile } from "./profile.async";
import UserTypes from "../../providers/user/user.actions";
import { UserContext } from "../../providers/user/user.provider";

// Encapsulate the Profile Component with:
// - withSpinner
// - withBillboard
const WrappedSpinner = withError(withSpinner(Profile));

const ProfileContainer = ({ match }) => {
  const { userProperties, dispatch } = React.useContext(UserContext);
  let useEffectTriggered = false; // Facilitates Testing Callbacks

  React.useEffect(() => {
    const success = async (data) => {
      await dispatch({
        type: UserTypes.SuccessFetchUser,
        userName: match.params.userName,
        data: data.content,
      });
    };

    const failure = async (_) => {
      await dispatch({
        type: UserTypes.FailureFetchUser,
        userName: match.params.userName,
      });
    };

    const fetchUserDetails = async () => {
      await dispatch({
        userName: match.params.userName,
        type: UserTypes.StartFetchUser,
        func: fetchProfile,
        success,
        failure,
      });
    };

    if (!useEffectTriggered && !userProperties.ready) {
      useEffectTriggered = true;
      fetchUserDetails();
    }
  }, [dispatch, userProperties.ready, match.params.userName]);

  return <WrappedSpinner />;
};

// Encapsulate the Profile Container with
// - withRouter
// - withError
const WrappedProfileContainer = withRouter(ProfileContainer);

export default WrappedProfileContainer;
