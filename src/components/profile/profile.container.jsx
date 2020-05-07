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
const WrappedSpinner = withBillboard(withSpinner(Profile));

const ProfileContainer = ({ match }) => {
  const { userProperties, dispatch } = React.useContext(UserContext);

  React.useEffect(() => {
    const fetchUserDetails = () => {
      dispatch({
        payload: match.params.userName,
        type: UserTypes.StartFetchUser,
        func: fetchProfile,
      });
    };
    if (!userProperties.ready) {
      fetchUserDetails();
    }
  }, [dispatch, userProperties]);

  return <WrappedSpinner />;
};

// Encapsulate the Profile Container with
// - withRouter
// - withError
const WrappedProfileContainer = withRouter(withError(ProfileContainer));

export default WrappedProfileContainer;
