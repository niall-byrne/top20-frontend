// Wraps the Profile Component with:
// - withSpinner
// - withBillboard
// - withRouter

import React from "react";
import { withRouter } from "react-router-dom";

import Profile from "./profile.component";
import withSpinner from "../spinner/spinner.component";
import withBillboard from "../billboard/billboard.component";
import withError from "../error/error.component";

import { fetchProfile } from "./profile.async";
import UserTypes from "../../providers/user/user.actions";
import { UserContext } from "../../providers/user/user.provider";

// Encapsulate the Profile Component with:
// - withSpinner
// - withBillboard
const WrappedSpinner = withBillboard(withError(withSpinner(Profile)));

const ProfileContainer = ({ match }) => {
  const { userProperties, dispatch } = React.useContext(UserContext);

  React.useEffect(() => {
    const success = (data) => {
      dispatch({
        type: UserTypes.SuccessFetchUser,
        userName: match.params.userName,
        data: data.content,
      });
    };

    const failure = (data) => {
      dispatch({ type: UserTypes.FailureFetchUser });
    };

    const fetchUserDetails = () => {
      dispatch({
        userName: match.params.userName,
        type: UserTypes.StartFetchUser,
        func: fetchProfile,
        success,
        failure,
      });
    };
    if (!userProperties.ready) {
      fetchUserDetails();
    }
  }, [dispatch, userProperties.ready]);

  return <WrappedSpinner />;
};

// Encapsulate the Profile Container with
// - withRouter
// - withError
const WrappedProfileContainer = withRouter(ProfileContainer);

export default WrappedProfileContainer;
